'use client'

import { type PointerEvent, type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/**
 * 3D pointer-tilt wrapper. Tilts toward the cursor for mouse input only;
 * passes through untouched under reduced-motion or non-mouse (touch) pointers.
 * Put layout classes (grid cell, etc.) on `className`.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), spring)

  if (reduce) return <div className={className}>{children}</div>

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', height: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
