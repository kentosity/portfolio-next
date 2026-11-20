"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/app/content/copy";
import { basePath, route } from "../_components/routing";
import styles from "../generative.module.css";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith(`${basePath}/ja`) ? "ja" : "en";
  const text = copy[locale];
  return (
    <header className={styles.contactHero}>
      <h1>{text.notFound}</h1>
      <p>{text.notFoundText}</p>
      <div className={styles.heroLinks}>
        <Link className={styles.textLink} href={route(locale, "projects")}>
          {text.viewProjects}
        </Link>
        <Link className={styles.textLink} href={route(locale)}>
          {text.home}
        </Link>
      </div>
    </header>
  );
}
