import { type Metadata } from 'next'
import Image from 'next/image'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { Accent } from '@/components/Accent'
import { Reveal } from '@/components/motion/Reveal'
import { ClosingBand } from '@/components/ClosingBand'
import portrait from '@/images/about-hero-2026.png'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Alec Hemenway — enterprise SaaS Account Executive who self-sources pipeline with AI. seven years selling, a four-year quota streak, and 60+ open-source Claude Code skills.',
}

const principles = [
  {
    lead: 'Self-sourced pipeline.',
    body: '$3M generated across my last two roles without waiting on marketing or SDR coverage.',
  },
  {
    lead: 'Consistent attainment.',
    body: '112% at Jamf with 100%+ the three prior years; #2 of 22 reps at 97% attainment at Staffbase; Pinnacle Club 2023 (top 5% globally).',
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

const proofPoints = [
  { value: '$3M+', label: 'self-sourced pipeline' },
  { value: '4 years', label: 'quota streak' },
  { value: '60+', label: 'Claude Code skills' },
]

const contactLinks: { label: string; href: string; newTab?: boolean }[] = [
  { label: 'Email me ↗', href: 'mailto:alec@hemenway.io' },
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/alec-hemenway/' },
  { label: 'GitHub ↗', href: 'https://github.com/alechemenway' },
  { label: 'Download résumé ↓', href: '/Alec_Hemenway_Resume_2026_1pg_v4.pdf', newTab: true },
]

export default function About() {
  return (
    <Wrap>
      <section className="relative grid min-h-[calc(100dvh-64px)] grid-cols-12 items-center gap-8 overflow-hidden pt-20 pb-16 max-[980px]:min-h-0 max-[980px]:grid-cols-1 max-[980px]:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-12 right-0 h-[74%] w-px bg-line max-[980px]:hidden"
        />
        <div className="relative z-10 col-span-7">
          <Eyebrow>About</Eyebrow>
          <h1 className="max-w-[13ch] text-[clamp(48px,7vw,108px)] leading-[0.98] font-extrabold tracking-[-0.055em]">
            I sell enterprise SaaS and{' '}
            <Accent>self-source</Accent> pipeline with AI.
          </h1>
          <div className="mt-12 grid max-w-[680px] grid-cols-[110px_1fr] gap-8 max-[700px]:grid-cols-1 max-[700px]:gap-4">
            <div className="font-mono text-[13px] text-ink-2">(01)</div>
            <p className="text-[clamp(19px,2vw,28px)] leading-[1.45] text-ink">
              Enterprise AE, AI GTM builder, and operator of the systems I use
              to source, qualify, and win pipeline.
            </p>
          </div>
          <div className="mt-12 grid max-w-[760px] grid-cols-3 border-y border-line max-[700px]:grid-cols-1">
            {proofPoints.map((point) => (
              <div
                key={point.label}
                className="px-6 py-5 max-[700px]:border-b max-[700px]:border-line max-[700px]:px-5 max-[700px]:last:border-b-0 min-[701px]:border-r min-[701px]:border-line min-[701px]:last:border-r-0"
              >
                <div className="font-mono text-[24px] leading-none font-extrabold text-accent">
                  {point.value}
                </div>
                <div className="mt-2 max-w-[16ch] text-[13px] leading-[1.35] text-ink-2">
                  {point.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative col-span-5 min-h-[650px] max-[980px]:min-h-[540px] max-[640px]:min-h-[430px]">
          <div
            aria-hidden
            className="absolute top-[6%] right-[8%] size-20 bg-accent/90 max-[640px]:size-14"
          />
          <div
            aria-hidden
            className="absolute top-[20%] left-[0%] size-14 bg-accent/25 max-[640px]:size-10"
          />
          <div
            aria-hidden
            className="absolute right-[28%] bottom-[9%] size-24 border border-accent/55 bg-bg/70 max-[640px]:size-16"
          />
          <div
            aria-hidden
            className="absolute bottom-[26%] left-[12%] size-12 bg-accent/70 max-[640px]:size-9"
          />
          <div
            aria-hidden
            className="absolute -inset-x-10 top-12 bottom-0 opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 70% 28%, color-mix(in oklab, var(--accent) 42%, transparent), transparent 58%)',
            }}
          />
          <div className="absolute top-[8%] right-0 h-[80%] w-[88%] overflow-hidden border border-line bg-bg-2 max-[980px]:left-1/2 max-[980px]:right-auto max-[980px]:h-[82%] max-[980px]:w-[min(560px,92vw)] max-[980px]:-translate-x-1/2">
            <Image
              src={portrait}
              alt="Alec Hemenway, studio portrait"
              fill
              sizes="(max-width: 980px) 92vw, 520px"
              className="object-cover object-[50%_16%] opacity-80 saturate-[0.7] sepia-[0.24] contrast-[1.08]"
              priority
              placeholder="blur"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,color-mix(in_oklab,var(--accent)_36%,transparent),transparent_42%),linear-gradient(90deg,var(--color-bg)_0%,transparent_36%,color-mix(in_oklab,var(--accent)_24%,transparent)_100%)] mix-blend-screen"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,var(--color-bg)_100%)]"
            />
            <div
              aria-hidden
              className="absolute top-0 left-0 size-[18%] border-r border-b border-line bg-bg"
            />
            <div
              aria-hidden
              className="absolute top-0 right-[18%] size-[14%] border-x border-b border-line bg-bg"
            />
            <div
              aria-hidden
              className="absolute top-[22%] right-0 size-[18%] border-b border-l border-line bg-bg"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-[18%] size-[16%] border-t border-r border-line bg-bg"
            />
            <div
              aria-hidden
              className="absolute right-0 bottom-[16%] size-[20%] border-t border-l border-line bg-bg"
            />
            <div
              aria-hidden
              className="absolute top-[42%] left-0 size-[11%] border-y border-r border-line bg-accent/80"
            />
            <div
              aria-hidden
              className="absolute right-[20%] bottom-0 size-[14%] border-t border-x border-line bg-accent/35"
            />
          </div>
          <div className="absolute right-4 bottom-6 font-mono text-[12px] tracking-[0.08em] text-ink-2 uppercase max-[980px]:right-1/2 max-[980px]:translate-x-1/2">
            Alec Hemenway · Minneapolis
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8 border-t border-line pt-16 max-[880px]:grid-cols-1">
        <div className="col-span-3">
          <div className="sticky top-24 font-mono text-[12px] tracking-[0.14em] text-accent uppercase max-[880px]:static">
            Info
          </div>
        </div>
        <div className="col-span-7 col-start-5 max-w-[720px] max-[880px]:col-span-1 max-[880px]:col-start-auto">
          <Reveal>
            <p className="text-[17px] leading-[1.75] text-ink-2">
              I’ve spent the last seven years selling enterprise software, moving
              from SDR to Senior AE at or near 100% of quota every year. What
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
        </div>
      </div>

      <section className="mt-20 grid grid-cols-12 gap-8 border-y border-line py-10 max-[880px]:grid-cols-1">
        <div className="col-span-4">
          <h2 className="max-w-[11ch] text-[clamp(34px,4vw,58px)] leading-[1.02] font-extrabold tracking-[-0.035em]">
            What stays <Accent>true.</Accent>
          </h2>
        </div>
        <ul className="col-span-8 grid grid-cols-2 gap-x-8 max-[760px]:grid-cols-1">
          {principles.map((principle) => (
            <li
              key={principle.lead}
              className="border-b border-line py-5 text-[16px] leading-[1.6] text-ink-2"
            >
              <b className="mb-1 block font-semibold text-ink">
                {principle.lead}
              </b>
              {principle.body}
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto mt-14 max-w-[720px]">
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
