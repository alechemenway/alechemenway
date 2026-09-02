import { type Metadata } from 'next'
import Image from 'next/image'

import { Accent } from '@/components/Accent'
import { Button } from '@/components/Button'
import { Eyebrow } from '@/components/Eyebrow'
import { Wrap } from '@/components/Wrap'
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

const bodyCopy =
  'mt-[22px] text-[17px] leading-[1.82] text-ink-2 max-[760px]:text-[16px] max-[760px]:leading-[1.78]'

const marginNote =
  'mt-6 w-full font-mono text-[9px] leading-[1.65] tracking-[0.04em] text-ink-2 uppercase min-[1180px]:absolute min-[1180px]:top-[170px] min-[1180px]:mt-0 min-[1180px]:w-[150px]'

const receipt =
  'group mt-[30px] grid grid-cols-[auto_auto_1fr_auto] items-center gap-[11px] border-y border-line py-4 font-mono text-[10px] text-ink-2 uppercase transition-colors hover:border-accent max-[760px]:grid-cols-[6px_1fr_auto]'

export default function About() {
  return (
    <Wrap className="pb-20">
      <section className="pt-[110px] text-center max-[760px]:pt-[62px] max-[760px]:text-left">
        <Eyebrow className="mb-0 justify-center gap-[10px] text-[11px] tracking-[0.15em] max-[760px]:justify-start [&>span]:w-7">
          Field notes / About
        </Eyebrow>
        <h1 className="sr-only">About Alec Hemenway</h1>
        <p className="mx-auto mt-[34px] max-w-[720px] text-[21px] leading-[1.55] text-ink-2 max-[760px]:mt-[26px] max-[760px]:text-[18px]">
          Enterprise AE, AI GTM builder, and operator of the systems I use to
          source, qualify, and win pipeline.
        </p>
        <p className="mt-[34px] font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-ink-2 max-[760px]:mt-[26px]">
          <span className="max-[760px]:block max-[760px]:py-[7px]">
            The record —{' '}
            <b className="font-medium text-ink">$3M+ self-sourced pipeline</b>
          </span>
          <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
          <span className="max-[760px]:block max-[760px]:py-[7px]">
            <b className="font-medium text-ink">4 years</b> quota streak
          </span>
          <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
          <span className="max-[760px]:block max-[760px]:py-[7px]">
            <b className="font-medium text-ink">60+</b> Claude Code skills
          </span>
        </p>
      </section>

      <figure className="mt-[68px] max-[760px]:mt-[52px]">
        <div className="relative mx-auto aspect-[16/8.8] max-w-[1120px] overflow-hidden border border-line bg-surface max-[760px]:-mx-6 max-[760px]:aspect-[4/5] max-[760px]:w-[calc(100%+3rem)] max-[760px]:border-x-0">
          <Image
            src={portrait}
            alt="Alec Hemenway, studio portrait"
            fill
            sizes="(max-width: 760px) 100vw, 1120px"
            className="object-cover object-[50%_21%] opacity-[0.88] contrast-[1.06] saturate-[0.67] sepia-[0.2]"
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
        <figcaption className="mx-auto mt-[13px] flex max-w-[1120px] justify-between gap-5 font-mono text-[9px] leading-[1.5] tracking-[0.08em] text-ink-2 uppercase">
          <span>Alec Hemenway · Minneapolis</span>
          <span>(01) Studio portrait</span>
        </figcaption>
      </figure>

      <section
        data-field-note
        className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
      >
        <div aria-hidden className="mb-[30px] h-px w-[72px] bg-accent" />
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 01
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          The selling foundation.
        </h2>
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          Before the systems, there was the number—and the discipline to keep
          carrying it.
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
          I’ve spent the last seven years selling enterprise software, moving
          from SDR to Senior AE at or near 100% of quota every year. What
          changed in the last two is how I source: I stopped treating cold
          outbound as a volume problem and started treating it as a{' '}
          <strong className="font-semibold text-ink">system problem</strong>.
        </p>
        <p className={bodyCopy}>
          At Staffbase I ranked{' '}
          <strong className="font-semibold text-ink">
            #2 of 22 AEs at 97%
          </strong>{' '}
          of $690K quota, generating{' '}
          <strong className="font-semibold text-ink">
            $1.4M in self-sourced pipeline
          </strong>{' '}
          with 75% from net-new logos. I multi-threaded into CHRO, CIO, VP IT,
          Procurement, and CFO buying committees, displacing SharePoint and
          Workplace by Meta through competitive ROI positioning.
        </p>
        <a
          data-receipt
          data-provenance="Self-reported context"
          href="/Alec_Hemenway_Resume_2026_1pg_v4.pdf"
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
          4 years
        </div>
        <div className="mt-6 text-[17px] font-semibold">quota streak</div>
        <p className="mt-[18px] max-w-[54ch] text-[13px] leading-[1.7] text-ink-2">
          112% at Jamf with 100%+ the three prior years; #2 of 22 reps at 97%
          attainment at Staffbase; Pinnacle Club 2023 (top 5% globally).
        </p>
      </section>

      <section
        data-field-note
        className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
      >
        <div
          aria-hidden
          className="mx-auto mb-[30px] h-px w-[72px] bg-accent"
        />
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 02
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          Sourcing becomes a system.
        </h2>
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          The change was not more activity. It was a different operating model
          for finding and reaching the right accounts.
        </p>
        <aside className={`${marginNote} min-[1180px]:left-[calc(100%+62px)]`}>
          <b className="mb-[7px] block font-normal text-accent">[Method]</b>
          Buyer-signal research · intent data · account prioritization ·
          first-touch outbound.
        </aside>
        <p className={bodyCopy}>
          At Coram I self-sourced{' '}
          <strong className="font-semibold text-ink">
            $1.6M of pipeline in 7 months
          </strong>{' '}
          and closed{' '}
          <strong className="font-semibold text-ink">$102K net-new ARR</strong>{' '}
          by wiring Claude into every step that used to eat my week —
          buyer-signal research, intent data, account prioritization, and the
          first-touch outbound itself.
        </p>
        <p className={bodyCopy}>
          The result isn’t a prompt I copy-paste. It’s infrastructure: skills,
          MCPs, and eval harnesses I actually run in production against real
          accounts.
        </p>
        <a
          data-receipt
          data-provenance="Self-reported context"
          href="/Alec_Hemenway_Resume_2026_1pg_v4.pdf"
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
          $3M+
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
        <div
          aria-hidden
          className="mb-[30px] ml-auto h-px w-[72px] bg-accent"
        />
        <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
          Field note 03
        </div>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
          The system leaves artifacts.
        </h2>
        <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
          The AI claim is strongest where the work can be inspected rather than
          merely described.
        </p>
        <aside
          className={`${marginNote} min-[1180px]:right-[calc(100%+62px)] min-[1180px]:text-right`}
        >
          <b className="mb-[7px] block font-normal text-accent">[Artifact]</b>
          Open-source skills and evaluation infrastructure—not a count presented
          as customer adoption.
        </aside>
        <p className={bodyCopy}>
          The AI part isn’t theater. I’ve published{' '}
          <strong className="font-semibold text-ink">
            60+ open-source Claude Code skills
          </strong>
          , built a manual-eval-first harness to keep them honest, and run a
          three-layer memory system so the tooling compounds instead of
          resetting every month.
        </p>
        <p className={bodyCopy}>
          Every AI claim ships with a number, a live link, or open-source code
          you can read. I sell the category I build in — and I can talk to a CRO
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
          Published open-source work. The count describes artifacts, not
          customer adoption or commercial usage.
        </p>
      </section>

      <section className="mx-auto mt-[123px] max-w-[820px] max-[760px]:mt-[77px]">
        <h2 className="mb-[42px] text-center font-serif text-[clamp(48px,6vw,68px)] leading-none font-normal max-[760px]:text-left">
          What stays <Accent>true.</Accent>
        </h2>
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
          high-stakes enterprise AE seat — ideally at a company building or
          selling AI.
        </p>
      </aside>

      <section className="mx-auto max-w-[1040px] pt-[122px] pb-10 text-center max-[760px]:pt-20 max-[760px]:text-left">
        <h2 className="mx-auto max-w-[15ch] font-serif text-[clamp(56px,7.5vw,96px)] leading-[0.96] font-normal max-[760px]:mx-0 max-[760px]:text-[58px]">
          Think we’d <Accent>work well</Accent> together?
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-2 max-[760px]:mx-0">
          I reply to every real message within 48 hours. Tell me about the seat
          and the number.
        </p>
        <Button
          data-primary-action="true"
          href="/work-with-me"
          arrow="→"
          className="mt-[34px] max-[760px]:w-full max-[760px]:justify-center"
        >
          See what I’m looking for
        </Button>
        <a
          href="mailto:alec@hemenway.io"
          className="mx-auto mt-6 block w-max text-[13px] text-ink-2 underline decoration-line underline-offset-[5px] transition-colors hover:text-accent max-[760px]:mx-0"
        >
          Email me ↗
        </a>
      </section>
    </Wrap>
  )
}
