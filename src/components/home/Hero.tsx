'use client'

import { motion, useReducedMotion } from 'motion/react'

import { Wrap } from '@/components/Wrap'
import { Button } from '@/components/Button'
import { Accent } from '@/components/Accent'
import { FlowField } from '@/components/motion/FlowField'

const EASE = [0.22, 1, 0.36, 1] as const

function Line({
  children,
  i,
  reduce,
}: {
  children: React.ReactNode
  i: number
  reduce: boolean
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '115%' }}
        animate={reduce ? undefined : { y: '0%' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.05 + i * 0.09 }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeUp({
  children,
  delay,
  reduce,
  className,
}: {
  children: React.ReactNode
  delay: number
  reduce: boolean
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion() ?? false

  return (
    <header className="relative flex min-h-[88svh] items-center overflow-hidden py-20">
      <FlowField className="absolute inset-0 h-full w-full" density={1.4} />
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, var(--bg) 6%, color-mix(in oklab, var(--bg) 55%, transparent) 42%, transparent 78%), radial-gradient(120% 100% at 75% 35%, transparent 30%, var(--bg) 92%)',
        }}
      />
      <Wrap className="relative z-[2]">
        <FadeUp delay={0} reduce={reduce}>
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] text-ink-2 uppercase">
            <span className="h-px w-6 bg-accent" />
            <span>
              Enterprise AE&nbsp;&nbsp;<span className="text-accent">×</span>
              &nbsp;&nbsp;AI GTM Developer
            </span>
          </div>
        </FadeUp>

        <h1 className="mt-6 max-w-[15ch] text-[clamp(44px,7.4vw,104px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
          <Line i={0} reduce={reduce}>
            I sell enterprise
          </Line>
          <Line i={1} reduce={reduce}>
            software — and build
          </Line>
          <Line i={2} reduce={reduce}>
            the <Accent>AI</Accent> that sells it.
          </Line>
        </h1>

        <FadeUp delay={0.36} reduce={reduce}>
          <p className="mt-7 max-w-[52ch] text-[clamp(16px,1.35vw,19px)] leading-[1.62] text-ink-2">
            Enterprise AE with a four-year quota streak, and a GTM developer who
            ships the systems behind the number — prospecting skills, eval
            harnesses, live products.{' '}
            <b className="font-semibold text-ink">$3M+ self-sourced pipeline</b>{' '}
            is the proof, not the pitch.
          </p>
        </FadeUp>

        <FadeUp delay={0.46} reduce={reduce} className="mt-9 flex flex-wrap items-center gap-3.5">
          <Button href="/projects" variant="solid" arrow="→">
            View the work
          </Button>
          <Button
            href="/Alec_Hemenway_Ramp_MM_AE_1pg.pdf"
            variant="ghost"
            arrow="↓"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </Button>
        </FadeUp>

        <FadeUp delay={0.56} reduce={reduce} className="mt-7 flex gap-6 font-mono text-[12px] tracking-[0.04em] text-ink-2">
          <a href="https://github.com/alechemenway" className="transition-colors hover:text-accent">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/alec-hemenway/" className="transition-colors hover:text-accent">
            LinkedIn ↗
          </a>
          <a href="mailto:alec@hemenway.io" className="transition-colors hover:text-accent">
            Email ↗
          </a>
        </FadeUp>
      </Wrap>
    </header>
  )
}
