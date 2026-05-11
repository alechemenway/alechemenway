import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'What I&rsquo;m looking for in my next role + how to get in touch.',
}

export default function WorkWithMe() {
  return (
    <SimpleLayout
      title="The next seat I'm looking for."
      intro="Direct version: I'm a GTM operator who ships AI-native workflows. I want a high-bar AI-GTM seat where the loop is fast, the bar is real, and the team is small enough that I can ship without asking permission."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What I do
          </h2>
          <ul className="mt-4 space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Build AI-native GTM systems
              </strong>{' '}
              — Apollo pipelines, outbound personalization at scale, eval
              harnesses, custom skills for every step of the funnel.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Run them in production
              </strong>{' '}
              — not just demos. The workflows above are tied to real revenue
              motion and operator outcomes.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Publish what I build
              </strong>{' '}
              — 60+ open-source Claude Code skills, MCP integrations, and
              operator infrastructure others can install.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What I&rsquo;m looking for
          </h2>
          <ul className="mt-4 space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li>
              AI-GTM, AI-applied, or operator role at a company building or
              using AI at the core
            </li>
            <li>
              Small enough team that I can ship without committee, big enough
              that the work compounds
            </li>
            <li>Remote-first or West-coast time-zone friendly (I&rsquo;m PT)</li>
            <li>High-trust operator culture — bias to action, real receipts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Talk to me
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Best path: short email with what you&rsquo;re hiring for, what
            stage you&rsquo;re at, and the AI bet behind it. I reply to every
            real one within 48 hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="mailto:alec.hemenway@gmail.com">
              Email me
            </Button>
            <Button
              href="https://cal.com/" // TODO: real calendar link
              variant="secondary"
            >
              Book 20 min
            </Button>
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}
