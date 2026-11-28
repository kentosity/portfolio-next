"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { copy } from "@/app/content/copy";
import type { Locale } from "@/app/content/model";
import { isArea } from "@/lib/content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const text = copy[locale];
  const otherLocale = locale === "en" ? "ja" : "en";
  const equivalentPath = /^\/(en|ja)(?=\/|$)/.test(pathname)
    ? pathname.replace(/^\/(en|ja)(?=\/|$)/, `/${otherLocale}`)
    : `/${otherLocale}/projects`;
  const navigation = [
    ["projects", text.projects],
    ["about", text.about],
    ["contact", text.contact],
    ["resume", text.resume],
  ];

  function preserveLocation(event: React.MouseEvent<HTMLAnchorElement>) {
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(equivalentPath, currentUrl.origin);
    const area = currentUrl.searchParams.get("area") || undefined;
    if (isArea(area)) targetUrl.searchParams.set("area", area);
    const project = currentUrl.searchParams.get("project");
    if (project) targetUrl.searchParams.set("project", project);
    const section = currentUrl.hash.slice(1);
    const knownSections = [
      "projects",
      "about",
      "experience",
      "skills",
      "contact",
      "hiring",
      "purpose",
      "problem",
      "contribution",
      "built",
      "decisions",
      "results",
      "evaluation",
      "artifacts",
      "stack",
      "reflection",
      "related",
    ];
    if (knownSections.includes(section)) targetUrl.hash = section;
    event.currentTarget.href = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
  }

  return (
    <header className="site-header">
      <Link className="wordmark" href={`/${locale}`}>
        Kento Iizuka<span>飯塚健杜</span>
      </Link>
      <nav
        className="desktop-navigation"
        aria-label={
          locale === "en" ? "Main navigation" : "メインナビゲーション"
        }
      >
        {navigation.map(([path, label]) => (
          <Link
            key={path}
            href={`/${locale}/${path}`}
            aria-current={
              pathname === `/${locale}/${path}` ? "page" : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="navigation-utilities">
        <a
          href={equivalentPath}
          hrefLang={otherLocale}
          lang={otherLocale}
          onClick={preserveLocation}
        >
          {otherLocale === "en" ? "English" : "日本語"}
        </a>
        <details className="mobile-navigation">
          <summary>{text.menu}</summary>
          <nav aria-label={text.menu}>
            {navigation.map(([path, label]) => (
              <Link
                key={path}
                href={`/${locale}/${path}`}
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
