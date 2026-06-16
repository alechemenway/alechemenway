import clsx from 'clsx'

/**
 * Premium `.wrap` container — max-width 1180px, 48px gutters (24px ≤880px).
 */
export function Wrap({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-[1180px] px-12 max-[880px]:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
