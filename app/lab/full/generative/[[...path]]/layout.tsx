import type { ReactNode } from "react";
import localFont from "next/font/local";
import { copy } from "@/app/content/copy";
import Header from "../_components/header";
import { route } from "../_components/routing";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import styles from "../generative.module.css";

const display = localFont({
  src: "../../../../../public/lab/full/generative/syne-medium.ttf",
  variable: "--font-print-display",
  display: "swap",
});

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const locale = path?.[0] === "ja" ? "ja" : "en";
  const text = copy[locale];

  return (
    <html lang={locale}>
      <body style={{ margin: 0 }}>
        <div lang={locale} className={`${display.variable} ${styles.site}`}>
          <a className={styles.skip} href="#main-content">
            {text.skip}
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <footer className={styles.footer}>
            <p>
              {siteContent.identity.name[locale]} ·{" "}
              {siteContent.identity.location[locale]}
            </p>
            <div>
              <Link href={route(locale, "work-together")}>{text.work}</Link>
              <Link href={route(locale, "contact")}>{text.contact}</Link>
              <a href={siteContent.links[0].url}>GitHub</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
