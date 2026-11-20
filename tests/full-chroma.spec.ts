import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { copy } from "../app/content/copy";
import { siteContent } from "../app/content/site-content";
import { corePages } from "../lib/content";

const root = "/lab/full/chroma";
const routes = [
  ...corePages,
  ...siteContent.projects.map((project) => `projects/${project.slug}`),
];
const shotDirectory = "/tmp/aide-proto/shots";
const shotSuffix = process.env.CHROMA_CAPTURE_PASS
  ? `-${process.env.CHROMA_CAPTURE_PASS}`
  : "";

for (const locale of ["en", "ja"] as const) {
  for (const route of routes) {
    test(`${locale}/${route || "home"} is a complete chroma page`, async ({
      page,
    }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(
        `${root}/${locale}${route ? `/${route}` : ""}`,
      );
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toContain(`${root}/${locale}`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(page.viewportSize()!.width);
      expect(await page.locator("main").innerText()).not.toMatch(
        /TXTO|TELA|hairline|\bSure\b|\btax\b/i,
      );
      const internalLinks = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(internalLinks.every((href) => href?.startsWith(root))).toBe(true);

      if (route.startsWith("projects/")) {
        for (const section of [
          "problem",
          "contribution",
          "built",
          "decisions",
          "results",
          "artifacts",
          "stack",
          "reflection",
        ])
          await expect(page.locator(`#${section}`)).toBeAttached();
        await expect(page.locator("[data-todo]")).toHaveCount(5);
        await expect(
          page
            .getByRole("group", {
              name: locale === "en" ? "System stages" : "システムの各段階",
            })
            .getByRole("button"),
        ).toHaveCount(3);
      }
      if (route === "projects")
        await expect(page.locator("[data-project]")).toHaveCount(11);
      if (route === "")
        await expect(page.locator("[data-project]")).toHaveCount(4);

      const shotName =
        route === ""
          ? "home"
          : route === "projects"
            ? "collection"
            : route === "projects/event-platform"
              ? "case"
              : undefined;
      if (shotName) {
        await page.evaluate(() => document.fonts.ready);
        await mkdir(shotDirectory, { recursive: true });
        const languageSuffix = locale === "ja" ? "-ja" : "";
        await page.screenshot({
          path: `${shotDirectory}/full-chroma-${shotName}-${testInfo.project.name}${languageSuffix}${shotSuffix}.png`,
          fullPage: shotName === "collection",
        });
        if (shotName === "case")
          await page.locator("#built").screenshot({
            path: `${shotDirectory}/full-chroma-diagram-${testInfo.project.name}${languageSuffix}${shotSuffix}.png`,
          });
      }
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} filters, language and return position survive case navigation`, async ({
    page,
  }) => {
    await page.goto(`${root}/${locale}/projects?area=data-systems`);
    await expect(page.locator("[data-project]")).toHaveCount(3);
    await expect(page.getByRole("status")).toContainText("3");
    const otherLocale = locale === "en" ? "ja" : "en";
    await page
      .getByRole("link", {
        name: otherLocale === "en" ? "English" : "日本語",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      `${root}/${otherLocale}/projects?area=data-systems`,
    );
    await expect(page.locator("[data-project]")).toHaveCount(3);
    const caseLink = page.locator('[data-project="event-ticketing"] h3 a');
    await caseLink.scrollIntoViewIfNeeded();
    const scrollPosition = await page.evaluate(() => window.scrollY);
    await caseLink.click();
    await expect(page).toHaveURL(
      `${root}/${otherLocale}/projects/event-ticketing?area=data-systems`,
    );
    await page.locator("[data-collection-return]").click();
    await expect(page).toHaveURL(
      `${root}/${otherLocale}/projects?area=data-systems`,
    );
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeCloseTo(scrollPosition, -1);
  });

  test(`${locale} diagram and composition respond to keyboard with reduced motion`, async ({
    page,
  }) => {
    await page.goto(`${root}/${locale}`);
    const controls = page.locator('[aria-controls="chroma-selected-project"]');
    await controls.nth(1).focus();
    await page.keyboard.press("Enter");
    await expect(controls.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#chroma-selected-project")).toContainText(
      siteContent.projects.find((project) => project.homeOrder === 2)!.title[
        locale
      ],
    );
    await expect(page.locator(":focus-visible")).toHaveCount(1);
    await page.goto(`${root}/${locale}/projects/event-platform`);
    const stages = page
      .getByRole("group", {
        name: locale === "en" ? "System stages" : "システムの各段階",
      })
      .getByRole("button");
    await stages.nth(2).focus();
    await page.keyboard.press("Enter");
    await expect(stages.nth(2)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#chroma-stage-description")).toContainText(
      siteContent.projects.find((project) => project.slug === "event-platform")!
        .results[locale],
    );
    await page
      .getByRole("button", {
        name: locale === "en" ? "Turn the parts" : "図形を回す",
        exact: true,
      })
      .click();
    expect(
      await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    ).toBe(0);
    await expect(page.locator("#results")).toContainText("95%");
  });

  test(`${locale} contact preserves project context in the email draft link`, async ({
    page,
  }) => {
    await page.goto(`${root}/${locale}/contact?project=local-speech#projects`);
    const href = await page
      .locator("#projects a[href^='mailto:']")
      .getAttribute("href");
    const mail = new URL(href!);
    expect(mail.searchParams.get("subject")).toContain(
      siteContent.projects.find((project) => project.slug === "local-speech")!
        .title[locale],
    );
    expect(mail.searchParams.get("body")).toContain(copy[locale].projectPrompt);
    await page
      .getByRole("link", {
        name: locale === "en" ? "日本語" : "English",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      new RegExp(
        `/${locale === "en" ? "ja" : "en"}/contact\\?project=local-speech#projects$`,
      ),
    );
  });
}

test("navigation adapts to the viewport and reaches the collection", async ({
  page,
}, testInfo) => {
  await page.goto(`${root}/en`);
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  if (testInfo.project.name === "desktop") {
    await expect(menu).toBeHidden();
    await expect(page.locator("#chroma-navigation")).toBeVisible();
    await page
      .locator("#chroma-navigation")
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(page).toHaveURL(`${root}/en/projects`);
    return;
  }
  await menu.click();
  await expect(page.locator("#chroma-navigation")).toBeVisible();
  await page.locator("#chroma-navigation a").first().focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .locator("#chroma-navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(`${root}/en/projects`);
  await expect(page.locator("#chroma-navigation")).toBeHidden();
});

test("motion settles after a selection and respects a preference change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`${root}/en`);
  await page
    .locator('[aria-controls="chroma-selected-project"]')
    .nth(2)
    .click();
  await expect(page.locator('[data-selection="2"]')).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === "running").length,
      ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .locator('[aria-controls="chroma-selected-project"]')
    .nth(3)
    .click();
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
});

test("all cases remain readable at 320px in both languages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const locale of ["en", "ja"]) {
    for (const route of routes) {
      await page.goto(`${root}/${locale}${route ? `/${route}` : ""}`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${locale}/${route}`,
      ).toBe(320);
    }
  }
});

test("server-rendered content and links work with JavaScript disabled", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport:
      testInfo.project.name === "mobile"
        ? { width: 390, height: 844 }
        : { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  for (const locale of ["en", "ja"]) {
    await page.goto(
      `${testInfo.project.use.baseURL ?? testInfo.config.projects[0].use.baseURL}${root}/${locale}/projects`,
    );
    await expect(page.locator("[data-project]")).toHaveCount(11);
    await page.locator('[data-project="event-platform"] h3 a').click();
    await expect(page.locator("#results")).toContainText("95%");
    await expect(page.locator("#built button")).toHaveCount(4);
  }
  await context.close();
});

test("the entrance redirects and unknown pages return 404", async ({
  request,
}) => {
  const entrance = await request.get(root);
  expect(entrance.status()).toBe(200);
  expect(entrance.url()).toContain(`${root}/en`);
  for (const route of ["en/projects/missing", "ja/missing", "xx"])
    expect((await request.get(`${root}/${route}`)).status()).toBe(404);
});
