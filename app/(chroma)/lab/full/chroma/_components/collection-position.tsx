"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { chromaRoot } from "./paths";
import styles from "./chroma.module.css";

export function CollectionPosition({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const storageKey = `chroma:collection:${locale}`;

  useEffect(() => {
    let frame: number | undefined;

    try {
      const savedPosition = JSON.parse(
        sessionStorage.getItem(storageKey) ?? "null",
      );
      const currentPath = `${window.location.pathname}${window.location.search}`;
      const shouldRestorePosition =
        savedPosition?.path === currentPath &&
        Number.isFinite(savedPosition?.scrollY);
      if (shouldRestorePosition)
        frame = requestAnimationFrame(() =>
          window.scrollTo(0, savedPosition.scrollY),
        );
    } catch {
      return;
    }

    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [storageKey]);

  return (
    <div
      onClick={(event) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest<HTMLAnchorElement>("a");
        const isProjectLink = anchor?.pathname.startsWith(
          `${chromaRoot}/${locale}/projects/`,
        );
        if (!isProjectLink) return;
        try {
          sessionStorage.setItem(
            storageKey,
            JSON.stringify({
              path: `${window.location.pathname}${window.location.search}`,
              scrollY: window.scrollY,
            }),
          );
        } catch {
          return;
        }
      }}
    >
      {children}
    </div>
  );
}

export function ReturnToCollection({
  locale,
  area,
}: {
  locale: Locale;
  area?: string;
}) {
  const query = area ? `?area=${area}` : "";
  return (
    <Link
      className={styles.textLink}
      href={`${chromaRoot}/${locale}/projects${query}`}
      scroll={false}
      data-collection-return
    >
      {copy[locale].back}
    </Link>
  );
}
