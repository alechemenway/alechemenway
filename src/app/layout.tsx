import { type Metadata } from 'next'
import { Hanken_Grotesk, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s · Alec Hemenway',
    default: 'Alec Hemenway — Enterprise AE with an AI-native edge',
  },
  description:
    'Enterprise Account Executive with a four-year quota streak and an AI-native edge. Self-sourced $1.6M of pipeline at Coram AI using Claude-powered buyer-signal research. 60+ open-source Claude Code skills.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${hanken.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-cream font-sans text-espresso">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
