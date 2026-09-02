'use client'

import { useEffect, useRef, useState } from 'react'

import { counterConfig } from '@/lib/animations'

export function useCountUp(target: number, enabled: boolean, start: boolean) {
  const [value, setValue] = useState<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!enabled || !start || hasRun.current) return

    hasRun.current = true
    let frame = 0
    let completed = false
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / counterConfig.duration, 1)
      setValue(Math.round(target * counterConfig.ease(progress)))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        completed = true
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      if (!completed) hasRun.current = false
    }
  }, [enabled, start, target])

  if (!enabled) return target
  return value ?? 0
}
