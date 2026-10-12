import { useEffect, useMemo, useState } from 'react'
import { BarChart3, CalendarDays, Table2 } from 'lucide-react'
import type { CustoId, DemoMes } from '../../data/painelDiretoriaDemo.types'
import { Cartao, Rotulo } from './blocos'
import { formatarMoeda, formatarMoedaCompacta, maiuscula } from './formatos'
import { TIPOS_CUSTO } from './modulos'

export interface CoresPainel {
  isDark: boolean
  custo: Record<CustoId, string>
  tinta: string
  tintaSuave: string
  grade: string
  superficie: string
  apagado: string
  destaque: string
  bom: string
  ruim: string
  alerta: string
}

/** Mede o elemento (largura e altura) — o gráfico é desenhado na medida da caixa, como no sistema. */
function useMedida<T extends HTMLElement>() {
  const [el, setEl] = useState<T | null>(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setDims({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) }),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el])

  return [setEl, dims] as const
}

function eixoMoeda(valor: number) {
  if (!valor) return 'R$ 0'
  return formatarMoedaCompacta(valor).replace(/\s/g, ' ')
}

function eixoCompacto(valor: number) {
  if (!valor) return '0'
  return Number(valor).toLocaleString('pt-BR', { notation: 'compact', maximumFractionDigits: 0 })
}

function marcaMes(p: DemoMes) {
  if (p.parcial) return '*'
  if (p.implantacao) return '†'
  return ''
}

function rotuloTabela(p: DemoMes) {
  const texto = maiuscula(p.rotulo)
  if (p.parcial) return `${texto} (até hoje)`
  if (p.implantacao) return `${texto} (implantação)`
  return texto
}

/** Barra com cantos arredondados só em cima (a pilha de custos termina arredondada). */
function caminhoTopo(x: number, y: number, largura: number, altura: number, raio: number) {
  const r = Math.min(raio, largura / 2, altura)
  return `M${x},${y + altura} V${y + r} Q${x},${y} ${x + r},${y} H${x + largura - r} Q${x + largura},${y} ${x + largura},${y + r} V${y + altura} Z`
}

function TabelaMensal({ serie, tipos }: { serie: DemoMes[]; tipos: typeof TIPOS_CUSTO }) {
  return (
    <div>
      <p className="operacao-tabela-dica">Deslize a tabela para ver todos os valores.</p>
      <div className="mt-3 overflow-x-auto" role="region" aria-label="Tabela mensal de receitas e custos" tabIndex={0}>
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead>
            <tr className="border-b border-kargo-border text-[10px] uppercase tracking-wider text-kargo-muted">
              <th className="py-2 pr-3 font-bold">Mês</th>
              <th className="py-2 pr-3 text-right font-bold">Receita</th>
              {tipos.map((t) => (
                <th key={t.id} className="py-2 pr-3 text-right font-bold">
                  {t.rotulo}
                </th>
              ))}
              <th className="py-2 pr-3 text-right font-bold">Custo</th>
              <th className="py-2 text-right font-bold">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {serie.map((p) => (
              <tr
                key={p.mes}
                className={`border-b border-kargo-border/50 ${p.selecionado ? 'font-bold text-kargo-text' : 'text-kargo-muted'}`}
              >
                <td className="whitespace-nowrap py-1.5 pr-3">{rotuloTabela(p)}</td>
                <td className="py-1.5 pr-3 text-right tabular-nums">{formatarMoeda(p.receita)}</td>
                {tipos.map((t) => (
                  <td key={t.id} className="py-1.5 pr-3 text-right tabular-nums">
                    {formatarMoeda(p[t.id])}
                  </td>
                ))}
                <td className="py-1.5 pr-3 text-right tabular-nums">{formatarMoeda(p.custo)}</td>
                <td className={`py-1.5 text-right tabular-nums ${p.resultado >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {p.resultado < 0 ? '−' : ''}
                  {formatarMoeda(Math.abs(p.resultado))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Mês a mês: custos empilhados por tipo e a receita como linha — a régua que o custo não pode
 * passar. O período escolhido fica em cor cheia; os meses de contexto, apagados. A receita do mês
 * em andamento é proporcional aos dias corridos: o último trecho vai tracejado, até um ponto vazado.
 */
export function GraficoMensal({ serie, cores }: { serie: DemoMes[]; cores: CoresPainel }) {
  const [verTabela, setVerTabela] = useState(false)
  const [foco, setFoco] = useState<number | null>(null)
  const [refGrafico, dims] = useMedida<HTMLDivElement>()
  const tipos = useMemo(() => TIPOS_CUSTO.filter((t) => serie.some((p) => p[t.id] > 0)), [serie])
  const compacto = dims.width > 0 && dims.width < 480

  const W = dims.width
  const H = dims.height
  const esquerda = compacto ? 44 : 88
  const direita = 8
  const topo = 8
  const base = H - 8 - 28
  const n = Math.max(serie.length, 1)
  const banda = (W - esquerda - direita) / n
  const larguraBarra = Math.min(26, banda * 0.72)

  const maximo = Math.max(...serie.map((p) => Math.max(p.receita, p.custo)), 0)
  const bruto = maximo / 4 || 1
  const metade = 10 ** Math.floor(Math.log10(bruto)) / 2
  const passo = Math.ceil(bruto / metade) * metade
  const ticks = [0, 1, 2, 3, 4].map((i) => i * passo)
  const escala = ticks[4]
  const y = (valor: number) => base - (valor / escala) * (base - topo)
  const xCentro = (i: number) => esquerda + (i + 0.5) * banda

  // Trecho cheio: meses fechados; trecho tracejado: do último fechado até o mês em andamento.
  const fechados = serie.map((p, i) => ({ p, i })).filter(({ p }) => !p.parcial)
  const linhaCheia = fechados.map(({ p, i }) => `${xCentro(i)},${y(p.receita)}`).join(' ')
  const iParcial = serie.findIndex((p) => p.parcial)
  const linhaTracejada =
    iParcial > 0
      ? `${xCentro(iParcial - 1)},${y(serie[iParcial - 1].receita)} ${xCentro(iParcial)},${y(serie[iParcial].receita)}`
      : null

  const pontoFoco = foco != null ? serie[foco] : null
  const larguraTooltip = 220
  const leftTooltip =
    foco != null ? Math.min(Math.max(xCentro(foco) - larguraTooltip / 2, 0), Math.max(W - larguraTooltip, 0)) : 0
  const temMarca = serie.some((p) => p.parcial || p.implantacao)

  return (
    <Cartao className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <Rotulo icone={BarChart3}>Receita × custos, mês a mês</Rotulo>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Legenda">
            <li className="flex items-center gap-1.5 text-xs text-kargo-muted">
              <span className="h-0.5 w-4 rounded" style={{ backgroundColor: cores.tinta }} aria-hidden />
              Receita
            </li>
            {tipos.map((t) => (
              <li key={t.id} className="flex items-center gap-1.5 text-xs text-kargo-muted">
                <span className="size-2.5 rounded-sm" style={{ backgroundColor: cores.custo[t.id] }} aria-hidden />
                {t.rotulo}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setVerTabela((v) => !v)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-kargo-border px-3 text-xs font-bold text-kargo-text transition hover:border-kargo-cta/60 hover:text-kargo-cta"
          aria-pressed={verTabela}
        >
          {verTabela ? <BarChart3 size={14} aria-hidden /> : <Table2 size={14} aria-hidden />}
          {verTabela ? 'Ver gráfico' : 'Ver tabela'}
        </button>
      </div>

      {verTabela ? (
        <TabelaMensal serie={serie} tipos={tipos} />
      ) : (
        <div ref={refGrafico} className="relative mt-3 min-h-[280px] w-full flex-1">
          {W > 0 && H > 0 ? (
            <div className="absolute inset-0" onMouseLeave={() => setFoco(null)}>
              <svg width={W} height={H} role="img" aria-label="Receita e custos por mês">
                {ticks.map((t) => (
                  <g key={t}>
                    <line x1={esquerda} x2={W - direita} y1={y(t)} y2={y(t)} stroke={cores.grade} strokeWidth={1} />
                    <text x={esquerda - 8} y={y(t) + 4} textAnchor="end" fontSize={compacto ? 10 : 11} fill={cores.tintaSuave}>
                      {compacto ? eixoCompacto(t) : eixoMoeda(t)}
                    </text>
                  </g>
                ))}

                {foco != null ? (
                  <rect
                    x={esquerda + foco * banda}
                    y={topo}
                    width={banda}
                    height={base - topo}
                    fill={cores.grade}
                    fillOpacity={0.35}
                  />
                ) : null}

                {serie.map((p, i) => {
                  const x = xCentro(i) - larguraBarra / 2
                  let acumulado = 0
                  const segmentos = tipos.filter((t) => p[t.id] > 0)
                  return (
                    <g key={p.mes} opacity={p.selecionado ? (p.implantacao ? 0.6 : 1) : 0.3}>
                      {segmentos.map((t, idx) => {
                        const altura = (p[t.id] / escala) * (base - topo)
                        const yTopo = base - acumulado - altura
                        acumulado += altura
                        const ultimo = idx === segmentos.length - 1
                        return ultimo ? (
                          <path
                            key={t.id}
                            d={caminhoTopo(x, yTopo, larguraBarra, altura, 4)}
                            fill={cores.custo[t.id]}
                            stroke={cores.superficie}
                            strokeWidth={2}
                          />
                        ) : (
                          <rect
                            key={t.id}
                            x={x}
                            y={yTopo}
                            width={larguraBarra}
                            height={altura}
                            fill={cores.custo[t.id]}
                            stroke={cores.superficie}
                            strokeWidth={2}
                          />
                        )
                      })}
                    </g>
                  )
                })}

                <line x1={esquerda} x2={W - direita} y1={base} y2={base} stroke={cores.grade} />

                {fechados.length > 1 ? (
                  <polyline fill="none" stroke={cores.tinta} strokeWidth={2} points={linhaCheia} />
                ) : null}
                {linhaTracejada ? (
                  <polyline
                    fill="none"
                    stroke={cores.tinta}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    points={linhaTracejada}
                  />
                ) : null}
                {serie.map((p, i) => (
                  <circle
                    key={p.mes}
                    cx={xCentro(i)}
                    cy={y(p.receita)}
                    r={4}
                    fill={p.parcial ? cores.superficie : cores.tinta}
                    stroke={p.parcial ? cores.tinta : cores.superficie}
                    strokeWidth={2}
                  />
                ))}

                {serie.map((p, i) => (
                  <text
                    key={p.mes}
                    x={xCentro(i)}
                    y={base + 18}
                    textAnchor="middle"
                    fontSize={compacto ? 10 : 11}
                    fontStyle={p.implantacao ? 'italic' : 'normal'}
                    fontWeight={p.selecionado ? 800 : 500}
                    fill={p.selecionado ? cores.tinta : cores.tintaSuave}
                  >
                    {`${compacto ? p.rotulo.slice(0, 3) : p.rotulo}${marcaMes(p)}`}
                  </text>
                ))}

                {serie.map((p, i) => (
                  <rect
                    key={p.mes}
                    x={esquerda + i * banda}
                    y={topo}
                    width={banda}
                    height={H - topo}
                    fill="transparent"
                    onMouseEnter={() => setFoco(i)}
                    onClick={() => setFoco(i)}
                  />
                ))}
              </svg>

              {pontoFoco ? (
                <div
                  className="pointer-events-none absolute top-2 rounded-xl border px-3 py-2.5 text-xs shadow-xl"
                  style={{
                    left: leftTooltip,
                    width: larguraTooltip,
                    background: cores.superficie,
                    borderColor: cores.grade,
                    color: cores.tinta,
                  }}
                >
                  <p className="font-black">
                    {maiuscula(pontoFoco.rotuloLongo)}
                    {pontoFoco.parcial ? (
                      <span className="ml-1 font-bold normal-case" style={{ color: cores.tintaSuave }}>
                        · até hoje
                      </span>
                    ) : null}
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-1.5" style={{ color: cores.tintaSuave }}>
                        <span className="h-0.5 w-3 rounded" style={{ backgroundColor: cores.tinta }} aria-hidden />
                        Receita
                      </span>
                      <span className="font-black tabular-nums">{formatarMoeda(pontoFoco.receita)}</span>
                    </li>
                    {tipos.map((t) => (
                      <li key={t.id} className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5" style={{ color: cores.tintaSuave }}>
                          <span className="h-0.5 w-3 rounded" style={{ backgroundColor: cores.custo[t.id] }} aria-hidden />
                          {t.rotulo}
                        </span>
                        <span className="font-bold tabular-nums">{formatarMoeda(pontoFoco[t.id])}</span>
                      </li>
                    ))}
                    <li
                      className="flex items-center justify-between gap-4 border-t pt-1"
                      style={{ borderColor: cores.grade }}
                    >
                      <span style={{ color: cores.tintaSuave }}>Custo total</span>
                      <span className="font-black tabular-nums">{formatarMoeda(pontoFoco.custo)}</span>
                    </li>
                    <li className="flex items-center justify-between gap-4">
                      <span style={{ color: cores.tintaSuave }}>
                        {pontoFoco.resultado >= 0 ? 'Lucro da operação' : 'Prejuízo da operação'}
                      </span>
                      <span
                        className="font-black tabular-nums"
                        style={{ color: pontoFoco.resultado >= 0 ? cores.bom : cores.ruim }}
                      >
                        {formatarMoeda(Math.abs(pontoFoco.resultado))}
                      </span>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
      {!verTabela && temMarca ? (
        <div className="mt-1 space-y-0.5 text-[11px] text-kargo-muted">
          {serie.some((p) => p.parcial) ? <p>* mês em andamento: valores até hoje.</p> : null}
          {serie.some((p) => p.implantacao) ? (
            <p>† implantação do Kargo: ativos ainda sendo cadastrados, receita incompleta.</p>
          ) : null}
        </div>
      ) : null}
    </Cartao>
  )
}

export function MapaMensal({ serie, cores }: { serie: DemoMes[]; cores: CoresPainel }) {
  const [selecionado, setSelecionado] = useState(
    () => [...serie].reverse().find((mes) => mes.selecionado)?.mes || serie[serie.length - 1]?.mes,
  )
  const escala = Math.max(...serie.map((mes) => Math.abs(mes.resultado)), 0)
  const foco = serie.find((mes) => mes.mes === selecionado)
  const positivo = cores.isDark ? '#34d399' : '#047857'
  const negativo = cores.isDark ? '#fb7185' : '#be123c'
  const cor = (valor: number) => (valor < 0 ? negativo : positivo)

  return (
    <Cartao className="operacao-mapa-cartao">
      <Rotulo icone={CalendarDays}>Resultado mês a mês</Rotulo>
      <p className="operacao-mapa-descricao">
        A intensidade indica o tamanho do lucro ou prejuízo. Toque em um mês para consultar os números.
      </p>
      <div className="operacao-mapa-meses" role="group" aria-label="Mapa mensal do resultado">
        {serie.map((mes) => {
          const intensidade = escala > 0 ? 8 + (Math.abs(mes.resultado) / escala) * 32 : 0
          return (
            <button
              key={mes.mes}
              type="button"
              aria-pressed={selecionado === mes.mes}
              onClick={() => setSelecionado(mes.mes)}
              aria-label={`${mes.rotuloLongo}: ${formatarMoeda(mes.resultado)}${mes.parcial ? ', até hoje' : ''}`}
              style={
                {
                  '--mes-cor': cor(mes.resultado),
                  '--mes-intensidade': `${intensidade}%`,
                } as React.CSSProperties
              }
            >
              <span>
                {mes.rotulo}
                {marcaMes(mes)}
              </span>
              <strong>{formatarMoedaCompacta(mes.resultado)}</strong>
            </button>
          )
        })}
      </div>
      <div className="operacao-mapa-legenda">
        <span>
          <i style={{ background: positivo }} /> Lucro
        </span>
        <span>
          <i style={{ background: negativo }} /> Prejuízo
        </span>
      </div>
      {foco ? (
        <div className="operacao-mapa-detalhe" aria-live="polite">
          <h3>
            {maiuscula(foco.rotuloLongo)}
            {foco.parcial ? ' · até hoje' : ''}
          </h3>
          <dl>
            <div>
              <dt>Receita</dt>
              <dd>{formatarMoeda(foco.receita)}</dd>
            </div>
            <div>
              <dt>Custos</dt>
              <dd>{formatarMoeda(foco.custo)}</dd>
            </div>
            <div>
              <dt>Resultado</dt>
              <dd>{formatarMoeda(foco.resultado)}</dd>
            </div>
          </dl>
        </div>
      ) : null}
      {serie.some((mes) => mes.parcial) ? (
        <p className="operacao-grafico-nota">* Período em andamento: valores até hoje.</p>
      ) : null}
    </Cartao>
  )
}
