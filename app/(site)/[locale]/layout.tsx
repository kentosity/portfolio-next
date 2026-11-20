import { Analytics } from "@/components/analytics";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { copy } from "@/app/content/copy";
import { isLocale, locales } from "@/app/content/model";
import { JsonLd, SiteFooter } from "@/components/content";
import { SiteHeader } from "@/components/site-header";
import { personSchema } from "@/lib/metadata";
import "@/app/theme.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <Analytics />
        <a className="skip-link" href="#main-content">
          {copy[locale].skip}
        </a>
        <SiteHeader locale={locale} />
        <main id="main-content" className="page-shell">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <JsonLd value={personSchema(locale)} />
      </body>
    </html>
  );
}
