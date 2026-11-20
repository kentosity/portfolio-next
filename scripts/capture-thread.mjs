import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const origin = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3068";
const pass = process.argv[2] || "final";
const directory = "/tmp/aide-proto/shots";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
for (const [device, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const locale of ["en", "ja"]) {
    for (const [name, path] of [
      ["home", ""],
      ["collection", "/projects"],
      ["case", "/projects/event-platform"],
    ]) {
      await page.goto(`${origin}/lab/full/thread/${locale}${path}`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      const prefix = `${directory}/full-thread-${name}-${device}-${locale}-${pass}`;
      await page.screenshot({ path: `${prefix}.png` });
      await page.screenshot({ path: `${prefix}-full.png`, fullPage: true });
      if (name === "case")
        await page
          .locator("#results")
          .screenshot({ path: `${prefix}-results.png` });
    }
  }
  await context.close();
}
await browser.close();
console.log(
  `Thread screenshots saved: ${directory}/full-thread-*-${pass}*.png`,
);
