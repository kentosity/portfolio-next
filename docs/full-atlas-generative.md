# Atlas + Generative

A complete English/Japanese portfolio at `/lab/full/atlas-generative`, stacked on structure PR #10 (`196806c592270d4c718ea82cc29832240b9a1697`). The design combines Atlas PR #13 (`418b95d6df9115a774f62c8357bf9e64674b7e59`) and Generative PR #11 (`8603325d45c782cde4a159ec2baee946c33654d7`).

Atlas supplies the cobalt surround, light surfaces, large type, floating sheets, spatial workflow drawings and readable case-study layouts. Generative supplies the seeded computational drawings, construction view, variations and SVG exports. All drawing colors derive from the Atlas palette in `_components/palette.ts`, including construction mode and downloads.

The home sheets stack, lift and select individual projects. Collection cards carry the same seeded drawings into the cases. Each case pairs an artistic interpretation with an inspectable workflow, then explains the problem, contribution, decisions, supported results, artifacts and technology responsibilities. Event-platform results describe the infrastructure-cost reduction without a public dollar figure.

Project facts, chronology, translations, relationships are derived from the existing typed public projection of the canonical resume in `app/content/site-content.ts`; the generator also applies the user-approved career amendments in `app/content/approved-career-updates.json`. Missing approved media, measurements, personal tradeoffs and reviewed PDF exports are omitted from public pages rather than shown as placeholders. The artwork is described as an interpretation; the workflow drawing is described as a conceptual reconstruction.

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
- `/projects/epicpull`

This gives 36 localized content routes. Unknown locales and cases return 404. Language changes preserve the project, filters, contact context and section anchor. Collection return restores its filter and scroll position. Preview metadata disables indexing.

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

`BASE_URL` selects a deployed preview. `SHOT_DIR` defaults to `/tmp/aide-proto/shots`; `CAPTURE_PREFIX` selects the filename prefix (default `full-atlasgen`); `CAPTURE_PASS` adds a screenshot suffix. Chromium's browser sandbox remains enabled. `CHROMIUM_PATH` can select an installed isolated test browser.

The theme checks every route in both locales at 1440×900 and 390×844, and representative pages at 320, 768 and 1024 pixels. They cover localized text, section completeness, themed links, keyboard/touch sheet controls, filters/history/scroll restoration, language/anchor continuity, SVG variation/construction/download/restoration, reduced motion, supported annual cost figures, JavaScript-free case content, metadata and genuine 404s.

Home, work and local-speech case screenshots are captured in both languages on desktop and mobile, with full-page and viewport versions: `/tmp/aide-proto/shots/full-atlasgen-{home,work,case}-{desktop,mobile}-{en,ja}*.png`.

Validation completed locally: ESLint, TypeScript and production build passed; all 34 themed routes passed at desktop and mobile sizes, with 30 additional responsive layouts and the interaction checks above. The inherited site's 94 Playwright tests and three public-projection Python tests also passed. Screenshots were inspected across two passes; the second pass corrected a low-contrast stream drawing and captures completed animations.


## Problem-led polish

The collection, home sheets, featured entries and case-study headers lead with the problem. Entries show what was built and the supported result; case headers repeat that framing. Event-platform results describe the infrastructure-cost reduction without a public dollar figure. All other results and implementation descriptions reuse the existing public project records, including their prototype and personal-installation stages. Evidence placeholders have been removed from the case studies.

Four colored filing tabs group the work by repeatable operations, coordination, finding/sharing information and website updates. The theme-local editorial headings and group assignments live in `_components/problems.ts`; project facts remain in the shared content. `?problem=operations|coordination|information|publishing` provides native-link filtering with or without JavaScript. Filters persist through cases, language switching and collection return. Legacy `?area=` links still work; an unknown problem filter shows the full collection.

The pale project sheets use stable group colors, a folded corner, offset edges and a small hover/focus lift. Typography, spacing, touch targets, Japanese identity text and mobile costs have been refined. Motion follows the existing reduced-motion preference. No new runtime dependencies were added.

```sh
npm run start -- --hostname 127.0.0.1 --port 3159
BASE_URL=http://127.0.0.1:3159 CAPTURE_PREFIX=polish CAPTURE_PASS=final \
  PLAYWRIGHT_BROWSERS_PATH=/tmp/aide-proto/atlasgen-browsers npm run test:atlasgen
```

The extended theme suite verifies problem/built/result entries, every problem filter in EN/JA, matching case headings, locale and return continuity, invalid-filter handling and JavaScript-free filtering. It also captures the event case and individual sheets alongside home, work and speech cases. Screenshots are saved as `/tmp/aide-proto/shots/polish-{home,work,case,event}-{desktop,mobile}-{en,ja}-final*.png` and `polish-{entry,featured}-{desktop,mobile}-final.png`.

Polish validation: ESLint, TypeScript, production build, all 34 themed routes on desktop/mobile, 30 additional responsive layouts, the interaction checks above, 94 inherited Playwright tests and three public-projection tests passed. EN/JA desktop/mobile screenshots were inspected in two design passes; the final pass tightens mobile collection headings, aligns featured artwork.

## Root background and Safari tint

Both themed root layouts apply the `atlas-generative` class and shared palette variables to `html`. The root canvas and body use the same cobalt (`#1649cb`), including short pages and exposed canvas at either scroll boundary. The reset selectors require that root class. The layouts export Next.js `viewport` metadata with the initial cobalt `themeColor` and a light `colorScheme`; CSS also sets the light scheme.

The small client component reads the opaque background beneath the top center of the viewport and updates the existing theme-color meta tag. It follows the cobalt surround, paper panels and other colored surfaces on scroll, resize, restored pages and route changes, with updates scheduled through animation frames. Colors come from the rendered palette. The server-rendered cobalt metadata and backgrounds also work with JavaScript disabled.

```sh
npm run start -- --hostname 127.0.0.1 --port 3163
PLAYWRIGHT_BROWSERS_PATH=/tmp/aide-proto/atlasgen-browsers npx playwright install webkit
PLAYWRIGHT_BROWSERS_PATH=/tmp/aide-proto/atlasgen-browsers npm run test:atlasgen-theme
# Use BASE_URL and CAPTURE_PREFIX=atlasgen-theme-preview for the deployed preview.
```

The WebKit suite checks all 36 EN/JA routes on desktop and mobile, including a dark system preference, matching computed root/body backgrounds, a single theme-color meta tag matching the visible top surface, light color-scheme metadata, paper/sage section transitions, anchor loads, client navigation, Back restoration, resize, themed 404s, the entry redirect and isolation from `/en`. It also checks representative routes with JavaScript disabled under both system color preferences.

Home, contact and local-speech cases have top/bottom viewport screenshots in both locales and sizes. Each is paired with an 80px body translation that exposes the root canvas; these simulate overscroll edges. Native Safari toolbar rendering and OS rubber-band gestures require a real Safari/device check. Screenshots use `/tmp/aide-proto/shots/atlasgen-theme-*.png`; computed colors and browser errors are saved in `atlasgen-theme-results.json`.

## Career and header updates

EpicPull is one project built for ZenCard Inc. as a contractor, with an EN/JA case study under `/projects/epicpull` and the coordination problem filter. One ZenCard Inc. timeline item covers February–August 2026. The entry and case describe the implemented authentication, payments, wallet, buyback and migration work. The contract ended when the company shut down. FalconeX Inc. starts in February 2026; Introduction shows full-time CTO work from April 2020 to April 2024. The hero uses the simple AI Engineer title. The header provides a Home link and navigation.

The skills offset came from `.prose li + li`, which added 14px above every skill after TypeScript. That spacing now applies to prose lists while the flex skills list uses its own gap. `npm run test:atlasgen-career` verifies the single service/company entries, dates, titles, localized case and header, and records every skill item’s box, text box, padding, line-height and font-loading state in `atlasgen-career-results.json`. Desktop/mobile EN/JA entry, case and skills screenshots use `atlasgen-career-*.png`.

The theme suite records WebKit RSC prefetch access-control failures separately from application exceptions. These appeared during history/resize checks and are retained for the full-site audit; the background and theme-color assertions remain strict.

The header language switch reads `EN / JP` in both locales. Its current language has a pale filled background, and both links have 44px minimum touch targets. The existing route-aware links preserve the current page, filters, contact project and section anchor while switching between `/en` and `/ja`. `npm run test:atlasgen-language` checks the header on all 36 routes at desktop/mobile sizes, verifies both directions of context-preserving navigation and saves header screenshots and measurements as `atlasgen-language-*.png` and `atlasgen-language-results.json`.
