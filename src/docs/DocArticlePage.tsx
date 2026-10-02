import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight, LifeBuoy } from 'lucide-react'
import { contact } from '../data/content'
import { areaPorId, artigosDaArea, caminhoDoArtigo } from './registry'

interface TocItem {
  id: string
  texto: string
}

/** Índice "Nesta página": lê os <h2 id> do artigo depois de renderizado e marca a seção visível. */
function useIndiceDaPagina(container: React.RefObject<HTMLElement | null>, chave: string) {
  const [itens, setItens] = useState<TocItem[]>([])
  const [ativo, setAtivo] = useState<string>('')

  useEffect(() => {
    const el = container.current
    if (!el) return
    const titulos = Array.from(el.querySelectorAll<HTMLHeadingElement>('h2[id]'))
    setItens(titulos.map((h) => ({ id: h.id, texto: h.textContent?.replace(/#$/, '').trim() ?? '' })))
    setAtivo(titulos[0]?.id ?? '')

    const observer = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting)
        if (visiveis.length > 0) setAtivo(visiveis[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    titulos.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [container, chave])

  return { itens, ativo }
}

export function DocArticlePage() {
  const { area: areaId, slug } = useParams()
  const { pathname } = useLocation()
  const artigoRef = useRef<HTMLElement>(null)
  const { itens, ativo } = useIndiceDaPagina(artigoRef, pathname)

  const area = areaPorId(areaId)
  const lista = area ? artigosDaArea(area) : []
  const indice = lista.findIndex((a) => a.slug === slug)
  const artigo = indice >= 0 ? lista[indice] : undefined

  useEffect(() => {
    document.title = artigo && area ? `${artigo.titulo} — ${area.titulo} · Kargo` : 'Documentação · Kargo'
  }, [artigo, area])

  if (!area || !artigo) return <Navigate to="/docs" replace />

  const grupo = area.grupos.find((g) => g.artigos.includes(artigo))
  const anterior = indice > 0 ? lista[indice - 1] : undefined
  const proximo = indice < lista.length - 1 ? lista[indice + 1] : undefined
  const Conteudo = artigo.Component

  return (
    <div className="flex">
      <article ref={artigoRef} className="mx-auto w-full min-w-0 max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1 text-sm text-asphalt-500">
          <Link to="/docs" className="transition hover:text-signal-600 dark:hover:text-signal-400">
            Documentação
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span>{area.titulo}</span>
          {grupo && (
            <>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <span>{grupo.titulo}</span>
            </>
          )}
        </nav>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-5xl">
          {artigo.titulo}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">{artigo.resumo}</p>
        <div aria-hidden className="mt-8 h-px bg-asphalt-200 dark:bg-asphalt-800" />

        <div className="mt-10">
          <Conteudo />
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2">
          {anterior ? (
            <Link
              to={caminhoDoArtigo(anterior)}
              className="group rounded-xl border border-asphalt-200 p-4 transition hover:border-signal-500 dark:border-asphalt-800 dark:hover:border-signal-500"
            >
              <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-asphalt-500">
                <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" aria-hidden />
                Anterior
              </span>
              <span className="mt-1 block font-medium text-asphalt-950 dark:text-white">{anterior.titulo}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {proximo && (
            <Link
              to={caminhoDoArtigo(proximo)}
              className="group rounded-xl border border-asphalt-200 p-4 text-right transition hover:border-signal-500 dark:border-asphalt-800 dark:hover:border-signal-500"
            >
              <span className="flex items-center justify-end gap-1 font-mono text-xs uppercase tracking-widest text-asphalt-500">
                Próximo
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
              <span className="mt-1 block font-medium text-asphalt-950 dark:text-white">{proximo.titulo}</span>
            </Link>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-concrete-50 p-5 dark:bg-asphalt-950 sm:flex-row sm:items-center">
          <LifeBuoy className="h-5 w-5 shrink-0 text-signal-500" aria-hidden />
          <p className="flex-1 text-sm text-asphalt-600 dark:text-asphalt-400">
            Não achou o que procurava? Fale com a equipe do Kargo.
          </p>
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-signal-600 transition hover:text-signal-500 dark:text-signal-400"
          >
            Chamar no WhatsApp →
          </a>
        </div>
      </article>

      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto py-12 pr-8 xl:block">
        {itens.length > 1 && (
          <>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500">Nesta página</p>
            <ul className="mt-3 space-y-1 border-l border-asphalt-200 dark:border-asphalt-800">
              {itens.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`-ml-px block border-l-2 py-1 pl-3 text-sm transition ${
                      ativo === item.id
                        ? 'border-signal-500 font-medium text-asphalt-950 dark:text-white'
                        : 'border-transparent text-asphalt-500 hover:text-asphalt-950 dark:hover:text-white'
                    }`}
                  >
                    {item.texto}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  )
}
