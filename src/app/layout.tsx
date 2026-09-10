import { type Metadata } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s · Alec Hemenway',
    default: 'Alec Hemenway · AI sales & implementation',
  },
  description:
    'Enterprise sales and AI implementation. The people, workflows, and acceptance criteria between a promising demo and a successful enterprise customer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-bg font-sans text-ink">
        <Providers>
          <div className="flex w-full">{children}</div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
