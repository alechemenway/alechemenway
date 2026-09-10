export function RiaExample() {
  return (
    <>
      <figure className="ria-example">
        <figcaption>
          <span className="sample-tag">Synthetic example</span>
          <span>Meeting-prep brief excerpt</span>
        </figcaption>
        <div className="sample-sheet">
          <p className="sample-kicker">For the advisor</p>
          <p className="sample-title">
            A statement you can trace.
            <br />A question left open.
          </p>
          <div className="sample-fact">
            <span className="sample-label">In the brief</span>
            <p>
              Discuss the client’s planned move.{' '}
              <a
                className="sample-citation"
                href="#sample-source"
                aria-label="Read fictional source 1"
              >
                [1]
              </a>
            </p>
          </div>
          <details className="sample-source" open>
            <summary>
              <span>[1] Read the sample source</span>
              <span aria-hidden="true">+</span>
            </summary>
            <div id="sample-source">
              <p className="sample-source-meta">
                Fictional CRM note · 2026-07-08
              </p>
              <p>
                “Client asked to discuss a planned move at the next meeting.
                Date not provided.”
              </p>
            </div>
          </details>
          <div className="sample-question">
            <span className="sample-label">Question for the advisor</span>
            <p>When is the move?</p>
            <span>The source does not specify a date.</span>
          </div>
          <div className="sample-checks">
            <p className="sample-label">Illustrative acceptance check</p>
            <dl>
              <div>
                <dt>Source attached</dt>
                <dd>Shown</dd>
              </div>
              <div>
                <dt>Missing date flagged</dt>
                <dd>Shown</dd>
              </div>
              <div>
                <dt>Advisor confirmation</dt>
                <dd className="sample-pending">Still needed</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="sample-disclaimer">
          Invented content and review checks. Not actual client output or
          evaluation results.
        </p>
      </figure>
    </>
  )
}
