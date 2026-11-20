import type { MetadataRoute } from "next";
import { shouldIndex, siteOrigin } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: shouldIndex
      ? {
          userAgent: "*",
          allow: ["/en", "/ja"],
          disallow: ["/projects/", "/portfolio/", "/lab/"],
        }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
