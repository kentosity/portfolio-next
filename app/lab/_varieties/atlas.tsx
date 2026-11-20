"use client";

import { useState, type CSSProperties } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";

export default function Atlas() {
  const [language, setLanguage] = useState<Language>("en");
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return <Shell direction="atlas" language={language} setLanguage={setLanguage}>
    <main id="work">
      <section className={styles.atlasHero}>
        <div className={styles.atlasHeading}><h1>{language === "en" ? <>Room<br/>to think.</> : <>考える<br/>余白を。</>}</h1><p>{language === "en" ? "I give complex software a structure that people can find their way through." : "複雑なソフトウェアに、使う人が迷わず進める構造を作ります。"}</p><button className={styles.atlasToggle} aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{language === "en" ? expanded ? "Stack the floors" : "Lift the floors" : expanded ? "フロアを重ねる" : "フロアを広げる"}<span aria-hidden>{expanded ? "↓" : "↑"}</span></button></div>
        <div className={styles.atlasViewport}>
          <div className={styles.atlasSpace} data-expanded={expanded}>
            <div className={styles.atlasGround} aria-hidden/>
            {projects.map((item, index) => <button key={item.href} className={styles.floor} data-selected={selected === index} style={{ "--floor": index } as CSSProperties} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={projectTitle(item, language)}>
              <span className={styles.floorTitle}>{language === "en" ? ["Data room", "Voice room", "Event room"][index] : ["データの部屋", "音声の部屋", "イベントの部屋"][index]}</span>
              <span className={styles.roomPlan} aria-hidden><i/><i/><i/><i/><i/></span>
              <span className={styles.floorEdge} aria-hidden/>
            </button>)}
          </div>
        </div>
      </section>
      <section className={styles.atlasReadout} aria-live="polite"><h2>{projectTitle(project, language)}</h2><p>{project.summary[language]}</p><ReadProject href={project.href} language={language}/></section>
      <section className={styles.atlasIndex} aria-label={language === "en" ? "Explore the work" : "プロジェクト"}>{projects.map(item => <article key={item.href}><h2>{projectTitle(item, language)}</h2><p>{item.summary[language]}</p><ReadProject href={item.href} language={language}/></article>)}</section>
    </main>
  </Shell>;
}
