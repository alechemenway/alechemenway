import clsx from 'clsx'

/**
 * Premium `.eyebrow` — uppercase accent label preceded by a 34px accent rule.
 */
export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'mb-6 flex items-center gap-3 text-[13px] font-semibold tracking-[0.18em] text-accent uppercase',
        className,
      )}
    >
      <span className="h-px w-[34px] bg-accent" />
      {children}
    </div>
  )
}
