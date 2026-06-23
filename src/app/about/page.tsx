import { type Metadata } from 'next'
import Image from 'next/image'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { ClosingBand } from '@/components/ClosingBand'
import studioImage11 from '@/images/photos/studio-image-11.png'

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
  {
    label: 'Download résumé ↓',
    href: '/alechemenway_resume2026.pdf',
    newTab: true,
  },
]

export default function About() {
  return (
    <Wrap>
      <section className="grid grid-cols-[0.92fr_1.08fr] items-start gap-16 pt-[60px] pb-5 max-[880px]:grid-cols-1">
        <div className="sticky top-[110px] max-[880px]:static">
          <div className="aspect-[4/5] -rotate-3 overflow-hidden rounded-[20px] border-[7px] border-card shadow-figure max-[880px]:rotate-0">
            <Image
              src={studioImage11}
              alt="Alec Hemenway, studio portrait"
              className="h-full w-full object-cover"
              sizes="(max-width: 880px) 100vw, 460px"
              priority
            />
          </div>
          <div className="mt-[22px] -rotate-3 text-center text-[13px] text-soft max-[880px]:rotate-0">
            <b className="block font-serif text-[17px] font-normal text-espresso">
              Alec Hemenway
            </b>
            Minneapolis, MN · Enterprise AE
          </div>
        </div>

        <div>
          <Eyebrow>About</Eyebrow>
          <h1 className="mb-7 font-serif text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.01em]">
            I sell enterprise SaaS — and{' '}
            <em className="text-accent italic">self-source</em> my own pipeline
            with AI.
          </h1>

          <p className="mb-[22px] text-[17px] leading-[1.75] text-prose">
            I’ve spent the last six years selling enterprise software, moving
            from SDR to Senior AE and never missing a number along the way. What
            changed in the last two is how I source: I stopped treating cold
            outbound as a volume problem and started treating it as a{' '}
            <b className="font-semibold text-espresso">system problem</b>.
          </p>
          <p className="mb-[22px] text-[17px] leading-[1.75] text-prose">
            At Coram I self-sourced{' '}
            <span className="font-semibold text-accent underline decoration-accent-soft">
              $1.6M of pipeline in 7 months
            </span>{' '}
            and closed{' '}
            <b className="font-semibold text-espresso">$102K net-new ARR</b> by
            wiring Claude into every step that used to eat my week —
            buyer-signal research, intent data, account prioritization, and the
            first-touch outbound itself. The result isn’t a prompt I copy-paste.
            It’s infrastructure: skills, MCPs, and eval harnesses I actually run
            in production against real accounts.
          </p>
          <p className="mb-[22px] text-[17px] leading-[1.75] text-prose">
            At Staffbase I ranked{' '}
            <b className="font-semibold text-espresso">#2 of 22 AEs at 97%</b> of
            $690K quota, generating{' '}
            <span className="font-semibold text-accent underline decoration-accent-soft">
              $1.4M in self-sourced pipeline
            </span>{' '}
            with 75% from net-new logos. I multi-threaded into CHRO, CIO, VP IT,
            Procurement, and CFO buying committees, displacing SharePoint and
            Workplace by Meta through competitive ROI positioning.
          </p>
          <p className="mb-[22px] text-[17px] leading-[1.75] text-prose">
            The AI part isn’t theater. I’ve published{' '}
            <b className="font-semibold text-espresso">
              60+ open-source Claude Code skills
            </b>
            , built a manual-eval-first harness to keep them honest, and run a
            three-layer memory system so the tooling compounds instead of
            resetting every month. Every AI claim ships with a number, a live
            link, or open-source code you can read. I sell the category I build
            in — and I can talk to a CRO and an engineer in the same meeting.
          </p>

          <h2 className="mt-11 mb-2 font-serif text-[30px]">
            What stays true in every seat
          </h2>
          <ul className="mt-2 mb-[22px]">
            {principles.map((principle) => (
              <li
                key={principle.lead}
                className="grid grid-cols-[auto_1fr] gap-[14px] border-b border-line py-3 text-[16px] leading-[1.6] text-prose"
              >
                <span className="mt-[9px] h-[7px] w-[7px] rounded-full bg-accent" />
                <span>
                  <b className="font-semibold text-espresso">
                    {principle.lead}
                  </b>{' '}
                  {principle.body}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-[22px] text-[17px] leading-[1.75] text-prose">
            Outside the pipeline you’ll find me on a golf course, on a trail
            somewhere, or shipping the next skill. I’m looking for the next
            high-stakes enterprise AE seat — ideally at a company building or
            selling AI.
          </p>

          <div className="mt-[30px] flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.newTab
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-[9px] rounded-full border border-line bg-card px-[18px] py-[10px] text-sm font-semibold transition-colors hover:border-espresso hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand
        heading={
          <>
            Think we’d <em className="text-accent-soft italic">work well</em>{' '}
            together?
          </>
        }
        paragraph="I reply to every real message within 48 hours. Tell me about the seat and the number."
        primary={{
          label: 'See what I’m looking for',
          arrow: '→',
          href: '/work-with-me',
        }}
        secondary={{
          label: 'Get in touch',
          arrow: '↗',
          href: 'mailto:alec@hemenway.io',
        }}
      />
    </Wrap>
  )
}
