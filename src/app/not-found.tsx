import { Wrap } from '@/components/Wrap'
import { Button } from '@/components/Button'
import { Accent } from '@/components/Accent'

export default function NotFound() {
  return (
    <Wrap>
      <div className="flex flex-col items-center py-[120px] text-center max-[880px]:py-20">
        <span className="font-mono text-[12px] tracking-[0.2em] text-accent uppercase">
          404
        </span>
        <h1 className="mt-4 text-[clamp(40px,5.4vw,76px)] leading-none font-extrabold tracking-[-0.04em]">
          Page <Accent>not found.</Accent>
        </h1>
        <p className="mt-6 max-w-[42ch] text-lg leading-[1.65] text-ink-2">
          Sorry, I couldn’t find the page you’re looking for.
        </p>
        <Button href="/" variant="solid" arrow="→" className="mt-8">
          Go back home
        </Button>
      </div>
    </Wrap>
  )
}
