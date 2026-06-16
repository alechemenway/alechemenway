import Image from 'next/image'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { PremiumButton } from '@/components/PremiumButton'
import { SectionHead } from '@/components/SectionHead'
import { ProjectCard, type Project } from '@/components/ProjectCard'
import { ClosingBand } from '@/components/ClosingBand'
import portrait from '@/images/photos/image-2.jpg'

const featuredProjects: Project[] = [
  {
    title: 'Deal-Intelligence + Rep Coaching',
    index: '01',
    description:
      'Reads live pipeline to flag deal risk and next-best actions, then coaches reps in the flow of the deal.',
    outcome: 'Live now at repcoaching.io',
    chips: ['Deal intelligence', 'Rep coaching', 'Sales AI'],
    href: 'https://www.repcoaching.io/',
  },
  {
    title: 'Apollo prospecting skill',
    index: '02',
    description:
      'Plain-English ICP → 50 ranked, enriched leads in under five minutes. Cuts a half-day workflow to one coffee.',
    outcome: '4–6 hrs saved per ICP build',
    chips: ['Claude', 'Apollo API', 'Vercel Functions'],
    href: '/projects',
  },
  {
    title: 'GTM skill library',
    index: '03',
    description:
      '60+ open-source Claude Code skills for sales, marketing, and operator workflows. Drop-in for any Claude stack.',
    outcome: 'Public catalogue, free to install',
    chips: ['Claude Code', 'Bash', 'MDX'],
    href: '/projects',
  },
  {
    title: 'TAO subnet scanner',
    index: '04',
    description:
      'Cross-subnet concentration scoring + tier ranking for Bittensor positions. Flags entries before they run.',
    outcome: '3 of 5 top subnets caught pre-runup',
    chips: ['Python', 'Bittensor SDK', 'Notion sync'],
    href: '/projects',
  },
  {
    title: 'Skill eval harness',
    index: '05',
    description:
      'Manual-eval-first framework tracking per-skill quality with backoff for rate limits and structured grading.',
    outcome: '58 tracked tasks, Phase 0 live',
    chips: ['Claude API', 'Skills API', 'Notion DB'],
    href: '/projects',
  },
]

const metrics = [
  { main: '$1.6', unit: 'M', label: 'Self-sourced pipeline at Coram in 6 months' },
  { main: '#2', unit: '/22', label: 'Ranked rep at Staffbase · 98% attainment' },
  { main: '4', unit: 'yr', label: 'Consecutive quota streak at Jamf' },
  { main: '60', unit: '+', label: 'Open-source Claude Code skills' },
]

const roles = [
  {
    years: '2025 — 2026',
    company: 'Coram AI',
    title: 'Enterprise Account Executive',
  },
  {
    years: '2024 — 2025',
    company: 'Staffbase',
    title: 'Enterprise Account Executive · Top-2 of 22',
  },
  {
    years: '2019 — 2024',
    company: 'Jamf',
    title: 'SDR → AE → Sr AE · Four-year quota streak',
  },
]

export default function Home() {
  return (
    <>
      <Wrap>
        <section className="grid grid-cols-[1.15fr_0.85fr] items-center gap-[60px] pt-[70px] pb-16 max-[880px]:grid-cols-1">
          <div>
            <Eyebrow>Enterprise AE · AI-native</Eyebrow>
            <h1 className="font-serif text-[clamp(46px,6.6vw,90px)] leading-none tracking-[-0.01em]">
              I sell enterprise software — and build the{' '}
              <em className="text-accent italic">AI</em> that sells it.
            </h1>
            <p className="mt-7 max-w-[42ch] text-lg leading-[1.65] text-prose-2">
              I’m Alec. I self-sourced{' '}
              <b className="font-semibold text-espresso">$1.6M of pipeline</b> at
              Coram in six months by wiring Claude into buyer-signal research,
              intent data, and outbound. Four-year quota streak at Jamf. The AI
              part isn’t theater.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[14px]">
              <PremiumButton href="/work-with-me" variant="solid" arrow="→">
                Work with me
              </PremiumButton>
              <PremiumButton
                href="/alechemenway_resume2026.pdf"
                variant="ghost"
                arrow="↓"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download résumé
              </PremiumButton>
            </div>
            <div className="mt-[30px] flex gap-5 text-[13px] font-semibold tracking-[0.04em] text-soft">
              <a
                href="https://github.com/alechemenway"
                className="transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/alec-hemenway/"
                className="transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="relative justify-self-center max-[880px]:order-first max-[880px]:mb-5">
            <div className="relative aspect-[4/5] w-[340px] max-w-[42vw] rotate-3 overflow-hidden rounded-[18px] border-[6px] border-card shadow-portrait">
              <Image
                src={portrait}
                alt="Alec Hemenway"
                fill
                sizes="340px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-[-18px] left-[-26px] -rotate-2 rounded-[14px] border border-line bg-card px-[18px] py-[14px] shadow-tagchip">
              <div className="font-serif text-[30px] leading-none text-accent">
                $1.6M
              </div>
              <div className="mt-[5px] text-[11.5px] font-semibold tracking-[0.05em] text-soft uppercase">
                Pipeline · 6 months
              </div>
            </div>
          </div>
        </section>
      </Wrap>

      {/* Metric band — full bleed */}
      <div className="grid grid-cols-4 border-y border-line [&>div:last-child]:border-r-0 [&>div]:border-r [&>div]:border-line max-[880px]:grid-cols-2 max-[880px]:[&>div:nth-child(2)]:border-r-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-[26px] py-[34px]">
            <div className="font-serif text-[52px] leading-none tracking-[-0.01em]">
              {metric.main}
              <span className="text-accent">{metric.unit}</span>
            </div>
            <div className="mt-3 max-w-[22ch] text-[13.5px] leading-[1.5] text-soft">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <Wrap>
        <SectionHead more={{ label: 'All projects →', href: '/projects' }}>
          AI systems I’ve <em className="text-accent italic">shipped.</em>
        </SectionHead>
        <div className="mt-8 grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <SectionHead
          more={{
            label: 'Download résumé →',
            href: '/alechemenway_resume2026.pdf',
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        >
          Where I’ve <em className="text-accent italic">sold.</em>
        </SectionHead>
        <div className="mt-9 border-t border-line">
          {roles.map((role) => (
            <div
              key={role.company}
              className="grid grid-cols-[140px_1fr_auto] items-center gap-6 border-b border-line px-[6px] py-[26px] max-[880px]:grid-cols-[1fr_auto]"
            >
              <span className="text-[13px] font-semibold tracking-[0.06em] text-soft max-[880px]:col-span-2">
                {role.years}
              </span>
              <div>
                <div className="font-serif text-[26px]">{role.company}</div>
                <div className="mt-0.5 text-sm text-soft">{role.title}</div>
              </div>
              <span className="h-[9px] w-[9px] justify-self-end rounded-full bg-accent" />
            </div>
          ))}
        </div>

        <ClosingBand
          heading={
            <>
              Let’s talk about the{' '}
              <em className="text-accent-soft italic">next seat.</em>
            </>
          }
          paragraph="Hiring an enterprise AE who self-sources pipeline and builds the AI behind it? I reply to every real message within 48 hours."
          primary={{
            label: 'Get in touch',
            arrow: '→',
            href: 'mailto:alec@hemenway.io',
          }}
          secondary={{
            label: 'Connect on LinkedIn',
            arrow: '↗',
            href: 'https://www.linkedin.com/in/alec-hemenway/',
          }}
        />
      </Wrap>
    </>
  )
}
