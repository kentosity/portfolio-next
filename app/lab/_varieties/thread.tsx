"use client";

import { useState } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";
import Glyph from "./glyph";

export default function Thread() {
  const [language, setLanguage] = useState<Language>("en");
  const [woven, setWoven] = useState(true);
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return <Shell direction="thread" language={language} setLanguage={setLanguage}>
    <main id="work">
      <section className={styles.threadIntro}><h1>{language === "en" ? <>Follow<br/>the thread.</> : <>つながりを、<br/>たどる。</>}</h1><div><p>{language === "en" ? "A useful system brings separate things together. I build the connections, and make them easier to understand." : "別々のものがつながると、役立つ仕組みになる。そのつながりを作り、わかりやすく整えています。"}</p><button className={styles.threadButton} aria-pressed={woven} onClick={() => setWoven(!woven)}>{language === "en" ? woven ? "Separate the threads" : "Weave them together" : woven ? "糸をほどく" : "糸を織り合わせる"}<span><Glyph kind="weave"/></span></button></div></section>
      <section className={styles.loom}>
        <svg className={styles.weave} viewBox="0 0 1000 500" fill="none" aria-hidden="true" data-woven={woven}>
          {Array.from({length: 33}, (_, index) => {
            const y = 60 + index * 12;
            const bend = woven ? 170 * Math.sin(index * .09 + selected * .5) : 0;
            return <path key={`weft-${index}`} d={`M25 ${y} C230 ${y}, ${260 + bend} ${470 - y}, 500 ${250 + Math.sin(index * .13) * 80} S780 ${y}, 975 ${y}`} stroke="currentColor" strokeWidth="1.2" opacity={index % 3 === selected ? ".95" : ".3"}/>;
          })}
          {Array.from({length: 31}, (_, index) => {
            const x = 250 + index * 16;
            return <path key={`warp-${index}`} d={woven ? `M${x} 15 C${x - 240} 180, ${1000 - x + 240} 320, ${1000 - x} 485` : `M${x} 15 V485`} stroke="#b55a38" strokeWidth="1" opacity=".4"/>;
          })}
          <circle cx="25" cy="250" r="7" fill="currentColor"/><circle cx="975" cy="250" r="7" fill="currentColor"/>
        </svg>
        <div className={styles.loomLabels}>{project.workflow[language].map((step) => <span key={step}>{step}</span>)}</div>
      </section>
      <div className={styles.threadCaption}><p>{language === "en" ? "A woven study of how the work connects." : "仕事のつながりを、織物のように表しました。"}</p><span aria-hidden>↙</span></div>
      <section className={styles.threadProjects}>
        <div className={styles.threadSelector} aria-label={language === "en" ? "Choose a thread" : "糸を選ぶ"}>{projects.map((item, index) => <button key={item.href} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden>●</span>{projectTitle(item, language)}</button>)}</div>
        <article className={styles.threadDetail} aria-live="polite"><h2>{projectTitle(project, language)}</h2><p>{project.summary[language]}</p><ReadProject href={project.href} language={language}/></article>
      </section>
    </main>
  </Shell>;
}
