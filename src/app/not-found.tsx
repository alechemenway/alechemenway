import { Wrap } from '@/components/Wrap'
import { PremiumButton } from '@/components/PremiumButton'

export default function NotFound() {
  return (
    <Wrap>
      <div className="flex flex-col items-center py-[120px] text-center max-[880px]:py-20">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-accent uppercase">
          404
        </span>
        <h1 className="mt-4 font-serif text-[clamp(40px,5.4vw,76px)] leading-none tracking-[-0.01em]">
          Page <em className="text-accent italic">not found.</em>
        </h1>
        <p className="mt-6 max-w-[42ch] text-lg leading-[1.65] text-prose-2">
          Sorry, I couldn’t find the page you’re looking for.
        </p>
        <PremiumButton href="/" variant="solid" arrow="→" className="mt-8">
          Go back home
        </PremiumButton>
      </div>
    </Wrap>
  )
}
