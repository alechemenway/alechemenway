import Link from 'next/link'
import Image from 'next/image'
import portraitClose from '@/images/portrait-2026.jpg'

export function PersonalIntroduction() {
  return (
    <>
      <section
        id="about"
        className="about wrap"
        aria-labelledby="about-heading"
      >
        <figure>
          <Image
            src={portraitClose}
            alt="Alec in a gray sweater"
            width={1400}
            height={2100}
            loading="lazy"
            sizes="(max-width: 760px) calc(100vw - 40px), 640px"
          />
          <figcaption>Based in Minneapolis, Minnesota.</figcaption>
        </figure>
        <div className="about-copy">
          <p className="section-label">A little more about me</p>
          <h2 id="about-heading">
            An enterprise seller
            <br /> <em>who builds.</em>
          </h2>
          <p>
            I’m interested in the decisions that connect a sale to a working
            implementation: what to solve, what to buy or build, and what the
            customer needs to see before trusting it. Outside work, you’ll find
            me on a golf course or a trail.
          </p>
          <Link className="text-link" href="/about">
            More about me <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
