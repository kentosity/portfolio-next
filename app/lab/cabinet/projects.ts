export type ObjectKind = "data" | "speech" | "events" | "search";
export type Language = "en" | "ja";

export type CabinetProject = {
  kind: ObjectKind;
  title: string;
  oneLiner: string;
  stack: string;
  role: string;
  link: string;
  englishTitle: string;
  englishSummary: string;
  englishRole: string;
  shortTitle: Record<Language, string>;
};

export const projectObjects: Record<string, Pick<CabinetProject, "kind" | "englishTitle" | "englishSummary" | "englishRole" | "shortTitle">> = {
  "/portfolio/projects/salon-data-platform": {
    kind: "data",
    englishRole: "Data integration, application development, and automation",
    shortTitle: { en: "Salon data platform", ja: "データ連携基盤" },
    englishTitle: "Salon data platform",
    englishSummary: "Connects salon POS data to BigQuery, reporting, and a React dashboard. The pipeline handles scheduled exports and checks for missing or duplicate data.",
  },
  "/portfolio/projects/local-speech": {
    kind: "speech",
    englishRole: "AI-assisted tool development",
    shortTitle: { en: "Local AI speech", ja: "ローカル音声ツール" },
    englishTitle: "Local AI speech",
    englishSummary: "Turns AI-agent responses into speech on a Mac. A Python streaming service and Swift player support word-timed captions, cancellation, and playback handover.",
  },
  "/portfolio/projects/event-platform": {
    kind: "events",
    englishRole: "Architecture and full-stack engineering",
    shortTitle: { en: "Event infrastructure", ja: "イベント管理基盤" },
    englishTitle: "Event infrastructure",
    englishSummary: "Connects LINE reservations and event check-in through reusable services. The rearchitecture reduced annual infrastructure costs by approximately 95%.",
  },
  "/portfolio/projects/subsidy-search-pilot": {
    kind: "search",
    englishRole: "Prototype development",
    shortTitle: { en: "Subsidy search", ja: "補助金検索AI" },
    englishTitle: "Subsidy search assistant",
    englishSummary: "Turns a business’s funding needs into search conditions and source-linked subsidy candidates. A React workspace connects AI conversations to a queued search worker.",
  },
};
