import Link from "next/link";
import type { ReactNode } from "react";
import { copy } from "@/app/content/copy";
import type { ContentTodo, Locale, Project } from "@/app/content/model";
import { siteContent } from "@/lib/content";
import { ProjectArt } from "./art";
import { chromaRoot } from "./paths";
import styles from "./chroma.module.css";

export { chromaRoot } from "./paths";

export function ChromaTodo({
  item,
  locale,
}: {
  item: ContentTodo;
  locale: Locale;
}) {
  return (
    <aside className={styles.placeholder} data-todo={item.id}>
      <strong>TODO [{item.id}]</strong>
      {item.text[locale]}
    </aside>
  );
}

export function Intro({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.pageIntro}>
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export function ProjectCard({
  project,
  locale,
  area,
}: {
  project: Project;
  locale: Locale;
  area?: string;
}) {
  const query = area ? `?area=${area}` : "";
  const href = `${chromaRoot}/${locale}/projects/${project.slug}${query}`;

  return (
    <article className={styles.projectCard} data-project={project.slug}>
      <Link
        href={href}
        className={styles.projectArtLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectArt slug={project.slug} className={styles.projectArt} />
      </Link>
      <h3>
        <Link href={href}>{project.title[locale]}</Link>
      </h3>
      <p>{project.summary[locale]}</p>
      <p className={styles.context}>{project.stage[locale]}</p>
    </article>
  );
}

export function ContactCallout({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const text = copy[locale];
  const query = project ? `?project=${project.slug}` : "";

  return (
    <section className={styles.callout}>
      <h2>
        {locale === "en"
          ? "Let’s find how it fits."
          : "どんな仕組みが必要か、一緒に考えます。"}
      </h2>
      <div>
        <p>{text.contactIntro}</p>
        <div className={styles.calloutLinks}>
          <Link
            href={`${chromaRoot}/${locale}/contact#hiring`}
            className={styles.textLink}
          >
            {text.hiring}
          </Link>
          <Link
            href={`${chromaRoot}/${locale}/contact${query}#projects`}
            className={styles.textLink}
          >
            {text.discuss}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Career({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  return (
    <div className={styles.career}>
      {siteContent.experience.map((job) => (
        <article
          className={full ? styles.resumeRow : styles.careerRow}
          key={job.id}
        >
          <div>
            <h3>{job.company}</h3>
            {full && <p>{job.period[locale]}</p>}
          </div>
          {!full && <p>{job.period[locale]}</p>}
          <div>
            <p>
              <strong>{job.title[locale]}</strong>
            </p>
            <p>{job.summary[locale]}</p>
            {full && (
              <ul>
                {job.bullets[locale].map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ChromaFooter({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <footer className={styles.footer}>
      <p>
        {locale === "en"
          ? "Making the pieces make sense."
          : "ひとつひとつの役割が、わかる仕組みに。"}
      </p>
      <nav aria-label={locale === "en" ? "Footer" : "フッター"}>
        <Link href={`${chromaRoot}/${locale}/work-together`}>{text.work}</Link>
        <Link href={`${chromaRoot}/${locale}/resume`}>{text.resume}</Link>
        <Link href={`${chromaRoot}/${locale}/contact`}>{text.contact}</Link>
        <a href={siteContent.links[0].url}>{siteContent.links[0].label}</a>
      </nav>
      <small>
        {siteContent.identity.name[locale]} /{" "}
        {siteContent.identity.location[locale]}
      </small>
    </footer>
  );
}
