import { test, expect } from "@playwright/test";
import { siteContent } from "../app/content/site-content";
import { copy } from "../app/content/copy";

const root = "/lab/full/thread";
const pages = [
  "",
  "projects",
  "about",
  "resume",
  "work-together",
  "contact",
  ...siteContent.projects.map((project) => `projects/${project.slug}`),
];

for (const locale of ["en", "ja"] as const) {
  for (const path of pages) {
    test(`${locale}/${path || "home"} is readable and navigable`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(
        `${root}/${locale}${path ? `/${path}` : ""}`,
      );
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.title()).toContain(siteContent.identity.name[locale]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.getByRole("navigation", {
          name: locale === "en" ? "Main navigation" : "メインナビゲーション",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: locale === "en" ? "日本語で読む" : "Read in English",
        }),
      ).toHaveAttribute(
        "href",
        `${root}/${locale === "en" ? "ja" : "en"}${path ? `/${path}` : ""}`,
      );
      expect(await page.locator("body").innerText()).not.toMatch(
        /TXTO|TELA|hairline/,
      );
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} collection retains its filter through a case and language switch`, async ({
    page,
  }) => {
    await page.goto(`${root}/${locale}/projects`);
    await expect(page.locator("[data-project]")).toHaveCount(
      siteContent.projects.length,
    );
    await page
      .locator(`a[href="${root}/${locale}/projects?area=data-systems"]`)
      .click();
    await expect(page.locator("[data-project]")).toHaveCount(
      siteContent.projects.filter((project) => project.area === "data-systems")
        .length,
    );
    await page.locator(`[data-project="event-platform"] h3 a`).click();
    await expect(page).toHaveURL(
      /projects\/event-platform\?area=data-systems$/,
    );
    await page
      .getByRole("link", {
        name: locale === "en" ? "日本語で読む" : "Read in English",
      })
      .click();
    const otherLocale = locale === "en" ? "ja" : "en";
    await expect(page).toHaveURL(
      `${root}/${otherLocale}/projects/event-platform?area=data-systems`,
    );
    await page
      .getByRole("link", { name: copy[otherLocale].back, exact: true })
      .click();
    await expect(page).toHaveURL(
      `${root}/${otherLocale}/projects?area=data-systems`,
    );
  });

  test(`${locale} project threads respond to selection and unweaving`, async ({
    page,
  }) => {
    await page.goto(`${root}/${locale}`);
    const event = siteContent.projects.find(
      (project) => project.slug === "event-platform",
    )!;
    await page
      .getByRole("button", { name: event.title[locale], exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: event.title[locale], exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[aria-live="polite"] h2')).toHaveText(
      event.title[locale],
    );
    const loosen = page.getByRole("button", {
      name: locale === "en" ? "Loosen the weave" : "織り目をほどく",
    });
    await loosen.click();
    await expect(page.locator('svg[data-loose="true"]')).toHaveCount(1);
    await page.locator('[aria-live="polite"] a').click();
    await expect(page).toHaveURL(`${root}/${locale}/projects/event-platform`);
    await page.locator("#workflow button").nth(1).click();
    await expect(page.locator("#workflow button").nth(1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator('#workflow [aria-live="polite"]')).toContainText(
      event.decisions[locale][1],
    );
    await expect(page.locator("#results")).toContainText("95%");
    await expect(page.locator("#results")).toContainText("200,000");
    await page
      .getByRole("link", { name: copy[locale].discuss, exact: true })
      .click();
    await expect(page).toHaveURL(
      `${root}/${locale}/contact?project=event-platform#projects`,
    );
    const email = page.locator('#projects a[href^="mailto:"]');
    const mailto = new URL((await email.getAttribute("href"))!);
    expect(mailto.searchParams.get("subject")).toContain(event.title[locale]);
    expect(mailto.searchParams.get("body")).toContain(event.title[locale]);
  });
}

test("keyboard skip, reduced motion, root redirect and missing case", async ({
  page,
}) => {
  await page.goto(root);
  await expect(page).toHaveURL(`${root}/en`);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#thread-content")).toBeFocused();
  expect(
    await page
      .locator("svg path")
      .first()
      .evaluate((path) => getComputedStyle(path).transitionDuration),
  ).toBe("0s");
  const response = await page.goto(`${root}/en/projects/missing-project`);
  expect(response?.status()).toBe(404);
});

test("case content and collection remain useful without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    `${process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3067"}${root}/ja/projects/local-speech`,
  );
  await expect(page.locator("#built")).toContainText("Python");
  await expect(page.locator("#stack dt")).not.toHaveCount(0);
  await expect(page.locator("#workflow button")).toHaveCount(3);
  await context.close();
});

for (const width of [320, 768]) {
  test(`${width}px layouts keep the main reading paths within the viewport`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const origin = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100";
    for (const locale of ["en", "ja"]) {
      for (const path of [
        "",
        "/projects",
        "/projects/event-platform",
        "/contact",
      ]) {
        await page.goto(`${origin}${root}/${locale}${path}`);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    }
    await context.close();
  });
}
