import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { AboutAlec } from '@/components/editorial/AboutAlec'
export const metadata: Metadata = {
  title: 'About',
  description:
    'Enterprise sales, AI implementation, and the decisions that connect a sale to a working workflow.',
}
export default function Page() {
  return (
    <ReadingPage backHref="/#about" backLabel="Back to the homepage">
      <AboutAlec />
    </ReadingPage>
  )
}
