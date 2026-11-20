import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales } from "@/app/content/model";
import { corePages, findProject, isArea, siteContent } from "@/lib/content";
import { copy, pageDescriptions } from "@/app/content/copy";
import { basePath, route } from "../_components/routing";
import {
  AboutPage,
  CasePage,
  CollectionPage,
  ContactPage,
  HomePage,
  ResumePage,
  WorkPage,
} from "../_components/pages";

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function resolvePath(path: string[] = []) {
  const [locale, page = "", slug, ...remaining] = path;
  if (
    !isLocale(locale) ||
    remaining.length ||
    (slug && page !== "projects") ||
    (!slug && !corePages.includes(page))
  )
    notFound();
  const project = slug ? findProject(slug) : undefined;
  if (slug && !project) notFound();
  return { locale, page, project };
}

export function generateStaticParams() {
  return [
    { path: [] },
    ...locales.flatMap((locale) => [
      ...corePages.map((page) => ({ path: page ? [locale, page] : [locale] })),
      ...siteContent.projects.map((project) => ({
        path: [locale, "projects", project.slug],
      })),
    ]),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  if (!path?.length) return { title: "Kento Iizuka | Generative archive" };
  const { locale, page, project } = resolvePath(path);
  const text = copy[locale];
  const title =
    project?.title[locale] ??
    (page
      ? text[
          page === "work-together"
            ? "work"
            : (page as "projects" | "about" | "contact" | "resume")
        ]
      : text.selected);
  const description =
    project?.summary[locale] ??
    pageDescriptions[page]?.[locale] ??
    siteContent.introduction[locale];
  const suffix = project ? `projects/${project.slug}` : page;
  return {
    title: `${title} | ${siteContent.identity.name[locale]}`,
    description,
    robots: { index: false, follow: false },
    metadataBase: new URL(siteContent.identity.origin),
    alternates: {
      canonical: route(locale, suffix),
      languages: {
        en: route("en", suffix),
        ja: route("ja", suffix),
        "x-default": route("en", suffix),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: route(locale, suffix),
      locale: locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: locale === "ja" ? "en_US" : "ja_JP",
      images: [
        { url: `${basePath}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${basePath}/opengraph-image`],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { path } = await params;
  if (!path?.length) redirect(route("en"));
  const { locale, page, project } = resolvePath(path);
  if (project) {
    const { area } = await searchParams;
    return (
      <CasePage
        locale={locale}
        project={project}
        area={typeof area === "string" && isArea(area) ? area : undefined}
      />
    );
  }
  switch (page) {
    case "projects": {
      const { area } = await searchParams;
      return (
        <CollectionPage
          locale={locale}
          area={typeof area === "string" && isArea(area) ? area : undefined}
        />
      );
    }
    case "about":
      return <AboutPage locale={locale} />;
    case "resume":
      return <ResumePage locale={locale} />;
    case "work-together":
      return <WorkPage locale={locale} />;
    case "contact": {
      const { project } = await searchParams;
      return (
        <ContactPage
          locale={locale}
          project={
            typeof project === "string" ? findProject(project) : undefined
          }
        />
      );
    }
    default:
      return <HomePage locale={locale} />;
  }
}
