import { type Metadata } from 'next'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { SectionHead } from '@/components/SectionHead'
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
        body: '$1.6M generated at Coram in six months by wiring Claude into research, intent, and outbound.',
      },
      {
        lead: 'A four-year quota streak',
        body: 'Never missed a number from SDR through Senior AE at Jamf; #2 of 22 at Staffbase.',
      },
      {
        lead: 'Real AI infrastructure',
        body: '60+ open-source skills, custom MCPs, and eval harnesses I run in production — not slideware.',
      },
      {
        lead: 'Full-cycle enterprise motion',
        body: 'Comfortable from cold first-touch to multi-threaded close with CROs and engineers alike.',
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
      <header className="max-w-[42ch] pt-16 pb-2">
        <Eyebrow>Work with me</Eyebrow>
        <h1 className="font-serif text-[clamp(40px,5.4vw,76px)] leading-none tracking-[-0.01em]">
          The next seat I’m{' '}
          <em className="text-accent italic">looking for.</em>
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-[1.65] text-prose-2">
          I’m looking for a high-stakes enterprise AE role — ideally at a company
          building or selling AI, where self-sourced pipeline and a builder’s
          instinct are features, not extras.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
        {panels.map((panel) => (
          <div
            key={panel.title}
            className="rounded-[20px] border border-line bg-card px-9 py-[38px]"
          >
            <div className="mb-2 text-[12px] font-bold tracking-[0.12em] text-accent uppercase">
              {panel.label}
            </div>
            <h3 className="mb-5 font-serif text-[30px]">{panel.title}</h3>
            <ul>
              {panel.items.map((item) => (
                <li
                  key={item.lead}
                  className="border-b border-line py-4 text-[15.5px] leading-[1.6] text-prose last:border-b-0"
                >
                  <b className="mb-[2px] block text-[16px] font-semibold text-espresso">
                    {item.lead}
                  </b>
                  {item.body}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionHead>
        Am I a <em className="text-accent italic">fit?</em>
      </SectionHead>
      <div className="mt-6 border-t border-line">
        {fitRows.map((row) => (
          <div
            key={row.question}
            className="grid grid-cols-2 gap-[30px] border-b border-line py-[26px] max-[880px]:grid-cols-1 max-[880px]:gap-1.5"
          >
            <div className="font-serif text-[22px]">{row.question}</div>
            <div className="text-[15px] leading-[1.6] text-prose">
              <b className="font-semibold text-espresso">{row.verdict}</b>{' '}
              {row.body}
            </div>
          </div>
        ))}
      </div>

      <ClosingBand
        heading={
          <>
            Let’s talk about{' '}
            <em className="text-accent-soft italic">the number.</em>
          </>
        }
        paragraph="Tell me about the seat, the territory, and the target. I reply to every real message within 48 hours."
        primary={{
          label: 'Email me',
          arrow: '→',
          href: 'mailto:alec@hemenway.io',
        }}
        secondary={{
          label: 'Book 20 minutes',
          arrow: '↗',
          href: 'https://calendar.app.google/LRtfdRkHE6gBtwR67',
        }}
      />
    </Wrap>
  )
}
