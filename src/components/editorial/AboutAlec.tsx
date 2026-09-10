import Link from 'next/link'
import Image from 'next/image'
import portraitClose from '@/images/portrait-2026.jpg'

export function AboutAlec() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">About · Minneapolis, Minnesota</p>
        <h1>
          An enterprise seller
          <br /> <em>who builds.</em>
        </h1>
        <p className="reading-lead">
          My background is in enterprise sales, including roles at Jamf and
          Staffbase. My AI work now includes a client engagement with a
          wealth-management firm and product projects in sales and caregiver
          workflows.
        </p>
      </header>
      <figure className="reading-portrait">
        <Image
          src={portraitClose}
          alt="Alec in a gray sweater"
          width={1400}
          height={2100}
          sizes="(max-width: 760px) calc(100vw - 40px), 640px"
        />
        <figcaption>Based in Minneapolis, Minnesota.</figcaption>
      </figure>
      <div className="reading-body">
        <p>
          I’m interested in the decisions that connect a sale to a working
          implementation: what to solve, what to buy or build, and what the
          customer needs to see before trusting it. Outside work, you’ll find me
          on a golf course or a trail.
        </p>
        <p className="opportunities">
          Open to the right full-time opportunity.{' '}
          <a href="mailto:alec@hemenway.io">Tell me about it ↗</a>
        </p>
      </div>
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
      <nav className="reading-next" aria-label="Continue reading">
        <Link href="/#connect">
          Let’s compare notes <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  )
}
