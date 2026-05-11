import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'What I&rsquo;m looking for in my next enterprise AE seat — and how to get in touch.',
}

export default function WorkWithMe() {
  return (
    <SimpleLayout
      title="The next seat I'm looking for."
      intro="Direct version: I'm an enterprise AE with an AI-native edge. I want a high-stakes seat at a company building or selling AI, where the loop is fast and the team values reps who build."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What I bring
          </h2>
          <ul className="mt-4 space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Self-sourced pipeline.
              </strong>{' '}
              $1.6M generated at Coram AI in six months by wiring Claude into
              buyer-signal research and multi-source intent data.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                A four-year quota streak.
              </strong>{' '}
              100%+ attainment at Jamf for four consecutive years across SDR,
              AE, and Senior AE seats. Pinnacle Club in 2023.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Top-of-leaderboard performance.
              </strong>{' '}
              $676K at Staffbase, ranked #2 of 22 reps, 75% net-new logos.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                AI infrastructure I actually use.
              </strong>{' '}
              60+ open-source Claude Code skills, custom MCPs, eval harnesses
              — not theater. The same systems behind my pipeline number.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What I&rsquo;m looking for
          </h2>
          <ul className="mt-4 space-y-3 text-base text-zinc-600 dark:text-zinc-400">
            <li>
              Enterprise AE seat at a company building or selling AI (or one
              that wants to lean into it)
            </li>
            <li>
              Small enough team that I can ship without committee, big enough
              that the territory compounds
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
            <Button href="mailto:hemenway.alec@gmail.com">Email me</Button>
            <Button
              href="https://calendar.app.google/" // TODO: paste real Google Calendar booking URL
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
