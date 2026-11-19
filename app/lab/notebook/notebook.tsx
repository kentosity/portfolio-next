"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DataDiagram,
  DiagramDefinitions,
  EventDiagram,
  SpeechDiagram,
} from "./diagrams";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Language = "en" | "ja";
type Project = {
  title: string;
  oneLiner: string;
  stack: string;
  role: string;
  link: string;
};
type Translation = { en: string; ja: string };
type Study = {
  slug: string;
  title: string;
  subject: Translation;
  summary: Translation;
  note: Translation;
  stages: { title: Translation; detail: Translation }[];
  Diagram: typeof DataDiagram;
};

const studies: Study[] = [
  {
    slug: "data",
    title: "From data to decisions.",
    subject: { en: "Salon data platform", ja: "データ連携・レポート基盤" },
    summary: {
      en: "Connecting a salon chain’s POS exports to reliable reports and a dashboard people can use.",
      ja: "美容室チェーンのPOSデータを集め、集計とダッシュボードにつなぐ基盤。",
    },
    note: {
      en: "Good reports begin with good inputs.",
      ja: "レポートは、入力から。",
    },
    stages: [
      {
        title: { en: "Collect", ja: "集める" },
        detail: {
          en: "Scheduled Windows POS exports and full or date-window imports feed Parquet staging.",
          ja: "Windows POSの定期帳票出力と、全件・期間指定の取り込みをParquet形式で受け渡します。",
        },
      },
      {
        title: { en: "Check", ja: "確かめる" },
        detail: {
          en: "TypeScript and Python bring data into BigQuery. Report calculations flag missing and duplicate inputs.",
          ja: "TypeScriptとPythonでBigQueryへ取り込み。集計で入力の欠落や重複を検出します。",
        },
      },
      {
        title: { en: "Explore", ja: "読み解く" },
        detail: {
          en: "A React and Fastify dashboard connects reporting calculations with the people who use them.",
          ja: "ReactとFastifyのダッシュボードで、集計したデータを使いやすいレポートにします。",
        },
      },
    ],
    Diagram: DataDiagram,
  },
  {
    slug: "speech",
    title: "Giving words a voice.",
    subject: { en: "Local AI speech", ja: "ローカルAI音声合成" },
    summary: {
      en: "A personal tool that turns AI-agent responses into streaming speech, with captions that follow each word.",
      ja: "AIエージェントの応答をストリーミング音声に変え、単語に同期する字幕とともに再生する個人用ツール。",
    },
    note: {
      en: "Timing is part of the interface.",
      ja: "タイミングも、使い心地。",
    },
    stages: [
      {
        title: { en: "Respond", ja: "応答する" },
        detail: {
          en: "Agent responses become the input for a personal speech tool built with existing Herdr and AI assistance.",
          ja: "既存のHerdrを利用し、AI支援で開発した個人用ツールにエージェントの応答を渡します。",
        },
      },
      {
        title: { en: "Synthesize", ja: "声にする" },
        detail: {
          en: "Python streams locally synthesized speech using MLX and Kokoro models.",
          ja: "PythonとMLX・Kokoroの音声モデルで、ローカルの音声合成をストリーミングします。",
        },
      },
      {
        title: { en: "Listen", ja: "聞く" },
        detail: {
          en: "The Swift macOS player handles word-timed captions, cancellation and playback handover.",
          ja: "SwiftのmacOSプレーヤーが単語に同期する字幕、キャンセル、再生の引き継ぎを扱います。",
        },
      },
    ],
    Diagram: SpeechDiagram,
  },
  {
    slug: "events",
    title: "Built for the next event.",
    subject: { en: "Event platform", ja: "イベント管理基盤" },
    summary: {
      en: "A LINE-connected reservation platform, rebuilt around reusable event configurations and separate check-in features.",
      ja: "LINE連携の予約基盤を再設計。イベント設定を再利用できるようにし、予約とチェックインの機能を分離しました。",
    },
    note: {
      en: "Annual infrastructure cost: about $200k to $10k.",
      ja: "年間インフラ費：約20万ドルから約1万ドルへ。",
    },
    stages: [
      {
        title: { en: "Reserve", ja: "予約する" },
        detail: {
          en: "Guests reserve through a LINE-connected experience built with Nuxt and TypeScript.",
          ja: "NuxtとTypeScriptで開発したLINE連携の画面から、ゲストが予約します。",
        },
      },
      {
        title: { en: "Validate", ja: "検証する" },
        detail: {
          en: "Shared validation keeps the reservation and check-in features working from a common set of rules.",
          ja: "予約・チェックインの機能が共通のルールを使えるよう、バリデーションを整備しました。",
        },
      },
      {
        title: { en: "Reuse", ja: "再利用する" },
        detail: {
          en: "AWS Lambda and DynamoDB support modular features and reusable event configurations, with an analytics pipeline.",
          ja: "AWS LambdaとDynamoDBで機能を分離。再利用できるイベント構成と、分析用データ連携を整備しました。",
        },
      },
    ],
    Diagram: EventDiagram,
  },
];

function StudyPage({
  study,
  project,
  language,
}: {
  study: Study;
  project: Project;
  language: Language;
}) {
  const [selectedStage, setSelectedStage] = useState(0);
  const Diagram = study.Diagram;
  const selectedDetail = study.stages[selectedStage];

  return (
    <section
      id={study.slug}
      className="notebook-study"
      aria-labelledby={`${study.slug}-title`}
    >
      <div className="study-heading">
        <div>
          <p className="study-subject">{study.subject[language]}</p>
          <h2 id={`${study.slug}-title`}>
            {language === "en" ? study.title : study.subject.ja}
          </h2>
        </div>
      </div>
      <div className="study-body">
        <div className="drawing-area">
          <Diagram selectedStage={selectedStage} language={language} />
          <div
            className="stage-controls"
            role="group"
            aria-label={
              language === "en"
                ? `Inspect ${study.subject.en}`
                : `${study.subject.ja}の工程を見る`
            }
          >
            <span className="stage-prompt">
              {language === "en" ? "Follow the flow" : "流れをたどる"}
            </span>
            {study.stages.map((stage, index) => (
              <button
                key={stage.title.en}
                aria-pressed={selectedStage === index}
                onClick={() => setSelectedStage(index)}
              >
                <span aria-hidden="true">{index + 1}</span>
                {stage.title[language]}
              </button>
            ))}
          </div>
        </div>
        <div className="study-notes">
          <p className="project-summary">{study.summary[language]}</p>
          <div className="stage-detail" aria-live="polite" aria-atomic="true">
            <h3>{selectedDetail.title[language]}</h3>
            <p>{selectedDetail.detail[language]}</p>
          </div>
          <p className="margin-note">{study.note[language]}</p>
          <Link className="project-link" href={project.link}>
            {language === "en" ? "Read the project" : "プロジェクトを読む"}
            <span className="link-book" aria-hidden="true">
              ▱
            </span>
          </Link>
          <details className="technical-note">
            <summary>
              {language === "en" ? "Under the hood" : "使った技術"}
            </summary>
            <p>{project.stack}</p>
            <p lang="ja">{project.oneLiner}</p>
          </details>
        </div>
      </div>
      <div className="study-footer">
        <span lang={language === "en" ? "ja" : "en"}>
          {language === "en" ? study.subject.ja : study.subject.en}
        </span>
        <span>
          {language === "en"
            ? "Kento Iizuka / engineering notes"
            : "飯塚健杜 / エンジニアリングノート"}
        </span>
      </div>
    </section>
  );
}

export default function Notebook({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [activeStudy, setActiveStudy] = useState("data");

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        root.current
          ?.querySelectorAll<SVGSVGElement>(".notebook-diagram")
          .forEach((diagram) => {
            const paths = Array.from(
              diagram.querySelectorAll<SVGGeometryElement>("[data-draw]"),
            );
            const drawing = gsap.timeline({
              scrollTrigger: {
                trigger: diagram,
                start: "top 92%",
                once: true,
              },
            });
            paths.forEach((path, index) => {
              const length = path.getTotalLength();
              drawing.fromTo(
                path,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  duration: 1.25,
                  ease: "power2.inOut",
                },
                index * 0.018,
              );
            });
          });
        gsap.fromTo(
          ".hero-underline",
          { strokeDasharray: 520, strokeDashoffset: 520 },
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" },
        );
      });
      root.current
        ?.querySelectorAll<HTMLElement>(".notebook-study")
        .forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveStudy(section.id),
            onEnterBack: () => setActiveStudy(section.id),
          });
        });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="field-notebook" lang={language}>
      <DiagramDefinitions />
      <a className="notebook-skip" href="#notebook-projects">
        {language === "en" ? "Skip to projects" : "プロジェクトへ移動"}
      </a>
      <header className="notebook-header">
        <Link className="notebook-brand" href="/portfolio">
          <span className="brand-mark" aria-hidden="true">
            ki.
          </span>
          <span>
            Kento Iizuka
            <span className="brand-japanese" lang="ja">
              飯塚 健杜
            </span>
          </span>
        </Link>
        <div className="header-middle">
          {language === "en"
            ? "An engineer’s field notebook"
            : "エンジニアのフィールドノート"}
        </div>
        <div className="header-actions">
          <Link href="/portfolio#about">
            {language === "en" ? "About me" : "自己紹介"}
          </Link>
          <div
            className="language-control"
            role="group"
            aria-label="Language / 言語"
          >
            <button
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button
              lang="ja"
              aria-pressed={language === "ja"}
              onClick={() => setLanguage("ja")}
            >
              日本語
            </button>
          </div>
        </div>
      </header>
      <div className="notebook-layout">
        <aside
          className="notebook-index"
          aria-label={language === "en" ? "Notebook index" : "ノートの目次"}
        >
          <div className="index-sticky">
            <p className="index-label">
              {language === "en" ? "In this notebook" : "このノートの中身"}
            </p>
            <nav>
              {studies.map((study) => (
                <a
                  href={`#${study.slug}`}
                  key={study.slug}
                  className={activeStudy === study.slug ? "is-current" : ""}
                  aria-current={
                    activeStudy === study.slug ? "location" : undefined
                  }
                >
                  <span className="index-dot" aria-hidden="true" />
                  {study.subject[language]}
                </a>
              ))}
            </nav>
            <div className="index-scribble" aria-hidden="true">
              <svg viewBox="0 0 100 85">
                <path d="M10 18L48 2L86 20L49 40ZM10 18V60L49 81L86 61V20M49 40V81M18 31L40 43M18 40L40 52M18 49L40 61M58 46L78 35M58 55L78 44M58 64L78 53" />
              </svg>
              <span>
                {language === "en"
                  ? "Always a work in progress."
                  : "つくって、考えて、またつくる。"}
              </span>
            </div>
            <a className="index-bottom" href="https://github.com/kentosity">
              GitHub
            </a>
          </div>
        </aside>
        <main>
          <section className="notebook-intro">
            <div className="intro-copy">
              <p className="intro-eyebrow">
                {language === "en"
                  ? "Selected work, sketched out."
                  : "つくったものを、ひもとく。"}
              </p>
              <h1>
                {language === "en" ? (
                  <>
                    Working things.
                    <br />
                    Thinking on paper.
                  </>
                ) : (
                  <>
                    つくること。
                    <br />
                    考えたこと。
                  </>
                )}
              </h1>
              <svg
                className="intro-underline"
                viewBox="0 0 520 20"
                aria-hidden="true"
              >
                <path
                  className="hero-underline"
                  d="M4 12Q171 1 291 9T509 5M12 16Q255 8 439 15"
                />
              </svg>
            </div>
            <div className="intro-note">
              <span className="handwritten" lang="ja">
                しくみを、ひらく。
              </span>
              <p>
                {language === "en"
                  ? "A few things I’ve built, with the moving parts made visible. Follow a line. See how it works."
                  : "これまでにつくったものと、その中のしくみ。線をたどって、動きを見てみる。"}
              </p>
              <svg viewBox="0 0 150 61" aria-hidden="true">
                <path d="M12 7Q123-2 115 31Q105 65 45 41M53 33L42 41L55 49" />
              </svg>
            </div>
          </section>
          <div id="notebook-projects" tabIndex={-1}>
            {studies.map((study, index) => (
              <StudyPage
                key={study.slug}
                study={study}
                project={projects[index]}
                language={language}
              />
            ))}
          </div>
          <footer className="notebook-end">
            <span className="handwritten">
              {language === "en"
                ? "More to make. More to learn."
                : "まだまだ、つくりたい。"}
            </span>
            <Link href="/portfolio">
              {language === "en" ? "Back to the portfolio" : "ポートフォリオへ"}
            </Link>
            <span className="end-signature">k.i.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
