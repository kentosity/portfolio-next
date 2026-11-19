"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import ObjectPoster from "./object-poster";
import type { CabinetProject, Language } from "./projects";
import styles from "./cabinet.module.css";

const CabinetScene = dynamic(() => import("./scene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { unavailable: boolean }> {
  state = { unavailable: false };

  static getDerivedStateFromError() {
    return { unavailable: true };
  }

  componentDidCatch() {
    this.props.onUnavailable();
  }

  render() {
    return this.state.unavailable ? null : this.props.children;
  }
}

function CabinetMark() {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path d="m4 9 16-6 16 6v28l-16 5-16-5V9Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 9 16 6 16-6M20 15v27M4 23l16 6 16-6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m11 12 3 1m12 0 3-1M11 27l3 1m12 0 3-1" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function Inspection({ project, language, onClose }: { project: CabinetProject; language: Language; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState(false);
  const [sceneUnavailable, setSceneUnavailable] = useState(false);
  const markSceneReady = useCallback(() => setReady(true), []);
  const markSceneUnavailable = useCallback(() => { setReady(false); setSceneUnavailable(true); }, []);
  const [rotation, setRotation] = useState(0);
  const isEnglish = language === "en";
  const title = isEnglish ? project.englishTitle : project.title;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.inspection}
      aria-labelledby="inspection-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')).filter((control) => control.getClientRects().length > 0);
        const firstControl = controls[0];
        const lastControl = controls[controls.length - 1];
        const shouldWrapToEnd = event.shiftKey && document.activeElement === firstControl;
        const shouldWrapToStart = !event.shiftKey && document.activeElement === lastControl;
        if (!shouldWrapToEnd && !shouldWrapToStart) return;
        event.preventDefault();
        (shouldWrapToEnd ? lastControl : firstControl)?.focus();
      }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className={styles.inspectionInner}>
        <button className={styles.closeButton} onClick={onClose} autoFocus aria-label={isEnglish ? "Return to cabinet" : "棚に戻る"}>
          <span aria-hidden="true">×</span>
        </button>
        <div className={styles.inspectionVisual}>
          <div className={styles.inspectionPoster} hidden={ready}><ObjectPoster kind={project.kind} /></div>
          {!sceneUnavailable && <SceneBoundary onUnavailable={markSceneUnavailable}>
            <CabinetScene projects={[project]} inspecting rotation={rotation} onReady={markSceneReady} onUnavailable={markSceneUnavailable} />
          </SceneBoundary>}
          {ready && <div className={styles.rotationControls}>
            <button onClick={() => setRotation((current) => current - Math.PI / 4)} aria-label={isEnglish ? "Rotate left" : "左に回す"}>↶</button>
            <span>{isEnglish ? "Drag to turn" : "ドラッグで回転"}</span>
            <button onClick={() => setRotation((current) => current + Math.PI / 4)} aria-label={isEnglish ? "Rotate right" : "右に回す"}>↷</button>
          </div>}
        </div>
        <div className={styles.inspectionCopy}>
          <p className={styles.inspectionKicker}>{isEnglish ? "Inside the object" : "オブジェクトの中身"}</p>
          <h2 id="inspection-title">{title}</h2>
          <p className={styles.projectSummary}>{isEnglish ? project.englishSummary : project.oneLiner}</p>
          <dl className={styles.projectFacts}>
            <div><dt>{isEnglish ? "Built with" : "使用技術"}</dt><dd>{project.stack}</dd></div>
            <div><dt>{isEnglish ? "Contribution" : "担当"}</dt><dd>{isEnglish ? project.englishRole : project.role}</dd></div>
          </dl>
          <Link className={styles.projectLink} href={project.link}>{isEnglish ? "Open project" : "プロジェクトを読む"}</Link>
        </div>
      </div>
    </dialog>
  );
}

export default function Cabinet({ projects }: { projects: CabinetProject[] }) {
  const [language, setLanguage] = useState<Language>("en");
  const [selected, setSelected] = useState<CabinetProject | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [sceneUnavailable, setSceneUnavailable] = useState(false);
  const markSceneReady = useCallback(() => setReady(true), []);
  const markSceneUnavailable = useCallback(() => { setReady(false); setSceneUnavailable(true); }, []);
  const isEnglish = language === "en";

  return (
    <div className={styles.page} lang={language}>
      <header className={styles.header}>
        <Link className={styles.identity} href="/portfolio"><CabinetMark /><span>Kento Iizuka</span></Link>
        <nav className={styles.navigation} aria-label={isEnglish ? "Main navigation" : "メインナビゲーション"}>
          <a className={styles.currentNav} href="#cabinet">{isEnglish ? "Selected work" : "制作実績"}</a>
          <Link href="/portfolio#about">{isEnglish ? "About" : "自己紹介"}</Link>
        </nav>
        <div className={styles.language} aria-label={isEnglish ? "Language" : "言語"}>
          <button onClick={() => setLanguage("en")} aria-pressed={isEnglish} lang="en">EN</button>
          <span aria-hidden="true">/</span>
          <button onClick={() => setLanguage("ja")} aria-pressed={!isEnglish} lang="ja">日本語</button>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="cabinet-title">
          <div>
            <p className={styles.eyebrow}>{isEnglish ? "The project cabinet" : "プロジェクトの棚"}</p>
            <h1 id="cabinet-title">{isEnglish ? <>Working<br />objects.</> : <>つくったもの。<br />役立つもの。</>}</h1>
          </div>
          <div className={styles.introAside}>
            <p>{isEnglish ? <>A small collection of systems,<br />tools, and ideas made useful.</> : <>仕組み、道具、アイデアを<br />使えるかたちに。</>}</p>
            <p className={styles.invitation}>{isEnglish ? "Pick something up. Take a closer look." : "気になるものを、手に取ってみてください。"}</p>
            <svg className={styles.gesture} viewBox="0 0 100 65" fill="none" aria-hidden="true"><path d="M7 10c30-8 72 1 71 22-.5 10-13 17-21 11-7-6-3-14 6-12 12 3 14 16 7 25m0 0 1-10m-1 10 9-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </section>
        <section id="cabinet" className={styles.collection} aria-label={isEnglish ? "Project cabinet" : "プロジェクト一覧"}>
          <div className={styles.cabinet}>
            <div className={styles.sceneArea}>
              <div className={styles.posters} hidden={ready}>{projects.map((project) => <div key={project.link}><ObjectPoster kind={project.kind} /></div>)}</div>
              <div className={styles.scene} aria-hidden="true">
                {!sceneUnavailable && <SceneBoundary onUnavailable={markSceneUnavailable}>
                  <CabinetScene projects={projects} onSelect={setSelected} onHover={setHovered} onReady={markSceneReady} onUnavailable={markSceneUnavailable} />
                </SceneBoundary>}
              </div>
              <div className={styles.mobileLabels}>
                {projects.map((project) => <button key={project.link} onClick={() => setSelected(project)} aria-label={isEnglish ? `Inspect ${project.englishTitle}` : `${project.title}を詳しく見る`}>{project.shortTitle[language]}<span>{isEnglish ? "Inspect" : "詳しく"} +</span></button>)}
              </div>
            </div>
            <div className={styles.shelfLabels}>
              {projects.map((project) => (
                <div key={project.link} className={styles.shelfLabel} data-hovered={hovered === project.link}>
                  <button onClick={() => setSelected(project)} onMouseEnter={() => setHovered(project.link)} onMouseLeave={() => setHovered(null)}>
                    <span>{isEnglish ? project.englishTitle : project.title}</span><span className={styles.inspectIcon} aria-hidden="true">+</span>
                  </button>
                  <Link href={project.link}>{isEnglish ? "Read project" : "プロジェクトを読む"}</Link>
                </div>
              ))}
            </div>
            <span className={`${styles.screw} ${styles.screwLeft}`} aria-hidden="true" />
            <span className={`${styles.screw} ${styles.screwRight}`} aria-hidden="true" />
          </div>
        </section>
      </main>
      <details className={styles.catalogue}>
        <summary>{isEnglish ? "Browse as a list" : "リストで見る"}<span aria-hidden="true">+</span></summary>
        <ul>{projects.map((project) => <li key={project.link}><Link href={project.link}><h2>{isEnglish ? project.englishTitle : project.title}</h2><p>{isEnglish ? project.englishSummary : project.oneLiner}</p></Link></li>)}</ul>
      </details>
      <footer className={styles.footer}>
        <p>{isEnglish ? "Designed & built by Kento Iizuka" : "デザイン・開発：飯塚健杜"}</p>
        <Link href="/portfolio">{isEnglish ? "The person behind the objects" : "つくった人について"}</Link>
      </footer>
      {selected && <Inspection project={selected} language={language} onClose={() => setSelected(null)} />}
    </div>
  );
}
