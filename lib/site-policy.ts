import { siteContent } from "../app/content/site-content";

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || siteContent.identity.origin;
export const shouldIndex =
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV === "production";
