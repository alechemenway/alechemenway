'use client'

import Image from 'next/image'
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

import { Eyebrow } from '@/components/Eyebrow'
import { Wrap } from '@/components/Wrap'
import portrait from '@/images/about-hero-2026.png'
import {
  contextBarConfig,
  easeOut,
  easeOutExpo,
  ellipsisConfig,
  getEllipsisOpacities,
  getTeletypeLineDelay,
  overQuotaCounter,
  scrollProgressConfig,
  systemHeadlineConfig,
  teletypeConfig,
} from '@/lib/animations'

const principles = [
  {
    lead: 'Self-sourced pipeline.',
    body: '$3M generated across my last two roles without waiting on marketing or SDR coverage.',
  },
  {
    lead: 'Consistent attainment.',
    body: '112% at Jamf in 2023; 100%+ in 2021 and 2022; 97% at Staffbase, #2 of 22; Pinnacle Club 2023 (top 5% globally).',
  },
  {
    lead: 'Receipts over hype.',
    body: 'Every AI claim ships with a number, a live link, or open-source code you can read.',
  },
  {
    lead: 'Operator’s reflex.',
    body: 'If a workflow is repeatable, I’d rather build the system than grind the reps.',
  },
]

const contactLinks = [
  { label: 'Email', href: 'mailto:alec@hemenway.io' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alec-hemenway/',
    newTab: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/alechemenway',
    newTab: true,
  },
  {
    label: 'Résumé',
    href: '/Alec_Hemenway_Resume_2026_v14.pdf',
    newTab: true,
  },
]

const bodyCopy =
  'mt-[22px] text-[17px] leading-[1.82] text-ink-2 max-[760px]:text-[16px] max-[760px]:leading-[1.78]'

const marginNote =
  'mt-6 w-full font-mono text-[9px] leading-[1.65] tracking-[0.04em] text-ink-2 uppercase min-[1180px]:absolute min-[1180px]:top-[170px] min-[1180px]:mt-0 min-[1180px]:w-[150px]'

const receipt =
  'group mt-[30px] grid grid-cols-[auto_auto_1fr_auto] items-center gap-[11px] border-y border-line py-4 font-mono text-[10px] text-ink-2 uppercase hover:border-accent max-[760px]:grid-cols-[6px_1fr_auto]'

const contactAction =
  'relative inline-flex items-center border border-line px-[18px] py-2.5 font-mono text-[12.5px] text-ink-2 hover:border-accent hover:text-accent'

const systemWords = ['Sourcing', 'becomes', 'a', 'system.']
const methodLines = [
  '[Method]',
  'Buyer-signal research',
  'Intent data',
  'Account prioritization',
  'First-touch outbound',
]
const scrambleGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]/\\<>#'

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useLayoutEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (active) setHydrated(true)
    })
    return () => {
      active = false
    }
  }, [])

  return hydrated
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const update = () => setMatches(mediaQuery.matches)

    queueMicrotask(update)
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [query])

  return matches
}

function Headline() {
  return (
    <h1 className="mx-auto mt-[34px] max-w-[13ch] text-[clamp(48px,7vw,92px)] leading-[0.98] font-extrabold tracking-[-0.055em] max-[760px]:mx-0 max-[760px]:mt-[26px] max-[760px]:text-[48px]">
      Enterprise AE with commit history.
    </h1>
  )
}

function HeroMarker() {
  return <span className="font-mono text-[11px] text-ink-2">(01)</span>
}

function ProofPoints() {
  return (
    <p className="mt-[34px] font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-ink-2 max-[760px]:mt-[26px]">
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        The record — <b className="font-medium text-ink">$3M</b> self-sourced
        pipeline
      </span>
      <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        Pinnacle Club <b className="font-medium text-ink">2023</b> (top 5%)
      </span>
      <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        <b className="font-medium text-ink">60+</b> Claude Code skills
      </span>
    </p>
  )
}

function HighlightedStat({ children }: { children: ReactNode }) {
  return <span data-highlight-stat>{children}</span>
}

function useOverQuotaCounter(enabled: boolean, start: boolean) {
  const [value, setValue] = useState(0)
  const [flickering, setFlickering] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!enabled || !start || hasRun.current) return

    hasRun.current = true
    let frame = 0
    let flickerTimer = 0
    let flickerStarted = false
    let completed = false
    let startedAt = 0

    const tick = (now: number) => {
      if (startedAt === 0) {
        startedAt = now
        setValue(0)
        frame = requestAnimationFrame(tick)
        return
      }

      const elapsed = now - startedAt

      if (elapsed <= overQuotaCounter.mainDurationMs) {
        const progress = elapsed / overQuotaCounter.mainDurationMs
        setValue(Math.round(100 * easeOutExpo(progress)))
      } else if (
        elapsed <=
        overQuotaCounter.mainDurationMs + overQuotaCounter.pauseMs
      ) {
        setValue(100)
        if (!flickerStarted) {
          flickerStarted = true
          setFlickering(true)
          flickerTimer = window.setTimeout(
            () => setFlickering(false),
            overQuotaCounter.flickerDurationMs,
          )
        }
      } else {
        const overrunElapsed =
          elapsed - overQuotaCounter.mainDurationMs - overQuotaCounter.pauseMs
        const progress = Math.min(
          overrunElapsed / overQuotaCounter.overrunDurationMs,
          1,
        )
        setValue(Math.round(100 + 12 * easeOutExpo(progress)))

        if (progress === 1) {
          completed = true
          return
        }
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(flickerTimer)
      if (!completed) hasRun.current = false
    }
  }, [enabled, start])

  return {
    value,
    flickering,
  }
}

function OverQuotaCounter({ motionEnabled }: { motionEnabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: overQuotaCounter.viewportAmount,
  })
  const { value, flickering } = useOverQuotaCounter(motionEnabled, isInView)

  return (
    <div
      ref={ref}
      data-over-quota-counter
      className="font-serif text-[clamp(92px,13vw,174px)] leading-[0.78] tracking-[-0.045em] text-accent tabular-nums max-[760px]:text-[clamp(76px,24vw,106px)]"
    >
      <span data-over-quota-a11y className="sr-only">
        112%
      </span>
      <span data-over-quota-visual aria-hidden="true">
        <span className="inline-block min-w-[3ch] text-right">
          <span data-over-quota-value>{motionEnabled ? value : 112}</span>
        </span>
        <motion.span
          data-over-quota-percent
          className="inline-block"
          animate={
            motionEnabled && flickering
              ? {
                  filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'],
                }
              : { filter: 'brightness(1)' }
          }
          transition={{
            duration: overQuotaCounter.flickerDurationMs / 1000,
            ease: easeOut,
          }}
        >
          %
        </motion.span>
      </span>
    </div>
  )
}

function DotDivider({
  align,
  motionEnabled,
}: {
  align: 'start' | 'center' | 'end'
  motionEnabled: boolean
}) {
  const alignment = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[align]
  const className = `mb-[30px] flex gap-2 ${alignment}`
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...ellipsisConfig.viewportOffset],
  })
  const firstOpacity = useTransform(
    scrollYProgress,
    (progress) => getEllipsisOpacities(progress)[0],
  )
  const secondOpacity = useTransform(
    scrollYProgress,
    (progress) => getEllipsisOpacities(progress)[1],
  )
  const thirdOpacity = useTransform(
    scrollYProgress,
    (progress) => getEllipsisOpacities(progress)[2],
  )

  return (
    <div
      ref={ref}
      data-scroll-ellipsis
      aria-hidden="true"
      className={className}
    >
      {motionEnabled ? (
        <>
          <motion.span style={{ opacity: firstOpacity }}>.</motion.span>
          <motion.span style={{ opacity: secondOpacity }}>.</motion.span>
          <motion.span style={{ opacity: thirdOpacity }}>.</motion.span>
        </>
      ) : (
        <>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </>
      )}
    </div>
  )
}

function StaticHeading({
  before,
  emphasis,
  after,
  className,
}: {
  before: string
  emphasis: string
  after?: string
  className: string
}) {
  return (
    <h2 className={className}>
      {before} <em className="font-serif text-accent">{emphasis}</em>
      {after}
    </h2>
  )
}

function Portrait() {
  const imageClassName =
    'object-cover object-[50%_21%] opacity-[0.88] grayscale contrast-[1.06]'

  return (
    <figure className="mt-[68px] max-[760px]:mt-[52px]">
      <div className="relative mx-auto aspect-[16/8.8] max-w-[1120px] overflow-hidden border border-line bg-surface max-[760px]:-mx-6 max-[760px]:aspect-[4/5] max-[760px]:w-[calc(100%+3rem)] max-[760px]:border-x-0">
        <div className="absolute inset-x-0 -inset-y-1">
          <Image
            src={portrait}
            alt="Alec Hemenway, studio portrait"
            fill
            sizes="(max-width: 760px) 100vw, 1120px"
            className={imageClassName}
            priority
            placeholder="blur"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_34%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,var(--color-bg)_118%)]"
          />
        </div>
      </div>
      <figcaption className="mx-auto mt-[13px] flex max-w-[1120px] justify-between gap-5 font-mono text-[9px] leading-[1.5] tracking-[0.08em] text-ink-2 uppercase">
        <span>Alec Hemenway · Minneapolis</span>
        <span>Studio portrait</span>
      </figcaption>
    </figure>
  )
}

function ContactActions() {
  const links = contactLinks.map((link) => ({
    ...link,
    ...(link.newTab
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {}),
  }))

  return (
    <div className="mt-[34px] flex flex-wrap justify-center gap-3 max-[760px]:justify-start">
      {links.map((link) => (
        <a
          key={link.label}
          data-contact-action
          href={link.href}
          target={link.target}
          rel={link.rel}
          className={contactAction}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

function ScrollProgressRule({ motionEnabled }: { motionEnabled: boolean }) {
  const { scrollYProgress } = useScroll()
  const desktopViewport = useMediaQuery(scrollProgressConfig.desktopMediaQuery)
  const visible = motionEnabled && desktopViewport

  return (
    <motion.div
      data-scroll-progress-rule
      aria-hidden="true"
      className="fixed top-0 bottom-0 left-[max(16px,calc((100vw-1200px)/2))] z-50 w-px origin-top bg-accent"
      style={{
        display: visible ? 'block' : 'none',
        opacity: scrollProgressConfig.opacity,
        scaleY: visible ? scrollYProgress : 0,
      }}
    />
  )
}

function useTeletype(
  text: string,
  enabled: boolean,
  start: boolean,
  delayMs = 0,
) {
  const [visibleLength, setVisibleLength] = useState(text.length)
  const [typing, setTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!enabled || !start || hasRun.current) return

    hasRun.current = true
    let completed = false
    let interval = 0

    const timeout = window.setTimeout(() => {
      let nextLength = 0
      setHasStarted(true)
      setVisibleLength(0)
      setTyping(true)
      interval = window.setInterval(() => {
        nextLength += 1
        setVisibleLength(nextLength)

        if (nextLength >= text.length) {
          window.clearInterval(interval)
          setTyping(false)
          completed = true
        }
      }, teletypeConfig.characterIntervalMs)
    }, delayMs)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
      if (!completed) hasRun.current = false
    }
  }, [delayMs, enabled, start, text])

  return {
    displayText: enabled && !hasStarted ? '' : text.slice(0, visibleLength),
    typing,
  }
}

function TeletypeText({
  text,
  enabled,
  start,
  delayMs = 0,
  className = '',
  marker,
}: {
  text: string
  enabled: boolean
  start: boolean
  delayMs?: number
  className?: string
  marker?: string
}) {
  const { displayText, typing } = useTeletype(text, enabled, start, delayMs)

  return (
    <span
      data-teletype={marker}
      data-teletype-line
      aria-label={text}
      className={`relative ${className || 'inline-block'}`}
      style={{ minWidth: `${text.length + 1}ch` }}
    >
      <span aria-hidden="true" className="whitespace-pre">
        {enabled ? displayText : text}
        {typing ? (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: teletypeConfig.cursorBlinkMs / 1000,
              ease: easeOut,
              repeat: Infinity,
            }}
          >
            ▍
          </motion.span>
        ) : null}
      </span>
    </span>
  )
}

function FieldNoteTeletype({ motionEnabled }: { motionEnabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: teletypeConfig.viewportAmount,
  })

  return (
    <div
      ref={ref}
      className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase"
    >
      <TeletypeText
        text="Field note 02"
        marker="field-note-02"
        enabled={motionEnabled}
        start={isInView}
      />
    </div>
  )
}

function MethodTeletype({ motionEnabled }: { motionEnabled: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: teletypeConfig.viewportAmount,
  })
  return (
    <aside
      ref={ref}
      data-teletype-method
      className={`${marginNote} min-[1180px]:left-[calc(100%+62px)]`}
    >
      {methodLines.map((line, index) => {
        return (
          <TeletypeText
            key={line}
            text={line}
            enabled={motionEnabled}
            start={isInView}
            delayMs={getTeletypeLineDelay(index)}
            className={`block ${
              index === 0 ? 'mb-[7px] text-accent' : 'text-ink-2'
            }`}
          />
        )
      })}
    </aside>
  )
}

function SystemDiagram({ animated }: { animated: boolean }) {
  const edges = [
    [18, 70, 62, 28],
    [62, 28, 112, 54],
    [112, 54, 162, 22],
    [112, 54, 172, 84],
    [172, 84, 226, 48],
    [162, 22, 226, 48],
    [18, 70, 172, 84],
  ] as const
  const nodes = [
    [18, 70],
    [62, 28],
    [112, 54],
    [162, 22],
    [172, 84],
    [226, 48],
  ] as const
  const drawDelay =
    systemHeadlineConfig.wordDurationSeconds +
    systemHeadlineConfig.wordStaggerSeconds * (systemWords.length - 1)
  const draw = {
    hidden: { strokeDashoffset: 1 },
    visible: {
      strokeDashoffset: 0,
      transition: {
        delay: drawDelay,
        duration: systemHeadlineConfig.diagramDurationSeconds,
        ease: easeOut,
      },
    },
  }

  return (
    <svg
      data-system-diagram
      aria-hidden="true"
      viewBox="0 0 244 106"
      className="pointer-events-none absolute -inset-x-8 -inset-y-7 -z-10 h-[calc(100%+3.5rem)] w-[calc(100%+4rem)] overflow-visible text-accent max-[760px]:inset-x-0 max-[760px]:w-full"
      style={{ opacity: systemHeadlineConfig.diagramOpacity }}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      {edges.map(([x1, y1, x2, y2], index) =>
        animated ? (
          <motion.line
            key={`edge-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            pathLength="1"
            strokeDasharray="1"
            variants={draw}
          />
        ) : (
          <line key={`edge-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ),
      )}
      {nodes.map(([cx, cy], index) =>
        animated ? (
          <motion.circle
            key={`node-${index}`}
            cx={cx}
            cy={cy}
            r="3.5"
            pathLength="1"
            strokeDasharray="1"
            variants={draw}
          />
        ) : (
          <circle key={`node-${index}`} cx={cx} cy={cy} r="3.5" />
        ),
      )}
    </svg>
  )
}

function SystemHeadline({ motionEnabled }: { motionEnabled: boolean }) {
  const className =
    'relative z-10 mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]'

  if (!motionEnabled) {
    return (
      <div className="relative isolate">
        <SystemDiagram animated={false} />
        <h2 className={className}>Sourcing becomes a system.</h2>
      </div>
    )
  }

  return (
    <motion.div
      className="relative isolate"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: systemHeadlineConfig.viewportAmount }}
    >
      <SystemDiagram animated />
      <h2 className={className} aria-label="Sourcing becomes a system.">
        {systemWords.map((word, index) => (
          <span key={word} className="inline-block overflow-hidden">
            <motion.span
              aria-hidden="true"
              className="inline-block"
              variants={{
                hidden: {
                  opacity: 0,
                  y: systemHeadlineConfig.wordOffsetPx,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * systemHeadlineConfig.wordStaggerSeconds,
                    duration: systemHeadlineConfig.wordDurationSeconds,
                    ease: easeOut,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {index < systemWords.length - 1 ? '\u00a0' : null}
          </span>
        ))}
      </h2>
    </motion.div>
  )
}

function useScramble(text: string, enabled: boolean) {
  const [displayText, setDisplayText] = useState(text)
  const frame = useRef(0)

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
    },
    [],
  )

  const scramble = () => {
    if (!enabled) return

    cancelAnimationFrame(frame.current)
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(
        (now - startedAt) / contextBarConfig.scrambleDurationMs,
        1,
      )
      const resolvedCharacters = Math.floor(progress * text.length)
      const nextText = Array.from(text, (character, index) => {
        if (index < resolvedCharacters || /\s/u.test(character)) {
          return character
        }
        const glyphIndex = Math.floor(Math.random() * scrambleGlyphs.length)
        return scrambleGlyphs[glyphIndex]
      }).join('')

      setDisplayText(progress === 1 ? text : nextText)
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
  }

  return { displayText, scramble }
}

function ContextReceipt({ href, detail }: { href: string; detail: string }) {
  const motionEnabled = useReducedMotion() === false
  const { displayText, scramble } = useScramble('Résumé', motionEnabled)

  return (
    <a
      data-receipt
      data-context-bar
      data-provenance="Self-reported context"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={receipt}
      onMouseEnter={scramble}
    >
      <motion.span
        data-live-indicator
        aria-hidden="true"
        className="size-[6px] rounded-full bg-accent max-[760px]:col-start-1 max-[760px]:row-start-1"
        animate={
          motionEnabled
            ? {
                opacity: [1, contextBarConfig.pulseMinimumOpacity, 1],
              }
            : { opacity: 1 }
        }
        transition={{
          duration: contextBarConfig.pulseDurationSeconds,
          ease: easeOut,
          repeat: motionEnabled ? Infinity : 0,
        }}
      />
      <span className="whitespace-nowrap text-accent max-[760px]:col-start-2 max-[760px]:row-start-1">
        Self-reported context
      </span>
      <span className="text-ink normal-case group-hover:text-accent max-[760px]:col-start-2 max-[760px]:row-start-2">
        <span
          data-scramble-label
          aria-label="Résumé"
          className="relative inline-block w-[6ch]"
        >
          <span aria-hidden="true">
            {motionEnabled ? displayText : 'Résumé'}
          </span>
        </span>{' '}
        — {detail}
      </span>
      <span
        aria-hidden="true"
        className="text-ink max-[760px]:col-start-3 max-[760px]:row-span-2 max-[760px]:row-start-1"
      >
        ↗
      </span>
    </a>
  )
}

export function AboutContent() {
  const hydrated = useHydrated()
  const shouldReduceMotion = useReducedMotion()
  const motionEnabled = hydrated && shouldReduceMotion === false

  return (
    <Wrap className="pb-20">
      <ScrollProgressRule motionEnabled={motionEnabled} />
      <section
        data-about-motion={motionEnabled ? 'enabled' : 'reduced-or-static'}
        className="pt-[110px] text-center max-[760px]:pt-[62px] max-[760px]:text-left"
      >
        <Eyebrow className="mb-0 justify-center gap-[10px] text-[11px] tracking-[0.15em] max-[760px]:justify-start [&>span]:w-7">
          Field notes / About
        </Eyebrow>
        <Headline />
        <div className="mx-auto mt-[34px] grid max-w-[720px] grid-cols-[54px_1fr] gap-6 text-left max-[760px]:mx-0 max-[760px]:mt-[26px] max-[760px]:grid-cols-1 max-[760px]:gap-3">
          <HeroMarker />
          <p className="text-[21px] leading-[1.55] text-ink-2 max-[760px]:text-[18px]">
            Enterprise AE, AI GTM builder, and operator of the systems I use to
            source, qualify, and win pipeline.
          </p>
        </div>
        <ProofPoints />
      </section>

      <Portrait />

      <section
        data-field-note
        className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
      >
        <DotDivider align="start" motionEnabled={motionEnabled} />
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 01
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          The selling foundation.
        </h2>
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          The number came first, and I carried it for 7 years before wiring in
          any AI.
        </p>
        <aside
          className={`${marginNote} min-[1180px]:right-[calc(100%+62px)] min-[1180px]:text-right`}
        >
          <b className="mb-[7px] block font-normal text-accent">
            [Role result]
          </b>
          Seller performance establishes the foundation before the AI layer
          enters the record.
        </aside>
        <p className={bodyCopy}>
          I&apos;ve spent the last 7 years selling enterprise software, SDR
          through Senior AE. The record: 100%+ at Jamf in 2021 and 2022 (#3 of
          ~30), 112% of $460K in 2023 (Pinnacle Club, top 5% globally). What
          changed in the last two is how I source: I stopped treating cold
          outbound as a volume problem and started treating it as a{' '}
          <strong className="font-semibold text-ink">system problem</strong>.
        </p>
        <p className={bodyCopy}>
          At Staffbase I ranked{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat>#2 of 22</HighlightedStat> AEs at{' '}
            <HighlightedStat>97%</HighlightedStat>
          </strong>{' '}
          of $690K quota, generating{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat>$1.4M</HighlightedStat> in self-sourced pipeline
          </strong>{' '}
          with{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat>75%</HighlightedStat>
          </strong>{' '}
          from net-new logos. I multi-threaded into CHRO, CIO, VP IT,
          Procurement, and CFO buying committees, displacing SharePoint and
          Workplace by Meta through competitive ROI positioning.
        </p>
        <ContextReceipt
          href="/Alec_Hemenway_Resume_2026_v14.pdf"
          detail="role and quota history"
        />
      </section>

      <section className="mx-auto mt-[84px] max-w-[1040px] border-y border-line py-[72px] max-[760px]:mt-[61px] max-[760px]:py-[51px]">
        <OverQuotaCounter motionEnabled={motionEnabled} />
        <div className="mt-6 text-[17px] font-semibold">
          of $460K quota, Jamf 2023
        </div>
        <p className="mt-[18px] max-w-[54ch] text-[13px] leading-[1.7] text-ink-2">
          100%+ in 2021 and 2022 (#3 of ~30); 97% of $690K at Staffbase, #2 of
          22; Pinnacle Club 2023 (top 5% globally).
        </p>
      </section>

      <section
        data-field-note
        className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
      >
        <DotDivider align="center" motionEnabled={motionEnabled} />
        <FieldNoteTeletype motionEnabled={motionEnabled} />
        <SystemHeadline motionEnabled={motionEnabled} />
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          The change was the operating model: how I find and reach the right
          accounts.
        </p>
        <MethodTeletype motionEnabled={motionEnabled} />
        <p className={bodyCopy}>
          At Coram I self-sourced{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat>$1.6M</HighlightedStat> of pipeline in 7 months
          </strong>{' '}
          and closed{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat>$112K</HighlightedStat> net-new ARR across 4 wins
          </strong>{' '}
          by wiring Claude into every step that used to eat my week:
          buyer-signal research, intent data, account prioritization, and the
          first-touch outbound itself.
        </p>
        <p className={bodyCopy}>
          The result is infrastructure: skills, MCPs, and eval harnesses I run
          in production against real accounts.
        </p>
        <ContextReceipt
          href="/Alec_Hemenway_Resume_2026_v14.pdf"
          detail="sourcing outcomes"
        />
      </section>

      <section className="mx-auto mt-[84px] max-w-[1040px] border-y border-line py-[72px] text-right max-[760px]:mt-[61px] max-[760px]:py-[51px] max-[760px]:text-left">
        <div className="font-serif text-[clamp(92px,13vw,174px)] leading-[0.78] tracking-[-0.045em] text-accent max-[760px]:text-[clamp(76px,24vw,106px)]">
          $3M
        </div>
        <div className="mt-6 text-[17px] font-semibold">
          self-sourced pipeline
        </div>
        <p className="mt-[18px] ml-auto max-w-[54ch] text-[13px] leading-[1.7] text-ink-2 max-[760px]:ml-0">
          $3M generated across my last two roles without waiting on marketing or
          SDR coverage.
        </p>
      </section>

      <section
        data-field-note
        className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
      >
        <DotDivider align="end" motionEnabled={motionEnabled} />
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 03
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          The system leaves artifacts.
        </h2>
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          Every AI claim links to something you can read or run.
        </p>
        <aside
          className={`${marginNote} min-[1180px]:right-[calc(100%+62px)] min-[1180px]:text-right`}
        >
          <b className="mb-[7px] block font-normal text-accent">[Artifact]</b>
          Open-source skills and eval infrastructure. The 60+ counts published
          artifacts.
        </aside>
        <p className={bodyCopy}>
          I&apos;ve published{' '}
          <strong className="font-semibold text-ink">
            60+ open-source Claude Code skills
          </strong>
          , built a manual-eval-first harness to keep them honest, and run a
          three-layer memory system so the tooling compounds instead of
          resetting every month.
        </p>
        <p className={bodyCopy}>
          Every AI claim ships with a number, a live link, or open-source code
          you can read. I sell the category I build in, and I can talk to a CRO
          and an engineer in the same meeting.
        </p>
        <a
          data-receipt
          data-provenance="Public artifact"
          href="https://github.com/alechemenway"
          target="_blank"
          rel="noopener noreferrer"
          className={receipt}
        >
          <span
            aria-hidden
            className="size-[6px] rounded-full bg-accent max-[760px]:col-start-1 max-[760px]:row-start-1"
          />
          <span className="whitespace-nowrap text-accent max-[760px]:col-start-2 max-[760px]:row-start-1">
            Public artifact
          </span>
          <span className="text-ink normal-case group-hover:text-accent max-[760px]:col-start-2 max-[760px]:row-start-2">
            GitHub — open-source work
          </span>
          <span
            aria-hidden
            className="text-ink max-[760px]:col-start-3 max-[760px]:row-span-2 max-[760px]:row-start-1"
          >
            ↗
          </span>
        </a>
      </section>

      <section className="mx-auto mt-[84px] max-w-[1040px] border-y border-line py-[72px] text-center max-[760px]:mt-[61px] max-[760px]:py-[51px] max-[760px]:text-left">
        <div className="font-serif text-[clamp(92px,13vw,174px)] leading-[0.78] tracking-[-0.045em] text-accent max-[760px]:text-[clamp(76px,24vw,106px)]">
          60+
        </div>
        <div className="mt-6 text-[17px] font-semibold">Claude Code skills</div>
        <p className="mx-auto mt-[18px] max-w-[54ch] text-[13px] leading-[1.7] text-ink-2 max-[760px]:mx-0">
          Published artifacts you can install today. No adoption numbers
          claimed.
        </p>
      </section>

      <section className="mx-auto mt-[123px] max-w-[820px] max-[760px]:mt-[77px]">
        <StaticHeading
          before="What stays"
          emphasis="true."
          className="mb-[42px] text-center font-serif text-[clamp(48px,6vw,68px)] leading-none font-normal max-[760px]:text-left"
        />
        <ol>
          {principles.map((principle, index) => (
            <li
              key={principle.lead}
              className={`grid grid-cols-[90px_1fr] gap-[22px] border-b border-line py-6 max-[760px]:grid-cols-[58px_1fr] max-[760px]:gap-[14px] ${
                index % 2 === 1 ? 'min-[761px]:ml-[72px]' : ''
              }`}
            >
              <div className="font-serif text-[54px] leading-none text-accent italic max-[760px]:text-[44px]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-[19px] font-semibold">{principle.lead}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-ink-2">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="mx-auto mt-[90px] max-w-[900px] border border-line bg-bg-2 px-[50px] py-[43px] max-[760px]:mt-[66px] max-[760px]:px-7 max-[760px]:py-[30px]">
        <h2 className="font-serif text-[34px] leading-none font-normal text-accent italic">
          Off the record.
        </h2>
        <p className="mt-[18px] max-w-[65ch] text-[16px] leading-[1.75] text-ink-2">
          Outside the pipeline you’ll find me on a golf course, on a trail
          somewhere, or shipping the next skill. I’m looking for the next
          high-stakes enterprise AE seat, ideally at a company building or
          selling AI.
        </p>
      </aside>

      <section className="mx-auto max-w-[1040px] pt-[122px] pb-10 text-center max-[760px]:pt-20 max-[760px]:text-left">
        <StaticHeading
          before="Think we’d"
          emphasis="work well"
          after=" together?"
          className="mx-auto max-w-[15ch] font-serif text-[clamp(56px,7.5vw,96px)] leading-[0.96] font-normal max-[760px]:mx-0 max-[760px]:text-[58px]"
        />
        <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-2 max-[760px]:mx-0">
          Tell me about the seat and the number.
        </p>
        <ContactActions />
      </section>
    </Wrap>
  )
}
