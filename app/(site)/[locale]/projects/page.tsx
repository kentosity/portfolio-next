import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { CollectionNavigation } from "@/components/collection-navigation";
import { CollectionPage } from "@/components/pages/collection";
import { isArea } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "projects");
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ area?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { area } = await searchParams;
  const selectedArea =
    typeof area === "string" && isArea(area) ? area : undefined;
  return (
    <CollectionNavigation locale={locale}>
      <CollectionPage locale={locale} selectedArea={selectedArea} />
    </CollectionNavigation>
  );
}
