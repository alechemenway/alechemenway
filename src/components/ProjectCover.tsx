import clsx from 'clsx'

/**
 * Deterministic generative amber cover (no network). Varies the radial origin
 * and hairline-stripe angle by `seed` so each card reads distinct. Scales subtly
 * on hover when wrapped in a `group`. Swap for a real screenshot later.
 */
export function ProjectCover({
  seed = 0,
  className,
}: {
  seed?: number
  className?: string
}) {
  const angle = 100 + ((seed * 37) % 70)
  const gx = 12 + ((seed * 23) % 64)
  return (
    <div
      aria-hidden
      className={clsx('relative overflow-hidden bg-[#0d0d0f]', className)}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]"
        style={{
          background: `radial-gradient(80% 120% at ${gx}% 0%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 55%), radial-gradient(70% 100% at 100% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 50%), repeating-linear-gradient(${angle}deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 22px), linear-gradient(160deg, #14130f, #0c0c0e)`,
        }}
      />
    </div>
  )
}
