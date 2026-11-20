import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
import { locales } from "../app/content/model";
import { copy, areas } from "../app/content/copy";
import { corePages, featuredProjects, siteContent } from "../lib/content";

const base = "/lab/full/generative";
const paths = [
  ...corePages,
  ...siteContent.projects.map((project) => `projects/${project.slug}`),
];

for (const locale of locales) {
  test(`generative ${locale} unknown case offers a localized route back`, async ({
    page,
  }) => {
    const response = await page.goto(`${base}/${locale}/projects/unknown`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      copy[locale].notFound,
    );
    await page
      .getByRole("link", { name: copy[locale].viewProjects, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${base}/${locale}/projects$`));
  });

  for (const path of paths) {
    test(`generative ${locale}/${path || "home"} serves localized content and navigation`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const suffix = path ? `/${path}` : "";
      const response = await page.goto(`${base}/${locale}${suffix}`);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toContain("noindex");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${siteContent.identity.origin}${base}/${locale}${suffix}`,
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        locale === "en" ? "en_US" : "ja_JP",
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      expect(overflow).toBe(false);
      const internalLinks = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(internalLinks.every((href) => href?.startsWith(base))).toBe(true);
      if (path.startsWith("projects/")) {
        const slug = path.split("/")[1];
        await expect(page.locator("[data-todo]")).toHaveCount(5);
        await expect(
          page.locator(`[data-todo="${slug}-artifacts"]`),
        ).toBeVisible();
        await expect(page.locator("#built figure button")).toHaveCount(3);
      }
      expect(errors).toEqual([]);
    });
  }

  test(`generative ${locale} collection preserves filter, return position and language`, async ({
    page,
  }) => {
    await page.goto(`${base}/${locale}/projects`);
    await expect(page.locator("[data-project]")).toHaveCount(11);
    for (const area of areas) {
      await page
        .getByRole("navigation", { name: copy[locale].filter })
        .getByRole("link", { name: area.title[locale], exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`area=${area.id}`));
      const count = siteContent.projects.filter(
        (project) => project.area === area.id,
      ).length;
      await expect(page.locator("[data-project]")).toHaveCount(count);
      await expect(page.getByRole("status")).toContainText(`${count}`);
    }
    await page.goBack();
    await expect(page).toHaveURL(/area=data-systems/);
    const ticket = page.locator('[data-project="event-ticketing"] h2 a');
    await ticket.scrollIntoViewIfNeeded();
    const position = await page.evaluate(() => scrollY);
    await ticket.click();
    await expect(page).toHaveURL(
      /projects\/event-ticketing\?area=data-systems/,
    );
    await page
      .getByRole("link", { name: copy[locale].back, exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${base}/${locale}/projects\\?area=data-systems`),
    );
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeCloseTo(position, -1);
    const otherLocale = locale === "en" ? "ja" : "en";
    await page.locator(`header a[hreflang="${otherLocale}"]`).click();
    await expect(page).toHaveURL(
      new RegExp(`${base}/${otherLocale}/projects\\?area=data-systems`),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", otherLocale);
    await expect(page.locator("[data-project]")).toHaveCount(3);
  });

  for (const project of featuredProjects) {
    test(`generative ${locale}/${project.slug} supports repeatable prints and SVG downloads`, async ({
      page,
    }) => {
      await page.goto(`${base}/${locale}/projects/${project.slug}`);
      const artwork = page.locator("article > header figure svg");
      const original = await artwork.evaluate((element) => element.outerHTML);
      const vary = page.getByRole("button", {
        name: locale === "en" ? "Vary the print" : "図案を変える",
        exact: true,
      });
      await vary.focus();
      await page.keyboard.press("Enter");
      await expect
        .poll(() => artwork.evaluate((element) => element.outerHTML))
        .not.toBe(original);
      const construction = page.getByRole("button", {
        name: locale === "en" ? "Show construction" : "構成を見る",
        exact: true,
      });
      await construction.click();
      await expect(construction).toHaveAttribute("aria-pressed", "true");
      const downloadPromise = page.waitForEvent("download");
      await page
        .getByRole("button", {
          name: locale === "en" ? "Save SVG" : "SVGを保存",
          exact: true,
        })
        .click();
      const download = await downloadPromise;
      const file = await download.path();
      const svg = await readFile(file!, "utf8");
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain("<path");
      expect(svg).not.toContain("<script");
      await page
        .getByRole("button", {
          name: locale === "en" ? "Restore" : "元に戻す",
          exact: true,
        })
        .click();
      await expect
        .poll(() => artwork.evaluate((element) => element.outerHTML))
        .toBe(original);
      const stage = page.locator("#built button").nth(1);
      await stage.click();
      await expect(stage).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator('#built [data-selected="false"]')).toHaveCount(
        2,
      );
      await stage.click();
      await expect(page.locator('#built [data-selected="true"]')).toHaveCount(
        3,
      );
    });
  }

  test(`generative ${locale} language links retain the project and section`, async ({
    page,
  }) => {
    const otherLocale = locale === "en" ? "ja" : "en";
    await page.goto(
      `${base}/${locale}/projects/event-platform?area=data-systems#results`,
    );
    await page.locator(`header a[hreflang="${otherLocale}"]`).click();
    await expect(page).toHaveURL(
      `${test.info().project.use.baseURL}${base}/${otherLocale}/projects/event-platform?area=data-systems#results`,
    );
    await expect(page.locator("#results")).toContainText("200,000");
    await expect(page.locator("#results")).toContainText("10,000");
  });
}

test("generative reduced motion cancels arrangement and keeps print controls usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`${base}/en/projects/local-speech`);
  await page
    .getByRole("button", { name: "Vary the print", exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
  await page
    .getByRole("button", { name: "Vary the print", exact: true })
    .click();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test("generative unknown paths return 404 and its cover is a real PNG", async ({
  request,
}) => {
  for (const path of [
    "en/projects/unknown",
    "fr",
    "en/about/unknown",
    "en/projects/local-speech/unknown",
  ]) {
    expect((await request.get(`${base}/${path}`)).status()).toBe(404);
  }
  const root = await request.get(base);
  expect(root.url()).toContain(`${base}/en`);
  const image = await request.get(`${base}/opengraph-image`);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});
