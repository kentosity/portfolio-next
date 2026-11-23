import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtStudy } from "../_components/art-study";
import { isStudyName, studies } from "../_components/studies";
import { isRoundTwoName, roundTwo } from "../_components/round-two";
import { RoundTwoStudy } from "../_components/round-two-study";

export function generateStaticParams() {
  return [...Object.keys(studies), ...Object.keys(roundTwo)].map((sketch) => ({
    sketch,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sketch: string }>;
}): Promise<Metadata> {
  const { sketch } = await params;
  return {
    title: isRoundTwoName(sketch)
      ? roundTwo[sketch].title
      : isStudyName(sketch)
        ? studies[sketch].title
        : "Study not found",
  };
}

export default async function ArtPage({
  params,
}: {
  params: Promise<{ sketch: string }>;
}) {
  const { sketch } = await params;
  if (isRoundTwoName(sketch))
    return <RoundTwoStudy name={sketch} key={sketch} />;
  if (!isStudyName(sketch)) notFound();
  return <ArtStudy name={sketch} key={sketch} />;
}
