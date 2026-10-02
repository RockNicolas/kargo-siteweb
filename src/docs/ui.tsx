import { Children, cloneElement, isValidElement, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, Info, Lightbulb, TriangleAlert } from 'lucide-react'

/* Primitivos de conteúdo da documentação (/docs). Os artigos em src/docs/manual e src/docs/api
   são montados só com estes blocos — assim o visual fica igual em todas as páginas e o índice
   "Nesta página" funciona sozinho (ele lê os <h2 id> que o H2 daqui gera). */

function slugify(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function H2({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slugify(children)
  return (
    <h2
      id={anchor}
      className="group mt-14 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-asphalt-950 first:mt-0 dark:text-white sm:text-[1.75rem]"
    >
      <a href={`#${anchor}`} className="no-underline">
        {children}
        <span
          aria-hidden
          className="ml-2 text-signal-500 opacity-0 transition group-hover:opacity-100"
        >
          #
        </span>
      </a>
    </h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-asphalt-950 dark:text-white">
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-relaxed text-asphalt-700 dark:text-asphalt-300">{children}</p>
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 text-base leading-relaxed text-asphalt-700 marker:text-signal-500 dark:text-asphalt-300 [&>li]:ml-5 [&>li]:list-disc [&>li]:pl-1">
      {children}
    </ul>
  )
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-asphalt-950 dark:text-white">{children}</strong>
}

/** Link para outro artigo da documentação (ou qualquer rota interna do site). */
export function L({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="font-medium text-signal-600 underline decoration-signal-500/30 underline-offset-4 transition hover:decoration-signal-500 dark:text-signal-400"
    >
      {children}
    </Link>
  )
}

/** Código curto no meio do texto (nome de campo, rota, valor). */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-asphalt-200 bg-concrete-50 px-1.5 py-0.5 font-mono text-[0.85em] text-asphalt-900 dark:border-asphalt-800 dark:bg-asphalt-900 dark:text-asphalt-200">
      {children}
    </code>
  )
}

/** Caminho de menu dentro do Kargo, ex.: <Menu itens={['Almoxarifado', 'Obras']} />. */
export function Menu({ itens }: { itens: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 rounded-md bg-signal-100/70 px-1.5 py-0.5 align-baseline font-mono text-[0.8em] font-medium text-signal-600 dark:bg-signal-500/15 dark:text-signal-400">
      {itens.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-1">
          {i > 0 && <span aria-hidden>›</span>}
          {item}
        </span>
      ))}
    </span>
  )
}

const CALLOUT = {
  info: {
    icon: Info,
    title: 'Bom saber',
    box: 'border-sky-500/30 bg-sky-500/5',
    iconClass: 'text-sky-600 dark:text-sky-400',
  },
  dica: {
    icon: Lightbulb,
    title: 'Dica',
    box: 'border-emerald-500/30 bg-emerald-500/5',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  aviso: {
    icon: TriangleAlert,
    title: 'Atenção',
    box: 'border-signal-500/40 bg-signal-500/5',
    iconClass: 'text-signal-600 dark:text-signal-400',
  },
} as const

export function Callout({
  tipo = 'info',
  titulo,
  children,
}: {
  tipo?: keyof typeof CALLOUT
  titulo?: string
  children: ReactNode
}) {
  const conf = CALLOUT[tipo]
  const Icon = conf.icon
  return (
    <div className={`mt-6 flex gap-3 rounded-xl border p-4 sm:p-5 ${conf.box}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${conf.iconClass}`} aria-hidden />
      <div className="min-w-0 text-[0.95rem] leading-relaxed text-asphalt-700 dark:text-asphalt-300">
        <p className="font-semibold text-asphalt-950 dark:text-white">{titulo ?? conf.title}</p>
        <div className="mt-1 [&>p:first-child]:mt-0 [&>p]:mt-2">{children}</div>
      </div>
    </div>
  )
}

/** Passo a passo numerado. Cada filho de <Steps> é um <Step> (o número é colocado aqui). */
export function Steps({ children }: { children: ReactNode }) {
  let n = 0
  return (
    <ol className="mt-6">
      {Children.map(children, (child) =>
        isValidElement<StepProps>(child) ? cloneElement(child, { numero: ++n }) : child,
      )}
    </ol>
  )
}

interface StepProps {
  titulo: string
  children?: ReactNode
  numero?: number
}

export function Step({ titulo, children, numero }: StepProps) {
  return (
    <li className="group/step relative flex gap-4 pb-7 last:pb-0">
      <span
        aria-hidden
        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-asphalt-950 font-mono text-sm font-semibold text-white dark:bg-signal-500 dark:text-asphalt-950"
      >
        {numero}
      </span>
      <span
        aria-hidden
        className="absolute bottom-0 left-4 top-8 w-px bg-asphalt-200 group-last/step:hidden dark:bg-asphalt-800"
      />
      <div className="min-w-0 pt-1">
        <p className="font-semibold text-asphalt-950 dark:text-white">{titulo}</p>
        {children && (
          <div className="mt-1 text-base leading-relaxed text-asphalt-700 dark:text-asphalt-300 [&>p:first-child]:mt-0">
            {children}
          </div>
        )}
      </div>
    </li>
  )
}

/** Pergunta de FAQ que abre e fecha. */
export function Pergunta({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <details className="group/faq mt-3 rounded-xl border border-asphalt-200 transition open:border-asphalt-300 dark:border-asphalt-800 dark:open:border-asphalt-700">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-asphalt-950 dark:text-white [&::-webkit-details-marker]:hidden">
        {titulo}
        <span
          aria-hidden
          className="font-mono text-lg leading-none text-signal-500 transition group-open/faq:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="px-5 pb-5 text-base leading-relaxed text-asphalt-700 dark:text-asphalt-300 [&>p:first-child]:mt-0">
        {children}
      </div>
    </details>
  )
}

/** Tabela simples: primeira linha de `linhas` NÃO é cabeçalho — use `colunas`. */
export function Table({ colunas, linhas }: { colunas: string[]; linhas: ReactNode[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-asphalt-200 dark:border-asphalt-800">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-concrete-50 dark:bg-asphalt-900">
            {colunas.map((c) => (
              <th
                key={c}
                className="border-b border-asphalt-200 px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-asphalt-500 dark:border-asphalt-800 dark:text-asphalt-400"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-b border-asphalt-200 last:border-0 dark:border-asphalt-800">
              {linha.map((celula, j) => (
                <td
                  key={j}
                  className="px-4 py-3 align-top leading-relaxed text-asphalt-700 first:whitespace-nowrap dark:text-asphalt-300"
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CopyButton({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto)
          setCopiado(true)
          window.setTimeout(() => setCopiado(false), 1800)
        } catch {
          // sem permissão de área de transferência: não faz nada
        }
      }}
      className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 font-mono text-xs text-asphalt-400 transition hover:bg-white/10 hover:text-white"
      aria-label={copiado ? 'Copiado' : 'Copiar código'}
    >
      {copiado ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copiado ? 'Copiado' : 'Copiar'}
    </button>
  )
}

/** Bloco de código — sempre escuro, nos dois temas (padrão de documentação técnica). */
export function Code({ children, lang, titulo }: { children: string; lang?: string; titulo?: string }) {
  const texto = children.replace(/^\n+|\s+$/g, '')
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-asphalt-800 bg-asphalt-950">
      <div className="flex items-center justify-between border-b border-white/10 pl-4 pr-2">
        <span className="font-mono text-xs uppercase tracking-wider text-asphalt-400">
          {titulo ?? lang ?? 'código'}
        </span>
        <CopyButton texto={texto} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-asphalt-200 sm:text-sm">
        <code>{texto}</code>
      </pre>
    </div>
  )
}

type Metodo = 'GET' | 'POST' | 'DELETE'

const METODO_CLASSE: Record<Metodo, string> = {
  GET: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  POST: 'bg-signal-500/15 text-signal-600 dark:text-signal-400',
  DELETE: 'bg-red-500/15 text-red-700 dark:text-red-400',
}

export function MethodBadge({ metodo }: { metodo: Metodo }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${METODO_CLASSE[metodo]}`}
    >
      {metodo}
    </span>
  )
}

export interface RotaItem {
  metodo: Metodo
  caminho: string
  descricao: ReactNode
}

/** Lista compacta de rotas (método + caminho + para quê) — ex.: liberações de uma API externa. */
export function Rotas({ itens }: { itens: RotaItem[] }) {
  return (
    <div className="mt-4 divide-y divide-asphalt-200 rounded-xl border border-asphalt-200 dark:divide-asphalt-800 dark:border-asphalt-800">
      {itens.map((r) => (
        <div
          key={`${r.metodo} ${r.caminho}`}
          className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <div className="flex min-w-0 items-baseline gap-2 sm:w-[21rem] sm:shrink-0">
            <MethodBadge metodo={r.metodo} />
            <code className="min-w-0 break-all font-mono text-sm text-asphalt-950 dark:text-white">{r.caminho}</code>
          </div>
          <div className="text-sm leading-relaxed text-asphalt-700 dark:text-asphalt-300">{r.descricao}</div>
        </div>
      ))}
    </div>
  )
}

export interface Param {
  nome: string
  tipo: string
  obrigatorio?: boolean
  descricao: ReactNode
}

function ParamTable({ titulo, params }: { titulo: string; params: Param[] }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500 dark:text-asphalt-400">
        {titulo}
      </p>
      <div className="mt-2 divide-y divide-asphalt-200 rounded-xl border border-asphalt-200 dark:divide-asphalt-800 dark:border-asphalt-800">
        {params.map((p) => (
          <div key={p.nome} className="grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <code className="font-mono text-sm font-semibold text-asphalt-950 dark:text-white">{p.nome}</code>
              <span className="font-mono text-xs text-asphalt-500">{p.tipo}</span>
              {p.obrigatorio && (
                <span className="font-mono text-[0.7rem] font-medium uppercase text-signal-600 dark:text-signal-400">
                  obrigatório
                </span>
              )}
            </div>
            <div className="text-sm leading-relaxed text-asphalt-700 dark:text-asphalt-300">{p.descricao}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Um endpoint da API: cabeçalho com método + caminho, quem pode chamar, parâmetros e um exemplo
 * de resposta. O título vira um <h2> (entra no índice "Nesta página").
 */
export function Endpoint({
  titulo,
  metodo,
  caminho,
  permissao,
  children,
  pathParams,
  query,
  body,
  resposta,
}: {
  titulo: string
  metodo: 'GET' | 'POST'
  caminho: string
  permissao: ReactNode
  children?: ReactNode
  pathParams?: Param[]
  query?: Param[]
  body?: Param[]
  resposta?: string
}) {
  return (
    <section className="mt-14 first:mt-0">
      <H2>{titulo}</H2>
      <div className="mt-4 flex min-w-0 items-center gap-3 overflow-x-auto rounded-xl border border-asphalt-200 bg-concrete-50 px-4 py-3 dark:border-asphalt-800 dark:bg-asphalt-900">
        <MethodBadge metodo={metodo} />
        <code className="whitespace-nowrap font-mono text-sm text-asphalt-950 dark:text-white">{caminho}</code>
      </div>
      <p className="mt-3 text-sm text-asphalt-500 dark:text-asphalt-400">
        <span className="font-mono text-xs uppercase tracking-wider">Quem pode chamar:</span> {permissao}
      </p>
      {children}
      {pathParams && <ParamTable titulo="Parâmetros do caminho" params={pathParams} />}
      {query && <ParamTable titulo="Parâmetros de consulta (query)" params={query} />}
      {body && <ParamTable titulo="Corpo da requisição (JSON)" params={body} />}
      {resposta && <Code titulo="Resposta 200 — exemplo">{resposta}</Code>}
    </section>
  )
}
