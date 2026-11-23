# Art round two

Research and visual review: 23 November 2026. Built on `aide/art-research-2026-11-22` (PR #17), starting at `2428e2d`. This series prioritizes an image worth looking at before an explanation of systems. The previous three studies remain available under their original routes.

## References and decisions

These are observations about visual composition, not claims that the new work reproduces the artists' methods. Reference images were viewed before implementation. No reference images, source code, or third-party fonts ship in these sketches.

- [Tyler Hobbs, Fidenza](https://www.tylerxhobbs.com/works/fidenza): the viewed #725 composition combines broad currents with hundreds of small interruptions. The difference between large and small marks makes it readable from across a room and rewarding up close. The new glass piece uses broad folds, fine mineral veins, and a single optical lens to give that hierarchy a different material language. Hobbs's [Flow Fields essay](https://www.tylerxhobbs.com/words/flow-fields) also argues for exploring custom distortions. These sketches do not repeat round one's thin flow paths.
- [Manolo Gamboa Naon's work](https://www.behance.net/manoloide), especially the viewed 25_04_10 image: saturated red/yellow regions contain dense nested rectangles. Color defines the big shape while detail changes its apparent scale. Prism garden uses color families to establish terrain and tiny roof insets, stairs, and seeds to make it feel inhabited. His [public sketch archive](https://github.com/manoloide/AllSketchs) establishes an iterative, seeded practice; no code was copied.
- [Matt DesLauriers, Meridian](https://monopo.london/work/meridian-book/): the project description connects stratified landforms with many small marks and analog materials. The takeaway is material specificity: use creases and cast shadows for paper, surface normals for glass, and light across lettered geometry for the type piece. Grain alone is insufficient.
- [Anders Hoff, Plot fa3861cc](https://buy.inconvergent.net/product/plot-fa3861cc-a3): repeated squares deflect into a spatially ambiguous structure. The viewed plot is restrained; the useful lesson here is that a strict rule can create surprising depth. Paper sun uses one petal grammar with different radial phases, lengths, and layers.
- [Lusion, Spatial Fusion](https://lusion.co/projects/spatial_fusion/) and [Max Mara: Bearing Gifts](https://lusion.co/projects/maxmara_bearings_gifts/): their project descriptions foreground composed worlds and rendering choices across devices. The practical takeaway is to treat light, camera, and material as part of the artwork. These project pages were read; their live WebXR/interactive experiences were not evaluated.

## Four visual languages

| Sketch                  | Image and interaction                                                                                                                                                             | Rendering                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/lab/art/tidal-glass`  | Luminous cobalt, coral, and mint bands pass through a refracting lens. Moving the pointer pulls the liquid and lens; pressing changes the tide.                                   | One raw WebGL 2 fragment pass. Analytic domain warping, derivative-based lighting, antialiased fine veins, and seeded phase.         |
| `/lab/art/paper-sun`    | Hundreds of folded petals form an irregular, offset rosette. The layers tilt toward the pointer and open with a small elastic pulse.                                              | Canvas 2D generates eleven cached petal textures; WebGL composites them. Cast shadows, crease highlights, fine grain, and a phyllotactic heart give the paper its material.                        |
| `/lab/art/name-knot`    | Oversized Kento Iizuka lettering wraps a continuous blue and vermilion knot. Turning reveals different words and interleaved surfaces.                                            | Raw WebGL 2 indexed tube mesh with a generated type texture, depth testing, directional lighting, and a soft ground shadow.          |
| `/lab/art/prism-garden` | A floating terraced island contains cobalt wells, porcelain roofs, orange towers, tiny stairs, and colored seeds. The pointer lifts nearby columns; pressing sends a radial wave. | Canvas 2D. Seeded height field, depth-sorted isometric faces, three material families, roof insets, seams, and a cached grain sheet. |

The base palette follows `palette.ts`: cobalt, paper, peach, cyan, and lavender. Vermilion and electric mint extend it. The only personal material used in the new artwork is the owner's already-public portfolio name. No private project data is used.

## Screenshot critique and revisions

Screenshots live at `/tmp/aide-proto/shots/art2-*`. Each captured image was visually inspected, including the entire canvas rather than just the surrounding interface. Pass names identify actual saved stages, not proposed improvements.

| Sketch       | First review                                                                                                                                                                                                         | First revision                                                                                                                                                    | Second revision                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tidal glass  | `pass1`: rich color but an undifferentiated all-over shader pattern. The image needed a focal event.                                                                                                                 | `pass2`: added an offset refracting lens with a lit rim. It creates scale and a distinct silhouette within the field. The edge was too abrupt.                    | `pass3`: spherical refraction eases into the rim; dense veins use derivative antialiasing; the lens follows the pointer.                         |
| Paper sun    | `pass1`: rounded petals and coarse grain made the surface look soft and synthetic. Concentric symmetry felt automatic.                                                                                               | `pass2`: sharpened the petal tips, lengthened the folds, offset the layer centers, varied the perimeter, and replaced the enlarged noise texture with fine grain. | `pass3`: tighter cast shadows and brighter crease edges clarify the material; the seed changes the spiral's twist.                               |
| Prism garden | `pass1`: the island was too small, the grain too obvious, and the roof surfaces too uniform.                                                                                                                         | `pass2`: enlarged the island, added a secondary terrain harmonic, and introduced small stair patterns.                                                            | `pass3`: strengthened the ground shadow and added height seams to selected tall faces. Roof details stay subordinate to the large color regions. |
| Name knot    | The original `type-quarry-pass1` was conventional extruded lettering. It was dropped and replaced. `name-knot-pass2` establishes the woven form but its texture orientation and ungrounded presentation needed work. | `pass3`: corrected the texture orientation, changed the opening view, and added a softly shaded ground and shadow.                                                | The final pass narrows the tube slightly and opens the camera angle so the three interlocking lobes read more clearly. A complete woven sculpture replaces the original extruded text.                                                                                              |

The material treatments are intentionally distinct. Tidal glass is the most immediately pictorial; Paper sun has the most tactile detail; Name knot makes the strongest personal identity; Prism garden has the clearest playful response. Whether any is the owner's preferred direction remains a visual choice for review.

## Runtime and accessibility

All arrangements start with seed 7193. New seed advances it deterministically; the primary action changes a separate variation without rebuilding the seeded geometry. No random values are generated during animation. The canvas is backed by a bundled still print, with an accessible description and a PNG download.

Reduced motion renders one frame and stops scheduling animation. Its buttons and range control replace that frame directly. Pause freezes the current image; Play resumes it. Visibility and intersection observers suspend continuous work when the page or artwork is out of view. Resize changes the backing resolution while retaining composition. Pointer movement is smoothed inside the render loop. Touch preserves vertical scrolling and uses the same visible action buttons.

The three WebGL studies cap their backing pixel ratio at 1. Prism garden caps it at 1.5 on desktop and 1.25 below 600px. Paper textures and grain are cached; WebGL uses static buffers, textures, and uniforms. A missing or lost WebGL context reveals the still print. Cleanup cancels the frame request, disconnects observers, and disposes GL buffers, textures, programs, shaders, and contexts. The new series adds no runtime dependency.

## Verification

Run a production server, then:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3274
BASE_URL=http://127.0.0.1:3274 node tests/art-round2.mjs
BASE_URL=http://127.0.0.1:3274 node tests/art-studies.mjs
```

Use the environment's existing Playwright browser installation. `CAPTURE_ONLY=1 CAPTURE_PASS=pass-name` captures the four static desktop compositions for visual review. The normal suite covers deterministic pixel output, both kinds of controls, still-frame stability, PNG downloads, pause/play, runtime motion preference changes, responsive touch layouts, no-JavaScript posters, WebGL failure, context loss, old routes, invalid routes, and inherited English/Japanese pages. Its frame intervals measure local browser scheduling during each running artwork, rather than an end-to-end physical-device benchmark.

The local dev watcher hit the host's open-file limit. Production builds and the production server provide the review environment. Physical iOS/Android devices and Safari are unverified.

### Performance revision

The first high-density run exposed a real problem: Paper sun's eleven Canvas 2D layer resamples took roughly 50–67ms per frame, and the two other GL studies frequently exceeded 16.7ms at a 1.5 backing ratio. Paper compositing moved to textured GPU quads, while the three GL studies adopted a ratio of 1. A duplicate initial animation request was also removed. The subsequent isolated sample at a device scale factor of 2 measured all four at a median of approximately 16.7ms and a 95th percentile of 16.7–16.8ms across 120 intervals each. The full suite includes a 21ms 95th-percentile guard and verifies one render per scheduled browser frame. These are local Chromium observations, not a universal device guarantee.

### Final results

The production build, round-two browser suite, round-one browser regression suite, and whitespace checks pass. Both browser suites report zero page errors. The full round-two run uses a desktop device scale factor of 2 and passes its 21ms 95th-percentile frame guard for every sketch:

| Sketch | Median | 95th percentile | Intervals |
| --- | --- | --- | --- |
| Tidal glass | 16.7ms | 16.7ms | 120 |
| Paper sun | 16.7ms | 16.7ms | 120 |
| Name knot | 16.7ms | 16.8ms | 120 |
| Prism garden | 16.7ms | 16.7ms | 120 |

Final artifacts include `art2-<sketch>-final-{desktop,artwork}.png`, `art2-<sketch>-{interactive,mobile,export}.png`, the three `art2-<sketch>-no-webgl.png` fallback captures, and `art2-no-javascript.png`. `art2-verification-final.json` records all checks and frame samples; `art-verification-art2-regression.json` records the earlier series' regression checks. The bundled PNG still prints match the final canvas exports byte for byte when served locally. Final desktop and mobile images were visually reviewed for cropping, hierarchy, readable controls, and the distinction between the four material treatments.
