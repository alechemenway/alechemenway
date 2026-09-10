import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { RepCoachingCase } from '@/components/editorial/RepCoachingCase'
export const metadata: Metadata = {
  title: 'Rep Coaching / Deal Intelligence',
  description:
    'Implementation notes on deal summaries, meeting analysis, coaching, and forecasting around CRM context.',
}
export default function Page() {
  return (
    <ReadingPage backHref="/#work" backLabel="Selected work">
      <RepCoachingCase />
    </ReadingPage>
  )
}
