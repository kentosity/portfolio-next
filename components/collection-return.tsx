"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/app/content/model";
import { copy } from "@/app/content/copy";
import { isArea } from "@/lib/content";
import { readCollectionPosition } from "@/lib/collection-position";

export function CollectionReturn({ locale }: { locale: Locale }) {
  const router = useRouter();
  return (
    <Link
      href={`/${locale}/projects`}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const currentUrl = new URL(window.location.href);
        const area = currentUrl.searchParams.get("area") || undefined;
        const collectionUrl = `/${locale}/projects${isArea(area) ? `?area=${area}` : ""}`;
        const savedPosition = readCollectionPosition(locale);
        const shouldRestorePosition = savedPosition?.href === collectionUrl;
        event.preventDefault();
        router.push(collectionUrl, { scroll: !shouldRestorePosition });
      }}
    >
      ← {copy[locale].back}
    </Link>
  );
}
