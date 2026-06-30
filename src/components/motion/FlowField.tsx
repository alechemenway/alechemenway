'use client'

import { useEffect, useRef } from 'react'
import { advance, needsReset, randomLife, type Particle } from './flow-field'

/**
 * Generative amber flow-field rendered to a <canvas>. Decorative (aria-hidden).
 * - DPR-aware, reseeds on resize.
 * - Pauses its rAF loop when offscreen (IntersectionObserver) or tab hidden.
 * - Reads --accent / --bg from the theme and re-reads on theme (class) change.
 * - prefers-reduced-motion: paints a single static frame, never animates.
 */
export function FlowField({
  className,
  density = 1,
}: {
  className?: string
  density?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scale = 0.0016

    let W = 0
    let H = 0
    let DPR = 1
    let particles: Particle[] = []
    let accent = '#e8b04b'
    let bg = '#0a0a0b'
    let t = 0
    let raf = 0
    let running = false
    let onscreen = false

    function readColors() {
      const cs = getComputedStyle(root)
      accent = cs.getPropertyValue('--accent').trim() || accent
      bg = cs.getPropertyValue('--bg').trim() || bg
    }

    function targetCount() {
      const base = window.innerWidth < 700 ? 480 : 1100
      return Math.max(120, Math.round(base * density))
    }

    function seed() {
      particles = []
      const n = targetCount()
      for (let i = 0; i < n; i++) {
        particles.push({ x: Math.random() * W, y: Math.random() * H, life: randomLife() })
      }
    }

    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas!.getBoundingClientRect()
      W = canvas!.width = Math.max(1, Math.floor(r.width * DPR))
      H = canvas!.height = Math.max(1, Math.floor(r.height * DPR))
      readColors()
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)
      seed()
    }

    function frame() {
      ctx!.globalAlpha = 0.06
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)
      ctx!.globalAlpha = 0.32
      ctx!.strokeStyle = accent
      ctx!.lineWidth = DPR
      for (const p of particles) {
        const px = p.x
        const py = p.y
        advance(p, t, DPR, scale)
        ctx!.beginPath()
        ctx!.moveTo(px, py)
        ctx!.lineTo(p.x, p.y)
        ctx!.stroke()
        if (needsReset(p, W, H)) {
          p.x = Math.random() * W
          p.y = Math.random() * H
          p.life = randomLife()
        }
      }
      ctx!.globalAlpha = 1
    }

    function loop() {
      t += 0.0009
      frame()
      raf = requestAnimationFrame(loop)
    }
    function start() {
      if (running || reduce) return
      running = true
      loop()
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    size()

    if (reduce) {
      for (let i = 0; i < 160; i++) {
        t += 0.01
        frame()
      }
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting
        if (onscreen && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    function onVisibility() {
      if (document.hidden) stop()
      else if (onscreen) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    let resizeRaf = 0
    function onResize() {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(size)
    }
    window.addEventListener('resize', onResize)

    const themeObserver = new MutationObserver(() => {
      readColors()
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, W, H)
    })
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => {
      stop()
      io.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(resizeRaf)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden className={className} />
}
