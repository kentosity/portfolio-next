import Link from "next/link";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { featuredProjects, findProject } from "@/lib/content";
import { ChromaHero } from "./interactions";
import { Career, ContactCallout, ProjectCard, chromaRoot } from "./shared";
import styles from "./chroma.module.css";

export function ChromaHome({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const controlNames: Record<string, string> =
    locale === "en"
      ? {
          "local-speech": "Voice",
          "event-platform": "Events",
          "salon-data-platform": "Data",
          "subsidy-search-pilot": "Search",
        }
      : {
          "local-speech": "音声",
          "event-platform": "イベント",
          "salon-data-platform": "データ",
          "subsidy-search-pilot": "検索",
        };
  const heroItems = featuredProjects.map((project) => ({
    slug: project.slug,
    title: project.title[locale],
    summary: project.summary[locale],
    control: controlNames[project.slug] ?? project.title[locale],
    href: `${chromaRoot}/${locale}/projects/${project.slug}`,
  }));
  const approachProjects = [
    "salon-data-platform",
    "event-platform",
    "agent-coordination",
  ].map((slug) => findProject(slug)!);

  return (
    <>
      <ChromaHero locale={locale} items={heroItems} identity={text.current} />
      <section className={styles.section} id="projects">
        <div className={styles.sectionHeading}>
          <h2>{text.selected}</h2>
          <Link
            className={styles.textLink}
            href={`${chromaRoot}/${locale}/projects`}
          >
            {text.allProjects}
          </Link>
        </div>
        <div className={styles.featureGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </section>
      <section className={styles.approach} id="about">
        <h2>{text.approach}</h2>
        <div className={styles.approachList}>
          {approachProjects.map((project) => (
            <article key={project.id}>
              <h3>
                <Link href={`${chromaRoot}/${locale}/projects/${project.slug}`}>
                  {project.workflow[locale][1]}
                </Link>
              </h3>
              <p>{project.decisions[locale][0]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} id="experience">
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
      <ContactCallout locale={locale} />
    </>
  );
}
