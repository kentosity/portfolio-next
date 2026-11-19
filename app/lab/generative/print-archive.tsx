"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPrint, projectSeed, type PrintKind } from "./art";
import PrintImage from "./print-image";
import styles from "./prints.module.css";

export type ArchiveProject = {
  kind: PrintKind;
  name: string;
  title: string;
  sourceTitle: string;
  summary: string;
  summaryJa: string;
  role: string;
  roleJa: string;
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

function Mark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5h7M15 5h14M3 12h15M23 12h6M3 19h7M15 19h14M3 26h15M23 26h6"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function LanguageSwitch({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div className={styles.languages} role="group" aria-label="Language / 言語">
      {(["en", "ja"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => onChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Archive({ projects }: { projects: ArchiveProject[] }) {
  const [language, setLanguage] = useState<Language>("en");
  const [selected, setSelected] = useState<ArchiveProject | null>(null);
  const [variations, setVariations] = useState<Record<PrintKind, number>>({
    current: 0,
    voice: 0,
    routes: 0,
  });
  const [arrangement, setArrangement] = useState(0);
  const [variation, setVariation] = useState(0);
  const [construction, setConstruction] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isJapanese = language === "ja";
  const text = (english: string, japanese: string) =>
    isJapanese ? japanese : english;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  function openPrint(project: ArchiveProject) {
    setSelected(project);
    setVariation(variations[project.kind]);
    setConstruction(false);
  }

  function remixPrint(project: ArchiveProject) {
    const nextVariation = variations[project.kind] + 1;
    setVariations((current) => ({ ...current, [project.kind]: nextVariation }));
    setAnnouncement(
      text(
        `${project.name}, variation ${nextVariation}.`,
        `${project.name}、バリエーション${nextVariation}。`,
      ),
    );
  }

  function keepFocusInPrint(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;

    const controls = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.getClientRects().length > 0);
    const firstControl = controls[0];
    const lastControl = controls[controls.length - 1];
    if (!firstControl || !lastControl) return;

    const shouldWrapBackward =
      event.shiftKey && document.activeElement === firstControl;
    const shouldWrapForward =
      !event.shiftKey && document.activeElement === lastControl;
    if (!shouldWrapBackward && !shouldWrapForward) return;

    event.preventDefault();
    const nextControl = shouldWrapBackward ? lastControl : firstControl;
    nextControl.focus();
  }

  function downloadPrint() {
    if (!selected) return;
    const artwork = createPrint(printSource(selected), variation);
    const url = URL.createObjectURL(
      new Blob([artwork], { type: "image/svg+xml" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selected.kind}-${(projectSeed(printSource(selected)) + variation) >>> 0}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div lang={language} className={styles.catalogue}>
      <a className={styles.skipLink} href="#prints">
        {text("Skip to projects", "作品へ移動")}
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.identity}>
          <Mark />
          <span>
            Kento Iizuka
            <span className={styles.identitySubtitle}>
              {text("Software engineer", "ソフトウェアエンジニア")}
            </span>
          </span>
        </Link>
        <nav
          aria-label={text("Main navigation", "メインナビゲーション")}
          className={styles.navigation}
        >
          <a className={styles.currentLink} href="#prints">
            {text("Work", "制作したもの")}
          </a>
          <Link className={styles.aboutLink} href="/portfolio#about">
            {text("About", "プロフィール")}
          </Link>
          <LanguageSwitch language={language} onChange={setLanguage} />
        </nav>
      </header>

      <main>
        <section
          className={styles.introduction}
          aria-labelledby="archive-title"
        >
          <h1 id="archive-title">{text("Selected work", "制作したもの")}</h1>
          <p>
            {text(
              "I like organizing code and systems so they make sense.",
              "コードや仕組みを整理して、わかりやすくするのが好きです。",
            )}
          </p>
        </section>

        <div className={styles.galleryTools}>
          <p>
            {text(
              "Three projects, interpreted as generative prints.",
              "3つのプロジェクトを、コードで描いた作品にしました。",
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setArrangement((current) => current + 1);
              setAnnouncement(
                text("All prints arranged.", "すべての作品を整えました。"),
              );
            }}
          >
            <Mark />
            {text("Arrange all prints", "すべての作品を整える")}
          </button>
        </div>

        <section
          id="prints"
          className={styles.gallery}
          aria-label={text("Selected project prints", "プロジェクトの作品集")}
        >
          {projects.map((project) => (
            <article className={styles.project} key={project.href}>
              <div className={styles.frame}>
                <div className={styles.paper}>
                  <PrintImage
                    source={printSource(project)}
                    variation={variations[project.kind]}
                    arrangement={arrangement}
                    remixLabel={text(
                      `Remix ${project.name}`,
                      `${project.name}を描き直す`,
                    )}
                    remixHint={text("Remix print", "作品を描き直す")}
                    onRemix={() => remixPrint(project)}
                  />
                  <div className={styles.printSignature} aria-hidden="true">
                    <span>{project.name}</span>
                    <span>Kento Iizuka</span>
                  </div>
                </div>
              </div>
              <div className={styles.printActions}>
                <span>{project.name}</span>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => openPrint(project)}
                  aria-label={text(
                    `Inspect ${project.name}`,
                    `${project.name}を見る`,
                  )}
                >
                  {text("Inspect print", "作品を見る")}
                  <span aria-hidden="true">＋</span>
                </button>
              </div>
              <div className={styles.caption}>
                <h2>
                  <Link href={project.href}>
                    {text(project.title, project.sourceTitle)}
                  </Link>
                </h2>
                <p className={styles.summary}>
                  {text(project.summary, project.summaryJa)}
                </p>
                <dl className={styles.projectFacts}>
                  <div>
                    <dt>{text("Role", "担当")}</dt>
                    <dd>{text(project.role, project.roleJa)}</dd>
                  </div>
                  <div>
                    <dt>{text("Stack", "技術")}</dt>
                    <dd>{project.stack}</dd>
                  </div>
                </dl>
                <Link className={styles.caseStudy} href={project.href}>
                  {text("Read project", "プロジェクトを読む")}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section
          className={styles.colophon}
          id="colophon"
          aria-labelledby="colophon-title"
        >
          <div>
            <Mark />
            <h2 id="colophon-title">
              {text("How the prints work", "作品のしくみ")}
            </h2>
          </div>
          <p>
            {text(
              "Each print gathers scattered lines into a structure. Hover to arrange it again, or click to make a new variation. The project’s name and tools give the original its shape. Open a print to explore its structure and save a copy.",
              "散らばった線が集まり、一つの構造になります。カーソルを重ねると整い直し、クリックすると別の形が生まれます。元の形は、プロジェクトの名前と使った技術から決まります。作品を開くと、構造の確認や保存ができます。",
            )}
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Kento Iizuka © 2026</span>
        <div>
          <Link href="/portfolio">
            {text("Full portfolio", "ポートフォリオ")}
          </Link>
          <a href="https://github.com/kentosity">GitHub</a>
        </div>
      </footer>
      <p className={styles.screenReaderOnly} role="status">
        {announcement}
      </p>

      <dialog
        ref={dialog}
        className={styles.dialog}
        lang={language}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={keepFocusInPrint}
        onClose={() => setSelected(null)}
        aria-labelledby="print-title"
      >
        {selected && (
          <div className={styles.inspection}>
            <div className={styles.inspectionArt}>
              <PrintImage
                source={printSource(selected)}
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
                <span>{text("Generative print", "コードで描いた作品")}</span>
                <LanguageSwitch language={language} onChange={setLanguage} />
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
                  "From the project name, stack, and source review date",
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
                  onClick={() => setVariation((current) => current + 1)}
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
              </button>
              <div className={styles.projectDetails}>
                <h3>{text(selected.title, selected.sourceTitle)}</h3>
                <p>{text(selected.summary, selected.summaryJa)}</p>
                <p className={styles.role}>
                  {text(selected.role, selected.roleJa)}
                </p>
                <p className={styles.stack}>{selected.stack}</p>
                <Link href={selected.href}>
                  {text("Read project", "プロジェクトを読む")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
