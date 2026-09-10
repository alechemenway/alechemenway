import { EditorialFrame } from '@/components/editorial/EditorialFrame'
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EditorialFrame>{children}</EditorialFrame>
}
