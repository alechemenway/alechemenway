/**
 * Emphasis word inside a headline: Instrument Serif italic in the accent color.
 * (`<em>` is italic by default; `font-serif` selects the loaded Instrument Serif.)
 */
export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="font-serif text-accent">{children}</em>
}
