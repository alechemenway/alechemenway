# Hero Intro Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a circular, click-to-play "let me introduce myself" intro video to the homepage hero, ported from julius.fm and reskinned in this site's dark/gold tokens, without disturbing the existing hero.

**Architecture:** One new self-contained client component (`IntroVideo`) that owns the poster→playing→ended state, plus a single edit to `Hero.tsx` that drops it into the right-side dead space (desktop) or stacks it below the copy (mobile). No token or other-component changes.

**Tech Stack:** Next.js (App Router), React client component, Tailwind v4 (token utilities from `@theme`), `motion/react` (existing `FadeUp`), native `<video>`.

## Global Constraints

- **No new dependencies.** Use native `<video>` + existing `motion/react`; do not add a video library.
- **No test runner exists** (`package.json` has only `dev`/`build`/`lint`). Do NOT scaffold Vitest/Jest. Verification per task = `npm run lint` clean, `npm run build` clean, and the stated manual browser check. This is a deliberate, spec-approved deviation from the skill's TDD cycle.
- **Touch only** `src/components/home/IntroVideo.tsx` (new) and `src/components/home/Hero.tsx` (edit). No other file, no design tokens.
- **Breakpoint convention:** the repo uses arbitrary breakpoints `max-[880px]:` / `min-[880px]:`. Match them; do not introduce a new breakpoint.
- **Token utilities only** for color: `text-accent`, `ring-accent`, `border-l-accent`, `bg-black/…` — no raw hex.
- **Never ship broken:** until the real clip exists, the video `src` is `undefined` and the play button is hidden; the poster (existing `portrait-2026.jpg`) still renders.

---

### Task 1: `IntroVideo` component

**Files:**
- Create: `src/components/home/IntroVideo.tsx`

**Interfaces:**
- Consumes: nothing (leaf component).
- Produces: `IntroVideo` React component with props
  `{ src?: string; poster: string; label?: string; className?: string }`.
  Behavior: renders a circular framed `<video poster>`; when `src` is truthy and not
  yet playing, shows a labeled play `<button>`; clicking calls `video.play()` and shows
  native `controls`; `onEnded` calls `video.load()` to restore the poster and hides
  controls. When `src` is falsy, no play button is shown (poster-only).

- [ ] **Step 1: Create the component file**

Create `src/components/home/IntroVideo.tsx` with exactly:

```tsx
'use client'

import { useRef, useState } from 'react'

/**
 * Circular, click-to-play intro video for the hero (julius.fm-style).
 * Poster → click play → plays in place with sound + native controls → ends → poster.
 * When `src` is absent, renders poster-only (no play button) so the hero never
 * ships broken before the real clip lands in public/videos/.
 */
export function IntroVideo({
  src,
  poster,
  label = 'Let me introduce myself',
  className,
}: {
  src?: string
  poster: string
  label?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function play() {
    const v = ref.current
    if (!v) return
    void v.play()
    setPlaying(true)
  }

  function reset() {
    const v = ref.current
    if (v) v.load() // restores the poster frame
    setPlaying(false)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {!playing && src && (
          <span
            aria-hidden
            className="hidden font-serif text-[18px] leading-tight italic text-accent min-[880px]:block"
          >
            {label} <span className="not-italic">↘</span>
          </span>
        )}
        <div className="relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-full ring-2 ring-accent/60 min-[880px]:w-[160px]">
          <video
            ref={ref}
            src={src}
            poster={poster}
            playsInline
            preload="metadata"
            controls={playing}
            onEnded={reset}
            className="h-full w-full object-cover"
          />
          {!playing && src && (
            <button
              type="button"
              onClick={play}
              aria-label="Play Alec's intro"
              className="absolute inset-0 grid place-items-center bg-black/20 transition-colors hover:bg-black/10"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-accent bg-black/60 backdrop-blur-sm">
                <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-accent" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Lint the new file**

Run: `npm run lint`
Expected: PASS (no errors for `src/components/home/IntroVideo.tsx`).

- [ ] **Step 3: Type-check / build compiles the component**

Run: `npm run build`
Expected: PASS. (The component isn't imported yet; this only proves it type-checks and compiles.)

- [ ] **Step 4: Commit**

```bash
git add src/components/home/IntroVideo.tsx
git commit -m "feat(hero): add IntroVideo circular click-to-play component"
```

---

### Task 2: Wire `IntroVideo` into the hero

**Files:**
- Modify: `src/components/home/Hero.tsx`

**Interfaces:**
- Consumes: `IntroVideo` from Task 1 (`{ src?, poster, label?, className? }`);
  the existing `FadeUp` and `reduce` already defined in `Hero.tsx`; the static import
  `portrait` (`portrait.src` is the poster URL).
- Produces: no new exports. The hero renders the video top-right on desktop (over the
  FlowField, `z-[2]`, vertically centered) and stacked below the socials on mobile.

- [ ] **Step 1: Add imports and the src constant**

At the top of `src/components/home/Hero.tsx`, add these imports alongside the existing ones:

```tsx
import { IntroVideo } from '@/components/home/IntroVideo'
import portrait from '@/images/portrait-2026.jpg'
```

Immediately below the imports (before `const EASE`), add:

```tsx
// Set to '/videos/intro.mp4' once the talking-head clip lands in public/videos/.
// While undefined, IntroVideo renders poster-only (no play button) so the hero
// never ships broken.
const INTRO_VIDEO_SRC: string | undefined = undefined
```

- [ ] **Step 2: Insert the video element into the hero**

In `Hero.tsx`, the final content block inside `<Wrap className="relative z-[2]">` is the
socials `FadeUp` (the block containing the GitHub/LinkedIn/Email links). Directly AFTER
that closing `</FadeUp>` and BEFORE the closing `</Wrap>`, insert:

```tsx
        <div className="mt-12 flex justify-center min-[880px]:absolute min-[880px]:top-1/2 min-[880px]:right-8 min-[880px]:mt-0 min-[880px]:-translate-y-1/2 min-[880px]:justify-end">
          <FadeUp delay={0.5} reduce={reduce}>
            <IntroVideo src={INTRO_VIDEO_SRC} poster={portrait.src} />
          </FadeUp>
        </div>
```

Note: the outer `<div>` owns positioning (absolute on desktop via `min-[880px]:`, in-flow on mobile); `FadeUp` animates opacity/`y` inside it, so its `motion` transform never collides with the wrapper's `-translate-y-1/2`.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: PASS (no unused-import or type errors; `portrait` and `IntroVideo` are both used).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Manual browser check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected:
- Desktop (window ≥880px): the circular poster (your portrait) sits at the hero's
  right, vertically centered, over the FlowField, with a gold ring. No play button yet
  (src is undefined). The "Let me introduce myself" annotation is hidden (only shows
  when `src` is set). Headline/lead/buttons/socials are unchanged and not overlapped.
- Mobile (window <880px, or devtools ~375px): the circle appears centered below the
  social links; nothing is crowded; no horizontal scroll.
- Toggle OS reduced-motion: the hero entrance still fades in without jank; nothing
  autoplays.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat(hero): mount IntroVideo in hero right-side (desktop) / stacked (mobile)"
```

---

### Task 3: Activate the real clip (gated on Alec's recording)

**Files:**
- Add (Alec): `public/videos/intro.mp4`, `public/videos/intro-poster.jpg` (+ optional `intro.webm`)
- Modify: `src/components/home/Hero.tsx` (flip the constant, swap poster)

**Interfaces:**
- Consumes: the assets above; the `INTRO_VIDEO_SRC` constant + `IntroVideo` from Task 2.
- Produces: a live, playable hero intro.

> This task cannot complete until Alec supplies the clip (talking-head, filmed tight and
> centered so a circular crop works, ~30–60s). Tasks 1–2 ship the shell now; do this when
> the file exists.

- [ ] **Step 1: Add the assets**

Place `intro.mp4` and `intro-poster.jpg` in `public/videos/` (create the folder).

- [ ] **Step 2: Point the hero at the clip**

In `Hero.tsx`, change the constant:

```tsx
const INTRO_VIDEO_SRC: string | undefined = '/videos/intro.mp4'
```

Optionally swap the poster from the portrait fallback to the real still by replacing
`poster={portrait.src}` with `poster="/videos/intro-poster.jpg"` in the `<IntroVideo>`
usage (keep the `portrait` import only if still used; otherwise remove it and let lint
confirm).

- [ ] **Step 3: Lint + build**

Run: `npm run lint && npm run build`
Expected: PASS (if `portrait` became unused after swapping the poster, remove its import).

- [ ] **Step 4: Manual playback check**

Run: `npm run dev`. On the hero:
- Play button now shows over the poster; the annotation appears (desktop).
- Click → video plays in the circle **with sound**; native controls appear.
- Let it finish → resets to poster + play button.
- Play button is keyboard-focusable and activates with Enter/Space.

- [ ] **Step 5: Commit**

```bash
git add public/videos/intro.mp4 public/videos/intro-poster.jpg src/components/home/Hero.tsx
git commit -m "feat(hero): activate intro video clip"
```

- [ ] **Step 6: Post-deploy regression grade**

After deploy, run: `npx designlang grade https://alechemenway.com`
Expected: still grade A; no drop from adding a `<video>` element.

---

## Self-Review

**Spec coverage:**
- Placement Option B (desktop right / mobile stack, over veil) → Task 2 Step 2 + manual check.
- `IntroVideo` component + API → Task 1.
- Interaction (poster→play w/ sound→native controls→ended→reset) → Task 1 code + Task 3 Step 4.
- Accessibility (labeled button, keyboard, no surprise audio) → Task 1 (`aria-label`, real `<button>`), Task 3 Step 4.
- Reduced-motion (no autoplay; entrance via existing FadeUp) → Task 2 Step 5.
- Assets + tight-framing note + graceful fallback → Task 3 + `INTRO_VIDEO_SRC` undefined default.
- Annotation via Instrument Serif italic accent → Task 1 (`font-serif italic text-accent`).
- Verification without a test runner → Global Constraints + per-task lint/build/manual.
- Files list matches spec (IntroVideo new, Hero edit, assets by Alec) → all tasks.

**Placeholder scan:** No TBD/TODO in requirements. Task 3's "gated on Alec's recording" is a real external dependency, not a placeholder — the code steps are fully specified.

**Type consistency:** `IntroVideo` prop names (`src?`, `poster`, `label?`, `className?`) are identical in Task 1 (definition), Task 2 (usage: `src`, `poster`), and Task 3. `INTRO_VIDEO_SRC: string | undefined` consistent across Tasks 2–3. `portrait.src` used consistently.
