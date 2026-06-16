import Link from 'next/link'
import clsx from 'clsx'

type Variant = 'solid' | 'ghost'
type Tone = 'light' | 'dark'

const toneStyles: Record<Tone, Record<Variant, string>> = {
  light: {
    solid: 'bg-espresso text-cream hover:bg-accent',
    ghost: 'border border-line text-espresso hover:border-espresso',
  },
  // For use inside the espresso closing band.
  dark: {
    solid: 'bg-cream text-espresso hover:bg-accent-soft',
    ghost: 'border border-white/25 text-cream hover:border-cream',
  },
}

type PremiumButtonProps = {
  variant?: Variant
  tone?: Tone
  /** Trailing glyph (→ ↓ ↗) rendered with a 9px gap, matching the design copy. */
  arrow?: string
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

/**
 * Premium `.btn` — pill button in solid/ghost variants, with a light (page) or
 * dark (closing band) tone. Renders as a Next `Link` when `href` is provided.
 */
export function PremiumButton({
  variant = 'solid',
  tone = 'light',
  arrow,
  className,
  children,
  ...props
}: PremiumButtonProps) {
  const classes = clsx(
    'inline-flex items-center gap-[9px] rounded-full px-6 py-[13px] text-[14.5px] font-semibold transition-colors duration-150',
    toneStyles[tone][variant],
    className,
  )

  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true">{arrow}</span>}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={classes} {...props}>
        {content}
      </button>
    )
  }

  return (
    <Link className={classes} {...props}>
      {content}
    </Link>
  )
}
