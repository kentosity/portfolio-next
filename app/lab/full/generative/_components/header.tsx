"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { basePath, route } from "./routing";
import styles from "../generative.module.css";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const text = copy[locale];
  const path = pathname.replace(`${basePath}/${locale}`, "").replace(/^\//, "");

  function preserveContext(event: React.MouseEvent<HTMLAnchorElement>) {
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(event.currentTarget.href);
    targetUrl.search = currentUrl.search;
    targetUrl.hash = currentUrl.hash;
    event.currentTarget.href = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
  }

  return (
    <header className={styles.header}>
      <Link className={styles.identity} href={route(locale)} prefetch={false}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M3 5h9m5 0h16M3 13h18m5 0h7M3 21h6m5 0h19M3 29h16m5 0h9" />
        </svg>
        <span>
          Kento Iizuka
          <small>
            {locale === "en"
              ? "Software, made understandable."
              : "仕組みを、わかりやすく。"}
          </small>
        </span>
      </Link>
      <nav
        className={styles.nav}
        aria-label={
          locale === "en" ? "Main navigation" : "メインナビゲーション"
        }
      >
        {(["projects", "about", "contact", "resume"] as const).map((page) => (
          <Link
            key={page}
            href={route(locale, page)}
            prefetch={false}
            aria-current={
              path === page ||
              (page === "projects" && path.startsWith("projects/"))
                ? "page"
                : undefined
            }
          >
            {text[page]}
          </Link>
        ))}
        <div
          className={styles.languages}
          aria-label={locale === "en" ? "Language" : "表示言語"}
        >
          {(["en", "ja"] as const).map((language) => (
            <a
              href={route(language, path)}
              key={language}
              hrefLang={language}
              lang={language}
              aria-current={locale === language ? "true" : undefined}
              onClick={preserveContext}
            >
              {language === "en" ? "EN" : "日本語"}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
