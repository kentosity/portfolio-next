import Link from "next/link";
import { copy } from "@/app/content/copy";

export default function NotFound() {
  return (
    <div className="page-intro">
      <h1>{copy.ja.notFound}</h1>
      <p>{copy.ja.notFoundText}</p>
      <Link href="/ja/projects">{copy.ja.projects} →</Link>
    </div>
  );
}
