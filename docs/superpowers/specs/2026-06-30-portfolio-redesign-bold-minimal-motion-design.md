# Portfolio Redesign — Dark · Amber · Generative (Motion-Driven)

**Date:** 2026-06-30
**Site:** alechemenway.com (Next.js 16 · React 19 · Tailwind v4 · MDX · Vercel)
**Status:** Direction approved via live mockup (`.design-mockups/home-v2.html`). Spec finalized; build authorized.
**Supersedes:** the earlier light "bold-minimal / electric-blue" direction in this doc's v1. That is retired.

---

## 1. Goal & positioning

A **premium, motion-driven personal portfolio** presenting a **balanced dual identity**: an **Enterprise Account Executive** (four-year quota streak, $3M+ self-sourced pipeline) **× an AI GTM developer** (ships prospecting skills, eval harnesses, live products). Neither half is the headline — the hero asserts both, and the work + numbers prove both.

**Audience:** hiring managers, founders, recruiters at AI-native companies (active job search). Conversion goal: book a conversation / download résumé.

**Tone:** clean, modern, conversational/open, technically impressive. The generative hero is a *demonstration* of the "builds AI" claim, not decoration.

**Direction driven by user references:** Axiom Research (dark + gold generative line-art + mono instrument labels), Luke Baffait (warm, serif-italic editorial, soft motion, 3D gallery), Muscat Group (confident scale + animated signature motif).

---

## 2. Visual system (locked)

### Palette — dark-first, light mode available (keep `next-themes`; **dark is default**)
| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--color-bg` | `#0A0A0B` | `#FAF8F4` | page canvas |
| `--color-bg-2` | `#111113` | `#F2EEE7` | bands / alt sections |
| `--color-surface` | `#16151A` | `#FFFFFF` | cards |
| `--color-ink` | `#F4F1EB` (warm off-white) | `#171410` | primary text |
| `--color-ink-2` | `#9C968B` | `#6B6358` | secondary text |
| `--color-line` | `rgba(255,255,255,.10)` | `rgba(0,0,0,.12)` | hairline borders |
| `--color-accent` | `#E8B04B` (amber/gold) | `#B97E12` (darker gold for AA on light) | the one accent |
| `--color-accent-2` | `#F6C66C` | `#E8B04B` | hover/glow |

- Accent is used for: serif-italic emphasis words, the flow-field, link underlines, the status dot, solid CTAs, stat units, "live/open-source" badges.
- Sharp 0-radius on structural elements (buttons, cards, sections, status panel). Chips keep pill radius.
- No soft drop-shadows; depth = hairline borders + the amber radial glows.

### Typography (reuses the repo's Instrument Serif)
- **Inter** (next/font/google) — display + body. Headlines weight 800, tracking `-0.035em`, line-height ~0.96, `clamp()`-scaled.
- **Instrument Serif** *italic* (already wired in the repo) — emphasis words inside headlines (`AI`, `shipped.`, `sold.`, `next seat.`) and the occasional editorial accent. Amber-colored.
- **JetBrains Mono** (next/font/google) — eyebrow, status-readout panel, stat numbers, project index + badges + chips, nav links, dates, footer.
- **Remove** Hanken Grotesk (replaced by Inter). Keep Instrument Serif.

---

## 3. Motion system (Motion-Driven)

**Library:** Framer Motion (`motion` package, `motion/react`) for component reveals + route transitions. The flow-field is a hand-written `<canvas>`. Trivial hovers stay CSS.

**Hard guardrails:**
- **`prefers-reduced-motion: reduce` → static.** `useReducedMotion()`; flow-field renders a single static frame (~160 pre-stepped iterations) and does not animate; reveals render final state.
- **Transform/opacity only.** No animating layout properties. Flow-field uses canvas (GPU-compositable layer).
- **No CLS.** Reserve space; reveals translate within bounds.
- **Pause when offscreen / tab hidden.** Flow-field `requestAnimationFrame` loop stops via IntersectionObserver + `visibilitychange` for battery/perf.

**Motion inventory:**
1. **Generative flow-field hero** — `<canvas>` particle flow advected by a layered-sine noise field, faint amber trails on near-black. **Dialed up per user**: higher particle count + opacity than the first mockup, still behind a left/radial scrim so headline stays ≥4.5:1 readable. DPR-aware, capped particle count, mobile count reduced. `aria-hidden`. Static frame under reduced-motion.
2. **Hero line-mask reveal** — headline animates in by line; eyebrow → lede → status panel → CTAs → socials stagger.
3. **Scroll reveals** — sections/cards/rows fade + translateY via `whileInView` (`once`), grids/lists stagger ~80ms.
4. **3D tilt project gallery** — cards tilt toward cursor (rotateX/Y ≤6°) + cover parallax-scale on hover (Luke-style). Disabled under reduced-motion / touch.
5. **Microinteractions (CSS)** — CTA arrow nudge, solid-CTA → accent-2, nav link amber underline wipe, role-row indent, stat hover.
6. **Per-route transition** — `app/template.tsx` replays a subtle fade/translate on navigation.

**Architecture:** server components hold data; client primitives: `FlowField`, `Reveal`/`RevealGroup`, `AnimatedHero`, `TiltCard`, `app/template.tsx`.

---

## 4. Information architecture (per page)

### Home (`src/app/page.tsx`)
1. **Hero** — flow-field bg; eyebrow `ENTERPRISE AE × AI GTM DEVELOPER`; dual-identity headline; lede; **mono status panel** (open-to-roles · location · stack); CTAs (View the work, Résumé); socials.
2. **Proof metric band** — 4 mono stats (facts unchanged).
3. **Selected work** — 4 featured projects, **image-led cards** with **generated amber covers**, 3D tilt, mono badges/chips.
4. **Where I've sold** — role list ("the receipts").
5. **Closing** — "next seat" CTA + amber glow.

### Projects (`src/app/projects/page.tsx`)
- All 7 projects, image-led grid (3-col desktop), each with a **generated on-brand cover**, scroll reveals + tilt. Facts unchanged.

### About (`src/app/about/page.tsx`)
- **Centered portrait** using the user-provided photo (`da5bf36f-…png`), premium framing (rounded-squircle mask, subtle amber rim/glow). Dual-identity narrative (kept; lightly tightened — see §5). Principles list + contact links restyled.

### Work with me (`src/app/work-with-me/page.tsx`)
- Keep structure (two panels + "Am I a fit?" table + closing). Restyle to dark/amber. Targeting stays "enterprise AE / AI-GTM seat at an AI-native company." Light copy tightening only.

---

## 5. Copy (keep facts; light tightening only)

> Balanced dual identity means **less** copy change than the retired v1 — the existing dual framing already fits.

- **Home hero headline:** keep the existing dual line — *"I sell enterprise software — and build the AI that sells it."* (`AI` set in amber serif italic). No change to meaning.
- **Home hero subhead:** lightly tightened, balanced (AE streak + GTM developer + $3M proof).
- **New mono status panel** copy: "Open to enterprise AE / AI-GTM roles · Minneapolis, MN · Remote-ready · Stack: Claude · Apollo · Next.js · Notion." *(Confirm the "open to roles" line is accurate to broadcast publicly.)*
- **Section kickers (mono):** "Selected work" / "The receipts."
- **About:** keep the dual framing and **all facts/numbers**; tighten the opening 1–2 sentences only.
- All stats, dates, companies, links — unchanged.

---

## 6. Components

**Add (client where noted):** `FlowField`*, `AnimatedHero`*, `Reveal`/`RevealGroup`*, `TiltCard`*, `app/template.tsx`*, `StatusPanel`, `MetricBand`, `RolesList`, `ProjectCover` (deterministic generative amber/SVG-or-canvas cover seeded by project), `Kicker` (mono).  *= "use client"

**Restyle:** `Header` (mono nav, amber underline, hairline-on-scroll, theme toggle), `Footer`, `Button` (sharp solid-amber + ghost, arrow nudge), `ProjectCard` (image-led + tilt + cover), `SectionHead` (mono kicker + serif-italic accent), `ClosingBand` (dark + amber glow), `Container`/`Wrap`/`Section`, `Prose`, `SocialIcons`, `Eyebrow`→`Kicker`.

**Remove / retire:** `PremiumButton`, cream/espresso/terracotta + serif-pairing tokens, soft-shadow tokens, rotated-portrait markup, Hanken font.

**Config:** rewrite `@theme` tokens (dark default + light) in `src/styles/tailwind.css`; swap fonts in `layout.tsx` (Inter + Instrument Serif + JetBrains Mono; set dark as default theme); update `typography.ts`; add `motion` to deps.

---

## 7. Assets

- **Portrait:** move the provided `da5bf36f-…png` (2048×3072, ~7.8 MB) into `src/images/`, **optimize** (resize ~1200px long edge, export optimized via `next/image` + `sharp`); use on About (centered) and optionally a small hero/footer treatment. Original stays out of git.
- **Project covers:** generated on-brand (deterministic amber generative motif via `ProjectCover`) — no external image dependency, ties to the hero's generative theme. User can swap real screenshots later.
- `references_portfolio/` and `.design-mockups/` are reference/scratch — **gitignored**, not shipped.

---

## 8. Accessibility & performance

- Reduced-motion fully honored (§3); flow-field static, reveals off, tilt off.
- Contrast: body text on dark ≥4.5:1; amber used for large text / accents (verify amber-on-dark for any small amber text; use ink for small body). Light-mode accent darkened to `#B97E12` for AA. Visible focus rings (2px amber).
- Flow-field: `aria-hidden`, paused offscreen/hidden, particle cap, DPR≤2, mobile-reduced.
- `next/font` swap; `next/image` for portrait (dimensions reserved); generated covers are CSS/canvas (no network).
- Breakpoints 375/768/1024/1440; no horizontal scroll; body ≥16px mobile; `min-h-dvh`.

---

## 9. Non-goals

- No new pages beyond the four; no blog/MDX content build-out.
- No backend/forms — contact stays `mailto:` + existing Google Calendar link.
- No résumé PDF changes; keep Vercel Analytics.
- No new UI deps beyond `motion`.

---

## 10. Implementation order (for the plan)

1. **Foundation:** branch, gitignore, tokens (dark+light), fonts, `motion` dep, optimize portrait. Primitives: `Button`, `Kicker`, `Reveal`, `TiltCard`, `template.tsx`.
2. **FlowField** component (perf + reduced-motion + offscreen-pause) — the riskiest piece; build + verify first.
3. **Home** (proves the system end-to-end).
4. **Projects** (+ `ProjectCover` generator).
5. **About** (centered portrait + optimized image).
6. **Work with me.**
7. **Cross-cutting:** light-mode pass, reduced-motion pass, responsive pass, a11y/contrast verification, `next build` + Lighthouse, deploy preview.

---

## 11. Open items (resolve during build)

1. Confirm the public "open to roles" status line is OK to broadcast.
2. Flow-field "dialed up" intensity — tune live against readability during the Home build.
3. Light mode is secondary; dark is the default and primary QA target.
