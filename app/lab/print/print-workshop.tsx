"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./print.module.css";

type Language = "en" | "ja";

type Project = {
  title: string;
  oneLiner: string;
  link: string;
};

const editions = [
  {
    slug: "salon-data-platform",
    name: "Salon data platform",
    shortName: { en: "Salon data", ja: "データ連携" },
    headline: ["EVERY", "ROW", "COUNTS."],
    caption: { en: "Bring the pieces together.", ja: "データをつなぎ、見える形に。" },
    description: "A data pipeline and dashboard that turn salon POS records into reports. Built ingestion, aggregation and checks for missing or duplicate data.",
    process: { en: "Data integration & application development", ja: "データ連携・アプリ開発" },
    color: "cobalt",
  },
  {
    slug: "local-speech",
    name: "Local AI speech",
    shortName: { en: "Local speech", ja: "ローカル音声" },
    headline: ["GIVE", "WORDS", "A VOICE."],
    caption: { en: "A little more human.", ja: "応答が、声になる。" },
    description: "A personal tool that reads AI agent responses aloud on a Mac. Streaming speech meets word-synced captions, cancellation and playback handoff.",
    process: { en: "Python synthesis & a native macOS player", ja: "Python音声合成・macOSプレーヤー" },
    color: "coral",
  },
  {
    slug: "event-platform",
    name: "Event platform redesign",
    shortName: { en: "Event platform", ja: "イベント基盤" },
    headline: ["LESS", "OVERHEAD.", "MORE", "OCCASION."],
    caption: { en: "Make room for the event.", ja: "イベントを支える仕組み。" },
    description: "A reusable, LINE-connected reservation and check-in platform. A serverless redesign reduced annual infrastructure costs from about $200,000 to $10,000.",
    process: { en: "Architecture & full-stack development", ja: "アーキテクチャ設計・フルスタック開発" },
    color: "yellow",
  },
  {
    slug: "subsidy-search-pilot",
    name: "Subsidy search assistant",
    shortName: { en: "Subsidy search", ja: "補助金検索" },
    headline: ["FIND", "A WAY", "FORWARD."],
    caption: { en: "A clearer place to start.", ja: "資金の選択肢を、探しやすく。" },
    description: "A local AI prototype that turns a business’s funding needs into subsidy searches. It presents candidates with sources and validates search conditions and citations.",
    process: { en: "Conversational search prototype", ja: "対話型検索のプロトタイプ" },
    color: "sky",
  },
] as const;

function RegistrationMarks() {
  return (
    <div className={styles.registration} aria-hidden="true">
      <i /><i /><i /><i />
    </div>
  );
}

function DataPrint() {
  return (
    <svg className={styles.dataArt} viewBox="0 0 500 450" fill="none" aria-hidden="true">
      <defs>
        <pattern id="print-data-dots" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.8" fill="currentColor" />
        </pattern>
        <clipPath id="print-data-circle"><circle cx="248" cy="216" r="185" /></clipPath>
      </defs>
      <circle className={styles.limeInk} cx="270" cy="225" r="185" />
      <circle cx="248" cy="216" r="185" fill="url(#print-data-dots)" />
      <g clipPath="url(#print-data-circle)" stroke="currentColor" strokeWidth="2">
        {Array.from({ length: 20 }, (_, index) => (
          <path key={index} d={`M 30 ${index * 23} C 185 ${index * 23 - 45}, 260 ${index * 18 + 55}, 490 ${index * 18 + 55}`} />
        ))}
      </g>
      <g transform="translate(57 136) rotate(-9)">
        <rect width="327" height="93" fill="var(--sheet-paper)" />
        <rect x="8" y="8" width="311" height="77" stroke="currentColor" />
        <text x="25" y="39" className={styles.artSmallType}>POS / PARQUET / BIGQUERY</text>
        <path d="M25 52H300" stroke="currentColor" />
        <text x="25" y="73" className={styles.artSmallType}>A little order in every record.</text>
      </g>
      <g transform="translate(214 282) rotate(7)">
        <rect width="248" height="91" fill="currentColor" />
        <text x="18" y="58" fill="var(--sheet-paper)" className={styles.artDisplayType}>connect.</text>
      </g>
      <path d="M53 380H165M109 324V436" stroke="currentColor" strokeWidth="1" />
      <circle cx="109" cy="380" r="27" stroke="currentColor" />
    </svg>
  );
}

function SpeechPrint() {
  return (
    <svg className={styles.speechArt} viewBox="0 0 500 450" fill="none" aria-hidden="true">
      <circle className={styles.speechOffset} cx="255" cy="230" r="174" fill="currentColor" />
      {Array.from({ length: 17 }, (_, index) => (
        <ellipse key={index} cx="244" cy="216" rx={37 + index * 9} ry={17 + index * 10} stroke="currentColor" strokeWidth="2" />
      ))}
      <path d="M32 218H467" stroke="currentColor" />
      <rect x="38" y="190" width="423" height="57" fill="var(--sheet-paper)" />
      {Array.from({ length: 45 }, (_, index) => {
        const waveHeight = 5 + Math.abs(Math.sin(index * 0.63) * Math.cos(index * 0.19)) * 100;
        return <path key={index} d={`M${49 + index * 9} ${219 - waveHeight / 2}v${waveHeight}`} stroke="currentColor" strokeWidth="4" />;
      })}
      <circle cx="244" cy="216" r="190" stroke="currentColor" strokeDasharray="2 8" />
      <text x="275" y="437" className={styles.artSmallType}>words become sound</text>
    </svg>
  );
}

function EventPrint() {
  return (
    <div className={styles.eventArt} aria-hidden="true">
      <div className={styles.ticket}>
        <span>Admit more possibility</span>
        <strong>−95<span>%</span></strong>
        <span>annual infrastructure cost</span>
        <div className={styles.barcode} />
      </div>
      <div className={styles.eventOrbit} />
      <span className={styles.eventStamp}>A good time.<br />Well run.</span>
    </div>
  );
}

function SearchPrint() {
  return (
    <svg className={styles.searchArt} viewBox="0 0 500 450" fill="none" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <g key={index} transform={`translate(${65 + index * 14} ${40 + index * 12}) rotate(${index * 2 - 9} 170 170)`}>
          <rect width="292" height="316" fill="var(--sheet-paper)" stroke="currentColor" />
          <path d="M28 44H227M28 61H264M28 78H200M28 122H264M28 139H227M28 156H264M28 200H227M28 217H264M28 234H200" stroke="currentColor" strokeWidth="4" />
        </g>
      ))}
      <circle cx="296" cy="230" r="106" fill="var(--sheet-paper)" fillOpacity=".5" stroke="currentColor" strokeWidth="15" />
      <path d="m375 307 80 88" stroke="currentColor" strokeWidth="33" />
      <path d="m256 231 29 29 54-65" stroke="currentColor" strokeWidth="12" />
    </svg>
  );
}

const artworks = [DataPrint, SpeechPrint, EventPrint, SearchPrint];

export default function PrintWorkshop({ projects }: { projects: Project[] }) {
  const [language, setLanguage] = useState<Language>("en");
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const publicationRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLElement | null)[]>([]);
  const isJapanese = language === "ja";

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const observer = new IntersectionObserver((entries) => {
      if (!mobileQuery.matches) return;
      const visibleSheet = entries.find((entry) => entry.isIntersecting);
      if (visibleSheet) setCurrentSheet(Number(visibleSheet.target.getAttribute("data-sheet")));
    }, { rootMargin: "-20% 0px -30% 0px", threshold: 0.25 });

    sheetRefs.current.forEach((sheet) => { if (sheet) observer.observe(sheet); });
    return () => observer.disconnect();
  }, []);

  function turnToSheet(index: number) {
    const selectedSheet = sheetRefs.current[index];
    const publication = publicationRef.current;
    if (!selectedSheet || !publication) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReducedMotion ? "instant" : "smooth";
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      selectedSheet.scrollIntoView({ behavior, block: "start" });
    } else {
      const sheetStart = selectedSheet.offsetLeft - sheetRefs.current[0]!.offsetLeft;
      publication.scrollTo({ left: sheetStart, behavior });
    }
    setCurrentSheet(index);
    setIsIndexOpen(false);
  }

  function updateCurrentSheet() {
    const publication = publicationRef.current;
    if (!publication || window.matchMedia("(max-width: 767px)").matches) return;

    const firstSheetStart = sheetRefs.current[0]?.offsetLeft ?? 0;
    const closestSheet = sheetRefs.current.reduce((closest, sheet, index) => {
      if (!sheet) return closest;
      const distance = Math.abs(sheet.offsetLeft - firstSheetStart - publication.scrollLeft);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Infinity });
    setCurrentSheet(closestSheet.index);
  }

  return (
    <main className={styles.publication} lang={language} onKeyDown={(event) => {
      if (event.key === "Escape" && isIndexOpen) {
        setIsIndexOpen(false);
        document.getElementById("print-index-toggle")?.focus();
      }
    }}>
      <a className={styles.skipLink} href="#print-publication">{isJapanese ? "作品へ進む" : "Skip to the works"}</a>
      <header className={styles.header}>
        <a className={styles.wordmark} href="/portfolio" aria-label="Kento Iizuka portfolio">Kento Iizuka<span>飯塚 健杜</span></a>
        <span className={styles.headerNote}>{isJapanese ? "デザインとエンジニアリング" : "Design sense. Engineering hands."}</span>
        <nav className={styles.headerControls} aria-label={isJapanese ? "表示設定" : "Publication controls"}>
          <div className={styles.languageSwitch} role="group" aria-label="Language / 言語">
            <button type="button" onClick={() => setLanguage("en")} aria-pressed={!isJapanese}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => setLanguage("ja")} aria-pressed={isJapanese}>日本語</button>
          </div>
          <button id="print-index-toggle" className={styles.indexButton} type="button" aria-expanded={isIndexOpen} aria-controls="print-index" onClick={() => setIsIndexOpen(!isIndexOpen)}>
            <span className={styles.indexIcon} aria-hidden="true"><i /><i /><i /><i /></span>
            {isJapanese ? "目次" : "Index"}
          </button>
        </nav>
      </header>

      <div className={styles.masthead}>
        <h1>{isJapanese ? "つくったもの、紙の上に。" : "Works in print."}<span className={styles.asterisk} aria-hidden="true">✳</span></h1>
        <p>{isJapanese ? <><span>デジタルの仕事を、一冊に。</span><span>4つのプロジェクト、4枚の紙。</span></> : <><span>Digital things, collected on paper.</span><span>Four projects. Four different impressions.</span></>}</p>
      </div>

      {isIndexOpen && (
        <nav id="print-index" className={styles.indexPanel} aria-label={isJapanese ? "作品目次" : "Project index"}>
          {editions.map((edition, index) => (
            <button type="button" key={edition.slug} onClick={() => turnToSheet(index)}>
              <span className={styles.indexSwatch} data-color={edition.color} aria-hidden="true" />
              <span>{isJapanese ? projects[index].title : edition.name}</span>
              <span className={styles.indexPage}>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </nav>
      )}

      <div className={styles.publicationTrack} ref={publicationRef} onScroll={updateCurrentSheet} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight" && currentSheet < editions.length - 1) {
          event.preventDefault();
          turnToSheet(currentSheet + 1);
        }
        if (event.key === "ArrowLeft" && currentSheet > 0) {
          event.preventDefault();
          turnToSheet(currentSheet - 1);
        }
      }} id="print-publication" role="region" aria-label={isJapanese ? "作品集" : "Project sheets"} tabIndex={0}>
        {editions.map((edition, index) => {
          const project = projects.find((item) => item.link.endsWith(edition.slug));
          if (!project) return null;
          const Artwork = artworks[index];

          return (
            <article className={styles.sheet} data-color={edition.color} data-sheet={index} key={edition.slug} id={`sheet-${index + 1}`} ref={(element) => { sheetRefs.current[index] = element; }} aria-labelledby={`project-title-${index}`}>
              <RegistrationMarks />
              <header className={styles.sheetHeader}>
                <span>{isJapanese ? edition.shortName.ja : edition.name}</span>
                <span className={styles.sheetSequence}>{String(index + 1).padStart(2, "0")} / 04</span>
              </header>
              <div className={styles.poster}>
                <div className={styles.posterType} aria-hidden="true">
                  {edition.headline.map((line) => <span key={line}>{line}</span>)}
                </div>
                <div className={styles.artwork}><Artwork /></div>
                <p className={styles.posterCaption}>{edition.caption[language]}</p>
              </div>
              <footer className={styles.sheetFooter}>
                <div className={styles.projectIdentity}>
                  <p className={styles.projectProcess}>{edition.process[language]}</p>
                  <h2 id={`project-title-${index}`}>{isJapanese ? project.title : edition.name}</h2>
                  <a className={styles.caseLink} href={project.link}>{isJapanese ? "プロジェクトを読む" : "Read the project"}<span aria-hidden="true">＋</span></a>
                </div>
                <p className={styles.projectDescription}>{isJapanese ? project.oneLiner : edition.description}</p>
              </footer>
              <div className={styles.sheetBinding} aria-hidden="true" />
            </article>
          );
        })}
        <div className={styles.endpaper}>
          <span aria-hidden="true">✳</span>
          <p>{isJapanese ? "次は、何をつくろう。" : "What shall we make next?"}</p>
          <a href="/portfolio#contact">{isJapanese ? "連絡する" : "Get in touch"}</a>
          <button type="button" onClick={() => turnToSheet(0)}>{isJapanese ? "最初のページへ" : "Back to the first sheet"}</button>
        </div>
      </div>

      <footer className={styles.publicationFooter}>
        <div className={styles.pageTabs} aria-label={isJapanese ? "ページを選ぶ" : "Choose a sheet"}>
          {editions.map((edition, index) => (
            <button key={edition.slug} type="button" onClick={() => turnToSheet(index)} aria-current={currentSheet === index ? "page" : undefined}>
              <span className={styles.tabNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.tabName}>{edition.shortName[language]}</span>
            </button>
          ))}
        </div>
        <div className={styles.turnControls}>
          <span className={styles.scrollHint}>{isJapanese ? "横にスクロール" : "Scroll sideways"}</span>
          <button type="button" aria-label={isJapanese ? "前のページ" : "Previous sheet"} disabled={currentSheet === 0} onClick={() => turnToSheet(currentSheet - 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
          <span className={styles.pageCount}>{String(currentSheet + 1).padStart(2, "0")}<span> / 04</span></span>
          <button type="button" aria-label={isJapanese ? "次のページ" : "Next sheet"} disabled={currentSheet === editions.length - 1} onClick={() => turnToSheet(currentSheet + 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
        </div>
      </footer>
    </main>
  );
}
