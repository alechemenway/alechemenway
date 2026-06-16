import Link from 'next/link'

/**
 * Premium `.sechead` — serif H2 (accent `<em>` supplied by the caller) with an
 * optional right-aligned "more" link.
 */
export function SectionHead({
  children,
  more,
}: {
  children: React.ReactNode
  more?: { label: string; href: string }
}) {
  return (
    <div className="flex items-baseline justify-between pt-18 pb-2 max-[880px]:flex-col max-[880px]:gap-3">
      <h2 className="font-serif text-[clamp(32px,4vw,46px)] tracking-[-0.01em]">
        {children}
      </h2>
      {more && (
        <Link
          href={more.href}
          className="text-[13px] font-semibold tracking-[0.06em] whitespace-nowrap text-soft uppercase transition-colors hover:text-accent"
        >
          {more.label}
        </Link>
      )}
    </div>
  )
}
