import Image from 'next/image'
import portraitSeated from '@/images/about-hero-2026.png'

export function Introduction() {
  return (
    <>
      <section
        id="introduction"
        className="hero wrap"
        aria-labelledby="hero-heading"
      >
        <div className="hero-copy">
          <p className="eyebrow">
            AI sales &amp; implementation <span>Minneapolis, MN</span>
          </p>
          <h1 id="hero-heading">
            AI earns its place
            <br /> <em>in the business.</em>
          </h1>
          <p className="hero-description">
            I’m Alec Hemenway. I work across enterprise sales and AI
            implementation. For founders and customer-facing leaders at AI
            companies, I focus on the decisions between a promising demo and a
            successful enterprise customer: what to solve, how it fits the
            workflow, and what success must look like.
          </p>
          <div className="actions">
            <a
              className="button primary"
              href="https://www.linkedin.com/in/alec-hemenway/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a className="text-link" href="#connect">
              Let’s talk for 20 minutes <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-footnote">
            Recent client work: AI meeting preparation at a Minneapolis
            wealth-management firm.
          </p>
        </div>
        <figure className="hero-portrait">
          <Image
            src={portraitSeated}
            alt="Alec Hemenway"
            width={832}
            height={1248}
            preload
            sizes="(max-width: 760px) calc(100vw - 40px), 640px"
          />
          <figcaption>
            <span>Alec Hemenway</span>
            <span>Minneapolis, Minnesota</span>
          </figcaption>
        </figure>
        <a className="explore" href="#work">
          <span>Selected work &amp; ideas</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>
    </>
  )
}
