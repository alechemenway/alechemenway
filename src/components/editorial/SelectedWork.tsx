import Link from 'next/link'
import Image from 'next/image'
import { RiaExample } from './RiaExample'

export function SelectedWork() {
  return (
    <>
      <section
        id="work"
        className="work work-redesign wrap"
        aria-labelledby="work-heading"
      >
        <header className="work-intro">
          <p className="section-label">Selected work</p>
          <h2 id="work-heading">The decisions behind the build.</h2>
          <p className="work-deck">
            One client engagement, two product projects, and the choices behind
            them.
          </p>
        </header>
        <article className="featured-case">
          <div className="case-copy">
            <p className="case-label">
              <span>01</span> Client engagement · Wealth management
            </p>
            <h3>Meeting preparation, scoped with the owner.</h3>
            <p>
              I worked directly with a Minneapolis wealth-management firm’s
              owner to scope and build a Claude API agent that turns CRM and
              document-store context into cited, two-page meeting briefs.
            </p>
            <div className="case-result">
              <strong>Under 5 minutes</strong>
              <span>
                Total meeting preparation in one advisor’s single session,
                including reading the brief and checking questionable details.
              </span>
            </div>
            <Link className="case-page-link" href="/work/ria">
              Read the engagement <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <RiaExample />
        </article>

        <div className="supporting-work">
          <article className="project repcoach">
            <div className="project-body">
              <p className="case-label">
                <span>02</span> Commercial product
              </p>
              <h3>Rep Coaching / Deal Intelligence</h3>
              <p>
                An application for deal summaries, meeting analysis, rep
                coaching, and forecasting, built around CRM context.
              </p>
              <Link className="case-page-link" href="/work/rep-coaching">
                Explore Rep Coaching <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <figure className="project-art">
              <Image
                src="/repcoach-card.png"
                alt="Existing Rep Coaching interface capture from the website repository"
                width={2546}
                height={1528}
                loading="lazy"
                sizes="(max-width: 760px) calc(100vw - 40px), 640px"
              />
              <figcaption>Existing project image</figcaption>
            </figure>
          </article>
          <article className="project dailyok">
            <div className="project-body">
              <p className="case-label">
                <span>03</span> Voice &amp; human workflows
              </p>
              <h3>DailyOK</h3>
              <p>
                AI voice check-ins for older adults, with call summaries and
                review tools for caregivers.
              </p>
              <Link className="case-page-link" href="/work/dailyok">
                Explore DailyOK <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div
              className="project-art daily-art"
              role="img"
              aria-label="Conceptual DailyOK call workflow: conversation, review, and caregiver context. Illustration, not product evidence."
            >
              <div className="daily-brand">
                Daily<span>OK</span>
              </div>
              <div className="voice-wave" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="daily-flow">
                Conversation <span>→</span> Review <span>→</span> Caregiver
                context
              </div>
              <p className="art-caption">
                Conceptual illustration · no personal data
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
