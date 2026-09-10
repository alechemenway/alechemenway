import Link from 'next/link'
export function ReadingPage({
  children,
  backHref,
  backLabel,
}: {
  children: React.ReactNode
  backHref: string
  backLabel: string
}) {
  return (
    <div className="reading-page">
      <div className="reading wrap">
        <Link className="reading-back text-link" href={backHref}>
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
        <article>{children}</article>
      </div>
      <footer className="reading-footer wrap">
        <Link className="wordmark" href="/">
          Alec Hemenway.
        </Link>
        <a
          href="https://www.linkedin.com/in/alec-hemenway/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on LinkedIn <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        <Link href="/#connect">
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </div>
  )
}
