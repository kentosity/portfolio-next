"use client";

import { useState } from "react";
import { projects, projectTitle, type Language } from "./projects";
import { ReadProject, Shell } from "./shell";
import styles from "./varieties.module.css";
import Glyph from "./glyph";

export default function Fold() {
  const [language, setLanguage] = useState<Language>("en");
  const [opened, setOpened] = useState<number | null>(0);

  return <Shell direction="fold" language={language} setLanguage={setLanguage}>
    <main id="work" className={styles.foldMain}>
      <section className={styles.foldHeading}><span className={styles.foldFlower} aria-hidden><Glyph kind="flower"/></span><h1>{language === "en" ? <>Made<br/>with care.</> : <>ひとつずつ、<br/>丁寧に。</>}</h1><p>{language === "en" ? "I like the part where a complicated idea starts to feel simple. Here are three things I’ve built." : "複雑だったものが、わかりやすくなる。その過程が好きです。これまでに作った3つの仕組みを紹介します。"}</p><p className={styles.foldInvitation}>{language === "en" ? "Open a fold to look inside." : "折り目を開いて、中を見てください。"}</p></section>
      <section className={styles.foldRibbon} aria-label={language === "en" ? "Unfold the projects" : "プロジェクトを開く"}>
        <div className={styles.foldCrown} aria-hidden/>
        {projects.map((project, index) => <article className={styles.foldPanel} data-open={opened === index} key={project.href}>
          <h2><button aria-expanded={opened === index} aria-controls={`fold-project-${index}`} onClick={() => setOpened(opened === index ? null : index)}><span>{projectTitle(project, language)}</span><span aria-hidden>{opened === index ? "−" : "+"}</span></button></h2>
          <div id={`fold-project-${index}`} hidden={opened !== index} className={styles.foldContent}><p>{project.summary[language]}</p><ReadProject href={project.href} language={language}/></div>
          <div className={styles.foldCrease} aria-hidden/>
        </article>)}
        <div className={styles.foldTail} aria-hidden/>
      </section>
      <p className={styles.foldEndnote}>{language === "en" ? "Thoughtful structure. Useful software." : "仕組みを考え、役立つものを作る。"}</p>
    </main>
  </Shell>;
}
