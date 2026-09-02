'use client'

import Image from 'next/image'
import {
  Fragment,
  type ReactNode,
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
import { useCountUp } from '@/hooks/useCountUp'
import portrait from '@/images/about-hero-2026.png'
import {
  emphasisWord,
  fadeOnly,
  fadeUp,
  headlineMarker,
  headlineWord,
  highlightFlash,
  stagger,
  viewportOnce,
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
    href: '/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf',
    newTab: true,
  },
]

const headline = [
  { word: 'Enterprise', delay: 0 },
  { word: 'AE', delay: 0.04 },
  { word: 'with', delay: 0.08 },
  { word: 'commit', delay: 0.12 },
  { word: 'history.', delay: 0.16 },
]

const bodyCopy =
  'mt-[22px] text-[17px] leading-[1.82] text-ink-2 max-[760px]:text-[16px] max-[760px]:leading-[1.78]'

const marginNote =
  'mt-6 w-full font-mono text-[9px] leading-[1.65] tracking-[0.04em] text-ink-2 uppercase min-[1180px]:absolute min-[1180px]:top-[170px] min-[1180px]:mt-0 min-[1180px]:w-[150px]'

const receipt =
  'group mt-[30px] grid grid-cols-[auto_auto_1fr_auto] items-center gap-[11px] border-y border-line py-4 font-mono text-[10px] text-ink-2 uppercase transition-colors hover:border-accent max-[760px]:grid-cols-[6px_1fr_auto]'

const contactAction =
  'relative inline-flex items-center border border-line px-[18px] py-2.5 font-mono text-[12.5px] text-ink-2 transition-transform duration-300 ease-out after:absolute after:right-[18px] after:bottom-2 after:left-[18px] after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:after:scale-x-100 motion-reduce:transform-none motion-reduce:transition-none motion-reduce:after:transition-none'

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

function Headline({ motionEnabled }: { motionEnabled: boolean }) {
  const className =
    'mx-auto mt-[34px] max-w-[13ch] text-[clamp(48px,7vw,92px)] leading-[0.98] font-extrabold tracking-[-0.055em] max-[760px]:mx-0 max-[760px]:mt-[26px] max-[760px]:text-[48px]'

  if (!motionEnabled) {
    return <h1 className={className}>Enterprise AE with commit history.</h1>
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      aria-label="Enterprise AE with commit history."
    >
      {headline.map(({ word, delay }, index) => (
        <Fragment key={word}>
          <motion.span
            custom={delay}
            variants={headlineWord}
            aria-hidden="true"
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < headline.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.h1>
  )
}

function HeroMarker({ motionEnabled }: { motionEnabled: boolean }) {
  const className = 'font-mono text-[11px] text-ink-2'

  if (!motionEnabled) return <span className={className}>(01)</span>

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={headlineMarker}
    >
      (01)
    </motion.span>
  )
}

function CountUp({
  target,
  prefix = '',
  suffix = '',
  enabled,
  start,
}: {
  target: number
  prefix?: string
  suffix?: string
  enabled: boolean
  start: boolean
}) {
  const value = useCountUp(target, enabled, start)

  return (
    <b
      data-count-up={target}
      data-prefix={prefix}
      data-suffix={suffix}
      className="font-medium text-ink tabular-nums"
    >
      {prefix}
      {value}
      {suffix}
    </b>
  )
}

function ProofPoints({ motionEnabled }: { motionEnabled: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <p
      ref={ref}
      className="mt-[34px] font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-ink-2 max-[760px]:mt-[26px]"
    >
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        The record —{' '}
        <CountUp
          target={3}
          prefix="$"
          suffix="M"
          enabled={motionEnabled}
          start={isInView}
        />{' '}
        self-sourced pipeline
      </span>
      <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        Pinnacle Club{' '}
        <CountUp
          target={2023}
          enabled={motionEnabled}
          start={isInView}
        />{' '}
        (top 5%)
      </span>
      <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
      <span className="max-[760px]:block max-[760px]:py-[7px]">
        <CountUp
          target={60}
          suffix="+"
          enabled={motionEnabled}
          start={isInView}
        />{' '}
        Claude Code skills
      </span>
    </p>
  )
}

function MotionParagraph({
  children,
  className,
  motionEnabled,
}: {
  children: ReactNode
  className: string
  motionEnabled: boolean
}) {
  if (!motionEnabled) return <p className={className}>{children}</p>

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      {children}
    </motion.p>
  )
}

function HighlightedStat({
  children,
  motionEnabled,
}: {
  children: ReactNode
  motionEnabled: boolean
}) {
  if (!motionEnabled) return <span data-highlight-stat>{children}</span>

  return (
    <span data-highlight-stat className="relative isolate inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-0.5 inset-y-0 bg-accent/[0.08]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={highlightFlash}
      />
      <span className="relative">{children}</span>
    </span>
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

  if (!motionEnabled) {
    return (
      <div data-motion-divider aria-hidden="true" className={className}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    )
  }

  return (
    <motion.div
      data-motion-divider
      aria-hidden="true"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.15)}
    >
      {[0, 1, 2].map((dot) => (
        <motion.span key={dot} variants={fadeOnly}>
          .
        </motion.span>
      ))}
    </motion.div>
  )
}

function AnimatedHeading({
  before,
  emphasis,
  after,
  className,
  motionEnabled,
}: {
  before: string
  emphasis: string
  after?: string
  className: string
  motionEnabled: boolean
}) {
  if (!motionEnabled) {
    return (
      <h2 className={className}>
        {before} <em className="font-serif text-accent">{emphasis}</em>
        {after}
      </h2>
    )
  }

  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0)}
    >
      <motion.span className="inline-block" variants={fadeUp}>
        {before}
      </motion.span>{' '}
      <motion.em
        className="inline-block font-serif text-accent"
        variants={emphasisWord}
      >
        {emphasis}
      </motion.em>
      {after ? (
        <motion.span className="inline-block" variants={fadeUp}>
          {after}
        </motion.span>
      ) : null}
    </motion.h2>
  )
}

function Portrait({ motionEnabled }: { motionEnabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    motionEnabled && shouldReduceMotion === false ? [-2, 2] : [0, 0],
  )
  const imageClassName =
    'object-cover object-[50%_21%] opacity-[0.88] grayscale contrast-[1.06] transition-[filter] duration-300 ease-out group-hover:grayscale-0 motion-reduce:transition-none'
  const image = (
    <>
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
    </>
  )

  return (
    <figure className="mt-[68px] max-[760px]:mt-[52px]">
      <div
        ref={ref}
        data-portrait-motion
        className="group relative mx-auto aspect-[16/8.8] max-w-[1120px] overflow-hidden border border-line bg-surface max-[760px]:-mx-6 max-[760px]:aspect-[4/5] max-[760px]:w-[calc(100%+3rem)] max-[760px]:border-x-0"
      >
        {motionEnabled && shouldReduceMotion === false ? (
          <motion.div className="absolute inset-x-0 -inset-y-1" style={{ y }}>
            {image}
          </motion.div>
        ) : (
          <div className="absolute inset-x-0 -inset-y-1">{image}</div>
        )}
      </div>
      <figcaption className="mx-auto mt-[13px] flex max-w-[1120px] justify-between gap-5 font-mono text-[9px] leading-[1.5] tracking-[0.08em] text-ink-2 uppercase">
        <span>Alec Hemenway · Minneapolis</span>
        <span>Studio portrait</span>
      </figcaption>
    </figure>
  )
}

function ContactActions({ motionEnabled }: { motionEnabled: boolean }) {
  const links = contactLinks.map((link) => ({
    ...link,
    ...(link.newTab
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {}),
  }))

  if (!motionEnabled) {
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

  return (
    <motion.div
      className="mt-[34px] flex flex-wrap justify-center gap-3 max-[760px]:justify-start"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.06)}
    >
      {links.map((link) => (
        <motion.a
          key={link.label}
          data-contact-action
          href={link.href}
          target={link.target}
          rel={link.rel}
          className={contactAction}
          variants={fadeOnly}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  )
}

export function AboutContent() {
  const hydrated = useHydrated()
  const shouldReduceMotion = useReducedMotion()
  const motionEnabled = hydrated && shouldReduceMotion === false

  return (
    <Wrap className="pb-20">
      <section className="pt-[110px] text-center max-[760px]:pt-[62px] max-[760px]:text-left">
        <Eyebrow className="mb-0 justify-center gap-[10px] text-[11px] tracking-[0.15em] max-[760px]:justify-start [&>span]:w-7">
          Field notes / About
        </Eyebrow>
        <Headline motionEnabled={motionEnabled} />
        <div className="mx-auto mt-[34px] grid max-w-[720px] grid-cols-[54px_1fr] gap-6 text-left max-[760px]:mx-0 max-[760px]:mt-[26px] max-[760px]:grid-cols-1 max-[760px]:gap-3">
          <HeroMarker motionEnabled={motionEnabled} />
          <p className="text-[21px] leading-[1.55] text-ink-2 max-[760px]:text-[18px]">
            Enterprise AE, AI GTM builder, and operator of the systems I use to
            source, qualify, and win pipeline.
          </p>
        </div>
        <ProofPoints motionEnabled={motionEnabled} />
      </section>

      <Portrait motionEnabled={motionEnabled} />

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
        <MotionParagraph
          className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]"
          motionEnabled={motionEnabled}
        >
          The number came first, and I carried it for 7 years before wiring in
          any AI.
        </MotionParagraph>
        <aside
          className={`${marginNote} min-[1180px]:right-[calc(100%+62px)] min-[1180px]:text-right`}
        >
          <b className="mb-[7px] block font-normal text-accent">
            [Role result]
          </b>
          Seller performance establishes the foundation before the AI layer
          enters the record.
        </aside>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          I&apos;ve spent the last 7 years selling enterprise software, SDR
          through Senior AE. The record: 100%+ at Jamf in 2021 and 2022 (#3 of
          ~30), 112% of $460K in 2023 (Pinnacle Club, top 5% globally). What
          changed in the last two is how I source: I stopped treating cold
          outbound as a volume problem and started treating it as a{' '}
          <strong className="font-semibold text-ink">system problem</strong>.
        </MotionParagraph>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          At Staffbase I ranked{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat motionEnabled={motionEnabled}>
              #2 of 22
            </HighlightedStat>{' '}
            AEs at{' '}
            <HighlightedStat motionEnabled={motionEnabled}>97%</HighlightedStat>
          </strong>{' '}
          of $690K quota, generating{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat motionEnabled={motionEnabled}>
              $1.4M
            </HighlightedStat>{' '}
            in self-sourced pipeline
          </strong>{' '}
          with{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat motionEnabled={motionEnabled}>75%</HighlightedStat>
          </strong>{' '}
          from net-new logos. I multi-threaded into CHRO, CIO, VP IT,
          Procurement, and CFO buying committees, displacing SharePoint and
          Workplace by Meta through competitive ROI positioning.
        </MotionParagraph>
        <a
          data-receipt
          data-provenance="Self-reported context"
          href="/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={receipt}
        >
          <span
            aria-hidden
            className="size-[6px] rounded-full bg-accent max-[760px]:col-start-1 max-[760px]:row-start-1"
          />
          <span className="whitespace-nowrap text-accent max-[760px]:col-start-2 max-[760px]:row-start-1">
            Self-reported context
          </span>
          <span className="text-ink normal-case transition-colors group-hover:text-accent max-[760px]:col-start-2 max-[760px]:row-start-2">
            Résumé — role and quota history
          </span>
          <span
            aria-hidden
            className="text-ink max-[760px]:col-start-3 max-[760px]:row-span-2 max-[760px]:row-start-1"
          >
            ↗
          </span>
        </a>
      </section>

      <section className="mx-auto mt-[84px] max-w-[1040px] border-y border-line py-[72px] max-[760px]:mt-[61px] max-[760px]:py-[51px]">
        <div className="font-serif text-[clamp(92px,13vw,174px)] leading-[0.78] tracking-[-0.045em] text-accent max-[760px]:text-[clamp(76px,24vw,106px)]">
          112%
        </div>
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
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 02
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          Sourcing becomes a system.
        </h2>
        <MotionParagraph
          className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]"
          motionEnabled={motionEnabled}
        >
          The change was the operating model: how I find and reach the right
          accounts.
        </MotionParagraph>
        <aside className={`${marginNote} min-[1180px]:left-[calc(100%+62px)]`}>
          <b className="mb-[7px] block font-normal text-accent">[Method]</b>
          Buyer-signal research · intent data · account prioritization ·
          first-touch outbound.
        </aside>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          At Coram I self-sourced{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat motionEnabled={motionEnabled}>
              $1.6M
            </HighlightedStat>{' '}
            of pipeline in 7 months
          </strong>{' '}
          and closed{' '}
          <strong className="font-semibold text-ink">
            <HighlightedStat motionEnabled={motionEnabled}>
              $112K
            </HighlightedStat>{' '}
            net-new ARR across 4 wins
          </strong>{' '}
          by wiring Claude into every step that used to eat my week:
          buyer-signal research, intent data, account prioritization, and the
          first-touch outbound itself.
        </MotionParagraph>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          The result is infrastructure: skills, MCPs, and eval harnesses I run
          in production against real accounts.
        </MotionParagraph>
        <a
          data-receipt
          data-provenance="Self-reported context"
          href="/Alec_Hemenway_Resume_2026_1pg_v5.1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={receipt}
        >
          <span
            aria-hidden
            className="size-[6px] rounded-full bg-accent max-[760px]:col-start-1 max-[760px]:row-start-1"
          />
          <span className="whitespace-nowrap text-accent max-[760px]:col-start-2 max-[760px]:row-start-1">
            Self-reported context
          </span>
          <span className="text-ink normal-case transition-colors group-hover:text-accent max-[760px]:col-start-2 max-[760px]:row-start-2">
            Résumé — sourcing outcomes
          </span>
          <span
            aria-hidden
            className="text-ink max-[760px]:col-start-3 max-[760px]:row-span-2 max-[760px]:row-start-1"
          >
            ↗
          </span>
        </a>
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
        <MotionParagraph
          className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]"
          motionEnabled={motionEnabled}
        >
          Every AI claim links to something you can read or run.
        </MotionParagraph>
        <aside
          className={`${marginNote} min-[1180px]:right-[calc(100%+62px)] min-[1180px]:text-right`}
        >
          <b className="mb-[7px] block font-normal text-accent">[Artifact]</b>
          Open-source skills and eval infrastructure. The 60+ counts published
          artifacts.
        </aside>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          I&apos;ve published{' '}
          <strong className="font-semibold text-ink">
            60+ open-source Claude Code skills
          </strong>
          , built a manual-eval-first harness to keep them honest, and run a
          three-layer memory system so the tooling compounds instead of
          resetting every month.
        </MotionParagraph>
        <MotionParagraph className={bodyCopy} motionEnabled={motionEnabled}>
          Every AI claim ships with a number, a live link, or open-source code
          you can read. I sell the category I build in, and I can talk to a CRO
          and an engineer in the same meeting.
        </MotionParagraph>
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
          <span className="text-ink normal-case transition-colors group-hover:text-accent max-[760px]:col-start-2 max-[760px]:row-start-2">
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
        <AnimatedHeading
          before="What stays"
          emphasis="true."
          className="mb-[42px] text-center font-serif text-[clamp(48px,6vw,68px)] leading-none font-normal max-[760px]:text-left"
          motionEnabled={motionEnabled}
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
        <AnimatedHeading
          before="Think we’d"
          emphasis="work well"
          after=" together?"
          className="mx-auto max-w-[15ch] font-serif text-[clamp(56px,7.5vw,96px)] leading-[0.96] font-normal max-[760px]:mx-0 max-[760px]:text-[58px]"
          motionEnabled={motionEnabled}
        />
        <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-2 max-[760px]:mx-0">
          Tell me about the seat and the number.
        </p>
        <ContactActions motionEnabled={motionEnabled} />
      </section>
    </Wrap>
  )
}
