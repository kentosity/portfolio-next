import type { Metadata } from "next";
import { Syne } from "next/font/google";
import careerProfile from "../../content/career-profile.json";
import Archive, { type ArchiveProject } from "./print-archive";
import type { PrintKind } from "./art";
import styles from "./prints.module.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-print-display",
});

export const metadata: Metadata = {
  title: "Work, in print. | Kento Iizuka",
  description:
    "An archive of engineering projects, each interpreted as an original, repeatable computational print.",
};

const editions: {
  kind: PrintKind;
  name: string;
  title: string;
  summary: string;
  summaryJa: string;
  interpretation: string;
  interpretationJa: string;
}[] = [
  {
    kind: "current",
    name: "Confluence",
    title: "Salon data platform",
    summary:
      "Connects salon sales data to reporting, with automated imports and checks for missing or duplicate records.",
    summaryJa:
      "美容室の売上データをレポートにつなぎ、取り込みの自動化と欠落・重複の検出を行う基盤。",
    interpretation:
      "Seven streams bend into a shared current, echoing the movement from separate data sources to one reporting system.",
    interpretationJa:
      "7本の流れが一つのうねりを作ります。分かれたデータを集計へつなぐ仕組みから着想しました。",
  },
  {
    kind: "voice",
    name: "Utterance",
    title: "Local speech tool",
    summary:
      "Turns AI responses into streaming speech on macOS, with word-timed captions and playback controls.",
    summaryJa:
      "AIの応答をmacOSで音声再生し、単語に同期する字幕と再生操作を提供するツール。",
    interpretation:
      "Nested oscillations gather around a quiet center. The seven technologies in the stack set the harmonic frequency.",
    interpretationJa:
      "静かな中心を囲む振動を重ねました。使用技術の数である7が、波の周波数を決めています。",
  },
  {
    kind: "routes",
    name: "Common ground",
    title: "Event platform",
    summary:
      "Separates reservations and check-in into reusable services, reducing annual infrastructure costs by about 95%.",
    summaryJa:
      "予約とチェックインを再利用できる機能に分け、年間インフラ費を約95%削減した基盤。",
    interpretation:
      "Six families of paths share a small set of turns, interpreting the platform's modular, reusable structure.",
    interpretationJa:
      "6組の経路が同じ曲がり角を共有します。再利用できるモジュール構成を線で表しました。",
  },
];

export default function GenerativePage() {
  const reviewed =
    careerProfile.generated_from.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? "undated";
  const projects: ArchiveProject[] = careerProfile.featuredProjects
    .slice(0, 3)
    .map((project, index) => ({
      ...editions[index],
      sourceTitle: project.title,
      sourceSummary: project.oneLiner,
      stack: project.stack,
      href: project.link,
      reviewed,
    }));

  return (
    <div className={`${display.variable} ${styles.archive}`}>
      <Archive projects={projects} />
    </div>
  );
}
