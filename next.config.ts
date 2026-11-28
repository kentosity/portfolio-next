import type { NextConfig } from "next";
import { siteContent } from "./app/content/site-content";
import { shouldIndex } from "./lib/site-policy";
import { legacySlugs } from "./lib/legacy";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/portfolio", destination: "/ja", permanent: true },
      {
        source: "/lab/full/atlas-generative",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/lab/full/atlas-generative/prints/:slug",
        destination: "/prints/:slug",
        permanent: true,
      },
      {
        source: "/lab/full/atlas-generative/:locale(en|ja)",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/lab/full/atlas-generative/:locale(en|ja)/:path*",
        destination: "/:locale/:path*",
        permanent: true,
      },
      ...siteContent.projects.flatMap((project) =>
        [project.slug, ...project.legacySlugs].flatMap((slug) => [
          {
            source: `/projects/${slug}`,
            destination: `/ja/projects/${project.slug}`,
            permanent: true,
          },
          {
            source: `/portfolio/projects/${slug}`,
            destination: `/ja/projects/${project.slug}`,
            permanent: true,
          },
        ]),
      ),
      ...siteContent.projects.flatMap((project) =>
        project.legacySlugs.map((slug) => ({
          source: `/:locale(en|ja)/projects/${slug}`,
          destination: `/:locale/projects/${project.slug}`,
          permanent: true,
        })),
      ),
      ...legacySlugs.map((slug) => ({
        source: `/portfolio/projects/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    const noindex = {
      headers: [
        { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      ],
    };
    return shouldIndex
      ? [{ source: "/projects/:path*", ...noindex }]
      : [{ source: "/:path*", ...noindex }];
  },
};

export default nextConfig;
