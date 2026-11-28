import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { webkit } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3163";
const screenshotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const prefix = process.env.CAPTURE_PREFIX ?? "atlasgen-career";
const root = "";
const results = [];
const browser = await webkit.launch();
await mkdir(screenshotDirectory, { recursive: true });

async function open(page, path) {
  await page.waitForLoadState("networkidle");
  const response = await page.goto(`${baseUrl}${path}`);
  assert.equal(response.status(), 200, path);
  await page.evaluate(() => document.fonts.ready);
  assert.doesNotMatch(await page.locator("header").first().innerText(), /Kento Iizuka|Software, given structure|飯塚健杜|仕組みを、わかりやすく/);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}

try {
  for (const [device, viewport] of [
    ["desktop", { width: 1440, height: 900 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({
      viewport,
      isMobile: device === "mobile",
      hasTouch: device === "mobile",
      reducedMotion: "reduce",
    });
    for (const locale of ["en", "ja"]) {
      await open(page, `${root}/${locale}/projects`);
      const entry = page.locator('article[data-project="epicpull"]');
      assert.equal(await entry.count(), 1);
      assert.equal(await page.locator('article[data-project="zencard"]').count(), 0);
      assert.match(await entry.innerText(), locale === "en" ? /ZenCard/ : /株式会社ZenCard/);
      assert.deepEqual(await entry.locator("dt").allTextContents(), locale === "en" ? ["Built", "Result"] : ["つくったもの", "結果"]);
      await entry.screenshot({ path: `${screenshotDirectory}/${prefix}-${device}-${locale}-entry.png` });
      await open(page, `${root}/${locale}/projects?problem=coordination`);
      assert.equal(await page.locator('article[data-project="epicpull"]').count(), 1);
      assert.equal(await page.locator("article[data-project]").count(), 4);
      await page.locator('article[data-project="epicpull"]').getByRole("link", {
        name: locale === "en" ? "Read the case study" : "事例を読む",
        exact: true,
      }).click();
      await page.waitForURL(`**/${locale}/projects/epicpull?problem=coordination`);
      const caseText = await page.locator("main").innerText();
      for (const technology of ["Privy", "Solana", "USDC", "Coinflow", "Laravel", "Next.js", "React", "TypeScript"])
        assert(caseText.includes(technology), technology);
      assert.doesNotMatch(caseText, /TXTO|TELA|\bintern\b|part[ -]time|アルバイト/i);
      assert.doesNotMatch(await page.locator("#results").innerText(), /\$|%/);
      for (const section of ["problem", "built", "decisions", "results", "artifacts", "stack"])
        assert.equal(await page.locator(`#${section}`).count(), 1);
      if (locale === "ja")
        for (const heading of await page.locator("main h1, main h2, main h3").allTextContents())
          assert.match(heading, /[\u3040-\u30ff\u4e00-\u9fff]/);
      await page.screenshot({ path: `${screenshotDirectory}/${prefix}-${device}-${locale}-case.png`, fullPage: true, animations: "disabled" });

      for (const route of ["", "/about", "/resume"]) {
        await open(page, `${root}/${locale}${route}`);
        const job = page.locator('[data-experience="zencard"]');
        assert.equal(await job.count(), 1, `${locale}${route}: single ZenCard role`);
        assert.equal(await job.locator("h3").innerText(), locale === "en" ? "ZenCard" : "株式会社ZenCard");
        assert.match(await job.innerText(), locale === "en" ? /February 2026 – August 2026/ : /2026年2月 – 2026年8月/);
        assert.match(await job.innerText(), locale === "en" ? /Contract/ : /業務委託/);
        const introduction = await page.locator('[data-experience="introduction"]').innerText();
        assert.match(introduction, /CTO/);
        assert.match(introduction, locale === "en" ? /Full-time CTO/ : /正社員・CTO/);
        assert.doesNotMatch(introduction, /\bintern\b|part[ -]time|アルバイト/i);
        assert.match(introduction, locale === "en" ? /April 2020 – April 2024/ : /2020年4月 – 2024年4月/);
        const falconex = await page.locator('[data-experience="falconex"]').innerText();
        assert.match(falconex, locale === "en" ? /February 2026 – Present/ : /2026年2月 – 現在/);
        assert.doesNotMatch(falconex, /Around|頃/);
        assert.doesNotMatch(await page.locator("main").innerText(), /TXTO|TELA|\bintern\b|part[ -]time|アルバイト/i);
        if (route === "")
          assert.equal(await page.getByText(locale === "en" ? "AI Engineer" : "AIエンジニア", { exact: true }).count(), 2);
      }

      const skills = page.locator("ul").filter({ has: page.locator("li").filter({ hasText: /^TypeScript$/ }) });
      const items = await skills.locator("li").evaluateAll((nodes) => nodes.map((node) => {
        const box = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const range = document.createRange();
        range.selectNodeContents(node);
        const textBox = range.getBoundingClientRect();
        return {
          label: node.textContent,
          top: box.top, left: box.left, width: box.width, height: box.height,
          textTop: textBox.top, textHeight: textBox.height,
          marginTop: style.marginTop,
          paddingTop: style.paddingTop, paddingBottom: style.paddingBottom,
          lineHeight: style.lineHeight, fontFamily: style.fontFamily, fontSize: style.fontSize,
          fontLoaded: document.fonts.check(`${style.fontSize} ${style.fontFamily}`),
          childElements: node.childElementCount,
        };
      }));
      assert(items.length > 1);
      for (const item of items) assert.equal(item.marginTop, "0px", item.label);
      const firstRowTop = items[0].top;
      assert(Math.abs(items[1].top - firstRowTop) < 0.5, "TypeScript aligns with its next skill");
      assert(Math.abs(items[1].textTop - items[0].textTop) < 0.5, "Skill text boxes share a baseline row");
      for (const item of items) {
        assert.equal(item.paddingTop, items[0].paddingTop);
        assert.equal(item.paddingBottom, items[0].paddingBottom);
        assert.equal(item.lineHeight, items[0].lineHeight);
        assert.equal(item.fontLoaded, true);
        assert.equal(item.childElements, 0);
      }
      await skills.screenshot({ path: `${screenshotDirectory}/${prefix}-${device}-${locale}-skills.png` });
      await skills.screenshot({
        path: `${screenshotDirectory}/${prefix}-${device}-${locale}-skills-bounds.png`,
        style: "li { outline: 1px solid #ffdb91; outline-offset: -1px; }",
      });
      results.push({ device, locale, items });
      console.log(`${device} ${locale}: one EpicPull project, one ZenCard role, CTO dates, localized case and aligned skills pass`);
    }
    await page.close();
  }
  await writeFile(`${screenshotDirectory}/${prefix}-results.json`, `${JSON.stringify({ baseUrl, results }, null, 2)}\n`);
} finally {
  await browser.close();
}
