import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { paletteVariables } from "../full/atlas-generative/_components/palette";
import styles from "./_components/art.module.css";
import "./reset.css";

export const metadata: Metadata = {
  title: {
    default: "Art studies | Kento Iizuka",
    template: "%s | Art studies",
  },
  description:
    "Interactive artworks in liquid light, folded paper, woven type, and miniature worlds.",
  robots: { index: false, follow: false },
};

export default function ArtLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.page} style={paletteVariables}>
          <a className={styles.skip} href="#art-main">
            Skip to artwork
          </a>
          <header className={styles.header}>
            <Link className={styles.brand} href="/lab/full/atlas-generative/en">
              Kento Iizuka
            </Link>
            <nav aria-label="Main navigation">
              <Link href="/lab/art" aria-current="page">
                Art studies
              </Link>
              <Link href="/lab/full/atlas-generative/en">Portfolio</Link>
            </nav>
          </header>
          <main id="art-main">{children}</main>
          <footer className={styles.footer}>
            An ongoing study of how things fit together.
          </footer>
        </div>
      </body>
    </html>
  );
}
