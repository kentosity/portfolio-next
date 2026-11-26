import type { Localized } from "@/app/content/model";

export const problemTypes = [
  "operations",
  "coordination",
  "information",
  "publishing",
] as const;
export type ProblemType = (typeof problemTypes)[number];

export const problemGroups: Record<
  ProblemType,
  { title: Localized; description: Localized }
> = {
  operations: {
    title: {
      en: "Make operations repeatable",
      ja: "業務を繰り返し使える仕組みにする",
    },
    description: {
      en: "Give recurring data and event workflows a reliable structure.",
      ja: "データ処理やイベント運営を、繰り返し使える構成に整える。",
    },
  },
  coordination: {
    title: { en: "Keep the parts in sync", ja: "別々の処理や画面をつなぐ" },
    description: {
      en: "Connect people, interfaces and processes around shared state.",
      ja: "使う人や処理が変わっても、同じ情報を引き継げるようにする。",
    },
  },
  information: {
    title: {
      en: "Find and share information",
      ja: "情報を探し、共有しやすくする",
    },
    description: {
      en: "Turn source material into something people can find, inspect and share.",
      ja: "元の情報を、探して確認し、共有できる形にする。",
    },
  },
  publishing: {
    title: {
      en: "Make websites easier to update",
      ja: "サイトを更新しやすくする",
    },
    description: {
      en: "Give expressive websites a clear editing and inquiry workflow.",
      ja: "伝わるページと、更新・問い合わせの流れを一緒に整える。",
    },
  },
};

export function isProblemType(value: unknown): value is ProblemType {
  return problemTypes.some((problemType) => problemType === value);
}

export const problemFraming: Record<
  string,
  { type: ProblemType; heading: Localized }
> = {
  epicpull: {
    type: "coordination",
    heading: {
      en: "Card purchases needed connected accounts and payments.",
      ja: "カードの購入に、認証と決済をつなぎたい。",
    },
  },
  "salon-data-platform": {
    type: "operations",
    heading: {
      en: "POS exports needed a path to reliable reports.",
      ja: "POS帳票を、検証できるレポートにつなぎたい。",
    },
  },
  "event-platform": {
    type: "operations",
    heading: {
      en: "Event setup needed reuse and lower running costs.",
      ja: "イベントの機能を再利用し、運用費を下げたい。",
    },
  },
  "event-ticketing": {
    type: "operations",
    heading: {
      en: "Ticket requests arrive all at once.",
      ja: "公開と同時に集中する発券要求を処理したい。",
    },
  },
  "local-speech": {
    type: "coordination",
    heading: {
      en: "Agent responses needed speech, captions and playback to work together.",
      ja: "音声と字幕を連動させて、エージェントの応答を聞きたい。",
    },
  },
  "agent-coordination": {
    type: "coordination",
    heading: {
      en: "Tasks need to survive a change of coordinator.",
      ja: "担当が変わっても、タスクと判断を引き継ぎたい。",
    },
  },
  "snap-photobooth": {
    type: "coordination",
    heading: {
      en: "Venue staff and guests need different views of the same event.",
      ja: "式場スタッフとゲストが、同じイベントを別々の画面で使いたい。",
    },
  },
  "subsidy-search-pilot": {
    type: "information",
    heading: {
      en: "Funding needs have to become a search people can check.",
      ja: "資金の相談から、出典を確認できる補助金候補を探したい。",
    },
  },
  "markdown-sharing": {
    type: "information",
    heading: {
      en: "A shared document needs an expiry date.",
      ja: "文書を、有効期限を決めて共有したい。",
    },
  },
  "ongy-viewer": {
    type: "information",
    heading: {
      en: "Story research needed a place to browse and organize.",
      ja: "調査で集めるストーリーを、閲覧・整理したい。",
    },
  },
  "architecture-portfolio": {
    type: "publishing",
    heading: {
      en: "Architecture projects need pages that stay easy to update.",
      ja: "建築の事例を伝えながら、継続して更新したい。",
    },
  },
  "falconex-site": {
    type: "publishing",
    heading: {
      en: "Company pages and inquiries needed a shared structure.",
      ja: "会社情報と問い合わせを、共通の構成で管理したい。",
    },
  },
};
