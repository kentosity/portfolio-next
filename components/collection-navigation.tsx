"use client";

import { useEffect, type ReactNode } from "react";
import type { Locale } from "@/app/content/model";

import {
  readCollectionPosition,
  saveCollectionPosition,
} from "@/lib/collection-position";

export function CollectionNavigation({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    const position = readCollectionPosition(locale);
    if (
      position?.href !== `${window.location.pathname}${window.location.search}`
    )
      return;
    const animation = requestAnimationFrame(() =>
      window.scrollTo(0, position.scrollY),
    );
    return () => cancelAnimationFrame(animation);
  }, [locale]);

  return (
    <div
      onClick={(event) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest<HTMLAnchorElement>("a");
        if (anchor?.pathname.startsWith(`/${locale}/projects/`))
          saveCollectionPosition(locale);
      }}
    >
      {children}
    </div>
  );
}
