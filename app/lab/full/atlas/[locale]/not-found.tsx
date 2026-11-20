"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "../_components/atlas.module.css";

export default function AtlasNotFound() {
  const params = useParams();
  const locale = params.locale === "ja" ? "ja" : "en";

  return (
    <div className={styles.page} lang={locale}>
      <header className={styles.header}>
        <Link className={styles.brand} href={`/lab/full/atlas/${locale}`}>
          <strong>Kento Iizuka</strong>
        </Link>
      </header>
      <main id="main" className={styles.pageHeading}>
        <h1>
          {locale === "en" ? "Room not found." : "部屋が見つかりません。"}
        </h1>
        <p>
          {locale === "en"
            ? "Explore the project collection to find a case study."
            : "プロジェクト一覧から、事例をご覧ください。"}
        </p>
        <div className={styles.heroLinks}>
          <Link
            className={styles.solidButton}
            href={`/lab/full/atlas/${locale}/projects`}
          >
            {locale === "en" ? "Explore projects" : "プロジェクトを見る"}
          </Link>
        </div>
      </main>
    </div>
  );
}
