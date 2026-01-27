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
  title: "飯塚健杜 | デザイン思考のフルスタックエンジニア",
  description:
    "アイデアから現実へ。React / Next.js / AWS を駆使して、スタートアップの成長を支えるエンジニア。インフラコスト 98.5% 削減の実績あり。ポートフォリオサイト。",
  keywords: ["フルスタックエンジニア", "Next.js", "React", "AWS", "スタートアップ", "ポートフォリオ"],
  robots: "noindex, nofollow",
  openGraph: {
    title: "飯塚健杜 | デザイン思考のフルスタックエンジニア",
    description: "アイデアから現実へ。React / Next.js / AWS を駆使してプロダクトを成長させます。",
    type: "website",
    url: "https://iizuka.dev", // 実際のURLに置き換えてください
    images: [
      {
        url: "https://iizuka.dev/profile.jpg",
        width: 320,
        height: 400,
        alt: "飯塚健杜",
      },
    ],
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
