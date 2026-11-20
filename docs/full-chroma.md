# Chroma full site

Chroma carries the yellow, red and cobalt geometric prototype through the complete bilingual portfolio. It is stacked on site-structure PR #10 at `196806c592270d4c718ea82cc29832240b9a1697`.

## Content and routes

The home selection, collection, case studies, career, skills, contact details and content requests read the shared typed records in `app/content/site-content.ts`. Shared interface copy and project grouping come from `app/content/copy.ts`. This direction adds presentation components, illustrations and scoped CSS.

`/lab/full/chroma` redirects to `/lab/full/chroma/en`. Both `en` and `ja` expose these routes:

- `/lab/full/chroma/{locale}`
- `/lab/full/chroma/{locale}/projects`
- `/lab/full/chroma/{locale}/about`
- `/lab/full/chroma/{locale}/resume`
- `/lab/full/chroma/{locale}/work-together`
- `/lab/full/chroma/{locale}/contact`
- `/lab/full/chroma/{locale}/projects/{slug}` for all 11 shared projects:
  `local-speech`, `event-platform`, `salon-data-platform`, `subsidy-search-pilot`,
  `agent-coordination`, `markdown-sharing`, `event-ticketing`, `snap-photobooth`,
  `architecture-portfolio`, `falconex-site`, `ongy-viewer`.

That gives 34 localized pages. Unknown pages, projects and locales return 404. Language links preserve the case, area filter, contact context and section anchor. Collection return links restore the selected area and saved scroll position.

## Visual system

- Yellow `#f7d538`, red `#e74930`, cobalt `#243bb4`, ink `#20201e`, paper `#f4eee1`.
- Geist for English, with native Japanese sans-serif fallbacks. Large, closely set headings identify the exhibition; case prose has a restrained reading width and a paper background.
- Circles, arches and squares represent distinct parts of a system. Project-specific SVG covers turn speech, validation, search, coordination and product interfaces into a related series.
- Home project selection rotates the composition and changes the featured project. Case diagrams let readers select a stage and inspect its documented role. Motion follows an explicit action and settles; reduced motion removes transitions.
- Four-project collection groups use paired rows, while the three-project systems group uses three columns on desktop. Mobile layouts use a single column, visible language links and a named menu with a JavaScript-free navigation fallback.

Case studies include the problem, contribution, workflow, decisions, results, artifacts, technology responsibilities, reflection and related work. The event-platform case derives its approximate annual $200k-to-$10k cost comparison and 95% reduction from the shared metric. Other cases retain their precise documented stage.

The SVG covers are abstract illustrations. Workflow labels and descriptions derive from the reviewed shared records. Approved project media, deeper personal decisions, evaluation results, reflections and reviewed resume PDFs retain the structure's `TODO [stable-id]` placeholders. These requests remain visible at the relevant section.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright test --config playwright.chroma.config.ts
```

The dedicated Playwright configuration checks every page in English and Japanese on desktop and mobile, plus all pages at 320px. It also checks navigation, filter and language preservation, collection return position, keyboard controls, reduced motion, project-aware email links, JavaScript-free reading, preview indexing metadata and genuine 404s.

Screenshots go to `/tmp/aide-proto/shots/full-chroma-*.png`: home, collection, event-platform case and workflow diagram in both languages and viewport sizes. `CHROMA_CAPTURE_PASS` adds a review suffix. Set `PLAYWRIGHT_BASE_URL` to verify the deployed preview with the same suite.
