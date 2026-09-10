import Link from 'next/link'

export function EditorialHeader() {
  return (
    <>
      <header className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Alec Hemenway, home">
          Alec Hemenway<span className="wordmark-dot">.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#thinking">Thinking</Link>
          <Link href="/about">About</Link>
          <Link className="nav-contact" href="/#connect">
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
    </>
  )
}
