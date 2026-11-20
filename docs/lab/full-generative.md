# Full generative archive

The complete direction lives at `/lab/full/generative`. Its entry redirects to `/lab/full/generative/en`. English and Japanese have the same 17 pages: six core pages and 11 project cases.

This branch starts at `196806c592270d4c718ea82cc29832240b9a1697` from the structure implementation in PR #10. It imports the shared typed project model, public content, ordering, translations, areas and TODO records. The theme adds presentation and computational artwork under its own route prefix.

## Content and routes

`app/content/site-content.ts` is the factual source for the theme. Its public projection comes from `kentosity/resume` at `cd52952d4b0938289bd505e5606387d8d2451f51`. The private source was verified on Pro. Eleven selected projects and the approximate annual event-platform cost change of $200,000 to $10,000, about 95%, match that record. Home follows the structure proposal's four-project selection and ordering.

For each `{locale}` in `en` and `ja`, prefix these routes with `/lab/full/generative/{locale}`:

| Page                   | Suffix                             |
| ---------------------- | ---------------------------------- |
| Home                   | `/`                                |
| Collection             | `/projects`                        |
| About                  | `/about`                           |
| Resume                 | `/resume`                          |
| Work together          | `/work-together`                   |
| Contact                | `/contact`                         |
| Salon data integration | `/projects/salon-data-platform`    |
| Local speech           | `/projects/local-speech`           |
| Event platform         | `/projects/event-platform`         |
| Subsidy search         | `/projects/subsidy-search-pilot`   |
| Agent coordination     | `/projects/agent-coordination`     |
| Ticketing              | `/projects/event-ticketing`        |
| SNAP                   | `/projects/snap-photobooth`        |
| Architecture portfolio | `/projects/architecture-portfolio` |
| FalconeX website       | `/projects/falconex-site`          |
| Markdown sharing       | `/projects/markdown-sharing`       |
| Ongy                   | `/projects/ongy-viewer`            |

The route `/lab/full/generative/opengraph-image` serves the 1200×630 PNG cover. Page metadata has localized titles, descriptions, language alternates and a large social card. Preview pages retain `noindex`.

Each case includes the problem, contribution and context, a workflow drawing, recorded implementation decisions, results, artifacts, technology responsibilities, reflection and related work. The event case derives its cost graphic from the shared metric. Pending content uses `TODO [stable-id]: localized request`; all 63 inherited TODO IDs remain represented across the two locales. The full inventory is in [the structure documentation](../site-structure.md#content-placeholders). Approved project media, richer decision accounts, measurement methods, evaluation results and reviewed PDF exports remain content to supply.

## Design and artwork

The palette continues the prototype: a cool wall (`#f1f3f5`), graphite (`#252c32`), cobalt (`#3554b5`), paper (`#faf9f2`) and a muted red ink (`#a64b3c`). A locally hosted, licensed Syne face carries the large headings. Helvetica Neue, Arial and system Japanese sans carry the reading text. Staggered framed prints introduce the work; the collection pairs smaller prints with their purpose, and cases pair a large print with a readable contribution summary.

### Measured drift

Parallel marks carry a common rule while retaining their individual paths. A stable project identity, ordered technology stack and review date produce the seed. That makes an original reproducible and lets a visitor return to it exactly after exploring variations.

Each featured project has a different family of constraints. Speech uses nested oscillations, the event platform uses shared turns, data integration uses gathering currents, and the search prototype uses nested polygonal outlines. These are artistic interpretations of project descriptions. Technology counts control the number of channels or harmonic frequency.

The composition keeps a quiet margin around dense internal relationships. Fine traces accumulate into a shape that reads at a distance, then reveals its construction on inspection. The surrounding typography and frames give the four algorithms a shared home.

Time is a response to the visitor. Varying a print briefly brings its twelve path groups into alignment. The drawing then becomes still. Construction inspection reveals selected traces, and SVG export saves the exact current composition. Workflow marks use the same line vocabulary to let a reader highlight one responsibility within a larger system.

## Interaction and accessibility

- Cases offer variation, construction, exact restore and SVG download controls. Keyboard activation and touch use the same buttons.
- The workflow diagram derives its stages directly from `project.workflow`. Selecting a mark emphasizes that stage and updates a status message.
- The collection has URL-based area filters, result counts and a reset. Returning from a case restores a saved collection position through the shared position helper.
- Language links retain the current page, query and section. Every document declares its route language, including server-rendered Japanese pages.
- Titles, summaries, case text and navigation render as HTML. Decorative SVGs stay outside the accessibility tree. Focus is visible and controls have comfortable targets.
- Reduced motion shows the completed composition immediately, and a preference change cancels an active arrangement. There is no idle animation loop.

## Verification

Run `npm run lint`, `npm run typecheck` and `npm run build`. The full Playwright suite includes the structure tests and `tests/full-generative.spec.ts`; set `PLAYWRIGHT_BASE_URL` to an existing production server when using a port other than the configured 3100.

The first visual pass reduced home and case print sizes and widened the Japanese language control. The second tightened the home introduction and frame stagger so the project captions appear earlier. Desktop and mobile home, collection and case screenshots were inspected; the mobile workflow and Japanese home were also reviewed.

Route checks cover both locales and both configured desktop/mobile browsers, filters, saved return position, language and section preservation, repeatable SVGs, downloads, keyboard controls, diagram selection, reduced motion, 404s and the real PNG cover. A separate responsive sweep checks eight representative pages in both locales at 320, 600, 768, 1024 and 1440 pixels (80 layouts).

Final screenshots are saved under `/tmp/aide-proto/shots/`:

- `full-generative-home-desktop.png`
- `full-generative-collection-desktop.png`
- `full-generative-case-desktop.png`
- `full-generative-home-mobile.png`
- `full-generative-case-mobile.png`

Viewport versions use the same filenames with `-viewport` before `.png`. Earlier review passes include `-pass1` and `-pass2`.
