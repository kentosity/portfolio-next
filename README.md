# Kento Iizuka’s portfolio

A bilingual, work-first Next.js site. Home leads with four case studies. The collection contains 12 reviewed projects grouped by purpose. Page components and content use semantic classes; `app/theme.css` owns the visual treatment.

## Run and verify

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
python3 -m unittest discover -s tests -p 'test_*.py'
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright runs every core route in desktop Chromium and a mobile Chromium device profile. It also checks filters/history/scroll, language and section continuity, email prompts, JavaScript-free content, 33 historical slugs, genuine 404s, canonical/alternate metadata, sitemap, review headers and 1200×630 PNG social covers. Set `PLAYWRIGHT_BASE_URL` to check a deployment. Set `SCREENSHOT_DIR` to save both locales’ Home, collection and local-speech case screenshots in a shared directory.

## Content and presentation

- `app/content/site-content.ts` is the single typed public record consumed by pages, project selections, related work, career content, metadata and social covers. Its schema is in `app/content/model.ts`.
- `scripts/generate-content.py` projects an explicit allowlist from the canonical `kentosity/resume/profile.json`. It adds the approved curation and evidence-based case outlines. Internal evidence, source paths and private notes are excluded. Edit factual claims in the canonical profile; edit presentation curation and outline wording in the generator. Regenerate the public record rather than editing it independently.
- `app/content/approved-career-updates.json` records the user’s approved public career amendments from November 27, 2026. The generator applies them after the canonical projection, including one EpicPull project for ZenCard and one ZenCard contract role. Their provenance is recorded separately from the canonical source revision. `python3 scripts/generate-content.py --apply-approved-updates` applies them to the existing public snapshot; adding `--check` verifies it without writing.
- `app/content/copy.ts` owns navigation, interface copy and page descriptions in English and Japanese.
- `components/pages/` contains the page compositions, `components/content.tsx` contains shared content elements, and `app/theme.css` contains the theme. Route modules validate inputs and connect pages to the model. The independent visual prototypes can be integrated through these boundaries.

```sh
python3 scripts/generate-content.py --profile /path/to/resume/profile.json
python3 scripts/generate-content.py --profile /path/to/resume/profile.json --check
```

The projection records its source revision and profile review date. The contact address comes from the existing public contact record and carries an explicit approval TODO. All content gaps use `TODO [stable-id]: localized request`. The route and placeholder inventories are in [docs/site-structure.md](docs/site-structure.md).

## Routes and migration

English is the default: `/` permanently redirects to `/en`. Both `/en` and `/ja` have Home, Projects, About, Resume, Work together, Contact, and the same 12 case slugs. Project areas use `?area=ai-tools`, `?area=data-systems`, or `?area=products-websites`; the clean collection URL shows all 12.

`/portfolio` redirects to `/ja` and the Japanese home retains the historical section anchors. Both old project URL families redirect selected canonical names and their five aliases through the shared project records. The 17 earlier pages retain their original content at `/projects/[slug]`, carry a review notice and `noindex`, and use one canonical URL. Unknown slugs return 404. The complete 33-file inventory is checked against the explicit publication selection.

## SEO and review policy

`lib/site-policy.ts` supplies the canonical origin and indexing policy. Metadata uses the existing portfolio origin until `NEXT_PUBLIC_SITE_URL` is confirmed. Each reviewed page has a localized title/description, self-canonical, reciprocal EN/JA and x-default alternates, Person data, and a localized social cover. Cases include CreativeWork and breadcrumb data. Filter variants canonicalize to the collection. The sitemap includes the 36 reviewed bilingual pages and omits guessed modification dates.

Indexing remains disabled by default in HTML, HTTP headers and robots. A later authorized production launch can set `SITE_INDEXABLE=true` together with `VERCEL_ENV=production`. Preview environments remain excluded even if the indexing flag is set. Existing analytics run only in Vercel production. PDF exports and case recordings/screenshots remain visible content TODOs until approved files are supplied.

The social cover embeds a 133 KB static subset of [Noto Sans JP](https://github.com/google/fonts/tree/main/ofl/notosansjp), licensed under [OFL](assets/OFL.txt). When adding Japanese cover text, regenerate `assets/social-font.ttf` with `fonttools` installed and the original font downloaded from that directory:

```sh
python3 scripts/prepare-social-font.py --font '/path/to/NotoSansJP[wght].ttf'
```
