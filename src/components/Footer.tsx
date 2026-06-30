import Link from 'next/link'

import { Wrap } from '@/components/Wrap'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work with me' },
]

const social = [
  { href: 'https://github.com/alechemenway', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/alec-hemenway/', label: 'LinkedIn' },
  { href: 'mailto:alec@hemenway.io', label: 'Email' },
]

export function Footer() {
  return (
    <Wrap>
      <footer className="flex flex-wrap items-center justify-between gap-y-4 border-t border-line py-10 font-mono text-[12.5px] text-ink-2">
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <span>© 2026 Alec Hemenway</span>
        </div>
      </footer>
    </Wrap>
  )
}
