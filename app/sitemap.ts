import type { MetadataRoute } from "next";
import { locales } from "@/app/content/model";
import { corePages, siteContent } from "@/lib/content";
import { siteOrigin } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...corePages,
    ...siteContent.projects.map((project) => `projects/${project.slug}`),
  ];
  return locales.flatMap((locale) =>
    paths.map((path) => {
      const suffix = path ? `/${path}` : "";
      return {
        url: `${siteOrigin}/${locale}${suffix}`,
        alternates: {
          languages: {
            en: `${siteOrigin}/en${suffix}`,
            ja: `${siteOrigin}/ja${suffix}`,
            "x-default": `${siteOrigin}/en${suffix}`,
          },
        },
      };
    }),
  );
}
