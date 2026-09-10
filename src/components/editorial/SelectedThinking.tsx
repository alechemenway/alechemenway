import Link from 'next/link'

export function SelectedThinking() {
  return (
    <>
      <section
        id="thinking"
        className="thinking"
        aria-labelledby="thinking-heading"
      >
        <div className="wrap thinking-grid">
          <div className="thinking-intro">
            <p className="section-label">Selected thinking</p>
            <h2 id="thinking-heading">
              A point of view,
              <br /> <em>put to work.</em>
            </h2>
            <p>
              Notes on selling, scoping, and implementing AI.
              <br />I share ongoing thinking on LinkedIn.
            </p>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/alec-hemenway/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="essays">
            <Link
              className="essay essay-link"
              href="/writing/acceptance-criteria"
            >
              <span className="essay-meta">
                From the RIA engagement · Essay
              </span>
              <h3>
                The acceptance criteria
                <br />
                are the product.
              </h3>
              <span className="essay-action">
                Read the essay <span aria-hidden="true">↗</span>
              </span>
            </Link>
            <Link className="essay essay-link" href="/writing/workflow">
              <span className="essay-meta">
                Discovery &amp; scoping · Essay
              </span>
              <h3>
                Understand the workflow
                <br />
                before choosing the AI.
              </h3>
              <span className="essay-action">
                Read the essay <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
