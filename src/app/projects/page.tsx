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
    cover: 'dashboard',
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
    cover: 'leads',
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
    href: GITHUB,
    cover: 'skills',
    badge: 'Open source',
  },
  {
    title: 'DailyOK',
    index: '04',
    description:
      'Daily AI voice calls that check in on seniors and score eight dimensions of cognitive and emotional health from natural conversation — surfacing decline early for family and care teams. Caregiver dashboard, SMS alerts, HIPAA-grade data handling.',
    outcome: 'HIPAA-grade voice pipeline, pilot-ready',
    chips: ['Voice AI', 'Twilio', 'HIPAA'],
    link: 'Read writeup',
    href: 'https://github.com/alechemenway/dailyok-dashboard',
    cover: 'voice',
    badge: 'PHASE 0',
  },
  {
    title: 'AI ROI Teardown',
    index: '05',
    description:
      'Turns an AI use case into the teardown a buyer actually needs — token and infra cost model, accuracy bar, failure-mode taxonomy, build-vs-buy math. The bridge between what engineers ship and what a CFO will sign.',
    outcome: 'Built as buyer + interview artifacts',
    chips: ['Claude', 'Cost modeling', 'Eval design'],
    link: 'Read a teardown',
    href: '#', // TODO: link
    cover: 'teardown',
    badge: 'FRAMEWORK',
  },
  {
    title: 'LLM Council',
    index: '06',
    description:
      "Routes a decision to five independent AI advisors, has them anonymously critique each other, then synthesizes a weighted verdict. Catches the blind spots a single model talks itself into. Modeled on Karpathy's LLM Council.",
    outcome: '5 models, anonymous peer review',
    chips: ['Claude', 'Multi-model', 'Peer review'],
    link: 'See the method',
    href: '#', // TODO: link
    cover: 'council',
    badge: 'FRAMEWORK',
  },
  {
    title: 'Inbox Copilot',
    index: '07',
    description:
      'Reads important-unread mail, pulls deal and CRM context, and drafts replies matched to sender type — then learns from which drafts I send, edit, or kill. Drafts only; nothing leaves without me.',
    outcome: 'Learns from every edit',
    chips: ['Claude', 'Gmail API', 'Learning loop'],
    link: 'Read the writeup',
    href: '#', // TODO: link
    cover: 'inbox',
    badge: 'AUTOMATION',
  },
  {
    title: 'Maintainer Orchestrator',
    index: '08',
    description:
      'A control-plane agent that triages multi-repo work, hands implementation to worker subagents, and brings back decision-ready PRs. Coordination and execution on separate planes — a real multi-agent system, not one long prompt pretending to be one.',
    outcome: 'Control plane + worker subagents',
    chips: ['Claude Code', 'Subagents', 'GitHub'],
    link: 'See the architecture',
    href: '#', // TODO: link
    cover: 'orchestrator',
    badge: 'AGENTS',
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
