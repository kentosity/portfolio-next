import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { CaseStudyPage } from "@/components/pages/case-study";
import { findProject, siteContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return siteContent.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!isLocale(locale) || !project) notFound();
  return pageMetadata(locale, `projects/${project.slug}`, project);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!isLocale(locale) || !project) notFound();
  return <CaseStudyPage locale={locale} project={project} />;
}
