import type { Locale } from "@/app/content/model";

export type CollectionPosition = { href: string; scrollY: number };

export function readCollectionPosition(
  locale: Locale,
): CollectionPosition | undefined {
  try {
    const storedPosition = sessionStorage.getItem(`collection:${locale}`);
    if (!storedPosition) return;
    const position = JSON.parse(storedPosition);
    if (typeof position?.href === "string" && Number.isFinite(position.scrollY))
      return position;
  } catch {
    return;
  }
}

export function saveCollectionPosition(locale: Locale) {
  try {
    sessionStorage.setItem(
      `collection:${locale}`,
      JSON.stringify({
        href: `${window.location.pathname}${window.location.search}`,
        scrollY: window.scrollY,
      }),
    );
  } catch {
    return;
  }
}
