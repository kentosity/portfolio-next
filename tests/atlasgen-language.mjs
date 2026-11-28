import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { webkit } from "@playwright/test";
import { siteContent } from "../app/content/site-content.ts";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3163";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const prefix = process.env.CAPTURE_PREFIX ?? "atlasgen-language";
const root = "";
const routes = ["", "/projects", "/about", "/resume", "/work-together", "/contact",
  ...siteContent.projects.map(project => `/projects/${project.slug}`)];
const results = [];
const browser = await webkit.launch();
await mkdir(screenshotDirectory, { recursive: true });

async function checkSwitch(page, locale) {
  await page.evaluate(() => scrollTo(0, 0));
  const header = page.locator("header").first();
  const languages = header.getByRole("navigation", { name: locale === "en" ? "Language" : "言語", exact: true });
  assert.equal((await languages.innerText()).replace(/\s/g, ""), "EN/JP");
  assert.deepEqual(await languages.getByRole("link").allTextContents(), ["EN", "JP"]);
  const active = languages.locator('[aria-current="true"]');
  assert.equal(await active.innerText(), locale === "en" ? "EN" : "JP");
  const metrics = await languages.getByRole("link").evaluateAll(nodes => nodes.map(node => {
    const box = node.getBoundingClientRect();
    return { label: node.textContent, top: box.top, width: box.width, height: box.height, color: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor };
  }));
  for (const item of metrics) {
    assert(item.top >= 0 && item.top < 200);
    assert(item.width >= 44 && item.height >= 44);
  }
  assert.equal(await active.evaluate(node => getComputedStyle(node).backgroundColor), "rgb(241, 244, 255)");
  return metrics;
}

try {
  for (const [device, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, isMobile: device === "mobile", hasTouch: device === "mobile", reducedMotion: "reduce" });
    for (const locale of ["en", "ja"]) {
      for (const route of routes) {
        await page.waitForLoadState("networkidle");
        const response = await page.goto(`${baseUrl}${root}/${locale}${route}`);
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        const metrics = await checkSwitch(page, locale);
        results.push({ device, locale, route, metrics });
        if (route === "") await page.screenshot({ path: `${screenshotDirectory}/${prefix}-${device}-${locale}.png` });
      }
    }
    for (const suffix of ["/projects?problem=coordination", "/projects/epicpull?problem=coordination#built", "/contact?project=epicpull#projects"]) {
      await page.waitForLoadState("networkidle");
      await page.goto(`${baseUrl}${root}/en${suffix}`);
      await checkSwitch(page, "en");
      await page.getByRole("link", { name: "JP", exact: true }).click();
      await page.waitForURL(`${baseUrl}${root}/ja${suffix}`);
      await checkSwitch(page, "ja");
      await page.getByRole("link", { name: "EN", exact: true }).click();
      await page.waitForURL(`${baseUrl}${root}/en${suffix}`);
      await checkSwitch(page, "en");
    }
    const missing = await page.goto(`${baseUrl}${root}/en/projects/unknown-project`);
    assert.equal(missing.status(), 404);
    await checkSwitch(page, "en");
    await page.getByRole("link", { name: "JP", exact: true }).click();
    await page.waitForURL(`${baseUrl}${root}/ja/projects/unknown-project`);
    await checkSwitch(page, "ja");
    assert.match(await page.locator("main h1").innerText(), /プロジェクトが見つかりません/);
    await page.close();
    console.log(`${device}: EN / JP is visible and highlighted on all 36 routes; switching preserves page, filter, contact project and section anchor`);
  }
  await writeFile(`${screenshotDirectory}/${prefix}-results.json`, `${JSON.stringify({ baseUrl, results }, null, 2)}\n`);
} finally {
  await browser.close();
}
