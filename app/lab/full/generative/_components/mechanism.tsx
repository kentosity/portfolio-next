"use client";

import { useState } from "react";
import type { Project, Locale } from "@/app/content/model";
import type { PrintKind } from "./art";
import styles from "../generative.module.css";

function StageGlyph({ kind, stage }: { kind: PrintKind; stage: number }) {
  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {Array.from({ length: 9 }, (_, index) => {
        const offset = index * 4;
        if (kind === "voice")
          return (
            <ellipse
              key={index}
              cx="40"
              cy="40"
              rx={8 + offset * 0.8}
              ry={11 + offset}
              transform={`rotate(${stage * 13} 40 40)`}
            />
          );
        if (kind === "routes")
          return (
            <path
              key={index}
              d={`M${8 + offset} 8V${28 + offset * 0.5}H${63 - offset * 0.3}V${57 - offset * 0.4}H${20 + offset * 0.7}V72`}
            />
          );
        if (kind === "search")
          return (
            <path
              key={index}
              d={`M40 ${6 + offset * 0.7}L${73 - offset * 0.8} ${24 + offset * 0.3}V${56 - offset * 0.3}L40 ${74 - offset * 0.7}L${7 + offset * 0.8} ${56 - offset * 0.3}V${24 + offset * 0.3}Z`}
            />
          );
        return (
          <path
            key={index}
            d={`M${8 + offset * 1.6} 8C${72 - offset} 24 ${offset + 6} 56 ${16 + offset * 1.4} 72`}
          />
        );
      })}
    </svg>
  );
}

export default function Mechanism({
  kind,
  project,
  language,
}: {
  kind: PrintKind;
  project: Project;
  language: Locale;
}) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const stages = project.workflow[language];
  const isJapanese = language === "ja";

  return (
    <figure className={styles.mechanism}>
      <div className={styles.flow}>
        {stages.map((stage, index) => (
          <div
            className={styles.flowNode}
            key={stage}
            data-selected={selectedStage === null || selectedStage === index}
          >
            <button
              className={styles.flowGlyph}
              aria-pressed={selectedStage === index}
              aria-label={`${isJapanese ? "詳しく見る" : "Inspect"}: ${stage}`}
              onClick={() =>
                setSelectedStage(selectedStage === index ? null : index)
              }
            >
              <StageGlyph kind={kind} stage={index} />
            </button>
            <div>
              <h3>{stage}</h3>
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        {isJapanese
          ? "公開済みの説明をもとにした概念図。図形を選ぶと、各段階を強調表示します。"
          : "A conceptual flow from the reviewed project description. Select a mark to isolate a stage."}
      </figcaption>
      <div className={styles.stageDetail} role="status">
        {selectedStage === null
          ? isJapanese
            ? "3つの段階をつないで、仕組み全体を表しています。"
            : "Three connected responsibilities form the whole system."
          : stages[selectedStage]}
      </div>
    </figure>
  );
}
