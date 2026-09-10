import { Layout } from '@/components/Layout'
export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
