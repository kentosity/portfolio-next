import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3146";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const captureSuffix = process.env.CAPTURE_PASS
  ? `-${process.env.CAPTURE_PASS}`
  : "";
const root = "/lab/full/atlas";
const projectSlugs = [
  "local-speech",
  "event-platform",
  "salon-data-platform",
  "subsidy-search-pilot",
  "agent-coordination",
  "markdown-sharing",
  "event-ticketing",
  "snap-photobooth",
  "architecture-portfolio",
  "falconex-site",
  "ongy-viewer",
];
const routes = [
  "",
  "/projects",
  "/about",
  "/resume",
  "/work-together",
  "/contact",
  ...projectSlugs.map((slug) => `/projects/${slug}`),
];
const browserErrors = [];
const checks = [];
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
});

await mkdir(screenshotDirectory, { recursive: true });

async function open(page, path) {
  const response = await page.goto(`${baseUrl}${path}`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(response.status(), 200, `${path} returns 200`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.locator("main h1").count(),
    1,
    `${path} has one primary heading`,
  );
}

async function capture(page, route, device, locale = "en") {
  await open(page, `${root}/${locale}${route}`);
  const label =
    route === "" ? "home" : route === "/projects" ? "collection" : "case-study";
  await page.screenshot({
    path: `${screenshotDirectory}/full-atlas-${label}-${device}${locale === "ja" ? "-ja" : ""}${captureSuffix}.png`,
    fullPage: true,
  });
}

try {
  for (const [device, viewport] of [
    ["desktop", { width: 1440, height: 900 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({
      viewport,
      hasTouch: device === "mobile",
      isMobile: device === "mobile",
    });
    page.on("pageerror", (error) => browserErrors.push(error.message));

    for (const locale of ["en", "ja"]) {
      for (const route of routes) {
        const path = `${root}/${locale}${route}`;
        await open(page, path);
        await page.waitForFunction(
          (locale) => document.documentElement.lang === locale,
          locale,
        );
        const mainText = await page.locator("main").innerText();
        assert.doesNotMatch(
          mainText,
          /TXTO|TELA|hairline|\bSure\b|\btax\b/i,
          `${path} uses public-safe copy`,
        );
        if (locale === "ja")
          assert.match(
            mainText,
            /[\u3040-\u30ff\u4e00-\u9fff]/,
            `${path} has Japanese content`,
          );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          true,
          `${path} fits ${device}`,
        );
        const links = await page
          .locator("main a[href^='/']")
          .evaluateAll((nodes) =>
            nodes.map((node) => node.getAttribute("href")),
          );
        for (const href of links)
          assert(
            href.startsWith(root) || href.startsWith("/files/"),
            `${path} keeps themed navigation: ${href}`,
          );
        if (route.startsWith("/projects/")) {
          for (const section of [
            "problem",
            "built",
            "decisions",
            "results",
            "artifacts",
            "stack",
          ])
            assert.equal(
              await page.locator(`#${section}`).count(),
              1,
              `${path} includes ${section}`,
            );
          assert.equal(
            await page.locator("main svg[role='img']").count(),
            1,
            `${path} has an explanatory system drawing`,
          );
        }
      }
      checks.push(
        `${device} ${locale}: all ${routes.length} routes return 200, fit viewport, render localized content and themed links`,
      );
    }

    await capture(page, "", device);
    await capture(page, "/projects/local-speech", device);
    if (device === "desktop") await capture(page, "/projects", device);
    await capture(page, "", device, "ja");
    await capture(page, "/projects/local-speech", device, "ja");
    if (device === "mobile") {
      await open(page, `${root}/en`);
      await page
        .getByRole("button", { name: "Stack the floors", exact: true })
        .tap();
      assert.equal(
        await page
          .getByRole("button", { name: "Lift the floors", exact: true })
          .getAttribute("aria-pressed"),
        "false",
      );
      checks.push("Mobile touch input stacks the project floors");
    }
    await page.close();
  }

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));
  await open(page, `${root}/en`);
  await page
    .getByRole("button", { name: "Stack the floors", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Lift the floors", exact: true })
      .getAttribute("aria-pressed"),
    "false",
  );
  await page
    .getByRole("button", { name: "Lift the floors", exact: true })
    .click();
  const floors = page
    .locator("main button[aria-pressed]")
    .filter({ has: page.locator("svg") });
  assert.equal(await floors.count(), 4);
  await floors.nth(1).focus();
  await page.keyboard.press("Enter");
  assert.equal(await floors.nth(1).getAttribute("aria-pressed"), "true");
  assert.match(
    await page.locator("[aria-live='polite']").innerText(),
    /Event-platform|Event platform/,
  );
  checks.push(
    "Project floors stack, lift and select through keyboard controls",
  );

  await open(page, `${root}/en/projects?area=ai-tools`);
  assert.equal(await page.locator("main article").count(), 4);
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await page.waitForURL("**/ja/projects?area=ai-tools");
  assert.equal(await page.locator("main article").count(), 4);
  await page.goBack();
  assert.equal(new URL(page.url()).searchParams.get("area"), "ai-tools");
  await page.locator("main article").nth(2).scrollIntoViewIfNeeded();
  const savedScroll = await page.evaluate(() => window.scrollY);
  await page
    .locator("main article")
    .nth(2)
    .getByRole("link", { name: "Read the case study", exact: true })
    .click();
  await page.waitForURL("**/projects/agent-coordination?area=ai-tools");
  await page
    .getByRole("link", { name: "Back to the project collection", exact: true })
    .click();
  await page.waitForURL("**/en/projects?area=ai-tools");
  await page.waitForFunction(
    (expected) => Math.abs(window.scrollY - expected) < 90,
    savedScroll,
  );
  checks.push(
    "Collection filter survives language change, browser Back and a case-study round trip with scroll restoration",
  );

  await open(page, `${root}/en/projects/local-speech`);
  const roomButtons = page.locator(
    "[aria-label='Inspect a system stage'] button",
  );
  await roomButtons.nth(1).focus();
  await page.keyboard.press("Space");
  assert.equal(await roomButtons.nth(1).getAttribute("aria-pressed"), "true");
  assert.equal(
    await page.evaluate(() => document.activeElement.matches(":focus-visible")),
    true,
  );
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await page.waitForURL("**/ja/projects/local-speech");
  checks.push(
    "Case-study rooms support keyboard selection and language switching retains the case route",
  );

  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ["en", "ja"]) {
      for (const route of [
        "",
        "/projects",
        "/projects/local-speech",
        "/projects/event-platform",
        "/contact",
      ]) {
        await open(page, `${root}/${locale}${route}`);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          true,
          `${locale}${route} fits ${width}px`,
        );
      }
    }
  }
  checks.push(
    "Home, collection, speech/event cases and contact fit 320, 768 and 1024px in both languages",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page, `${root}/en`);
  await page
    .getByRole("button", { name: "Stack the floors", exact: true })
    .click();
  assert.equal(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
    0,
  );
  await open(page, `${root}/en/projects/event-platform`);
  assert.match(await page.locator("#results").innerText(), /200,?000|200k/);
  assert.match(await page.locator("#results").innerText(), /10,?000|10k/);
  assert.match(await page.locator("#results").innerText(), /95%/);
  checks.push(
    "Reduced-motion state changes have no running animation; event case shows the supported annual cost comparison",
  );

  const missingCase = await page.goto(
    `${baseUrl}${root}/en/projects/unknown-project`,
    { waitUntil: "domcontentloaded" },
  );
  assert.equal(missingCase.status(), 404);
  const missingJapaneseCase = await page.goto(
    `${baseUrl}${root}/ja/projects/unknown-project`,
    { waitUntil: "domcontentloaded" },
  );
  assert.equal(missingJapaneseCase.status(), 404);
  assert.match(await page.locator("main").innerText(), /部屋が見つかりません/);
  assert.equal(
    await page.locator(`main a[href="${root}/ja/projects"]`).count(),
    1,
  );
  const missingLocale = await page.goto(`${baseUrl}${root}/fr`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(missingLocale.status(), 404);
  const rootResponse = await page.goto(`${baseUrl}${root}`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(rootResponse.status(), 200);
  assert.equal(new URL(page.url()).pathname, `${root}/en`);
  checks.push(
    "Default route opens English; unknown projects and locales return real 404s",
  );
  assert.deepEqual(browserErrors, []);
  checks.push("No browser JavaScript errors");
  await writeFile(
    `${screenshotDirectory}/full-atlas-check-results${captureSuffix}.txt`,
    `${checks.join("\n")}\n`,
  );
  console.log(checks.join("\n"));
} finally {
  await browser.close();
}
