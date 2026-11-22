import Link from "next/link";
import type { ReactNode } from "react";
import {
  PortfolioCollectionMemory,
  PortfolioCollectionReturn,
  PortfolioLanguageLink,
  ProjectSheets,
  RoomDrawing,
  SystemPlan,
} from "./interactions";
import {
  featuredProjects,
  profile,
  projects,
  type PortfolioProject,
  type Locale,
  type Area,
  type Localized,
} from "./content";
import styles from "./portfolio.module.css";
import { Artwork } from "./artwork";
import Print from "./print";
import {
  collectionQuery,
  printSource,
  interpretations,
  route,
} from "./routing";
import { problemGroups, problemTypes, type ProblemType } from "./problems";
import { paletteVariables } from "./palette";

const text = (locale: Locale, en: string, ja: string) =>
  locale === "en" ? en : ja;
const projectRoute = (locale: Locale, slug: string) =>
  route(locale, `/projects/${slug}`);

export function PortfolioShell({
  locale,
  path,
  area,
  problem,
  children,
}: {
  locale: Locale;
  path: string;
  area?: Area;
  problem?: ProblemType;
  children: ReactNode;
}) {
  const navigation = [
    ["/projects", text(locale, "Projects", "プロジェクト")],
    ["/about", text(locale, "About", "自己紹介")],
    ["/contact", text(locale, "Contact", "連絡先")],
    ["/resume", text(locale, "Resume", "経歴")],
  ];

  return (
    <div className={styles.page} style={paletteVariables} lang={locale}>
      <a className={styles.skip} href="#main">
        {text(locale, "Skip to content", "本文へ移動")}
      </a>
      <header className={styles.header}>
        <Link className={styles.brand} href={route(locale)}>
          <strong>{profile.identity.name[locale]}</strong>
          <span>
            {text(
              locale,
              "Software, given structure.",
              "仕組みを、わかりやすく。",
            )}
          </span>
        </Link>
        <nav
          className={styles.navigation}
          aria-label={text(locale, "Main navigation", "メインナビゲーション")}
        >
          {navigation.map(([href, label]) =>
            href === "/projects" ? (
              <PortfolioCollectionReturn
                key={href}
                locale={locale}
                href={`${route(locale, href)}${collectionQuery({ area, problem })}`}
                className=""
                isCurrent={path.startsWith("/projects")}
              >
                {label}
              </PortfolioCollectionReturn>
            ) : (
              <Link
                key={href}
                href={route(locale, href)}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ),
          )}
        </nav>
        <nav
          className={styles.languages}
          aria-label={text(locale, "Language", "言語")}
        >
          {(["en", "ja"] as const).map((language) => (
            <PortfolioLanguageLink
              key={language}
              href={`${route(language, path)}${collectionQuery({ area, problem })}`}
              locale={language}
              isCurrent={language === locale}
            >
              {language === "en" ? "English" : "日本語"}
            </PortfolioLanguageLink>
          ))}
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className={styles.footer}>
        <p>
          {profile.identity.name[locale]} · {profile.identity.location[locale]}
        </p>
        <Link href={route(locale, "/work-together")}>
          {text(locale, "Work together", "開発のご相談")}
        </Link>
        <Link href={route(locale, "/resume")}>
          {text(locale, "Resume", "経歴")}
        </Link>
        <a href="#main">{text(locale, "Back to top", "先頭へ戻る")}</a>
      </footer>
    </div>
  );
}

function Paragraphs({
  values,
  locale,
}: {
  values: Localized[];
  locale: Locale;
}) {
  return (
    <>
      {values.map((value, index) => (
        <p key={index}>{value[locale]}</p>
      ))}
    </>
  );
}

function MissingEvidence({
  locale,
  item,
}: {
  locale: Locale;
  item: { id: string; text: Localized };
}) {
  return (
    <aside className={styles.placeholder} data-todo={item.id}>
      <strong>TODO [{item.id}]:</strong> {item.text[locale]}
    </aside>
  );
}

function ProjectEntry({
  project,
  locale,
  area,
  problem,
}: {
  project: PortfolioProject;
  locale: Locale;
  area?: Area;
  problem?: ProblemType;
}) {
  const href = `${projectRoute(locale, project.slug)}${collectionQuery({ area, problem })}`;
  return (
    <article
      className={styles.projectEntry}
      data-project={project.slug}
      data-problem={project.framing.type}
    >
      <div className={styles.entryHeading}>
        <h3>
          <Link href={href}>{project.framing.heading[locale]}</Link>
        </h3>
        <p className={styles.projectTitle}>{project.title[locale]}</p>
      </div>
      <Link
        href={href}
        className={styles.projectPlan}
        aria-label={text(
          locale,
          `Read ${project.title.en}`,
          `${project.title.ja}の事例を読む`,
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Artwork source={printSource(project, profile.reviewedOn)} />
      </Link>
      <div className={styles.entryNarrative}>
        <dl className={styles.projectOutcome}>
          <div>
            <dt>{text(locale, "Built", "つくったもの")}</dt>
            <dd>{project.summary[locale]}</dd>
          </div>
          <div>
            <dt>{text(locale, "Result", "結果")}</dt>
            <dd>
              {project.costMetric ? (
                <CostResult project={project} locale={locale} />
              ) : (
                project.results[0][locale]
              )}
            </dd>
          </div>
        </dl>
        <p className={styles.projectStage}>{project.stage[locale]}</p>
        <Link className={styles.textLink} href={href}>
          {text(locale, "Read the case study", "事例を読む")}
        </Link>
      </div>
    </article>
  );
}

function CostResult({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const metric = project.costMetric;
  if (!metric) return null;
  const formatCost = (cost: number) =>
    locale === "ja"
      ? `約${cost / 10000}万ドル`
      : `about $${cost.toLocaleString("en-US")}`;
  return (
    <span className={styles.costResult}>
      <strong>
        <span className={styles.costValue}>
          {formatCost(metric.before)} <span aria-hidden="true">↘</span>
        </span>
        <span className={styles.visuallyHidden}>
          {text(locale, "to", "から")}
        </span>
        <span className={styles.costValue}>{formatCost(metric.after)}</span>
      </strong>
      <span>
        {text(
          locale,
          `Annual infrastructure cost, approximately ${metric.percent}% lower.`,
          `年間インフラ費を約${metric.percent}%削減。`,
        )}
      </span>
    </span>
  );
}

function ContactBand({ locale, slug }: { locale: Locale; slug?: string }) {
  return (
    <section className={styles.contactBand}>
      <h2>
        {text(locale, "A useful place to begin.", "次の仕組みを、一緒に。")}
      </h2>
      <div>
        <p>
          {text(
            locale,
            "Tell me about the people, the workflow and the problem you want to solve. I welcome conversations about engineering roles and development projects.",
            "使う人や業務の流れ、解決したい課題をお聞かせください。エンジニア採用と開発プロジェクトのご相談をお待ちしています。",
          )}
        </p>
        <Link
          className={styles.textLink}
          href={`${route(locale, "/contact")}${slug ? `?project=${slug}#projects` : ""}`}
        >
          {text(locale, "Start a conversation", "相談する")}
        </Link>
      </div>
    </section>
  );
}

function CareerTimeline({
  locale,
  detailed = false,
}: {
  locale: Locale;
  detailed?: boolean;
}) {
  return (
    <div className={styles.timeline}>
      {profile.experience.map((item) => (
        <article key={item.company}>
          <p className={styles.smallText}>{item.period[locale]}</p>
          <div>
            <h3>{item.company}</h3>
            <p>{item.role[locale]}</p>
            {detailed ? (
              <ul>
                {item.bullets.map((bullet, index) => (
                  <li key={index}>{bullet[locale]}</li>
                ))}
              </ul>
            ) : (
              <p>{item.bullets[0]?.[locale]}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function PortfolioHome({ locale }: { locale: Locale }) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroIntro}>
          <h1>
            {locale === "en" ? (
              <>
                Systems,
                <br />
                in good
                <br />
                order.
              </>
            ) : (
              <>
                仕組みを、
                <br />
                わかる
                <br />
                形に。
              </>
            )}
          </h1>
          <p>
            {text(
              locale,
              "I organize complex workflows into software people can understand and use.",
              "複雑な業務を整理し、使う人にわかるソフトウェアを作ります。",
            )}
          </p>
          <p className={styles.identity}>{profile.current[locale]}</p>
          <div className={styles.heroLinks}>
            <Link
              className={styles.solidButton}
              href={route(locale, "/projects")}
            >
              {text(locale, "Explore the problems", "解決した課題を見る")}
            </Link>
            <Link className={styles.textLink} href={route(locale, "/resume")}>
              {text(locale, "View resume", "経歴を見る")}
            </Link>
          </div>
        </div>
        <ProjectSheets
          locale={locale}
          projects={featuredProjects.map((project) => ({
            slug: project.slug,
            title: project.title[locale],
            problem: project.framing.heading[locale],
            summary: project.summary[locale],
            result: project.results[0][locale],
            room: project.roomName[locale],
            href: projectRoute(locale, project.slug),
            source: printSource(project, profile.reviewedOn),
          }))}
        />
      </section>
      <section className={styles.section} id="projects">
        <div className={styles.sectionHeading}>
          <h2>
            {text(locale, "Problems I’ve worked through", "取り組んできた課題")}
          </h2>
          <Link className={styles.textLink} href={route(locale, "/projects")}>
            {text(locale, "All projects", "すべて見る")}
          </Link>
        </div>
        <div className={styles.selectedGrid}>
          {featuredProjects.map((project) => (
            <ProjectEntry
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.splitSection}`}
        id="about"
      >
        <h2>
          {text(
            locale,
            "Make the boundaries clear.",
            "役割を分けると、仕組みが見える。",
          )}
        </h2>
        <div className={styles.prose}>
          <p>
            {text(
              locale,
              "I enjoy organizing code and systems until each part has a clear job. A good boundary makes a workflow easier to understand, change and operate.",
              "コードやシステムを整理し、それぞれの役割を明確にすることが好きです。境界をはっきりさせることで、業務の流れを理解しやすく、変更や運用もしやすくなります。",
            )}
          </p>
          <p>
            {text(
              locale,
              "In the salon data platform, that means separating extraction, loading and orchestration. In the event platform, reservations and check-in become reusable features. The case studies show what those boundaries do.",
              "美容室向けのデータ基盤では抽出・取り込み・実行管理を分け、イベント基盤では予約とチェックインを再利用できる機能にしました。各事例で、その構造が何をするかを紹介しています。",
            )}
          </p>
          <figure className={styles.approachDrawing}>
            <RoomDrawing variant={2} />
          </figure>
          <Link className={styles.textLink} href={route(locale, "/about")}>
            {text(locale, "More about my work", "仕事への取り組みを読む")}
          </Link>
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.splitSection}`}
        id="experience"
      >
        <h2>{text(locale, "Experience, in context.", "これまでの仕事。")}</h2>
        <div>
          <CareerTimeline locale={locale} />
          <Link className={styles.textLink} href={route(locale, "/resume")}>
            {text(locale, "Read the full resume", "詳しい経歴を見る")}
          </Link>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function PortfolioCollection({
  locale,
  area,
  problem,
}: {
  locale: Locale;
  area?: Area;
  problem?: ProblemType;
}) {
  const selectedTypes = problem ? [problem] : problemTypes;
  const filteredProjects = projects.filter(
    (project) =>
      (!area || project.area === area) &&
      (!problem || project.framing.type === problem),
  );
  const groups = selectedTypes
    .map((type) => ({
      type,
      projects: filteredProjects.filter(
        (project) => project.framing.type === type,
      ),
    }))
    .filter((group) => group.projects.length);
  return (
    <>
      <PortfolioCollectionMemory
        key={collectionQuery({ area, problem }) || "all"}
        locale={locale}
      >
        <header className={`${styles.pageHeading} ${styles.collectionHeading}`}>
          <h1>
            {text(
              locale,
              "A problem.\nA way through.",
              "課題をひとつずつ、\n仕組みに。",
            )}
          </h1>
          <p>
            {text(
              locale,
              "A collection of problems I’ve worked on, what I built and what happened. Sort by the kind of problem you’re working through.",
              "取り組んだ課題、つくった仕組み、その結果をまとめました。気になる課題の種類から、事例を探せます。",
            )}
          </p>
        </header>
        <nav
          className={styles.filterBar}
          aria-label={text(
            locale,
            "Sort by problem type",
            "課題の種類で絞り込む",
          )}
        >
          <Link
            href={route(locale, "/projects")}
            aria-current={!area && !problem ? "true" : undefined}
          >
            <span>{text(locale, "All problems", "すべての課題")}</span>
            <span className={styles.filterCount}>{projects.length}</span>
          </Link>
          {problemTypes.map((type) => (
            <Link
              key={type}
              href={`${route(locale, "/projects")}${collectionQuery({ problem: type })}`}
              aria-current={problem === type ? "true" : undefined}
            >
              <span>{problemGroups[type].title[locale]}</span>
              <span className={styles.filterCount}>
                {
                  projects.filter((project) => project.framing.type === type)
                    .length
                }
              </span>
            </Link>
          ))}
        </nav>
        <div className={styles.collectionStatus}>
          <p role="status">
            {text(
              locale,
              `${filteredProjects.length} case studies${problem ? ` · ${problemGroups[problem].title.en}` : ` across ${problemTypes.length} kinds of problem`}`,
              `${filteredProjects.length}件の事例${problem ? `：${problemGroups[problem].title.ja}` : `を、${problemTypes.length}種類の課題で整理`}`,
            )}
          </p>
          {(problem || area) && (
            <Link href={route(locale, "/projects")}>
              {text(locale, "Show all problems", "すべての課題を表示")}
            </Link>
          )}
        </div>
        {groups.map((group) => (
          <section
            className={styles.collectionGroup}
            key={group.type}
            data-problem-group={group.type}
          >
            <div className={styles.groupHeading}>
              <h2>{problemGroups[group.type].title[locale]}</h2>
              <p>{problemGroups[group.type].description[locale]}</p>
            </div>
            <div className={styles.collectionGrid}>
              {group.projects.map((project) => (
                <ProjectEntry
                  key={project.slug}
                  project={project}
                  locale={locale}
                  area={area}
                  problem={problem}
                />
              ))}
            </div>
          </section>
        ))}
        {!groups.length && (
          <p className={styles.emptyCollection}>
            {text(
              locale,
              "Choose another problem type to see the case studies.",
              "別の課題の種類を選ぶと、事例を表示できます。",
            )}
          </p>
        )}
      </PortfolioCollectionMemory>
      <ContactBand locale={locale} />
    </>
  );
}

export function PortfolioCaseStudy({
  project,
  locale,
  area,
  problem,
}: {
  project: PortfolioProject;
  locale: Locale;
  area?: Area;
  problem?: ProblemType;
}) {
  const sectionLinks = [
    ["problem", text(locale, "The problem", "課題")],
    ["built", text(locale, "What I built", "実装したもの")],
    ["decisions", text(locale, "Decisions", "設計の判断")],
    ["results", text(locale, "Results", "結果")],
    ["artifacts", text(locale, "Artifacts", "資料")],
    ["stack", text(locale, "Stack", "技術")],
  ];
  const relatedProjects = project.relatedSlugs
    .map((slug) => projects.find((item) => item.slug === slug))
    .filter((item): item is PortfolioProject => !!item);

  return (
    <>
      <header className={`${styles.pageHeading} ${styles.caseHeading}`}>
        <nav
          className={styles.breadcrumbs}
          aria-label={text(locale, "Breadcrumb", "現在地")}
        >
          <Link href={route(locale)}>{text(locale, "Home", "ホーム")}</Link>
          <span aria-hidden="true">/</span>
          <PortfolioCollectionReturn
            locale={locale}
            className=""
            href={`${route(locale, "/projects")}${collectionQuery({ area, problem })}`}
          >
            {text(locale, "Projects", "プロジェクト")}
          </PortfolioCollectionReturn>
          <span aria-hidden="true">/</span>
          <span>{project.roomName[locale]}</span>
        </nav>
        <h1>{project.framing.heading[locale]}</h1>
        <p className={styles.caseProjectTitle}>{project.title[locale]}</p>
        <p className={styles.caseSummary}>{project.summary[locale]}</p>
        <div className={styles.caseOutcome}>
          <span>{text(locale, "Result", "結果")}</span>
          {project.costMetric ? (
            <CostResult project={project} locale={locale} />
          ) : (
            <p>{project.results[0][locale]}</p>
          )}
        </div>
      </header>
      <dl className={styles.caseContext}>
        <div>
          <dt>{text(locale, "My contribution", "担当")}</dt>
          <dd>{project.role[locale]}</dd>
        </div>
        <div>
          <dt>{text(locale, "Context", "所属・取り組み")}</dt>
          <dd>
            {project.association[locale]}
            <br />
            {project.stage[locale]}
          </dd>
        </div>
      </dl>
      <nav
        className={styles.caseContents}
        aria-label={text(locale, "On this page", "このページの内容")}
      >
        {sectionLinks.map(([id, title]) => (
          <a key={id} href={`#${id}`}>
            {title}
          </a>
        ))}
      </nav>
      <section
        className={styles.caseArtwork}
        aria-label={text(
          locale,
          "A drawing of the idea",
          "仕組みから生まれた図案",
        )}
      >
        <Print
          source={printSource(project, profile.reviewedOn)}
          language={locale}
          interactive
        />
        <div className={styles.printExplanation}>
          <h2>
            {text(locale, "A pattern in the work.", "仕事の中にある、かたち。")}
          </h2>
          <p>
            {
              interpretations[printSource(project, profile.reviewedOn).kind][
                locale
              ]
            }
          </p>
          <p>
            {text(
              locale,
              "Change the drawing or reveal its construction. The workflow below explains what each part of the software does.",
              "図案を変えたり、構成を確認したりできます。下の構成図では、ソフトウェアの各部分の役割を紹介します。",
            )}
          </p>
          <a className={styles.textLink} href="#system-plan">
            {text(locale, "Explore the system", "仕組みを見る")}
          </a>
        </div>
      </section>
      <SystemPlan
        rooms={project.rooms[locale]}
        locale={locale}
        id={project.slug}
      />
      <p className={styles.diagramCaption}>
        {text(
          locale,
          "A conceptual plan of the workflow. Choose a room to inspect its responsibility.",
          "処理の役割を部屋に見立てた構成図です。部屋を選ぶと、それぞれの役割を確認できます。",
        )}
      </p>
      <div className={styles.caseReading}>
        <section className={styles.caseSection} id="problem">
          <h2>{text(locale, "The problem", "課題")}</h2>
          <div className={styles.prose}>
            <Paragraphs values={project.problem} locale={locale} />
          </div>
        </section>
        <section className={styles.caseSection} id="built">
          <h2>{text(locale, "What I built", "実装したもの")}</h2>
          <div className={styles.prose}>
            <Paragraphs values={project.built} locale={locale} />
            <h3>{text(locale, "My contribution", "担当した範囲")}</h3>
            <p>{project.role[locale]}</p>
            <MissingEvidence locale={locale} item={project.todos.context} />
          </div>
        </section>
        <section className={styles.caseSection} id="decisions">
          <h2>
            {text(
              locale,
              "Decisions that shape the system",
              "仕組みを形にする判断",
            )}
          </h2>
          <div>
            {project.decisions.map((decision, index) => (
              <article className={styles.decision} key={index}>
                <Paragraphs values={decision.description} locale={locale} />
              </article>
            ))}
            <MissingEvidence locale={locale} item={project.todos.decisions} />
          </div>
        </section>
        <section className={styles.caseSection} id="results">
          <h2>{text(locale, "Results and evidence", "結果と根拠")}</h2>
          <div className={styles.prose}>
            {project.costMetric && (
              <div className={styles.metricSheet}>
                <div className={styles.metricValues}>
                  <div>
                    <strong>
                      ${project.costMetric.before.toLocaleString("en-US")}
                    </strong>
                    <span>
                      {text(
                        locale,
                        "Before · approx. USD / year",
                        "改善前 · 概算米ドル／年",
                      )}
                    </span>
                    <div className={styles.costBar}>
                      <i style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <strong>
                      ${project.costMetric.after.toLocaleString("en-US")}
                    </strong>
                    <span>
                      {text(
                        locale,
                        "After · approx. USD / year",
                        "改善後 · 概算米ドル／年",
                      )}
                    </span>
                    <div className={styles.costBar}>
                      <i
                        style={{
                          width: `${(project.costMetric.after / project.costMetric.before) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <p>
                  {text(
                    locale,
                    `Annual event-platform infrastructure cost fell by approximately ${project.costMetric.percent}%. The approximate annual comparison is confirmed by the project owner.`,
                    `イベント基盤の年間インフラ費を約${project.costMetric.percent}%削減。この年間費用の概算は本人確認済みです。`,
                  )}
                </p>
              </div>
            )}
            <Paragraphs values={project.results} locale={locale} />
            {project.slug === "subsidy-search-pilot" && (
              <h3 id="evaluation">{text(locale, "Evaluation", "評価")}</h3>
            )}
            {project.evidenceGap && (
              <MissingEvidence locale={locale} item={project.evidenceGap} />
            )}
          </div>
        </section>
        <section className={styles.caseSection} id="artifacts">
          <h2>{text(locale, "Artifacts", "構成と資料")}</h2>
          <div>
            <article className={styles.artifact}>
              <h3>
                <a href="#system-plan">
                  {text(
                    locale,
                    "Inspect the system plan",
                    "システムの構成図を見る",
                  )}
                </a>
              </h3>
              <p>
                {text(
                  locale,
                  "The drawing above explains the responsibilities and the handoff between stages. It is an illustrative reconstruction from the reviewed project description.",
                  "上の構成図で、各段階の役割と受け渡しを確認できます。確認済みのプロジェクト説明をもとに描いた概念図です。",
                )}
              </p>
            </article>
            {project.artifacts.map((artifact, index) => (
              <article className={styles.artifact} key={index}>
                <h3>
                  {artifact.href ? (
                    <a href={artifact.href}>{artifact.title[locale]}</a>
                  ) : (
                    artifact.title[locale]
                  )}
                </h3>
                <p>{artifact.description[locale]}</p>
              </article>
            ))}
            {project.artifactGap && (
              <MissingEvidence locale={locale} item={project.artifactGap} />
            )}
          </div>
        </section>
        <section className={styles.caseSection} id="stack">
          <h2>{text(locale, "Stack and responsibilities", "技術と役割")}</h2>
          <div>
            <table className={styles.stackTable}>
              <thead>
                <tr>
                  <th scope="col">{text(locale, "Technology", "技術")}</th>
                  <th scope="col">{text(locale, "Responsibility", "役割")}</th>
                </tr>
              </thead>
              <tbody>
                {project.stack.map((item) => (
                  <tr key={item.name}>
                    <th scope="row">{item.name}</th>
                    <td>{item.responsibility[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.caseSection} id="reflection">
          <h2>
            {text(locale, "The next useful question", "次に確かめたいこと")}
          </h2>
          <div className={styles.prose}>
            <MissingEvidence locale={locale} item={project.todos.reflection} />
          </div>
        </section>
      </div>
      <section className={styles.caseSection}>
        <h2>{text(locale, "Connected work", "関連する仕事")}</h2>
        <div className={styles.relatedGrid}>
          {relatedProjects.map((item) => (
            <article key={item.slug}>
              <h3>
                <Link href={projectRoute(locale, item.slug)}>
                  {item.title[locale]}
                </Link>
              </h3>
              <p>{item.summary[locale]}</p>
              <Link
                className={styles.textLink}
                href={projectRoute(locale, item.slug)}
              >
                {text(locale, "Read the case study", "事例を読む")}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <p className={styles.collectionReturn}>
        <PortfolioCollectionReturn
          locale={locale}
          href={`${route(locale, "/projects")}${collectionQuery({ area, problem })}`}
        >
          {text(
            locale,
            "Back to the project collection",
            "プロジェクト一覧に戻る",
          )}
        </PortfolioCollectionReturn>
      </p>
      <ContactBand locale={locale} slug={project.slug} />
    </>
  );
}

export function PortfolioAbout({ locale }: { locale: Locale }) {
  return (
    <>
      <header className={styles.pageHeading}>
        <h1>
          {text(
            locale,
            "Finding the structure.",
            "仕組みを、ほどいて組み立てる。",
          )}
        </h1>
        <p>
          {text(
            locale,
            "I’m Kento, an engineer in Tokyo. I enjoy making the relationships between people, interfaces and services easier to understand.",
            "東京で働くエンジニア、飯塚健杜です。使う人、画面、サービスの関係を整理し、わかりやすい仕組みを作ることが好きです。",
          )}
        </p>
      </header>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>
          {text(
            locale,
            "From the workflow to the code.",
            "業務の流れから、コードまで。",
          )}
        </h2>
        <div className={styles.prose}>
          <Paragraphs values={profile.about} locale={locale} />
          <figure className={styles.approachDrawing}>
            <RoomDrawing variant={0} />
          </figure>
        </div>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>
          {text(
            locale,
            "How that looks in practice.",
            "仕事で大切にしていること。",
          )}
        </h2>
        <div className={styles.prose}>
          <h3>
            {text(locale, "Separate the responsibilities", "役割を分ける")}
          </h3>
          <p>
            {text(
              locale,
              "The salon workflow separates extracting data, loading it and deciding when it runs. Each boundary gives a specific part of the system a clear job.",
              "美容室向けデータ連携では、抽出・取り込み・実行管理を分けました。境界を整理することで、それぞれが何をするかを明確にしています。",
            )}
          </p>
          <Link
            className={styles.textLink}
            href={projectRoute(locale, "salon-data-platform")}
          >
            {text(locale, "See the data workflow", "データ連携の事例を見る")}
          </Link>
          <h3>{text(locale, "Make state explicit", "状態を明確にする")}</h3>
          <p>
            {text(
              locale,
              "The local agent-coordination service keeps tasks and handovers in durable storage. Uncertain dispatches wait for reconciliation after a restart.",
              "ローカルのエージェント管理サービスでは、タスクと引き継ぎを永続化しています。再起動後に実行結果が不明な処理は、状態を確認するまで保留します。",
            )}
          </p>
          <Link
            className={styles.textLink}
            href={projectRoute(locale, "agent-coordination")}
          >
            {text(
              locale,
              "See the handover system",
              "引き継ぎ管理の事例を見る",
            )}
          </Link>
        </div>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "The path here.", "これまでの歩み。")}</h2>
        <div>
          <CareerTimeline locale={locale} />
          <div className={styles.prose}>
            <h3>{text(locale, "Education", "学歴")}</h3>
            <p>{profile.education[locale]}</p>
            <Link className={styles.textLink} href={route(locale, "/resume")}>
              {text(locale, "Read the full resume", "詳しい経歴を見る")}
            </Link>
          </div>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function PortfolioResume({ locale }: { locale: Locale }) {
  return (
    <>
      <header className={styles.pageHeading}>
        <h1>
          {text(locale, "Experience & practice.", "経歴と、仕事の領域。")}
        </h1>
        <p>{profile.intro[locale]}</p>
      </header>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Experience", "職務経歴")}</h2>
        <CareerTimeline locale={locale} detailed />
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Selected projects", "主なプロジェクト")}</h2>
        <div className={styles.prose}>
          {featuredProjects.map((project) => (
            <article className={styles.artifact} key={project.slug}>
              <h3>
                <Link href={projectRoute(locale, project.slug)}>
                  {project.title[locale]}
                </Link>
              </h3>
              <p>{project.summary[locale]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Skills", "主な技術")}</h2>
        <div className={styles.prose}>
          <ul className={styles.stackList}>
            {profile.skills[locale].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Education & document", "学歴・職務経歴書")}</h2>
        <div className={styles.prose}>
          <p>{profile.education[locale]}</p>
          <p className={styles.smallText}>
            {text(locale, "Profile reviewed: ", "プロフィール確認日：")}
            {profile.reviewedOn}
          </p>
          <MissingEvidence
            locale={locale}
            item={profile.todos[`resume-${locale}`]}
          />
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function PortfolioWorkTogether({ locale }: { locale: Locale }) {
  return (
    <>
      <header className={styles.pageHeading}>
        <h1>
          {text(locale, "Build something useful.", "使う人に届く仕組みを。")}
        </h1>
        <p>
          {text(
            locale,
            "I help turn a business workflow into an application, a data pipeline or a tool people can use. The first step is understanding the work.",
            "業務の流れを整理し、使う人に届くアプリケーション、データ連携、道具にします。まずは、いまの仕事を理解することから始めます。",
          )}
        </p>
      </header>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Where I can help.", "お手伝いできること。")}</h2>
        <div className={styles.prose}>
          <h3>
            {text(
              locale,
              "Connect data to everyday decisions",
              "データを日々の判断につなぐ",
            )}
          </h3>
          <p>
            {text(
              locale,
              "Data imports, validation, reporting and dashboards. The salon case shows how these responsibilities fit together.",
              "データの取り込み、検証、集計、ダッシュボードを開発します。美容室向けの事例で、それぞれの役割のつなぎ方を紹介しています。",
            )}
          </p>
          <Link
            className={styles.textLink}
            href={projectRoute(locale, "salon-data-platform")}
          >
            {text(
              locale,
              "Read the data-platform case",
              "データ基盤の事例を読む",
            )}
          </Link>
          <h3>
            {text(
              locale,
              "Give applications a maintainable structure",
              "変更しやすいアプリケーションを作る",
            )}
          </h3>
          <p>
            {text(
              locale,
              "Web interfaces, services and operational flows. The event-platform case shows reusable features and a supported infrastructure-cost result.",
              "Web画面、サービス、運用の流れを設計・実装します。イベント基盤の事例では、機能の再利用とインフラ費の削減を紹介しています。",
            )}
          </p>
          <Link
            className={styles.textLink}
            href={projectRoute(locale, "event-platform")}
          >
            {text(
              locale,
              "Read the event-platform case",
              "イベント基盤の事例を読む",
            )}
          </Link>
          <h3>
            {text(
              locale,
              "Explore an AI-assisted workflow",
              "AIを使った業務の流れを試す",
            )}
          </h3>
          <p>
            {text(
              locale,
              "Prototype the conversation, integration and validation around an AI capability. The local search prototype makes the current evidence and the next evaluation needs visible.",
              "AIとの対話、既存の仕組みとの接続、入力や出力の検証を試作します。ローカルの検索プロトタイプでは、確認できた機能と今後必要な評価を紹介しています。",
            )}
          </p>
          <Link
            className={styles.textLink}
            href={projectRoute(locale, "subsidy-search-pilot")}
          >
            {text(
              locale,
              "Read the search-prototype case",
              "検索プロトタイプの事例を読む",
            )}
          </Link>
        </div>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "A way to work together.", "進め方。")}</h2>
        <ol className={styles.stepList}>
          <li>
            <h3>{text(locale, "Understand the workflow", "業務を理解する")}</h3>
            <p>
              {text(
                locale,
                "Discuss who uses the system, the current process and the outcome that matters.",
                "使う人、現在の手順、達成したいことを確認します。",
              )}
            </p>
          </li>
          <li>
            <h3>
              {text(
                locale,
                "Define a useful first version",
                "最初の形を決める",
              )}
            </h3>
            <p>
              {text(
                locale,
                "Agree on scope, system boundaries and the evidence needed to judge the result.",
                "範囲、システムの境界、結果を判断するための確認方法を決めます。",
              )}
            </p>
          </li>
          <li>
            <h3>{text(locale, "Build and review it", "作り、確かめる")}</h3>
            <p>
              {text(
                locale,
                "Implement the workflow and review it with the people who will use and maintain it.",
                "実装した流れを、使う人・運用する人と一緒に確かめます。",
              )}
            </p>
          </li>
        </ol>
      </section>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>{text(locale, "Practical details.", "ご相談にあたって。")}</h2>
        <div className={styles.prose}>
          <p>
            {text(
              locale,
              "I’m based in Tokyo and currently work at FalconeX. Share the intended scope and timing so we can discuss how a project could fit.",
              "東京を拠点に、現在はFalconeXで勤務しています。想定する範囲や時期をお知らせください。進め方を個別にご相談します。",
            )}
          </p>
          <MissingEvidence locale={locale} item={profile.todos.engagement} />
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function PortfolioContact({
  locale,
  projectSlug,
}: {
  locale: Locale;
  projectSlug?: string;
}) {
  const selectedProject = projects.find(
    (project) => project.slug === projectSlug,
  );
  const hiringSubject = text(
    locale,
    "Engineering opportunity — Kento Iizuka",
    "エンジニア採用のご相談 — 飯塚健杜",
  );
  const projectSubject = selectedProject
    ? text(
        locale,
        `Project enquiry: ${selectedProject.title.en}`,
        `開発のご相談：${selectedProject.title.ja}`,
      )
    : text(
        locale,
        "Development project — Kento Iizuka",
        "開発のご相談 — 飯塚健杜",
      );
  const emailLink = (subject: string) =>
    `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <header className={styles.pageHeading}>
        <h1>
          {text(locale, "Start with a conversation.", "まずは、お話から。")}
        </h1>
        <p>
          {text(
            locale,
            "Tell me what you’re working on and where you could use an engineer. I welcome engineering roles and development-project enquiries.",
            "取り組んでいることや、エンジニアの力が必要なことをお聞かせください。採用と開発プロジェクトのご相談をお待ちしています。",
          )}
        </p>
        {profile.email && (
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        )}
      </header>
      <div className={styles.contactPanels}>
        <section className={styles.contactPanel} id="hiring">
          <h2>{text(locale, "Engineering roles", "エンジニア採用")}</h2>
          <p>
            {text(
              locale,
              "Share the role, the product and the team. Useful context includes the responsibilities, location or remote arrangement, and the hiring timeline.",
              "募集職種、プロダクト、チームについてお知らせください。担当範囲、勤務地やリモート勤務の条件、選考の時期があると、お話を進めやすくなります。",
            )}
          </p>
          {profile.email ? (
            <a className={styles.solidButton} href={emailLink(hiringSubject)}>
              {text(locale, "Email about a role", "採用についてメールする")}
            </a>
          ) : (
            <MissingEvidence locale={locale} item={profile.todos.identity} />
          )}
        </section>
        <section className={styles.contactPanel} id="projects">
          <h2>{text(locale, "Development projects", "開発プロジェクト")}</h2>
          <p>
            {text(
              locale,
              "Describe the people using the workflow, what happens today and what you would like to improve. Include the desired timing and an approximate budget if you have one.",
              "使う人、現在の業務の流れ、改善したいことをお知らせください。希望の時期や、お決まりであれば予算の目安もお聞かせください。",
            )}
          </p>
          {selectedProject && (
            <p>
              {text(locale, "Related case: ", "ご覧になった事例：")}
              <Link href={projectRoute(locale, selectedProject.slug)}>
                {selectedProject.title[locale]}
              </Link>
            </p>
          )}
          {profile.email && (
            <a className={styles.solidButton} href={emailLink(projectSubject)}>
              {text(locale, "Email about a project", "開発についてメールする")}
            </a>
          )}
        </section>
      </div>
      <section className={`${styles.section} ${styles.splitSection}`}>
        <h2>
          {text(
            locale,
            "Elsewhere & practical details",
            "プロフィール・ご相談の詳細",
          )}
        </h2>
        <div className={styles.prose}>
          <p>
            {text(
              locale,
              "Based in Tokyo, Japan. Availability, working-language preferences and engagement terms can be discussed in your message.",
              "東京を拠点に活動しています。対応可能な時期、使用言語、契約条件は、ご連絡時にご相談ください。",
            )}
          </p>
          <div className={styles.heroLinks}>
            {profile.linkedin && (
              <a className={styles.textLink} href={profile.linkedin}>
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a className={styles.textLink} href={profile.github}>
                GitHub
              </a>
            )}
            <Link
              className={styles.textLink}
              href={route(locale, "/work-together")}
            >
              {text(locale, "How we could work together", "開発の進め方を見る")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
