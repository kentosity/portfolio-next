"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPrint, projectSeed, type PrintKind } from "./art";
import styles from "./prints.module.css";

export type ArchiveProject = {
  kind: PrintKind;
  name: string;
  title: string;
  sourceTitle: string;
  sourceSummary: string;
  summary: string;
  summaryJa: string;
  interpretation: string;
  interpretationJa: string;
  stack: string;
  href: string;
  reviewed: string;
};

type Language = "en" | "ja";

function printSource(project: ArchiveProject) {
  return {
    title: project.sourceTitle,
    stack: project.stack,
    reviewed: project.reviewed,
    kind: project.kind,
  };
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function Mark() {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <path
          key={index}
          d={`M${4 + index * 5} 5v${23 - index * 3}l${24 - index * 5} -${16 - index * 2}`}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function PrintImage({
  project,
  variation = 0,
  construction = false,
}: {
  project: ArchiveProject;
  variation?: number;
  construction?: boolean;
}) {
  const artwork = useMemo(
    () => createPrint(printSource(project), variation, construction),
    [project, variation, construction],
  );
  return (
    <div
      className={styles.artwork}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: artwork }}
    />
  );
}

export default function Archive({ projects }: { projects: ArchiveProject[] }) {
  const [language, setLanguage] = useState<Language>("en");
  const [selected, setSelected] = useState<ArchiveProject | null>(null);
  const [variation, setVariation] = useState(0);
  const [construction, setConstruction] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isJapanese = language === "ja";
  const text = (english: string, japanese: string) =>
    isJapanese ? japanese : english;

  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    closeButton.current?.focus();
  }, [selected]);

  function openPrint(project: ArchiveProject) {
    setSelected(project);
    setVariation(0);
    setConstruction(false);
  }

  function downloadPrint() {
    if (!selected) return;
    const artwork = createPrint(printSource(selected), variation);
    const url = URL.createObjectURL(
      new Blob([artwork], { type: "image/svg+xml" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selected.kind}-${projectSeed(printSource(selected)) + variation}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div lang={language}>
      <a className={styles.skipLink} href="#prints">
        {text("Skip to projects", "作品へ移動")}
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.identity}>
          <Mark />
          <span>
            Kento Iizuka
            <span className={styles.identitySubtitle}>
              {text("Engineer & maker", "エンジニア・つくる人")}
            </span>
          </span>
        </Link>
        <nav
          aria-label={text("Main navigation", "メインナビゲーション")}
          className={styles.navigation}
        >
          <a className={styles.currentLink} href="#prints">
            {text("Selected work", "制作したもの")}
            <span>3</span>
          </a>
          <Link className={styles.aboutLink} href="/portfolio#about">
            {text("About", "プロフィール")}
          </Link>
          <div className={styles.languages} aria-label="Language / 言語">
            <button
              type="button"
              aria-pressed={!isJapanese}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              aria-pressed={isJapanese}
              onClick={() => setLanguage("ja")}
            >
              JA
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section
          className={styles.introduction}
          aria-labelledby="archive-title"
        >
          <div className={styles.headlineBlock}>
            <p className={styles.collectionNote}>
              {text("The generative archive", "コードから生まれる作品集")}
            </p>
            <h1 id="archive-title">
              {text("Work, in print.", "つくる、そのかたち。")}
            </h1>
          </div>
          <div className={styles.introCopy}>
            <p>
              {text(
                "Projects become patterns. A small collection of things I’ve built, each with a print of its own.",
                "これまでにつくったものを、一枚ずつの作品に。プロジェクトの特徴から生まれた模様を並べました。",
              )}
            </p>
            <a href="#colophon">
              {text("How the prints are made", "作品ができるまで")}
              <Arrow />
            </a>
          </div>
        </section>

        <section
          id="prints"
          className={styles.gallery}
          aria-label={text("Selected project prints", "プロジェクトの作品集")}
        >
          {projects.map((project, index) => (
            <article
              className={`${styles.project} ${styles[project.kind]}`}
              key={project.href}
            >
              <button
                type="button"
                className={styles.frameButton}
                aria-haspopup="dialog"
                onClick={() => openPrint(project)}
                aria-label={text(
                  `Inspect ${project.name}, a print for ${project.title}`,
                  `${project.name}：${project.sourceTitle}の作品を見る`,
                )}
              >
                <div className={styles.frame}>
                  <div className={styles.paper}>
                    <PrintImage project={project} />
                    <div className={styles.printSignature}>
                      <span>{project.name}</span>
                      <span>KI / {String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>
                <span className={styles.inspectHint}>
                  {text("Inspect print", "作品を見る")}
                  <span aria-hidden="true">＋</span>
                </span>
              </button>
              <div className={styles.caption}>
                <div className={styles.captionHeading}>
                  <span className={styles.accession}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>
                    <Link href={project.href}>
                      {text(project.title, project.sourceTitle)}
                      <Arrow diagonal />
                    </Link>
                  </h2>
                </div>
                <p>{text(project.summary, project.summaryJa)}</p>
                <div className={styles.edition}>
                  <span>{project.name}</span>
                  <span>
                    {text("Seed", "シード")} {projectSeed(printSource(project))}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section
          className={styles.colophon}
          id="colophon"
          aria-labelledby="colophon-title"
        >
          <div className={styles.colophonTitle}>
            <span className={styles.seedMark} aria-hidden="true">
              ✳
            </span>
            <h2 id="colophon-title">
              {text(
                "A project leaves a pattern.",
                "プロジェクトが、模様を残す。",
              )}
            </h2>
          </div>
          <p>
            {text(
              "A name becomes a seed. The tools shape the lines. Every print is drawn with code, and the same project data brings it back, exactly. Open a frame to explore its construction or keep a copy.",
              "名前が種になり、使った技術が線を形づくります。すべてコードで描かれ、同じデータから同じ作品が生まれます。額を開くと、構造を見たり作品を保存したりできます。",
            )}
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          Kento Iizuka <span aria-hidden="true">©</span> 2026
        </span>
        <span>
          {text(
            "Made of logic. Open to chance.",
            "論理から生まれる、偶然のかたち。",
          )}
        </span>
        <a href="https://github.com/kentosity">
          GitHub
          <Arrow diagonal />
        </a>
      </footer>

      <dialog
        ref={dialog}
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => setSelected(null)}
        aria-labelledby="print-title"
      >
        {selected && (
          <div className={styles.inspection}>
            <div className={styles.inspectionArt}>
              <PrintImage
                project={selected}
                variation={variation}
                construction={construction}
              />
            </div>
            <div className={styles.inspectionCopy}>
              <button
                ref={closeButton}
                type="button"
                className={styles.closeButton}
                onClick={() => dialog.current?.close()}
                aria-label={text("Close print", "作品を閉じる")}
              >
                ×
              </button>
              <div className={styles.inspectionTopline}>
                <p className={styles.collectionNote}>
                  {text("Inside the print", "作品のしくみ")}
                </p>
                <div className={styles.languages} aria-label="Language / 言語">
                  <button
                    type="button"
                    aria-pressed={!isJapanese}
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </button>
                  <span aria-hidden="true">/</span>
                  <button
                    type="button"
                    aria-pressed={isJapanese}
                    onClick={() => setLanguage("ja")}
                  >
                    JA
                  </button>
                </div>
              </div>
              <h2 id="print-title">{selected.name}</h2>
              <p>{text(selected.interpretation, selected.interpretationJa)}</p>
              <div className={styles.seedReadout}>
                <span>{text("Seed", "シード")}</span>
                <output aria-live="polite">
                  {(projectSeed(printSource(selected)) + variation) >>> 0}
                </output>
              </div>
              <p className={styles.sourceNote}>
                {text(
                  "Derived from the project name, stack, and source review date",
                  "プロジェクト名・使用技術・データ確認日から生成",
                )}{" "}
                ({selected.reviewed}).
              </p>
              <div className={styles.studyControls}>
                <button
                  type="button"
                  aria-pressed={construction}
                  onClick={() => setConstruction(!construction)}
                >
                  {text("Show structure", "構造を表示")}
                </button>
                <button
                  type="button"
                  onClick={() => setVariation(variation + 1)}
                >
                  {text("Next variation", "次のバリエーション")}
                </button>
                <button
                  type="button"
                  disabled={variation === 0 && !construction}
                  onClick={() => {
                    setVariation(0);
                    setConstruction(false);
                  }}
                >
                  {text("Restore original", "元の作品に戻す")}
                </button>
              </div>
              <button
                type="button"
                className={styles.downloadButton}
                onClick={downloadPrint}
              >
                {text("Save this print", "作品を保存")}
                <span aria-hidden="true">↓</span>
              </button>
              <div className={styles.projectDetails}>
                <h3>{text(selected.title, selected.sourceTitle)}</h3>
                <p>{text(selected.summary, selected.sourceSummary)}</p>
                <p className={styles.stack}>{selected.stack}</p>
                <Link href={selected.href}>
                  {text("Read the project", "プロジェクトを読む")}
                  <Arrow diagonal />
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
