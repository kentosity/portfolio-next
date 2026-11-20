import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, pageDescriptions } from "@/app/content/copy";
import { isLocale, locales } from "@/app/content/model";
import { corePages, findProject, isArea, siteContent } from "@/lib/content";
import {
  ThreadAbout,
  ThreadCase,
  ThreadCollection,
  ThreadContact,
  ThreadHome,
  ThreadResume,
  ThreadShell,
  ThreadWorkTogether,
} from "../_components/pages";

type RouteProps = {
  params: Promise<{ locale: string; segments?: string[] }>;
  searchParams: Promise<{ area?: string; project?: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...corePages.map((path) => ({ locale, segments: path ? [path] : [] })),
    ...siteContent.projects.map((project) => ({
      locale,
      segments: ["projects", project.slug],
    })),
  ]);
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) return {};
  const page = segments[0] || "home";
  const project =
    page === "projects" && segments.length === 2
      ? findProject(segments[1])
      : undefined;
  const pageTitle =
    page === "work-together"
      ? copy[locale].work
      : page in copy[locale]
        ? copy[locale][page as keyof typeof copy.en]
        : copy[locale].home;

  return {
    title: `${project?.title[locale] || pageTitle} | ${siteContent.identity.name[locale]}`,
    description:
      project?.summary[locale] ||
      pageDescriptions[page]?.[locale] ||
      siteContent.introduction[locale],
    robots: { index: false, follow: false },
  };
}

export default async function ThreadPage({ params, searchParams }: RouteProps) {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  const filters = await searchParams;
  const area = isArea(filters.area) ? filters.area : undefined;
  const selectedProject = filters.project
    ? findProject(filters.project)
    : undefined;
  const path = segments.join("/");
  const queryParams = new URLSearchParams();
  if (area) queryParams.set("area", area);
  if (selectedProject) queryParams.set("project", selectedProject.slug);
  const query = queryParams.size ? `?${queryParams}` : "";

  let content;
  if (segments.length === 0) content = <ThreadHome locale={locale} />;
  else if (path === "projects")
    content = <ThreadCollection locale={locale} area={area} />;
  else if (segments.length === 2 && segments[0] === "projects") {
    const project = findProject(segments[1]);
    if (!project) notFound();
    content = <ThreadCase project={project} locale={locale} area={area} />;
  } else if (path === "about") content = <ThreadAbout locale={locale} />;
  else if (path === "resume") content = <ThreadResume locale={locale} />;
  else if (path === "work-together")
    content = <ThreadWorkTogether locale={locale} />;
  else if (path === "contact")
    content = <ThreadContact locale={locale} project={selectedProject} />;
  else notFound();

  return (
    <ThreadShell locale={locale} path={path} query={query}>
      {content}
    </ThreadShell>
  );
}
