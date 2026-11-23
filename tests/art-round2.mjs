import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3274";
const shotDirectory = process.env.SHOT_DIR ?? "/tmp/aide-proto/shots";
const pass = process.env.CAPTURE_PASS ?? "final";
const captureOnly = process.env.CAPTURE_ONLY === "1";
const studies = [
  { slug: "tidal-glass", title: "Tidal glass", action: "Turn the tide" },
  { slug: "paper-sun", title: "Paper sun", action: "Open the flower" },
  { slug: "name-knot", title: "Name knot", action: "Turn the sculpture" },
  { slug: "prism-garden", title: "Prism garden", action: "Send a wave" },
];
const browserErrors = [];
const checks = [];
const performanceSamples = [];
const browser = await chromium.launch({
  headless: true,
  chromiumSandbox: true,
});
await mkdir(shotDirectory, { recursive: true });

async function open(page, study) {
  const response = await page.goto(`${baseUrl}/lab/art/${study.slug}`);
  assert.equal(response.status(), 200);
  await page.locator('canvas[data-ready="true"]').waitFor();
  assert.equal(await page.locator("h1").innerText(), study.title);
  assert.match(
    await page.locator('meta[name="robots"]').getAttribute("content"),
    /noindex/,
  );
  await page.waitForTimeout(120);
}

async function pixels(page) {
  const data = await page
    .locator("canvas")
    .evaluate((canvas) => canvas.toDataURL());
  return createHash("sha256").update(data).digest("hex");
}

async function stable(page) {
  await page.waitForTimeout(100);
  const before = await pixels(page);
  const frames = await page.locator("canvas").getAttribute("data-frames");
  await page.waitForTimeout(200);
  assert.equal(await pixels(page), before, "still-frame pixels stay fixed");
  assert.equal(
    await page.locator("canvas").getAttribute("data-frames"),
    frames,
    "still frames stop scheduling work",
  );
}

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));
  for (const study of studies) {
    await open(page, study);
    await page.screenshot({
      path: `${shotDirectory}/art2-${study.slug}-${pass}-desktop.png`,
      fullPage: true,
    });
    const print = await page
      .locator("canvas")
      .evaluate((canvas) => canvas.toDataURL().split(",")[1]);
    await writeFile(
      `${shotDirectory}/art2-${study.slug}-${pass}-artwork.png`,
      Buffer.from(print, "base64"),
    );
    if (captureOnly) continue;
    const initial = await pixels(page);
    await page.reload();
    await page.locator('canvas[data-ready="true"]').waitFor();
    await page.waitForTimeout(100);
    assert.equal(await pixels(page), initial, "a seed reproduces after reload");
    await stable(page);
    await page.getByRole("button", { name: study.action, exact: true }).click();
    await page.waitForTimeout(100);
    assert.notEqual(
      await pixels(page),
      initial,
      "the main action changes the print even with reduced motion",
    );
    await stable(page);
    const shifted = await pixels(page);
    const slider = page.getByRole("slider");
    await slider.focus();
    await slider.press("End");
    await page.waitForTimeout(100);
    assert.notEqual(
      await pixels(page),
      shifted,
      "keyboard parameter controls change the print",
    );
    await page.getByRole("button", { name: "New seed", exact: true }).click();
    await page.waitForFunction(
      () =>
        document.querySelector("canvas")?.dataset.seed === "8170" &&
        document.querySelector("canvas")?.dataset.ready === "true",
    );
    assert.notEqual(
      await pixels(page),
      initial,
      "a new seed creates a new composition",
    );
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save print", exact: true }).click();
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), `${study.slug}-8170.png`);
    await download.saveAs(`${shotDirectory}/art2-${study.slug}-export.png`);
    checks.push(
      `${study.slug}: deterministic seed, still frame, action, keyboard parameter, new seed, PNG export`,
    );
  }

  if (!captureOnly) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const study of studies) {
      await open(page, study);
      const canvas = page.locator("canvas");
      await canvas.scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Pause", exact: true }).click();
      await stable(page);
      await page.getByRole("button", { name: "Play", exact: true }).click();
      await canvas.scrollIntoViewIfNeeded();
      const bounds = await canvas.boundingBox();
      await page.mouse.move(
        bounds.x + bounds.width * 0.8,
        bounds.y + bounds.height * 0.35,
      );
      await page.waitForTimeout(450);
      await canvas.screenshot({
        path: `${shotDirectory}/art2-${study.slug}-interactive.png`,
      });
      const framesBefore = Number(await canvas.getAttribute("data-frames"));
      const intervals = await page.evaluate(
        () =>
          new Promise((resolve) => {
            const samples = [];
            let previous = 0;
            function next(now) {
              if (previous) samples.push(now - previous);
              previous = now;
              if (samples.length < 120) requestAnimationFrame(next);
              else resolve(samples);
            }
            requestAnimationFrame(next);
          }),
      );
      const renderedFrames =
        Number(await canvas.getAttribute("data-frames")) - framesBefore;
      assert.ok(
        renderedFrames >= 115 && renderedFrames <= 125,
        "each animation draws once per browser frame",
      );
      intervals.sort((a, b) => a - b);
      performanceSamples.push({
        slug: study.slug,
        sampleCount: intervals.length,
        medianMs: intervals[60],
        p95Ms: intervals[114],
        over25ms: intervals.filter((value) => value > 25).length,
        renderedFrames,
      });
      console.log(JSON.stringify(performanceSamples.at(-1)));
      assert.ok(
        intervals[114] < 21,
        `${study.slug} stays within the local 60fps frame budget`,
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      await stable(page);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.setViewportSize({ width: 1440, height: 200 });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(150);
      const isOffscreen = await canvas.evaluate(
        (element) => element.getBoundingClientRect().bottom <= 0,
      );
      assert.ok(isOffscreen, "the artwork is fully outside the viewport");
      await stable(page);
      await page.setViewportSize({ width: 1440, height: 1100 });
      checks.push(
        `${study.slug}: pause/play, pointer, runtime reduced-motion preference, animation timing`,
      );
    }
    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    mobile.on("pageerror", (error) => browserErrors.push(error.message));
    for (const width of [320, 390, 768, 1024]) {
      await mobile.setViewportSize({ width, height: 844 });
      for (const study of studies) {
        await open(mobile, study);
        assert.ok(
          await mobile.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${study.slug} fits ${width}px`,
        );
        await mobile
          .getByRole("button", { name: study.action, exact: true })
          .tap();
        await stable(mobile);
        if (width === 390)
          await mobile.screenshot({
            path: `${shotDirectory}/art2-${study.slug}-mobile.png`,
            fullPage: true,
          });
      }
    }
    checks.push("all sketches: 320/390/768/1024px layouts and touch actions");
    const noScript = await browser.newPage({ javaScriptEnabled: false });
    for (const study of studies) {
      const response = await noScript.goto(`${baseUrl}/lab/art/${study.slug}`);
      assert.equal(response.status(), 200);
      const poster = await noScript.request.get(
        `${baseUrl}/art2/${study.slug}.png`,
      );
      assert.equal(poster.status(), 200);
      assert.match(poster.headers()["content-type"], /image\/png/);
    }
    await noScript.screenshot({
      path: `${shotDirectory}/art2-no-javascript.png`,
      fullPage: true,
    });
    const noGL = await browser.newPage();
    await noGL.addInitScript(() => {
      const getContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type === "webgl2") return null;
        return getContext.call(this, type, ...args);
      };
    });
    for (const study of studies.slice(0, 3)) {
      await noGL.goto(`${baseUrl}/lab/art/${study.slug}`);
      await noGL.waitForTimeout(300);
      assert.equal(
        await noGL.locator("canvas").getAttribute("data-ready"),
        "false",
      );
      assert.equal(
        await noGL
          .getByRole("link", { name: "Save print", exact: true })
          .getAttribute("href"),
        `/art2/${study.slug}.png`,
      );
      await noGL.screenshot({
        path: `${shotDirectory}/art2-${study.slug}-no-webgl.png`,
        fullPage: true,
      });
      await open(page, study);
      await page
        .locator("canvas")
        .evaluate((canvas) =>
          canvas
            .getContext("webgl2")
            .getExtension("WEBGL_lose_context")
            .loseContext(),
        );
      await page.waitForFunction(
        () => document.querySelector("canvas")?.dataset.ready === "false",
      );
      await page.getByRole("button", { name: "New seed", exact: true }).click();
      await page.locator('canvas[data-ready="true"]').waitFor();
    }
    checks.push(
      "static posters without JavaScript, no-WebGL still print, context-loss fallback",
    );
    for (const slug of ["sorting-room", "untangled", "finding-flow"]) {
      const response = await page.goto(`${baseUrl}/lab/art/${slug}`);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('svg[role="img"]').count(), 1);
    }
    assert.equal(
      (await page.goto(`${baseUrl}/lab/art/unknown-study`)).status(),
      404,
    );
    for (const locale of ["en", "ja"])
      assert.equal(
        (
          await page.goto(`${baseUrl}/lab/full/atlas-generative/${locale}`)
        ).status(),
        200,
      );
    checks.push(
      "round-one routes, unknown-route 404, EN/JA portfolio smoke checks",
    );
  }
  assert.deepEqual(browserErrors, []);
  const report = { baseUrl, pass, checks, performanceSamples, browserErrors };
  await writeFile(
    `${shotDirectory}/art2-verification-${pass}.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
