"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Locale } from "@/app/content/model";
import { chromaRoot } from "./paths";
import styles from "./chroma.module.css";

export type HeroItem = {
  slug: string;
  title: string;
  summary: string;
  control: string;
  href: string;
};

export function ChromaHero({
  locale,
  items,
  identity,
}: {
  locale: Locale;
  items: HeroItem[];
  identity: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [turns, setTurns] = useState(0);
  const selectedProject = items[selectedIndex];

  function selectProject(index: number) {
    setSelectedIndex(index);
    setTurns((currentTurns) => currentTurns + 1);
  }

  return (
    <>
      <section className={styles.hero}>
        <div>
          <h1>
            {locale === "en" ? (
              <>
                A place
                <br />
                for every
                <br />
                part.
              </>
            ) : (
              <>
                ひとつずつ、
                <br />
                使いやすい
                <br />
                形に。
              </>
            )}
          </h1>
          <p className={styles.heroIntro}>
            {locale === "en"
              ? "I design and build software by finding how the pieces fit together."
              : "一つひとつの役割を考えて、ソフトウェアを設計し、作っています。"}
          </p>
          <p className={styles.heroRole}>{identity}</p>
          <div className={styles.heroActions}>
            <Link
              className={styles.button}
              href={`${chromaRoot}/${locale}/projects`}
            >
              {locale === "en" ? "Explore the work" : "プロジェクトを見る"}
            </Link>
            <Link
              className={styles.textLink}
              href={`${chromaRoot}/${locale}/resume`}
            >
              {locale === "en" ? "Read my resume" : "経歴を読む"}
            </Link>
          </div>
        </div>
        <div>
          <div
            className={styles.composition}
            data-selection={selectedIndex}
            style={{ "--turn": `${turns * 90}deg` } as CSSProperties}
            aria-hidden="true"
          >
            <span className={styles.disc} />
            <span className={styles.arch} />
            <span className={styles.square} />
            <span className={styles.hole} />
            <span className={styles.rail} />
          </div>
          <div
            className={styles.projectControls}
            role="group"
            aria-label={
              locale === "en"
                ? "Choose a project to rearrange the composition"
                : "プロジェクトを選んで図形を組み替える"
            }
          >
            {items.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-pressed={selectedIndex === index}
                onClick={() => selectProject(index)}
                aria-controls="chroma-selected-project"
              >
                <span className={styles.swatch} aria-hidden="true" />
                {project.control}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section
        id="chroma-selected-project"
        className={styles.selected}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={styles.projectMark} aria-hidden="true">
          {["●", "◒", "■", "◓"][selectedIndex]}
        </span>
        <div>
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.summary}</p>
        </div>
        <Link href={selectedProject.href} className={styles.textLink}>
          {locale === "en" ? "Read the case" : "詳しく読む"}
        </Link>
      </section>
    </>
  );
}

export type DiagramStage = { title: string; description: string };

export function SystemDiagram({
  locale,
  stages,
}: {
  locale: Locale;
  stages: DiagramStage[];
}) {
  const [selectedStage, setSelectedStage] = useState(0);
  const [isAssembled, setIsAssembled] = useState(false);
  const currentStage = stages[selectedStage];

  return (
    <figure className={styles.diagram} data-assembled={isAssembled}>
      <div className={styles.diagramHeading}>
        <p>
          {locale === "en"
            ? "Select a part to see its job."
            : "各部分を選ぶと、役割がわかります。"}
        </p>
        <button
          type="button"
          aria-pressed={isAssembled}
          onClick={() => setIsAssembled((currentValue) => !currentValue)}
        >
          {locale === "en" ? "Turn the parts" : "図形を回す"}
        </button>
      </div>
      <div
        className={styles.diagramSteps}
        role="group"
        aria-label={locale === "en" ? "System stages" : "システムの各段階"}
      >
        {stages.map((stage, index) => (
          <button
            className={styles.diagramStep}
            type="button"
            key={stage.title}
            aria-pressed={index === selectedStage}
            aria-controls="chroma-stage-description"
            onClick={() => setSelectedStage(index)}
          >
            <i className={styles.diagramShape} aria-hidden="true" />
            <span>{stage.title}</span>
          </button>
        ))}
      </div>
      <p
        id="chroma-stage-description"
        className={styles.diagramDescription}
        aria-live="polite"
        aria-atomic="true"
      >
        <strong>
          {currentStage.title}
          {locale === "ja" ? "。" : "."}
        </strong>{" "}
        {currentStage.description}
      </p>
      <figcaption>
        {locale === "en"
          ? "A conceptual diagram of the documented workflow."
          : "記録された処理の流れを表す概念図。"}
      </figcaption>
    </figure>
  );
}
