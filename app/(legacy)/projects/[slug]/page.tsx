import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { copy } from "@/app/content/copy";
import { legacySlugs } from "@/lib/legacy";
import { siteOrigin } from "@/lib/metadata";

export function generateStaticParams() {
  return legacySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${slug} — Earlier work — Kento Iizuka`,
    robots: { index: false, follow: false },
    alternates: { canonical: `${siteOrigin}/projects/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!legacySlugs.includes(slug)) notFound();
  const content = await readFile(
    path.join(process.cwd(), "public", "projects", `${slug}.md`),
    "utf8",
  );
  return (
    <>
      <article className="legacy-prose">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </article>
      <Link href="/ja/projects">{copy.ja.projects} →</Link>
    </>
  );
}
