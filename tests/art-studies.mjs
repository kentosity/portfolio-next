import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3173";
const shotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const suffix = process.env.CAPTURE_PASS ? `-${process.env.CAPTURE_PASS}` : "";
const studies = [
  {
    slug: "sorting-room",
    title: "Sorting room",
    action: "Gather pieces",
    marks: "[data-fragment]",
    count: 216,
  },
  {
    slug: "untangled",
    title: "Untangled",
    action: "Untangle",
    marks: "[data-edge]",
    count: 30,
  },
  {
    slug: "finding-flow",
    title: "Finding flow",
    action: "Find the flow",
    marks: "[data-current]",
    count: 96,
  },
];
const browserErrors = [];
const checks = [];
const performanceSamples = [];
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
});
await mkdir(shotDirectory, { recursive: true });

function observeErrors(page) {
  page.on("pageerror", (error) => browserErrors.push(error.message));
}

async function open(page, study) {
  const response = await page.goto(`${baseUrl}/lab/art/${study.slug}`);
  assert.equal(response.status(), 200);
  await page.waitForFunction(
    () => !document.querySelector("input[type=checkbox]")?.disabled,
  );
  assert.equal(await page.locator("h1").innerText(), study.title);
  assert.equal(await page.locator(study.marks).count(), study.count);
  assert.match(
    await page.locator('meta[name="robots"]').getAttribute("content"),
    /noindex/,
  );
  assert.equal(await page.locator('svg[role="img"] title').count(), 1);
}

async function setOrder(page, key) {
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press(key);
}

async function artwork(page) {
  return page.locator('svg[role="img"]').innerHTML();
}

async function assertStable(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const before = await artwork(page);
  await page.waitForTimeout(180);
  assert.ok(
    (await artwork(page)) === before,
    "the artwork stops updating when idle",
  );
}

async function capture(page, study, label) {
  await page.mouse.move(0, 0);
  await page.screenshot({
    path: `${shotDirectory}/art-${study.slug}-${label}${suffix}.png`,
    fullPage: true,
  });
}

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  observeErrors(page);
  for (const study of studies) {
    await open(page, study);
    const firstArrangement = await artwork(page);
    await page.reload();
    await page.waitForTimeout(80);
    assert.equal(
      await artwork(page),
      firstArrangement,
      "the initial seed reproduces on reload",
    );
    await capture(page, study, "desktop-scattered");
    await setOrder(page, "Home");
    const scattered = await artwork(page);
    await setOrder(page, "End");
    assert.notEqual(
      await artwork(page),
      scattered,
      "keyboard changes the composition",
    );
    await setOrder(page, "Home");

    await page.evaluate(() => {
      window.artFrameTimes = [];
      const started = performance.now();
      let previous = started;
      function sample(now) {
        window.artFrameTimes.push(now - previous);
        previous = now;
        if (now - started < 1700) requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);
    });
    await page.getByRole("button", { name: study.action, exact: true }).click();
    await page.getByRole("button", { name: "Pause", exact: true }).waitFor();
    await page.getByRole("button", { name: "Pause", exact: true }).click();
    await assertStable(page);
    await page.getByRole("button", { name: study.action, exact: true }).click();
    await page.waitForFunction(
      () => document.querySelector('svg[role="img"]').dataset.order === "1.000",
    );
    await page
      .getByRole("button", { name: "Pause", exact: true })
      .waitFor({ state: "detached" });
    await assertStable(page);
    const intervals = await page.evaluate(() =>
      window.artFrameTimes.filter((value) => value > 0).sort((a, b) => a - b),
    );
    performanceSamples.push({
      study: study.slug,
      samples: intervals.length,
      medianMs: intervals[Math.floor(intervals.length / 2)],
      p95Ms: intervals[Math.floor(intervals.length * 0.95)],
    });
    await capture(page, study, "desktop-ordered");
    await page.locator('svg[role="img"]').screenshot({
      path: `${shotDirectory}/art-${study.slug}-artwork${suffix}.png`,
    });

    if (study.slug !== "untangled") {
      const svg = page.locator('svg[role="img"]');
      await svg.scrollIntoViewIfNeeded();
      const beforePointer = await artwork(page);
      const bounds = await svg.boundingBox();
      await page.mouse.move(
        bounds.x + bounds.width * 0.4,
        bounds.y + bounds.height * 0.45,
      );
      await page.waitForTimeout(80);
      assert.notEqual(
        await artwork(page),
        beforePointer,
        "a pointer disturbs nearby geometry",
      );
      await page.mouse.move(0, 0);
      await page.waitForTimeout(80);
      assert.equal(
        await artwork(page),
        beforePointer,
        "leaving the artwork restores its geometry",
      );
    } else {
      await page
        .getByRole("button", { name: "Interfaces", exact: true })
        .focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await page
          .getByRole("button", { name: "Interfaces", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      assert.match(
        await page.locator('[aria-live="polite"]').innerText(),
        /work together/,
      );
      assert.ok(
        (await page.locator('[data-edge][opacity="0.12"]').count()) > 0,
      );
      await page
        .getByRole("button", { name: "Whole system", exact: true })
        .click();
    }

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save SVG", exact: true }).click();
    const download = await downloadPromise;
    const exportPath = `${shotDirectory}/art-${study.slug}-export${suffix}.svg`;
    await download.saveAs(exportPath);
    const exported = await readFile(exportPath, "utf8");
    assert.match(exported, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
    assert.match(exported, /#f1f4ff/);
    assert.doesNotMatch(exported, /NaN|undefined|<script|href="https?:/);
    await setOrder(page, "Home");
    const previousSeed = await artwork(page);
    await page
      .getByRole("button", { name: "New arrangement", exact: true })
      .click();
    assert.notEqual(await artwork(page), previousSeed);
    assert.equal(
      await page.locator('svg[role="img"]').getAttribute("data-seed"),
      "2719",
    );
    checks.push(
      `${study.slug}: deterministic reload, keyboard, finite animation/pause, pointer or branch controls, SVG download, seed variation`,
    );
  }

  await open(page, studies[0]);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForFunction(
    () => document.querySelector('svg[role="img"]').dataset.order === "1.000",
  );
  checks.push("sorting-room: normal scrolling gathers pieces");

  for (const width of [320, 390, 768, 1024]) {
    const mobile = await browser.newPage({
      viewport: { width, height: 844 },
      hasTouch: true,
      isMobile: width < 768,
    });
    observeErrors(mobile);
    for (const study of studies) {
      await open(mobile, study);
      assert.ok(
        await mobile.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${study.slug} fits ${width}px`,
      );
      if (width === 390) {
        const slider = mobile.getByRole("slider");
        await slider.evaluate((input) => {
          const setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value",
          ).set;
          setter.call(input, "35");
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        });
        await mobile
          .getByRole("button", { name: study.action, exact: true })
          .tap();
        await mobile.waitForFunction(
          () =>
            document.querySelector('svg[role="img"]').dataset.order === "1.000",
        );
        await mobile
          .getByRole("button", { name: "Pause", exact: true })
          .waitFor({ state: "detached" });
        if (study.slug === "untangled") {
          await mobile
            .getByRole("button", { name: "Boundaries", exact: true })
            .tap();
          assert.equal(
            await mobile
              .getByRole("button", { name: "Boundaries", exact: true })
              .getAttribute("aria-pressed"),
            "true",
          );
        }
        await capture(mobile, study, "mobile");
      }
    }
    await mobile.close();
  }
  checks.push(
    "all studies: 320/390/768/1024px layouts and 390px touch actions",
  );

  const reduced = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  observeErrors(reduced);
  for (const study of studies) {
    await reduced.goto(`${baseUrl}/lab/art/${study.slug}`);
    await reduced
      .getByText("Reduced motion is on.", { exact: false })
      .waitFor();
    await reduced
      .getByRole("button", { name: study.action, exact: true })
      .click();
    assert.equal(
      await reduced.locator('svg[role="img"]').getAttribute("data-order"),
      "1.000",
    );
    assert.equal(
      await reduced.getByRole("button", { name: "Pause", exact: true }).count(),
      0,
    );
    await assertStable(reduced);
    if (study.slug === "sorting-room")
      assert.equal(await reduced.getByRole("checkbox").isDisabled(), true);
    await capture(reduced, study, "reduced-motion");
  }
  await open(page, studies[2]);
  await setOrder(page, "Home");
  await page
    .getByRole("button", { name: "Find the flow", exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("button", { name: "Pause", exact: true })
    .waitFor({ state: "detached" });
  await assertStable(page);
  checks.push(
    "all studies: direct reduced-motion controls; runtime preference change cancels animation",
  );

  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  for (const study of studies) {
    const response = await staticPage.goto(`${baseUrl}/lab/art/${study.slug}`);
    assert.equal(response.status(), 200);
    assert.equal(await staticPage.locator(study.marks).count(), study.count);
    assert.equal(await staticPage.locator("h1").innerText(), study.title);
  }
  const invalid = await staticPage.goto(`${baseUrl}/lab/art/unknown-study`);
  assert.equal(invalid.status(), 404);
  for (const locale of ["en", "ja"]) {
    const response = await page.goto(
      `${baseUrl}/lab/full/atlas-generative/${locale}`,
    );
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("html").getAttribute("lang"), locale);
  }
  await page.goto(`${baseUrl}/lab/art`);
  assert.match(page.url(), /\/lab\/art\/sorting-room$/);
  checks.push(
    "server-rendered artwork without JavaScript; invalid study 404; index redirect; inherited EN/JA portfolio smoke checks",
  );
  assert.deepEqual(browserErrors, []);
  const report = { baseUrl, checks, performanceSamples, browserErrors };
  await writeFile(
    `${shotDirectory}/art-verification${suffix}.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
