import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { Container } from './ui/Container'
import {
  contact,
  footerAboutLinks,
  footerSupportLinks,
  socialLinks,
} from '../data/content'

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'text-base text-asphalt-600 transition hover:text-signal-600 dark:text-asphalt-400 dark:hover:text-signal-400'

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  if (href.startsWith('/#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.84v1.98h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V23h-4v-6.56c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23h-4V8.5z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  )
}

const socialIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
} as const

export function Footer() {
  const visibleSocials = socialLinks.filter((s) => s.href)

  return (
    <footer className="bg-white pb-6 pt-16 dark:bg-black sm:pb-8 sm:pt-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-asphalt-600 dark:text-asphalt-400">
              Sistema de gestão de frota e obras — combustível, documentação, manutenção e
              almoxarifado em um painel só.
            </p>
            {visibleSocials.length > 0 && (
              <div className="mt-5 flex items-center gap-2">
                {visibleSocials.map((social) => {
                  const Icon = socialIcons[social.label]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center text-asphalt-500 transition hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium uppercase tracking-widest text-asphalt-950 dark:text-white">
              Sobre
            </h4>
            <ul className="mt-5 space-y-3">
              {footerAboutLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium uppercase tracking-widest text-asphalt-950 dark:text-white">
              Suporte
            </h4>
            <ul className="mt-5 space-y-3">
              {footerSupportLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium uppercase tracking-widest text-asphalt-950 dark:text-white">
              Contato
            </h4>
            <ul className="mt-5 space-y-3 text-base text-asphalt-600 dark:text-asphalt-400">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all italic transition hover:text-signal-600 dark:hover:text-signal-400"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-signal-600 dark:hover:text-signal-400"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-asphalt-200 pt-4 dark:border-asphalt-800 sm:mt-24 sm:pt-5">
          <p className="text-center text-sm text-asphalt-500">
            © {new Date().getFullYear()} Kargo. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
