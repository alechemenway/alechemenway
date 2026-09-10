export function Connect() {
  return (
    <>
      <section
        id="connect"
        className="connect"
        aria-labelledby="connect-heading"
      >
        <div className="wrap">
          <p className="section-label">Let’s compare notes</p>
          <div className="connect-main">
            <h2 id="connect-heading">
              Bring a problem
              <br /> <em>you’re working on.</em>
            </h2>
            <div>
              <p>
                Follow my thinking on LinkedIn. If you have a specific AI
                customer or workflow problem, we can spend 20 minutes on where
                it’s stuck and whether there’s a useful next step together.
              </p>
              <div className="actions">
                <a
                  className="button primary"
                  href="https://www.linkedin.com/in/alec-hemenway/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="text-link"
                  href="https://calendar.app.google/LRtfdRkHE6gBtwR67"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book 20 minutes <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
          <details className="minnesota">
            <summary>
              <span>Minnesota business owner?</span>
              <span>
                Start with paid discovery <span aria-hidden="true">+</span>
              </span>
            </summary>
            <div>
              <p>
                Start with a paid discovery engagement. We’ll examine how the
                work gets done, where the data lives, and who uses the result.
                From there, we’ll identify a worthwhile problem, agree on
                success criteria, and decide what to build or buy.
                Implementation is scoped from what we learn.
              </p>
              <a
                className="text-link"
                href="https://calendar.app.google/LRtfdRkHE6gBtwR67"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss your workflow ↗
              </a>
            </div>
          </details>
          <footer>
            <a className="wordmark" href="#main">
              Alec Hemenway<span className="wordmark-dot">.</span>
            </a>
            <span>Minneapolis, MN</span>
            <div>
              <a href="mailto:alec@hemenway.io">Email ↗</a>
              <a
                href="https://github.com/alechemenway"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </footer>
        </div>
      </section>
    </>
  )
}
