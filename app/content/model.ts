export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Record<Locale, T>;
export type Area = "ai-tools" | "data-systems" | "products-websites";

export type ContentTodo = { id: string; text: Localized };
export type Project = {
  id: string;
  slug: string;
  legacySlugs: string[];
  title: Localized;
  summary: Localized;
  description: Localized;
  association: Localized;
  contribution: Localized;
  area: Area;
  collectionOrder: number;
  homeOrder: number | null;
  stage: Localized;
  problem: Localized;
  workflow: Localized<string[]>;
  decisions: Localized<string[]>;
  results: Localized;
  stack: { name: string; responsibility: Localized }[];
  related: string[];
  todos: Record<
    "context" | "decisions" | "artifacts" | "evidence" | "reflection",
    ContentTodo
  >;
  metric?: {
    currency: string;
    period: string;
    before: number;
    after: number;
    percent: number;
  };
};

export type SiteContent = {
  source: { repository: string; revision: string; reviewedOn: string };
  identity: {
    name: Localized;
    location: Localized;
    role: Localized;
    email: string;
    origin: string;
  };
  links: { label: string; url: string }[];
  introduction: Localized;
  about: Localized<string[]>;
  experience: {
    id: string;
    company: string;
    title: Localized;
    period: Localized;
    summary: Localized;
    bullets: Localized<string[]>;
  }[];
  skills: { title: Localized; items: Localized<string[]> }[];
  education: { school: Localized; description: Localized }[];
  todos: Record<string, ContentTodo>;
  projects: Project[];
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
