import Link from 'next/link'
import { EditorialFrame } from '@/components/editorial/EditorialFrame'
export default function NotFound() {
  return (
    <EditorialFrame>
      <div className="reading wrap">
        <header className="reading-header">
          <h1>Page not found.</h1>
        </header>
        <Link className="text-link" href="/">
          Return to the homepage →
        </Link>
      </div>
    </EditorialFrame>
  )
}
