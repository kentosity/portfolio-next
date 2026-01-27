import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "飯塚健杜 | フルスタックエンジニア",
  description:
    "React / Next.js / AWS を活用したフルスタックエンジニア。イベント管理システムやB2B SaaSの開発を通じて、スタートアップの技術課題解決とプロダクト成長に貢献。",
  keywords: ["フルスタックエンジニア", "Next.js", "React", "AWS", "サーバーレス", "スタートアップ"],
  robots: "noindex, nofollow",
  openGraph: {
    title: "飯塚健杜 | フルスタックエンジニア",
    description: "React / Next.js / AWS を活用したフルスタックエンジニア。イベント管理システムやB2B SaaSの開発を通じて、スタートアップの技術課題解決とプロダクト成長に貢献。",
    type: "website",
    locale: "ja_JP",
    url: "https://iizuka.dev",
    siteName: "飯塚健杜 ポートフォリオ",
    images: [
      {
        url: "https://iizuka.dev/profile.jpg",
        width: 1200,
        height: 630,
        alt: "飯塚健杜 - フルスタックエンジニア",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "飯塚健杜 | フルスタックエンジニア",
    description: "React / Next.js / AWS を活用したフルスタックエンジニア。イベント管理システムやB2B SaaSの開発経験。",
    images: ["https://iizuka.dev/profile.jpg"],
  },
  other: {
    "X-Robots-Tag": "noindex, nofollow, noarchive, nocache",
    "googlebot": "noindex",
    "bingbot": "noindex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
