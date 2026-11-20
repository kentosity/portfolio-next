import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { ContactPage } from "@/components/pages/supporting";
import { pageMetadata } from "@/lib/metadata";
import { findProject } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "contact");
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ project?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { project } = await searchParams;
  return (
    <ContactPage
      locale={locale}
      project={typeof project === "string" ? findProject(project) : undefined}
    />
  );
}
