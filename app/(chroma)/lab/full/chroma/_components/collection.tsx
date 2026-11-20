import Link from "next/link";
import { areas, copy } from "@/app/content/copy";
import type { Area, Locale } from "@/app/content/model";
import { siteContent } from "@/lib/content";
import { CollectionPosition } from "./collection-position";
import { ContactCallout, Intro, ProjectCard, chromaRoot } from "./shared";
import styles from "./chroma.module.css";

export function ChromaCollection({
  locale,
  area,
}: {
  locale: Locale;
  area?: Area;
}) {
  const text = copy[locale];
  const collectionGroups = areas
    .filter((group) => !area || group.id === area)
    .map((group) => ({
      ...group,
      projects: siteContent.projects
        .filter((project) => project.area === group.id)
        .sort(
          (first, second) => first.collectionOrder - second.collectionOrder,
        ),
    }));
  const projectCount = collectionGroups.reduce(
    (total, group) => total + group.projects.length,
    0,
  );
  const collectionPath = `${chromaRoot}/${locale}/projects`;

  return (
    <>
      <Intro title={text.projects}>
        <p>{text.collectionIntro}</p>
      </Intro>
      <nav className={styles.filters} aria-label={text.filter}>
        <Link href={collectionPath} aria-current={!area ? "true" : undefined}>
          {text.all}
        </Link>
        {areas.map((group) => (
          <Link
            key={group.id}
            href={`${collectionPath}?area=${group.id}`}
            aria-current={area === group.id ? "true" : undefined}
          >
            {group.title[locale]}
          </Link>
        ))}
      </nav>
      <p className={styles.resultCount} role="status">
        {projectCount} {text.count}
        {area && (
          <>
            . <Link href={collectionPath}>{text.reset}</Link>
          </>
        )}
      </p>
      <CollectionPosition locale={locale}>
        {collectionGroups.map((group) => (
          <section className={styles.collectionGroup} key={group.id}>
            <h2>{group.title[locale]}</h2>
            <div
              className={styles.collectionGrid}
              data-project-count={group.projects.length}
            >
              {group.projects.map((project) => (
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
      </CollectionPosition>
      <ContactCallout locale={locale} />
    </>
  );
}
