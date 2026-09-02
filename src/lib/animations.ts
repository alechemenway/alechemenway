export const easeOut = [0.22, 1, 0.36, 1] as const

export function easeOutExpo(progress: number) {
  if (progress <= 0) return 0
  if (progress >= 1) return 1
  return 1 - Math.pow(2, -10 * progress)
}

export const overQuotaCounter = {
  mainDurationMs: 900,
  pauseMs: 200,
  overrunDurationMs: 250,
  flickerDurationMs: 120,
  viewportAmount: 0.35,
} as const

export const teletypeConfig = {
  characterIntervalMs: 30,
  cursorBlinkMs: 530,
  lineDelayMs: 120,
  viewportAmount: 0.2,
} as const

export function getTeletypeLineDelay(index: number) {
  return index * teletypeConfig.lineDelayMs
}

export const scrollProgressConfig = {
  desktopMediaQuery: '(min-width: 768px)',
  opacity: 0.2,
} as const

export const systemHeadlineConfig = {
  wordDurationSeconds: 0.4,
  wordStaggerSeconds: 0.05,
  wordOffsetPx: 16,
  diagramDurationSeconds: 1.5,
  diagramOpacity: 0.08,
  viewportAmount: 0.35,
} as const

export const contextBarConfig = {
  pulseDurationSeconds: 2,
  pulseMinimumOpacity: 0.4,
  scrambleDurationMs: 300,
} as const

export const ellipsisConfig = {
  viewportOffset: ['start 65%', 'end 35%'],
  thresholds: [0, 0.5, 1],
} as const

export function getEllipsisOpacities(progress: number) {
  return ellipsisConfig.thresholds.map((threshold, index) =>
    index === 0
      ? progress > threshold
        ? 1
        : 0
      : progress >= threshold
        ? 1
        : 0,
  )
}
