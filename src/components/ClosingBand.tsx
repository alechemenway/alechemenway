import { PremiumButton } from '@/components/PremiumButton'

type BandButton = {
  label: string
  arrow?: string
  /** Omit href for an inert placeholder (e.g. a not-yet-wired scheduling link). */
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
      <PremiumButton
        tone="dark"
        variant={variant}
        href={button.href}
        arrow={button.arrow}
      >
        {button.label}
      </PremiumButton>
    )
  }
  return (
    <PremiumButton
      tone="dark"
      variant={variant}
      arrow={button.arrow}
      aria-disabled="true"
      className="cursor-not-allowed"
    >
      {button.label}
    </PremiumButton>
  )
}

/**
 * Premium `.closing` — espresso band that appears near the bottom of every page.
 * The caller supplies the heading node (with an accent-soft `<em>`).
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
    <section className="mt-20 mb-[70px] grid grid-cols-[1.3fr_1fr] items-center gap-10 rounded-[26px] bg-espresso px-14 py-16 text-cream max-[880px]:grid-cols-1 max-[880px]:px-9 max-[880px]:py-12">
      <h2 className="font-serif text-[clamp(34px,4.6vw,58px)] leading-[1.02] tracking-[-0.01em]">
        {heading}
      </h2>
      <div className="flex flex-col gap-[14px]">
        <p className="text-base leading-[1.6] text-band-muted">{paragraph}</p>
        <BandButton button={primary} variant="solid" />
        <BandButton button={secondary} variant="ghost" />
      </div>
    </section>
  )
}
