import Link from 'next/link'
import Image from 'next/image'

export function RepCoachingCase() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">
          Commercial product · Implementation note
        </p>
        <h1>
          Rep Coaching /<br /> <em>Deal Intelligence</em>
        </h1>
        <p className="reading-lead">
          An application for deal summaries, meeting analysis, rep coaching, and
          forecasting, built around CRM context.
        </p>
      </header>
      <figure className="reading-image">
        <Image
          src="/repcoach-card.png"
          width={2546}
          height={1528}
          alt="Existing Rep Coaching interface capture from the website repository"
          sizes="(max-width: 760px) calc(100vw - 40px), 640px"
        />
        <figcaption>Existing project image</figcaption>
      </figure>
      <div className="reading-body">
        <h2>The commercial question</h2>
        <p>
          What does a manager need to understand about a deal, and what should
          happen next? The project brings deal summaries, meeting analysis,
          coaching, and forecasting into one application.
        </p>
        <h2>The implementation</h2>
        <p>
          CRM adapters supply the account and deal context. Separate modules
          handle summaries, meeting analysis, coaching, and forecasts. The
          architecture keeps scoring engines separate from AI calls and CRM
          access, so the scoring logic can be tested on its own.
        </p>
        <p className="review-note">
          These notes describe the project’s code and architecture. Adoption,
          coaching effectiveness, and revenue impact remain to be established.
        </p>
        <a
          href="https://www.repcoaching.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the project ↗
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
