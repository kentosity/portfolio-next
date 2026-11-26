import type { ReactNode } from "react";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { isLocale, locales } from "@/app/content/model";
import { palette, paletteVariables } from "../_components/palette";
import { PortfolioThemeColor } from "../_components/theme-color";
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

export default async function PortfolioLayout({
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
        <PortfolioThemeColor />
        {children}
      </body>
    </html>
  );
}
