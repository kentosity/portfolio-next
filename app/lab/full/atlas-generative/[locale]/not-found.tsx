"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "../_components/portfolio.module.css";
import { paletteVariables } from "../_components/palette";
import { route } from "../_components/routing";

export default function PortfolioNotFound() {
  const params = useParams();
  const locale = params.locale === "ja" ? "ja" : "en";

  return (
    <div className={styles.page} style={paletteVariables} lang={locale}>
      <header className={styles.header}>
        <Link className={styles.homeLink} href={route(locale)}>
          {locale === "en" ? "Home" : "ホーム"}
        </Link>
      </header>
      <main id="main" className={styles.pageHeading}>
        <h1>
          {locale === "en"
            ? "Project not found."
            : "プロジェクトが見つかりません。"}
        </h1>
        <p>
          {locale === "en"
            ? "Explore the project collection to find a case study."
            : "プロジェクト一覧から、事例をご覧ください。"}
        </p>
        <div className={styles.heroLinks}>
          <Link className={styles.solidButton} href={route(locale, "projects")}>
            {locale === "en" ? "Explore projects" : "プロジェクトを見る"}
          </Link>
        </div>
      </main>
    </div>
  );
}
