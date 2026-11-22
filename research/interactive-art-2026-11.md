# Interactive art for Atlas + Generative

Research date: 23 November 2026. The filename and branch follow the brief's November naming. Base: [PR #15](https://github.com/kentosity/portfolio-next/pull/15), `e5df9031f945b285ed0764b2d011f62bd8f3035b`. These are proposed visual metaphors for organizing systems, rather than evidence about a particular client project.

## Recommendation

Build **Sorting room**, **Untangled**, and **Finding flow** first. Sorting room makes the theme immediately understandable; Untangled gives it a connection to software architecture; Finding flow carries the strongest continuity with the existing generative prints. The sketches test these three different roles before choosing a final treatment.

## Design plan

Use the existing palette as the source of truth: cobalt `#1649cb`, paper `#f1f4ff`, ink `#12378c`, peach `#efc7b5`, cyan `#c3e4ef`, lavender `#d3defb`. Place a large pale artwork on a cobalt page. Keep the title and instructions left aligned, with one short sentence describing the action. Use the site's sans-serif direction and a restrained type scale. The artwork supplies the personality.

```text
Kento Iizuka                             Art studies / Portfolio

Sorting room                     A place for every piece.
                                 Scroll to gather the fragments.

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│          Generated marks occupy most of the sheet           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Order [----------------------]   Gather pieces   New arrangement

What changes                     Where it belongs
```

Plan review: a conventional grid of animated project cards would repeat a familiar portfolio treatment. Each sketch instead gets one large composition with a reversible transformation. Sorting uses the identity and location of each fragment; the graph preserves its edges; the flow preserves the identity of its strands. Visitors can see what became clearer. Buttons, sliders, and normal scrolling make the interaction discoverable.

## Local references

- `~/dotfiles/agents/skills` contains my-setup, code-style, browser, and yomiyasu; it has no dedicated design skill. my-setup and code-style guide this implementation.
- `/tmp/aide-proto/frontend-design-SKILL.md` provides the two-pass design process, one strong visual idea, readable controls, responsive layout, and reduced-motion guidance. Applied to the sketches.
- `/tmp/aide-proto/algorithmic-art-SKILL.md` and the cached copy under `generative-skills/skills/algorithmic-art` provide seeded randomness and parameter-exploration references. Its fixed Anthropic viewer and p5-only output conflict with this brief's Atlas palette and Next.js routes, so those instructions are superseded by the requested implementation.
- Cached design material also includes canvas-design, webapp-testing, frontend-design, and Three.js references under `/tmp/aide-proto/generative-skills` and `/tmp/aide-proto/cabinet-three-skills`. These are reference material, not new installed dependencies.
- Existing `app/lab/full/atlas-generative/_components/art.ts` and `palette.ts` establish deterministic prints, thin cobalt lines, peach interruptions, and project-based seeds. The new studies import the same palette.

## Web references

Award records establish recognition; the takeaways below are design judgments for this portfolio.

- **Bruno Simon:** the [Awwwards conference presentation](https://www.youtube.com/watch?v=DkLg3fcV308) describes his drivable WebGL portfolio; the [2019 award archive](https://awwwards-2020.tubikstudio.com/hall-of-fame/) lists Developer of the Year and Users' Choice. His interaction demonstrates his craft immediately. Takeaway: let visitors perform the portfolio's central idea. Here that action is giving a system structure.
- **Lusion v3:** CSS Design Awards named it [2023 Website of the Year and Best Agency Site](https://www.cssdesignawards.com/blog/2023-website-of-the-year-winners/394/). Takeaway: the site itself can serve as an example of the work. Atlas can demonstrate care through a small, responsive artwork. The award is historical and applies to v3.
- **Guillaume Azadian:** the same award announcement names it Best Portfolio Site; its [entry](https://www.cssdesignawards.com/woty2023/sites/guillaume-azadian-portfolio) identifies animation, scrolling, and typography. Takeaway: motion can support a clear editorial composition while the work remains the focus.
- **Dennis Snellenberg:** the [portfolio](https://dennissnellenberg.com/) places work and contact alongside his design-and-interaction positioning. Takeaway: keep access to projects obvious beside the experiment. This is an additional navigation reference, without an award claim.
- **Red Blob Games:** its [interactive explanation of A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html) exposes a model's inputs and results. Takeaway: one visible control can reveal more about a system than an explanatory paragraph.

The Awwwards detail pages timed out during research. Award claims above use accessible primary award records. Reference-site motion was researched from published material; this task's screenshots and browser checks cover the new sketches.

## Rendering options

| Approach                           | What it supports                                                                                                                                                                                                                                                                        | Decision for this task                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| p5.js                              | Quick creative-coding exploration; its documented [randomSeed](https://p5js.org/reference/p5/randomSeed/) and [noiseSeed](https://p5js.org/reference/p5/noiseSeed/) make both random values and noise repeatable.                                                                       | A good exploration environment. Native TypeScript is sufficient for the selected bounded SVG studies.                             |
| Canvas 2D                          | Large collections of marks in one surface. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas) describes caching repeated drawing and avoiding unnecessary work.                                                                              | Use if a later version requires thousands of moving marks. Add a static SVG/image and accessible HTML controls.                   |
| WebGL / Three.js                   | GPU drawing, depth, instancing, and custom materials. Three.js documents GLSL programs and uniforms in [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html).                                                                                                            | Reserve for the reaction-diffusion or depth study. Budget GPU work, handle context loss, cap pixel ratio, and dispose resources.  |
| SVG + native React / GSAP / Motion | Inspectable vector paths, crisp resizing, semantic captions, and vector export. [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>) groups and reverts responsive animations; [Motion](https://motion.dev/docs/react-accessibility) provides reduced-motion controls. | Use SVG and native events for these sketches. Add a timeline library if the chosen concept grows into a multi-section sequence.   |
| Rive                               | Authored interactive vector state machines through its [JavaScript/WASM runtime](https://rive.app/docs/runtimes/web/web-js). Runtime features depend on renderer support.                                                                                                               | Useful for an authored character or emblem. Compare runtime and editor effort if that direction is selected.                      |
| Lottie                             | Exported animation with SVG/canvas rendering and playback controls, documented by [lottie-web](https://github.com/airbnb/lottie-web).                                                                                                                                                   | Useful for a fixed illustration sequence. A changing graph or genuinely seeded composition is easier to express directly in code. |

The implementation adds no runtime packages. All three drawings render in the server HTML. Each uses deterministic Mulberry32 randomness with initial seed 2718. New arrangement advances that seed. SVG dimensions stay fixed in art coordinates, so resizing preserves the composition.

## Eight concepts

Effort is an estimate for one experienced developer working in the existing site: a day means roughly six focused implementation hours. These are estimates, including interaction and accessibility polish, rather than measured delivery promises.

### Sorting room — build first

**Visitor experience.** Cobalt, peach, and cyan fragments scatter across a pale sheet. Normal scrolling gathers them into four nested ribbons. Moving a pointer gently pushes nearby pieces away. A slider and Gather pieces button let visitors choose the degree of order and reverse it. This makes the pleasure of sorting a system tangible.

**Generation.** Seeded initial positions, rotations, sizes, and arrival delays map 216 persistent identities to colour-family rings. Smooth interpolation moves each piece to its destination. This is target assignment and interpolation, rather than a live comparison-sort visualization. A production project collection could replace colour families with project themes. [Steering behaviours](https://thecodingtrain.com/challenges/59-steering-behaviors) are a useful reference if physical arrival becomes necessary.

**Performance, motion, mobile.** The sketch has 216 rectangles. Work runs on user events and finite 1.4-second transitions; pointer updates coalesce to one frame. Touch preserves vertical page scrolling and uses the same large controls. Reduced motion disables scroll gathering and pointer displacement; the button and slider apply the selected state directly. Start with the current count on mobile and reduce to 108 if physical-device profiling requires it.

**Effort and recommendation.** Sketch: half a day. Portfolio integration: 1–2 days. Recommended homepage direction because the action and theme are immediately legible. Validate whether ring families should become actual project categories.

### Untangled — build first

**Visitor experience.** A dense knot of fine wires opens into a branching fan. Choosing Inputs, Boundaries, Interfaces, or Outcomes highlights the corresponding path and dims the others. The visitor discovers that clarity comes from arranging relationships. The same edges survive the transformation.

**Generation.** A seeded scatter and curved wire bends transform into a deterministic five-level binary tree: 31 nodes and 30 edges. Seven strokes per edge make each connection a small bundle. Branch membership determines highlighting. This bounded sketch uses a known crossing-free tree target; it does not claim to solve arbitrary graph untangling. A later real dependency graph could use a layered DAG layout or [D3's tidy tree](https://d3js.org/d3-hierarchy/tree), depending on the actual data.

**Performance, motion, mobile.** Positions are linear-time in the node count. The sketch renders 210 paths and 62 small circles. Four native branch buttons supply keyboard and touch access; mouse hover on nodes previews a branch. Reduced motion changes the layout immediately. Mobile keeps the complete topology in the scaled sheet, with branch descriptions beneath it. Use a vertical tree on a case page if node labels become necessary.

**Effort and recommendation.** Sketch: half a day. Integration with reviewed case-study data: 2–3 days. Recommended for a case-study opening because it connects the artistic idea to software architecture. The current labels describe a conceptual system.

### Finding flow — build first

**Visitor experience.** Fine currents pass across a peach disc. Irregular strands settle into a shared, sweeping bundle. Moving across the sheet bends nearby strands; releasing the flow restores the turbulent form. It expresses a system becoming easier to move through while retaining variation.

**Generation.** Seeded harmonic phases and offsets generate 96 continuous polylines, each with 81 samples. A shared centreline and ordered offsets define the target. The Direction parameter interpolates corresponding samples, and a local Gaussian displacement responds to the pointer. The [Perlin flow-field lesson](https://thecodingtrain.com/challenges/24-perlin-noise-flow-field) and [Nature of Code's flow fields](https://natureofcode.com/autonomous-agents/) support a future particle-advection version. This sketch uses harmonic fields, rather than Perlin noise or a fluid simulation.

**Performance, motion, mobile.** The drawing has 7,776 sampled points across 96 paths. Seed geometry is cached; only interpolation and path serialization run during interaction. Motion ends after the transition. Mobile retains the same image and touch-friendly controls; a 48-strand tier is available as a future performance option. Reduced motion applies direct state changes and disables pointer deformation. Static SVG is also the export format.

**Effort and recommendation.** Sketch: half a day. Portfolio integration: 1–2 days. Recommended as the art-led alternative: it relates closely to the existing prints and gives the strongest quiet composition. Further art direction should decide whether that continuity or Sorting room's explicit theme matters more.

### Growing grammar

**Visitor experience.** A small branching mark grows as the visitor reveals a few rules. Changing one rule reorganizes the whole form. Selecting a project could reveal a related family of branches, expressing reusable systems built from simple contracts.

**Generation.** A bracketed L-system expands a bounded grammar; turtle drawing converts it into SVG paths. Seeded angles and branch-length variation keep runs repeatable. The [L-system reference](https://thecodingtrain.com/challenges/16-l-system-fractal-trees) demonstrates rewriting and turtle interpretation.

**Performance, motion, mobile.** Cap expansion depth at five and generated segments at 800; cache each generation. Mobile uses tap-to-advance rule steps. Reduced motion replaces each generation instantly. A static final tree remains visible while explanatory text describes the rule. Effort: 1–2 days for a prototype, 2 more for integration. Recommendation: reserve for a systems or tooling case where the grammar has a meaningful connection to the work.

### Room to grow

**Visitor experience.** Unequal circles jostle for space. Adding a boundary gives each one enough room; selecting a circle reveals its role. The transition expresses making capacity and responsibility explicit.

**Generation.** Seeded rejection sampling and circle growth produce a packing, with a spatial hash for nearby collision checks. A second target layout groups related circles. [Circle packing](https://thecodingtrain.com/challenges/50-animated-circle-packing) supplies the collision-growth reference. Use conceptual sizes until real metrics are reviewed.

**Performance, motion, mobile.** Bound attempts and stop at 150 circles; solve before animating positions. Use 70 circles on mobile, with a tap list mirroring selection. Reduced motion swaps solved layouts immediately. Effort: 1–2 days for a prototype, 2 more for integration. Recommendation: a collection or infrastructure-capacity study, after the more distinctive ribbon and wire experiments.

### Rules become texture

**Visitor experience.** A visitor places a few peach seeds in a cobalt field and watches islands and channels emerge. Changing one constraint produces a different stable texture. It shows how local rules can create a larger coherent system.

**Generation.** Gray–Scott reaction-diffusion uses two ping-pong concentration buffers, seeded patches, and feed/kill parameters. A fragment shader would run the update and colour the field. [The Coding Train](https://thecodingtrain.com/challenges/13-reaction-diffusion) documents the numerical model.

**Performance, motion, mobile.** Start at a 256×160 simulation grid and a fixed step budget; use 128×80 on mobile. Stop when settled or offscreen and cap rendering pixel ratio at 1.5. Reduced motion shows a seeded precomputed result; a Generate texture button replaces it. Supply a static SVG/raster if WebGL is unavailable. Effort: 2–3 days for a prototype, 2–3 more for integration and GPU checks. Recommendation: an optional art print; its connection to problem solving needs careful copy and the GPU cost needs physical-device testing.

### One rule, many rooms

**Visitor experience.** A disordered tile field rotates into a continuous set of pathways. Tapping a tile shows how one local choice affects the larger pattern. It reflects the effect of clean interfaces on a whole system.

**Generation.** Seeded Truchet tile orientations and a connectivity graph create the initial field. A bounded search chooses orientations that join selected entry and exit points. SVG quarter-circle arcs draw the tiles; a native animation or GSAP timeline rotates only changed tiles. [10 PRINT](https://thecodingtrain.com/challenges/76-10print) provides a reference for rule-driven tiled compositions, rather than the specific connectivity solver.

**Performance, motion, mobile.** Cap at 12×8 tiles on desktop and 8×6 on mobile. Precompute connectivity after each change. Native buttons expose tile selection and Reset path for keyboard/touch. Reduced motion switches orientations instantly and highlights the resulting route. Effort: 1–2 days for a prototype, 2 more for integration. Recommendation: a compact footer or interlude; ensure the result has enough visual character to carry the theme.

### A shorter way through

**Visitor experience.** A tangled itinerary between points becomes shorter as the visitor removes needless detours. A chosen node reveals the next useful step. It connects structure with reducing work for people.

**Generation.** Seeded points, nearest-neighbour initialization, and bounded 2-opt improvements generate a route. SVG renders the before/after path and selected improvements. The [traveling salesperson reference](https://thecodingtrain.com/challenges/35-traveling-salesperson) introduces the objective and why brute force scales poorly. A separate product-flow version could use A* over explicitly reviewed task states.

**Performance, motion, mobile.** Use 40 points and a maximum of 400 improvement attempts per action. Mobile uses 20 points and a Next improvement button. Reduced motion replaces the route and shows the changed segment without traveling particles. Effort: 1–2 days for a prototype, 2 more for integration. Recommendation: a process-improvement case illustration. Any displayed distance is a property of the drawing, not a client performance claim.

## Shared implementation and next decision

The sketches are at `/lab/art/sorting-room`, `/lab/art/untangled`, and `/lab/art/finding-flow`; `/lab/art` opens Sorting room. Each offers a reversible control, a new seeded arrangement, and a self-contained SVG download. Artwork controls use visible labels and native focus behavior. The drawings include accessible titles and descriptions. The site retains its existing Atlas palette through an import from `palette.ts`.

The animation loop is bounded and cancellable. It stops on Pause, a new control action, page visibility loss, reduced-motion preference changes, and unmount. Pointer deformation coalesces to a single requested frame and clears on pointer leave. Scrolling moves Sorting room directly; it does not animate the page's scroll position. The sketches are separate research routes with noindex metadata.

Choose Sorting room if conveying the personal theme quickly is the priority. Choose Finding flow if the first impression should be a distinctive print. Use Untangled beside a case narrative after its relationships have been reviewed. A final version needs the owner's visual preference, real case mapping where appropriate, and physical mobile-device profiling.

## Verification

The production build and scoped ESLint check pass. The browser suite passes with zero page errors. It checks deterministic reloads; different seeds; keyboard sliders; reversible finite animations and Pause; pointer deformation and restoration; graph branch selection; SVG export; scroll gathering; 320/390/768/1024px layouts; touch actions; reduced motion at load and during a transition; server-rendered artwork with JavaScript disabled; unknown-study 404s; the index redirect; and English/Japanese inherited portfolio smoke checks.

Local Chromium sampling recorded 103 frame intervals per study with a median and 95th percentile of approximately 16.7ms. This measures local browser scheduling over a short interaction, rather than physical-mobile GPU performance or an end-to-end performance audit. Physical iOS/Android devices and Safari remain unverified.

Reproduce from the checkout:

```sh
npm run build
npx eslint app/lab/art tests/art-studies.mjs
npm run start -- --hostname 127.0.0.1 --port 3173
BASE_URL=http://127.0.0.1:3173 node tests/art-studies.mjs
```

Use the environment's Playwright browser install when needed. Local artifacts:

- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-desktop-scattered.png`
- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-desktop-ordered.png`
- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-artwork.png`
- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-mobile.png`
- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-reduced-motion.png`
- `/tmp/aide-proto/shots/art-{sorting-room,untangled,finding-flow}-export.svg`
- `/tmp/aide-proto/shots/art-verification.json`

The screenshots were visually reviewed for composition, contrast, text wrapping, and mobile controls. A browser check caught a server/client mismatch in a multi-child SVG title; making the title a single string resolved it, and the complete suite then passed. Preview deployment status is reported in the PR when the review branch is published.
