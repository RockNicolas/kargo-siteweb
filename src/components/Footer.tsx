import { Mail, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { Container } from './ui/Container'
import { navLinks } from '../data/content'

export function Footer() {
  return (
    <footer className="bg-asphalt-950 pb-8 pt-16">
      <Container>
        <div className="grid gap-10 border-b border-asphalt-800 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-asphalt-400">
              Gestão de frota e obras em um painel só — combustível, documentação, manutenção,
              almoxarifado, viagens e rastreamento.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Sistema</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-asphalt-400 transition hover:text-signal-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Contato</h4>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-asphalt-400">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </li>
              <li className="flex items-center gap-2 text-sm text-asphalt-400">
                <Mail className="h-4 w-4" /> contato@seudominio.com.br
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-center text-sm text-asphalt-500">
          © {new Date().getFullYear()} Kargo. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  )
}
