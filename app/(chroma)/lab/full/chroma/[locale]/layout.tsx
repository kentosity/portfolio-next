import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { copy } from "@/app/content/copy";
import { isLocale, locales } from "@/app/content/model";
import { siteContent } from "@/lib/content";
import { ChromaNavigation } from "../_components/navigation";
import { ChromaFooter } from "../_components/shared";
import styles from "../_components/chroma.module.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ChromaLayout({
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
      <body className={`${geistSans.variable} ${styles.body}`}>
        <div className={styles.site} lang={locale}>
          <a className={styles.skip} href="#chroma-content">
            {copy[locale].skip}
          </a>
          <div className={styles.frame}>
            <ChromaNavigation
              locale={locale}
              name={siteContent.identity.name[locale]}
            />
            <main id="chroma-content">{children}</main>
            <ChromaFooter locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
