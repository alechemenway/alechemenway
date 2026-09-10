import { type Metadata } from 'next'
import { ReadingPage } from '@/components/editorial/ReadingPage'
import { WorkflowEssay } from '@/components/editorial/WorkflowEssay'
export const metadata: Metadata = {
  title: 'Understand the workflow before choosing the AI',
  description:
    'A draft essay on people, process, data flow, and deciding what to build or buy.',
  robots: { index: false, follow: false },
}
export default function Page() {
  return (
    <ReadingPage backHref="/#thinking" backLabel="Selected thinking">
      <WorkflowEssay />
    </ReadingPage>
  )
}
