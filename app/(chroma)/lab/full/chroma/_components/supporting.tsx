import Link from "next/link";
import { areas, copy } from "@/app/content/copy";
import type { Locale, Project } from "@/app/content/model";
import { featuredProjects, findProject, siteContent } from "@/lib/content";
import {
  Career,
  ChromaTodo,
  ContactCallout,
  Intro,
  ProjectCard,
  chromaRoot,
} from "./shared";
import styles from "./chroma.module.css";

function Skills({ locale }: { locale: Locale }) {
  const evidenceSlugs = [
    "event-platform",
    "salon-data-platform",
    "local-speech",
    "snap-photobooth",
  ];

  return (
    <div className={styles.featureGrid}>
      {siteContent.skills.map((group, index) => (
        <article key={group.title.en}>
          <h3>{group.title[locale]}</h3>
          <p style={{ marginTop: "1rem" }}>{group.items[locale].join(", ")}</p>
          <Link
            className={styles.textLink}
            style={{ marginTop: "1rem" }}
            href={`${chromaRoot}/${locale}/projects/${evidenceSlugs[index]}`}
          >
            {copy[locale].readCase}
          </Link>
        </article>
      ))}
    </div>
  );
}

function Education({ locale }: { locale: Locale }) {
  return (
    <>
      {siteContent.education.map((school) => (
        <article key={school.school.en}>
          <h3>{school.school[locale]}</h3>
          <p style={{ marginTop: "1rem" }}>{school.description[locale]}</p>
        </article>
      ))}
    </>
  );
}

export function ChromaAbout({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <>
      <Intro title={text.aboutIntro}>
        <p>{siteContent.about[locale][0]}</p>
      </Intro>
      <section className={styles.split}>
        <div className={styles.aboutArt} aria-hidden="true">
          <span className={styles.disc} />
          <span className={styles.arch} />
          <span className={styles.square} />
          <span className={styles.hole} />
        </div>
        <div>
          <h2>{text.approach}</h2>
          <p>{text.approachText}</p>
          <p>{siteContent.about[locale][4]}</p>
          <Link
            className={styles.textLink}
            style={{ marginTop: "1.5rem" }}
            href={`${chromaRoot}/${locale}/projects`}
          >
            {text.viewProjects}
          </Link>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{text.career}</h2>
          <Link
            className={styles.textLink}
            href={`${chromaRoot}/${locale}/resume`}
          >
            {text.viewResume}
          </Link>
        </div>
        <Career locale={locale} />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{text.skills}</h2>
        </div>
        <Skills locale={locale} />
      </section>
      <section className={styles.split}>
        <div>
          <h2>{text.education}</h2>
          <Education locale={locale} />
        </div>
        <div>
          <h2>{text.portrait}</h2>
          <ChromaTodo item={siteContent.todos.portrait} locale={locale} />
        </div>
      </section>
      <ContactCallout locale={locale} />
    </>
  );
}

export function ChromaResume({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <>
      <Intro title={`${siteContent.identity.name[locale]} — ${text.resume}`}>
        <p>{text.current}</p>
        <p>
          <a href={`mailto:${siteContent.identity.email}`}>
            {siteContent.identity.email}
          </a>
        </p>
      </Intro>
      <section className={styles.resumeRow}>
        <h2>{text.summary}</h2>
        <div>
          <p>{siteContent.about[locale][0]}</p>
          <p>{siteContent.about[locale][4]}</p>
        </div>
      </section>
      <section id="experience" className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{text.career}</h2>
        </div>
        <Career locale={locale} full />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{text.selected}</h2>
        </div>
        <div className={styles.featureGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{text.skills}</h2>
        </div>
        <Skills locale={locale} />
      </section>
      <section className={styles.resumeRow}>
        <h2>{text.education}</h2>
        <div>
          <Education locale={locale} />
        </div>
      </section>
      <section className={styles.resumeRow}>
        <h2>{text.pdf}</h2>
        <div>
          <p>{text.pdfPending}</p>
          <ChromaTodo
            item={siteContent.todos[`resume-${locale}`]}
            locale={locale}
          />
        </div>
      </section>
      <p style={{ margin: "2rem 0 3rem" }}>
        {text.updated}:{" "}
        <time dateTime={siteContent.source.reviewedOn}>
          {siteContent.source.reviewedOn}
        </time>
      </p>
      <ContactCallout locale={locale} />
    </>
  );
}

export function ChromaWorkTogether({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const exampleSlugs = [
    "local-speech",
    "salon-data-platform",
    "architecture-portfolio",
  ];
  const steps =
    locale === "en"
      ? [
          "Understand the current workflow and the problem.",
          "Agree a small scope and a way to assess the result.",
          "Build a working version and review it together.",
          "Hand over the implementation and agree improvements.",
        ]
      : [
          "現在の業務と課題を理解する。",
          "小さな範囲と、結果を確かめる方法を決める。",
          "動くものをつくり、一緒に確認する。",
          "実装を引き継ぎ、改善する点を決める。",
        ];

  return (
    <>
      <Intro title={text.work}>
        <p>{text.workIntro}</p>
      </Intro>
      <section className={styles.services} aria-label={text.workExamples}>
        {areas.map((area, index) => {
          const project = findProject(exampleSlugs[index])!;
          return (
            <article key={area.id}>
              <h2>{area.title[locale]}</h2>
              <p>{project.summary[locale]}</p>
              <Link
                className={styles.textLink}
                href={`${chromaRoot}/${locale}/projects/${project.slug}`}
              >
                {text.readCase}
              </Link>
            </article>
          );
        })}
      </section>
      <section className={styles.split}>
        <div>
          <h2>{text.process}</h2>
          <p>{text.processIntro}</p>
        </div>
        <ol className={styles.process}>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className={styles.split}>
        <div>
          <h2>{text.terms}</h2>
          <ChromaTodo item={siteContent.todos.engagement} locale={locale} />
        </div>
        <div>
          <h2>{text.contact}</h2>
          <p>{text.projectPrompt}</p>
          <Link
            className={styles.button}
            style={{ marginTop: "1.5rem" }}
            href={`${chromaRoot}/${locale}/contact#projects`}
          >
            {text.discuss}
          </Link>
        </div>
      </section>
    </>
  );
}

export function ChromaContact({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const text = copy[locale];

  function composeEmail(kind: "hiring" | "projects") {
    const subject =
      kind === "hiring"
        ? text.hiring
        : project
          ? `${text.discuss}: ${project.title[locale]}`
          : text.discuss;
    const body =
      kind === "hiring"
        ? text.hiringPrompt
        : `${project ? `${project.title[locale]}\n\n` : ""}${text.projectPrompt}`;
    return `mailto:${siteContent.identity.email}?${new URLSearchParams({ subject, body })}`;
  }

  return (
    <>
      <Intro title={text.contact}>
        <p>{text.contactIntro}</p>
        <p>
          <a href={`mailto:${siteContent.identity.email}`}>
            {siteContent.identity.email}
          </a>
        </p>
      </Intro>
      <div className={styles.contactGrid}>
        <section id="hiring" className={styles.contactPanel}>
          <h2>{text.hiring}</h2>
          <p>{text.hiringPrompt}</p>
          <a
            className={styles.button}
            style={{ marginTop: "1.5rem" }}
            href={composeEmail("hiring")}
          >
            {text.email}
          </a>
          <p>
            <Link
              className={styles.textLink}
              href={`${chromaRoot}/${locale}/resume`}
            >
              {text.viewResume}
            </Link>
          </p>
        </section>
        <section id="projects" className={styles.contactPanel}>
          <h2>{text.discuss}</h2>
          <p>{text.projectPrompt}</p>
          {project && (
            <p>
              <Link href={`${chromaRoot}/${locale}/projects/${project.slug}`}>
                {project.title[locale]}
              </Link>
            </p>
          )}
          <a
            className={styles.button}
            style={{ marginTop: "1.5rem" }}
            href={composeEmail("projects")}
          >
            {text.email}
          </a>
          <p>
            <Link
              className={styles.textLink}
              href={`${chromaRoot}/${locale}/work-together`}
            >
              {text.work}
            </Link>
          </p>
        </section>
      </div>
      <section className={styles.split}>
        <div>
          <h2>{text.practical}</h2>
          <p>{siteContent.identity.location[locale]}</p>
          <ChromaTodo item={siteContent.todos.hiring} locale={locale} />
          <ChromaTodo item={siteContent.todos.languages} locale={locale} />
          <ChromaTodo item={siteContent.todos.engagement} locale={locale} />
        </div>
        <div>
          <h2>{text.links}</h2>
          <nav className={styles.contactLinks} aria-label={text.links}>
            {siteContent.links.map((link) => (
              <a className={styles.textLink} key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </nav>
          <ChromaTodo item={siteContent.todos.identity} locale={locale} />
          <ChromaTodo item={siteContent.todos.domain} locale={locale} />
        </div>
      </section>
    </>
  );
}
