import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import styles from "./_components/thread.module.css";

export default async function ThreadLayout({
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
      <body className={styles.site}>{children}</body>
    </html>
  );
}
