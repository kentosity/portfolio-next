import { siteContent } from "../app/content/site-content";

const fallbackOrigin = siteContent.identity.origin;
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;

export const siteOrigin =
  configuredOrigin && !configuredOrigin.includes("murex-nine")
    ? configuredOrigin
    : fallbackOrigin;

export const shouldIndex = process.env.VERCEL_ENV === "production";
