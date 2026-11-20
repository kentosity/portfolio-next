import profile from "../../content/career-profile.json";

export type Language = "en" | "ja";
export type Localized = Record<Language, string>;

type ProjectDescription = {
  title: string;
  shortTitle: Localized;
  summary: Localized;
  workflow: Record<Language, string[]>;
};

const descriptionsByProjectLink: Record<string, ProjectDescription> = {
  "/portfolio/projects/salon-data-platform": {
    title: "Salon data platform",
    shortTitle: { en: "Data, connected.", ja: "データをつなぐ。" },
    summary: {
      en: "Connects salon sales data to reports, with automated imports and checks for missing or duplicate records.",
      ja: "美容室の売上データをレポートにつなぎ、取り込みの自動化と欠落・重複の検出を行います。",
    },
    workflow: { en: ["Sales data", "Import & check", "Reports"], ja: ["売上データ", "取り込み・検証", "レポート"] },
  },
  "/portfolio/projects/local-speech": {
    title: "Local speech tool",
    shortTitle: { en: "Words, spoken.", ja: "言葉を声に。" },
    summary: {
      en: "Turns AI responses into streaming speech on macOS, with word-timed captions and playback controls.",
      ja: "AIの応答をmacOSで音声再生し、単語に同期する字幕と再生操作を提供します。",
    },
    workflow: { en: ["AI response", "Speech synthesis", "Voice & captions"], ja: ["AIの応答", "音声合成", "音声・字幕"] },
  },
  "/portfolio/projects/event-platform": {
    title: "Event platform",
    shortTitle: { en: "Events, simplified.", ja: "予約をわかりやすく。" },
    summary: {
      en: "Separates reservations and check-in into reusable services, reducing annual infrastructure costs by about 95%.",
      ja: "予約とチェックインを再利用できる機能に分け、年間インフラ費を約95%削減しました。",
    },
    workflow: { en: ["Reservation", "Shared services", "Check-in"], ja: ["予約", "共通の機能", "チェックイン"] },
  },
};

export const projects = profile.featuredProjects.flatMap((project) => {
  const description = descriptionsByProjectLink[project.link];
  if (!description) return [];

  return [{
    ...description,
    sourceTitle: project.title,
    sourceSummary: project.oneLiner,
    href: project.link,
    stack: project.stack,
    role: project.role,
  }];
});

export type Project = (typeof projects)[number];
export const projectTitle = (project: Project, language: Language) =>
  language === "ja" ? project.sourceTitle : project.title;
