import Link from "next/link";
import type { ReactNode } from "react";
import { copy } from "@/app/content/copy";
import type { Locale, Project } from "@/app/content/model";
import { siteContent } from "@/lib/content";

export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      {children && <div className="intro-description">{children}</div>}
    </header>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Workflow({
  project,
  locale,
  compact = false,
}: {
  project: Project;
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <figure className={`workflow${compact ? " workflow-compact" : ""}`}>
      <ol aria-label={copy[locale].diagram}>
        {project.workflow[locale].map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {!compact && <figcaption>{copy[locale].diagram}</figcaption>}
    </figure>
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
  return (
    <article className="project-card" data-project={project.slug}>
      <Workflow project={project} locale={locale} compact />
      <div className="project-card-content">
        <h3>
          <Link href={`/${locale}/projects/${project.slug}${query}`}>
            {project.title[locale]}
          </Link>
        </h3>
        <p>{project.summary[locale]}</p>
        <p className="project-context">{project.stage[locale]}</p>
      </div>
    </article>
  );
}

export function ContactActions({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const query = project ? `?project=${project.slug}` : "";
  return (
    <div className="actions">
      <Link className="button" href={`/${locale}/contact#hiring`}>
        {copy[locale].hiring}
      </Link>
      <Link
        className="button button-secondary"
        href={`/${locale}/contact${query}#projects`}
      >
        {copy[locale].discuss}
      </Link>
    </div>
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
    <div className="career-list">
      {siteContent.experience.map((job) => (
        <article key={job.id}>
          <div>
            <h3>{job.company[locale]}</h3>
            <p className="subtle">{job.period[locale]}</p>
          </div>
          <div>
            <p className="job-title">{job.title[locale]}</p>
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

export function Skills({
  locale,
  evidence = false,
}: {
  locale: Locale;
  evidence?: boolean;
}) {
  const evidenceSlugs = [
    "event-platform",
    "salon-data-platform",
    "local-speech",
    "snap-photobooth",
  ];
  return (
    <div className="skills-grid">
      {siteContent.skills.map((group, index) => (
        <article key={group.title.en}>
          <h3>{group.title[locale]}</h3>
          <p>{group.items[locale].join(" / ")}</p>
          {evidence && (
            <Link href={`/${locale}/projects/${evidenceSlugs[index]}`}>
              {copy[locale].readCase} →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

export function Education({ locale }: { locale: Locale }) {
  return (
    <>
      {siteContent.education.map((school) => (
        <article key={school.school.en}>
          <h3>{school.school[locale]}</h3>
          <p>{school.description[locale]}</p>
        </article>
      ))}
    </>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <p>
        {siteContent.identity.name[locale]} ·{" "}
        {siteContent.identity.location[locale]}
      </p>
      <nav aria-label={locale === "en" ? "Footer" : "フッター"}>
        <Link href={`/${locale}/work-together`}>{copy[locale].work}</Link>
        <Link href={`/${locale}/resume`}>{copy[locale].resume}</Link>
        <Link href={`/${locale}/contact`}>{copy[locale].contact}</Link>
        <a href={siteContent.links[0].url}>GitHub</a>
      </nav>
    </footer>
  );
}

export function JsonLd({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}
