'use client'

import { useRef, useState } from 'react'

/**
 * Circular, click-to-play intro video for the hero (julius.fm-style).
 * Poster → click play → plays in place with sound + native controls → ends → poster.
 * When `src` is absent, renders poster-only (no play button) so the hero never
 * ships broken before the real clip lands in public/videos/.
 */
export function IntroVideo({
  src,
  poster,
  label = 'Let me introduce myself',
  className,
}: {
  src?: string
  poster: string
  label?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function play() {
    const v = ref.current
    if (!v) return
    void v.play()
    setPlaying(true)
  }

  function reset() {
    const v = ref.current
    if (v) v.load() // restores the poster frame
    setPlaying(false)
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {!playing && src && (
          <span
            aria-hidden
            className="hidden font-serif text-[18px] leading-tight italic text-accent min-[880px]:block"
          >
            {label} <span className="not-italic">↘</span>
          </span>
        )}
        <div className="relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-full ring-2 ring-accent/60 min-[880px]:w-[160px]">
          <video
            ref={ref}
            src={src}
            poster={poster}
            playsInline
            preload="metadata"
            controls={playing}
            onEnded={reset}
            className="h-full w-full object-cover"
          />
          {!playing && src && (
            <button
              type="button"
              onClick={play}
              aria-label="Play Alec's intro"
              className="absolute inset-0 grid place-items-center bg-black/20 transition-colors hover:bg-black/10"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-accent bg-black/60 backdrop-blur-sm">
                <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-accent" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
