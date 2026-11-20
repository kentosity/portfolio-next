import type { CSSProperties } from "react";
import styles from "./thread.module.css";

type WeaveProps = {
  seed?: number;
  loose?: boolean;
  stage?: number;
  small?: boolean;
};

export function Weave({
  seed = 0,
  loose = false,
  stage,
  small = false,
}: WeaveProps) {
  const strandColor = ["#5a273a", "#b55a38", "#765969"][seed % 3];
  const centerOffset = Math.sin(seed * 1.9) * 38;

  return (
    <svg
      className={styles.weave}
      viewBox="0 0 1000 440"
      fill="none"
      aria-hidden="true"
      data-loose={loose}
      style={{ "--strand-color": strandColor } as CSSProperties}
    >
      {Array.from({ length: small ? 22 : 42 }, (_, index) => {
        const strandCount = small ? 22 : 42;
        const position = index / (strandCount - 1);
        const outerY = 65 + position * 310;
        const middleY =
          220 +
          centerOffset +
          Math.sin(position * Math.PI * 1.7 + seed * 0.6) * 65;
        const strandPath = loose
          ? `M25 ${outerY} C300 ${outerY},700 ${outerY},975 ${outerY}`
          : `M25 ${outerY} C230 ${outerY - 70},330 ${middleY},500 ${middleY} S790 ${outerY + 80},975 ${outerY}`;
        const isHighlighted =
          stage === undefined || Math.floor(position * 3) === stage;

        return (
          <path
            key={`weft-${index}`}
            d={strandPath}
            stroke="var(--strand-color)"
            strokeWidth={index % 7 === 0 ? 1.7 : 1}
            opacity={isHighlighted ? 0.68 : 0.13}
          />
        );
      })}
      {Array.from({ length: small ? 16 : 30 }, (_, index) => {
        const position = index / ((small ? 16 : 30) - 1);
        const outerX = 265 + position * 470;
        const strandPath = loose
          ? `M${outerX} 20 V420`
          : `M${outerX} 20 C${outerX - 230 - centerOffset} 170,${1000 - outerX + 230} 275,${1000 - outerX} 420`;

        return (
          <path
            key={`warp-${index}`}
            d={strandPath}
            stroke="#b55a38"
            strokeWidth="1"
            opacity={stage === undefined || stage === 1 ? 0.52 : 0.2}
          />
        );
      })}
      <circle cx="25" cy="220" r="6" fill="var(--strand-color)" />
      <circle cx="975" cy="220" r="6" fill="var(--strand-color)" />
    </svg>
  );
}
