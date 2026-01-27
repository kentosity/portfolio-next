import fs from "fs";
import path from "path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Get all project slugs
function getProjectSlugs() {
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const files = fs.readdirSync(projectsDir);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(".md", ""));
}

// Get project content
function getProjectContent(slug: string) {
  const filePath = path.join(process.cwd(), "public", "projects", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf-8");
}

// Generate static params for all projects
export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Markdown component
function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm md:prose-base max-w-none text-slate-700 prose-headings:text-slate-900 prose-headings:font-semibold prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:text-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm break-words [&>*]:break-words">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getProjectContent(slug);

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
            <a href="/" className="text-sm font-semibold text-slate-900 hover:text-[var(--accent)]">
              ← Portfolio に戻る
            </a>
          </div>
        </header>
        <main className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h1 className="text-3xl font-semibold text-slate-900">Project not found</h1>
            <p className="mt-2 text-slate-600">申し訳ありません。このプロジェクトが見つかりません。</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <a href="/#projects" className="text-sm font-semibold text-slate-900 hover:text-[var(--accent)]">
            ← Projects に戻る
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
        <article className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <MarkdownContent content={content} />
        </article>

        <div className="flex gap-4">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ← Projects に戻る
          </a>
        </div>
      </main>
    </div>
  );
}
