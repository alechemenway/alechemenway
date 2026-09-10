import Link from 'next/link'
import { RiaExample } from './RiaExample'

export function RiaCase() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">Client engagement · Wealth management</p>
        <h1>
          Meeting preparation,
          <br /> <em>scoped with the owner.</em>
        </h1>
        <p className="reading-lead">
          I worked directly with a Minneapolis wealth-management firm’s owner to
          scope and build a Claude API agent that turns CRM and document-store
          context into cited, two-page meeting briefs.
        </p>
      </header>
      <aside className="reading-evidence" aria-label="Reported result">
        <div className="case-result">
          <strong>Under 5 minutes</strong>
          <span>
            Total meeting preparation in one advisor’s single session, including
            reading the brief and checking questionable details.
          </span>
        </div>
      </aside>
      <div className="reading-body">
        <h2>Agree on what the brief must get right</h2>
        <p>
          Before rollout, the firm owner signed pass/fail thresholds for whether
          the agent retrieved the right information and made unsupported claims.
          Those criteria gave the build a defined target.
        </p>
        <h2>Connect the existing sources</h2>
        <p>
          The work included a custom MCP and a Claude API meeting-prep agent
          connected to the firm’s CRM and document store. The agent produced a
          cited, two-page brief for an advisor to review.
        </p>
        <h2>Keep separate decisions separate</h2>
        <p>
          A separate assessment examined role-scoped AI access to portfolio
          systems. I compared two MCP-gateway vendors with a custom build and
          recommended a 90-day read-only pilot.
        </p>
        <h2>What happened in use</h2>
        <p>
          One advisor completed total meeting preparation in under five minutes
          in a single session, including reading the brief and checking
          questionable details. The time result is limited to that one session.
          The firm continued using the custom MCP and meeting-prep workflow
          after the contract ended.
        </p>
        <p className="review-note">
          Anonymized engagement · 2026-06 to 2026-08. References on request.
        </p>
      </div>
      <section
        className="ria-example-section"
        aria-labelledby="example-heading"
      >
        <h2 id="example-heading">Inside an illustrative brief</h2>
        <RiaExample />
      </section>
      <nav className="reading-next" aria-label="Continue reading">
        <Link href="/writing/acceptance-criteria">
          The acceptance criteria are the product{' '}
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  )
}
