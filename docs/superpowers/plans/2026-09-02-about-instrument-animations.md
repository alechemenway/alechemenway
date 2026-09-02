# About Instrument Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the About page's existing general-purpose motion with exactly six instrument-like animations that are one-shot, layout-stable, and fully static under reduced motion.

**Architecture:** Keep the route server-rendered and its existing client content boundary. Put shared timings, thresholds, ease-out curves, and pure progression helpers in `src/lib/animations.ts`; put About-only hooks and renderers in the existing `AboutContent.tsx` so no new generalized component layer is introduced. Use `motion/react` for viewport and scroll transforms, plus `requestAnimationFrame` for the two-phase 112% counter and the 300ms scramble.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion 12, Node assertion scripts

**Spec:** Current task brief; existing content contract in `docs/2026-09-02-about-interface-options.md`

## Global Constraints

- Implement only the six requested animations; remove About-page motion not in that list.
- Every viewport-triggered animation runs once; the ellipsis and page progress line are scroll-position instruments.
- `prefers-reduced-motion` renders the complete final state with zero movement and hides the progress line.
- Centralize all durations, ease-out curves, and viewport thresholds in `src/lib/animations.ts` as named exports.
- No individual animation exceeds 1.5 seconds; the amber status dot is the only loop.
- Preserve layout dimensions throughout animation and keep CLS below 0.1.

---

### Task 1: Lock the timing and progression contract

**Files:**

- Modify: `src/lib/animations.ts`
- Create: `scripts/assert-about-animation-logic.mjs`

**Interfaces:**

- Consumes: Motion `Variants` typing and normalized progress values from 0 to 1.
- Produces: `easeOutExpo(progress)`, `overQuotaCounter`, `teletypeConfig`, `scrollProgressConfig`, `systemHeadlineConfig`, `contextBarConfig`, `ellipsisConfig`, and `getEllipsisOpacities(progress)`.

- [ ] **Step 1: Write the failing pure-logic test**

Assert hand-derived counter timing constants, the ease-out endpoints, and ellipsis opacity tuples at entry, midpoint, and exit.

- [ ] **Step 2: Run the test to verify red**

Run: `node --experimental-strip-types scripts/assert-about-animation-logic.mjs`

Expected: FAIL because the new named exports do not exist.

- [ ] **Step 3: Implement the smallest centralized config**

Use a 900ms 0→100 run, 200ms hold, 250ms 100→112 overrun, 120ms percent-glyph flicker, 30ms character cadence, 530ms cursor blink, 120ms line gap, 50ms word stagger, and 1.5s diagram draw.

- [ ] **Step 4: Run the pure-logic test to verify green**

Run: `node --experimental-strip-types scripts/assert-about-animation-logic.mjs`

Expected: PASS with exact endpoint and discrete-step assertions.

### Task 2: Implement the six About instruments

**Files:**

- Modify: `src/components/about/AboutContent.tsx`
- Modify: `scripts/assert-about-field-notes.mjs`

**Interfaces:**

- Consumes: Task 1 config, `useReducedMotion`, `useInView`, `useScroll`, `useTransform`, and the existing About content/links.
- Produces: one `data-over-quota-counter`, one `data-system-diagram`, one fixed progress rule, teletype markers on Field Note 02 and its method list, animated self-reported receipt bars, and three scroll-driven ellipsis dividers.

- [ ] **Step 1: Extend the rendered-route assertion and observe red**

Require the 112% numeral with a separate percent glyph, semantic full-text teletype fallbacks, a six-node inline SVG, stable receipt labels, and three complete ellipses in server HTML.

- [ ] **Step 2: Implement the counter and teletype**

Drive the counter with one guarded `requestAnimationFrame` timeline and reserve the final `112` width. Reserve full teletype strings invisibly, type visible characters over them, blink the cursor only while active, and stop observing after entry.

- [ ] **Step 3: Implement the progress rule, system headline, context bar, and ellipsis**

Use transform-only global scroll progress, one-shot word/SVG variants, a 2s opacity-only status-dot loop plus 300ms fixed-width scramble, and discrete opacity transforms over `['start 65%', 'end 35%']`.

- [ ] **Step 4: Remove unlisted About motion**

Render the hero, body copy, stat emphasis, portrait, closing heading, and contact actions statically; remove their former entrance/parallax/translation motion.

- [ ] **Step 5: Run local logic, route, type, and lint checks**

Run the animation-logic assertion, TypeScript, ESLint, and the existing route assertion against a local production server.

Expected: all pass; server HTML contains no hidden primary content.

### Task 3: Verify visual, accessibility, performance, and bundle constraints

**Files:**

- Modify if a verified defect requires it: `src/components/about/AboutContent.tsx`
- Modify if a verified contract defect requires it: `src/lib/animations.ts`

**Interfaces:**

- Consumes: the locally passing implementation from Task 2.
- Produces: build/lint/assertion evidence, browser evidence for normal and reduced motion, CLS below 0.1, and a gzipped client-JS delta below 15KB.

- [ ] **Step 1: Run the production build and every existing assertion script**

Run `npm run build`, `npm run lint`, and each `scripts/assert-*.mjs` command with its required local server.

- [ ] **Step 2: Inspect desktop, mobile, and reduced-motion behavior**

Verify all content remains readable, the left rule is hidden under 768px/reduced motion, the counter/teletype/diagram each run once, and no unlisted motion is present.

- [ ] **Step 3: Measure CLS and client JavaScript**

Record Lighthouse CLS and compare gzip-compressed About client chunks before and after the implementation; require CLS < 0.1 and added JavaScript < 15KB.

- [ ] **Step 4: Run code review and the required Cursor diff gate**

Review only the scoped animation, test, and plan files; preserve the unrelated `.superpowers/` directory and concurrent résumé work.

- [ ] **Step 5: Commit the reviewed patch**

Stage only this task's files and commit with `feat: add instrument motion to about page` after the visual diff gate.
