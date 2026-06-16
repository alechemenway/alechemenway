import { Wrap } from '@/components/Wrap'

const links = [
  { href: 'https://github.com/alechemenway', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/alec-hemenway/', label: 'LinkedIn' },
  { href: 'mailto:alec@hemenway.io', label: 'Email' },
]

export function Footer() {
  return (
    <Wrap>
      <footer className="flex flex-wrap items-center justify-between gap-y-3 border-t border-line pt-7 pb-[60px] text-[13px] text-soft">
        <span>© 2026 Alec Hemenway</span>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </Wrap>
  )
}
