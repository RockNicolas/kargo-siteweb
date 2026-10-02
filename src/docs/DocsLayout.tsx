import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { Logo } from '../components/Logo'
import { useTheme } from '../hooks/useTheme'
import { useVisitNotifier } from '../hooks/useVisitNotifier'
import { contact } from '../data/content'
import { areaPorId } from './registry'
import { DocsAreaTabs, DocsNav } from './DocsNav'
import { DocsSearchButton, DocsSearchDialog } from './DocsSearch'

export interface DocsOutletContext {
  abrirBusca: () => void
}

/**
 * Casca da documentação pública (/docs). Fica fora do layout de marketing (sem o Header fixo do
 * site): portal de documentação precisa de barra própria, menu lateral fixo e índice da página.
 */
export function DocsLayout() {
  useVisitNotifier()
  const { theme, toggleTheme } = useTheme()
  const { pathname, hash } = useLocation()
  const area = areaPorId(pathname.split('/')[2])

  const [menuAberto, setMenuAberto] = useState(false)
  const [buscaAberta, setBuscaAberta] = useState(false)
  const abrirBusca = useCallback(() => setBuscaAberta(true), [])

  // Fecha o menu do celular ao navegar e volta ao topo (ou vai até a âncora, se tiver). Ao trocar de
  // página o salto é instantâneo — o `scroll-behavior: smooth` global faria a página "rolar" de onde
  // estava até o destino. Dentro da mesma página (índice, links #) a rolagem suave continua.
  const caminhoAnterior = useRef<string | null>(null)
  useEffect(() => {
    setMenuAberto(false)
    const mudouDePagina = caminhoAnterior.current !== pathname
    caminhoAnterior.current = pathname
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView(mudouDePagina ? { behavior: 'instant' } : undefined)
        return
      }
    }
    if (mudouDePagina) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    if (!menuAberto) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuAberto])

  // "/" ou Ctrl/Cmd+K abrem a busca (menos quando a pessoa está digitando em algum campo).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null
      const digitando = alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.isContentEditable)
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !digitando)) {
        e.preventDefault()
        setBuscaAberta(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const contexto: DocsOutletContext = { abrirBusca }

  return (
    <div className="min-h-screen bg-white text-asphalt-950 dark:bg-black dark:text-white">
      <header className="sticky top-0 z-40 border-b border-asphalt-200 bg-white/90 backdrop-blur-md dark:border-asphalt-800 dark:bg-black/90">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-4 sm:px-6 lg:px-8">
          {area && (
            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              className="-ml-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 dark:text-asphalt-200 lg:hidden"
              aria-label="Abrir menu da documentação"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link to="/" className="shrink-0" aria-label="Kargo — página inicial">
            <Logo />
          </Link>
          <span aria-hidden className="mx-1 hidden h-6 w-px bg-asphalt-200 dark:bg-asphalt-800 sm:block" />
          <Link
            to="/docs"
            className="hidden font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500 transition hover:text-signal-600 dark:text-asphalt-400 dark:hover:text-signal-400 sm:block"
          >
            Documentação
          </Link>

          <div className="ml-6 hidden md:block">
            <DocsAreaTabs areaAtual={area} />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <div className="hidden w-64 xl:block">
              <DocsSearchButton onClick={abrirBusca} />
            </div>
            <button
              type="button"
              onClick={abrirBusca}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 transition hover:bg-asphalt-950/5 dark:text-asphalt-200 dark:hover:bg-white/5 xl:hidden"
              aria-label="Buscar na documentação"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 transition hover:bg-asphalt-950/5 dark:text-asphalt-200 dark:hover:bg-white/5"
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              <Sun className="hidden h-5 w-5 dark:block" />
              <Moon className="h-5 w-5 dark:hidden" />
            </button>
            <Link
              to="/"
              className="ml-1 hidden items-center gap-1 rounded-lg bg-asphalt-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400 sm:inline-flex"
            >
              Ir para o site
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {area ? (
        <div className="mx-auto flex max-w-[1600px]">
          <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-asphalt-200 px-4 py-8 dark:border-asphalt-800 lg:block">
            <DocsNav area={area} />
          </aside>
          <div className="min-w-0 flex-1">
            <Outlet context={contexto} />
          </div>
        </div>
      ) : (
        <Outlet context={contexto} />
      )}

      <footer className="border-t border-asphalt-200 dark:border-asphalt-800">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-8 text-sm text-asphalt-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Kargo. Documentação pública.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/" className="transition hover:text-signal-600 dark:hover:text-signal-400">
              Site do Kargo
            </Link>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-signal-600 dark:hover:text-signal-400"
            >
              Suporte no WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="transition hover:text-signal-600 dark:hover:text-signal-400">
              {contact.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Menu da documentação no celular/tablet */}
      {area && (
        <div
          className={`fixed inset-0 z-50 lg:hidden ${menuAberto ? '' : 'pointer-events-none'}`}
          aria-hidden={!menuAberto}
          inert={!menuAberto}
        >
          <div
            className={`absolute inset-0 bg-asphalt-950/50 transition-opacity duration-300 ${
              menuAberto ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMenuAberto(false)}
          />
          <div
            className={`absolute inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-asphalt-950 ${
              menuAberto ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex h-16 items-center justify-between border-b border-asphalt-200 px-4 dark:border-asphalt-800">
              <Link to="/docs" className="font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500">
                Documentação
              </Link>
              <button
                type="button"
                onClick={() => setMenuAberto(false)}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-asphalt-700 dark:text-asphalt-200"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
              <DocsAreaTabs areaAtual={area} compacto />
              <DocsNav area={area} />
              <Link
                to="/"
                className="flex items-center justify-center gap-1 rounded-lg bg-asphalt-950 px-4 py-3 text-sm font-medium text-white dark:bg-signal-500 dark:text-asphalt-950"
              >
                Ir para o site
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <DocsSearchDialog aberto={buscaAberta} onFechar={() => setBuscaAberta(false)} />
    </div>
  )
}
