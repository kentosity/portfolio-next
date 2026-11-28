import type { Locale } from "@/app/content/model";
import { PortfolioLanguageLink } from "./interactions";
import { collectionQuery, route, type CollectionFilter } from "./routing";
import styles from "./portfolio.module.css";

export function PortfolioLanguageSwitch({
  locale,
  path = "",
  area,
  problem,
}: { locale: Locale; path?: string } & CollectionFilter) {
  const query = collectionQuery({ area, problem });

  return (
    <nav className={styles.languages} aria-label={locale === "en" ? "Language" : "言語"}>
      <PortfolioLanguageLink href={`${route("en", path)}${query}`} locale="en" isCurrent={locale === "en"}>
        EN
      </PortfolioLanguageLink>
      <span aria-hidden="true">/</span>
      <PortfolioLanguageLink href={`${route("ja", path)}${query}`} locale="ja" isCurrent={locale === "ja"}>
        JP
      </PortfolioLanguageLink>
    </nav>
  );
}
