import { Button } from '@/components/Button'

type BandButton = {
  label: string
  arrow?: string
  /** Omit href for an inert placeholder. */
  href?: string
}

function BandButton({
  button,
  variant,
}: {
  button: BandButton
  variant: 'solid' | 'ghost'
}) {
  if (button.href) {
    return (
      <Button variant={variant} href={button.href} arrow={button.arrow}>
        {button.label}
      </Button>
    )
  }
  return (
    <Button
      variant={variant}
      arrow={button.arrow}
      aria-disabled="true"
      className="cursor-not-allowed opacity-60"
    >
      {button.label}
    </Button>
  )
}

/**
 * Closing CTA band — bottom amber glow on the dark canvas. Caller supplies the
 * heading node (with an `<Accent>` word).
 */
export function ClosingBand({
  heading,
  paragraph,
  primary,
  secondary,
}: {
  heading: React.ReactNode
  paragraph: string
  primary: BandButton
  secondary: BandButton
}) {
  return (
    <section className="relative overflow-hidden py-[100px] max-[880px]:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_80%_at_50%_120%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_60%)]"
      />
      <div className="relative">
        <h2 className="max-w-[16ch] text-[clamp(36px,5.4vw,72px)] leading-[1.02] font-extrabold tracking-[-0.035em]">
          {heading}
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-[1.6] text-ink-2">
          {paragraph}
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <BandButton button={primary} variant="solid" />
          <BandButton button={secondary} variant="ghost" />
        </div>
      </div>
    </section>
  )
}
