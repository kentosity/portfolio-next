"use client";

import { useState, type CSSProperties } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";

export default function Chroma() {
  const [language, setLanguage] = useState<Language>("en");
  const [selected, setSelected] = useState(0);
  const [turn, setTurn] = useState(0);
  const project = projects[selected];

  function selectProject(index: number) {
    setSelected(index);
    setTurn(turn + 1);
  }

  return <Shell direction="chroma" language={language} setLanguage={setLanguage}>
    <main id="work">
      <section className={styles.chromaHero}>
        <div className={styles.chromaHeading}><h1>{language === "en" ? <>A place<br/>for every<br/>part.</> : <>ひとつずつ、<br/>使いやすい<br/>形に。</>}</h1><p>{language === "en" ? "I design and build software by finding how the pieces fit together." : "一つひとつの役割を考えて、ソフトウェアを設計し、作っています。"}</p></div>
        <div className={styles.colorPlay}>
          <div className={styles.colorComposition} data-selection={selected} style={{ "--turn": `${turn * 90}deg` } as CSSProperties}>
            <span className={styles.colorDisc} aria-hidden/><span className={styles.colorArch} aria-hidden/><span className={styles.colorSquare} aria-hidden/>
            <span className={styles.colorHole} aria-hidden/><span className={styles.colorRail} aria-hidden/>
          </div>
          <div className={styles.colorControls} aria-label={language === "en" ? "Choose a project" : "プロジェクトを選択"}>
            {projects.map((item, index) => <button key={item.href} aria-pressed={selected === index} onClick={() => selectProject(index)} aria-label={projectTitle(item, language)}><span className={styles[`swatch${index}`]} aria-hidden/>{language === "en" ? ["Data", "Voice", "Events"][index] : ["データ", "音声", "イベント"][index]}</button>)}
          </div>
        </div>
      </section>
      <section className={styles.chromaSelected} aria-live="polite"><span className={styles.chromaMark} aria-hidden>{["●", "◒", "■"][selected]}</span><div><h2>{projectTitle(project, language)}</h2><p>{project.summary[language]}</p></div><ReadProject href={project.href} language={language}/></section>
      <section className={styles.colorIndex} aria-label={language === "en" ? "All selected work" : "すべてのプロジェクト"}>{projects.map((item) => <article key={item.href}><h2>{projectTitle(item, language)}</h2><p>{item.summary[language]}</p><ReadProject href={item.href} language={language}/></article>)}</section>
    </main>
  </Shell>;
}
