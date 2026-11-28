import { findProject, siteContent } from "@/lib/content";
import { createPrint } from "../../_components/art";
import { printSource } from "../../_components/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return siteContent.projects.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return new Response("Print not found", { status: 404 });

  const source = printSource(project, siteContent.source.reviewedOn);
  return new Response(createPrint(source, 0, false, "transparent"), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
