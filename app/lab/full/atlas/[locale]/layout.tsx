import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { isLocale, locales } from "@/app/content/model";
import "./reset.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AtlasLayout({
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
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
