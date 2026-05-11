import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Alec Hemenway: GTM operator building AI-native sales and marketing systems.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
            {/* TODO: replace /src/images/portrait.jpg with real photo */}
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Enterprise AE who self-sources pipeline with AI.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&rsquo;m Alec. I&rsquo;ve spent the last six years selling
              enterprise SaaS — Jamf, Staffbase, and most recently Coram AI —
              and the last two of those years rebuilding my workflow around
              AI. At Coram I self-sourced $1.6M of pipeline in six months by
              wiring Claude into buyer-signal research and intent data. The
              part most reps still treat as cold outbound, I treat as a system
              problem.
            </p>
            <p>
              Before Coram, I closed $676K at Staffbase (#2 of 22 reps, 98%
              attainment) and ran a four-year quota streak at Jamf (SDR → AE →
              Sr AE), including Pinnacle Club in 2023 on 112% attainment.
              Carlson School of Management, B.S. in Marketing &amp;
              Information Systems.
            </p>
            <p>
              I don&rsquo;t just talk about AI in sales — I ship the
              infrastructure. Sixty-plus open-source Claude Code skills, a
              multi-tier memory system, custom MCPs, eval harnesses I run in
              production. The Projects page is the catalogue.
            </p>
            <p>
              Looking for the next high-stakes enterprise AE seat where the
              loop is fast and the team values builders. The{' '}
              <a
                href="/work-with-me"
                className="text-teal-500 hover:text-teal-600 dark:text-teal-400"
              >
                work-with-me page
              </a>{' '}
              has the details.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://www.linkedin.com/in/alec-hemenway/" icon={LinkedInIcon}>
              Connect on LinkedIn
            </SocialLink>
            <SocialLink
              href="https://github.com/alechemenway"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="mailto:hemenway.alec@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              hemenway.alec@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
