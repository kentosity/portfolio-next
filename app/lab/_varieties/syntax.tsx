"use client";

import { useState } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";
import Glyph from "./glyph";

export default function Syntax() {
  const [language, setLanguage] = useState<Language>("en");
  const [aligned, setAligned] = useState(false);
  const letters = language === "en" ? "sense." : "整える。";

  return <Shell direction="syntax" language={language} setLanguage={setLanguage}>
    <main id="work">
      <section className={styles.syntaxHero}>
        <h1 className={styles.syntaxTitle} aria-label={language === "en" ? "Making sense." : "仕組みを、整える。"}>{language === "en" ? "Making" : "仕組みを、"}<br/>
          <span className={styles.letterLine} aria-hidden="true">
            {[...letters].map((letter, index) => <span aria-hidden key={index} style={{ transform: aligned ? "none" : `translateY(${[0, -9, 15, -6, 9, 0][index]}%) rotate(${[0, -8, 6, -4, 8, 0][index]}deg)` }}>{letter}</span>)}
          </span>
        </h1>
        <div className={styles.syntaxBottom}><p>{language === "en" ? "I enjoy turning complicated systems into things people can use." : "複雑な仕組みを整理して、使いやすい形にするのが好きです。"}</p>
          <button className={styles.typeButton} aria-pressed={aligned} onClick={() => setAligned(!aligned)}><span><Glyph kind={aligned ? "shuffle" : "align"}/></span>{language === "en" ? aligned ? "Loosen the type" : "Bring into line" : aligned ? "文字を遊ばせる" : "文字を整える"}</button>
        </div>
      </section>
      <section className={styles.syntaxProjects} aria-label={language === "en" ? "Selected projects" : "プロジェクト"}>
        {projects.map((project, index) => <article key={project.href}>
          <span className={styles.syntaxGlyph} aria-hidden><Glyph kind={(["connection", "wave", "cross"] as const)[index]}/></span>
          <h2>{projectTitle(project, language)}</h2><p>{project.summary[language]}</p><ReadProject href={project.href} language={language}/>
        </article>)}
      </section>
    </main>
  </Shell>;
}
