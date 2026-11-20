import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, pageDescriptions } from "@/app/content/copy";
import { isLocale } from "@/app/content/model";
import { corePages, isArea, siteContent } from "@/lib/content";
import { projects } from "../../_components/atlas-content";
import {
  AtlasAbout,
  AtlasCaseStudy,
  AtlasCollection,
  AtlasContact,
  AtlasHome,
  AtlasResume,
  AtlasShell,
  AtlasWorkTogether,
} from "../../_components/atlas-site";

type PageProps = {
  params: Promise<{ locale: string; path?: string[] }>;
  searchParams: Promise<{ area?: string; project?: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...corePages.map((path) => ({ path: path ? [path] : [] })),
    ...siteContent.projects.map((project) => ({
      path: ["projects", project.slug],
    })),
  ];
}

function resolvePage(locale: string, path: string[]) {
  if (!isLocale(locale)) notFound();
  const currentPath = path.join("/");
  const project =
    path.length === 2 && path[0] === "projects"
      ? projects.find((item) => item.slug === path[1])
      : undefined;
  if (!corePages.includes(currentPath) && !project) notFound();
  return { locale, currentPath, project };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, path = [] } = await params;
  const page = resolvePage(locale, path);
  const titleKey =
    page.currentPath === "work-together"
      ? "work"
      : (page.currentPath as "projects" | "about" | "contact" | "resume");
  const pageTitle =
    page.project?.title[page.locale] ??
    (page.currentPath ? copy[page.locale][titleKey] : "Atlas");
  const title = `${pageTitle} — ${siteContent.identity.name[page.locale]}`;
  const description =
    page.project?.summary[page.locale] ??
    pageDescriptions[page.currentPath]?.[page.locale] ??
    siteContent.introduction[page.locale];
  const suffix = page.currentPath ? `/${page.currentPath}` : "";
  const origin = siteContent.identity.origin;
  const pageUrl = `${origin}/lab/full/atlas/${page.locale}${suffix}`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${origin}/lab/full/atlas/en${suffix}`,
        ja: `${origin}/lab/full/atlas/ja${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      locale: page.locale === "en" ? "en_US" : "ja_JP",
      type: "website",
    },
  };
}

export default async function AtlasPage({ params, searchParams }: PageProps) {
  const { locale, path = [] } = await params;
  const page = resolvePage(locale, path);
  const query = await searchParams;
  const area = isArea(query.area) ? query.area : undefined;
  let content;

  if (page.project)
    content = (
      <AtlasCaseStudy project={page.project} locale={page.locale} area={area} />
    );
  else if (page.currentPath === "projects")
    content = <AtlasCollection locale={page.locale} area={area} />;
  else if (page.currentPath === "about")
    content = <AtlasAbout locale={page.locale} />;
  else if (page.currentPath === "resume")
    content = <AtlasResume locale={page.locale} />;
  else if (page.currentPath === "work-together")
    content = <AtlasWorkTogether locale={page.locale} />;
  else if (page.currentPath === "contact")
    content = <AtlasContact locale={page.locale} projectSlug={query.project} />;
  else content = <AtlasHome locale={page.locale} />;

  return (
    <AtlasShell
      locale={page.locale}
      path={page.currentPath ? `/${page.currentPath}` : ""}
      area={area}
    >
      {content}
    </AtlasShell>
  );
}
