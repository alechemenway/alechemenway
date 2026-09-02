import { type Variants } from 'motion/react'

export const easeOut = [0.22, 1, 0.36, 1] as const

export const viewportOnce = {
  once: true,
  margin: '-80px',
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
}

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOut },
  },
}

export const stagger = (
  staggerChildren: number,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

export const headlineWord: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut, delay },
  }),
}

export const emphasisWord: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut, delay: 0.18 },
  },
}

export const headlineMarker: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOut, delay: 1.04 },
  },
}

export const highlightFlash: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
}

export const counterConfig = {
  duration: 1200,
  ease: (progress: number) =>
    progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress),
} as const
