import { type Metadata } from 'next'
import { AboutAlec } from '@/components/editorial/AboutAlec'
export const metadata: Metadata = {
  title: 'About',
  description:
    'Enterprise sales, AI implementation, and the decisions that connect a sale to a working workflow.',
}
export default function Page() {
  return <AboutAlec />
}
