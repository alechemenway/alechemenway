import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { DailyOKCase } from '@/components/editorial/DailyOKCase'
export const metadata: Metadata = {
  title: 'DailyOK',
  description:
    'Implementation notes on voice check-ins, call summaries, and caregiver review.',
}
export default function Page() {
  return (
    <ReadingPage backHref="/#work" backLabel="Selected work">
      <DailyOKCase />
    </ReadingPage>
  )
}
