'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/work-with-me', label: 'Work with me' },
]

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

function MobileMenu() {
  return (
    <Popover className="hidden max-[880px]:block">
      <PopoverButton
        aria-label="Open navigation"
        className="flex items-center justify-center rounded-full border border-line p-2 text-espresso transition-colors hover:border-espresso focus:outline-none"
      >
        <MenuIcon className="h-5 w-5" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-30 bg-espresso/30 backdrop-blur-sm duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-4 z-40 origin-top rounded-2xl border border-line bg-card p-7 shadow-card-hover duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-[0.18em] text-accent uppercase">
            Navigation
          </span>
          <PopoverButton
            aria-label="Close navigation"
            className="-m-1 p-1 text-soft transition-colors hover:text-espresso"
          >
            <CloseIcon className="h-6 w-6" />
          </PopoverButton>
        </div>
        <nav className="mt-5 flex flex-col">
          {navLinks.map((link) => (
            <PopoverButton
              key={link.href}
              as={Link}
              href={link.href}
              className="border-b border-line py-3 font-serif text-2xl text-espresso last:border-b-0"
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

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-cream/[0.82] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-12 py-[22px] max-[880px]:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="font-serif text-2xl tracking-[0.01em] whitespace-nowrap"
        >
          Alec Hemenway<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-[34px] text-sm font-medium max-[880px]:gap-5">
          <Link
            href="/about"
            aria-current={pathname === '/about' ? 'page' : undefined}
            className={clsx(
              'transition-colors hover:text-espresso max-[880px]:hidden',
              pathname === '/about' ? 'text-espresso' : 'text-soft',
            )}
          >
            About
          </Link>
          <Link
            href="/projects"
            aria-current={pathname === '/projects' ? 'page' : undefined}
            className={clsx(
              'transition-colors hover:text-espresso max-[880px]:hidden',
              pathname === '/projects' ? 'text-espresso' : 'text-soft',
            )}
          >
            Projects
          </Link>
          <Link
            href="/work-with-me"
            aria-current={pathname === '/work-with-me' ? 'page' : undefined}
            className="rounded-full border border-espresso px-[18px] py-2 font-semibold whitespace-nowrap text-espresso transition-colors hover:bg-espresso hover:text-cream"
          >
            Work with me
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
