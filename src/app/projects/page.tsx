import { type Metadata } from 'next'

import { Wrap } from '@/components/Wrap'
import { Eyebrow } from '@/components/Eyebrow'
import { Accent } from '@/components/Accent'
import { Reveal, RevealGroup } from '@/components/motion/Reveal'
import { ProjectCard, type Project } from '@/components/ProjectCard'
import { ClosingBand } from '@/components/ClosingBand'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A working catalogue of AI-native systems Alec Hemenway has shipped — prospecting skills, eval harnesses, memory systems, and outbound pipelines, each with receipts.',
}

const GITHUB = 'https://github.com/alechemenway'

const projects: Project[] = [
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
  },
  {
    title: 'Apollo prospecting skill',
    index: '02',
    description:
      'Plain-English ICP → 50 ranked, enriched leads in under five minutes. Cuts a half-day prospecting workflow to one coffee. Live demo accepts your own Anthropic + Apollo keys.',
    outcome: '4–6 hrs saved per ICP build',
    chips: ['Claude', 'Apollo API', 'Vercel Functions'],
    link: 'Open demo',
    href: GITHUB,
    badge: 'Demo',
  },
  {
    title: 'TAO subnet scanner',
    index: '03',
    description:
      'Cross-subnet concentration scoring + tier ranking for Bittensor positions. Flags structurally healthy subnets before momentum traders pile in.',
    outcome: '3 of 5 top subnets caught pre-runup',
    chips: ['Python', 'Bittensor SDK', 'Notion sync'],
    link: 'Read methodology',
    href: GITHUB,
    badge: 'Research',
  },
  {
    title: 'GTM skill library',
    index: '04',
    description:
      '60+ open-source Claude Code skills for sales, marketing, and operator workflows. Drop-in skillpack for any Claude stack. Published v2-generalized branch.',
    outcome: 'Public skill catalogue, free to install',
    chips: ['Claude Code', 'Bash', 'MDX'],
    link: 'View on GitHub',
    href: GITHUB,
    badge: 'Open source',
  },
  {
    title: 'Skill eval harness',
    index: '05',
    description:
      'Manual-eval-first framework for Claude Code skills. Tracks per-skill quality with delay + backoff for rate limits and structured grader output.',
    outcome: '58 tracked tasks, Phase 0 live',
    chips: ['Claude API', 'Skills API', 'Notion DB'],
    link: 'See approach',
    href: GITHUB,
    badge: 'Phase 0',
  },
  {
    title: 'Three-layer memory system',
    index: '06',
    description:
      'Local auto-memory + Notion AI Memory Vault + weekly archive. Personal infrastructure for keeping Claude useful across months and projects.',
    outcome: 'Survives every model + workspace migration',
    chips: ['Claude Code', 'Notion API', 'PowerShell'],
    link: 'Read writeup',
    href: GITHUB,
    badge: 'Infra',
  },
  {
    title: 'Land-the-screen outbound',
    index: '07',
    description:
      'Job-application-to-recruiter outreach pipeline. Daily auto-drafts post-application bumps from a Notion Applications Tracker.',
    outcome: '25+ tracked applications, automated follow-up',
    chips: ['Claude', 'Notion DB', 'Scheduled agents'],
    link: 'See pipeline',
    href: GITHUB,
    badge: 'Pipeline',
  },
]

export default function Projects() {
  return (
    <Wrap>
      <header className="max-w-[46ch] pt-24 pb-2 max-[880px]:pt-16">
        <Eyebrow>Projects</Eyebrow>
        <h1 className="text-[clamp(40px,5.4vw,76px)] leading-[1.0] font-extrabold tracking-[-0.04em]">
          AI-native systems I&rsquo;ve <Accent>shipped.</Accent>
        </h1>
        <Reveal>
          <p className="mt-6 max-w-[56ch] text-lg leading-[1.65] text-ink-2">
            A working catalogue of the AI workflows, skills, and operator tools
            I&rsquo;ve built and run in real revenue and personal-ops motions.
            Each one has{' '}
            <b className="font-semibold text-ink">receipts</b> — time saved,
            outcomes hit, or a live link to the artifact itself.
          </p>
        </Reveal>
      </header>

      <RevealGroup className="mt-12 grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[880px]:grid-cols-1">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} seed={i + 1} />
        ))}
      </RevealGroup>

      <ClosingBand
        heading={
          <>
            Want one of these <Accent>wired into</Accent> your stack?
          </>
        }
        paragraph="Most of these are open-source or live demos. The rest I'm happy to walk through. I reply to every real message within 48 hours."
        primary={{ label: 'Get in touch', arrow: '→', href: 'mailto:alec@hemenway.io' }}
        secondary={{ label: 'Browse GitHub', arrow: '↗', href: GITHUB }}
      />
    </Wrap>
  )
}
