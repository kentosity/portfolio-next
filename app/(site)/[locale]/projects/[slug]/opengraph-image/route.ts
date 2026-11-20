import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { socialImage } from "@/components/social-image";
import { findProject } from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!isLocale(locale) || !project) notFound();
  return socialImage(locale, project);
}
