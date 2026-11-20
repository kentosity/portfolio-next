import Link from "next/link";
import { copy } from "@/app/content/copy";
import type { Locale, Project } from "@/app/content/model";
import { featuredProjects, siteContent } from "@/lib/content";
import {
  Career,
  ContactActions,
  Education,
  PageIntro,
  Section,
  Skills,
  Todo,
  Workflow,
} from "../content";

export function AboutPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <>
      <PageIntro title={text.about}>
        <p>{text.aboutIntro}</p>
      </PageIntro>
      <Section title={text.approach}>
        <p>{text.approachText}</p>
        <Workflow
          project={
            siteContent.projects.find(
              (project) => project.slug === "salon-data-platform",
            )!
          }
          locale={locale}
        />
      </Section>
      <Section title={text.career}>
        {siteContent.about[locale].slice(1, 4).map((paragraph) => (
          <p className="reading-width" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <Link href={`/${locale}/resume`}>{text.viewResume} →</Link>
      </Section>
      <Section title={text.skills}>
        <Skills locale={locale} evidence />
      </Section>
      <Section title={text.education}>
        <Education locale={locale} />
      </Section>
      <Section title={text.portrait}>
        <Todo item={siteContent.todos.portrait} locale={locale} />
      </Section>
      <Section title={text.contact}>
        <ContactActions locale={locale} />
      </Section>
    </>
  );
}

export function ResumePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <div className="resume-page">
      <PageIntro
        title={`${siteContent.identity.name[locale]} — ${text.resume}`}
      >
        <p>
          {siteContent.identity.location[locale]} · {text.current}
        </p>
        <p>
          <a href={`mailto:${siteContent.identity.email}`}>
            {siteContent.identity.email}
          </a>
        </p>
      </PageIntro>
      <Section title={text.summary}>
        <p>{siteContent.about[locale][0]}</p>
        <p>{siteContent.about[locale][4]}</p>
      </Section>
      <Section id="experience" title={text.career}>
        <Career locale={locale} full />
      </Section>
      <Section id="projects" title={text.selected}>
        <ul className="resume-projects">
          {featuredProjects.map((project) => (
            <li key={project.id}>
              <Link href={`/${locale}/projects/${project.slug}`}>
                {project.title[locale]}
              </Link>
              <p>{project.summary[locale]}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="skills" title={text.skills}>
        <Skills locale={locale} />
      </Section>
      <Section title={text.education}>
        <Education locale={locale} />
      </Section>
      <Section title={text.pdf}>
        <p>{text.pdfPending}</p>
        <Todo item={siteContent.todos[`resume-${locale}`]} locale={locale} />
      </Section>
      <p className="subtle">
        {text.updated}:{" "}
        <time dateTime={siteContent.source.reviewedOn}>
          {siteContent.source.reviewedOn}
        </time>
      </p>
      <ContactActions locale={locale} />
    </div>
  );
}

export function WorkTogetherPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const offers =
    locale === "en"
      ? [
          {
            title: "Web applications and interfaces",
            description:
              "Connect user tasks to maintainable screens, APIs and content workflows.",
            deliverable: "An application interface and an editorial workflow.",
            slug: "architecture-portfolio",
          },
          {
            title: "Data integration and reporting",
            description:
              "Connect source data to reporting, with explicit checks and recovery paths.",
            deliverable:
              "An ingestion pipeline, validation rules and a reporting dashboard.",
            slug: "salon-data-platform",
          },
          {
            title: "AI-assisted workflow tools and prototypes",
            description:
              "Connect model capabilities to an understandable application workflow.",
            deliverable:
              "A small workflow prototype and an agreed evaluation plan.",
            slug: "local-speech",
          },
        ]
      : [
          {
            title: "Webアプリとインターフェース",
            description:
              "使う人の作業に合う画面、API、更新の仕組みをつなぎます。",
            deliverable: "アプリの画面と、コンテンツを更新する仕組み。",
            slug: "architecture-portfolio",
          },
          {
            title: "データ連携とレポート",
            description:
              "元のデータを集計へつなぎ、検証と失敗時の処理を明確にします。",
            deliverable: "データの取り込み、検証ルール、レポート画面。",
            slug: "salon-data-platform",
          },
          {
            title: "AIを使う業務ツールとプロトタイプ",
            description:
              "モデルの機能を、使う人が理解できるアプリの流れに組み込みます。",
            deliverable: "小さな業務プロトタイプと、合意した評価計画。",
            slug: "local-speech",
          },
        ];
  const steps =
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
      <PageIntro title={text.work}>
        <p>{text.workIntro}</p>
      </PageIntro>
      <Section title={text.workExamples}>
        <div className="offer-list">
          {offers.map((offer) => (
            <article key={offer.slug}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p>
                {text.deliverables}: {offer.deliverable}
              </p>
              <Link href={`/${locale}/projects/${offer.slug}`}>
                {text.readCase} →
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <Section title={text.process}>
        <p>{text.processIntro}</p>
        <ol className="process-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
      <Section title={text.terms}>
        <Todo item={siteContent.todos.engagement} locale={locale} />
      </Section>
      <Section title={text.contact}>
        <p>{text.projectPrompt}</p>
        <Link className="button" href={`/${locale}/contact#projects`}>
          {text.discuss}
        </Link>
      </Section>
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
  function emailHref(kind: "hiring" | "projects") {
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
    return `mailto:${siteContent.identity.email}?${new URLSearchParams({ subject, body }).toString()}`;
  }
  return (
    <>
      <PageIntro title={text.contact}>
        <p>{text.contactIntro}</p>
        <p>
          <a
            className="email-address"
            href={`mailto:${siteContent.identity.email}`}
          >
            {siteContent.identity.email}
          </a>
        </p>
        <p className="subtle">{text.emailNote}</p>
      </PageIntro>
      <div className="contact-paths">
        <Section id="hiring" title={text.hiring}>
          <p>{text.hiringPrompt}</p>
          <a className="button" href={emailHref("hiring")}>
            {text.email}
          </a>
          <p>
            <Link href={`/${locale}/resume`}>{text.viewResume} →</Link>
          </p>
        </Section>
        <Section id="projects" title={text.discuss}>
          <p>{text.projectPrompt}</p>
          {project && (
            <p>
              <Link href={`/${locale}/projects/${project.slug}`}>
                {project.title[locale]}
              </Link>
            </p>
          )}
          <a className="button" href={emailHref("projects")}>
            {text.email}
          </a>
          <p>
            <Link href={`/${locale}/work-together`}>{text.work} →</Link>
          </p>
        </Section>
      </div>
      <Section title={text.practical}>
        <p>{siteContent.identity.location[locale]}</p>
        <Todo item={siteContent.todos.hiring} locale={locale} />
        <Todo item={siteContent.todos.languages} locale={locale} />
        <Todo item={siteContent.todos.engagement} locale={locale} />
      </Section>
      <Section title={text.links}>
        <ul className="professional-links">
          {siteContent.links.map((link) => (
            <li key={link.url}>
              <a href={link.url}>{link.label} ↗</a>
            </li>
          ))}
        </ul>
        <Todo item={siteContent.todos.identity} locale={locale} />
        <Todo item={siteContent.todos.domain} locale={locale} />
      </Section>
    </>
  );
}
