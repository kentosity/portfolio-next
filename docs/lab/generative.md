# Generative archive

The page at `/lab/generative` presents the first three featured projects from `app/content/career-profile.json` as computational prints. The theme is Kento’s interest in organizing code and systems so they make sense. The introduction states that in English and Japanese. Project titles, outcomes, roles, technology stacks, and case-study links sit together beneath each print.

The artwork expresses organization through parallel lines. A data platform gathers channels into a current, a speech tool arranges oscillations around a center, and an event platform gives modular routes shared junctions. The project title, ordered stack, and source review date seed each original. Variations advance the seed; the event print also varies its junction positions. These are artistic interpretations of the project structures.

Each plate has twelve groups of paths. On its first appearance, hover, keyboard focus, or an explicit arrangement action, those groups settle from seeded translations and rotations into their final positions. Clicking a print creates a variation with a brief crossfade. Native Web Animations finish within 1.4 seconds, and there is no drawing loop. Leaving the viewport, changing the motion preference, or removing the component cancels its animations. Reduced motion shows the completed artwork immediately and keeps remixing available.

The catalogue uses a cool white wall (`#f1f3f5`), graphite (`#252c32`), cobalt (`#3554b5`), and the original paper and ink colors. Syne supplies the display type, with Geist and system Japanese sans for reading. Frames, titles, and project facts align across three desktop columns. Tablet layouts pair each print with its description; phones use a single column. SVG downloads contain the completed vector artwork.

## Controls and accessibility

- Hover or focus a print to replay its arrangement. Click or press Enter to remix it.
- “Arrange all prints” replays the arrangement across the gallery.
- “Inspect print” opens a native modal dialog with construction, variation, exact restore, and SVG download controls.
- EN/JA switches preserve the selected print, variation, and construction state. The page and dialog declare the selected language.
- Dialogs retain keyboard focus, return it to the opener on close, support Escape, and restore document scrolling. Controls have visible focus and accessible names.
- Titles and links render on the server. All project facts come from existing public content; English roles are translations of the generated Japanese roles.

## Design process and verification

Read the portfolio design research from `kentosity/resume`, branch `aide/design-research-2026-11-19`, before implementation. Used Anthropic’s `frontend-design` skill directly from the locally installed skill collection. The algorithmic-art reference informed seeded variation; its standalone viewer is adapted into the existing Next.js/SVG implementation, as the portfolio brief requests. Animation uses the browser’s native API and adds no runtime package.

The first desktop/mobile review led to a shorter introduction and smaller prints so project details appear sooner. The second review revealed a mobile frame shrinking inside the flex layout; making frame width explicit aligns it with its caption. The final pass tightened summary spacing, made the event outcome easier to scan, and changed Japanese summaries to plain sentences. A Playwright focus test exposed a native-dialog boundary where Shift+Tab could leave the viewer; explicit wrapping now keeps both tab directions inside it.

Validation includes ESLint, `tsc --noEmit`, and the production Next.js build. Playwright checks cover arrangement and remixing, completed idle state, all three viewers, construction and exact reset, language preservation, clean SVG downloads, keyboard activation and focus, project navigation, mobile controls, reduced motion, and EN/JA overflow at 320, 390, 600, 768, 1024, and 1440 pixels. Desktop (1440×900), mobile (390×844), full-page, Japanese, and inspection screenshots are saved under `/tmp/aide-proto/shots/generative2-*`.
