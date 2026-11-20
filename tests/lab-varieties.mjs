import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3120";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const suffix = process.env.CAPTURE_PASS ? `-${process.env.CAPTURE_PASS}` : "";
const directions = ["syntax", "chroma", "score", "atlas", "fold", "thread"];
const legacyRoutes = ["print", "notebook", "cabinet", "generative", "generative-original"];
const projectSlugs = ["salon-data-platform", "local-speech", "event-platform"];
const projectNames = ["Salon data platform", "Local speech tool", "Event platform"];
const failures = [];
const checks = [];
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});

await mkdir(screenshotDirectory, { recursive: true });

async function openPage(page, route) {
  const response = await page.goto(`${baseUrl}/lab/${route}`, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200, `${route} loads`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1, `${route} has one page title`);
}

async function switchLanguage(page, language) {
  await page.getByRole("button", { name: language.toUpperCase(), exact: true }).click();
  await page.locator(`[lang="${language}"] main`).waitFor();
}

async function verifyInteraction(page, direction) {
  if (direction === "syntax") {
    const align = page.getByRole("button", { name: "Bring into line", exact: true });
    await align.click();
    assert.equal(await page.getByRole("button", { name: "Loosen the type" }).getAttribute("aria-pressed"), "true");
  }
  if (direction === "chroma") {
    await page.getByRole("button", { name: projectNames[1], exact: true }).click();
    assert.equal(await page.getByRole("button", { name: projectNames[1], exact: true }).getAttribute("aria-pressed"), "true");
    assert.match(await page.locator('[aria-live="polite"]').textContent(), /streaming speech/);
  }
  if (direction === "score") {
    await page.getByRole("button", { name: "Play the connection" }).click();
    await page.getByRole("button", { name: projectNames[1], exact: true }).click();
    assert.match(await page.locator('[aria-live="polite"]').textContent(), /Words, spoken/);
    await page.waitForTimeout(1900);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === "running").length), 0, "signal settles");
  }
  if (direction === "atlas") {
    await page.getByRole("button", { name: "Stack the floors", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "Lift the floors" }).getAttribute("aria-pressed"), "false");
    await page.getByRole("button", { name: "Lift the floors" }).click();
    await page.getByRole("button", { name: projectNames[1], exact: true }).focus();
    await page.keyboard.press("Enter");
    assert.match(await page.locator('[aria-live="polite"]').textContent(), /streaming speech/);
  }
  if (direction === "fold") {
    for (const name of projectNames) {
      const fold = page.getByRole("button", { name: name, exact: true });
      if (await fold.getAttribute("aria-expanded") !== "true") await fold.click();
      const panelId = await fold.getAttribute("aria-controls");
      assert.equal(await page.locator(`#${panelId}`).isVisible(), true, `${name} unfolds`);
    }
  }
  if (direction === "thread") {
    await page.getByRole("button", { name: "Separate the threads" }).click();
    assert.equal(await page.getByRole("button", { name: "Weave them together" }).getAttribute("aria-pressed"), "false");
    await page.getByRole("button", { name: projectNames[1], exact: true }).click();
    assert.match(await page.locator('[aria-live="polite"]').textContent(), /streaming speech/);
  }
}

try {
  for (const direction of directions) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on("pageerror", error => failures.push(`${direction}: ${error.message}`));
    await openPage(page, `v-${direction}`);
    const visibleText = await page.locator("main").textContent();
    assert.doesNotMatch(visibleText, /TXTO|TELA|hairline|\bSure\b|\btax\b/i);
    if (direction === "thread") {
      for (const [index, name] of projectNames.entries()) {
        await page.getByRole("button", { name, exact: true }).click();
        assert.equal(await page.locator(`main a[href="/portfolio/projects/${projectSlugs[index]}"]`).count(), 1);
      }
    }
    for (const slug of direction === "thread" ? [projectSlugs[2]] : projectSlugs) assert(await page.locator(`main a[href="/portfolio/projects/${slug}"]`).count() > 0, `${direction} links real project ${slug}`);
    await verifyInteraction(page, direction);
    await switchLanguage(page, "ja");
    assert.match(await page.locator("main").textContent(), /データ|音声|予約/);
    await switchLanguage(page, "en");
    if (["chroma", "atlas", "thread"].includes(direction)) assert.match(await page.locator('[aria-live="polite"]').textContent(), /streaming speech/, "language change preserves selected project");

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const language of ["ja", "en"]) {
        await switchLanguage(page, language);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `${direction} ${language} fits ${width}px`);
      }
    }

    for (const [device, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
      await page.setViewportSize({ width, height });
      await openPage(page, `v-${direction}`);
      await page.screenshot({ path: `${screenshotDirectory}/var-${direction}-${device}${suffix}.png` });
      await switchLanguage(page, "ja");
      await page.screenshot({ path: `${screenshotDirectory}/var-${direction}-${device}-ja${suffix}.png`, fullPage: true });
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await switchLanguage(page, "en");
    await verifyInteraction(page, direction);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === "running").length), 0, `${direction} respects reduced motion`);
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.matches(":focus-visible")), true, "keyboard focus is visible");
    checks.push(`${direction}: interaction, EN/JA, state preservation, five widths, reduced motion, keyboard focus, desktop/mobile captures`);
    console.log(checks.at(-1));
    await page.close();
  }

  for (const slug of projectSlugs) {
    const response = await fetch(`${baseUrl}/portfolio/projects/${slug}`);
    assert.equal(response.status, 200, `${slug} case study loads`);
  }
  for (const route of legacyRoutes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on("pageerror", error => failures.push(`${route}: ${error.message}`));
    await openPage(page, route);
    await page.screenshot({ path: `${screenshotDirectory}/var-legacy-${route}.png` });
    await page.close();
  }
  checks.push("Five earlier prototypes and all three case studies load");

  if (process.env.CHECK_INDEX === "1") {
    const page = await browser.newPage();
    await openPage(page, "index");
    for (const route of [...directions.map(name => `v-${name}`), ...legacyRoutes]) assert.equal(await page.locator(`main a[href="/lab/${route}"]`).count(), 1);
    await page.locator("main img").last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll("main img")].every(img => img.complete && img.naturalWidth > 0));
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      for (const language of ["ja", "en"]) {
        await switchLanguage(page, language);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      }
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/lab/index`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${screenshotDirectory}/var-index-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `${screenshotDirectory}/var-index-mobile.png`, fullPage: true });
    checks.push("Bilingual index links all eleven routes and loads every thumbnail");
    await page.close();
  }
  assert.deepEqual(failures, [], "no browser errors");
  checks.push("No browser errors");
  await writeFile(`${screenshotDirectory}/var-check-results${suffix}.txt`, `${checks.join("\n")}\n`);
  console.log("All portfolio variety checks passed.");
} finally {
  await browser.close();
}
