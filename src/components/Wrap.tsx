import clsx from 'clsx'

/**
 * Site container — max-width 1200px, 32px gutters (24px ≤880px).
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
        'mx-auto w-full max-w-[1200px] px-8 max-[880px]:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
