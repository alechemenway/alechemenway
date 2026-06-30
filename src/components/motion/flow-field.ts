// Pure helpers for the generative hero flow-field. No DOM, deterministic
// (except randomLife), so they're trivial to reason about and reuse.

export interface Particle {
  x: number
  y: number
  life: number
}

/**
 * Smooth pseudo-noise angle at (x, y) and time t, from layered sines.
 * Deterministic: same inputs → same output. Returns a finite radian-ish angle.
 */
export function fieldAngle(x: number, y: number, t: number, scale = 0.0016): number {
  return (
    Math.sin(x * scale + t) * 1.7 +
    Math.cos(y * scale * 1.15 - t * 0.8) * 1.7 +
    Math.sin((x + y) * scale * 0.55 + t * 0.4) * 0.9
  )
}

export function randomLife(min = 50, max = 240): number {
  return min + Math.random() * (max - min)
}

/** Advance a particle along the flow field (mutates in place). */
export function advance(p: Particle, t: number, dpr: number, scale = 0.0016): void {
  const a = fieldAngle(p.x, p.y, t, scale)
  p.x += Math.cos(a) * 1.5 * dpr
  p.y += Math.sin(a) * 1.5 * dpr
  p.life -= 1
}

/** True when a particle has expired or drifted off-canvas. */
export function needsReset(p: Particle, w: number, h: number): boolean {
  return p.life < 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h
}
