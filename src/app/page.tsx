import { Hero } from '@/components/home/Hero'
import { Wrap } from '@/components/Wrap'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { SectionHead } from '@/components/SectionHead'
import { Accent } from '@/components/Accent'
import { ProjectCard, type Project } from '@/components/ProjectCard'
import { ClosingBand } from '@/components/ClosingBand'

const featuredProjects: Project[] = [
  {
    title: 'Deal-Intelligence + Rep Coaching',
    index: '01',
    description:
      'A live product that reads your pipeline to flag deal risk and next-best actions, then coaches reps in the flow of the deal — the same AI-native playbook as the rest of this catalogue, shipped as something you can use today.',
    outcome: 'Live now at repcoaching.io',
    chips: ['Deal intelligence', 'Rep coaching', 'Sales AI'],
    link: 'Visit Rep Coaching',
    href: 'https://www.repcoaching.io/',
    badge: 'Live',
    image: {
      src: '/repcoach-card.png',
      alt: 'RepCoach product screenshot',
    },
  },
  {
    title: 'Apollo prospecting skill',
    index: '02',
    description:
      'Plain-English ICP → 50 ranked, enriched leads in under five minutes. Cuts a half-day prospecting workflow to one coffee. Live demo accepts your own Anthropic + Apollo keys.',
    outcome: '4–6 hrs saved per ICP build',
    chips: ['Claude', 'Apollo API', 'Vercel Functions'],
    link: 'Open demo',
    href: 'https://github.com/alechemenway',
    badge: 'Demo',
  },
  {
    title: 'GTM skill library',
    index: '03',
    description:
      '60+ open-source Claude Code skills for sales, marketing, and operator workflows. Drop-in skillpack for any Claude stack. Published v2-generalized branch.',
    outcome: 'Public skill catalogue, free to install',
    chips: ['Claude Code', 'Bash', 'MDX'],
    link: 'View on GitHub',
    href: 'https://github.com/alechemenway',
    badge: 'Open source',
  },
  {
    title: 'AI ROI Teardown',
    index: '04',
    description:
      'Turns an AI use case into the teardown a buyer actually needs — token and infra cost model, accuracy bar, failure-mode taxonomy, build-vs-buy math. The bridge between what engineers ship and what a CFO will sign.',
    outcome: 'Built as buyer + interview artifacts',
    chips: ['Claude', 'Cost modeling', 'Eval design'],
    link: 'Read a teardown',
    href: '#',
    cover: 'teardown',
    badge: 'FRAMEWORK',
  },
]

const metrics = [
  {
    main: '$3',
    unit: 'M',
    label: 'Self-sourced pipeline across my last two roles',
  },
  {
    main: '112',
    unit: '%',
    label: 'Quota at Jamf · Pinnacle Club · top 5% globally',
  },
  { main: '#2', unit: '/22', label: '97% of $690K quota at Staffbase' },
  {
    main: '60',
    unit: '+',
    label: 'Open-source AI sales skills, shipped and public',
  },
]

const roles = [
  {
    years: 'Oct 2025 – May 2026',
    company: 'Coram AI',
    title: 'Enterprise Account Executive',
    metric: '$1.6M self-sourced pipeline in 7 months · $102K net-new ARR closed',
  },
  {
    years: 'Jul 2024 – Sep 2025',
    company: 'Staffbase',
    title: 'Enterprise Account Executive · Top-2 of 22',
    metric: '97% of $690K quota',
  },
  {
    years: 'Jan 2023 – Jun 2024',
    company: 'Jamf',
    title: 'Senior Account Executive',
    metric: '112% quota · Pinnacle Club · top 5% globally',
  },
  {
    years: 'Jul 2020 – Dec 2022',
    company: 'Jamf',
    title: 'Account Executive (Mid-Market)',
    metric: '#3 of ~30 AEs · 100%+ both years',
  },
  {
    years: 'Sep 2019 – Jun 2020',
    company: 'Jamf',
    title: 'Sales Development Representative',
    metric: '125% of quota · promoted in under 12 months',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <Reveal className="my-16 border-y border-line bg-bg-2 max-[880px]:my-10">
        <Wrap>
          <div className="grid auto-rows-fr grid-cols-4 max-[880px]:grid-cols-2 [&>div]:border-r [&>div]:border-line [&>div:last-child]:border-r-0 max-[880px]:[&>div:nth-child(2)]:border-r-0">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex min-h-[188px] flex-col items-center justify-center px-7 py-10 text-center max-[880px]:min-h-[168px] max-[880px]:px-5"
              >
                <div className="font-mono text-[clamp(32px,4vw,52px)] leading-none font-extrabold tracking-[-0.03em]">
                  {m.main}
                  <span className="text-accent">{m.unit}</span>
                </div>
                <div className="mt-3 max-w-[23ch] text-[13px] leading-[1.45] text-ink-2">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Reveal>

      <Wrap>
        <section className="pt-4 pb-24 max-[880px]:pb-16">
          <Reveal>
            <SectionHead
              kicker="The receipts"
              more={{
                label: 'Download résumé →',
                href: '/Alec_Hemenway_Ramp_MM_AE_1pg.pdf',
                target: '_blank',
                rel: 'noopener noreferrer',
              }}
            >
              Where I&rsquo;ve <Accent>sold.</Accent>
            </SectionHead>
          </Reveal>
          <RevealGroup className="border-t border-line">
            {roles.map((role) => (
              <div
                key={role.years}
                className="grid grid-cols-[180px_1fr_auto] items-center gap-6 border-b border-line py-6 transition-transform duration-300 hover:translate-x-1.5 max-[880px]:grid-cols-1 max-[880px]:gap-1.5"
              >
                <span className="font-mono text-[12px] text-ink-2">
                  {role.years}
                </span>
                <div>
                  <div className="text-[22px] font-bold tracking-[-0.02em]">
                    {role.company}
                  </div>
                  <div className="mt-0.5 text-sm text-ink-2">{role.title}</div>
                </div>
                <span className="max-w-[26ch] justify-self-end text-right text-[13px] font-semibold text-accent max-[880px]:justify-self-start max-[880px]:text-left">
                  {role.metric}
                </span>
              </div>
            ))}
          </RevealGroup>
        </section>

        <section className="pb-24 max-[880px]:pb-16">
          <Reveal>
            <SectionHead
              kicker="Selected work"
              more={{ label: 'All projects →', href: '/projects' }}
            >
              AI systems I&rsquo;ve <Accent>shipped.</Accent>
            </SectionHead>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} seed={i + 1} />
            ))}
          </RevealGroup>
        </section>

        <ClosingBand
          heading={
            <>
              Let&rsquo;s talk about the <Accent>next seat.</Accent>
            </>
          }
          paragraph="I'm looking for a high-stakes role where self-sourced pipeline and a builder's instinct are features, not extras — ideally at a company building or selling AI."
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
