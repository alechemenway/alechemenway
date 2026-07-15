import { type Metadata } from 'next'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { Accent } from '@/components/Accent'
import { SectionHead } from '@/components/SectionHead'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { ClosingBand } from '@/components/ClosingBand'

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'The next seat Alec Hemenway is looking for — a high-stakes enterprise AE role at an AI-native company where self-sourced pipeline and a builder’s instinct are features, not extras.',
}

const panels = [
  {
    label: 'What I bring',
    title: 'The operator',
    items: [
      {
        lead: 'Self-sourced pipeline',
        body: '$3M+ generated across my last two roles by wiring Claude into research, intent, and outbound. $1.6M at Coram in 7 months alone.',
      },
      {
        lead: 'A four-year quota streak',
        body: 'Never missed a number from SDR through Senior AE at Jamf; #2 of 22 at 97% attainment at Staffbase; Pinnacle Club 2023 (top 5% globally).',
      },
      {
        lead: 'Real AI infrastructure',
        body: '60+ open-source skills, custom MCPs, and eval harnesses I run in production — not slideware. Live product at repcoaching.io.',
      },
      {
        lead: 'Full-cycle enterprise motion',
        body: 'Comfortable from cold first-touch to multi-threaded close with CROs and engineers alike. Displaced SharePoint, Workplace by Meta, and Microsoft through competitive positioning.',
      },
    ],
  },
  {
    label: 'What I’m looking for',
    title: 'The seat',
    items: [
      {
        lead: 'AI-native company',
        body: 'Building or selling AI, where my tooling edge compounds instead of being a novelty.',
      },
      {
        lead: 'Enterprise deal sizes',
        body: 'Complex, multi-stakeholder cycles where strategy beats sheer activity volume.',
      },
      {
        lead: 'A team that ships',
        body: 'Short distance between an idea, a test, and a change in the field motion.',
      },
      {
        lead: 'Ownership of the number',
        body: 'Trust me with a territory and a target, and let me build the system to hit it.',
      },
    ],
  },
]

const fitRows = [
  {
    question: 'You’re hiring AE #1–10',
    verdict: 'Yes.',
    body: 'I self-source pipeline and build the playbook and tooling as I go — exactly what early enterprise motions need.',
  },
  {
    question: 'You sell into technical buyers',
    verdict: 'Yes.',
    body: 'I can talk product with an engineer and ROI with a CFO in the same call, and I build in the category I’d be selling.',
  },
  {
    question: 'You want pure outbound volume',
    verdict: 'Let’s talk.',
    body: 'I treat outbound as a system, not a dialing contest — the receipts come from leverage, not hours.',
  },
]

export default function WorkWithMe() {
  return (
    <Wrap>
      <header className="max-w-[46ch] pt-24 pb-2 max-[880px]:pt-16">
        <Eyebrow>Work with me</Eyebrow>
        <h1 className="text-[clamp(40px,5.4vw,76px)] leading-[1.0] font-extrabold tracking-[-0.04em]">
          The next seat I’m <Accent>looking for.</Accent>
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-[1.65] text-ink-2">
          I’m looking for a high-stakes senior enterprise AE role — ideally at a
          company building or selling AI, where self-sourced pipeline and a builder’s
          instinct are features, not extras. Remote or Minneapolis-based.
        </p>
      </header>

      <RevealGroup className="mt-12 grid auto-rows-fr grid-cols-2 items-stretch gap-6 max-[880px]:grid-cols-1">
        {panels.map((panel) => (
          <div key={panel.title} className="h-full border border-line bg-surface px-9 py-10">
            <div className="mb-2 font-mono text-[12px] tracking-[0.12em] text-accent uppercase">
              {panel.label}
            </div>
            <h3 className="mb-5 text-[28px] font-bold tracking-[-0.02em]">
              {panel.title}
            </h3>
            <ul>
              {panel.items.map((item) => (
                <li
                  key={item.lead}
                  className="border-b border-line py-4 text-[15.5px] leading-[1.6] text-ink-2 last:border-b-0"
                >
                  <b className="mb-0.5 block text-[16px] font-semibold text-ink">
                    {item.lead}
                  </b>
                  {item.body}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </RevealGroup>

      <section className="mt-20">
        <Reveal>
          <SectionHead kicker="The fit">
            Am I a <Accent>fit?</Accent>
          </SectionHead>
        </Reveal>
        <RevealGroup className="border-t border-line">
          {fitRows.map((row) => (
            <div
              key={row.question}
              className="grid grid-cols-2 gap-8 border-b border-line py-6 max-[880px]:grid-cols-1 max-[880px]:gap-1.5"
            >
              <div className="text-[22px] font-bold tracking-[-0.02em]">
                {row.question}
              </div>
              <div className="text-[15px] leading-[1.6] text-ink-2">
                <b className="font-semibold text-accent">{row.verdict}</b>{' '}
                {row.body}
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      <ClosingBand
        heading={
          <>
            Let’s talk about <Accent>the number.</Accent>
          </>
        }
        paragraph="Tell me about the seat, the territory, and the target. I reply to every real message within 48 hours."
        primary={{ label: 'Email me', arrow: '→', href: 'mailto:alec@hemenway.io' }}
        secondary={{
          label: 'Book 20 minutes',
          arrow: '↗',
          href: 'https://calendar.app.google/LRtfdRkHE6gBtwR67',
        }}
      />
    </Wrap>
  )
}
