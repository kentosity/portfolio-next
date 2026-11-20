# Thread: complete portfolio direction

This theme is based on the building structure commit `196806c` in PR #10. The pages import the shared typed content from `app/content/site-content.ts`, the shared copy and area taxonomy, and the existing TODO component. The theme adds its own root layout, route renderer, woven SVGs and small client interactions.

The woven drawings describe the documented responsibilities and flow. Project screens, recordings and public artifact links use the inherited TODOs until approved material is supplied. The event-platform cost figure derives from the shared metric: approximately $200,000 to $10,000 per year, about 95%.

## Routes

`/lab/full/thread` redirects to the English home. Both languages have the same 17 pages.

| English | Japanese |
| --- | --- |
| `/lab/full/thread/en` | `/lab/full/thread/ja` |
| `/lab/full/thread/en/projects` | `/lab/full/thread/ja/projects` |
| `/lab/full/thread/en/about` | `/lab/full/thread/ja/about` |
| `/lab/full/thread/en/resume` | `/lab/full/thread/ja/resume` |
| `/lab/full/thread/en/work-together` | `/lab/full/thread/ja/work-together` |
| `/lab/full/thread/en/contact` | `/lab/full/thread/ja/contact` |
| `/lab/full/thread/en/projects/salon-data-platform` | `/lab/full/thread/ja/projects/salon-data-platform` |
| `/lab/full/thread/en/projects/local-speech` | `/lab/full/thread/ja/projects/local-speech` |
| `/lab/full/thread/en/projects/event-platform` | `/lab/full/thread/ja/projects/event-platform` |
| `/lab/full/thread/en/projects/subsidy-search-pilot` | `/lab/full/thread/ja/projects/subsidy-search-pilot` |
| `/lab/full/thread/en/projects/agent-coordination` | `/lab/full/thread/ja/projects/agent-coordination` |
| `/lab/full/thread/en/projects/event-ticketing` | `/lab/full/thread/ja/projects/event-ticketing` |
| `/lab/full/thread/en/projects/snap-photobooth` | `/lab/full/thread/ja/projects/snap-photobooth` |
| `/lab/full/thread/en/projects/architecture-portfolio` | `/lab/full/thread/ja/projects/architecture-portfolio` |
| `/lab/full/thread/en/projects/falconex-site` | `/lab/full/thread/ja/projects/falconex-site` |
| `/lab/full/thread/en/projects/markdown-sharing` | `/lab/full/thread/ja/projects/markdown-sharing` |
| `/lab/full/thread/en/projects/ongy-viewer` | `/lab/full/thread/ja/projects/ongy-viewer` |

Collection `?area=` values come from the shared taxonomy. A case preserves the collection filter in its language switch and return links. Contact `?project=` preserves the selected project in its language switch and email subject/body. Unknown cases return HTTP 404.

## Content still requested

The visible TODO boxes use the structure’s existing IDs and copy. Each case renders its five existing TODOs: context, decisions, evidence, artifacts and reflection.

| Project | Existing TODO IDs |
| --- | --- |
| `salon-data-platform` | `salon-data-platform-context`, `salon-data-platform-decisions`, `salon-data-platform-artifacts`, `salon-data-platform-evidence`, `salon-data-platform-reflection` |
| `local-speech` | `local-speech-context`, `local-speech-decisions`, `local-speech-artifacts`, `local-speech-evidence`, `local-speech-reflection` |
| `event-platform` | `event-platform-context`, `event-platform-decisions`, `event-platform-artifacts`, `event-platform-evidence`, `event-platform-reflection` |
| `subsidy-search-pilot` | `subsidy-search-pilot-context`, `subsidy-search-pilot-decisions`, `subsidy-search-pilot-artifacts`, `subsidy-search-pilot-evidence`, `subsidy-search-pilot-reflection` |
| `agent-coordination` | `agent-coordination-context`, `agent-coordination-decisions`, `agent-coordination-artifacts`, `agent-coordination-evidence`, `agent-coordination-reflection` |
| `event-ticketing` | `event-ticketing-context`, `event-ticketing-decisions`, `event-ticketing-artifacts`, `event-ticketing-evidence`, `event-ticketing-reflection` |
| `snap-photobooth` | `snap-photobooth-context`, `snap-photobooth-decisions`, `snap-photobooth-artifacts`, `snap-photobooth-evidence`, `snap-photobooth-reflection` |
| `architecture-portfolio` | `architecture-portfolio-context`, `architecture-portfolio-decisions`, `architecture-portfolio-artifacts`, `architecture-portfolio-evidence`, `architecture-portfolio-reflection` |
| `falconex-site` | `falconex-site-context`, `falconex-site-decisions`, `falconex-site-artifacts`, `falconex-site-evidence`, `falconex-site-reflection` |
| `markdown-sharing` | `markdown-sharing-context`, `markdown-sharing-decisions`, `markdown-sharing-artifacts`, `markdown-sharing-evidence`, `markdown-sharing-reflection` |
| `ongy-viewer` | `ongy-viewer-context`, `ongy-viewer-decisions`, `ongy-viewer-artifacts`, `ongy-viewer-evidence`, `ongy-viewer-reflection` |

Other existing TODOs shown on About, Resume, Work together and Contact:

- `hiring-preferences`: Confirm hiring focus, location/remote arrangements, relocation/travel preferences and public availability wording.
- `working-languages`: Confirm the public wording of working-language proficiency.
- `public-identity`: Confirm this name presentation, public contact email and professional links.
- `production-domain`: Confirm the final production domain; metadata currently uses the existing portfolio origin.
- `client-engagement`: Confirm the contracting party, work offered, actual availability, engagement sequence, deliverables and any pricing or response-time wording.
- `portrait-and-interests`: Supply an approved portrait/name treatment, a personal story about organizing systems and any interests or sketches to share.
- `resume-pdf-en`: Review a new public-safe English PDF export from the canonical profile, including contact details and project links.
- `resume-pdf-ja`: Review a new public-safe Japanese PDF export from the canonical profile, including contact details and project links.

## Checks and screenshots

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Start the built site, then run:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3068 pnpm exec playwright test --config playwright.thread.config.ts
node scripts/capture-thread.mjs final
```

Install Playwright Chromium once if needed. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` optionally selects an existing test browser. The capture script accepts `PLAYWRIGHT_BASE_URL` and writes viewport, full-page and results-section screenshots for home, collection and the event-platform case, in EN and JA, at 1440×900 and 390×844.

The route suite covers all 34 pages on desktop and mobile, 320px and 768px reading paths, filter/language return paths, project selection and unweaving, workflow-stage selection, contextual email links, keyboard skip, reduced motion, server-rendered content and HTTP 404s.

Final screenshots use `/tmp/aide-proto/shots/full-thread-{home,collection,case}-{desktop,mobile}-{en,ja}-final.png`, with `-full.png` and case `-results.png` variants. First and second visual-review captures use `pass1` and `pass2`.

## Visual review

The first review covered the desktop and mobile home, collection and event-platform case, including Japanese and the annual-cost figure. The second pass shortened the English mobile headline to two lines and put the selected project link above the artwork. The final pass tightened the introduction and kept the supported cost result visible in the case introduction.

Fonts are the Newsreader and Instrument Sans files used by prototype commit `7ad177d`, served locally under this theme’s asset path.

## Verification

Lint, typecheck and production build pass. The final local Playwright run passes 84 checks across desktop, mobile and the additional 320px/768px reading paths. Three screenshot passes were captured and visually reviewed. All 34 themed routes use the shared content records; the shared TODO inventory remains visible in the applicable pages.
