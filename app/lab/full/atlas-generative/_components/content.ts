import { copy, areas as sharedAreas } from "@/app/content/copy";
import type { Area, Localized } from "@/app/content/model";
import {
  featuredProjects as sharedFeaturedProjects,
  siteContent,
} from "@/lib/content";

export type { Area, Locale, Localized } from "@/app/content/model";
export const areas = sharedAreas.map((area) => area.id);
export const areaLabels = Object.fromEntries(
  sharedAreas.map((area) => [area.id, area.title]),
) as Record<Area, Localized>;

const roomNames: Record<string, Localized> = {
  "local-speech": { en: "Speech studio", ja: "音声の部屋" },
  "event-platform": { en: "Event hall", ja: "イベントの部屋" },
  "salon-data-platform": { en: "Data room", ja: "データの部屋" },
  "subsidy-search-pilot": { en: "Search room", ja: "検索の部屋" },
};

export const projects = siteContent.projects
  .map((project) => ({
    ...project,
    role: project.contribution,
    roomName: roomNames[project.slug] ?? areaLabels[project.area],
    problem: [project.problem],
    built: [project.description],
    decisions: project.decisions.en.map((description, index) => ({
      description: [{ en: description, ja: project.decisions.ja[index] }],
    })),
    results: [project.results],
    rooms: {
      en: project.workflow.en.map((title, index) => ({
        title,
        description:
          index === 0
            ? project.problem.en
            : index === 1
              ? project.decisions.en[0]
              : project.results.en,
      })),
      ja: project.workflow.ja.map((title, index) => ({
        title,
        description:
          index === 0
            ? project.problem.ja
            : index === 1
              ? project.decisions.ja[0]
              : project.results.ja,
      })),
    },
    relatedSlugs: project.related,
    costMetric: project.metric,
    evidenceGap: project.todos.evidence,
    artifactGap: project.todos.artifacts,
    artifacts: [] as {
      title: Localized;
      description: Localized;
      href?: string;
    }[],
  }))
  .sort(
    (first, second) =>
      areas.indexOf(first.area) - areas.indexOf(second.area) ||
      first.collectionOrder - second.collectionOrder,
  );

export type PortfolioProject = (typeof projects)[number];
export const featuredProjects = sharedFeaturedProjects.map((project) =>
  projects.find((item) => item.slug === project.slug)!,
);

export const profile = {
  identity: siteContent.identity,
  reviewedOn: siteContent.source.reviewedOn,
  intro: siteContent.introduction,
  current: { en: copy.en.current, ja: copy.ja.current },
  about: siteContent.about.en.map((paragraph, index) => ({
    en: paragraph,
    ja: siteContent.about.ja[index],
  })),
  experience: siteContent.experience.map((item) => ({
    company: item.company,
    period: item.period,
    role: item.title,
    bullets: item.bullets.en.map((bullet, index) => ({
      en: bullet,
      ja: item.bullets.ja[index],
    })),
  })),
  skills: {
    en: [...new Set(siteContent.skills.flatMap((group) => group.items.en))],
    ja: [...new Set(siteContent.skills.flatMap((group) => group.items.ja))],
  },
  education: {
    en: siteContent.education
      .map((item) => `${item.school.en} — ${item.description.en}`)
      .join(" "),
    ja: siteContent.education
      .map((item) => `${item.school.ja} — ${item.description.ja}`)
      .join(" "),
  },
  email: siteContent.identity.email,
  github: siteContent.links.find((link) => link.label === "GitHub")?.url,
  linkedin: siteContent.links.find((link) => link.label === "LinkedIn")?.url,
  todos: siteContent.todos,
};
