import type { ReactNode } from "react";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/content";
import { isLocale, locales } from "@/app/content/model";
import { personSchema } from "@/lib/metadata";
import { palette, paletteVariables } from "@/app/lab/full/atlas-generative/_components/palette";
import { PortfolioThemeColor } from "@/app/lab/full/atlas-generative/_components/theme-color";
import "./reset.css";

export const viewport: Viewport = {
  themeColor: palette.blue,
  colorScheme: "light",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

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
    <html lang={locale} className="atlas-generative" style={paletteVariables}>
      <body className={geist.variable}>
        <Analytics />
        <PortfolioThemeColor />
        {children}
        <JsonLd value={personSchema(locale)} />
      </body>
    </html>
  );
}
