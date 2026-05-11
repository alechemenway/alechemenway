import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
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
            I&rsquo;m Alec. I build AI-native GTM systems and run them in real
            revenue motions.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              {/* TODO: replace with your real bio. Below is a starter draft — keep what fits, rewrite what doesn't. */}
              I&rsquo;m a GTM operator, not a heads-down engineer. My edge is
              that I can take an AI capability and wire it into a real sales,
              marketing, or operator workflow — and ship it the same week. Most
              &ldquo;AI for sales&rdquo; output I see is theater. I want to
              build the systems that actually move pipeline.
            </p>
            <p>
              Most recently at Coram AI, where I worked across GTM and ran
              AI-augmented workflows in production. Before that, [TODO: prior
              roles, in 2–3 sentences. Focus on outcomes you delivered, not
              titles you held.]
            </p>
            <p>
              I work in Claude Code daily — 60+ open-source skills published,
              an MCP-heavy stack, and a multi-tier memory system that keeps my
              tools coherent across months and projects. I publish what I
              build.
            </p>
            <p>
              Outside of GTM, I trade systematically (TAO subnet scanner,
              CANSLIM + VCP screeners, dividend pullback alerts) and care a lot
              about disciplined operators. If that sounds like the kind of
              person you want on your team, the work-with-me page is{' '}
              <a
                href="/work-with-me"
                className="text-teal-500 hover:text-teal-600 dark:text-teal-400"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://github.com/"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:alec.hemenway@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              alec.hemenway@gmail.com
            </SocialLink>
            {/* TODO: confirm all four social URLs above */}
          </ul>
        </div>
      </div>
    </Container>
  )
}
