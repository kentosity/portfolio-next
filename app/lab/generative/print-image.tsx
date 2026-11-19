"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPrint, projectSeed, type PrintSource } from "./art";
import styles from "./prints.module.css";

type PrintImageProps = {
  source: PrintSource;
  variation?: number;
  construction?: boolean;
  arrangement?: number;
  remixLabel?: string;
  remixHint?: string;
  onRemix?: () => void;
};

export default function PrintImage({
  source,
  variation = 0,
  construction = false,
  arrangement = 0,
  remixLabel,
  remixHint,
  onRemix,
}: PrintImageProps) {
  const { title, stack, reviewed, kind } = source;
  const artwork = useMemo(
    () =>
      createPrint({ title, stack, reviewed, kind }, variation, construction),
    [title, stack, reviewed, kind, variation, construction],
  );
  const plate = useRef<HTMLDivElement>(null);
  const lastArtwork = useRef<string | null>(null);
  const replay = useRef<() => void>(() => {});
  const seed = projectSeed(source) + variation;

  useEffect(() => {
    const element = plate.current;
    if (!element) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const bands = [...element.querySelectorAll<SVGGElement>("[data-band]")];
    const previousArtwork = lastArtwork.current;
    lastArtwork.current = artwork;
    let animations: Animation[] = [];
    let previousPlate: HTMLDivElement | null = null;
    let hasEntered = false;

    function stopMotion() {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      previousPlate?.remove();
      previousPlate = null;
    }

    function arrange() {
      stopMotion();
      if (motionPreference.matches) return;

      animations = bands.map((band, index) => {
        const phase = seed * 0.001 + index * 2.4;
        const x = Math.sin(phase) * 64;
        const y = Math.cos(phase * 1.7) * 48;
        const rotation = Math.sin(phase * 0.8) * 11;
        return band.animate(
          [
            {
              transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              opacity: 0.55,
            },
            { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          ],
          { duration: 1050 + index * 24, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stopMotion();
          return;
        }
        if (hasEntered) return;
        hasEntered = true;
        arrange();

        if (
          previousArtwork &&
          previousArtwork !== artwork &&
          !motionPreference.matches
        ) {
          previousPlate = document.createElement("div");
          previousPlate.className = styles.previousArtwork;
          previousPlate.innerHTML = previousArtwork;
          element.append(previousPlate);
          const fade = previousPlate.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 240,
            easing: "ease-out",
            fill: "forwards",
          });
          fade.onfinish = () => previousPlate?.remove();
          animations.push(fade);
        }
      },
      { threshold: 0.15 },
    );

    replay.current = arrange;
    observer.observe(element);
    motionPreference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", stopMotion);
      stopMotion();
      replay.current = () => {};
    };
  }, [artwork, arrangement, seed]);

  return (
    <div className={styles.artworkShell}>
      <div
        ref={plate}
        className={styles.artwork}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: artwork }}
      />
      {onRemix && (
        <button
          type="button"
          className={styles.printButton}
          aria-label={remixLabel}
          onPointerEnter={() => replay.current()}
          onFocus={() => replay.current()}
          onClick={onRemix}
        >
          <span className={styles.remixHint}>
            <span aria-hidden="true">⟳</span> {remixHint}
          </span>
        </button>
      )}
    </div>
  );
}
