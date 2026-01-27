# Portfolio UI/UX Review — Actionable Recommendations

## 🎯 High-Impact Changes

### 1. **Hero Section — Reduce Cognitive Load**

**Current issue:** Too much text and visual noise competing for attention. Three bullet points + a paragraph + snapshot card = information overload.

**Recommendations:**

- **Remove the three bullet points** below the intro paragraph — they're redundant with the Snapshot card on the right
- **Shorten the intro paragraph** to 2 sentences max:
  ```
  デザイン思考でスタートアップを支えるエンジニア。
  React/Next から AWS まで、コスト効率と開発速度を両立します。
  ```
- **Move the Snapshot card higher** (above the paragraph) so it's the first thing users see after the heading
- **Increase contrast** on the heading — "アイデアからプロダクトへ。早く、ちゃんと。" should be darker (text-slate-950) and more visually dominant

---

### 2. **Project Section — Too Much Duplication**

**Current issue:** You show 6 "Featured" projects in large cards, then repeat several of them in the "Other Projects" grid (WeCALL, WeNo, SNAP, Ongy appear twice). This feels redundant and makes the page unnecessarily long.

**Recommendations:**

- **Option A (Recommended):** Remove duplicates from `projectGrid`. Keep only the 14 projects that _aren't_ in `featuredProjects`
- **Option B:** Merge into a single unified grid with visual badges to indicate "Featured" status
- **Remove the vague description** "詳細ページは後から追加できます。" from the "Other Projects" heading — it's unprofessional and breaks immersion

---

### 3. **Visual Hierarchy — Inconsistent Section Weights**

**Current issue:** All sections feel equally important. Nothing stands out as the "main story."

**Recommendations:**

- **Make Featured Projects visually dominant:** Increase card size, add more whitespace (gap-8 instead of gap-6)
- **Reduce Experience section weight:** Currently uses 2-column layout, which makes it compete with Featured Projects. Consider making it a single column with horizontal timeline styling
- **De-emphasize Skills section:** Use smaller tags, lighter background, or move it lower on the page — it's the least interesting section for senior reviewers

---

### 4. **Typography — Weak Content Hierarchy**

**Current issue:** Too many similar font sizes. Hard to distinguish between primary, secondary, and tertiary information.

**Recommendations:**

- **Increase heading size contrast:**
  - Section titles: `text-4xl sm:text-5xl` (currently 3xl/4xl)
  - Card titles in Featured Projects: `text-3xl` (currently 2xl)
  - Card titles in Experience: `text-2xl` (currently xl)
- **Reduce body text size in cards:** Use `text-sm` for stack/role metadata (currently text-sm, but needs more line-height reduction)
- **Add font-weight variation:** Use `font-bold` for key metrics (the numbers in Snapshot and project metrics), not just `font-semibold`

---

### 5. **Color System — Lacks Personality**

**Current issue:** The entire site uses generic slate grays and a single blue accent. It feels like a template.

**Recommendations:**

- **Introduce a secondary accent color** for variety:
  ```css
  --accent:
    37, 99, 235 (blue) --accent-2: 139, 92,
    246 (purple) — currently defined but barely used --accent-success: 16, 185,
    129 (green) — for metrics that show improvement;
  ```
- **Use color semantically:**
  - Green for positive metrics (98.5% cost reduction, zero downtime)
  - Purple for creative/design projects (meiso, iplusi)
  - Blue for technical/infrastructure projects (WeCALL, WeNo)
- **Increase contrast on tags:** Current `bg-slate-100 text-slate-800` is too subtle. Use `bg-slate-200 text-slate-900` or add subtle borders

---

## 💡 Nice-to-Have Improvements

### 6. **Layout & Spacing**

- **Inconsistent gap sizes:** Main content uses `gap-24`, cards use `gap-6` or `gap-8`. Standardize to multiples of 4 or 8
- **Hero grid imbalance:** The profile image + snapshot card column is narrower than the text column, creating visual imbalance. Use equal widths or make the image column slightly wider
- **Section padding:** Top-level sections (`#about`, `#experience`) don't have distinct boundaries. Add subtle background colors or increase gap to 32

---

### 7. **Component Design — Featured Project Cards**

**Current issue:** Cards are visually busy with too many nested elements (gradient border, gradient background, blur effects, metrics grid).

**Recommendations:**

- **Simplify the gradient border effect** — the `p-[1px]` trick with gradient creates a thin, hard-to-see line. Either make it 2px or remove it
- **Reduce blur circles** — the decorative blur is invisible on most screens. Remove or make it more prominent
- **Standardize metrics layout:** Currently 3 columns, but some projects have different numbers of metrics. Use a flex layout that adapts gracefully

---

### 8. **Navigation & Structure**

- **Sticky header is too heavy:** `bg-white/80 backdrop-blur` is good, but the header height (py-4) + border makes it feel chunky. Reduce to `py-3`
- **Missing progress indicator:** Add a subtle scroll progress bar or active section indicator in the nav
- **CTA button in header** ("連絡する") is redundant — users can scroll to contact. Replace with "Resume" link

---

### 9. **Content Presentation**

**Experience Cards:**

- **Date formatting:** "2024年5月 - 2026年1月" is hard to scan. Consider "5月 2024 - 1月 2026" or add a duration count ("1年8ヶ月")
- **Highlights could be more scannable:** Add icons or emoji (sparingly) to break up text, or use `font-medium` for key phrases

**About Section:**

- **Timeline is too granular:** Five timeline entries for a 6-year career is excessive. Combine or reduce to 3 major milestones
- **Four-column feature grid is cramped on mobile:** Use `sm:grid-cols-1` explicitly

---

### 10. **Interaction & Polish**

- **Hover states are inconsistent:**
  - Featured cards: `-translate-y-1` (4px)
  - Grid cards: `-translate-y-1` (also 4px)
  - Navigation links: no transform, just background color
  - **Fix:** Add consistent `-translate-y-0.5` (2px) for all interactive elements
- **Link styles in contact section:**
  - Social links are plain text with hover color change — too subtle
  - Add an underline decoration on hover: `hover:underline`
- **Badge component feels heavy:**
  - Current: `border border-[var(--border)] bg-[var(--card)] px-3 py-1`
  - Too much padding and border weight. Reduce to `px-2.5 py-0.5` and remove border

---

### 11. **Accessibility & Polish**

- **Color contrast:** Check all text colors against WCAG AA standards. `text-slate-600` on `bg-slate-50` may fail
- **Focus states:** Currently using `focus:ring-4` on cards — good, but needs more contrast. Use `ring-[var(--accent)]` instead of `ring-[var(--accent)]/30`
- **Link discoverability:** GitHub links in hero use `text-slate-600` — they look like disabled text. Use `text-[var(--accent)]` or add an underline

---

### 12. **Mobile Responsiveness**

- **Hero section:** Profile image is too large on mobile. Add `max-w-[240px] lg:max-w-xs`
- **Featured project metrics grid:** `grid-cols-3` breaks on narrow screens. Use `grid-cols-1 sm:grid-cols-3`
- **Skills section:** Three columns on mobile is cramped. Force to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

---

## 🔴 Critical Issues

### 13. **Missing Profile Image**

The code references `/profile.jpg`, but I don't see it in the workspace structure. This will break the site. Add the image or use a placeholder.

---

### 14. **Inconsistent Link Behavior**

- Some project cards link to `/projects/[slug]`
- Others link to `#projects` (which just jumps to the current page section)
- The fallback in `ProjectGridCard` creates broken links

**Fix:** Either create all project detail pages or remove the links and add a "Coming soon" badge for projects without pages.

---

## 📊 Priority Summary

| Priority        | Change                                 | Impact      | Effort |
| --------------- | -------------------------------------- | ----------- | ------ |
| 🔴 **Critical** | Fix missing profile image              | Site breaks | 5 min  |
| 🔴 **Critical** | Remove duplicate projects from grid    | Credibility | 10 min |
| 🎯 **High**     | Simplify hero section (remove bullets) | Clarity     | 15 min |
| 🎯 **High**     | Add semantic color coding to projects  | Personality | 20 min |
| 🎯 **High**     | Increase typography contrast           | Readability | 15 min |
| 💡 **Medium**   | Standardize hover animations           | Polish      | 10 min |
| 💡 **Medium**   | Improve mobile spacing                 | Usability   | 20 min |
| 💡 **Low**      | Add scroll progress indicator          | Delight     | 30 min |

---

## Final Thoughts

**Strengths:**

- Clean, professional structure
- Good use of metrics to show impact
- Consistent component design system

**Main weaknesses:**

- Too much repetition (projects, text)
- Weak visual hierarchy (everything feels equally important)
- Generic color palette (no personality)

**If you only fix 3 things:**

1. Remove duplicate projects from the grid
2. Simplify the hero section (remove redundant bullets)
3. Add semantic color coding to differentiate project types

This would immediately make the portfolio feel more focused, credible, and memorable.
