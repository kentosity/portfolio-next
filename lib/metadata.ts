import type { Metadata } from "next";
import { copy, pageDescriptions } from "@/app/content/copy";
import type { Locale, Project } from "@/app/content/model";
import { siteContent } from "./content";
import { shouldIndex, siteOrigin } from "./site-policy";

export { shouldIndex, siteOrigin };

export function pageMetadata(
  locale: Locale,
  path = "",
  project?: Project,
): Metadata {
  const name = siteContent.identity.name[locale];
  const pageLabel =
    path === "work-together"
      ? copy[locale].work
      : copy[locale][path as "projects" | "about" | "resume" | "contact"];
  const title = project
    ? `${project.title[locale]} — ${name}`
    : path
      ? `${pageLabel} — ${name}`
      : `${name} — ${siteContent.identity.role[locale]}`;
  const description =
    project?.summary[locale] ||
    pageDescriptions[path]?.[locale] ||
    siteContent.introduction[locale];
  const suffix = path ? `/${path}` : "";
  const url = `${siteOrigin}/${locale}${suffix}`;
  const imagePath = project
    ? `/${locale}/projects/${project.slug}/opengraph-image`
    : `/${locale}/opengraph-image`;
  const image = {
    url: `${siteOrigin}${imagePath}`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    robots: { index: shouldIndex, follow: shouldIndex },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteOrigin}/en${suffix}`,
        ja: `${siteOrigin}/ja${suffix}`,
        "x-default": `${siteOrigin}/en${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "Kento Iizuka",
      locale: locale === "en" ? "en_US" : "ja_JP",
      alternateLocale: locale === "en" ? "ja_JP" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteOrigin}/#person`,
    name: siteContent.identity.name[locale],
    alternateName: siteContent.identity.name[locale === "en" ? "ja" : "en"],
    jobTitle: siteContent.identity.role[locale],
    url: `${siteOrigin}/${locale}`,
    sameAs: siteContent.links.map((link) => link.url),
  };
}

export function projectSchema(project: Project, locale: Locale) {
  const projectUrl = `${siteOrigin}/${locale}/projects/${project.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title[locale],
      description: project.summary[locale],
      url: projectUrl,
      inLanguage: locale,
      contributor: { "@id": `${siteOrigin}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: copy[locale].home,
          item: `${siteOrigin}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy[locale].projects,
          item: `${siteOrigin}/${locale}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title[locale],
          item: projectUrl,
        },
      ],
    },
  ];
}
