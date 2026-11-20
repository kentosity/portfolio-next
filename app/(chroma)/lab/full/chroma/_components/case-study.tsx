import Link from "next/link";
import type { ReactNode } from "react";
import { copy } from "@/app/content/copy";
import type { Area, Locale, Project } from "@/app/content/model";
import { findProject } from "@/lib/content";
import { ProjectArt } from "./art";
import { ReturnToCollection } from "./collection-position";
import { SystemDiagram } from "./interactions";
import { ChromaTodo, ContactCallout, ProjectCard, chromaRoot } from "./shared";
import styles from "./chroma.module.css";

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.caseSection}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function CostResult({ project, locale }: { project: Project; locale: Locale }) {
  const metric = project.metric;
  if (!metric) return null;
  const formatCost = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: metric.currency,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className={styles.metric}>
      <strong className={styles.metricValue}>~{metric.percent}%</strong>
      <p>
        {locale === "en"
          ? "reduction in annual event-platform infrastructure cost"
          : "イベント基盤の年間インフラ費を削減"}
      </p>
      <div className={styles.costComparison}>
        <div>
          <small>
            {locale === "en" ? "Before, approximately" : "再設計前（概算）"}
          </small>
          <span>{formatCost(metric.before)}</span>
        </div>
        <div>
          <small>
            {locale === "en" ? "After, approximately" : "再設計後（概算）"}
          </small>
          <span>{formatCost(metric.after)}</span>
        </div>
      </div>
    </div>
  );
}

export function ChromaCaseStudy({
  project,
  locale,
  area,
}: {
  project: Project;
  locale: Locale;
  area?: Area;
}) {
  const text = copy[locale];
  const sections = [
    "problem",
    "contribution",
    "built",
    "decisions",
    "results",
    "artifacts",
    "stack",
    "reflection",
  ] as const;
  const stageDescriptions = [
    project.problem[locale],
    project.decisions[locale].join(" "),
    project.results[locale],
  ];
  const stages = project.workflow[locale].map((title, index) => ({
    title,
    description: stageDescriptions[index] ?? project.description[locale],
  }));
  const relatedProjects = project.related
    .map((slug) => findProject(slug))
    .filter((related): related is Project => Boolean(related));
  const collectionQuery = area ? `?area=${area}` : "";

  return (
    <article data-case-study>
      <header className={styles.caseHero}>
        <nav
          className={styles.breadcrumbs}
          aria-label={locale === "en" ? "Breadcrumbs" : "現在の位置"}
        >
          <Link href={`${chromaRoot}/${locale}`}>{text.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`${chromaRoot}/${locale}/projects${collectionQuery}`}>
            {text.projects}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{project.title[locale]}</span>
        </nav>
        <div className={styles.caseHeading}>
          <h1>{project.title[locale]}</h1>
          <div>
            <p>{project.summary[locale]}</p>
            <p style={{ marginTop: "1rem" }}>
              <a className={styles.textLink} href="#results">
                {project.metric
                  ? locale === "en"
                    ? `~${project.metric.percent}% lower annual infrastructure cost`
                    : `年間インフラ費を約${project.metric.percent}%削減`
                  : text.results}
              </a>
            </p>
          </div>
        </div>
        <figure className={styles.caseHeroArt}>
          <ProjectArt slug={project.slug} className={styles.projectArt} />
          <figcaption>{project.stage[locale]}</figcaption>
        </figure>
        <dl className={styles.caseMeta}>
          <div>
            <dt>{locale === "en" ? "Project context" : "取り組んだ環境"}</dt>
            <dd>{project.association[locale]}</dd>
          </div>
          <div>
            <dt>{text.contribution}</dt>
            <dd>{project.contribution[locale]}</dd>
          </div>
        </dl>
      </header>
      <div className={styles.caseBody}>
        <nav className={styles.contents} aria-label={text.contents}>
          {sections.map((section) => (
            <a key={section} href={`#${section}`}>
              {text[section]}
            </a>
          ))}
        </nav>
        <div>
          <CaseSection id="problem" title={text.problem}>
            <p>{project.problem[locale]}</p>
          </CaseSection>
          <CaseSection id="contribution" title={text.contribution}>
            <p>{project.description[locale]}</p>
            <ChromaTodo item={project.todos.context} locale={locale} />
          </CaseSection>
          <CaseSection id="built" title={text.built}>
            <SystemDiagram locale={locale} stages={stages} />
          </CaseSection>
          <CaseSection id="decisions" title={text.decisions}>
            {project.decisions[locale].map((decision) => (
              <div className={styles.decision} key={decision}>
                <span className={styles.decisionShape} aria-hidden="true" />
                <p>{decision}</p>
              </div>
            ))}
            <ChromaTodo item={project.todos.decisions} locale={locale} />
          </CaseSection>
          <CaseSection id="results" title={text.results}>
            <CostResult project={project} locale={locale} />
            <p>{project.results[locale]}</p>
            {project.slug === "subsidy-search-pilot" && (
              <h3 id="evaluation" style={{ marginTop: "1.5rem" }}>
                {text.evaluation}
              </h3>
            )}
            <ChromaTodo item={project.todos.evidence} locale={locale} />
          </CaseSection>
          <CaseSection id="artifacts" title={text.artifacts}>
            <div className={styles.artifact}>
              <a href="#built">
                {locale === "en"
                  ? "Inspect the workflow diagram"
                  : "仕組みの流れを見る"}
              </a>
              <p>{text.diagram}</p>
            </div>
            <ChromaTodo item={project.todos.artifacts} locale={locale} />
          </CaseSection>
          <CaseSection id="stack" title={text.stack}>
            <dl className={styles.stackResponsibilities}>
              {project.stack.map((technology) => (
                <div key={technology.name}>
                  <dt>{technology.name}</dt>
                  <dd>{technology.responsibility[locale]}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>
          <CaseSection id="reflection" title={text.reflection}>
            <ChromaTodo item={project.todos.reflection} locale={locale} />
          </CaseSection>
          <ReturnToCollection locale={locale} area={area} />
        </div>
      </div>
      <section id="related" className={styles.related}>
        <h2>{text.related}</h2>
        <div className={styles.featureGrid}>
          {relatedProjects.map((related) => (
            <ProjectCard key={related.id} project={related} locale={locale} />
          ))}
        </div>
      </section>
      <ContactCallout locale={locale} project={project} />
    </article>
  );
}
