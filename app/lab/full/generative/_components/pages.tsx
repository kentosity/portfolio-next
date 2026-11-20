import Link from "next/link";
import type { ReactNode } from "react";
import { copy, areas } from "@/app/content/copy";
import type { Area, ContentTodo, Locale, Project } from "@/app/content/model";
import { featuredProjects, findProject, siteContent } from "@/lib/content";
import Print from "./print";
import Mechanism from "./mechanism";
import {
  CollectionNavigation,
  CollectionReturn,
} from "./collection-navigation";
import { interpretations, printSource, route } from "./routing";
import styles from "../generative.module.css";

function Todo({ item, locale }: { item: ContentTodo; locale: Locale }) {
  return (
    <aside className={styles.placeholder} data-todo={item.id}>
      <strong>TODO [{item.id}]:</strong>
      {item.text[locale]}
    </aside>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.caseSection}>
      <h2>{title}</h2>
      <div className={styles.prose}>{children}</div>
    </section>
  );
}

function ContactActions({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const text = copy[locale];
  return (
    <div className={styles.heroLinks}>
      <Link
        className={styles.textLink}
        href={`${route(locale, "contact")}#hiring`}
      >
        {text.hiring}
      </Link>
      <Link
        className={styles.textLink}
        href={`${route(locale, "contact")}${project ? `?project=${project.slug}` : ""}#projects`}
      >
        {text.discuss}
      </Link>
    </div>
  );
}

function ProjectCard({
  project,
  locale,
  area,
}: {
  project: Project;
  locale: Locale;
  area?: Area;
}) {
  const href = `${route(locale, `projects/${project.slug}`)}${area ? `?area=${area}` : ""}`;
  return (
    <article className={styles.projectCard} data-project={project.slug}>
      <Link href={href} tabIndex={-1} aria-hidden="true" prefetch={false}>
        <Print
          source={printSource(project, siteContent.source.reviewedOn)}
          language={locale}
        />
      </Link>
      <div>
        <h2>
          <Link href={href} prefetch={false}>
            {project.title[locale]}
          </Link>
        </h2>
        <p>{project.summary[locale]}</p>
        <p className={styles.cardContext}>{project.stage[locale]}</p>
        <Link className={styles.textLink} href={href} prefetch={false}>
          {copy[locale].readCase}
        </Link>
      </div>
    </article>
  );
}

function Career({ locale, full = false }: { locale: Locale; full?: boolean }) {
  return (
    <ol className={styles.timeline}>
      {siteContent.experience.map((job) => (
        <li key={job.id}>
          <div className={styles.jobPeriod}>{job.period[locale]}</div>
          <div>
            <h3>{job.company}</h3>
            <p>{job.title[locale]}</p>
            <p>{job.summary[locale]}</p>
            {full && (
              <ul>
                {job.bullets[locale].map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Skills({ locale }: { locale: Locale }) {
  return (
    <div className={styles.skills}>
      {siteContent.skills.map((group) => (
        <div key={group.title.en}>
          <h3>{group.title[locale]}</h3>
          <p>{group.items[locale].join(" / ")}</p>
        </div>
      ))}
    </div>
  );
}

function Education({ locale }: { locale: Locale }) {
  return (
    <>
      {siteContent.education.map((education) => (
        <div key={education.school.en}>
          <h3>{education.school[locale]}</h3>
          <p>{education.description[locale]}</p>
        </div>
      ))}
    </>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <>
      <header className={styles.hero}>
        <div>
          <h1>
            {locale === "en" ? (
              <>
                Making systems
                <br />
                make sense.
              </>
            ) : (
              <>
                仕組みを整理し、
                <br />
                使える形に。
              </>
            )}
          </h1>
          <div className={styles.heroLinks}>
            <Link className={styles.textLink} href={route(locale, "projects")}>
              {text.viewProjects}
            </Link>
            <Link className={styles.textLink} href={route(locale, "resume")}>
              {text.viewResume}
            </Link>
          </div>
        </div>
        <div>
          <p>{siteContent.introduction[locale]}</p>
          <p className={styles.currentRole}>{text.current}</p>
        </div>
      </header>
      <div className={styles.homeGallery} id="projects">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
      <section id="about" className={styles.introBand}>
        <h2>{text.approach}</h2>
        <div>
          <p>{text.approachText}</p>
          <Link className={styles.textLink} href={route(locale, "about")}>
            {text.about}
          </Link>
        </div>
      </section>
      <Section id="experience" title={text.career}>
        <Career locale={locale} />
        <Link className={styles.textLink} href={route(locale, "resume")}>
          {text.viewResume}
        </Link>
      </Section>
      <section id="contact" className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <div>
          <ContactActions locale={locale} />
          <Link
            className={styles.textLink}
            href={route(locale, "work-together")}
          >
            {text.work}
          </Link>
        </div>
      </section>
    </>
  );
}

export function CollectionPage({
  locale,
  area,
}: {
  locale: Locale;
  area?: Area;
}) {
  const text = copy[locale];
  const count = siteContent.projects.filter(
    (project) => !area || project.area === area,
  ).length;
  return (
    <>
      <header className={styles.hero}>
        <h1>{text.projects}</h1>
        <p>{text.collectionIntro}</p>
      </header>
      <nav className={styles.filters} aria-label={text.filter}>
        <Link
          href={route(locale, "projects")}
          aria-current={!area ? "true" : undefined}
        >
          {text.all}
        </Link>
        {areas.map((group) => (
          <Link
            href={`${route(locale, "projects")}?area=${group.id}`}
            key={group.id}
            aria-current={area === group.id ? "true" : undefined}
          >
            {group.title[locale]}
          </Link>
        ))}
      </nav>
      <p className={styles.resultCount} role="status">
        {count} {text.count}
        {area && (
          <>
            {" "}
            · <Link href={route(locale, "projects")}>{text.reset}</Link>
          </>
        )}
      </p>
      <CollectionNavigation locale={locale} area={area}>
        {areas
          .filter((group) => !area || group.id === area)
          .map((group) => (
            <section key={group.id}>
              <div className={styles.sectionHeader}>
                <h2>{group.title[locale]}</h2>
              </div>
              <div className={styles.collection}>
                {siteContent.projects
                  .filter((project) => project.area === group.id)
                  .sort(
                    (first, second) =>
                      first.collectionOrder - second.collectionOrder,
                  )
                  .map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      locale={locale}
                      area={area}
                    />
                  ))}
              </div>
            </section>
          ))}
      </CollectionNavigation>
      <section className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <ContactActions locale={locale} />
      </section>
    </>
  );
}

export function CasePage({
  project,
  locale,
  area,
}: {
  project: Project;
  locale: Locale;
  area?: Area;
}) {
  const text = copy[locale];
  const source = printSource(project, siteContent.source.reviewedOn);
  const metric = project.metric;
  const remainingCostPercent = metric
    ? (metric.after / metric.before) * 100
    : 0;
  const related = project.related
    .map(findProject)
    .filter((project): project is Project => !!project);
  const contents = [
    "problem",
    "contribution",
    "built",
    "decisions",
    "results",
    "artifacts",
    "stack",
    "reflection",
  ] as const;

  return (
    <article data-case={project.slug}>
      <header className={styles.caseHero} id="purpose">
        <div>
          <p className={styles.breadcrumb}>
            <Link href={route(locale)}>{text.home}</Link> /{" "}
            <Link
              href={`${route(locale, "projects")}${area ? `?area=${area}` : ""}`}
            >
              {text.projects}
            </Link>
          </p>
          <h1>{project.title[locale]}</h1>
          <p className={styles.lead}>{project.summary[locale]}</p>
          <dl className={styles.facts}>
            <div>
              <dt>{text.contribution}</dt>
              <dd>{project.contribution[locale]}</dd>
            </div>
            <div>
              <dt>{locale === "en" ? "Context" : "開発の背景"}</dt>
              <dd>{project.association[locale]}</dd>
            </div>
            <div>
              <dt>{locale === "en" ? "Use stage" : "取り組みの段階"}</dt>
              <dd>{project.stage[locale]}</dd>
            </div>
            <div>
              <dt>{text.updated}</dt>
              <dd>{siteContent.source.reviewedOn}</dd>
            </div>
          </dl>
          {metric && (
            <Link className={styles.textLink} href="#results">
              {locale === "en"
                ? `About ${metric.percent}% lower annual infrastructure cost`
                : `年間インフラ費を約${metric.percent}%削減`}
            </Link>
          )}
        </div>
        <Print
          source={source}
          language={locale}
          interactive
          caption={interpretations[source.kind][locale]}
        />
      </header>
      <nav className={styles.caseContents} aria-label={text.contents}>
        {contents.map((section) => (
          <a href={`#${section}`} key={section}>
            {text[section]}
          </a>
        ))}
      </nav>
      <Section id="problem" title={text.problem}>
        <p>{project.problem[locale]}</p>
      </Section>
      <Section id="contribution" title={text.contribution}>
        <p>
          {project.contribution[locale]}. {project.association[locale]}.
        </p>
        <p>{project.description[locale]}</p>
        <Todo item={project.todos.context} locale={locale} />
      </Section>
      <Section id="built" title={text.built}>
        <p>{project.summary[locale]}</p>
        <Mechanism project={project} kind={source.kind} language={locale} />
      </Section>
      <Section id="decisions" title={text.decisions}>
        <ul>
          {project.decisions[locale].map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
        <Todo item={project.todos.decisions} locale={locale} />
      </Section>
      <Section id="results" title={text.results}>
        {metric && (
          <figure className={styles.result}>
            <div>
              <div className={styles.resultValue}>~{metric.percent}%</div>
              <p>
                {locale === "en"
                  ? "lower annual infrastructure cost"
                  : "年間インフラ費の削減"}
              </p>
            </div>
            <div className={styles.costBars}>
              <div>
                {locale === "en" ? "Before" : "変更前"} · ~$
                {metric.before.toLocaleString("en-US")} /{" "}
                {locale === "en" ? "year" : "年"}
                <div className={styles.costBar} />
              </div>
              <div>
                {locale === "en" ? "After" : "変更後"} · ~$
                {metric.after.toLocaleString("en-US")} /{" "}
                {locale === "en" ? "year" : "年"}
                <div
                  className={`${styles.costBar} ${styles.costBarAfter}`}
                  style={{ width: `${remainingCostPercent}%` }}
                />
              </div>
            </div>
          </figure>
        )}
        <p>{project.results[locale]}</p>
        {project.slug === "subsidy-search-pilot" && (
          <h3 id="evaluation">{text.evaluation}</h3>
        )}
        <Todo item={project.todos.evidence} locale={locale} />
      </Section>
      <Section id="artifacts" title={text.artifacts}>
        <p>
          {locale === "en"
            ? "The workflow above explains the system from the reviewed public description."
            : "上の図は、確認済みの公開説明に基づいて仕組みの流れを表しています。"}
        </p>
        <a className={styles.textLink} href="#built">
          {locale === "en" ? "Inspect the workflow" : "仕組みの流れを見る"}
        </a>
        <Todo item={project.todos.artifacts} locale={locale} />
      </Section>
      <Section id="stack" title={text.stack}>
        <dl className={styles.stack}>
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
      <section id="related">
        <div className={styles.sectionHeader}>
          <h2>{text.related}</h2>
          <Link className={styles.textLink} href={route(locale, "projects")}>
            {text.allProjects}
          </Link>
        </div>
        <div className={styles.collection}>
          {related.map((project) => (
            <ProjectCard project={project} locale={locale} key={project.id} />
          ))}
        </div>
      </section>
      <section className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <ContactActions locale={locale} project={project} />
      </section>
      <CollectionReturn locale={locale} area={area} />
    </article>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const source = printSource(
    featuredProjects[0],
    siteContent.source.reviewedOn,
  );
  return (
    <>
      <header className={styles.aboutHero}>
        <div>
          <h1>{text.aboutIntro}</h1>
          <p>{siteContent.about[locale][0]}</p>
        </div>
        <Print
          source={source}
          language={locale}
          caption={
            locale === "en"
              ? "A repeatable print, made from the speech project’s identity and stack."
              : "音声ツールの情報と使用技術から、同じ形を再現できる図案を描きました。"
          }
        />
      </header>
      <Section title={text.approach}>
        <p>{text.approachText}</p>
        <ContactActions locale={locale} />
      </Section>
      <Section
        title={locale === "en" ? "What I work on" : "取り組んでいること"}
      >
        <p>{siteContent.about[locale][1]}</p>
        <p>{siteContent.about[locale][4]}</p>
      </Section>
      <Section title={text.career}>
        <Career locale={locale} />
      </Section>
      <Section title={text.skills}>
        <Skills locale={locale} />
        <div className={styles.heroLinks}>
          {featuredProjects.slice(0, 3).map((project) => (
            <Link
              className={styles.textLink}
              key={project.id}
              href={route(locale, `projects/${project.slug}`)}
            >
              {project.title[locale]}
            </Link>
          ))}
        </div>
      </Section>
      <Section title={text.education}>
        <Education locale={locale} />
      </Section>
      <Section title={text.portrait}>
        <Todo item={siteContent.todos.portrait} locale={locale} />
      </Section>
      <section className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <ContactActions locale={locale} />
      </section>
    </>
  );
}

export function ResumePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <>
      <header className={styles.hero}>
        <div>
          <h1>{siteContent.identity.name[locale]}</h1>
          <p className={styles.resumeRole}>
            {siteContent.identity.role[locale]} ·{" "}
            {siteContent.identity.location[locale]}
          </p>
        </div>
        <div>
          <p>{siteContent.introduction[locale]}</p>
          <a
            className={styles.textLink}
            href={`mailto:${siteContent.identity.email}`}
          >
            {siteContent.identity.email}
          </a>
        </div>
      </header>
      <Section title={text.summary}>
        <p>{siteContent.about[locale][0]}</p>
        <p>
          {text.updated}: {siteContent.source.reviewedOn}
        </p>
        <Todo item={siteContent.todos[`resume-${locale}`]} locale={locale} />
      </Section>
      <Section title={text.career}>
        <Career locale={locale} full />
      </Section>
      <section>
        <div className={styles.sectionHeader}>
          <h2>{text.selected}</h2>
        </div>
        <div className={styles.projectList}>
          {featuredProjects.map((project) => (
            <article className={styles.projectRow} key={project.id}>
              <h3>
                <Link href={route(locale, `projects/${project.slug}`)}>
                  {project.title[locale]}
                </Link>
              </h3>
              <p>{project.summary[locale]}</p>
              <p className={styles.rowStack}>
                {project.stack.map((technology) => technology.name).join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>
      <Section title={text.skills}>
        <Skills locale={locale} />
      </Section>
      <Section title={text.education}>
        <Education locale={locale} />
      </Section>
      <section className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <ContactActions locale={locale} />
      </section>
    </>
  );
}

export function WorkPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const examples = [
    {
      slug: "snap-photobooth",
      title: {
        en: "Web applications and interfaces",
        ja: "Webアプリ・画面設計",
      },
      description: {
        en: "An interface, its service and the workflow that connects them.",
        ja: "画面とサービス、使う人の業務をつなぐ仕組み。",
      },
    },
    {
      slug: "salon-data-platform",
      title: {
        en: "Data integration and reporting",
        ja: "データ連携・レポート",
      },
      description: {
        en: "A data import, validation step or report that makes a workflow easier to run.",
        ja: "データの取り込み、入力の検証、業務に必要なレポート。",
      },
    },
    {
      slug: "local-speech",
      title: { en: "AI-assisted workflow tools", ja: "AIを活用する業務ツール" },
      description: {
        en: "A small prototype that connects an AI capability to a practical task.",
        ja: "AIの機能を、具体的な作業につなげる小さなプロトタイプ。",
      },
    },
  ];
  const process =
    locale === "en"
      ? [
          "Understand the workflow",
          "Agree a small scope and success criteria",
          "Build and review",
          "Hand over and improve",
        ]
      : [
          "現在の業務を理解する",
          "小さな範囲と確認する成果を決める",
          "つくって一緒に確かめる",
          "引き継ぎ、改善する",
        ];
  return (
    <>
      <header className={styles.hero}>
        <h1>{text.work}</h1>
        <p>{text.workIntro}</p>
      </header>
      <section className={styles.projectList}>
        {examples.map((example) => {
          const project = findProject(example.slug)!;
          return (
            <article className={styles.projectRow} key={example.slug}>
              <h3>{example.title[locale]}</h3>
              <p>{example.description[locale]}</p>
              <Link
                className={styles.textLink}
                href={route(locale, `projects/${project.slug}`)}
              >
                {project.title[locale]}
              </Link>
            </article>
          );
        })}
      </section>
      <Section title={text.process}>
        <p>{text.processIntro}</p>
        <ol>
          {process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
      <Section title={text.terms}>
        <Todo item={siteContent.todos.engagement} locale={locale} />
        <Todo item={siteContent.todos.hiring} locale={locale} />
      </Section>
      <section className={styles.introBand}>
        <h2>{text.contactIntro}</h2>
        <ContactActions locale={locale} />
      </section>
    </>
  );
}

export function ContactPage({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const text = copy[locale];
  const email = siteContent.identity.email;
  const projectContext = project ? `\n\n${project.title[locale]}` : "";
  const hiringSubject =
    locale === "en" ? "Engineering role inquiry" : "エンジニア採用のご相談";
  const projectSubject =
    locale === "en" ? "Project inquiry" : "プロジェクトのご相談";
  const compose = (subject: string, prompt: string) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prompt)}`;
  return (
    <>
      <header className={styles.contactHero}>
        <h1>{text.contactIntro}</h1>
        <p>
          {siteContent.identity.name[locale]} ·{" "}
          {siteContent.identity.location[locale]}
        </p>
        <a className={styles.email} href={`mailto:${email}`}>
          {email}
        </a>
      </header>
      <Section id="hiring" title={text.hiring}>
        <p>{text.hiringPrompt}</p>
        <a
          className={styles.textLink}
          href={compose(hiringSubject, text.hiringPrompt)}
        >
          {text.email}
        </a>
        <Todo item={siteContent.todos.hiring} locale={locale} />
      </Section>
      <Section id="projects" title={text.discuss}>
        <p>{text.projectPrompt}</p>
        {project && (
          <p>
            {locale === "en" ? "Related project" : "関連するプロジェクト"}:{" "}
            <Link href={route(locale, `projects/${project.slug}`)}>
              {project.title[locale]}
            </Link>
          </p>
        )}
        <a
          className={styles.textLink}
          href={compose(projectSubject, text.projectPrompt + projectContext)}
        >
          {text.email}
        </a>
        <Todo item={siteContent.todos.engagement} locale={locale} />
      </Section>
      <Section title={text.practical}>
        <Todo item={siteContent.todos.languages} locale={locale} />
        <Todo item={siteContent.todos.identity} locale={locale} />
        <Todo item={siteContent.todos.domain} locale={locale} />
      </Section>
      <div className={styles.sectionHeader}>
        <h2>{text.links}</h2>
      </div>
      <div className={styles.contactLinks}>
        {siteContent.links.map((link) => (
          <a href={link.url} key={link.label}>
            <strong>{link.label}</strong>
            <span>
              {locale === "en" ? "View profile" : "プロフィールを見る"}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
