import Link from 'next/link'

export function Perspective() {
  return (
    <>
      <section
        id="perspective"
        className="thesis wrap"
        aria-labelledby="thesis-heading"
      >
        <p className="section-label">My point of view</p>
        <div>
          <h2 id="thesis-heading">The acceptance criteria are the product.</h2>
          <blockquote>
            “The commercial conversation has to define what the implementation
            must deliver — before the build, not after it. Customer-agreed
            acceptance criteria belong in the sale itself.”
          </blockquote>
          <Link className="text-link" href="/writing/acceptance-criteria">
            Read the essay <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
