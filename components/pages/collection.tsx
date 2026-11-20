import Link from "next/link";
import { areas, copy } from "@/app/content/copy";
import type { Area, Locale } from "@/app/content/model";
import { siteContent } from "@/lib/content";
import { ContactActions, PageIntro, ProjectCard, Section } from "../content";

export function CollectionPage({
  locale,
  selectedArea,
}: {
  locale: Locale;
  selectedArea?: Area;
}) {
  const text = copy[locale];
  const visibleProjects = siteContent.projects.filter(
    (project) => !selectedArea || project.area === selectedArea,
  );
  return (
    <>
      <PageIntro title={text.projects}>
        <p>{text.collectionIntro}</p>
      </PageIntro>
      <nav className="area-filters" aria-label={text.filter}>
        <Link
          href={`/${locale}/projects`}
          scroll={false}
          aria-current={!selectedArea ? "true" : undefined}
        >
          {text.all}
        </Link>
        {areas.map((area) => (
          <Link
            key={area.id}
            href={`/${locale}/projects?area=${area.id}`}
            scroll={false}
            aria-current={selectedArea === area.id ? "true" : undefined}
          >
            {area.title[locale]}
          </Link>
        ))}
      </nav>
      <p
        className="result-count"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {visibleProjects.length} {text.count}
        {selectedArea && (
          <>
            {" "}
            ·{" "}
            <Link href={`/${locale}/projects`} scroll={false}>
              {text.reset}
            </Link>
          </>
        )}
      </p>
      {areas
        .filter((area) => !selectedArea || selectedArea === area.id)
        .map((area) => (
          <Section key={area.id} id={area.id} title={area.title[locale]}>
            <div className="project-grid">
              {visibleProjects
                .filter((project) => project.area === area.id)
                .sort(
                  (first, second) =>
                    first.collectionOrder - second.collectionOrder,
                )
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    locale={locale}
                    area={selectedArea}
                  />
                ))}
            </div>
          </Section>
        ))}
      <Section title={text.contact}>
        <p>{text.contactIntro}</p>
        <ContactActions locale={locale} />
      </Section>
    </>
  );
}
