import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import careerProfile from "./content/career-profile.json";

const profileTitle = `${careerProfile.name} | FalconeX・フルスタックエンジニア`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profileTitle,
  description:
    careerProfile.hero_summary,
  keywords: ["フルスタックエンジニア", "Next.js", "React", "AWS", "サーバーレス", "スタートアップ"],
  robots: "noindex, nofollow",
  openGraph: {
    title: profileTitle,
    description: careerProfile.hero_summary,
    type: "website",
    locale: "ja_JP",
    url: careerProfile.links.portfolio,
    siteName: "飯塚健杜 ポートフォリオ",
    images: [
      {
        url: `${careerProfile.links.portfolio}/profile.jpg`,
        width: 1200,
        height: 630,
        alt: "飯塚健杜 - フルスタックエンジニア",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profileTitle,
    description: careerProfile.hero_summary,
    images: [`${careerProfile.links.portfolio}/profile.jpg`],
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q2001QRBBW"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q2001QRBBW');
            `,
          }}
        />
        <Script
          id="clarity-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v87uz3er5b");
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
