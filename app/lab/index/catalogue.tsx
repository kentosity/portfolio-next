"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Glyph from "../_varieties/glyph";
import { Shell } from "../_varieties/shell";
import type { Language } from "../_varieties/projects";
import styles from "./catalogue.module.css";

const directions = [
  { route: "v-syntax", name: "Syntax", description: { en: "Oversized type finds its rhythm when you bring the letters into line.", ja: "大きな文字を整えると、ページにリズムが生まれます。" } },
  { route: "v-chroma", name: "Chroma", description: { en: "Colour and geometry rearrange around the project you choose.", ja: "プロジェクトを選ぶと、色と形が組み替わります。" } },
  { route: "v-score", name: "Score", description: { en: "A signal travels through three ways of connecting useful software.", ja: "データ、音声、予約をつなぐ仕組みを、光の流れで表します。" } },
  { route: "v-atlas", name: "Atlas", description: { en: "Lift the floors of an architectural space to explore the work.", ja: "建築のフロアを広げながら、プロジェクトを見て回ります。" } },
  { route: "v-fold", name: "Fold", description: { en: "A continuous paper ribbon unfolds into three project stories.", ja: "折り重なった紙を開くと、3つのプロジェクトが現れます。" } },
  { route: "v-thread", name: "Thread", description: { en: "Woven lines make the connections in each project visible.", ja: "織り重なる糸で、プロジェクトのつながりを表します。" } },
  { route: "generative", name: "Generative v2", description: { en: "Computational prints can be remixed, inspected and saved.", ja: "計算で描いた図案を組み替え、拡大して、保存できます。" } },
  { route: "print", name: "Print workshop", description: { en: "Project sheets form a tactile, oversized publication.", ja: "大きな紙面をめくるように、プロジェクトを読み進めます。" } },
  { route: "notebook", name: "Field notebook", description: { en: "Drawn mechanisms open to show how each project works.", ja: "仕組みを描いた図を開くと、プロジェクトの中身が見えます。" } },
  { route: "cabinet", name: "Working objects", description: { en: "A cabinet of small spatial objects introduces the projects.", ja: "棚に並んだ立体のオブジェクトから、プロジェクトを選びます。" } },
  { route: "generative-original", name: "Generative v1", description: { en: "The first archive of original, repeatable computational prints.", ja: "繰り返し描ける計算の図案を並べた、最初のアーカイブです。" } },
];

export default function Catalogue() {
  const [language, setLanguage] = useState<Language>("en");

  return <Shell direction="catalogue" language={language} setLanguage={setLanguage}>
    <main id="work" className={styles.catalogue}>
      <div className={styles.intro}><h1>{language === "en" ? <>Ways of<br/>making sense.</> : <>わかりやすさの、<br/>いろいろな形。</>}</h1><p>{language === "en" ? "Eleven studies for one portfolio. Open a direction, try its interaction, and see how the same work feels in a different form." : "ひとつのポートフォリオから生まれた、11のデザイン。気になるページを開いて、動かして、同じ仕事がどう見えるか比べてみてください。"}</p></div>
      <div className={styles.grid}>{directions.map((direction, index) => <Link key={direction.route} href={`/lab/${direction.route}`} className={styles.direction} prefetch={false}>
        <div className={styles.image}><Image src={`/lab/thumbnails/${direction.route}.webp`} alt="" width={720} height={450} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={index < 3}/></div>
        <h2>{direction.name}<span><Glyph kind="arrow"/></span></h2><p>{direction.description[language]}</p>
      </Link>)}</div>
    </main>
  </Shell>;
}
