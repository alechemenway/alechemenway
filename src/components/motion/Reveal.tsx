'use client'

import { Children, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, margin: '0px 0px -8% 0px' } as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reveals each direct child on scroll with a stagger. Each child is wrapped in
 * a motion element, so place grid/flex classes on `className` and the children
 * become the laid-out items.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  y = 28,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  const items = Children.toArray(children)
  if (reduce) return <div className={className}>{children}</div>
  return (
    <div className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: i * stagger }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
