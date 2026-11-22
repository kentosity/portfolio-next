import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtStudy } from "../_components/art-study";
import { isStudyName, studies } from "../_components/studies";

export function generateStaticParams() {
  return Object.keys(studies).map((sketch) => ({ sketch }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sketch: string }>;
}): Promise<Metadata> {
  const { sketch } = await params;
  return {
    title: isStudyName(sketch) ? studies[sketch].title : "Study not found",
  };
}

export default async function ArtPage({
  params,
}: {
  params: Promise<{ sketch: string }>;
}) {
  const { sketch } = await params;
  if (!isStudyName(sketch)) notFound();
  return <ArtStudy name={sketch} key={sketch} />;
}
