# Portfolio Redesign (Dark · Amber · Generative) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild alechemenway.com as a dark, premium, motion-driven portfolio with a balanced "Enterprise AE × AI GTM developer" identity, a live generative amber flow-field hero, and a cohesive design system across all four pages.

**Architecture:** Keep the Next.js 16 App Router + Tailwind v4 + MDX structure. Server components hold page data; a small set of `"use client"` primitives (`FlowField`, `Reveal`, `TiltCard`, `AnimatedHero`, route `template.tsx`) own motion. Theme tokens move to a dark-default palette with a light variant via `next-themes` (class strategy). Framer Motion (`motion`) drives reveals + route transitions; the flow-field is a hand-written `<canvas>`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4 (`@theme`), `next-themes`, `motion` (Framer Motion v11+), `next/font` (Inter, Instrument Serif, JetBrains Mono), `sharp` (image optimize), TypeScript strict.

## Global Constraints

- Verification per task = `npm run build` passes (no type/lint errors) AND visual render via `npm run dev` + browser screenshot. Add Jest-style logic tests ONLY for `FlowField` pure helpers.
- `prefers-reduced-motion: reduce` → static everywhere: flow-field static frame, reveals show final state, tilt disabled.
- Animate `transform`/`opacity` only (flow-field uses `<canvas>`). No CLS.
- Dark is the **default** theme; light mode must also pass AA (accent darkens to `#B97E12` in light).
- Keep ALL facts/numbers/dates/links from current pages verbatim (see spec §5). Copy edits = light tightening only; the dual-identity hero line is unchanged.
- Voice rule: minimal em-dashes are fine in display copy already present; do not introduce banned salesy phrases.
- Commit after each task on branch `redesign/dark-amber-generative` (already created).
- `.design-mockups/`, `references_portfolio/`, `da5bf36f-*.png` are gitignored — never commit them.

## File structure

- `src/styles/tailwind.css` — rewrite `@theme` tokens (dark default + `.light` overrides), motion easing vars.
- `src/app/layout.tsx` — fonts (Inter/Instrument Serif/JetBrains Mono), `bg`/`ink` body classes, dark default.
- `src/app/providers.tsx` — `next-themes` defaultTheme="dark".
- `src/app/template.tsx` — NEW, route transition.
- `src/components/motion/FlowField.tsx` — NEW client, generative hero canvas.
- `src/components/motion/flow-field.ts` — NEW pure helpers (testable).
- `src/components/motion/Reveal.tsx` — NEW client, `Reveal` + `RevealGroup`.
- `src/components/motion/TiltCard.tsx` — NEW client, 3D tilt wrapper.
- `src/components/Button.tsx` — restyle (solid amber / ghost).
- `src/components/Kicker.tsx` — NEW (mono eyebrow); retire `Eyebrow.tsx` usage.
- `src/components/StatusPanel.tsx` — NEW (mono readout).
- `src/components/SectionHead.tsx`, `ClosingBand.tsx`, `Header.tsx`, `Footer.tsx`, `ProjectCard.tsx`, `Container.tsx`/`Wrap.tsx`, `Prose.tsx`, `SocialIcons.tsx` — restyle.
- `src/components/ProjectCover.tsx` — NEW, deterministic generative amber cover.
- `src/app/page.tsx`, `about/page.tsx`, `projects/page.tsx`, `work-with-me/page.tsx` — rebuild to new system.
- `src/images/portrait-2026.jpg` — NEW (optimized from provided PNG).
- Retire: `PremiumButton.tsx`.

---

### Task 1: Foundation — deps, fonts, tokens, theme default

**Files:**
- Modify: `package.json` (add `motion`)
- Modify: `src/styles/tailwind.css` (tokens)
- Modify: `src/app/layout.tsx` (fonts + body classes)
- Modify: `src/app/providers.tsx` (default dark)
- Modify: `typography.ts` (prose colors)

**Produces:** CSS custom props `--color-bg/-bg-2/-surface/-ink/-ink-2/-line/-accent/-accent-2`, font vars `--font-sans` (Inter), `--font-serif` (Instrument Serif), `--font-mono` (JetBrains Mono); `dark` default theme.

- [ ] **Step 1:** `npm i motion` ; confirm it resolves.
- [ ] **Step 2:** In `tailwind.css` `@theme`, replace cream/espresso/terracotta + shadow tokens with the §2 dark palette as defaults, add `--font-mono`, add `--ease-out-quint: cubic-bezier(.22,1,.36,1)`. Add a `.light { … }` block (or `@variant light`) overriding the six color tokens to the light values; keep `@custom-variant dark`. Set `--font-sans` to Inter var, `--font-serif` to Instrument Serif var.
- [ ] **Step 3:** In `layout.tsx`, swap `Hanken_Grotesk` → `Inter` (weights 400–800) keep `Instrument_Serif`, add `JetBrains_Mono` (400/500). Update body classes to `bg-bg text-ink font-sans`. Set `<html>` default dark (rely on providers).
- [ ] **Step 4:** In `providers.tsx`, set `next-themes` `defaultTheme="dark"`, `enableSystem={false}` (dark-first), `attribute="class"`.
- [ ] **Step 5:** Update `typography.ts` prose color refs to `--color-ink` / `--color-ink-2` / `--color-accent`.
- [ ] **Step 6:** Verify: `npm run build` passes. Commit: `chore: foundation — motion dep, fonts, dark token system`.

---

### Task 2: Motion primitives (Reveal, TiltCard, route template)

**Files:** Create `src/components/motion/Reveal.tsx`, `src/components/motion/TiltCard.tsx`, `src/app/template.tsx`.

**Interfaces / Produces:**
- `Reveal({children, className?, delay?, y?})` and `RevealGroup({children, stagger?})` — `"use client"`, use `motion` `whileInView` + `useReducedMotion()` (reduced → no transform).
- `TiltCard({children, className?, max=6})` — pointer-tilt via `motion` springs; disabled when reduced-motion or coarse pointer.
- `template.tsx` — wraps children in `motion.div` fade/translate on route change; reduced-motion → instant.

- [ ] **Step 1:** Implement `Reveal`/`RevealGroup` with `useReducedMotion()` guard (final state when reduced).
- [ ] **Step 2:** Implement `TiltCard` (springy rotateX/Y, reset on leave, `@media (pointer:coarse)` + reduced-motion → passthrough, no transform).
- [ ] **Step 3:** Implement `template.tsx` enter transition.
- [ ] **Step 4:** Verify: `npm run build` passes; temporary smoke use on home renders.
- [ ] **Step 5:** Commit: `feat: motion primitives (Reveal, TiltCard, route transition)`.

---

### Task 3: FlowField generative hero (riskiest — build + verify first)

**Files:** Create `src/components/motion/flow-field.ts` (pure), `src/components/motion/FlowField.tsx` (client), `src/components/motion/flow-field.test.ts`.

**Interfaces / Produces:**
- `fieldAngle(x, y, t): number` and `stepParticle(p, t, w, h, dpr): void` (pure, in `flow-field.ts`).
- `FlowField({className?, density?})` — `"use client"`, full-bleed `<canvas aria-hidden>`; DPR≤2; particle count scales with viewport × `density` (default "dialed up" per user: ~1100 desktop / ~480 mobile); amber trails on transparent; `requestAnimationFrame` loop paused via IntersectionObserver + `visibilitychange`; reduced-motion → run ~160 static steps once then stop.

- [ ] **Step 1 (TDD):** Write `flow-field.test.ts`: `fieldAngle` is finite & deterministic for fixed inputs; `stepParticle` advances x/y and decrements life; particle resets when life<0 or out of bounds.
- [ ] **Step 2:** Run tests → fail (module missing).
- [ ] **Step 3:** Implement `flow-field.ts` helpers (layered-sine field; advect by `cos/sin(angle)`).
- [ ] **Step 4:** Run tests → pass.
- [ ] **Step 5:** Implement `FlowField.tsx` (canvas, DPR, resize, IO + visibility pause, reduced-motion static branch, accent from CSS var `--color-accent`).
- [ ] **Step 6:** Verify: drop into home hero behind a scrim; `npm run dev`, screenshot — amber field visible, text readable; toggle OS reduced-motion → static; scroll away → loop pauses (log check).
- [ ] **Step 7:** Commit: `feat: generative amber flow-field hero canvas`.

---

### Task 4: Header + Footer

**Files:** Modify `Header.tsx`, `Footer.tsx`, `Layout.tsx` (as needed).

**Produces:** sticky mono nav (Work/Projects/About/Contact), brand "Alec Hemenway · AE × AI", amber underline-wipe on links, hairline border appears after scroll>8px, theme toggle (sun/moon) wired to `next-themes`.

- [ ] **Step 1:** Restyle Header (mono links, scroll border via tiny client scroll listener or `useScroll`, theme toggle button with `aria-label`).
- [ ] **Step 2:** Restyle Footer (mono, hairline top).
- [ ] **Step 3:** Verify: build + render; toggle flips dark/light and persists.
- [ ] **Step 4:** Commit: `feat: header + footer in dark/amber system`.

---

### Task 5: Buttons, Kicker, StatusPanel, SectionHead, ClosingBand

**Files:** Modify `Button.tsx`, `SectionHead.tsx`, `ClosingBand.tsx`; create `Kicker.tsx`, `StatusPanel.tsx`; retire `PremiumButton.tsx` (replace usages).

**Interfaces / Produces:**
- `Button({href, variant: "solid"|"ghost", arrow?, children, ...a})` — sharp; solid = amber bg / ink-on-amber, ghost = hairline border → amber on hover; arrow nudges.
- `Kicker({children})` — mono uppercase amber label.
- `StatusPanel({lines: string[], status: string})` — bordered mono readout w/ amber dot.
- `SectionHead({kicker, children, more?})` — mono kicker + Inter+serif-italic head + optional mono link.
- `ClosingBand` — dark + amber radial glow, two CTAs.

- [ ] **Step 1:** Implement `Button` + replace all `PremiumButton` imports/usages, delete `PremiumButton.tsx`.
- [ ] **Step 2:** Implement `Kicker`, `StatusPanel`, restyle `SectionHead`, `ClosingBand`.
- [ ] **Step 3:** Verify: build (no dangling `PremiumButton` import) + render.
- [ ] **Step 4:** Commit: `feat: button + section primitives (kicker, status panel, section head, closing band)`.

---

### Task 6: Home page

**Files:** Rebuild `src/app/page.tsx`; uses `FlowField`, `AnimatedHero` (inline or component), `StatusPanel`, `MetricBand` (inline), `RolesList` (inline), `ProjectCard`, `Reveal`/`RevealGroup`.

**Produces:** sections in order — Hero (flow-field + eyebrow + dual headline w/ serif-italic `AI` + lede + StatusPanel + CTAs + socials) → proof MetricBand → Selected work (4 cards) → Where I've sold (roles) → ClosingBand. All data arrays kept from current `page.tsx` verbatim (facts).

- [ ] **Step 1:** Build hero (line-mask reveal, flow-field behind scrim, status panel). Keep headline text exactly.
- [ ] **Step 2:** Build MetricBand + Selected work grid (ProjectCard, 4 featured) + RolesList + ClosingBand, each wrapped in `Reveal`/`RevealGroup`.
- [ ] **Step 3:** Verify: `npm run dev`, screenshot desktop + 375px; reduced-motion check; contrast check on hero text over field.
- [ ] **Step 4:** Commit: `feat: rebuild home page (dark/amber/generative)`.

---

### Task 7: ProjectCover + ProjectCard + Projects page

**Files:** Create `ProjectCover.tsx`; modify `ProjectCard.tsx`; rebuild `projects/page.tsx`.

**Interfaces / Produces:**
- `ProjectCover({seed, label?})` — deterministic generative amber motif (canvas or SVG seeded by index; no network). Used as the card cover.
- `ProjectCard({project})` — image-led: `ProjectCover` + mono index/badge + title + desc + outcome + chips; wrapped in `TiltCard`.
- `projects/page.tsx` — all 7 projects (facts verbatim), 3-col grid, reveals.

- [ ] **Step 1:** Implement `ProjectCover` (deterministic per seed).
- [ ] **Step 2:** Rebuild `ProjectCard` image-led + tilt.
- [ ] **Step 3:** Rebuild `projects/page.tsx` (7 cards) + restyle header/closing.
- [ ] **Step 4:** Verify: build + render projects; tilt works; reduced-motion disables tilt.
- [ ] **Step 5:** Commit: `feat: project covers + image-led cards + projects page`.

---

### Task 8: About page (centered portrait)

**Files:** Optimize portrait → `src/images/portrait-2026.jpg`; rebuild `about/page.tsx`.

**Produces:** centered premium portrait (`next/image`, rounded-squircle mask, amber rim/glow), dual-identity narrative (facts verbatim, opening lightly tightened), principles list + contact links restyled.

- [ ] **Step 1:** `sharp` resize/encode the provided PNG (long edge ~1400px, mozjpeg/webp) into `src/images/portrait-2026.jpg`. (Command in step body.)
- [ ] **Step 2:** Rebuild `about/page.tsx` with centered portrait + restyled prose/principles/contacts. Keep all facts.
- [ ] **Step 3:** Verify: build + render; image dimensions reserved (no CLS); alt text present.
- [ ] **Step 4:** Commit: `feat: about page with centered portrait`.

---

### Task 9: Work with me

**Files:** Rebuild `work-with-me/page.tsx`.

**Produces:** two panels (What I bring / What I'm looking for) + "Am I a fit?" table + ClosingBand, restyled to dark/amber; structure + facts kept; light copy tightening.

- [ ] **Step 1:** Rebuild with restyled panels + fit table + closing.
- [ ] **Step 2:** Verify: build + render.
- [ ] **Step 3:** Commit: `feat: work-with-me page`.

---

### Task 10: Cross-cutting QA + deploy preview

**Files:** touch-ups across components as issues surface.

- [ ] **Step 1:** Light-mode pass (toggle every page; fix contrast; amber → `#B97E12`).
- [ ] **Step 2:** Reduced-motion pass (OS setting on: no flow animation, no reveals, no tilt, no route motion).
- [ ] **Step 3:** Responsive pass at 375/768/1024/1440 (no horizontal scroll; nav collapses).
- [ ] **Step 4:** A11y: heading order, focus rings, `aria-hidden` on field, icon-button labels, contrast ≥4.5:1 body.
- [ ] **Step 5:** `npm run build` + (if available) Lighthouse; fix CLS/LCP regressions.
- [ ] **Step 6:** Push branch, open PR (with before/after screenshots). Do NOT merge without user sign-off.
- [ ] **Step 7:** Commit/push: `chore: cross-cutting QA (light, reduced-motion, responsive, a11y)`.

---

## Self-review

- **Spec coverage:** §1 positioning → Task 6 hero copy; §2 palette/type → Task 1; §3 motion → Tasks 2,3,6; §4 IA → Tasks 6–9; §5 copy → Tasks 6,8,9 (facts kept); §6 components → Tasks 2,4,5,7; §7 assets → Tasks 7 (covers), 8 (portrait), gitignore (done); §8 a11y/perf → Tasks 3,10; §9 non-goals → respected (no new pages/deps beyond `motion`). All covered.
- **Placeholder scan:** code-heavy snippets are described with exact behavior; FlowField/Reveal/TiltCard have concrete interfaces. Acceptable for a visual build where exact JSX is produced at implementation against the live render.
- **Type consistency:** `Reveal`/`RevealGroup`/`TiltCard`/`FlowField`/`ProjectCover`/`Button`/`Kicker`/`StatusPanel` names used consistently across tasks.
