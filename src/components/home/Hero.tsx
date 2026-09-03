'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { Wrap } from '@/components/Wrap'
import { Button } from '@/components/Button'
import { FigureMorph } from '@/components/motion/FigureMorph'

const EASE = [0.22, 1, 0.36, 1] as const

function Line({
  children,
  i,
  show,
}: {
  children: React.ReactNode
  i: number
  show: boolean
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={show ? { y: '115%' } : false}
        animate={show ? { y: '0%' } : { y: '115%' }}
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
  show,
  className,
}: {
  children: React.ReactNode
  delay: number
  show: boolean
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={show ? { opacity: 0, y: 16 } : false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion() ?? false
  // Text appears when the morph fires 'rise' (color bleed + pose upright).
  // Reduced motion / missing asset: FigureMorph fires both phases immediately.
  const [revealed, setRevealed] = useState(reduce)

  return (
    <header className="relative flex min-h-[88svh] items-center overflow-hidden pt-20 pb-[50px]">
      <FigureMorph
        className="absolute inset-0 h-full w-full"
        onPhase={(phase) => {
          if (phase === 'rise') setRevealed(true)
        }}
      />
      {/* keep text readable over the figure on the left */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, var(--bg) 30%, color-mix(in oklab, var(--bg) 72%, transparent) 55%, transparent 80%)',
        }}
      />
      <Wrap className="relative z-[2]">
        <FadeUp delay={0} show={revealed}>
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] text-ink-2 uppercase">
            <span className="h-px w-6 bg-accent" />
            <span>
              Enterprise AE&nbsp;&nbsp;<span className="text-accent">×</span>
              &nbsp;&nbsp;AI GTM Developer
            </span>
          </div>
        </FadeUp>

        <h1 className="mt-6 max-w-[16ch] text-[clamp(44px,7.4vw,104px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
          <Line i={0} show={revealed}>
            Everyone&apos;s selling you AI.
          </Line>
          <Line i={1} show={revealed}>
            I&apos;ll help you figure out{' '}
            <span className="text-accent">what&apos;s worth buying.</span>
          </Line>
        </h1>

        <FadeUp delay={0.4} show={revealed}>
          <div className="mt-7 max-w-[52ch] text-[clamp(16px,1.35vw,19px)] leading-[1.62] text-ink-2">
            <p>
              Enterprise AE: 112% of a $460K quota at Jamf in 2023 (Pinnacle
              Club, top 5% globally), 97% of $690K at Staffbase (#2 of 22).
              Running that stack taught me where AI deals live or die: trust
              and deployment.
            </p>
          </div>
        </FadeUp>

        <FadeUp
          delay={0.5}
          show={revealed}
          className="mt-9 flex flex-wrap items-center gap-3.5"
        >
          <Button href="/projects" variant="solid" arrow="→">
            View the work
          </Button>
          <Button
            href="/Alec_Hemenway_Resume_2026_v14.pdf"
            variant="ghost"
            arrow="↓"
            download="Alec_Hemenway_Resume_2026_v14.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </Button>
        </FadeUp>

        <FadeUp
          delay={0.6}
          show={revealed}
          className="mt-7 flex gap-6 font-mono text-[12px] tracking-[0.04em] text-ink-2"
        >
          <a
            href="https://github.com/alechemenway"
            className="transition-colors hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/alec-hemenway/"
            className="transition-colors hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:alec@hemenway.io"
            className="transition-colors hover:text-accent"
          >
            Email ↗
          </a>
        </FadeUp>
      </Wrap>
    </header>
  )
}
