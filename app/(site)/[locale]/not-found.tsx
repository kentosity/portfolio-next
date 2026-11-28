"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { copy } from "@/app/content/copy";

export default function NotFound() {
  const locale = usePathname().startsWith("/ja") ? "ja" : "en";
  return (
    <div className="page-intro">
      <h1>{copy[locale].notFound}</h1>
      <p>{copy[locale].notFoundText}</p>
      <Link href={`/${locale}/projects`}>{copy[locale].projects} →</Link>
    </div>
  );
}
