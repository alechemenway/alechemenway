import Link from 'next/link'
import Image from 'next/image'
import portraitClose from '@/images/portrait-2026.jpg'
import '@/styles/about-portrait.css'

export function AboutAlec() {
  return (
    <div className="about-portrait">
      <section
        className="about-portrait-hero wrap"
        aria-labelledby="about-title"
      >
        <div>
          <p className="section-label">About · Minneapolis, Minnesota</p>
          <h1 id="about-title">
            An enterprise
            <br />
            seller <em>who builds.</em>
          </h1>
          <p className="about-portrait-lead">
            My background is in enterprise sales, including roles at Jamf and
            Staffbase. My AI work now includes a client engagement with a
            wealth-management firm and product projects in sales and caregiver
            workflows.
          </p>
          <div className="about-portrait-actions">
            <a className="button primary" href="mailto:alec@hemenway.io">
              Let’s talk <span aria-hidden="true">↗</span>
            </a>
            <Link
              className="text-link"
              href="/Alec_Hemenway_Resume_2026_v14.pdf"
              download="Alec_Hemenway_Resume_2026_v14.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download résumé <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in new tab)</span>
            </Link>
          </div>
        </div>
        <figure className="about-portrait-photo">
          <Image
            src={portraitClose}
            alt="Alec in a gray sweater"
            width={1400}
            height={2100}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1050px) 42vw, 540px"
            priority
          />
          <figcaption>
            <span>Alec Hemenway</span>
            <span>Minneapolis, MN</span>
          </figcaption>
        </figure>
      </section>
      <section
        className="about-portrait-personal wrap"
        aria-labelledby="personal-title"
      >
        <div>
          <span className="about-portrait-number" aria-hidden="true">
            01 /
          </span>
          <h2 id="personal-title">
            A little more
            <br />
            <em>about me.</em>
          </h2>
        </div>
        <div className="about-portrait-bio">
          <p>
            I’m interested in the decisions that connect a sale to a working
            implementation: what to solve, what to buy or build, and what the
            customer needs to see before trusting it. Outside work, you’ll find
            me on a golf course or a trail.
          </p>
          <Link className="text-link" href="/#work">
            Work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section
        className="about-portrait-opportunity wrap"
        aria-labelledby="opportunity-title"
      >
        <div>
          <p>Open to the right full-time opportunity.</p>
          <h2 id="opportunity-title">
            Let’s compare <em>notes.</em>
          </h2>
        </div>
        <a
          className="about-portrait-contact"
          href="mailto:alec@hemenway.io"
          aria-label="Tell me about it — email Alec"
        >
          <span aria-hidden="true">↗</span>
        </a>
      </section>
      <footer className="about-portrait-footer wrap">
        <Link className="wordmark" href="/">
          Alec Hemenway<span className="wordmark-dot">.</span>
        </Link>
        <p>Based in Minneapolis, Minnesota.</p>
        <a
          href="https://www.linkedin.com/in/alec-hemenway/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on LinkedIn <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </footer>
    </div>
  )
}
