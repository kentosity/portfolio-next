import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { siteContent } from "../app/content/site-content.ts";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3157";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const capturePrefix = process.env.CAPTURE_PREFIX ?? "full-atlasgen";
const captureSuffix = process.env.CAPTURE_PASS
  ? `-${process.env.CAPTURE_PASS}`
  : "";
const root = "/lab/full/atlas-generative";
const projectSlugs = siteContent.projects.map((project) => project.slug);
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
    route === ""
      ? "home"
      : route === "/projects"
        ? "work"
        : route.endsWith("event-platform")
          ? "event"
          : "case";
  await page.locator("main img").evaluateAll(async (images) => {
    for (const image of images) image.loading = "eager";
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    ),
  );
  await page.screenshot({
    path: `${screenshotDirectory}/${capturePrefix}-${label}-${device}-${locale}${captureSuffix}.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `${screenshotDirectory}/${capturePrefix}-${label}-${device}-${locale}${captureSuffix}-viewport.png`,
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
        if (route === "" || route === "/projects") {
          const entries = page.locator("article[data-project]");
          const expectedCount = route === "" ? 4 : siteContent.projects.length;
          assert.equal(await entries.count(), expectedCount);
          for (const entry of await entries.all()) {
            assert.equal(await entry.locator("h3").count(), 1);
            assert.deepEqual(
              await entry.locator("dt").allTextContents(),
              locale === "en" ? ["Built", "Result"] : ["つくったもの", "結果"],
            );
            assert.equal(await entry.locator("dd").count(), 2);
          }
        }
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
      console.log(checks.at(-1));
    }

    await capture(page, "", device);
    await capture(page, "/projects/local-speech", device);
    await capture(page, "/projects", device);
    await capture(page, "", device, "ja");
    await capture(page, "/projects/local-speech", device, "ja");
    await capture(page, "/projects", device, "ja");
    await capture(page, "/projects/event-platform", device);
    await capture(page, "/projects/event-platform", device, "ja");
    await open(page, `${root}/en/projects`);
    await page.locator("article[data-project='event-platform']").screenshot({
      path: `${screenshotDirectory}/${capturePrefix}-entry-${device}${captureSuffix}.png`,
    });
    await open(page, `${root}/en`);
    await page.locator("section#projects").screenshot({
      path: `${screenshotDirectory}/${capturePrefix}-featured-${device}${captureSuffix}.png`,
      style: 'a[href="#main"]:not(:focus) { visibility: hidden; }',
    });
    if (device === "mobile") {
      await open(page, `${root}/en`);
      await page
        .getByRole("button", { name: "Stack the sheets", exact: true })
        .tap();
      assert.equal(
        await page
          .getByRole("button", { name: "Lift the sheets", exact: true })
          .getAttribute("aria-pressed"),
        "false",
      );
      checks.push("Mobile touch input stacks the project sheets");
    }
    await page.close();
  }

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));
  await open(page, `${root}/en`);
  await page
    .getByRole("button", { name: "Stack the sheets", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Lift the sheets", exact: true })
      .getAttribute("aria-pressed"),
    "false",
  );
  await page
    .getByRole("button", { name: "Lift the sheets", exact: true })
    .click();
  const floors = page.locator("main button[data-sheet]");
  assert.equal(await floors.count(), 4);
  await floors.nth(1).focus();
  await page.keyboard.press("Enter");
  assert.equal(await floors.nth(1).getAttribute("aria-pressed"), "true");
  assert.match(
    await page.locator("[aria-live='polite']").innerText(),
    /Event-platform|Event platform/,
  );
  checks.push(
    "Project sheets stack, lift and select through keyboard controls",
  );

  for (const locale of ["en", "ja"]) {
    for (const [problem, count] of [
      ["operations", 3],
      ["coordination", 3],
      ["information", 3],
      ["publishing", 2],
    ]) {
      await open(page, `${root}/${locale}/projects?problem=${problem}`);
      assert.equal(await page.locator("article[data-project]").count(), count);
      assert.equal(
        await page.locator(`[data-problem-group="${problem}"]`).count(),
        1,
      );
      assert.equal(
        await page
          .locator("nav[aria-label] a[aria-current='true']")
          .filter({ hasText: String(count) })
          .count(),
        1,
      );
      const entry = page.locator("article[data-project]").first();
      const heading = await entry.locator("h3").innerText();
      const slug = await entry.getAttribute("data-project");
      await entry
        .getByRole("link", {
          name: locale === "en" ? "Read the case study" : "事例を読む",
          exact: true,
        })
        .click();
      await page.waitForURL(`**/${locale}/projects/${slug}?problem=${problem}`);
      assert.equal(new URL(page.url()).searchParams.get("problem"), problem);
      assert.equal(await page.locator("h1").innerText(), heading);
      await page
        .getByRole("link", {
          name: locale === "en" ? "日本語" : "English",
          exact: true,
        })
        .click();
      await page.waitForURL(
        `**/${locale === "en" ? "ja" : "en"}/projects/${slug}?problem=${problem}`,
      );
      assert.equal(new URL(page.url()).searchParams.get("problem"), problem);
      await page
        .getByRole("link", {
          name:
            locale === "en"
              ? "プロジェクト一覧に戻る"
              : "Back to the project collection",
          exact: true,
        })
        .click();
      await page.waitForURL(
        `**/${locale === "en" ? "ja" : "en"}/projects?problem=${problem}`,
      );
      assert.equal(new URL(page.url()).searchParams.get("problem"), problem);
      assert.equal(await page.locator("article[data-project]").count(), count);
    }
  }
  await open(page, `${root}/en/projects?problem=unknown`);
  assert.equal(
    await page.locator("article[data-project]").count(),
    projectSlugs.length,
  );
  checks.push(
    "All four problem filters work in EN/JA; case headings match the selected problem and filtering survives locale changes and case return; unknown filters show all work",
  );

  await open(page, `${root}/en/projects?area=ai-tools`);
  assert.equal(await page.locator("main article").count(), 4);
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await page.waitForURL("**/ja/projects?area=ai-tools");
  assert.equal(await page.locator("main article").count(), 4);
  await page.goBack();
  assert.equal(new URL(page.url()).searchParams.get("area"), "ai-tools");
  await page
    .getByRole("heading", { name: "A problem. A way through.", exact: true })
    .waitFor();
  const coordinationLink = page
    .locator('main article[data-project="agent-coordination"]')
    .getByRole("link", { name: "Read the case study", exact: true });
  await coordinationLink.scrollIntoViewIfNeeded();
  const savedScroll = await page.evaluate(() => window.scrollY);
  await coordinationLink.click();
  await page.waitForURL("**/projects/agent-coordination?area=ai-tools");
  await page
    .getByRole("link", { name: "Back to the project collection", exact: true })
    .click();
  await page.waitForURL("**/en/projects?area=ai-tools");
  await page.waitForFunction(
    (expected) => Math.abs(window.scrollY - expected) < 90,
    savedScroll,
  );
  await page
    .locator('main article[data-project="agent-coordination"]')
    .getByRole("link", { name: "Read the case study", exact: true })
    .click();
  await page.waitForURL("**/projects/agent-coordination?area=ai-tools");
  await page
    .locator("header")
    .first()
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await page.waitForURL("**/en/projects?area=ai-tools");
  await page.waitForFunction(
    (expected) => Math.abs(window.scrollY - expected) < 90,
    savedScroll,
  );
  checks.push(
    "Collection filter survives language change, browser Back and case-study return through page and header links with scroll restoration",
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

  for (const locale of ["en", "ja"]) {
    await open(page, `${root}/${locale}/projects/local-speech`);
    const print = page.locator("main figure").filter({
      has: page.getByRole("button", {
        name: locale === "en" ? "Vary the print" : "図案を変える",
        exact: true,
      }),
    });
    const artwork = print.locator("[aria-hidden='true']").first();
    const original = await artwork.innerHTML();
    const vary = print.getByRole("button", {
      name: locale === "en" ? "Vary the print" : "図案を変える",
      exact: true,
    });
    await vary.click();
    assert.notEqual(await artwork.innerHTML(), original);
    const construction = print.getByRole("button", {
      name: locale === "en" ? "Show construction" : "構成を見る",
      exact: true,
    });
    await construction.focus();
    await page.keyboard.press("Space");
    assert.equal(await construction.getAttribute("aria-pressed"), "true");
    const downloadEvent = page.waitForEvent("download");
    await print
      .getByRole("button", {
        name: locale === "en" ? "Save SVG" : "SVGを保存",
        exact: true,
      })
      .click();
    const download = await downloadEvent;
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const svg = Buffer.concat(chunks).toString();
    assert.match(download.suggestedFilename(), /^kento-voice-\d+\.svg$/);
    assert.match(svg, /<svg[^>]+xmlns=/);
    assert.match(svg, /#f1f4ff/);
    assert.doesNotMatch(svg, /#faf9f2|#242722|#a64b3c|#3448b5|#3554b5|#a0a99a/);
    await print
      .getByRole("button", {
        name: locale === "en" ? "Restore" : "元に戻す",
        exact: true,
      })
      .click();
    assert.equal(await artwork.innerHTML(), original);
    assert.equal(await construction.getAttribute("aria-pressed"), "false");
    assert.equal(
      await print
        .getByRole("button", {
          name: locale === "en" ? "Restore" : "元に戻す",
          exact: true,
        })
        .isDisabled(),
      true,
    );
  }
  checks.push(
    "EN/JA print variation, keyboard construction, Atlas-palette SVG download and exact restoration pass",
  );

  await open(page, `${root}/en/projects/event-platform#results`);
  await page.getByRole("link", { name: "日本語", exact: true }).click();
  await page.waitForURL("**/ja/projects/event-platform#results");
  checks.push("Language switching retains a case-study section anchor");

  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScript.newPage();
  for (const locale of ["en", "ja"]) {
    await open(noScriptPage, `${root}/${locale}/projects`);
    await noScriptPage.locator(`nav a[href$='?problem=operations']`).click();
    await noScriptPage.waitForURL("**/projects?problem=operations");
    assert.equal(
      await noScriptPage.locator("article[data-project]").count(),
      3,
    );
  }
  checks.push(
    "Problem filters work with JavaScript disabled in both languages",
  );
  for (const locale of ["en", "ja"]) {
    await open(noScriptPage, `${root}/${locale}/projects/local-speech`);
    assert.match(
      await noScriptPage.locator("#built").innerText(),
      locale === "en" ? /speech|caption/i : /音声|字幕/,
    );
    assert.match(
      await noScriptPage.locator("link[rel='canonical']").getAttribute("href"),
      new RegExp(`${root}/${locale}/projects/local-speech$`),
    );
  }
  await noScript.close();
  checks.push(
    "Both case locales render content and canonical metadata with JavaScript disabled",
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
    .getByRole("button", { name: "Stack the sheets", exact: true })
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
  await open(page, `${root}/en/projects/local-speech`);
  await page
    .getByRole("button", { name: "Vary the print", exact: true })
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
  assert.match(
    await page.locator("main").innerText(),
    /プロジェクトが見つかりません/,
  );
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
    `${screenshotDirectory}/${capturePrefix}-check-results${captureSuffix}.txt`,
    `${checks.join("\n")}\n`,
  );
  console.log(checks.join("\n"));
} finally {
  await browser.close();
}
