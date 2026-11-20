import Link from "next/link";
import type { ReactNode } from "react";
import { areas, copy } from "@/app/content/copy";
import type { Area, Locale, Project } from "@/app/content/model";
import { featuredProjects, findProject, siteContent } from "@/lib/content";
import { Todo } from "@/components/content";
import { ThreadExplorer, WorkflowExplorer } from "./interactions";
import { Weave } from "./weave";
import styles from "./thread.module.css";

export const threadRoot = "/lab/full/thread";

export function ThreadShell({
  locale,
  path,
  query,
  children,
}: {
  locale: Locale;
  path: string;
  query: string;
  children: ReactNode;
}) {
  const text = copy[locale];
  const otherLocale = locale === "en" ? "ja" : "en";
  const navigation = [
    { route: "projects", title: text.projects },
    { route: "about", title: text.about },
    { route: "contact", title: text.contact },
  ];

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#thread-content">
        {text.skip}
      </a>
      <header className={styles.header}>
        <Link className={styles.brand} href={`${threadRoot}/${locale}`}>
          <span className={styles.brandKnot} aria-hidden="true">
            ⋈
          </span>
          <span>
            {siteContent.identity.name[locale]}
            <small>{siteContent.identity.role[locale]}</small>
          </span>
        </Link>
        <nav
          aria-label={
            locale === "en" ? "Main navigation" : "メインナビゲーション"
          }
        >
          {navigation.map(({ route, title }) => (
            <Link
              key={route}
              href={`${threadRoot}/${locale}/${route}`}
              aria-current={path.startsWith(route) ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
        <Link
          className={styles.language}
          href={`${threadRoot}/${otherLocale}${path ? `/${path}` : ""}${query}`}
          hrefLang={otherLocale}
          lang={otherLocale}
          aria-label={locale === "en" ? "日本語で読む" : "Read in English"}
        >
          {locale === "en" ? "日本語" : "English"}
        </Link>
      </header>
      <main id="thread-content" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Link className={styles.footerName} href={`${threadRoot}/${locale}`}>
          {siteContent.identity.name[locale]}
        </Link>
        <p>
          {siteContent.identity.location[locale]}
          <br />
          {locale === "en"
            ? "Useful things, thoughtfully connected."
            : "役割を整理し、使いやすくつなぐ。"}
        </p>
        <nav aria-label={locale === "en" ? "More pages" : "関連ページ"}>
          <Link href={`${threadRoot}/${locale}/resume`}>{text.resume}</Link>
          <Link href={`${threadRoot}/${locale}/work-together`}>
            {text.work}
          </Link>
          <Link href={`${threadRoot}/${locale}/contact`}>{text.contact}</Link>
        </nav>
      </footer>
    </div>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.pageIntro}>
      <h1>{title}</h1>
      {children && <div>{children}</div>}
    </header>
  );
}

function ContactInvitation({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  return (
    <section className={styles.invitation}>
      <span className={styles.invitationKnot} aria-hidden="true">
        ⋈
      </span>
      <div>
        <h2>
          {locale === "en" ? "What could we connect?" : "次は、何をつなごう。"}
        </h2>
        <p>{copy[locale].contactIntro}</p>
      </div>
      <Link
        className={styles.underlink}
        href={`${threadRoot}/${locale}/contact${project ? `?project=${project.slug}#projects` : ""}`}
      >
        {project ? copy[locale].discuss : copy[locale].contact}
      </Link>
    </section>
  );
}

function Career({ locale, full = false }: { locale: Locale; full?: boolean }) {
  return (
    <div className={styles.career}>
      {siteContent.experience.map((job) => (
        <article key={job.id}>
          <div>
            <h3>{job.company}</h3>
            <p>{job.period[locale]}</p>
          </div>
          <div>
            <h4>{job.title[locale]}</h4>
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

function Skills({ locale }: { locale: Locale }) {
  return (
    <div className={styles.skills}>
      {siteContent.skills.map((group) => (
        <article key={group.title.en}>
          <h3>{group.title[locale]}</h3>
          <p>{group.items[locale].join(" / ")}</p>
        </article>
      ))}
    </div>
  );
}

function ProjectRow({
  project,
  locale,
  area,
  compact = false,
}: {
  project: Project;
  locale: Locale;
  area?: Area;
  compact?: boolean;
}) {
  const projectIndex = siteContent.projects.findIndex(
    (item) => item.id === project.id,
  );
  const href = `${threadRoot}/${locale}/projects/${project.slug}${area ? `?area=${area}` : ""}`;

  return (
    <article
      className={`${styles.projectRow} ${compact ? styles.compactRow : ""}`}
      data-project={project.slug}
    >
      <Link
        href={href}
        className={styles.projectArt}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Weave seed={projectIndex} small />
      </Link>
      <div className={styles.projectInfo}>
        <p className={styles.context}>{project.association[locale]}</p>
        <h3>
          <Link href={href}>{project.title[locale]}</Link>
        </h3>
        <p>{project.summary[locale]}</p>
        <p className={styles.stage}>{project.stage[locale]}</p>
        <Link className={styles.underlink} href={href}>
          {copy[locale].readCase}
        </Link>
      </div>
    </article>
  );
}

export function ThreadHome({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <>
      <header className={styles.homeIntro}>
        <h1>
          {locale === "en" ? (
            <>
              Follow
              <br />
              the thread.
            </>
          ) : (
            <>
              つながりを、
              <br />
              たどる。
            </>
          )}
        </h1>
        <div>
          <p className={styles.introduction}>
            {siteContent.introduction[locale]}
          </p>
          <p className={styles.context}>{text.current}</p>
          <div className={styles.actions}>
            <Link
              className={styles.solidLink}
              href={`${threadRoot}/${locale}/projects`}
            >
              {text.viewProjects}
            </Link>
            <Link
              className={styles.underlink}
              href={`${threadRoot}/${locale}/resume`}
            >
              {text.viewResume}
            </Link>
          </div>
        </div>
      </header>
      <ThreadExplorer
        projects={featuredProjects.map(
          ({ slug, title, summary, workflow }) => ({
            slug,
            title,
            summary,
            workflow,
          }),
        )}
        locale={locale}
      />
      <section className={styles.selected} aria-labelledby="selected-title">
        <div className={styles.sectionHeading}>
          <h2 id="selected-title">{text.selected}</h2>
          <Link
            className={styles.underlink}
            href={`${threadRoot}/${locale}/projects`}
          >
            {text.allProjects}
          </Link>
        </div>
        {featuredProjects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            locale={locale}
            compact
          />
        ))}
      </section>
      <Section title={text.approach}>
        <p className={styles.lead}>{text.approachText}</p>
        <Link
          className={styles.underlink}
          href={`${threadRoot}/${locale}/about`}
        >
          {text.about}
        </Link>
      </Section>
      <Section title={text.career}>
        <Career locale={locale} />
        <Link
          className={styles.underlink}
          href={`${threadRoot}/${locale}/resume`}
        >
          {text.viewResume}
        </Link>
      </Section>
      <ContactInvitation locale={locale} />
    </>
  );
}

export function ThreadCollection({
  locale,
  area,
}: {
  locale: Locale;
  area?: Area;
}) {
  const text = copy[locale];
  const visibleAreas = area ? areas.filter((item) => item.id === area) : areas;
  const projects = siteContent.projects.filter(
    (project) => !area || project.area === area,
  );

  return (
    <>
      <PageIntro
        title={
          locale === "en"
            ? "A few connected things."
            : "つくったもの、\nそのつながり。"
        }
      >
        <p>{text.collectionIntro}</p>
      </PageIntro>
      <nav className={styles.filters} aria-label={text.filter}>
        <Link
          href={`${threadRoot}/${locale}/projects`}
          aria-current={!area ? "page" : undefined}
        >
          {text.all}
        </Link>
        {areas.map((item) => (
          <Link
            key={item.id}
            href={`${threadRoot}/${locale}/projects?area=${item.id}`}
            aria-current={area === item.id ? "page" : undefined}
          >
            {item.title[locale]}
          </Link>
        ))}
        <span>
          {projects.length} {text.count}
        </span>
      </nav>
      {visibleAreas.map((item) => (
        <section key={item.id} className={styles.collectionGroup}>
          <h2>{item.title[locale]}</h2>
          {projects
            .filter((project) => project.area === item.id)
            .sort((a, b) => a.collectionOrder - b.collectionOrder)
            .map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                locale={locale}
                area={area}
              />
            ))}
        </section>
      ))}
      <ContactInvitation locale={locale} />
    </>
  );
}

function ResultComparison({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  if (!project.metric) return null;
  const metric = project.metric;
  const formatCost = (amount: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-US" : "ja-JP", {
      style: "currency",
      currency: metric.currency,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <figure className={styles.metric} aria-label={project.results[locale]}>
      <div>
        <strong>≈{metric.percent}%</strong>
        <p>
          {locale === "en"
            ? "lower annual infrastructure cost"
            : "年間インフラ費を削減"}
        </p>
      </div>
      <div className={styles.costBars}>
        <div>
          <span>
            {locale === "en" ? "Before" : "変更前"}{" "}
            <b>≈{formatCost(metric.before)}</b>
          </span>
          <i style={{ width: "100%" }} />
        </div>
        <div>
          <span>
            {locale === "en" ? "After" : "変更後"}{" "}
            <b>≈{formatCost(metric.after)}</b>
          </span>
          <i style={{ width: `${(metric.after / metric.before) * 100}%` }} />
        </div>
      </div>
      <figcaption>
        {locale === "en"
          ? "Approximate annual infrastructure cost, Generosity event platform. Owner-confirmed comparison."
          : "Generosityのイベント基盤。本人が確認した年間インフラ費の概算比較。"}
      </figcaption>
    </figure>
  );
}

export function ThreadCase({
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
    "built",
    "decisions",
    "results",
    "artifacts",
    "stack",
    "reflection",
  ] as const;
  const relatedProjects = project.related.flatMap((slug) => {
    const item = findProject(slug);
    return item ? [item] : [];
  });

  return (
    <article className={styles.caseStudy}>
      <nav
        className={styles.breadcrumb}
        aria-label={locale === "en" ? "Breadcrumbs" : "現在の位置"}
      >
        <Link
          href={`${threadRoot}/${locale}/projects${area ? `?area=${area}` : ""}`}
        >
          {text.projects}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{project.association[locale]}</span>
      </nav>
      <header className={styles.caseIntro}>
        <p className={styles.stage}>{project.stage[locale]}</p>
        <h1>{project.title[locale]}</h1>
        <p className={styles.caseSummary}>{project.summary[locale]}</p>
        {project.metric && (
          <p className={styles.resultLead}>
            <a href="#results">
              {locale === "en"
                ? `About ${project.metric.percent}% lower annual infrastructure cost`
                : `年間インフラ費を約${project.metric.percent}%削減`}
            </a>
          </p>
        )}
        <dl className={styles.role}>
          <div>
            <dt>{locale === "en" ? "Context" : "所属・背景"}</dt>
            <dd>{project.association[locale]}</dd>
          </div>
          <div>
            <dt>{text.contribution}</dt>
            <dd>{project.contribution[locale]}</dd>
          </div>
        </dl>
      </header>
      <section id="workflow">
        <WorkflowExplorer
          project={{ workflow: project.workflow, decisions: project.decisions }}
          locale={locale}
          seed={siteContent.projects.findIndex(
            (item) => item.id === project.id,
          )}
        />
      </section>
      <div className={styles.caseLayout}>
        <nav className={styles.contents} aria-label={text.contents}>
          <p>{text.contents}</p>
          {sections.map((section) => (
            <a key={section} href={`#${section}`}>
              {text[section]}
            </a>
          ))}
        </nav>
        <div className={styles.caseBody}>
          <Section id="problem" title={text.problem}>
            <p className={styles.lead}>{project.problem[locale]}</p>
            <Todo item={project.todos.context} locale={locale} />
          </Section>
          <Section id="built" title={text.built}>
            <p>{project.description[locale]}</p>
            <ol className={styles.workflowList}>
              {project.workflow[locale].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Section>
          <Section id="decisions" title={text.decisions}>
            {project.decisions[locale].map((decision) => (
              <p key={decision}>{decision}</p>
            ))}
            <Todo item={project.todos.decisions} locale={locale} />
          </Section>
          <Section id="results" title={text.results}>
            <ResultComparison project={project} locale={locale} />
            <p>{project.results[locale]}</p>
            {project.slug === "subsidy-search-pilot" && (
              <h3>{text.evaluation}</h3>
            )}
            <Todo item={project.todos.evidence} locale={locale} />
          </Section>
          <Section id="artifacts" title={text.artifacts}>
            <p>
              {locale === "en"
                ? "Explore the workflow drawing above to follow the system’s responsibilities."
                : "上の図から、各工程の役割とつながりをたどれます。"}
            </p>
            <a className={styles.underlink} href="#workflow">
              {locale === "en" ? "Inspect the workflow" : "仕組みの図を見る"}
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
        </div>
      </div>
      <section className={styles.related}>
        <h2>{text.related}</h2>
        <div>
          {relatedProjects.slice(0, 2).map((item) => (
            <ProjectRow key={item.id} project={item} locale={locale} compact />
          ))}
        </div>
      </section>
      <ContactInvitation locale={locale} project={project} />
      <Link
        className={styles.underlink}
        href={`${threadRoot}/${locale}/projects${area ? `?area=${area}` : ""}`}
      >
        {text.back}
      </Link>
    </article>
  );
}

export function ThreadAbout({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const salon = findProject("salon-data-platform")!;

  return (
    <>
      <PageIntro
        title={
          locale === "en"
            ? "Making things\nmake sense."
            : "仕組みを整理し、\nわかりやすく。"
        }
      >
        <p>{text.aboutIntro}</p>
        <p>{text.current}</p>
      </PageIntro>
      <Section title={text.approach}>
        <p className={styles.lead}>{text.approachText}</p>
        <div className={styles.aboutWeave}>
          <Weave seed={2} />
        </div>
        <ol className={styles.workflowList}>
          {salon.workflow[locale].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <Link
          className={styles.underlink}
          href={`${threadRoot}/${locale}/projects/${salon.slug}`}
        >
          {text.readCase}
        </Link>
      </Section>
      <Section title={text.career}>
        {siteContent.about[locale].slice(1, 4).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link
          className={styles.underlink}
          href={`${threadRoot}/${locale}/resume`}
        >
          {text.viewResume}
        </Link>
      </Section>
      <Section title={text.skills}>
        <Skills locale={locale} />
      </Section>
      <Section title={text.education}>
        {siteContent.education.map((item) => (
          <div key={item.school.en}>
            <h3>{item.school[locale]}</h3>
            <p>{item.description[locale]}</p>
          </div>
        ))}
      </Section>
      <Section title={text.portrait}>
        <Todo item={siteContent.todos.portrait} locale={locale} />
      </Section>
      <ContactInvitation locale={locale} />
    </>
  );
}

export function ThreadResume({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <>
      <PageIntro title={text.resume}>
        <p>
          {siteContent.identity.name[locale]}
          <br />
          {text.current}
        </p>
        <a
          className={styles.underlink}
          href={`mailto:${siteContent.identity.email}`}
        >
          {siteContent.identity.email}
        </a>
      </PageIntro>
      <Section title={text.summary}>
        <p className={styles.lead}>{siteContent.about[locale][0]}</p>
        <p>{siteContent.about[locale][4]}</p>
      </Section>
      <Section title={text.career}>
        <Career locale={locale} full />
      </Section>
      <Section title={text.selected}>
        <div className={styles.resumeProjects}>
          {featuredProjects.map((project) => (
            <article key={project.id}>
              <h3>
                <Link href={`${threadRoot}/${locale}/projects/${project.slug}`}>
                  {project.title[locale]}
                </Link>
              </h3>
              <p>{project.summary[locale]}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title={text.skills}>
        <Skills locale={locale} />
      </Section>
      <Section title={text.education}>
        {siteContent.education.map((item) => (
          <div key={item.school.en}>
            <h3>{item.school[locale]}</h3>
            <p>{item.description[locale]}</p>
          </div>
        ))}
      </Section>
      <Section title={text.pdf}>
        <p>{text.pdfPending}</p>
        <Todo item={siteContent.todos[`resume-${locale}`]} locale={locale} />
        <p>
          {text.updated}: {siteContent.source.reviewedOn}
        </p>
      </Section>
      <ContactInvitation locale={locale} />
    </>
  );
}

export function ThreadWorkTogether({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const examples = [
    "salon-data-platform",
    "local-speech",
    "event-platform",
  ].map((slug) => findProject(slug)!);
  const process =
    locale === "en"
      ? [
          "Understand the current workflow and problem.",
          "Agree a small scope and success criteria.",
          "Build a working version and review it together.",
          "Hand over the implementation and agree improvements.",
        ]
      : [
          "現在の業務と課題を理解する。",
          "小さな範囲と、成功の判断基準を決める。",
          "動くものをつくり、一緒に確認する。",
          "実装を引き継ぎ、改善する点を決める。",
        ];

  return (
    <>
      <PageIntro
        title={
          locale === "en"
            ? "Let’s connect\nthe pieces."
            : "業務のつながりを、\n一緒につくる。"
        }
      >
        <p>{text.workIntro}</p>
        <Link
          className={styles.solidLink}
          href={`${threadRoot}/${locale}/contact#projects`}
        >
          {text.discuss}
        </Link>
      </PageIntro>
      <section className={styles.selected}>
        <h2>{text.workExamples}</h2>
        {examples.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            locale={locale}
            compact
          />
        ))}
      </section>
      <Section title={text.process}>
        <p>{text.processIntro}</p>
        <ol className={styles.process}>
          {process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
      <Section title={text.terms}>
        <Todo item={siteContent.todos.engagement} locale={locale} />
      </Section>
      <ContactInvitation locale={locale} />
    </>
  );
}

export function ThreadContact({
  locale,
  project,
}: {
  locale: Locale;
  project?: Project;
}) {
  const text = copy[locale];
  const emailHref = (kind: "hiring" | "projects") => {
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
  };

  return (
    <>
      <PageIntro
        title={
          locale === "en"
            ? "Start a\nconversation."
            : "お話を、\n聞かせてください。"
        }
      >
        <p>{text.contactIntro}</p>
        <p>{siteContent.identity.location[locale]}</p>
      </PageIntro>
      <div className={styles.contactThread} aria-hidden="true">
        <Weave small seed={1} />
      </div>
      <a
        className={styles.emailAddress}
        href={`mailto:${siteContent.identity.email}`}
      >
        {siteContent.identity.email}
      </a>
      <div className={styles.contactPaths}>
        <section id="hiring">
          <h2>{text.hiring}</h2>
          <p>{text.hiringPrompt}</p>
          <a className={styles.solidLink} href={emailHref("hiring")}>
            {text.email}
          </a>
          <Link
            className={styles.underlink}
            href={`${threadRoot}/${locale}/resume`}
          >
            {text.viewResume}
          </Link>
        </section>
        <section id="projects">
          <h2>{text.discuss}</h2>
          <p>{text.projectPrompt}</p>
          {project && (
            <p>
              <Link href={`${threadRoot}/${locale}/projects/${project.slug}`}>
                {project.title[locale]}
              </Link>
            </p>
          )}
          <a className={styles.solidLink} href={emailHref("projects")}>
            {text.email}
          </a>
          <Link
            className={styles.underlink}
            href={`${threadRoot}/${locale}/work-together`}
          >
            {text.work}
          </Link>
        </section>
      </div>
      <Section title={text.practical}>
        <Todo item={siteContent.todos.hiring} locale={locale} />
        <Todo item={siteContent.todos.languages} locale={locale} />
        <Todo item={siteContent.todos.engagement} locale={locale} />
      </Section>
      <Section title={text.links}>
        <div className={styles.professionalLinks}>
          {siteContent.links.map((link) => (
            <a className={styles.underlink} key={link.url} href={link.url}>
              {link.label}
            </a>
          ))}
        </div>
        <Todo item={siteContent.todos.identity} locale={locale} />
        <Todo item={siteContent.todos.domain} locale={locale} />
      </Section>
    </>
  );
}
