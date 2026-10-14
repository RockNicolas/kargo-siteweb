import { useEffect, useRef, useState } from 'react'
import { Check, CheckCircle2, Inbox, Pause, Play, User } from 'lucide-react'
import { tituloEtapas, tituloExemplos } from '../../data/content'
import type { TituloExemplo } from '../../data/content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Demonstração do ciclo completo: cadastro no Kargo → conferência → título criado no
 * Contas a Pagar do Sienge → baixa pelo financeiro → Kargo marca como pago.
 *
 * Reproduz sozinha quando está na tela, pausa ao passar o mouse/focar e para de vez quando
 * a pessoa clica num passo (ela assumiu o controle). Todos os dados são fictícios.
 */

const ETAPA_MS = 3600
/** O último passo (já pago) fica um pouco mais na tela antes de recomeçar. */
const FOLGA_FINAL_MS = 1600
const ULTIMA = tituloEtapas.length - 1

const EMPRESA_EXEMPLO = '1 — Construtora Horizonte'
const CENTRO_CUSTO_EXEMPLO = '112'

type SituacaoParcela = 'aberta' | 'ligada' | 'paga'

/** `curto` é o rótulo do celular: com o nome completo a linha da parcela não cabe em 350px. */
const CHIP_KARGO: Record<SituacaoParcela, { label: string; curto: string; classe: string }> = {
  aberta: {
    label: 'A pagar',
    curto: 'A pagar',
    classe: 'border-[var(--k-border)] bg-[var(--k-elevated)] text-[var(--k-muted)]',
  },
  ligada: {
    label: 'Aguarda baixa',
    curto: 'Aguarda',
    classe: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
  paga: {
    label: 'Pago pelo Sienge',
    curto: 'Pago',
    classe: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  },
}

const LINHA_PARCELA =
  'grid grid-cols-[1.25rem_minmax(0,1fr)_auto_auto] items-center gap-x-2 border-t px-3 py-1.5 text-xs sm:grid-cols-[1.75rem_minmax(0,1fr)_auto_auto] sm:gap-x-3'

function JanelaBarra({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 border-b px-4 py-2.5 ${
        claro ? 'border-asphalt-200 bg-concrete-50' : 'border-[var(--k-border)] bg-[var(--k-sidebar)]'
      }`}
    >
      <span className="flex gap-1.5" aria-hidden>
        <span className={`h-2.5 w-2.5 rounded-full ${claro ? 'bg-asphalt-200' : 'bg-white/15'}`} />
        <span className={`h-2.5 w-2.5 rounded-full ${claro ? 'bg-asphalt-200' : 'bg-white/15'}`} />
        <span className={`h-2.5 w-2.5 rounded-full ${claro ? 'bg-asphalt-200' : 'bg-white/15'}`} />
      </span>
      {children}
    </div>
  )
}

function ChipKargo({ situacao }: { situacao: SituacaoParcela }) {
  const c = CHIP_KARGO[situacao]
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase transition-colors duration-500 ${c.classe}`}
    >
      {situacao === 'paga' ? <CheckCircle2 className="h-3 w-3" strokeWidth={3} aria-hidden /> : null}
      <span className="sm:hidden">{c.curto}</span>
      <span className="hidden sm:inline">{c.label}</span>
    </span>
  )
}

function ParcelasKargo({ ex, situacao }: { ex: TituloExemplo; situacao: SituacaoParcela }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)]/60">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--k-muted)]">
          {ex.pagamento} · {ex.parcelas.length}x
        </p>
        <p className="text-sm font-black tabular-nums text-[var(--k-text)]">{ex.total}</p>
      </div>
      <ul>
        {ex.parcelas.map((p, i) => (
          <li
            key={p.vencimento}
            className={`${LINHA_PARCELA} border-[var(--k-border)]/60 text-[var(--k-text)]`}
          >
            <span className="font-bold text-[var(--k-muted)]">{i + 1}ª</span>
            <span className="tabular-nums">{p.vencimento}</span>
            <span className="text-right font-semibold tabular-nums">{p.valor}</span>
            <ChipKargo situacao={situacao} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Campo({ rotulo, valor, className = '' }: { rotulo: string; valor: string; className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--k-muted)]">{rotulo}</p>
      <p className="truncate text-xs font-semibold text-[var(--k-text)]" title={valor}>
        {valor}
      </p>
    </div>
  )
}

function PainelKargo({ ex, etapa }: { ex: TituloExemplo; etapa: number }) {
  const Icone = ex.icon
  const situacao: SituacaoParcela = etapa >= 3 ? 'paga' : etapa === 2 ? 'ligada' : 'aberta'
  const conferindo = etapa === 1
  const rotuloEtapa = conferindo ? 'Passo 2 de 2 · conferir' : etapa >= 2 ? 'Pronto' : 'Cadastro'

  return (
    <div className="kargo-shell flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--k-border)] bg-[var(--k-bg)] text-[var(--k-text)] shadow-2xl shadow-black/40">
      <JanelaBarra>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img src="/KargoLogo.png" alt="" className="h-4 w-4 shrink-0 rounded-sm" />
          <p className="min-w-0 truncate text-xs font-bold">
            Kargo <span className="font-medium text-[var(--k-muted)]">· {ex.janela}</span>
          </p>
        </div>
        <span className="shrink-0 font-mono text-[9px] font-medium uppercase tracking-widest text-[var(--k-muted)]">
          {rotuloEtapa}
        </span>
      </JanelaBarra>

      <div
        key={etapa >= 2 ? 'resultado' : etapa}
        className="animate-demo-in flex min-h-[28rem] flex-1 flex-col gap-3 p-4"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--k-cta)]/15 text-[var(--k-cta)]">
            <Icone className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black">{ex.ativo}</p>
            <p className="truncate text-xs text-[var(--k-muted)]">
              {ex.resumo} · {ex.credor}
            </p>
          </div>
        </div>

        {etapa === 0 ? (
          <>
            <ParcelasKargo ex={ex} situacao="aberta" />
            <div className="mt-auto space-y-2.5">
              <div className="flex w-full items-center gap-3 rounded-xl border-2 border-[var(--k-cta)] bg-[var(--k-cta)] px-3 py-2.5 text-white shadow-[0_8px_24px_-8px_rgba(237,137,54,0.55)]">
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-black leading-tight">Criar título ao salvar</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-white/90">
                    Abre a conferência no Contas a Pagar
                  </span>
                </span>
                <span aria-hidden className="relative h-6 w-11 shrink-0 rounded-full bg-white">
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 translate-x-5 rounded-full bg-[var(--k-cta)] shadow" />
                </span>
              </div>
              <div className="flex justify-end">
                <span className="inline-flex h-9 items-center rounded-lg bg-[var(--k-cta)] px-5 text-[11px] font-bold uppercase text-white">
                  Salvar
                </span>
              </div>
            </div>
          </>
        ) : null}

        {etapa === 1 ? (
          <>
            <p className="text-xs text-[var(--k-muted)]">
              É exatamente isto que vai ser lançado no Contas a Pagar do Sienge.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)]/60 p-3">
              <Campo rotulo="Empresa" valor={EMPRESA_EXEMPLO} />
              <Campo rotulo="Credor" valor={ex.credor} />
              <Campo rotulo="Documento" valor={`${ex.documento} · ${ex.numero}`} />
              <Campo rotulo="Emissão" valor={ex.emissao} />
              <Campo rotulo="Centro de custo" valor={`${CENTRO_CUSTO_EXEMPLO} — ${ex.obra}`} />
              <Campo rotulo="Plano financeiro" valor={ex.plano} />
              <Campo rotulo="Parcelas" valor={`${ex.parcelas.length}x · ${ex.total}`} />
              <Campo rotulo="Indexador" valor="0 — REAL" />
              <Campo className="col-span-2" rotulo="Observação" valor={ex.observacao} />
            </div>
            <div className="mt-auto space-y-2.5">
              <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[var(--k-cta)] text-white">
                  <Check className="h-3 w-3" strokeWidth={4} aria-hidden />
                </span>
                Conferi os dados. O título vai para o financeiro no Sienge.
              </div>
              <div className="flex justify-end">
                <span className="inline-flex h-9 items-center rounded-lg bg-[var(--k-cta)] px-4 text-[11px] font-bold uppercase text-white">
                  Criar título no Sienge
                </span>
              </div>
            </div>
          </>
        ) : null}

        {etapa >= 2 ? (
          <>
            <div
              className={`rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
                etapa >= 3
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-sky-500/40 bg-sky-500/10'
              }`}
            >
              <p
                className={`flex items-center gap-2 text-sm font-black ${
                  etapa >= 3 ? 'text-emerald-400' : 'text-sky-300'
                }`}
              >
                <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />
                {etapa >= 3 ? 'Pago · confirmado pelo Sienge' : `Título ${ex.titulo} criado no Sienge`}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--k-muted)]">
                {etapa >= 3
                  ? `Título ${ex.titulo} · situação “Totalmente paga”. A confirmação fica guardada como prova.`
                  : 'Cada boleto ficou ligado à sua parcela. Quando o financeiro der a baixa, o Kargo marca como pago sozinho.'}
              </p>
            </div>
            <ParcelasKargo ex={ex} situacao={situacao} />
            <ul className="mt-auto space-y-1.5 rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)]/40 px-3 py-2.5 text-[11px] text-[var(--k-muted)]">
              <li className="flex items-center gap-2">
                <User className="h-3 w-3 shrink-0" aria-hidden />
                <span>
                  Título criado por <b className="font-bold text-[var(--k-text)]">{ex.usuario}</b>
                </span>
              </li>
              {etapa >= 3 ? (
                <li className="animate-demo-in flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={3} aria-hidden />
                  <span>
                    Baixa confirmada por <b className="font-bold text-[var(--k-text)]">Sienge (automático)</b>
                  </span>
                </li>
              ) : null}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  )
}

function PainelSienge({ ex, etapa }: { ex: TituloExemplo; etapa: number }) {
  const criado = etapa >= 2
  const paga = etapa >= 3

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-asphalt-200 bg-white text-asphalt-900 shadow-2xl shadow-black/40">
      <JanelaBarra claro>
        <img src="/sienge-logo-real.png" alt="Sienge" className="h-6 w-auto shrink-0" />
        <p className="min-w-0 flex-1 truncate text-xs font-semibold text-asphalt-500">· Contas a Pagar</p>
      </JanelaBarra>

      <div className="flex min-h-[32.5rem] flex-1 flex-col p-4">
        {!criado ? (
          <div className="animate-demo-in flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-asphalt-200 px-6 py-10 text-center">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-concrete-100 text-asphalt-400">
              <Inbox className="h-5 w-5" aria-hidden />
            </span>
            <p className="font-display text-base font-semibold text-asphalt-700">Nenhum título ainda</p>
            <p className="max-w-[16rem] text-xs leading-relaxed text-asphalt-500">
              O título aparece aqui assim que o Kargo enviar, já com as parcelas.
            </p>
          </div>
        ) : (
          <div className="animate-demo-in flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-xl font-semibold text-asphalt-950">
                Título <span className="tabular-nums">nº {ex.titulo}</span>
              </p>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                Completo
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-asphalt-200 bg-concrete-50 p-3 text-xs">
              {[
                ['Credor', ex.credor],
                ['Documento', `${ex.documento} · ${ex.numero}`],
                ['Empresa', EMPRESA_EXEMPLO],
                ['Emissão', ex.emissao],
                ['Centro de custo', `${CENTRO_CUSTO_EXEMPLO} — ${ex.obra}`],
                ['Plano financeiro', ex.plano],
              ].map(([rotulo, valor]) => (
                <div key={rotulo} className="min-w-0">
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-asphalt-400">
                    {rotulo}
                  </dt>
                  <dd className="truncate font-semibold text-asphalt-800" title={valor}>
                    {valor}
                  </dd>
                </div>
              ))}
              <div className="col-span-2 min-w-0">
                <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-asphalt-400">
                  Observação
                </dt>
                <dd className="truncate font-semibold text-asphalt-800" title={ex.observacao}>
                  {ex.observacao}
                </dd>
              </div>
            </dl>

            <div className="overflow-hidden rounded-lg border border-asphalt-200">
              <div className="flex items-center justify-between bg-concrete-50 px-3 py-2">
                <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-asphalt-500">
                  Parcelas · {ex.parcelas.length}x
                </p>
                <p className="text-sm font-black tabular-nums text-asphalt-900">{ex.total}</p>
              </div>
              <ul>
                {ex.parcelas.map((p, i) => (
                  <li
                    key={p.vencimento}
                    className={`${LINHA_PARCELA} border-asphalt-200`}
                  >
                    <span className="font-bold text-asphalt-400">{i + 1}</span>
                    <span className="tabular-nums text-asphalt-700">{p.vencimento}</span>
                    <span className="text-right font-semibold tabular-nums text-asphalt-900">{p.valor}</span>
                    <span
                      style={{ transitionDelay: paga ? `${i * 220}ms` : '0ms' }}
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase transition-colors duration-500 ${
                        paga
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-amber-200 bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span className="sm:hidden">{paga ? 'Paga' : 'Não paga'}</span>
                      <span className="hidden sm:inline">{paga ? 'Totalmente paga' : 'Não paga'}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {paga ? (
              <p className="mt-auto text-[11px] leading-relaxed text-asphalt-500">
                Baixa lançada pelo financeiro, na própria tela do Sienge.
              </p>
            ) : (
              <p className="mt-auto text-[11px] leading-relaxed text-asphalt-500">
                Aguardando a baixa do financeiro.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Pista({
  rotulo,
  sentido,
  ativa,
  concluida,
  cor,
}: {
  rotulo: string
  sentido: 'direita' | 'esquerda'
  ativa: boolean
  concluida: boolean
  cor: 'sinal' | 'ok'
}) {
  const bg = cor === 'sinal' ? 'bg-signal-500' : 'bg-emerald-500'
  const brilho = cor === 'sinal' ? 'shadow-[0_0_14px_3px_rgba(240,83,12,0.7)]' : 'shadow-[0_0_14px_3px_rgba(16,185,129,0.7)]'
  const texto = cor === 'sinal' ? 'text-signal-400' : 'text-emerald-400'
  return (
    <div className="min-w-0">
      <p
        className={`font-mono text-[10px] font-medium uppercase tracking-widest transition-colors duration-500 ${
          ativa || concluida ? texto : 'text-asphalt-500'
        }`}
      >
        {rotulo}
      </p>
      <div className="relative mt-2.5 h-0.5 rounded-full bg-white/10">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ${bg} ${
            concluida ? 'w-full' : 'w-0'
          }`}
        />
        {ativa ? (
          <span
            className={`absolute -top-1 h-2.5 w-2.5 rounded-full ${bg} ${brilho} ${
              sentido === 'direita' ? 'animate-lane-right' : 'animate-lane-left'
            }`}
          />
        ) : null}
      </div>
    </div>
  )
}

export function TituloFlowDemo() {
  const reduzido = usePrefersReducedMotion()
  const raizRef = useRef<HTMLDivElement>(null)
  const [fonteIdx, setFonteIdx] = useState(0)
  const [etapa, setEtapa] = useState(0)
  const [auto, setAuto] = useState(true)
  const [pausado, setPausado] = useState(false)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = raizRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisivel(entry.isIntersecting), {
      threshold: 0.3,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Sem movimento: mostra direto o ciclo completo e deixa a pessoa navegar pelos passos.
  useEffect(() => {
    if (!reduzido) return
    setAuto(false)
    setEtapa(ULTIMA)
  }, [reduzido])

  const rodando = auto && visivel && !pausado && !reduzido
  const duracao = etapa === ULTIMA ? ETAPA_MS + FOLGA_FINAL_MS : ETAPA_MS

  useEffect(() => {
    if (!rodando) return
    const id = window.setTimeout(() => {
      if (etapa < ULTIMA) {
        setEtapa(etapa + 1)
      } else {
        setFonteIdx((i) => (i + 1) % tituloExemplos.length)
        setEtapa(0)
      }
    }, duracao)
    return () => window.clearTimeout(id)
  }, [rodando, etapa, fonteIdx, duracao])

  const ex = tituloExemplos[fonteIdx]

  const escolherFonte = (i: number) => {
    setFonteIdx(i)
    setEtapa(reduzido ? ULTIMA : 0)
  }

  const escolherEtapa = (i: number) => {
    setAuto(false)
    setEtapa(i)
  }

  const alternarReproducao = () => {
    if (auto) {
      setAuto(false)
    } else {
      setAuto(true)
      setPausado(false)
    }
  }

  return (
    <div
      ref={raizRef}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div
          role="tablist"
          aria-label="O que vira título no Sienge"
          className="flex flex-wrap justify-center gap-2 sm:justify-start"
        >
          {tituloExemplos.map((f, i) => {
            const Icone = f.icon
            const ativa = i === fonteIdx
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={ativa}
                onClick={() => escolherFonte(i)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  ativa
                    ? 'border-signal-500 bg-signal-500 text-asphalt-950 shadow-lg shadow-signal-500/30'
                    : 'border-white/15 bg-white/5 text-asphalt-200 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <Icone className="h-4 w-4" aria-hidden />
                {f.label}
              </button>
            )
          })}
        </div>

        {!reduzido ? (
          <button
            type="button"
            onClick={alternarReproducao}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-asphalt-300 transition hover:border-white/40 hover:text-white"
          >
            {auto ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            {auto ? 'Pausar' : 'Reproduzir'}
          </button>
        ) : null}
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tituloEtapas.map((e, i) => {
          const ativa = i === etapa
          const feita = i < etapa
          return (
            <li key={e.titulo}>
              <button
                type="button"
                onClick={() => escolherEtapa(i)}
                aria-current={ativa ? 'step' : undefined}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left transition ${
                  ativa
                    ? 'border-signal-500/60 bg-signal-500/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                    ativa
                      ? 'bg-signal-500 text-asphalt-950'
                      : feita
                        ? 'bg-signal-500/20 text-signal-400'
                        : 'bg-white/10 text-asphalt-300'
                  }`}
                >
                  {feita ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : i + 1}
                </span>
                <span
                  className={`text-sm font-semibold leading-tight ${ativa ? 'text-white' : 'text-asphalt-300'}`}
                >
                  {e.titulo}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5" aria-hidden>
                  {ativa ? (
                    <span
                      key={`${fonteIdx}-${i}-${rodando}`}
                      className={`block h-full bg-signal-500 ${rodando ? 'animate-step-fill' : 'opacity-60'}`}
                      style={{ ['--step-ms' as string]: `${duracao}ms` }}
                    />
                  ) : feita ? (
                    <span className="block h-full bg-signal-500/50" />
                  ) : null}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <p
        key={`${fonteIdx}-${etapa}`}
        className="animate-demo-in mx-auto mt-5 min-h-[3.25rem] max-w-3xl text-center text-base leading-relaxed text-asphalt-200 sm:min-h-[3.5rem]"
      >
        {tituloEtapas[etapa].descricao}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_8.5rem_minmax(0,1fr)] lg:items-stretch lg:gap-4">
        <PainelKargo ex={ex} etapa={etapa} />

        <div
          aria-hidden
          className="grid grid-cols-2 gap-4 px-1 lg:flex lg:flex-col lg:justify-center lg:gap-14 lg:px-0"
        >
          <Pista
            rotulo="Kargo → Sienge"
            sentido="direita"
            ativa={etapa === 2}
            concluida={etapa >= 2}
            cor="sinal"
          />
          <Pista
            rotulo="Sienge → Kargo"
            sentido="esquerda"
            ativa={etapa === 3}
            concluida={etapa >= 3}
            cor="ok"
          />
        </div>

        <PainelSienge ex={ex} etapa={etapa} />
      </div>

      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-widest text-asphalt-500">
        Exemplo ilustrativo · nomes, valores e números de título são fictícios
      </p>
    </div>
  )
}
