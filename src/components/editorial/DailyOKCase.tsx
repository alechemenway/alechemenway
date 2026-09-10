import Link from 'next/link'

export function DailyOKCase() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">
          Voice &amp; human workflows · Implementation note
        </p>
        <h1>DailyOK</h1>
        <p className="reading-lead">
          AI voice check-ins for older adults, with call summaries and review
          tools for caregivers.
        </p>
      </header>
      <div className="reading-body">
        <h2>The human handoff</h2>
        <p>
          A voice conversation leaves a caregiver with another task:
          understanding what happened and deciding whether it needs attention.
          That handoff is the focus of this project note.
        </p>
        <h2>Give the reviewer context</h2>
        <p>
          The mobile call view presents a short summary and, when supporting
          information is available, an explanation of why an item was surfaced.
          A separate alerts view lets caregivers review items that need
          attention.
        </p>
        <p className="review-note">
          These are implementation notes based on the code. Usage and outcome
          evidence still need to be documented; this case makes no claim about
          detecting or improving a medical condition.
        </p>
        <a
          href="https://github.com/alechemenway/dailyok-dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the repository ↗
        </a>
      </div>
      <nav className="reading-next" aria-label="Continue reading">
        <Link href="/#work">
          Back to selected work <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  )
}
