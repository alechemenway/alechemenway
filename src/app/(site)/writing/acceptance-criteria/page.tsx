import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { AcceptanceCriteriaEssay } from '@/components/editorial/AcceptanceCriteriaEssay'
export const metadata: Metadata = {
  title: 'The acceptance criteria are the product',
  description:
    'A draft essay on defining customer acceptance criteria during the sale.',
  robots: { index: false, follow: false },
}
export default function Page() {
  return (
    <ReadingPage backHref="/#thinking" backLabel="Selected thinking">
      <AcceptanceCriteriaEssay />
    </ReadingPage>
  )
}
