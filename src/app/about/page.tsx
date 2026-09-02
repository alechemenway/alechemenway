import { type Metadata } from 'next'

import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Alec Hemenway — enterprise SaaS Account Executive who self-sources pipeline with AI. seven years selling, a four-year quota streak, and 60+ open-source Claude Code skills.',
}

export default function About() {
  return <AboutContent />
}
