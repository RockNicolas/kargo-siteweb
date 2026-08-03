import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { Logo } from './Logo'
import { Container } from './ui/Container'
import { navLinks } from '../data/content'
import { useTheme } from '../hooks/useTheme'

const HEADER_HEIGHT = 80

function NavLink({ href, className, onClick, children }: {
  href: string
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  if (href.startsWith('/#')) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overIntro, setOverIntro] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)

      const introEl = document.getElementById('intro')
      setOverIntro(introEl ? introEl.getBoundingClientRect().bottom > HEADER_HEIGHT : false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setIsOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isOpen
          ? 'bg-white shadow-sm dark:bg-black'
          : !overIntro && scrolled
            ? 'bg-white/90 shadow-sm backdrop-blur-md dark:bg-black/90'
            : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a href="/#intro" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className="group relative py-1 text-sm font-medium text-asphalt-600 transition-colors duration-200 hover:text-signal-600 active:text-signal-600 dark:text-asphalt-300 dark:hover:text-signal-400 dark:active:text-signal-400"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100"
                />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 transition hover:bg-asphalt-950/5 dark:text-asphalt-200 dark:hover:bg-white/5"
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              <Sun className="hidden h-5 w-5 dark:block" />
              <Moon className="h-5 w-5 dark:hidden" />
            </button>

            <a
              href="/#contact"
              className="hidden items-center gap-1.5 rounded-lg bg-asphalt-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400 lg:inline-flex"
            >
              Solicitar demonstração
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 dark:text-asphalt-200 lg:hidden"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        inert={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-asphalt-200 bg-white dark:border-asphalt-800 dark:bg-black">
            <Container>
              <nav
                className={`flex flex-col gap-1 py-4 transition-all duration-300 ease-out ${
                  isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border-l-2 border-transparent px-3 py-3 text-base font-medium text-asphalt-700 transition-colors duration-200 hover:border-signal-500 hover:bg-white hover:text-signal-600 active:bg-signal-100 dark:text-asphalt-200 dark:hover:bg-asphalt-900 dark:hover:text-signal-400 dark:active:bg-asphalt-800"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-asphalt-950 px-5 py-3 text-base font-medium text-white dark:bg-signal-500 dark:text-asphalt-950"
                >
                  Solicitar demonstração
                  <ArrowRight className="h-4 w-4" />
                </a>
              </nav>
            </Container>
          </div>
        </div>
      </div>
    </header>
  )
}
