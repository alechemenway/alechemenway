# Hero intro video — design spec

**Date:** 2026-09-02
**Status:** Approved (design), pending implementation plan
**Branch:** `feat/hero-intro-video`

## Summary

Add a circular, click-to-play "let me introduce myself" intro video to the homepage
hero, ported from julius.fm's hero and reskinned in this site's dark / gold tokens.
The existing hero (headline, lead, buttons, socials, FlowField background) is kept
intact; the video occupies the empty right-side space where the FlowField currently
fades out (layout Option B — "augment in place").

## Goals

- A personal, humanizing intro video in the hero — the differentiator for an AE.
- Zero disruption to the current A-grade hero layout and its entrance motion.
- Simplest interaction that matches Julius: poster → click → plays in place with sound.
- Ship without breaking the hero even before the real video exists (graceful poster fallback).

## Non-goals

- No lightbox / expand-to-16:9 player (rejected in brainstorming).
- No hover-preview loop (rejected).
- No autoplay, no muted background video.
- No new test framework (repo has none; see Verification).
- No change to any other section, page, or component.

## Interaction model

States: `poster` → `playing` → `ended` → (`poster`).

1. **poster** — circular frame shows the poster still with a centered play button.
2. Click play → call `video.play()` with sound (allowed: user-gesture initiated),
   hide the play-button overlay, set native `controls` so the user gets
   pause / scrub / volume with zero custom UI.
3. **ended** → reset to poster state (hide controls, show play button again).

No autoplay means there is nothing to suppress under `prefers-reduced-motion`. The
element's entrance is handled by the parent's existing `FadeUp` (already reduced-motion
aware).

## Component: `src/components/home/IntroVideo.tsx`

New client component. Self-contained; nothing depends on its internals.

**Props**
| prop | type | notes |
|---|---|---|
| `src` | `string` | video URL, e.g. `/videos/intro.mp4` |
| `poster` | `string` | poster still URL |
| `label` | `string?` | annotation text; default `"Let me introduce myself"` |
| `className` | `string?` | layout hook from the parent |

**Behavior / internals**
- Local `useState` for played/ended toggling of the overlay + `controls`.
- `<video>` with `playsInline`, `preload="metadata"`, `poster={poster}`, `src={src}`,
  `controls` toggled on once playing, `onEnded` → reset.
- Play control is a real `<button type="button" aria-label="Play Alec's intro">`,
  keyboard focusable, calls `videoRef.current?.play()`.
- Circular by default: `rounded-full`, `aspect-square`, `overflow-hidden`, 2px ring in
  `--accent`. `object-cover` so a tight-framed clip fills the circle.
- Annotation rendered with the existing `<Accent>` treatment (Instrument Serif italic,
  `--accent`) plus a small arrow glyph, positioned beside the circle.

## Layout change: `src/components/home/Hero.tsx`

The only edit to existing code.

- Desktop (≥880px): place `<IntroVideo>` in the right region of the hero, ~160px,
  vertically centered against the headline/lead block, above the gradient veil
  (`z-[2]`), so it reads over the FlowField. Wrap in one `FadeUp` (delay after the
  socials, e.g. ~0.5) to join the existing staggered entrance.
- Mobile (<880px): the video stacks below the buttons/socials, centered; the headline
  and copy are never crowded.
- Implementation approach: keep the current `Wrap` content; add the video via the
  existing layout without converting the hero to a rigid two-column grid (Option B,
  not Option A). Exact positioning (absolute vs. flex within `Wrap`) is a plan-level
  detail; requirement is: video top-right on desktop, stacked on mobile, over the veil.

## Assets (provided by Alec — hard dependency)

- `public/videos/intro.mp4` — talking-head, **filmed tight/centered** (head-and-shoulders)
  so a circular crop works. ~30–60s.
- `public/videos/intro-poster.jpg` — one still frame (mid-wave reads well).
- Optional `public/videos/intro.webm` for smaller transfer; `.mp4` alone is acceptable.
- **Fallback until assets exist:** the existing portrait lives at
  `src/images/portrait-2026.jpg` (a Next static import, not a `public/` URL), so the
  fallback poster uses its imported `.src` — `import portrait from '@/images/portrait-2026.jpg'`
  then `poster={portrait.src}`. If `src` (the video) is absent, `IntroVideo` shows the
  poster with the play button hidden, so the hero never ships broken. Plan decides the
  exact fallback wiring.

## Accessibility

- Play trigger is a labeled `<button>`, keyboard-operable.
- Native `controls` on play give accessible pause/scrub/volume.
- Sound only starts on explicit user click (no surprise audio).
- Annotation is decorative; the button carries the accessible name.

## Verification (no unit-test harness in repo)

The repo has only `dev` / `build` / `lint` scripts and no test runner. Adding one for a
single presentational component is out of scope (simplest-solution-first). Verify by:

1. `npm run lint` and `npm run build` are clean.
2. Manual interaction check in the browser (`npm run dev`):
   poster renders → click plays with sound → controls appear → video ends → resets to
   poster; play button reachable and operable by keyboard; on <880px the video stacks
   below the copy.
3. Re-run `npx designlang grade https://alechemenway.com` after deploy — confirm no
   regression in the A grade (video is an `<video>` element; expect no token/CSS-health
   change).

## Files

- **New:** `src/components/home/IntroVideo.tsx`
- **Edit:** `src/components/home/Hero.tsx`
- **Assets (Alec):** `public/videos/intro.mp4`, `public/videos/intro-poster.jpg` (+ optional `.webm`)
- **Not touched:** every other component, page, and the design tokens.
