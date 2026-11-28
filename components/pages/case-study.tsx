import Link from "next/link";
import { copy } from "@/app/content/copy";
import type { Locale, Project } from "@/app/content/model";
import { findProject } from "@/lib/content";
import { projectSchema } from "@/lib/metadata";
import { CollectionReturn } from "../collection-return";
import {
  ContactActions,
  JsonLd,
  ProjectCard,
  Section,
  Todo,
  Workflow,
} from "../content";

export function CaseStudyPage({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
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
    "related",
  ] as const;
  return (
    <article className="case-study">
      <JsonLd value={projectSchema(project, locale)} />
      <nav
        className="breadcrumbs"
        aria-label={locale === "en" ? "Breadcrumbs" : "現在の位置"}
      >
        <Link href={`/${locale}`}>{text.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/projects`}>{text.projects}</Link>
        <span aria-hidden="true">/</span>
        <span>{project.title[locale]}</span>
      </nav>
      <header id="purpose" className="case-intro">
        <p className="eyebrow">{project.association[locale]}</p>
        <h1>{project.title[locale]}</h1>
        <p className="intro-description">{project.summary[locale]}</p>
        <p>
          {project.contribution[locale]} · {project.stage[locale]}
        </p>
        <p>
          <a className="result-link" href="#results">
            {text.results}{" "}
            ↓
          </a>
        </p>
        <Workflow project={project} locale={locale} />
      </header>
      <nav className="case-contents" aria-label={text.contents}>
        {sections.map((section) => (
          <a key={section} href={`#${section}`}>
            {text[section]}
          </a>
        ))}
      </nav>
      <div className="case-body">
        <Section id="problem" title={text.problem}>
          <p>{project.problem[locale]}</p>
        </Section>
        <Section id="contribution" title={text.contribution}>
          <p>{project.description[locale]}</p>
          <p>
            {project.association[locale]} · {project.contribution[locale]}
          </p>
          <Todo item={project.todos.context} locale={locale} />
        </Section>
        <Section id="built" title={text.built}>
          <Workflow project={project} locale={locale} />
          <p>{text.synthetic}</p>
        </Section>
        <Section id="decisions" title={text.decisions}>
          {project.decisions[locale].map((decision) => (
            <p key={decision}>{decision}</p>
          ))}
          <Todo item={project.todos.decisions} locale={locale} />
        </Section>
        <Section id="results" title={text.results}>
          <p>{project.results[locale]}</p>
          {project.slug === "subsidy-search-pilot" && (
            <h3 id="evaluation">{text.evaluation}</h3>
          )}
          <Todo item={project.todos.evidence} locale={locale} />
        </Section>
        <Section id="artifacts" title={text.artifacts}>
          <Todo item={project.todos.artifacts} locale={locale} />
        </Section>
        <Section id="stack" title={text.stack}>
          <dl className="stack-list">
            {project.stack.map((technology) => (
              <div key={technology.name}>
                <dt>{technology.name}</dt>
                <dd>{technology.responsibility[locale]}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section id="reflection" title={text.reflection}>
          <Todo item={project.todos.reflection} locale={locale} />
        </Section>
      </div>
      <Section id="related" title={text.related}>
        <div className="project-grid">
          {project.related.map((slug) => (
            <ProjectCard
              key={slug}
              project={findProject(slug)!}
              locale={locale}
            />
          ))}
        </div>
      </Section>
      <Section title={text.contact}>
        <ContactActions locale={locale} project={project} />
      </Section>
      <CollectionReturn locale={locale} />
    </article>
  );
}
