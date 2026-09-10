import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { AcceptanceCriteriaEssay } from '@/components/editorial/AcceptanceCriteriaEssay'
export const metadata: Metadata = {
  title: 'The acceptance criteria are the product',
  description:
    'An essay on defining customer acceptance criteria during the sale.',
  robots: { index: true, follow: true },
}
export default function Page() {
  return (
    <ReadingPage backHref="/#thinking" backLabel="Selected thinking">
      <AcceptanceCriteriaEssay />
    </ReadingPage>
  )
}
