import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, pageDescriptions } from "@/app/content/copy";
import { isLocale, type Locale } from "@/app/content/model";
import { corePages, findProject, isArea, siteContent } from "@/lib/content";
import { ChromaCaseStudy } from "../../_components/case-study";
import { ChromaCollection } from "../../_components/collection";
import { ChromaHome } from "../../_components/home";
import { chromaRoot } from "../../_components/paths";
import {
  ChromaAbout,
  ChromaContact,
  ChromaResume,
  ChromaWorkTogether,
} from "../../_components/supporting";

type RouteProps = {
  params: Promise<{ locale: string; segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function routeContent(locale: Locale, segments: string[]) {
  if (segments.length === 0)
    return {
      title: `${siteContent.identity.name[locale]} — ${siteContent.identity.role[locale]}`,
      description: siteContent.introduction[locale],
    };
  if (segments.length === 2 && segments[0] === "projects") {
    const project = findProject(segments[1]);
    if (!project) notFound();
    return {
      title: `${project.title[locale]} — ${siteContent.identity.name[locale]}`,
      description: project.summary[locale],
    };
  }
  if (segments.length !== 1 || !corePages.includes(segments[0])) notFound();
  const page = segments[0];
  const titles = {
    projects: copy[locale].projects,
    about: copy[locale].about,
    resume: copy[locale].resume,
    "work-together": copy[locale].work,
    contact: copy[locale].contact,
  };
  return {
    title: `${titles[page as keyof typeof titles]} — ${siteContent.identity.name[locale]}`,
    description: pageDescriptions[page][locale],
  };
}

export function generateStaticParams() {
  const pageRoutes = corePages.map((page) => ({
    segments: page ? [page] : [],
  }));
  const caseRoutes = siteContent.projects.map((project) => ({
    segments: ["projects", project.slug],
  }));
  return [...pageRoutes, ...caseRoutes];
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = routeContent(locale, segments);
  const suffix = segments.length ? `/${segments.join("/")}` : "";
  const canonical = `${siteContent.identity.origin}${chromaRoot}/${locale}${suffix}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteContent.identity.origin}${chromaRoot}/en${suffix}`,
        ja: `${siteContent.identity.origin}${chromaRoot}/ja${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === "en" ? "en_US" : "ja_JP",
      type: "website",
    },
  };
}

export default async function ChromaPage({ params, searchParams }: RouteProps) {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  routeContent(locale, segments);
  if (segments.length === 0) return <ChromaHome locale={locale} />;
  if (segments[0] === "about") return <ChromaAbout locale={locale} />;
  if (segments[0] === "resume") return <ChromaResume locale={locale} />;
  if (segments[0] === "work-together")
    return <ChromaWorkTogether locale={locale} />;

  const query = await searchParams;
  const areaValue = typeof query.area === "string" ? query.area : undefined;
  const area = isArea(areaValue) ? areaValue : undefined;
  if (segments[0] === "contact")
    return (
      <ChromaContact
        locale={locale}
        project={
          typeof query.project === "string"
            ? findProject(query.project)
            : undefined
        }
      />
    );
  if (segments.length === 1)
    return <ChromaCollection locale={locale} area={area} />;
  return (
    <ChromaCaseStudy
      locale={locale}
      project={findProject(segments[1])!}
      area={area}
    />
  );
}
