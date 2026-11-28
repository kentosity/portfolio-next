# Atlas + Generative

A complete English/Japanese portfolio at `/lab/full/atlas-generative`, stacked on structure PR #10 (`196806c592270d4c718ea82cc29832240b9a1697`). The design combines Atlas PR #13 (`418b95d6df9115a774f62c8357bf9e64674b7e59`) and Generative PR #11 (`8603325d45c782cde4a159ec2baee946c33654d7`).

Atlas supplies the cobalt surround, light surfaces, large type, floating sheets, spatial workflow drawings and readable case-study layouts. Generative supplies the seeded computational drawings, construction view, variations and SVG exports. All drawing colors derive from the Atlas palette in `_components/palette.ts`, including construction mode and downloads.

The home sheets stack, lift and select individual projects. Collection cards carry the same seeded drawings into the cases. Each case pairs an artistic interpretation with an inspectable workflow, then explains the problem, contribution, decisions, supported results, artifacts and technology responsibilities. The event-platform case derives its approximate $200k to $10k annual cost comparison (~95%) from the shared record.

Project facts, chronology, translations, relationships and TODOs are derived from the existing typed public projection of the canonical resume in `app/content/site-content.ts`; the source model and generator are unchanged. Missing approved media, measurements, personal tradeoffs and reviewed PDF exports retain the structure's `TODO [stable-id]` treatment. The artwork is described as an interpretation; the workflow drawing is described as a conceptual reconstruction. The existing placeholder inventory remains in [site-structure.md](site-structure.md#content-placeholders).

## Routes

The entry route opens English. Each route below exists under both `/lab/full/atlas-generative/en` and `/lab/full/atlas-generative/ja`:

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

This gives 34 localized content routes. Unknown locales and cases return 404. Language changes preserve the project, filters, contact context and section anchor. Collection return restores its filter and scroll position. Preview metadata disables indexing.

Static SVG endpoints at `/lab/full/atlas-generative/prints/<project-slug>` reuse the generator and public record. The gallery and home use these cacheable images, avoiding repeated inline path data. Interactive prints render on demand, animate briefly in response to changes, and honor reduced motion. The page's primary content and navigation render with JavaScript disabled.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm run start -- --hostname 127.0.0.1 --port 3157
# In another terminal, using Node 22.18+:
PLAYWRIGHT_BROWSERS_PATH=/tmp/aide-proto/atlasgen-browsers npm run test:atlasgen
```

`BASE_URL` selects a deployed preview. `SHOT_DIR` defaults to `/tmp/aide-proto/shots`; `CAPTURE_PASS` adds a screenshot suffix. Chromium's browser sandbox remains enabled. `CHROMIUM_PATH` can select an installed isolated test browser.

The theme checks every route in both locales at 1440×900 and 390×844, and representative pages at 320, 768 and 1024 pixels. They cover localized text, section completeness, themed links, keyboard/touch sheet controls, filters/history/scroll restoration, language/anchor continuity, SVG variation/construction/download/restoration, reduced motion, supported annual cost figures, JavaScript-free case content, metadata and genuine 404s.

Home, work and local-speech case screenshots are captured in both languages on desktop and mobile, with full-page and viewport versions: `/tmp/aide-proto/shots/full-atlasgen-{home,work,case}-{desktop,mobile}-{en,ja}*.png`.

Validation completed locally: ESLint, TypeScript and production build passed; all 34 themed routes passed at desktop and mobile sizes, with 30 additional responsive layouts and the interaction checks above. The inherited site's 94 Playwright tests and three public-projection Python tests also passed. Screenshots were inspected across two passes; the second pass corrected a low-contrast stream drawing and captures completed animations.
