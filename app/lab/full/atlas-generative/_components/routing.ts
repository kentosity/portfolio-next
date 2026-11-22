import type { Locale, Project } from "@/app/content/model";
import type { PrintSource } from "./art";

export const basePath = "/lab/full/atlas-generative";

export function route(locale: Locale, path = "") {
  const suffix = path.replace(/^\//, "");
  return `${basePath}/${locale}${suffix ? `/${suffix}` : ""}`;
}

export function printSource(
  project: Pick<Project, "slug" | "stack" | "area">,
  reviewed: string,
): PrintSource {
  const kinds = {
    "salon-data-platform": "current",
    "local-speech": "voice",
    "event-platform": "routes",
    "subsidy-search-pilot": "search",
  } as const;
  const kind =
    kinds[project.slug as keyof typeof kinds] ??
    (project.area === "ai-tools"
      ? "search"
      : project.area === "data-systems"
        ? "routes"
        : "current");
  return {
    title: project.slug,
    stack: project.stack.map((technology) => technology.name).join(","),
    reviewed,
    kind,
  };
}

export const interpretations = {
  current: {
    en: "Parallel streams gather and separate. The print interprets a system that gives each step a clear responsibility.",
    ja: "平行な流れが集まり、また分かれます。それぞれの段階に役割を持たせる仕組みから着想した図案です。",
  },
  voice: {
    en: "Nested waves gather around a quiet center. The print interprets speech as a sequence of connected signals.",
    ja: "静かな中心を囲んで、波を重ねています。音声を、つながる信号の連続として表しました。",
  },
  routes: {
    en: "Families of paths share their turns. The print interprets the reuse of a small set of working parts.",
    ja: "いくつもの経路が同じ曲がり角を共有します。少数の部品を再利用する構成を線で表しました。",
  },
  search: {
    en: "A field of possibilities resolves into a common outline. The print interprets the act of organizing a search.",
    ja: "広がる候補が、一つの輪郭をつくります。検索の条件や結果を整理する過程から着想しました。",
  },
};
