import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { RiaCase } from '@/components/editorial/RiaCase'
export const metadata: Metadata = {
  title: 'Meeting preparation, scoped with the owner',
  description:
    'An anonymized RIA engagement: acceptance criteria, a cited meeting brief, and a single-session preparation result.',
}
export default function Page() {
  return (
    <ReadingPage backHref="/#work" backLabel="Selected work">
      <RiaCase />
    </ReadingPage>
  )
}
