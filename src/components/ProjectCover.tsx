import clsx from 'clsx'
import { type ReactNode } from 'react'

export type ProjectCoverVariant =
  | 'dashboard'
  | 'leads'
  | 'skills'
  | 'voice'
  | 'teardown'
  | 'council'
  | 'inbox'
  | 'orchestrator'

/**
 * Deterministic project artifact covers. These are lightweight, generated
 * object-scenes rather than icons, so each card reads like a shipped system.
 */
export function ProjectCover({
  seed = 0,
  variant,
  className,
}: {
  seed?: number
  variant?: ProjectCoverVariant
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
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
        style={{
          background: `radial-gradient(80% 120% at ${gx}% 0%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 55%), radial-gradient(70% 100% at 100% 100%, color-mix(in oklab, var(--accent) 13%, transparent), transparent 50%), repeating-linear-gradient(${angle}deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 22px), linear-gradient(160deg, #14130f, #0c0c0e)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,.08),rgba(0,0,0,.55)_72%)]" />
      <Artifact variant={variant} />
    </div>
  )
}

function Artifact({ variant }: { variant?: ProjectCoverVariant }) {
  switch (variant) {
    case 'dashboard':
      return (
        <CoverShell kicker="Pipeline OS" title="Deal risk">
          <Window className="left-[16%] top-[23%] w-[68%]">
            <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-line/70 pb-3">
              <Bars values={[64, 42, 76]} />
              <div className="font-mono text-[20px] leading-none text-accent">
                82
              </div>
            </div>
            <Rows count={4} />
          </Window>
        </CoverShell>
      )
    case 'leads':
      return (
        <CoverShell kicker="Ranked ICP" title="Lead table">
          <Window className="left-[14%] top-[21%] w-[72%]">
            {[92, 87, 81, 74].map((score, i) => (
              <div
                key={score}
                className="grid grid-cols-[1fr_42px] items-center gap-3 border-b border-line/60 py-2 last:border-b-0"
              >
                <div>
                  <div className="h-1.5 w-24 bg-ink/70" />
                  <div className="mt-2 h-1 w-32 bg-ink-2/35" />
                </div>
                <div className={clsx(
                  'text-right font-mono text-[13px]',
                  i === 0 ? 'text-accent' : 'text-ink-2',
                )}>
                  {score}
                </div>
              </div>
            ))}
          </Window>
        </CoverShell>
      )
    case 'skills':
      return (
        <CoverShell kicker="Skillpack" title="Router">
          <Window className="left-[17%] top-[19%] w-[66%]">
            <CodeLine wide />
            <CodeLine />
            <CodeLine short />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['GT', 'OP', 'AI', 'QA', 'SE', 'MD'].map((label) => (
                <div
                  key={label}
                  className="border border-line/70 py-2 text-center font-mono text-[10px] text-accent"
                >
                  {label}
                </div>
              ))}
            </div>
          </Window>
        </CoverShell>
      )
    case 'voice':
      return (
        <CoverShell kicker="Care call" title="Voice check">
          <div className="absolute left-[15%] top-[35%] flex h-20 w-[70%] items-center justify-center gap-1.5 border border-line/80 bg-bg/60 px-5">
            {[22, 46, 64, 30, 72, 40, 58, 26, 48, 34].map((height, i) => (
              <span
                key={`${height}-${i}`}
                className="w-2 bg-accent/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="absolute right-[18%] bottom-[18%] border border-accent/60 bg-bg px-4 py-2 font-mono text-[11px] text-ink">
            SMS alert
          </div>
        </CoverShell>
      )
    case 'teardown':
      return (
        <CoverShell kicker="ROI memo" title="Build vs buy">
          <Window className="left-[16%] top-[18%] w-[68%]">
            <div className="grid grid-cols-3 gap-2 font-mono text-[9px] text-ink-2">
              <span>Tokens</span>
              <span>Infra</span>
              <span>Risk</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[68, 42, 84].map((height) => (
                <div key={height} className="flex h-20 items-end bg-bg/80">
                  <div
                    className="w-full bg-accent/75"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 h-px bg-line" />
            <Rows count={2} />
          </Window>
        </CoverShell>
      )
    case 'council':
      return (
        <CoverShell kicker="5 advisors" title="Verdict">
          <svg
            className="absolute inset-x-[11%] top-[18%] h-[62%] w-[78%]"
            viewBox="0 0 260 150"
            fill="none"
          >
            <path d="M130 76 46 32M130 76l72-48M130 76 55 122M130 76l78 48M130 76V18" stroke="currentColor" className="text-line" />
            {[46, 202, 55, 208, 130].map((x, i) => (
              <circle
                key={`${x}-${i}`}
                cx={x}
                cy={[32, 28, 122, 124, 18][i]}
                r="17"
                className="fill-bg stroke-accent/70"
              />
            ))}
            <circle cx="130" cy="76" r="28" className="fill-accent/20 stroke-accent" />
            <text x="130" y="81" textAnchor="middle" className="fill-ink text-[18px] font-bold">
              74
            </text>
          </svg>
        </CoverShell>
      )
    case 'inbox':
      return (
        <CoverShell kicker="Drafts only" title="Inbox">
          <div className="absolute left-[16%] top-[23%] grid w-[68%] gap-3">
            {['Important unread', 'CRM context', 'Reply draft'].map((label, i) => (
              <div
                key={label}
                className={clsx(
                  'border border-line/80 bg-bg/70 px-4 py-3',
                  i === 2 && 'translate-x-6 border-accent/70',
                )}
              >
                <div className="font-mono text-[10px] text-accent">{label}</div>
                <div className="mt-2 h-1.5 w-28 bg-ink/70" />
                <div className="mt-2 h-1 w-40 bg-ink-2/35" />
              </div>
            ))}
          </div>
        </CoverShell>
      )
    case 'orchestrator':
      return (
        <CoverShell kicker="Control plane" title="Workers">
          <svg
            className="absolute inset-x-[12%] top-[18%] h-[64%] w-[76%]"
            viewBox="0 0 260 150"
            fill="none"
          >
            <rect x="93" y="14" width="74" height="40" className="fill-accent/18 stroke-accent" />
            <path d="M130 54v34M130 88H48M130 88h82M48 88v26M130 88v26M212 88v26" stroke="currentColor" className="text-line" />
            {[24, 106, 188].map((x) => (
              <rect key={x} x={x} y="114" width="48" height="26" className="fill-bg stroke-line" />
            ))}
            <text x="130" y="39" textAnchor="middle" className="fill-ink text-[12px] font-bold">
              TRIAGE
            </text>
          </svg>
        </CoverShell>
      )
    default:
      return (
        <CoverShell kicker="Artifact" title="System">
          <Window className="left-[20%] top-[24%] w-[60%]">
            <Rows count={4} />
          </Window>
        </CoverShell>
      )
  }
}

function CoverShell({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="absolute inset-0">
      {children}
      <div className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.12em] text-accent uppercase">
        {kicker}
      </div>
      <div className="absolute right-5 bottom-4 max-w-[16ch] text-right text-[18px] leading-none font-bold tracking-[-0.03em] text-ink/90">
        {title}
      </div>
    </div>
  )
}

function Window({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={clsx('absolute border border-line/80 bg-bg/72 p-4', className)}>
      <div className="mb-3 flex gap-1.5">
        <span className="size-1.5 rounded-full bg-accent" />
        <span className="size-1.5 rounded-full bg-ink-2/40" />
        <span className="size-1.5 rounded-full bg-ink-2/25" />
      </div>
      {children}
    </div>
  )
}

function Rows({ count }: { count: number }) {
  return (
    <div className="mt-3 space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="grid grid-cols-[1fr_28px] gap-3">
          <div className="h-1.5 bg-ink-2/35" />
          <div className="h-1.5 bg-accent/60" />
        </div>
      ))}
    </div>
  )
}

function Bars({ values }: { values: number[] }) {
  return (
    <div className="flex h-12 items-end gap-2">
      {values.map((height) => (
        <span
          key={height}
          className="w-4 bg-accent/70"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

function CodeLine({
  wide = false,
  short = false,
}: {
  wide?: boolean
  short?: boolean
}) {
  return (
    <div
      className={clsx(
        'mt-2 h-1.5 bg-ink-2/40',
        wide && 'w-full',
        short ? 'w-1/2' : 'w-4/5',
      )}
    />
  )
}
