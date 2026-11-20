"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type MouseEvent } from "react";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { chromaRoot } from "./paths";
import styles from "./chroma.module.css";

export function ChromaNavigation({
  locale,
  name,
}: {
  locale: Locale;
  name: string;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const text = copy[locale];
  const links = [
    { path: "projects", title: text.projects },
    { path: "about", title: text.about },
    { path: "contact", title: text.contact },
    { path: "resume", title: text.resume },
  ];

  function preserveLocation(
    event: MouseEvent<HTMLAnchorElement>,
    language: Locale,
  ) {
    const currentUrl = new URL(window.location.href);
    currentUrl.pathname = currentUrl.pathname.replace(
      `${chromaRoot}/${locale}`,
      `${chromaRoot}/${language}`,
    );
    event.currentTarget.href = currentUrl.toString();
  }

  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        const shouldCloseMenu = event.key === "Escape" && isMenuOpen;
        if (!shouldCloseMenu) return;
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }}
    >
      <Link href={`${chromaRoot}/${locale}`} className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          <i />
          <i />
        </span>
        {name}
      </Link>
      <div
        className={styles.language}
        role="group"
        aria-label={locale === "en" ? "Language" : "言語"}
      >
        {(["en", "ja"] as const).map((language) => (
          <a
            key={language}
            href={pathname.replace(
              `${chromaRoot}/${locale}`,
              `${chromaRoot}/${language}`,
            )}
            lang={language}
            hrefLang={language}
            aria-current={locale === language ? "true" : undefined}
            onClick={(event) => preserveLocation(event, language)}
          >
            {language === "en" ? "English" : "日本語"}
          </a>
        ))}
      </div>
      <button
        ref={menuButton}
        id="chroma-menu"
        type="button"
        className={styles.menu}
        aria-expanded={isMenuOpen}
        aria-controls="chroma-navigation"
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {locale === "en"
          ? isMenuOpen
            ? "Close"
            : "Menu"
          : isMenuOpen
            ? "閉じる"
            : "メニュー"}
      </button>
      <nav
        id="chroma-navigation"
        className={styles.nav}
        data-open={isMenuOpen}
        aria-label={
          locale === "en" ? "Main navigation" : "メインナビゲーション"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        {links.map((link) => {
          const href = `${chromaRoot}/${locale}/${link.path}`;
          const isCurrentPage =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={link.path}
              href={href}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
      <noscript>
        <style>
          {
            "#chroma-navigation{display:flex;flex-basis:100%;order:4}#chroma-menu{display:none}"
          }
        </style>
      </noscript>
    </header>
  );
}
