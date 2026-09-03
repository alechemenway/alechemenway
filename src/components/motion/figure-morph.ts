// Pure helpers for the hero figure-morph. No DOM — deterministic given a
// timeline progress value, so the component stays a thin renderer.
//
// Narrative timeline (ms), driven by the component:
//   fall    0 → FALL_END      stipple figure falls from above, drifting,
//                             turbulence = "AI update noise"
//   scatter FALL_END → SCATTER_END  figure shatters outward (overwhelm)
//   rise    SCATTER_END → RISE_END  particles spring home, rotating upright,
//                             color bleeds in (mono → accent/ink)
//   settle  RISE_END → SETTLE_END   color settles to ink, alpha eases to idle
//   idle    after SETTLE_END        faint breathing shimmer, rAF throttled

export const TIMING = {
  FALL_END: 2300,
  SCATTER_END: 3100,
  RISE_END: 4900,
  SETTLE_END: 5900,
} as const

export interface MorphParticle {
  /** home position in image space (0..w / 0..h) — the FALL pose */
  hx: number
  hy: number
  /** rise-pose position in image space — particle lerps here during the rise */
  rx: number
  ry: number
  /** 0..1, darkness of the source pixel */
  dark: number
  /** scatter direction (unit-ish) + magnitude, pre-seeded */
  sx: number
  sy: number
  mag: number
  /** per-particle phase so the rise doesn't move as one rigid block */
  ph: number
  /** slight per-particle size jitter */
  sz: number
}

/** Same layered-sine noise family as flow-field.ts. */
export function noiseAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.011 + t) * 1.9 +
    Math.cos(y * 0.013 - t * 0.9) * 1.9 +
    Math.sin((x + y) * 0.004 + t * 0.5) * 0.8
  )
}

export function easeOutExpo(p: number): number {
  if (p <= 0) return 0
  if (p >= 1) return 1
  return 1 - Math.pow(2, -10 * p)
}

export function easeInQuad(p: number): number {
  return p * p
}

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/**
 * Segment progress: 0..1 within [a, b] of the global timeline.
 * `stagger` shifts the window per-particle (0 = early, 1 = late) so a segment
 * sweeps across the figure instead of flipping all at once.
 */
export function seg(now: number, a: number, b: number, stagger = 0): number {
  const span = b - a
  const shift = stagger * span * 0.35
  return clamp01((now - a - shift) / (span * 0.65))
}

/**
 * Particle position at time `now`, in CANVAS space.
 * `toCanvas` converts image-space home coords → canvas px (view transform).
 * Fall / scatter offsets are applied in canvas px so they scale with the view.
 * Returns [x, y, alphaMult] — alphaMult lets the fall/scatter dim edges.
 */
export function particlePos(
  p: MorphParticle,
  now: number,
  t: number,
  toCanvas: (ix: number, iy: number) => [number, number],
  canvasH: number,
): [number, number, number] {
  const { FALL_END, SCATTER_END, RISE_END } = TIMING
  const [fx, fy] = toCanvas(p.hx, p.hy) // fall-pose home
  const [ux, uy] = toCanvas(p.rx, p.ry) // upright/rise-pose home
  let x = fx
  let y = fy
  let alpha = 1

  // ---- fall: enter from above with accelerating drop + noise jitter
  const fallP = easeInQuad(seg(now, 0, FALL_END, p.ph))
  const startY = fy - canvasH * (0.75 + p.ph * 0.35)
  y = startY + (fy - startY) * fallP
  const jitterAmp = canvasH * 0.006 * (1 - fallP * 0.55)
  const ang = noiseAngle(p.hx * 0.4, p.hy * 0.4, t)
  x += Math.cos(ang) * jitterAmp + Math.sin(t * 3 + p.ph * 9) * (canvasH * 0.0018)
  y += Math.sin(ang) * jitterAmp * 0.6

  // ---- scatter: shatter outward from the figure's position
  const scP = seg(now, FALL_END, SCATTER_END, p.ph)
  if (scP > 0) {
    const kick = easeOutExpo(scP) * p.mag * (canvasH / 900)
    x += p.sx * kick
    y += p.sy * kick
    alpha = 1 - scP * 0.35
  }

  // ---- rise: spring home AND morph fall-pose → upright pose, staggered
  const riseP = seg(now, SCATTER_END, RISE_END, p.ph)
  if (riseP > 0) {
    const e = easeOutExpo(riseP)
    // pose lerp: home position slides from fall silhouette to upright silhouette
    const poseX = fx + (ux - fx) * e
    const poseY = fy + (uy - fy) * e
    x = x + (poseX - x) * e
    y = y + (poseY - y) * e
    alpha = 1 - (1 - e) * 0.35
  }

  // ---- idle shimmer after settle: breathing drift around the upright pose
  if (now > RISE_END) {
    const idle = noiseAngle(p.rx * 0.2, p.ry * 0.2, t * 0.35)
    x = ux + Math.cos(idle) * (canvasH * 0.0008)
    y = uy + Math.sin(idle) * (canvasH * 0.0008)
  }

  return [x, y, alpha]
}

/**
 * Color for a particle at time `now`.
 * mono (theme ink) → accent during the rise → settled ink.
 * Returns [r, g, b, extraAlpha].
 */
export function particleColor(
  dark: number,
  now: number,
  ink: [number, number, number],
  accent: [number, number, number],
): [number, number, number, number] {
  const { SCATTER_END, RISE_END, SETTLE_END } = TIMING
  // color sweep across the rise segment, staggered by vertical position via dark
  const colorP = easeOutExpo(seg(now, SCATTER_END, RISE_END, dark))
  const settleP = seg(now, RISE_END, SETTLE_END)

  // mono value: near-black in light theme, near-white in dark — `ink` already
  // resolved by the caller; during mono phase we render at full ink.
  let r = ink[0]
  let g = ink[1]
  let b = ink[2]

  if (colorP > 0 && settleP < 1) {
    // blend ink → accent by colorP, then accent → ink by settleP
    const ar = ink[0] + (accent[0] - ink[0]) * colorP
    const ag = ink[1] + (accent[1] - ink[1]) * colorP
    const ab = ink[2] + (accent[2] - ink[2]) * colorP
    r = ar + (ink[0] - ar) * settleP
    g = ag + (ink[1] - ag) * settleP
    b = ab + (ink[2] - ab) * settleP
  }

  // settled idle: figure recedes but stays a real presence in the hero
  const idleAlpha = 1 - seg(now, RISE_END, SETTLE_END) * 0.3
  return [r, g, b, idleAlpha]
}

/** Build runtime particles from the baked fall + rise dot lists. */
export function buildParticles(
  fall: [number, number, number][],
  rise: [number, number, number][],
): MorphParticle[] {
  return fall.map(([hx, hy, dark], i) => {
    const [rx, ry, rdark] = rise[i] ?? rise[i % rise.length]
    const a = Math.random() * Math.PI * 2
    const m = 24 + Math.random() * 120
    return {
      hx,
      hy,
      rx,
      ry,
      // darkness blends across poses so the color sweep stays coherent
      dark: (dark + (rdark ?? dark)) / 2,
      sx: Math.cos(a),
      sy: Math.sin(a),
      mag: m,
      ph: Math.random(),
      sz: 0.8 + Math.random() * 1.3,
    }
  })
}
