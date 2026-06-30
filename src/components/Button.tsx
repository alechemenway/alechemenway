import Link from 'next/link'
import clsx from 'clsx'

type Variant = 'solid' | 'ghost'

const variants: Record<Variant, string> = {
  solid: 'bg-accent text-bg hover:bg-accent-2',
  ghost: 'border border-line text-ink hover:border-accent hover:text-accent',
}

type ButtonProps = {
  variant?: Variant
  /** Trailing glyph (→ ↓ ↗) that nudges on hover. */
  arrow?: string
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

/** Sharp-edged button in solid (amber) or ghost variant. Renders a Next Link when `href` is set. */
export function Button({
  variant = 'solid',
  arrow,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'group inline-flex h-12 items-center gap-2.5 px-6 text-sm font-semibold tracking-[0.01em] transition-colors duration-200',
    variants[variant],
    className,
  )
  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {arrow}
        </span>
      )}
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
