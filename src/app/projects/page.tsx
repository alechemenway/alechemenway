import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

// TODO: Each project description is a starting draft based on real work.
// Edit copy, swap href to real demo/GitHub, and replace logos.
const projects = [
  {
    id: 'apollo',
    name: 'Apollo prospecting skill',
    description:
      'Plain-English ICP → 50 ranked, enriched leads in under 5 minutes. Cuts a half-day prospecting workflow to one coffee. Live demo accepts your own Anthropic + Apollo keys.',
    outcome: '4–6 hrs saved per ICP build',
    stack: ['Claude', 'Apollo API', 'Vercel Functions'],
    link: { href: '#', label: 'Open demo' },
  },
  {
    id: 'tao-scanner',
    name: 'TAO subnet scanner',
    description:
      'Cross-subnet concentration scoring + tier ranking for Bittensor positions. Flags structurally healthy subnets before momentum traders pile in.',
    outcome: '3 of 5 top-performing subnets caught pre-runup',
    stack: ['Python', 'Bittensor SDK', 'Notion sync'],
    link: { href: '#', label: 'Read methodology' },
  },
  {
    id: 'skill-library',
    name: 'GTM skill library (claude-skills)',
    description:
      '60+ open-source Claude Code skills for sales, marketing, and operator workflows. Drop-in skillpack for any Claude stack. Published v2-generalized branch.',
    outcome: 'Public skill catalogue, free to install',
    stack: ['Claude Code', 'Bash', 'MDX'],
    link: { href: 'https://github.com/', label: 'View on GitHub' },
  },
  {
    id: 'eval-harness',
    name: 'Skill eval harness',
    description:
      'Manual-eval-first framework for Claude Code skills. Tracks per-skill quality with delay + backoff for rate limits and structured grader output.',
    outcome: '58 tracked tasks, Phase 0 live',
    stack: ['Claude API', 'Anthropic Skills API', 'Notion DB'],
    link: { href: '#', label: 'See approach' },
  },
  {
    id: 'memory-system',
    name: 'Three-layer memory system',
    description:
      'Local auto-memory + Notion AI Memory Vault + weekly archive. Personal infrastructure for keeping Claude useful across months and projects.',
    outcome: 'Survives every model + workspace migration',
    stack: ['Claude Code', 'Notion API', 'PowerShell'],
    link: { href: '#', label: 'Read writeup' },
  },
  {
    id: 'land-the-screen',
    name: 'Land-the-screen outbound system',
    description:
      'Job-application-to-recruiter outreach pipeline. Daily auto-drafts post-application bumps from a Notion Applications Tracker.',
    outcome: '25+ tracked applications, automated follow-up',
    stack: ['Claude', 'Notion DB', 'Scheduled agents'],
    link: { href: '#', label: 'See pipeline' },
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI-native GTM systems, operator workflows, and open-source Claude Code skills.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="AI-native systems I've shipped."
      intro="A working catalogue of the AI workflows, skills, and operator tools I've built and run in real revenue and personal-ops motions. Each one has receipts — time saved, outcomes hit, or live links to the artifact itself."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.id} id={project.id}>
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-4 text-xs font-medium text-teal-600 dark:text-teal-400">
              {project.outcome}
            </p>
            <p className="relative z-10 mt-3 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </p>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <span>{project.link.label} →</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
