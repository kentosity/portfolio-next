import { Analytics } from "@/components/analytics";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/content";
import "@/app/theme.css";

export default function LegacyLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Analytics />
        <SiteHeader locale="ja" />
        <main className="page-shell">{children}</main>
        <SiteFooter locale="ja" />
      </body>
    </html>
  );
}
