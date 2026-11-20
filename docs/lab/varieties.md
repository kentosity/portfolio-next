# Six ways of making sense

Research and prototypes, 21 November 2026 (Asia/Tokyo).

These studies use the same first three featured projects from `app/content/career-profile.json`: the salon data platform, local speech tool and event platform. Their canonical titles, detail links, roles and stacks come from that generated source. Short English translations and matching Japanese summaries live in one shared adapter. The illustrations describe structure and workflow; their geometry is an artistic interpretation.

## Design decisions

| Route | Visual system | Interaction | Difference from the earlier studies |
| --- | --- | --- | --- |
| `/lab/v-syntax` | Vermilion `#e13222`, stone `#f1f0eb`, charcoal `#20201e`; Instrument Sans; oversized, left-aligned type | Loose letterforms settle onto a baseline and can be loosened again | Typography itself is the object to play with |
| `/lab/v-chroma` | Yellow `#f7d538`, blue `#243bb4`, red `#e74b33`, chalk `#f4eee1`; bold Instrument Sans; asymmetrical split mural | Choosing a project rotates a composition of primary forms | A full colour field and changing geometry carry the identity |
| `/lab/v-score` | Aubergine `#38223f`, lilac `#efddf3`, peach `#ffb879`; light Instrument Sans; horizontal signal stage | A finite light pulse follows the chosen project's workflow | A timed connection is the central experience |
| `/lab/v-atlas` | Ultramarine `#1649cb`, ice `#cbd9fa`, rose `#efc7b5`, paper `#f2f4ea`; Instrument Sans; architectural section | Stack or lift three floors, then choose a room | Projects inhabit an abstract building rather than a shelf of objects |
| `/lab/v-fold` | Pine `#244d43`, pink `#efb6bd`, rose `#dda1ac`, ivory `#f2ead9`; Newsreader; continuous accordion | Open a fold to reveal a project | One continuous folded ribbon replaces separate printed sheets |
| `/lab/v-thread` | Pale stock `#eeede5`, wine `#5a273a`, copper `#b55a38`; Newsreader; a woven workflow map | Separate or weave the threads and follow each project's connections | A single annotated information artwork replaces the archive format |

The first visual review found that several mobile headlines wrapped to three lines and pushed the artwork too far down. The second pass reduced mobile type, tightened the colour study and brought the woven map closer to its explanation. Instrument Sans is self-hosted; Newsreader reuses the licensed font supplied with the earlier notebook prototype. Japanese uses the device's Japanese sans or Mincho family alongside the Latin face.

## Wider research

The direction choices below are design judgments, informed by the linked primary sources. Awards and collection facts are separated from that interpretation.

- **Swiss / International style:** [Cooper Hewitt's Swiss Style collection](https://www.cooperhewitt.org/tag/swiss-style/) describes typography as an essential element. [Niklaus Troxler's jazz typography](https://www.cooperhewitt.org/2015/05/27/jazz-typography/) is a useful bridge between discipline and playful letterforms. Syntax turns alignment into a visible action.
- **Bauhaus:** the [Bauhaus-Archiv's overview](https://www.bauhaus.de/en/discover/article/bauhaus-knowledge-in-a-nutshell/) discusses primary colours and basic shapes. Chroma uses those as a small vocabulary that can be rearranged.
- **De Stijl / Mondrian:** [MoMA's Composition in Red, Blue, and Yellow](https://www.moma.org/collection/works/80160) connects the grid and primary-colour fields to architectural ideas. Atlas borrows the idea of legible spatial relationships, with its own original floor geometry.
- **Instruction-based art:** [LeWitt's Wall Drawing #260](https://www.moma.org/collection/works/79898) and [Work from Instructions](https://www.moma.org/collection/works/portfolios/70137) demonstrate an artwork expressed through rules. The limited rules in Score and Thread make their response understandable and repeatable.
- **Japanese material and negative space:** [Kenya Hara's White](https://hara.ndc.co.jp/en/books/shiro/) treats white through a sensory design lens. Fold uses paper, light and shadow to make disclosure feel physical; Thread uses open space to separate the diagram from its explanation.
- **Data art / information design:** [Giorgia Lupi's Dear Data](https://giorgialupi.com/dear-data) describes the relationship between collected observations and visual keys. Thread makes its selected source, transformation and output explicit. Its line count encodes no measured performance claim.
- **Museum catalogues:** [MoMA's collection records](https://www.moma.org/collection/works/80160) offer a useful model of giving an artwork space while keeping its identity and provenance close. The lab index keeps each study's title and short description next to its real screenshot.

## Portfolio and curation references

- [Dennis Snellenberg on Awwwards](https://www.awwwards.com/sites/dennis-snellenberg) is verified as Site of the Day, 4 April 2022. The listing highlights navigation, transitions and microinteractions. The useful lesson here is one coherent interaction voice around direct access to the work.
- [Siteinspire's typography collection](https://www.siteinspire.com/websites/category/typography), [unusual layouts](https://www.siteinspire.com/websites/category/unusual-layout/page/5) and [horizontal layouts](https://www.siteinspire.com/websites/category/horizontal-layout) widened the research beyond conventional portfolio grids.
- [Sylvain Julé's Siteinspire profile](https://www.siteinspire.com/profile/2680-sylvain-jule) supplies a designer/developer reference across cultural and architectural projects. [Museum Department](https://www.siteinspire.com/website/13464-museum-department) adds a typographic art-catalogue reference. Curation is verified; an award is not inferred from a Siteinspire listing.
- The requested [Godly](https://godly.website) destination redirected to [Recent](https://recent.design/); its [website collection](https://recent.design/websites) was inspected as the current inspiration destination. It offers portfolio, motion, art and architecture categories.
- Several additional Awwwards and portfolio URLs timed out or were unavailable to the research tool, including the tested Bruno Simon, Jesper Landberg and Stefan Vitasovic endpoints. No fresh award or implementation claims are made about those pages. Earlier research in `/tmp/aide-design/report.md` supplied additional background.

## Skills reviewed and selected

| Source | Assessment for this task | Use |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Subject-led composition, typography and visual critique | Installed locally and used for all six design plans |
| [Anthropic algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | Strong for seeded p5.js art studies; would tend toward the previous archive direction | Reviewed as a reference |
| [Impeccable](https://github.com/pbakaus/impeccable) | Useful craft floor and polishing workflow | Installed locally; read polish and craft-floor guidance. Context engine could not create its cache under the sandbox, so project context was inspected directly |
| [Emil Kowalski](https://github.com/emilkowalski/skills) | Action feedback, interruptible transitions, reduced motion and keyboard behavior | Installed `emil-design-eng` locally and applied its interaction guidance |
| [Official GSAP skills](https://github.com/greensock/gsap-skills) | Relevant for complex React timelines and cleanup | Reviewed; new studies use CSS/SVG and React state. The preserved notebook retains its original GSAP dependency |
| [Three.js skills](https://github.com/CloudAI-X/threejs-skills) | Useful for WebGL scenes and performance budgeting | Reviewed; Atlas uses CSS 3D. The preserved cabinet retains its original R3F/Three dependencies |
| [Motion AI Kit](https://github.com/motiondivision/ai-kit) | An alternative animation-specific documentation source | Reviewed; the selected interactions fit native CSS/SVG |
| [Vercel interface guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Accessibility and interface review | Reviewed alongside the earlier research |

Project-local installation commands, all run with `npx skills add` and `-a codex -y`:

```sh
npx skills add anthropics/skills --skill frontend-design -a codex -y
npx skills add emilkowalski/skills --skill emil-design-eng -a codex -y
npx skills add pbakaus/impeccable --skill impeccable -a codex -y
```

The installed revisions were `e4bb5d960d87` (Anthropic), `64eb3deb9a5f` (Emil) and `b49177d32788` (Impeccable). Their local installation is kept outside the source diff. The skills will remain available in this checkout on the next turn.

## Earlier prototypes in this comparison

Main did not contain the earlier lab work. This branch brings their route and asset files from the heads of PRs #4–#8, without changing the existing production pages. The original generative study is available at `/lab/generative-original`; `/lab/generative` shows v2. The index also links `/lab/print`, `/lab/notebook` and `/lab/cabinet`. All eleven studies therefore load on one deployment.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, then start the built app and run `npm run test:varieties`. Playwright requires its Chromium installation (`npx playwright install chromium`). Set `BASE_URL` to select a running local or preview server. Set `CHECK_INDEX=1` to include the thumbnail checks.

The interaction suite covers each new direction, English/Japanese switching, retained selection, canonical project links, 320/390/768/1024/1440 pixel widths, keyboard focus, reduced motion, idle animation settling and browser exceptions. It also loads all earlier prototypes and the three canonical case studies. Desktop captures use 1440×900 and mobile captures 390×844. Screenshots and the machine-readable text log go to `/tmp/aide-proto/shots` by default.

Physical-device touch behavior and assistive-technology reading remain unverified. These are design prototypes and are intended for comparison in an unmerged PR.

Final local result: lint passed with zero warnings, standalone typecheck passed, and the production build generated 83 routes. The production Playwright suite passed for all six new directions, all five earlier prototypes, all three case studies and the bilingual index with eleven loaded thumbnails. Final captures are `var-{syntax,chroma,score,atlas,fold,thread}-{desktop,mobile}.png`; additional full-page Japanese captures and the gallery captures are in the same screenshot directory. The check log is `var-check-results.txt`.
