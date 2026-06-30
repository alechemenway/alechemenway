'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work with me' },
]

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

// Client-only flag without setState-in-effect: false on the server snapshot,
// true on the client snapshot. Avoids the next-themes hydration mismatch.
const emptySubscribe = () => () => {}
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const isDark = resolvedTheme === 'dark'
  return (
    <button
      type="button"
      aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink-2 hover:text-ink"
    >
      {mounted ? (
        isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />
      ) : (
        <span className="size-4" />
      )}
    </button>
  )
}

function MobileMenu() {
  return (
    <Popover className="hidden max-[880px]:block">
      <PopoverButton
        aria-label="Open navigation"
        className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink-2 hover:text-ink focus:outline-none"
      >
        <MenuIcon className="size-5" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-4 z-50 origin-top border border-line bg-surface p-7 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[12px] tracking-[0.18em] text-accent uppercase">
            Navigation
          </span>
          <PopoverButton
            aria-label="Close navigation"
            className="-m-1 p-1 text-ink-2 transition-colors hover:text-ink"
          >
            <CloseIcon className="size-6" />
          </PopoverButton>
        </div>
        <nav className="mt-5 flex flex-col">
          {navLinks.map((link) => (
            <PopoverButton
              key={link.href}
              as={Link}
              href={link.href}
              className="border-b border-line py-3 text-2xl font-semibold tracking-tight text-ink last:border-b-0"
            >
              {link.label}
            </PopoverButton>
          ))}
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 backdrop-blur-md transition-colors duration-300',
        scrolled ? 'border-b border-line bg-bg/80' : 'border-b border-transparent bg-bg/60',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-8 max-[880px]:px-6">
        <Link href="/" aria-label="Home" className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="font-semibold tracking-[-0.01em]">Alec Hemenway</span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase">
            AE × AI
          </span>
        </Link>
        <div className="flex items-center gap-7 max-[880px]:gap-3">
          <nav className="flex items-center gap-7 font-mono text-[12.5px] tracking-[0.03em] max-[880px]:hidden">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100',
                    active ? 'text-ink after:scale-x-100' : 'text-ink-2 after:scale-x-0',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
