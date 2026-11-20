"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale, Project } from "@/app/content/model";
import { copy } from "@/app/content/copy";
import { Weave } from "./weave";
import styles from "./thread.module.css";

type ThreadProject = Pick<Project, "slug" | "title" | "summary" | "workflow">;

export function ThreadExplorer({
  projects,
  locale,
}: {
  projects: ThreadProject[];
  locale: Locale;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoose, setIsLoose] = useState(false);
  const project = projects[selectedIndex];

  return (
    <section
      className={styles.explorer}
      aria-label={
        locale === "en"
          ? "Explore a project thread"
          : "プロジェクトのつながりを見る"
      }
    >
      <div className={styles.artControls}>
        <Link
          className={styles.explorerProject}
          href={`/lab/full/thread/${locale}/projects/${project.slug}`}
        >
          {project.title[locale]}
        </Link>
        <button
          className={styles.textButton}
          aria-pressed={isLoose}
          onClick={() => setIsLoose(!isLoose)}
        >
          <span className={styles.knot} aria-hidden="true">
            {isLoose ? "∥" : "⋈"}
          </span>
          {locale === "en"
            ? isLoose
              ? "Reconnect the threads"
              : "Loosen the weave"
            : isLoose
              ? "糸をつなぎ直す"
              : "織り目をほどく"}
        </button>
      </div>
      <div className={styles.heroWeave}>
        <Weave seed={selectedIndex} loose={isLoose} />
      </div>
      <ol className={styles.workflowLabels}>
        {project.workflow[locale].map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className={styles.explorerBottom}>
        <div
          className={styles.projectPicker}
          aria-label={
            locale === "en" ? "Choose a project" : "プロジェクトを選ぶ"
          }
        >
          {projects.map((item, index) => (
            <button
              key={item.slug}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              {item.title[locale]}
            </button>
          ))}
        </div>
        <div
          className={styles.threadReadout}
          aria-live="polite"
          aria-atomic="true"
        >
          <h2>{project.title[locale]}</h2>
          <p>{project.summary[locale]}</p>
          <Link
            className={styles.underlink}
            href={`/lab/full/thread/${locale}/projects/${project.slug}`}
          >
            {copy[locale].readCase}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WorkflowExplorer({
  project,
  locale,
  seed,
}: {
  project: Pick<Project, "workflow" | "decisions">;
  locale: Locale;
  seed: number;
}) {
  const [selectedStage, setSelectedStage] = useState<number>();
  const steps = project.workflow[locale];
  const decisions = project.decisions[locale];

  return (
    <figure className={styles.workflow}>
      <div className={styles.caseWeave}>
        <Weave seed={seed} stage={selectedStage} />
      </div>
      <ol className={styles.workflowStages}>
        {steps.map((step, index) => (
          <li key={step}>
            <button
              aria-pressed={selectedStage === index}
              onClick={() =>
                setSelectedStage(selectedStage === index ? undefined : index)
              }
            >
              <span className={styles.stageNode} aria-hidden="true" />
              {step}
            </button>
          </li>
        ))}
      </ol>
      <figcaption>
        {copy[locale].diagram}.{" "}
        {locale === "en"
          ? "Select a stage to inspect its connections."
          : "工程を選ぶと、つながりを確認できます。"}
      </figcaption>
      {selectedStage !== undefined && (
        <p className={styles.stageDetail} aria-live="polite">
          {decisions[Math.min(selectedStage, decisions.length - 1)]}
        </p>
      )}
    </figure>
  );
}
