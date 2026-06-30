import Link from 'next/link'

import { Kicker } from '@/components/Kicker'

/**
 * Section header — optional mono kicker + bold Inter H2 (caller supplies an
 * `<Accent>`/`<em>` for the serif-italic amber word) + optional "more" link.
 */
export function SectionHead({
  kicker,
  children,
  more,
}: {
  kicker?: string
  children: React.ReactNode
  more?: { label: string; href: string; target?: string; rel?: string }
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 max-[880px]:flex-col max-[880px]:items-start max-[880px]:gap-3">
      <div>
        {kicker && <Kicker className="mb-4">{kicker}</Kicker>}
        <h2 className="text-[clamp(30px,4.4vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          {children}
        </h2>
      </div>
      {more && (
        <Link
          href={more.href}
          target={more.target}
          rel={more.rel}
          className="font-mono text-[12.5px] whitespace-nowrap text-ink-2 transition-colors hover:text-accent"
        >
          {more.label}
        </Link>
      )}
    </div>
  )
}
