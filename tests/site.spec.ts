import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { siteContent } from "../app/content/site-content";
import { locales } from "../app/content/model";
import { corePages } from "../lib/content";
import { legacySlugs } from "../lib/legacy";

const canonicalOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || siteContent.identity.origin;
const allPaths = [
  ...corePages,
  ...siteContent.projects.map((project) => `projects/${project.slug}`),
];

for (const locale of locales) {
  for (const route of allPaths) {
    test(`${locale}/${route || "home"} renders with localized metadata and usable layout`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const suffix = route ? `/${route}` : "";
      const response = await page.goto(`/${locale}${suffix}`);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toContain("noindex");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveClass(/atlas-generative/);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${canonicalOrigin}/${locale}${suffix}`,
      );
      for (const alternate of locales) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alternate}"]`),
        ).toHaveAttribute("href", `${canonicalOrigin}/${alternate}${suffix}`);
      }
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
        "href",
        `${canonicalOrigin}/en${suffix}`,
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        locale === "en" ? "en_US" : "ja_JP",
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      expect(
        await page.locator('script[type="application/ld+json"]').count(),
      ).toBeGreaterThan(0);
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(hasOverflow).toBe(false);
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} collection lists every project and problem filters work`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/projects`);
    await expect(page.locator("[data-project]")).toHaveCount(12);
    const operations = page.locator("nav a[href$='?problem=operations']");
    await operations.click();
    await expect(page).toHaveURL(/problem=operations/);
    await expect(page.locator("[data-project]")).toHaveCount(3);
    const otherLocale = locale === "en" ? "ja" : "en";
    await page.getByRole("link", { name: otherLocale === "ja" ? "JP" : "EN", exact: true }).click();
    await expect(page).toHaveURL(
      new RegExp(`/${otherLocale}/projects\\?problem=operations`),
    );
    await expect(page.locator("[data-project]")).toHaveCount(3);
  });

  test(`${locale} language switching keeps a case-study section anchor`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/projects/local-speech#results`);
    const otherLocale = locale === "en" ? "ja" : "en";
    await page.getByRole("link", { name: otherLocale === "ja" ? "JP" : "EN", exact: true }).click();
    await expect(page).toHaveURL(
      new RegExp(`/${otherLocale}/projects/local-speech#results`),
    );
  });

  test(`${locale} home leads with the four curated cases and all links work without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100",
    });
    const page = await context.newPage();
    await page.goto(`/${locale}`);
    expect(
      await page
        .locator("[data-project]")
        .evaluateAll((cards) =>
          cards.map((card) => card.getAttribute("data-project")),
        ),
    ).toEqual([
      "local-speech",
      "event-platform",
      "salon-data-platform",
      "subsidy-search-pilot",
    ]);
    await page.goto(`/${locale}/projects?problem=operations`);
    await expect(page.locator("[data-project]")).toHaveCount(3);
    await page.locator('article[data-project="event-platform"] a').first().click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/event-platform`));
    await expect(page.locator("main h1")).toBeVisible();
    await context.close();
  });

  test(`${locale} contact and resume routes stay available`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/contact`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(`a[href^="mailto:"]`).first()).toBeVisible();
    await page.goto(`/${locale}/resume`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByText(locale === "en" ? "FalconeX Inc." : "FalconeX Inc.")).toBeVisible();
    await expect(
      page.getByText(locale === "en" ? "April 2020" : "2020年4月"),
    ).toBeVisible();
  });

  test(`${locale} home, collection and case screenshots`, async ({
    page,
  }, testInfo) => {
    const directory =
      process.env.SCREENSHOT_DIR || testInfo.outputPath("shots");
    await mkdir(directory, { recursive: true });
    for (const [name, route] of [
      ["home", ""],
      ["collection", "/projects"],
      ["case", "/projects/local-speech"],
    ]) {
      await page.goto(`/${locale}${route}`);
      await page.screenshot({
        path: path.join(
          directory,
          `${locale}-${name}-${testInfo.project.name}.png`,
        ),
        fullPage: true,
      });
    }
  });
}

test("all current and historical project slugs receive explicit handling through both old URL families", async ({
  request,
}) => {
  const redirects = siteContent.projects.flatMap((project) =>
    [project.slug, ...project.legacySlugs].map((slug) => ({
      slug,
      canonical: project.slug,
    })),
  );
  expect(redirects.length + legacySlugs.length).toBe(34);
  for (const redirect of redirects) {
    for (const prefix of ["/projects", "/portfolio/projects"]) {
      const response = await request.get(`${prefix}/${redirect.slug}`, {
        maxRedirects: 0,
      });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(
        `/ja/projects/${redirect.canonical}`,
      );
    }
  }
  for (const slug of legacySlugs) {
    const response = await request.get(`/projects/${slug}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    const duplicate = await request.get(`/portfolio/projects/${slug}`, {
      maxRedirects: 0,
    });
    expect(duplicate.status()).toBe(308);
    expect(duplicate.headers().location).toBe(`/projects/${slug}`);
  }
  for (const [route, location] of [
    ["/", "/en"],
    ["/portfolio", "/ja"],
    ["/en/projects/wecall", "/en/projects/event-platform"],
    ["/lab/full/atlas-generative", "/en"],
    ["/lab/full/atlas-generative/en", "/en"],
    ["/lab/full/atlas-generative/ja/projects", "/ja/projects"],
    ["/lab/full/atlas-generative/prints/event-platform", "/prints/event-platform"],
  ]) {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(location);
  }
});

test("unknown routes return 404 and SEO artifacts contain only reviewed canonical pages", async ({
  request,
}) => {
  for (const route of [
    "/en/projects/unknown",
    "/ja/projects/unknown",
    "/projects/unknown",
    "/fr",
    "/en/unknown",
  ]) {
    expect((await request.get(route)).status()).toBe(404);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect((xml.match(/<loc>/g) || []).length).toBe(36);
  expect(xml).not.toContain("?area=");
  expect(xml).not.toContain("/projects/wecall");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});

test("localized home and all case covers are actual 1200 by 630 PNG images", async ({
  request,
}) => {
  for (const locale of locales) {
    const routes = [
      `/${locale}/opengraph-image`,
      ...siteContent.projects.map(
        (project) => `/${locale}/projects/${project.slug}/opengraph-image`,
      ),
    ];
    for (const route of routes) {
      const response = await request.get(route);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      const png = await response.body();
      expect(png.readUInt32BE(16)).toBe(1200);
      expect(png.readUInt32BE(20)).toBe(630);
    }
  }
});

test("public routes do not render TODO or placeholder markers", async ({
  request,
}) => {
  const routes = [
    "/",
    ...locales.flatMap((locale) => [
      ...corePages.map((route) => (route ? `/${locale}/${route}` : `/${locale}`)),
      ...siteContent.projects.map(
        (project) => `/${locale}/projects/${project.slug}`,
      ),
    ]),
    ...legacySlugs.map((slug) => `/projects/${slug}`),
  ];
  const banned =
    /TODO|data-todo|content-todo|review-notice|awaiting review|awaiting reconciliation|確認待ち/i;
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.ok(), route).toBe(true);
    expect(await response.text(), route).not.toMatch(banned);
  }
});
