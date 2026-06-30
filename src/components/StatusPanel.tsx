/** Axiom-style mono instrument readout. First line gets a glowing amber dot. */
export function StatusPanel({
  status,
  lines,
}: {
  status: string
  lines: string[]
}) {
  return (
    <div className="inline-flex flex-col gap-1.5 border border-line border-l-2 border-l-accent bg-ink/[0.03] px-4 py-3.5 font-mono text-[11.5px] tracking-[0.06em] text-ink-2">
      <span className="flex items-center gap-2 text-ink">
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
        />
        {status}
      </span>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  )
}
