import { EditorialHeader } from './EditorialHeader'
import '@/styles/editorial.css'
export function EditorialFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="editorial">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <EditorialHeader />
      <main id="main">{children}</main>
    </div>
  )
}
