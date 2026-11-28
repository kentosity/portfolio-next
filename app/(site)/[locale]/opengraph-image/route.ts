import { notFound } from "next/navigation";
import { isLocale } from "@/app/content/model";
import { socialImage } from "@/components/social-image";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return socialImage(locale);
}
