import { siteContent } from "@/app/content/site-content";
import type { Area } from "@/app/content/model";

export { siteContent };
export const featuredProjects = siteContent.projects
  .filter((project) => project.homeOrder !== null)
  .sort((first, second) => first.homeOrder! - second.homeOrder!);

export const corePages = [
  "",
  "projects",
  "about",
  "resume",
  "work-together",
  "contact",
];

export function findProject(slug: string) {
  return siteContent.projects.find((project) => project.slug === slug);
}

export function findLegacyProject(slug: string) {
  return siteContent.projects.find(
    (project) => project.slug === slug || project.legacySlugs.includes(slug),
  );
}

export function isArea(value: string | undefined): value is Area {
  return (
    value === "ai-tools" ||
    value === "data-systems" ||
    value === "products-websites"
  );
}
