import Link from "next/link";

export default function ChromaNotFound() {
  return (
    <section style={{ padding: "4rem 0" }}>
      <h1>Page not found / ページが見つかりません</h1>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/lab/full/chroma/en/projects">Explore the projects</Link> /{" "}
        <Link href="/lab/full/chroma/ja/projects">プロジェクトを見る</Link>
      </p>
    </section>
  );
}
