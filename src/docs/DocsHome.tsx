import { useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { ArrowRight, FileSpreadsheet, FileText, Fuel, Package, RefreshCw, Truck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { contact } from '../data/content'
import type { DocsOutletContext } from './DocsLayout'
import { DOC_AREAS, TODOS_ARTIGOS, artigosDaArea, caminhoDoArtigo } from './registry'
import { DocsSearchButton } from './DocsSearch'

const MODULOS: { slug: string; icon: LucideIcon }[] = [
  { slug: 'patrimonio', icon: Truck },
  { slug: 'documentacao', icon: FileText },
  { slug: 'combustivel', icon: Fuel },
  { slug: 'manutencao', icon: Wrench },
  { slug: 'almoxarifado', icon: Package },
  { slug: 'relatorios', icon: FileSpreadsheet },
  { slug: 'sienge-visao-geral', icon: RefreshCw },
]

const EXEMPLO_API = `curl "{BASE_URL}/api/veiculos" \\
  -H "Authorization: Bearer {TOKEN}"`

export function DocsHome() {
  const { abrirBusca } = useOutletContext<DocsOutletContext>()

  useEffect(() => {
    document.title = 'Documentação · Kargo'
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden border-b border-asphalt-200 dark:border-asphalt-800">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/10 blur-3xl dark:bg-signal-500/15"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
            Documentação
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-5xl">
            Tudo sobre o Kargo, do primeiro acesso à API
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">
            Guias passo a passo para quem usa o sistema no dia a dia e referência técnica para quem vai
            integrar o Kargo a outros sistemas.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <DocsSearchButton onClick={abrirBusca} grande />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {DOC_AREAS.map((area) => {
            const Icon = area.icon
            const lista = artigosDaArea(area)
            return (
              <div
                key={area.id}
                className="flex flex-col rounded-2xl border border-asphalt-200 bg-white p-6 transition hover:border-asphalt-300 dark:border-asphalt-800 dark:bg-asphalt-950 dark:hover:border-asphalt-700 sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white">
                  {area.titulo}
                </h2>
                <p className="mt-2 leading-relaxed text-asphalt-600 dark:text-asphalt-400">{area.descricao}</p>
                <ul className="mt-6 flex-1 space-y-1 border-t border-asphalt-200 pt-4 dark:border-asphalt-800">
                  {lista.slice(0, 4).map((a) => (
                    <li key={a.slug}>
                      <Link
                        to={caminhoDoArtigo(a)}
                        className="group flex items-center justify-between gap-3 rounded-lg py-2 text-[0.95rem] text-asphalt-700 transition hover:text-signal-600 dark:text-asphalt-300 dark:hover:text-signal-400"
                      >
                        {a.titulo}
                        <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={caminhoDoArtigo(lista[0])}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-lg bg-asphalt-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
                >
                  Abrir {area.tituloCurto === 'API' ? 'a referência da API' : 'o manual'}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white">
            Guias por módulo
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULOS.map(({ slug, icon: Icon }) => {
              const a = TODOS_ARTIGOS.find((x) => x.area === 'manual' && x.slug === slug)
              if (!a) return null
              return (
                <Link
                  key={slug}
                  to={caminhoDoArtigo(a)}
                  className="group rounded-xl border border-asphalt-200 p-5 transition hover:border-signal-500 dark:border-asphalt-800 dark:hover:border-signal-500"
                >
                  <Icon className="h-5 w-5 text-signal-600 dark:text-signal-400" aria-hidden />
                  <p className="mt-3 font-medium text-asphalt-950 dark:text-white">{a.titulo}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-asphalt-500 dark:text-asphalt-400">
                    {a.resumo}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 overflow-hidden rounded-2xl bg-asphalt-950 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-400">
              Para desenvolvedores
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Leve os dados do Kargo para o seu sistema
            </h2>
            <p className="mt-3 leading-relaxed text-asphalt-300">
              API REST com respostas em JSON: consulte ativos, documentos, abastecimentos, manutenções e o
              estoque de cada obra com um token de acesso.
            </p>
            <Link
              to="/docs/api/introducao"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-asphalt-950 transition hover:bg-signal-400"
            >
              Começar pela introdução
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-5 font-mono text-sm leading-relaxed text-asphalt-200">
            <code>{EXEMPLO_API}</code>
          </pre>
        </div>

        <p className="mt-16 text-center text-asphalt-500">
          Precisa de ajuda com algo que não está aqui?{' '}
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-signal-600 transition hover:text-signal-500 dark:text-signal-400"
          >
            Fale com o suporte
          </a>
          .
        </p>
      </div>
    </div>
  )
}
