import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { webkit } from "@playwright/test";
import { siteContent } from "../app/content/site-content.ts";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3163";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const capturePrefix = process.env.CAPTURE_PREFIX ?? "atlasgen-theme";
const root = "";
const blue = "rgb(22, 73, 203)";
const routes = [
  "",
  "/projects",
  "/about",
  "/resume",
  "/work-together",
  "/contact",
  ...siteContent.projects.map((project) => `/projects/${project.slug}`),
];
const results = [];
const browserErrors = [];
const prefetchErrors = [];
const browser = await webkit.launch();

await mkdir(screenshotDirectory, { recursive: true });

async function open(page, path, expectedStatus = 200) {
  await page.waitForLoadState("networkidle");
  const response = await page.goto(`${baseUrl}${path}`, {
    waitUntil: "load",
  });
  assert.equal(response.status(), expectedStatus, path);
  await page.evaluate(() => document.fonts.ready);
}

async function assertTheme(page, expectedTheme = "#1649cb") {
  await page.waitForFunction(
    (expected) => {
      const meta = document.querySelector('meta[name="theme-color"]');
      const style = document.createElement("span").style;
      style.color = expected;
      const expectedColor = style.color;
      style.color = meta?.content ?? "";
      return style.color === expectedColor;
    },
    expectedTheme,
  );
  const colors = await page.evaluate(() => ({
    html: getComputedStyle(document.documentElement).backgroundColor,
    body: getComputedStyle(document.body).backgroundColor,
    scheme: getComputedStyle(document.documentElement).colorScheme,
    metaScheme: document.querySelector('meta[name="color-scheme"]')?.content,
    themeCount: document.querySelectorAll('meta[name="theme-color"]').length,
  }));
  assert.deepEqual(colors, {
    html: blue,
    body: blue,
    scheme: "light",
    metaScheme: "light",
    themeCount: 1,
  });
  const theme = await page.locator('meta[name="theme-color"]').getAttribute("content");
  return { ...colors, theme };
}

async function readTopBackground(page) {
  return page.evaluate(() =>
    document
      .elementsFromPoint(window.innerWidth / 2, 1)
      .map((element) => getComputedStyle(element).backgroundColor)
      .find((color) => color.startsWith("rgb(")),
  );
}

async function scrollToEdge(page, edge) {
  await page.evaluate((edge) => {
    window.scrollTo(
      0,
      edge === "top" ? -120 : document.documentElement.scrollHeight + 120,
    );
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }, edge);
}

async function captureRootReveal(page, label, edge) {
  await scrollToEdge(page, edge);
  await assertTheme(page, await readTopBackground(page));
  await page.screenshot({
    path: `${screenshotDirectory}/${capturePrefix}-${label}-${edge}.png`,
    animations: "disabled",
    style: 'a[href="#main"]:not(:focus) { visibility: hidden; }',
  });
  try {
    await page.evaluate((edge) => {
      document.body.style.transform = `translateY(${edge === "top" ? 80 : -80}px)`;
    }, edge);
    await page.screenshot({
      path: `${screenshotDirectory}/${capturePrefix}-${label}-${edge}-root-reveal.png`,
      animations: "disabled",
      style: 'a[href="#main"]:not(:focus) { visibility: hidden; }',
    });
    const exposedBackground = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor,
    );
    assert.equal(exposedBackground, blue);
  } finally {
    await page.evaluate(() => document.body.style.removeProperty("transform"));
  }
}

try {
  for (const [device, viewport, colorScheme] of [
    ["desktop", { width: 1440, height: 900 }, "light"],
    ["mobile", { width: 390, height: 844 }, "dark"],
  ]) {
    const context = await browser.newContext({
      viewport,
      colorScheme,
      isMobile: device === "mobile",
      hasTouch: device === "mobile",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => {
      const details = { url: page.url(), name: error.name, message: error.message };
      const isPrefetchFailure = error.name.startsWith("Fetch API cannot load")
        && error.message.includes("?_rsc=")
        && error.message.endsWith("due to access control checks.");
      if (isPrefetchFailure) prefetchErrors.push(details);
      else browserErrors.push(details);
    });

    for (const locale of ["en", "ja"]) {
      for (const route of routes) {
        const path = `${root}/${locale}${route}`;
        await open(page, path);
        await scrollToEdge(page, "top");
        const top = await assertTheme(page);
        await scrollToEdge(page, "bottom");
        const bottom = await assertTheme(page, await readTopBackground(page));
        results.push({ device, colorScheme, path, top, bottom });

        if (["", "/contact", "/projects/local-speech"].includes(route)) {
          const label = route === "" ? "home" : route.split("/").at(-1);
          for (const edge of ["top", "bottom"])
            await captureRootReveal(page, `${device}-${locale}-${label}`, edge);
        }
      }

      const casePath = `${root}/${locale}/projects/event-platform`;
      await open(page, casePath);
      for (const [selector, expectedTheme] of [
        ["[class*='caseOutcome']", "#f1f4ff"],
        ["#system-plan > div", "#f1f4ff"],
        ["#built", "#f1f4ff"],
        ["#results", "#f1f4ff"],
      ]) {
        await page.locator(selector).first().evaluate((element) => {
          const sectionTop = window.scrollY + element.getBoundingClientRect().top;
          window.scrollTo(0, sectionTop + 12);
        });
        await assertTheme(page, expectedTheme);
      }
      await page.screenshot({
        path: `${screenshotDirectory}/${capturePrefix}-${device}-${locale}-sage-section.png`,
      });
      await open(page, `${root}/${locale}/contact`);
      await open(page, `${casePath}#built`);
      await assertTheme(page, "#f1f4ff");
      await page.screenshot({
        path: `${screenshotDirectory}/${capturePrefix}-${device}-${locale}-paper-section.png`,
      });
      const contactName = locale === "en" ? "Contact" : "連絡先";
      await page.waitForLoadState("networkidle");
      await page.getByRole("link", { name: contactName, exact: true }).evaluate(
        (link) => link.click(),
      );
      await page.waitForURL(`**/${locale}/contact`);
      await assertTheme(page);
      await page.waitForLoadState("networkidle");
      await page.goBack();
      await page.waitForURL(`**/${locale}/projects/event-platform#built`);
      await assertTheme(page, "#f1f4ff");
      await scrollToEdge(page, "top");
      await assertTheme(page);
      await page.setViewportSize({ ...viewport, height: viewport.height - 100 });
      await assertTheme(page);
      await page.setViewportSize(viewport);
      await open(page, `${root}/${locale}/projects/unknown-project`, 404);
      await assertTheme(page);
      console.log(`${device} ${locale}: ${routes.length} routes, edge backgrounds, section tint, anchor, navigation, history and 404 pass`);
    }

    await open(page, root);
    assert.equal(new URL(page.url()).pathname, `${root}/en`);
    await assertTheme(page);
    await open(page, "/en");
    assert.equal(await page.locator("html.atlas-generative").count(), 1);
    await assertTheme(page);
    await open(page, "/lab/full/atlas-generative/en");
    assert.equal(new URL(page.url()).pathname, "/en");
    await assertTheme(page);
    await context.close();
  }

  for (const colorScheme of ["light", "dark"]) {
    const context = await browser.newContext({ javaScriptEnabled: false, colorScheme });
    const page = await context.newPage();
    for (const locale of ["en", "ja"]) {
      for (const route of ["", "/contact", "/projects/local-speech"]) {
        await open(page, `${root}/${locale}${route}`);
        await assertTheme(page);
      }
    }
    await context.close();
  }

  await writeFile(
    `${screenshotDirectory}/${capturePrefix}-results.json`,
    `${JSON.stringify({ baseUrl, engine: browser.version(), results, browserErrors, prefetchErrors }, null, 2)}\n`,
  );
  assert.deepEqual(browserErrors, []);
  console.log(`WebKit: all ${routes.length * 2} routes on desktop/mobile, no-JavaScript light/dark, root isolation and entry redirect pass; screenshots saved`);
  if (prefetchErrors.length)
    console.log(`${prefetchErrors.length} WebKit RSC prefetch failures during history/resize were recorded separately in the results`);
} finally {
  await browser.close();
}
