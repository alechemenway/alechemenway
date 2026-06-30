import { type Metadata } from 'next'
import Image from 'next/image'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { Accent } from '@/components/Accent'
import { Reveal } from '@/components/motion/Reveal'
import { ClosingBand } from '@/components/ClosingBand'
import portrait from '@/images/portrait-2026.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Alec Hemenway — enterprise SaaS Account Executive who self-sources pipeline with AI. Six years selling, a four-year quota streak, and 60+ open-source Claude Code skills.',
}

const principles = [
  {
    lead: 'Self-sourced pipeline.',
    body: '$3M+ generated across my last two roles without waiting on marketing or SDR coverage.',
  },
  {
    lead: 'Consistent attainment.',
    body: 'Four-year quota streak at Jamf; #2 of 22 reps at 97% attainment at Staffbase; Pinnacle Club 2023 (top 5% globally).',
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

const contactLinks: { label: string; href: string; newTab?: boolean }[] = [
  { label: 'Email me ↗', href: 'mailto:alec@hemenway.io' },
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/alec-hemenway/' },
  { label: 'GitHub ↗', href: 'https://github.com/alechemenway' },
  { label: 'Download résumé ↓', href: '/Alec_Hemenway_Ramp_MM_AE_1pg.pdf', newTab: true },
]

export default function About() {
  return (
    <Wrap>
      <section className="pt-24 pb-2 text-center max-[880px]:pt-16">
        <Eyebrow className="justify-center">About</Eyebrow>
        <div className="relative mx-auto mt-2 w-[300px] max-w-[68vw]">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%)',
            }}
          />
          <div className="overflow-hidden rounded-[28px] border border-line">
            <Image
              src={portrait}
              alt="Alec Hemenway, studio portrait"
              sizes="300px"
              className="h-auto w-full"
              priority
              placeholder="blur"
            />
          </div>
          <div className="mt-4 font-mono text-[12px] tracking-[0.06em] text-ink-2">
            Alec Hemenway · Minneapolis, MN
          </div>
        </div>
        <h1 className="mx-auto mt-10 max-w-[18ch] text-[clamp(34px,5vw,60px)] leading-[1.04] font-extrabold tracking-[-0.035em]">
          I sell enterprise SaaS — and <Accent>self-source</Accent> my own
          pipeline with AI.
        </h1>
      </section>

      <div className="mx-auto mt-14 max-w-[680px]">
        <Reveal>
          <p className="text-[17px] leading-[1.75] text-ink-2">
            I’ve spent the last six years selling enterprise software, moving
            from SDR to Senior AE and never missing a number along the way. What
            changed in the last two is how I source: I stopped treating cold
            outbound as a volume problem and started treating it as a{' '}
            <b className="font-semibold text-ink">system problem</b>.
          </p>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-2">
            At Coram I self-sourced{' '}
            <span className="font-semibold text-accent">
              $1.6M of pipeline in 7 months
            </span>{' '}
            and closed{' '}
            <b className="font-semibold text-ink">$102K net-new ARR</b> by wiring
            Claude into every step that used to eat my week — buyer-signal
            research, intent data, account prioritization, and the first-touch
            outbound itself. The result isn’t a prompt I copy-paste. It’s
            infrastructure: skills, MCPs, and eval harnesses I actually run in
            production against real accounts.
          </p>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-2">
            At Staffbase I ranked{' '}
            <b className="font-semibold text-ink">#2 of 22 AEs at 97%</b> of
            $690K quota, generating{' '}
            <span className="font-semibold text-accent">
              $1.4M in self-sourced pipeline
            </span>{' '}
            with 75% from net-new logos. I multi-threaded into CHRO, CIO, VP IT,
            Procurement, and CFO buying committees, displacing SharePoint and
            Workplace by Meta through competitive ROI positioning.
          </p>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-2">
            The AI part isn’t theater. I’ve published{' '}
            <b className="font-semibold text-ink">
              60+ open-source Claude Code skills
            </b>
            , built a manual-eval-first harness to keep them honest, and run a
            three-layer memory system so the tooling compounds instead of
            resetting every month. Every AI claim ships with a number, a live
            link, or open-source code you can read. I sell the category I build
            in — and I can talk to a CRO and an engineer in the same meeting.
          </p>
        </Reveal>

        <h2 className="mt-12 mb-3 text-[28px] font-bold tracking-[-0.02em]">
          What stays true in every seat
        </h2>
        <ul className="mt-2">
          {principles.map((principle) => (
            <li
              key={principle.lead}
              className="grid grid-cols-[auto_1fr] gap-3.5 border-b border-line py-3.5 text-[16px] leading-[1.6] text-ink-2"
            >
              <span className="mt-[9px] size-[7px] rounded-full bg-accent" />
              <span>
                <b className="font-semibold text-ink">{principle.lead}</b>{' '}
                {principle.body}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[17px] leading-[1.75] text-ink-2">
          Outside the pipeline you’ll find me on a golf course, on a trail
          somewhere, or shipping the next skill. I’m looking for the next
          high-stakes enterprise AE seat — ideally at a company building or
          selling AI.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.newTab
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center gap-2 border border-line px-[18px] py-2.5 font-mono text-[12.5px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <ClosingBand
        heading={
          <>
            Think we’d <Accent>work well</Accent> together?
          </>
        }
        paragraph="I reply to every real message within 48 hours. Tell me about the seat and the number."
        primary={{ label: 'See what I’m looking for', arrow: '→', href: '/work-with-me' }}
        secondary={{ label: 'Get in touch', arrow: '↗', href: 'mailto:alec@hemenway.io' }}
      />
    </Wrap>
  )
}
