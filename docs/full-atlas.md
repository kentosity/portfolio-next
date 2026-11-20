# Atlas full-site direction

Atlas adds a complete cobalt architectural portfolio at `/lab/full/atlas` on top of the shared structure implementation (`196806c`, PR #10). The entry redirects to the English home. All project facts, translations, curation, stack responsibilities, metrics and TODO IDs derive from `app/content/site-content.ts`; `atlas-content.ts` adapts those records for the presentation.

The home lets visitors lift or stack four project floors and select a case. Each case has an inspectable three-room system plan, problem, contribution, implementation, decisions, results, artifacts, technology responsibilities, reflection and related work. The light drawing sheets support longer reading. The event-cost comparison uses the shared metric values.

Collection filters use the shared area definitions. The selection stays in the URL through case and language navigation. Collection scroll positions are saved locally and restored when returning. All interactions support keyboard and touch; reduced motion applies the same state changes immediately.

The shared `TODO [id]` markers remain visible for unprovided media, personal decision detail, measurements, reflections and reviewed resume PDFs. Diagrams are described as conceptual workflow reconstructions. They do not imply that product screenshots or new measurements were supplied.

## Routes

Each route below exists under both `/lab/full/atlas/en` and `/lab/full/atlas/ja`:

- `/`
- `/projects`
- `/about`
- `/resume`
- `/work-together`
- `/contact`
- `/projects/salon-data-platform`
- `/projects/local-speech`
- `/projects/event-platform`
- `/projects/subsidy-search-pilot`
- `/projects/agent-coordination`
- `/projects/event-ticketing`
- `/projects/snap-photobooth`
- `/projects/architecture-portfolio`
- `/projects/falconex-site`
- `/projects/markdown-sharing`
- `/projects/ongy-viewer`

This gives 34 localized content routes plus the default-language entry. Unknown locale and project routes return 404.

## Verification

Run `npm run lint`, `npm run typecheck`, and `npm run build` sequentially before `npm run start -- --port 3146`.

Run `CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:atlas` for the full route, localization, overflow, interaction, touch, keyboard, filter/return, reduced-motion and 404 checks. Chrome retains its browser sandbox. `BASE_URL`, `SHOT_DIR` and `CAPTURE_PASS` configure deployment checks and captures.

The test visits all 34 localized routes on 1440×900 desktop and 390×844 touch layouts, and representative pages at 320, 768 and 1024 pixels. Captures are written to `/tmp/aide-proto/shots/full-atlas-*.png`.
