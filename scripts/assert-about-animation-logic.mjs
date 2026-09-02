import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  contextBarConfig,
  easeOutExpo,
  ellipsisConfig,
  getEllipsisOpacities,
  getTeletypeLineDelay,
  overQuotaCounter,
  scrollProgressConfig,
  systemHeadlineConfig,
  teletypeConfig,
} from '../src/lib/animations.ts'

assert.equal(easeOutExpo(0), 0)
assert.equal(easeOutExpo(1), 1)
assert.ok(easeOutExpo(0.5) > 0.95)

assert.deepEqual(overQuotaCounter, {
  mainDurationMs: 900,
  pauseMs: 200,
  overrunDurationMs: 250,
  flickerDurationMs: 120,
  viewportAmount: 0.35,
})
assert.equal(
  overQuotaCounter.mainDurationMs +
    overQuotaCounter.pauseMs +
    overQuotaCounter.overrunDurationMs,
  1350,
)

assert.deepEqual(teletypeConfig, {
  characterIntervalMs: 30,
  cursorBlinkMs: 530,
  lineDelayMs: 120,
  viewportAmount: 0.2,
})
assert.equal(getTeletypeLineDelay(0), 0)
assert.equal(getTeletypeLineDelay(4), 480)
assert.deepEqual(scrollProgressConfig, {
  desktopMediaQuery: '(min-width: 768px)',
  opacity: 0.2,
})
assert.deepEqual(systemHeadlineConfig, {
  wordDurationSeconds: 0.4,
  wordStaggerSeconds: 0.05,
  wordOffsetPx: 16,
  diagramDurationSeconds: 1.5,
  diagramOpacity: 0.08,
  viewportAmount: 0.35,
})
assert.deepEqual(contextBarConfig, {
  pulseDurationSeconds: 2,
  pulseMinimumOpacity: 0.4,
  scrambleDurationMs: 300,
})
assert.deepEqual(ellipsisConfig, {
  viewportOffset: ['start 65%', 'end 35%'],
  thresholds: [0, 0.5, 1],
})

assert.deepEqual(getEllipsisOpacities(0), [0, 0, 0])
assert.deepEqual(getEllipsisOpacities(0.001), [1, 0, 0])
assert.deepEqual(getEllipsisOpacities(0.49), [1, 0, 0])
assert.deepEqual(getEllipsisOpacities(0.5), [1, 1, 0])
assert.deepEqual(getEllipsisOpacities(0.99), [1, 1, 0])
assert.deepEqual(getEllipsisOpacities(1), [1, 1, 1])

const aboutSource = readFileSync(
  new URL('../src/components/about/AboutContent.tsx', import.meta.url),
  'utf8',
)
const counterStart = aboutSource.indexOf('hasRun.current = true')
const counterInitialValue = aboutSource.indexOf(
  'const [value, setValue] = useState(0)',
)
const counterReset = aboutSource.indexOf('setValue(0)', counterStart)
const firstCounterFrame = aboutSource.indexOf(
  'requestAnimationFrame(tick)',
  counterStart,
)

assert.ok(counterStart >= 0)
assert.ok(counterInitialValue >= 0)
assert.ok(counterReset > counterStart)
assert.ok(counterReset < firstCounterFrame)
assert.match(aboutSource, /displayText:\s+enabled && !hasStarted/u)

console.log('About animation timing and progression contracts are valid.')
