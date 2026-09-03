'use client'

import { useEffect, useRef } from 'react'
import {
  TIMING,
  buildParticles,
  noiseAngle,
  particleColor,
  particlePos,
  type MorphParticle,
} from './figure-morph'

/**
 * One-shot hero morph: a stipple figure falls, shatters (AI-update noise),
 * reassembles upright with a color bleed, then settles to a faint idle.
 * - Plays once per mount; `onPhase('rise')` fires when text should appear.
 * - DPR-aware, pauses offscreen / on hidden tab, re-reads theme vars.
 * - prefers-reduced-motion: paints the settled frame immediately, no loop.
 * - Figure is decorative; headline text is real DOM (a11y + SEO).
 */
export function FigureMorph({
  className,
  onPhase,
}: {
  className?: string
  onPhase?: (phase: 'rise' | 'settled') => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef(onPhase)

  useEffect(() => {
    phaseRef.current = onPhase
  }, [onPhase])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let DPR = 1
    let particles: MorphParticle[] = []
    let imgW = 1
    let imgH = 1
    let ink: [number, number, number] = [23, 20, 16]
    let accent: [number, number, number] = [185, 126, 18]
    let t = 0
    let raf = 0
    let running = false
    let onscreen = false
    let firedRise = false
    let firedSettled = false
    let cancelled = false
    const t0 = performance.now()

    function parseColor(v: string): [number, number, number] | null {
      const m = v.match(/#([0-9a-f]{6})/i)
      if (!m) return null
      const n = parseInt(m[1], 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    function readColors() {
      const cs = getComputedStyle(root)
      const i = parseColor(cs.getPropertyValue('--ink'))
      const a = parseColor(cs.getPropertyValue('--accent'))
      if (i) ink = i
      if (a) accent = a
    }

    /** Image-space → canvas-space transform (fit height, anchored right). */
    function view() {
      const margin = 0.8
      const s = (H * margin) / imgH
      const ox = W * 0.97 - imgW * s
      const oy = (H - imgH * s) / 2
      return { s, ox, oy }
    }

    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas!.getBoundingClientRect()
      W = canvas!.width = Math.max(1, Math.floor(r.width * DPR))
      H = canvas!.height = Math.max(1, Math.floor(r.height * DPR))
      readColors()
    }

    function paint(now: number) {
      ctx!.clearRect(0, 0, W, H)
      const { s, ox, oy } = view()
      const toCanvas = (ix: number, iy: number): [number, number] => [
        ox + ix * s,
        oy + iy * s,
      ]
      const settled = now > TIMING.SETTLE_END
      for (const p of particles) {
        const [x, y, alphaMult] = particlePos(p, now, t, toCanvas, H)
        const [r, g, b, idleAlpha] = particleColor(p.dark, now, ink, accent)
        const base = 0.42 + p.dark * 0.58
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${(base * alphaMult * idleAlpha).toFixed(3)})`
        const sz = Math.max(1.1 * DPR, p.sz * s * (settled ? 0.9 : 1) * 1.35)
        ctx!.fillRect(x, y, sz, sz)
      }
    }

    function loop() {
      const now = performance.now() - t0
      t += 0.012
      paint(now)
      if (!firedRise && now > TIMING.SCATTER_END) {
        firedRise = true
        phaseRef.current?.('rise')
      }
      if (!firedSettled && now > TIMING.SETTLE_END) {
        firedSettled = true
        phaseRef.current?.('settled')
      }
      // after settle, drop to a slow shimmer tick instead of full rAF
      if (now > TIMING.SETTLE_END) {
        raf = window.setTimeout(() => {
          raf = requestAnimationFrame(loop)
        }, 90) as unknown as number
      } else {
        raf = requestAnimationFrame(loop)
      }
    }

    function start() {
      if (running || reduce) return
      running = true
      loop()
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(raf)
    }

    /** Fallback: sample /hero-src.jpg in-browser into dot triples. */
    function sampleImage(): Promise<[number, number, number][]> {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          const w = img.naturalWidth
          const h = img.naturalHeight
          if (!w || !h) return reject(new Error('empty image'))
          imgW = w
          imgH = h
          const off = document.createElement('canvas')
          off.width = w
          off.height = h
          const oc = off.getContext('2d')
          if (!oc) return reject(new Error('no 2d ctx'))
          oc.drawImage(img, 0, 0)
          const data = oc.getImageData(0, 0, w, h).data
          const out: [number, number, number][] = []
          const step = 2
          for (let y = 0; y < h; y += step) {
            for (let x = 0; x < w; x += step) {
              const i = (y * w + x) * 4
              const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
              const dark = 1 - lum / 255
              if (dark < 0.18) continue
              if (Math.random() < 0.25 + 0.75 * dark) {
                out.push([x + Math.random() * step, y + Math.random() * step, dark])
              }
            }
          }
          // cap ~7000
          for (let i = out.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[out[i], out[j]] = [out[j], out[i]]
          }
          resolve(out.slice(0, 7000))
        }
        img.onerror = () => reject(new Error('img load failed'))
        img.src = '/hero-src.jpg'
      })
    }

    async function init() {
      let fall: [number, number, number][] | null = null
      let rise: [number, number, number][] | null = null
      try {
        const res = await fetch('/hero-figure.json')
        const data = (await res.json()) as {
          w: number
          h: number
          fall: [number, number, number][]
          rise: [number, number, number][]
        }
        if (cancelled) return
        imgW = data.w
        imgH = data.h
        fall = data.fall
        rise = data.rise
      } catch {
        // JSON missing/failed — fall through to image sampling
      }

      if (!fall || !rise) {
        try {
          const sampled = await sampleImage()
          if (cancelled) return
          fall = sampled
          rise = sampled // single-pose fallback: rise = fall (no morph)
        } catch {
          // no asset at all — fail silent, hero text still renders
          return
        }
      }
      particles = buildParticles(fall, rise)

      size()

      if (reduce) {
        // settled end-state, one static paint
        paint(TIMING.SETTLE_END + 1)
        phaseRef.current?.('rise')
        phaseRef.current?.('settled')
        return
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting
          if (onscreen) start()
          else stop()
        },
        { threshold: 0 },
      )
      io.observe(canvas!)

      // NOTE: no document-hidden gate. Background tabs throttle rAF natively;
      // gating on visibilitychange meant the morph never ticked when the page
      // loaded in a background tab (headless capture, cmd-click-open, etc.).

      let resizeRaf = 0
      function onResize() {
        cancelAnimationFrame(resizeRaf)
        resizeRaf = requestAnimationFrame(size)
      }
      window.addEventListener('resize', onResize)

      const themeObserver = new MutationObserver(readColors)
      themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] })

      cleanup = () => {
        stop()
        io.disconnect()
        themeObserver.disconnect()
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(resizeRaf)
      }
    }

    let cleanup: (() => void) | undefined
    // Wall-clock phase timers: rAF is throttled/paused in hidden tabs, so the
    // text reveal must not depend on frame ticks firing at the right moment.
    const riseTimer = window.setTimeout(
      () => phaseRef.current?.('rise'),
      TIMING.SCATTER_END,
    )
    const settledTimer = window.setTimeout(
      () => phaseRef.current?.('settled'),
      TIMING.SETTLE_END,
    )
    init()
    return () => {
      cancelled = true
      clearTimeout(riseTimer)
      clearTimeout(settledTimer)
      cleanup?.()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
