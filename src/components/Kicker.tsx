import clsx from 'clsx'

/** Mono uppercase amber section label. */
export function Kicker({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'font-mono text-[12px] tracking-[0.2em] text-accent uppercase',
        className,
      )}
    >
      {children}
    </div>
  )
}
