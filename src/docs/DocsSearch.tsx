import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { DOC_AREAS, buscarArtigos, caminhoDoArtigo } from './registry'

const SUGESTOES = ['primeiro acesso', 'sienge', 'almoxarifado', 'token', 'multas']

/** Busca da documentação (abre com o botão, "/" ou Ctrl+K). Procura nos títulos, resumos e
 *  palavras-chave de todos os artigos das duas áreas. */
export function DocsSearchDialog({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [consulta, setConsulta] = useState('')
  const [ativo, setAtivo] = useState(0)

  const resultados = useMemo(() => buscarArtigos(consulta).slice(0, 8), [consulta])

  useEffect(() => {
    if (!aberto) return
    setConsulta('')
    setAtivo(0)
    const t = window.setTimeout(() => inputRef.current?.focus(), 10)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [aberto])

  if (!aberto) return null

  const irPara = (i: number) => {
    const a = resultados[i]
    if (!a) return
    onFechar()
    navigate(caminhoDoArtigo(a))
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-asphalt-950/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar na documentação"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-asphalt-200 bg-white shadow-2xl dark:border-asphalt-800 dark:bg-asphalt-950">
        <div className="flex items-center gap-3 border-b border-asphalt-200 px-4 dark:border-asphalt-800">
          <Search className="h-5 w-5 shrink-0 text-asphalt-400" aria-hidden />
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value)
              setAtivo(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onFechar()
              else if (e.key === 'ArrowDown') {
                e.preventDefault()
                setAtivo((i) => Math.min(i + 1, Math.max(resultados.length - 1, 0)))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setAtivo((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter') {
                e.preventDefault()
                irPara(ativo)
              }
            }}
            placeholder="Buscar na documentação…"
            className="h-14 w-full bg-transparent text-base text-asphalt-950 outline-none placeholder:text-asphalt-400 dark:text-white"
            aria-label="Termo de busca"
          />
          <button
            type="button"
            onClick={onFechar}
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-asphalt-500 transition hover:bg-asphalt-950/5 dark:hover:bg-white/5"
            aria-label="Fechar busca"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {consulta.trim() === '' ? (
            <div className="p-3">
              <p className="font-mono text-xs uppercase tracking-widest text-asphalt-500">Sugestões</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGESTOES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setConsulta(s)
                      inputRef.current?.focus()
                    }}
                    className="cursor-pointer rounded-full border border-asphalt-200 px-3 py-1.5 text-sm text-asphalt-700 transition hover:border-signal-500 hover:text-signal-600 dark:border-asphalt-800 dark:text-asphalt-300 dark:hover:text-signal-400"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : resultados.length === 0 ? (
            <p className="p-6 text-center text-sm text-asphalt-500">
              Nada encontrado para “{consulta}”. Tente outra palavra.
            </p>
          ) : (
            <ul>
              {resultados.map((a, i) => {
                const area = DOC_AREAS.find((x) => x.id === a.area)
                return (
                  <li key={`${a.area}/${a.slug}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setAtivo(i)}
                      onClick={() => irPara(i)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                        i === ativo ? 'bg-concrete-100 dark:bg-asphalt-900' : ''
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-semibold text-asphalt-950 dark:text-white">
                          {a.titulo}
                          <span className="rounded bg-asphalt-950/5 px-1.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-asphalt-500 dark:bg-white/10 dark:text-asphalt-400">
                            {area?.tituloCurto}
                          </span>
                        </p>
                        <p className="mt-0.5 truncate text-sm text-asphalt-500 dark:text-asphalt-400">{a.resumo}</p>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 text-signal-500 transition ${i === ativo ? 'opacity-100' : 'opacity-0'}`}
                        aria-hidden
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

/** Botão com cara de campo de busca (abre o diálogo). */
export function DocsSearchButton({ onClick, grande = false }: { onClick: () => void; grande?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border border-asphalt-200 bg-white text-left text-asphalt-400 transition hover:border-asphalt-300 dark:border-asphalt-800 dark:bg-asphalt-950 dark:hover:border-asphalt-700 ${
        grande ? 'h-14 px-5 text-base shadow-sm' : 'h-10 px-3 text-sm'
      }`}
    >
      <Search className={grande ? 'h-5 w-5' : 'h-4 w-4'} aria-hidden />
      <span className="min-w-0 flex-1 truncate whitespace-nowrap">Buscar na documentação…</span>
      <kbd className="hidden rounded-md border border-asphalt-200 px-1.5 py-0.5 font-mono text-xs text-asphalt-500 dark:border-asphalt-700 sm:inline">
        /
      </kbd>
    </button>
  )
}
