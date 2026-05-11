import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
