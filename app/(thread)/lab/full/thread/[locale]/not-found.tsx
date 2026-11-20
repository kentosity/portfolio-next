"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { copy } from "@/app/content/copy";
import styles from "./_components/thread.module.css";

export default function ThreadNotFound() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale === "ja" ? "ja" : "en";
  const text = copy[locale];
  return (
    <main className={styles.notFound}>
      <h1>{text.notFound}</h1>
      <p>{text.notFoundText}</p>
      <Link href={`/lab/full/thread/${locale}/projects`}>{text.projects}</Link>
      <Link href={`/lab/full/thread/${locale}`}>{text.home}</Link>
    </main>
  );
}
