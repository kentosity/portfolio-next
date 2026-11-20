"use client";

import { useState } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";
import Glyph from "./glyph";

const paths = [
  "M30 140 H240 C320 140 310 40 400 40 H565 C665 40 625 230 745 230 H920 C1000 230 990 140 1070 140 H1170",
  "M30 140 H200 Q240 140 260 90 Q280 40 300 140 Q320 240 340 140 Q360 40 380 140 Q400 240 420 140 H600 Q620 140 640 90 Q660 40 680 140 Q700 240 720 140 H1170",
  "M30 140 H270 Q300 140 300 110 V70 Q300 40 330 40 H560 Q590 40 590 70 V210 Q590 240 620 240 H840 Q870 240 870 210 V170 Q870 140 900 140 H1170",
];

export default function Score() {
  const [language, setLanguage] = useState<Language>("en");
  const [selected, setSelected] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const project = projects[selected];

  return <Shell direction="score" language={language} setLanguage={setLanguage}>
    <main id="work">
      <section className={styles.scoreHero}>
        <div className={styles.scoreHeading}><h1>{language === "en" ? <>Good things<br/>connect.</> : <>つながると、<br/>使いやすい。</>}</h1><p>{language === "en" ? "Data becomes a report. Text becomes a voice. A reservation becomes a welcome." : "データがレポートに。テキストが声に。予約が来場につながります。"}</p></div>
        <div className={styles.signal}>
          <svg viewBox="0 0 1200 280" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {[40, 90, 140, 190, 240].map(y => <path key={y} d={`M0 ${y} H1200`} stroke="currentColor" opacity=".1"/>)}
            {paths.map((path, index) => <path key={index} d={path} stroke="currentColor" strokeWidth="2" opacity={index === selected ? ".25" : ".07"}/>)}
            <path d={paths[selected]} stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity=".65"/>
            {playCount > 0 && <path key={`${selected}-${playCount}`} className={styles.signalPulse} d={paths[selected]} strokeWidth="10" strokeLinecap="round" pathLength="1"/>}
            <circle cx="30" cy="140" r="15" fill="currentColor"/><circle cx="1170" cy="140" r="15" fill="currentColor"/>
          </svg>
          <div className={styles.signalLabels}><span>{project.workflow[language][0]}</span><span>{project.workflow[language][1]}</span><span>{project.workflow[language][2]}</span></div>
        </div>
        <div className={styles.scorePlayback}><p aria-live="polite">{project.shortTitle[language]}</p><button onClick={() => setPlayCount(playCount + 1)} className={styles.playButton}><span><Glyph kind="play"/></span>{language === "en" ? "Play the connection" : "つながりを見る"}</button></div>
      </section>
      <section className={styles.scoreProjects} aria-label={language === "en" ? "Choose a connection" : "つながりを選ぶ"}>
        {projects.map((item, index) => <article key={item.href} data-selected={selected === index}>
          <button aria-pressed={selected === index} onClick={() => { setSelected(index); setPlayCount(playCount + 1); }}><span aria-hidden><Glyph kind={(["connection", "wave", "cross"] as const)[index]}/></span><h2>{projectTitle(item, language)}</h2></button>
          <p>{item.summary[language]}</p><ReadProject href={item.href} language={language}/>
        </article>)}
      </section>
    </main>
  </Shell>;
}
