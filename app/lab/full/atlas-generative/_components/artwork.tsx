import Image from "next/image";
import { projectSeed, type PrintSource } from "./art";
import { basePath } from "./routing";
import styles from "./portfolio.module.css";

export function Artwork({ source }: { source: PrintSource }) {
  return (
    <div className={styles.artwork} aria-hidden="true">
      <Image
        src={`${basePath}/prints/${source.title}?seed=${projectSeed(source)}`}
        width={600}
        height={720}
        alt=""
        unoptimized
      />
    </div>
  );
}
