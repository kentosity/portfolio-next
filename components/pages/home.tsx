import Link from "next/link";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { featuredProjects, siteContent } from "@/lib/content";
import {
  Career,
  ContactActions,
  ProjectCard,
  Section,
  Skills,
  Workflow,
} from "../content";

export function HomePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <>
      <header className="home-intro">
        <p className="eyebrow">
          {siteContent.identity.name[locale]} / {text.nameOther}
        </p>
        <h1>{siteContent.introduction[locale]}</h1>
        <p>
          {text.current}.{" "}
          {locale === "en"
            ? "I work across requirements, interface design, implementation and operations."
            : "要件整理、UI設計、実装、運用改善に取り組んでいます。"}
        </p>
        <div className="actions">
          <Link className="button" href={`/${locale}/projects`}>
            {text.viewProjects}
          </Link>
          <Link className="button button-secondary" href={`/${locale}/resume`}>
            {text.viewResume}
          </Link>
        </div>
      </header>
      <Section id="projects" title={text.selected}>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
        <Link className="section-link" href={`/${locale}/projects`}>
          {text.allProjects} →
        </Link>
      </Section>
      <Section id="about" title={text.approach}>
        <p className="reading-width">{text.approachText}</p>
        <Workflow
          project={
            siteContent.projects.find(
              (project) => project.slug === "salon-data-platform",
            )!
          }
          locale={locale}
        />
        <Link href={`/${locale}/about`}>{text.about} →</Link>
      </Section>
      <Section id="experience" title={text.career}>
        <Career locale={locale} />
        <Link className="section-link" href={`/${locale}/resume`}>
          {text.viewResume} →
        </Link>
      </Section>
      <Section id="skills" title={text.skills}>
        <Skills locale={locale} evidence />
      </Section>
      <Section id="contact" title={text.contact}>
        <p>{text.contactIntro}</p>
        <ContactActions locale={locale} />
        <p>
          <Link href={`/${locale}/work-together`}>{text.work} →</Link>
        </p>
      </Section>
    </>
  );
}
