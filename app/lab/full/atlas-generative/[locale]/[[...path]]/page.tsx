import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, pageDescriptions } from "@/app/content/copy";
import { isLocale } from "@/app/content/model";
import { corePages, isArea, siteContent } from "@/lib/content";
import { basePath } from "../../_components/routing";
import { projects } from "../../_components/content";
import {
  PortfolioAbout,
  PortfolioCaseStudy,
  PortfolioCollection,
  PortfolioContact,
  PortfolioHome,
  PortfolioResume,
  PortfolioShell,
  PortfolioWorkTogether,
} from "../../_components/pages";

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
    (page.currentPath
      ? copy[page.locale][titleKey]
      : page.locale === "ja"
        ? "仕組みを、わかる形に。"
        : "Systems, in good order.");
  const title = `${pageTitle} — ${siteContent.identity.name[page.locale]}`;
  const description =
    page.project?.summary[page.locale] ??
    pageDescriptions[page.currentPath]?.[page.locale] ??
    siteContent.introduction[page.locale];
  const suffix = page.currentPath ? `/${page.currentPath}` : "";
  const origin = siteContent.identity.origin;
  const pageUrl = `${origin}${basePath}/${page.locale}${suffix}`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${origin}${basePath}/en${suffix}`,
        ja: `${origin}${basePath}/ja${suffix}`,
        "x-default": `${origin}${basePath}/en${suffix}`,
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

export default async function PortfolioPage({
  params,
  searchParams,
}: PageProps) {
  const { locale, path = [] } = await params;
  const page = resolvePage(locale, path);
  const query = await searchParams;
  const area = isArea(query.area) ? query.area : undefined;
  let content;

  if (page.project)
    content = (
      <PortfolioCaseStudy
        project={page.project}
        locale={page.locale}
        area={area}
      />
    );
  else if (page.currentPath === "projects")
    content = <PortfolioCollection locale={page.locale} area={area} />;
  else if (page.currentPath === "about")
    content = <PortfolioAbout locale={page.locale} />;
  else if (page.currentPath === "resume")
    content = <PortfolioResume locale={page.locale} />;
  else if (page.currentPath === "work-together")
    content = <PortfolioWorkTogether locale={page.locale} />;
  else if (page.currentPath === "contact")
    content = (
      <PortfolioContact locale={page.locale} projectSlug={query.project} />
    );
  else content = <PortfolioHome locale={page.locale} />;

  return (
    <PortfolioShell
      locale={page.locale}
      path={page.currentPath ? `/${page.currentPath}` : ""}
      area={area}
    >
      {content}
    </PortfolioShell>
  );
}
