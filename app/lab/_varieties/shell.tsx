"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { Language } from "./projects";
import styles from "./varieties.module.css";
import Glyph from "./glyph";

export function Shell({ direction, language, setLanguage, children }: {
  direction: string;
  language: Language;
  setLanguage: (language: Language) => void;
  children: ReactNode;
}) {
  const [keyboardInput, setKeyboardInput] = useState(false);

  return (
    <div className={`${styles.page} ${styles[direction]}`} lang={language}
      data-keyboard={keyboardInput}
      onKeyDown={() => setKeyboardInput(true)} onPointerDown={() => setKeyboardInput(false)}>
      <a className={styles.skip} href="#work">{language === "en" ? "Skip to work" : "作品へ移動"}</a>
      <header className={styles.nav}>
        <Link href="/portfolio" className={styles.brand}>Kento Iizuka<span>{language === "en" ? "Design-minded engineer" : "デザイン出身のエンジニア"}</span></Link>
        <Link href="/lab/index" className={styles.back}>{language === "en" ? "All directions" : "デザイン一覧"}</Link>
        <div className={styles.language} aria-label={language === "en" ? "Language" : "言語"}>
          {(["en", "ja"] as const).map((value) => <button key={value} lang={value}
            aria-pressed={language === value} onClick={() => setLanguage(value)}>{value.toUpperCase()}</button>)}
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>{language === "en" ? "I build tools that help people make sense of things." : "物事を整理し、わかりやすくする道具を作っています。"}</p>
        <Link href="/portfolio">{language === "en" ? "View full portfolio" : "ポートフォリオを見る"} <span><Glyph kind="arrow"/></span></Link>
      </footer>
    </div>
  );
}

export function ReadProject({ href, language }: { href: string; language: Language }) {
  return <Link className={styles.read} href={href}>{language === "en" ? "Read project" : "プロジェクトを見る"}<span><Glyph kind="arrow"/></span></Link>;
}
