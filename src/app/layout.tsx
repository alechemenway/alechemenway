import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s · Alec Hemenway',
    default: 'Alec Hemenway — GTM operator building AI-native sales systems',
  },
  description:
    'Alec Hemenway: GTM operator shipping AI-augmented sales, marketing, and operator workflows. 60+ open-source Claude Code skills, Apollo pipelines, eval harnesses, and more.',
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
