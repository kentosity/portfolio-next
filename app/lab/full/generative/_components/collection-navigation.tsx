"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Area, Locale } from "@/app/content/model";
import { copy } from "@/app/content/copy";
import {
  readCollectionPosition,
  saveCollectionPosition,
} from "@/lib/collection-position";
import { route } from "./routing";
import styles from "../generative.module.css";

export function CollectionNavigation({
  locale,
  area,
  children,
}: {
  locale: Locale;
  area?: Area;
  children: ReactNode;
}) {
  useEffect(() => {
    const position = readCollectionPosition(locale);
    if (
      position?.href !== `${window.location.pathname}${window.location.search}`
    )
      return;
    const frame = requestAnimationFrame(() =>
      window.scrollTo(0, position.scrollY),
    );
    return () => cancelAnimationFrame(frame);
  }, [locale, area]);

  return (
    <div
      onClick={(event) => {
        const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
          "a",
        );
        if (anchor?.pathname.startsWith(`${route(locale, "projects")}/`))
          saveCollectionPosition(locale);
      }}
    >
      {children}
    </div>
  );
}

export function CollectionReturn({
  locale,
  area,
}: {
  locale: Locale;
  area?: Area;
}) {
  const router = useRouter();
  const href = `${route(locale, "projects")}${area ? `?area=${area}` : ""}`;

  return (
    <Link
      href={href}
      className={styles.textLink}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const savedPosition = readCollectionPosition(locale);
        event.preventDefault();
        router.push(href, { scroll: savedPosition?.href !== href });
      }}
    >
      {copy[locale].back}
    </Link>
  );
}
