"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPrint, projectSeed, type PrintSource } from "./art";
import styles from "../generative.module.css";

type PrintProps = {
  source: PrintSource;
  language: "en" | "ja";
  interactive?: boolean;
  caption?: string;
};

export default function Print({
  source,
  language,
  interactive = false,
  caption,
}: PrintProps) {
  const [variation, setVariation] = useState(0);
  const [construction, setConstruction] = useState(false);
  const plate = useRef<HTMLDivElement>(null);
  const { title, stack, reviewed, kind } = source;
  const artwork = useMemo(
    () =>
      createPrint({ title, stack, reviewed, kind }, variation, construction),
    [title, stack, reviewed, kind, variation, construction],
  );
  const isJapanese = language === "ja";

  useEffect(() => {
    if (!interactive) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = plate.current;
    if (!element || preference.matches) return;

    const animations = [...element.querySelectorAll("[data-band]")].map(
      (band, index) =>
        band.animate(
          [
            {
              transform: `translate(${Math.sin(index * 2.4) * 24}px, ${Math.cos(index * 1.7) * 18}px)`,
              opacity: 0.35,
            },
            { transform: "translate(0, 0)", opacity: 1 },
          ],
          { duration: 450 + index * 25, easing: "cubic-bezier(.2,.7,.2,1)" },
        ),
    );
    const stop = () => animations.forEach((animation) => animation.cancel());
    preference.addEventListener("change", stop);
    return () => {
      stop();
      preference.removeEventListener("change", stop);
    };
  }, [artwork, interactive]);

  function downloadPrint() {
    const url = URL.createObjectURL(
      new Blob([artwork], { type: "image/svg+xml" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `kento-${kind}-${projectSeed(source) + variation}.svg`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <figure className={styles.print}>
      <div className={styles.frame}>
        <div className={styles.paper}>
          <div
            ref={plate}
            className={styles.art}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: artwork }}
          />
          <div className={styles.signature}>
            <span>Kento Iizuka</span>
            <span>
              {isJapanese ? "計算で描いた図案" : "Computational print"}
            </span>
          </div>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
      {interactive && (
        <>
          <div className={styles.printControls}>
            <button onClick={() => setVariation((current) => current + 1)}>
              {isJapanese ? "図案を変える" : "Vary the print"}
            </button>
            <button
              aria-pressed={construction}
              onClick={() => setConstruction((current) => !current)}
            >
              {isJapanese ? "構成を見る" : "Show construction"}
            </button>
            <button onClick={downloadPrint}>
              {isJapanese ? "SVGを保存" : "Save SVG"}
            </button>
            <button
              disabled={variation === 0 && !construction}
              onClick={() => {
                setVariation(0);
                setConstruction(false);
              }}
            >
              {isJapanese ? "元に戻す" : "Restore"}
            </button>
          </div>
          <p className={styles.printStatus} role="status">
            {isJapanese ? "図案" : "Print"} {projectSeed(source) + variation}
            {construction
              ? isJapanese
                ? " · 構成を表示中"
                : " · Construction visible"
              : ""}
          </p>
        </>
      )}
    </figure>
  );
}
