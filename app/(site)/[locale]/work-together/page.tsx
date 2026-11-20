import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { WorkTogetherPage } from "@/components/pages/supporting";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "work-together");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WorkTogetherPage locale={locale} />;
}
