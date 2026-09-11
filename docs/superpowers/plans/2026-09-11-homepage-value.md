# Homepage Value Progression Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. The implementing agent owns code and tests; reviewers are read-only.

**Goal:** Implement the approved V2 revision 5 homepage hero.
**Architecture:** Keep Introduction server-rendered. Add one small client component for the four working principles and the decorative connection to #work. Use CSS for responsive rails and staged emphasis; an IntersectionObserver starts animation once. Existing content and portrait remain server-rendered and readable without JavaScript.
**Tech Stack:** Existing Next.js, React, TypeScript, CSS, native browser APIs. No dependencies.
**Spec:** /Users/alechemenway/.codex/visualizations/2026/09/11/01a08e13-4a1f-7542-9c6d-73d1ec5d902b/hero-prototypes/directions.html?version=value (revision 5); DIRECTIONS-NOTES.md records approved iterations.

## Global Constraints

- Portrait fully visible beside introduction; four aligned desktop columns below.
- Mobile portrait and process stack; four stops connected vertically.
- Discover / Map / Implement / Prove and their approved descriptions, plus expected-ROI pricing footer.
- No RIA hero footnote, floating caption, duplicate explore link, or surrounding section rules.
- Preserve all other homepage sections, work details, navigation, essays, and About.
- Motion starts when in view, plays once, and remains readable with reduced motion or no JavaScript.
- Include an actual #work link; the decorative trace cannot intercept input.
- No prototype controls or new dependency. Local verification is not publication.

## Task 1: Render and animate the approved hero

Files: modify src/components/editorial/Introduction.tsx; create src/components/editorial/ValueProcess.tsx and src/styles/homepage-value.css; extend scripts/assert-editorial-site.mjs.

- [x] Run the existing nine-route contract against the unchanged local preview.
- [x] Add failing rendered assertions: exactly four ordered headings; all descriptions and pricing in initial HTML; meaningful #work link; no RIA footnote or prototype controls.
- [x] Run the contract and confirm the new progression assertion fails.
- [x] Import ValueProcess into Introduction, remove only the superseded footnote/caption/explore markup, preserve headline/intro/actions, and use responsive Image sizes for a maximum 350px portrait.
- [x] Render the four steps from a fixed array into an ordered list with decorative numbered stations. Style horizontal connectors using each list item's pseudo-element; switch to vertical connectors at 760px. Keep default styles fully visible.
- [x] Observe the first step at 60% visibility, add a motion attribute once, and disconnect. Under reduced motion, suppress CSS animations and observer-driven animation. Clean up observers/listeners on unmount.
- [x] Draw the desktop-only decorative trace from the work link to the existing work heading. Recalculate on layout resize and font readiness. Normalize SVG path length so resizing cannot retain stale dash lengths.
- [x] Scope hero layout and typography overrides to .value-hero. Give process and footer whitespace without divider borders.
- [x] Run the rendered contract again.

## Task 2: Validate and finish

- [x] Run TypeScript, ESLint, existing animation logic checks, production build, and nine-route rendered contract.
- [x] Inspect 1440/900/768 desktop widths and 390/320 phones; assert no horizontal overflow and aligned desktop station centers.
- [x] Check work link, motion once, reduced-motion behavior, source-rendered fallback, and resize behavior.
- [x] Read-only standards and spec reviews against base 00b67e9; fix material findings and repeat affected checks.
- [x] Review diff size/risk. Alec approved the required Cursor visual pass on 2026-09-11; implementation cleared for commit.
- [x] Leave a local app preview and record checks. Do not push or merge a branch that triggers deployment without current release authorization.
