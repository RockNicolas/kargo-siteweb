import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Maximize2,
  Minimize2,
  Minus,
  Pause,
  Play,
  Presentation,
  X,
} from 'lucide-react'
import type { DemoModulo, PainelPeriodo } from '../../data/painelDiretoriaDemo.types'
import type { CoresPainel } from './evolucao'
import { MODULO_ICONE, TIPOS_CUSTO } from './modulos'
import {
  formatarInteiro,
  formatarMoeda,
  formatarMoedaCompacta,
  formatarPct,
  maiuscula as cap,
} from './formatos'

/**
 * Apresentação em slides do Painel da diretoria — a do sistema (ApresentacaoSlides.jsx), em tela
 * cheia: setas (ou clique) passam os slides, Esc sai, F alterna tela cheia, P liga o "passar
 * sozinho". Os números são os do painel, no período que está na tela. Aqui só a exibição: baixar em
 * PDF, PowerPoint e Excel é do sistema.
 */

const SLIDE_LARGURA = 1600
const SLIDE_ALTURA = 900
const SEGUNDOS_POR_SLIDE = 12

const semAno = (r: string) => String(r || '').replace(/ de \d{4}$/, '')

interface Slide {
  id: string
  tipo: 'capa' | 'resultado' | 'composicao' | 'evolucao' | 'comparativo' | 'causas' | 'pontos' | 'area' | 'leitura'
  titulo: string
  modelo?: DemoModulo
}

/** Slide sem dado não entra: um slide vazio na reunião passa a ideia de que o sistema falhou. */
function montarSlides(p: PainelPeriodo): Slide[] {
  const slides: Slide[] = [
    { id: 'capa', tipo: 'capa', titulo: 'Capa' },
    { id: 'resultado', tipo: 'resultado', titulo: 'Resultado do período' },
  ]
  if (p.composicao.some((c) => c.valor > 0)) {
    slides.push({ id: 'composicao', tipo: 'composicao', titulo: 'Para onde foi o dinheiro' })
  }
  if (p.serie.length >= 2 && p.serie.some((s) => s.custo > 0 || (s.receita || 0) > 0)) {
    slides.push({ id: 'evolucao', tipo: 'evolucao', titulo: 'Mês a mês' })
  }
  if (p.comparativo) slides.push({ id: 'comparativo', tipo: 'comparativo', titulo: 'Contra o período anterior' })
  if (p.comparativo?.causas.length) slides.push({ id: 'causas', tipo: 'causas', titulo: 'Por que mudou' })
  if (p.pontos.length) slides.push({ id: 'pontos', tipo: 'pontos', titulo: 'O que olhar primeiro' })
  for (const modelo of p.modelos) {
    slides.push({ id: `area-${modelo.id}`, tipo: 'area', titulo: modelo.id, modelo })
  }
  slides.push({ id: 'leitura', tipo: 'leitura', titulo: 'Como ler estes números' })
  return slides
}

function regrasDeLeitura(p: PainelPeriodo) {
  const modulos = new Set(p.modulos)
  const entra: string[] = []
  if (modulos.has('frota') && p.contas.temReceita) entra.push('Receita: valor mensal do contrato de cada ativo')
  if (modulos.has('combustivel')) entra.push('Combustível: abastecimentos lançados')
  if (modulos.has('manutencao')) entra.push('Manutenção: boletos e PIX já pagos')
  if (modulos.has('documentacao')) entra.push('Multas, IPVA e licenciamento: o que já foi pago')
  const naoEntra: string[] = []
  if (modulos.has('manutencao')) naoEntra.push('Serviço feito e ainda não pago (fica "a pagar")')
  if (modulos.has('almoxarifado')) naoEntra.push('Material consumido do almoxarifado')
  naoEntra.push('Despesas que não são lançadas no Kargo')
  return { entra, naoEntra }
}

function plural(n: number, singular: string, varios: string) {
  return Math.round(n) === 1 ? singular : varios
}

/** Subir é bom (receita, resultado) ou ruim (custo)? Cor sempre com seta e sinal junto. */
function tomDaVariacao(valor: number | null | undefined, subirEhBom: boolean) {
  if (valor == null || Math.abs(valor) < 0.005) return 'neutro' as const
  return valor > 0 === subirEhBom ? ('bom' as const) : ('ruim' as const)
}

function Selo({
  texto,
  tom,
  cores,
  tamanho = 22,
}: {
  texto: string
  tom: 'bom' | 'ruim' | 'neutro'
  cores: CoresPainel
  tamanho?: number
}) {
  const cor = tom === 'bom' ? cores.bom : tom === 'ruim' ? cores.ruim : cores.tintaSuave
  const Icone = tom === 'neutro' ? Minus : texto.startsWith('−') ? ArrowDownRight : ArrowUpRight
  return (
    <span
      className="inline-flex items-center gap-[8px] whitespace-nowrap rounded-full border px-[16px] py-[6px] font-bold tabular-nums"
      style={{ color: cor, borderColor: `${cor}66`, background: `${cor}1a`, fontSize: tamanho }}
    >
      <Icone size={tamanho} aria-hidden />
      {texto}
    </span>
  )
}

function textoVariacaoPct(fracao: number | null | undefined, rotulo: string) {
  if (fracao == null || !Number.isFinite(fracao)) return null
  if (Math.abs(fracao) < 0.0005) return `igual a ${rotulo}`
  return `${fracao > 0 ? '+' : '−'}${formatarPct(Math.abs(fracao))} vs ${rotulo}`
}

function textoVariacaoMoeda(delta: number, pct: number | null) {
  if (Math.abs(delta) < 0.005) return 'igual'
  const sinal = delta > 0 ? '+' : '−'
  return `${sinal}${formatarMoedaCompacta(Math.abs(delta))}${pct != null ? ` (${sinal}${formatarPct(Math.abs(pct))})` : ''}`
}

interface MolduraInfo {
  cabecalho: string
  numero: number
  total: number
}

/** Moldura comum: cabeçalho fino, título grande e o conteúdo ocupando o resto do slide. */
function Moldura({
  cabecalho,
  numero,
  total,
  eyebrow,
  titulo,
  subtitulo,
  children,
}: MolduraInfo & { eyebrow?: string; titulo: ReactNode; subtitulo?: string | null; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col px-[96px] pb-[64px] pt-[48px]">
      <header className="flex items-center justify-between gap-[24px] text-[18px] text-kargo-muted">
        <span className="flex min-w-0 items-center gap-[14px] font-semibold">
          <span className="whitespace-nowrap">{cabecalho}</span>
        </span>
        <span className="shrink-0 tabular-nums">
          {numero} / {total}
        </span>
      </header>
      <div className="mt-[32px]">
        {eyebrow ? <p className="text-[18px] font-black uppercase tracking-[0.28em] text-kargo-cta">{eyebrow}</p> : null}
        <h2 className="mt-[10px] text-[54px] font-bold leading-[1.08] tracking-[-0.02em] text-kargo-text">{titulo}</h2>
        {subtitulo ? <p className="mt-[14px] max-w-[1320px] text-[24px] leading-[1.4] text-kargo-muted">{subtitulo}</p> : null}
      </div>
      <div className="mt-[40px] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

interface SlideProps {
  painel: PainelPeriodo
  cores: CoresPainel
  moldura: MolduraInfo
}

function SlideCapa({ painel, empresa, tema }: { painel: PainelPeriodo; empresa: string; tema: 'dark' | 'light' }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-[110px] py-[84px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[260px] -top-[320px] size-[860px] rounded-full bg-kargo-cta/10 blur-[120px]"
      />
      <div className="relative flex items-center gap-[28px]">
        <img src={tema === 'dark' ? '/Kargo.png' : '/Kargo-light.png'} alt="Kargo" className="h-[64px] w-auto" />
        <span className="h-[64px] w-px bg-kargo-border" aria-hidden />
        <span className="text-[30px] font-semibold text-kargo-text">{empresa}</span>
      </div>
      <div className="relative">
        <p className="text-[22px] font-black uppercase tracking-[0.32em] text-kargo-cta">Painel da diretoria</p>
        <h1 className="mt-[18px] text-[104px] font-bold leading-[1] tracking-[-0.03em] text-kargo-text">
          {cap(painel.rotulo)}
          {painel.emAndamento ? (
            <span className="ml-[24px] text-[40px] font-semibold text-kargo-muted">até hoje</span>
          ) : null}
        </h1>
        {painel.frase ? (
          <p className="mt-[36px] max-w-[1220px] text-[30px] leading-[1.4] text-kargo-muted">{painel.frase}</p>
        ) : null}
      </div>
      <p className="relative text-[20px] text-kargo-muted">Dados de demonstração</p>
    </div>
  )
}

function SlideResultado({ painel, cores, moldura }: SlideProps) {
  const { contas, comparacao } = painel
  const vs = comparacao?.rotulo ? semAno(comparacao.rotulo) : ''
  const tiles = [
    {
      id: 'receita',
      rotulo: 'Receita dos contratos',
      valor: formatarMoedaCompacta(contas.receita),
      exato: formatarMoeda(contas.receita),
      apoio: `${formatarInteiro(contas.ativosComReceita)} ${plural(contas.ativosComReceita, 'ativo', 'ativos')} com contrato`,
      variacao: comparacao?.receita,
      subirEhBom: true,
      cor: undefined as string | undefined,
    },
    {
      id: 'custo',
      rotulo: 'Custo da operação',
      valor: formatarMoedaCompacta(contas.custoTotal),
      exato: formatarMoeda(contas.custoTotal),
      apoio: 'gastos lançados no período',
      variacao: comparacao?.custoTotal,
      subirEhBom: false,
      cor: undefined,
    },
    {
      id: 'resultado',
      rotulo: contas.resultadoOperacao >= 0 ? 'Resultado da operação' : 'Prejuízo da operação',
      valor: formatarMoedaCompacta(contas.resultadoOperacao),
      exato: formatarMoeda(contas.resultadoOperacao),
      apoio: 'receita menos todos os custos',
      variacao: comparacao?.resultadoOperacao,
      subirEhBom: true,
      cor: contas.resultadoOperacao >= 0 ? cores.bom : cores.ruim,
    },
    {
      id: 'margem',
      rotulo: 'Margem da operação',
      valor: formatarPct(contas.margemOperacao),
      exato: formatarPct(contas.margemOperacao, 1),
      apoio: 'da receita que sobra',
      variacao: undefined,
      subirEhBom: true,
      cor: (contas.margemOperacao ?? 0) >= 0 ? cores.bom : cores.ruim,
    },
  ]
  return (
    <Moldura
      {...moldura}
      eyebrow="Resultado"
      titulo={painel.modoAno ? `Como foi ${painel.rotulo}` : `Como fechou ${painel.rotulo}`}
    >
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-[28px]">
        {tiles.map((t) => {
          const texto = textoVariacaoPct(t.variacao, vs)
          return (
            <div
              key={t.id}
              data-interativo
              className="group flex min-w-0 flex-col justify-between rounded-[28px] border border-kargo-border bg-kargo-sidebar px-[44px] py-[34px] transition-colors hover:border-kargo-cta/50"
            >
              <p className="text-[24px] font-semibold text-kargo-muted">{t.rotulo}</p>
              <p
                className="mt-[10px] text-[84px] font-bold leading-none tracking-[-0.03em] tabular-nums"
                style={{ color: t.cor || 'var(--k-text)' }}
              >
                {t.valor}
              </p>
              {t.exato && t.exato !== t.valor ? (
                <p className="mt-[8px] text-[24px] font-semibold tabular-nums text-kargo-muted opacity-0 transition-opacity group-hover:opacity-100">
                  {t.exato}
                </p>
              ) : null}
              <div className="mt-[18px] flex flex-wrap items-center justify-between gap-[16px]">
                <span className="text-[22px] text-kargo-muted">{t.apoio}</span>
                {texto ? <Selo texto={texto} tom={tomDaVariacao(t.variacao, t.subirEhBom)} cores={cores} /> : null}
              </div>
            </div>
          )
        })}
      </div>
    </Moldura>
  )
}

function SlideComposicao({ painel, cores, moldura }: SlideProps) {
  const itens = painel.composicao.filter((c) => c.valor > 0)
  const maior = itens[0]
  return (
    <Moldura
      {...moldura}
      eyebrow="Custos"
      titulo="Para onde foi o dinheiro"
      subtitulo={
        maior
          ? maior.pct >= 0.995
            ? `Todo o custo de ${painel.rotulo} foi de ${maior.rotulo.toLowerCase()}.`
            : `${maior.rotulo} foi ${formatarPct(maior.pct)} do custo de ${painel.rotulo}.`
          : null
      }
    >
      <div className="grid h-full grid-cols-[440px_1fr] items-center gap-[96px]">
        <div>
          <p className="text-[24px] text-kargo-muted">Custo total</p>
          <p className="mt-[10px] text-[88px] font-bold leading-none tracking-[-0.03em] tabular-nums text-kargo-text">
            {formatarMoedaCompacta(painel.contas.custoTotal)}
          </p>
          <p className="mt-[16px] text-[22px] text-kargo-muted">
            em {formatarInteiro(itens.length)} {plural(itens.length, 'tipo de custo', 'tipos de custo')}
          </p>
        </div>
        <ul className="space-y-[18px]">
          {itens.map((c) => (
            <li
              key={c.id}
              data-interativo
              className="group -mx-[20px] rounded-[20px] px-[20px] py-[10px] transition-colors hover:bg-kargo-sidebar"
            >
              <div className="flex items-baseline justify-between gap-[24px]">
                <span className="text-[30px] font-semibold text-kargo-text">{c.rotulo}</span>
                <span className="text-[30px] font-bold tabular-nums text-kargo-text">
                  <span className="group-hover:hidden">{formatarMoedaCompacta(c.valor)}</span>
                  <span className="hidden group-hover:inline">{formatarMoeda(c.valor)}</span>
                  <span className="ml-[14px] text-[24px] font-semibold text-kargo-muted">
                    <span className="group-hover:hidden">{formatarPct(c.pct)}</span>
                    <span className="hidden group-hover:inline">{formatarPct(c.pct, 1)}</span>
                  </span>
                </span>
              </div>
              <div className="mt-[14px] h-[22px] w-full overflow-hidden rounded-full" style={{ background: cores.grade }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.max(c.pct * 100, 1.5)}%`, background: cores.custo[c.id] }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Moldura>
  )
}

/** Gráfico do slide "Mês a mês": desenhado em 1408×440 (a largura útil do slide), escalado pelo palco. */
function GraficoSlide({ painel, cores }: { painel: PainelPeriodo; cores: CoresPainel }) {
  const [foco, setFoco] = useState<number | null>(null)
  const serie = painel.serie
  const tipos = TIPOS_CUSTO.filter((t) => serie.some((p) => p[t.id] > 0))
  const temReceita = serie.some((p) => (p.receita || 0) > 0)
  const W = 1408
  const H = 440
  const esquerda = 96
  const topo = 12
  const base = H - 40
  const banda = (W - esquerda - 16) / serie.length
  const larguraBarra = Math.min(96, banda * 0.7)
  const maximo = Math.max(...serie.map((p) => Math.max(p.receita, p.custo)), 0)
  const bruto = maximo / 4 || 1
  const metade = 10 ** Math.floor(Math.log10(bruto)) / 2
  const passo = Math.ceil(bruto / metade) * metade
  const ticks = [0, 1, 2, 3, 4].map((i) => i * passo)
  const escala = ticks[4]
  const y = (v: number) => base - (v / escala) * (base - topo)
  const xc = (i: number) => esquerda + (i + 0.5) * banda
  const eixo = (v: number) =>
    v ? Number(v).toLocaleString('pt-BR', { notation: 'compact', maximumFractionDigits: 0 }) : '0'
  const p = foco != null ? serie[foco] : null

  return (
    <div className="relative h-[440px] w-full" data-interativo onMouseLeave={() => setFoco(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Receita e custos por mês">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={esquerda} x2={W - 16} y1={y(t)} y2={y(t)} stroke={cores.grade} strokeDasharray="4 6" />
            <text x={esquerda - 14} y={y(t) + 7} textAnchor="end" fontSize={20} fill={cores.tintaSuave}>
              {eixo(t)}
            </text>
          </g>
        ))}
        {foco != null ? (
          <rect x={esquerda + foco * banda} y={topo} width={banda} height={base - topo} fill={cores.grade} opacity={0.4} />
        ) : null}
        {serie.map((s, i) => {
          let acumulado = 0
          return (
            <g key={s.mes} opacity={s.selecionado ? 1 : 0.45}>
              {tipos
                .filter((t) => s[t.id] > 0)
                .map((t) => {
                  const altura = (s[t.id] / escala) * (base - topo)
                  const yTopo = base - acumulado - altura
                  acumulado += altura
                  return (
                    <rect
                      key={t.id}
                      x={xc(i) - larguraBarra / 2}
                      y={yTopo}
                      width={larguraBarra}
                      height={altura}
                      fill={cores.custo[t.id]}
                    />
                  )
                })}
            </g>
          )
        })}
        <line x1={esquerda} x2={W - 16} y1={base} y2={base} stroke={cores.grade} />
        {temReceita ? (
          <>
            <polyline
              fill="none"
              stroke={cores.tinta}
              strokeWidth={4}
              points={serie.map((s, i) => `${xc(i)},${y(s.receita)}`).join(' ')}
            />
            {serie.map((s, i) => (
              <circle key={s.mes} cx={xc(i)} cy={y(s.receita)} r={7} fill={cores.superficie} stroke={cores.tinta} strokeWidth={3} />
            ))}
          </>
        ) : null}
        {serie.map((s, i) => (
          <text key={s.mes} x={xc(i)} y={base + 28} textAnchor="middle" fontSize={22} fill={cores.tintaSuave}>
            {`${s.rotulo}${s.parcial ? '*' : ''}`}
          </text>
        ))}
        {serie.map((s, i) => (
          <rect
            key={s.mes}
            x={esquerda + i * banda}
            y={topo}
            width={banda}
            height={H - topo}
            fill="transparent"
            onMouseEnter={() => setFoco(i)}
          />
        ))}
      </svg>
      {p ? (
        <div
          className="pointer-events-none absolute top-0 min-w-[340px] rounded-[18px] border px-[24px] py-[18px] shadow-2xl"
          style={{
            left: Math.min(Math.max(xc(foco as number) - 170, 0), W - 360),
            background: cores.superficie,
            borderColor: cores.grade,
            color: cores.tinta,
          }}
        >
          <p className="text-[22px] font-bold">
            {cap(p.rotuloLongo)}
            {p.parcial ? (
              <span className="ml-[8px] text-[18px] font-semibold" style={{ color: cores.tintaSuave }}>
                até hoje
              </span>
            ) : null}
          </p>
          <div className="mt-[12px] space-y-[8px] text-[19px]">
            {tipos
              .filter((t) => p[t.id] > 0)
              .map((t) => (
                <p key={t.id} className="flex items-center justify-between gap-[28px]">
                  <span className="inline-flex items-center gap-[10px]">
                    <span className="size-[14px] rounded-[4px]" style={{ background: cores.custo[t.id] }} aria-hidden />
                    {t.rotulo}
                  </span>
                  <span className="font-bold tabular-nums">{formatarMoeda(p[t.id])}</span>
                </p>
              ))}
            <p
              className="flex items-center justify-between gap-[28px] border-t pt-[10px] font-bold"
              style={{ borderColor: cores.grade }}
            >
              <span>Custo total</span>
              <span className="tabular-nums">{formatarMoeda(p.custo)}</span>
            </p>
            {temReceita ? (
              <>
                <p className="flex items-center justify-between gap-[28px]">
                  <span style={{ color: cores.tintaSuave }}>Receita</span>
                  <span className="font-bold tabular-nums">{formatarMoeda(p.receita)}</span>
                </p>
                <p className="flex items-center justify-between gap-[28px]">
                  <span style={{ color: cores.tintaSuave }}>{p.resultado >= 0 ? 'Resultado' : 'Prejuízo'}</span>
                  <span className="font-bold tabular-nums" style={{ color: p.resultado >= 0 ? cores.bom : cores.ruim }}>
                    {formatarMoeda(p.resultado)}
                  </span>
                </p>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SlideEvolucao({ painel, cores, moldura }: SlideProps) {
  const serie = painel.serie
  const tipos = TIPOS_CUSTO.filter((t) => serie.some((p) => p[t.id] > 0))
  const temReceita = serie.some((p) => (p.receita || 0) > 0)
  const parcial = serie.some((p) => p.parcial)
  return (
    <Moldura
      {...moldura}
      eyebrow="Tendência"
      titulo="Mês a mês"
      subtitulo={`${temReceita ? 'Custos empilhados por tipo; a linha é a receita dos contratos.' : 'Custos de cada mês, por tipo.'} Passe o mouse num mês para ver os valores.`}
    >
      <GraficoSlide painel={painel} cores={cores} />
      <div className="mt-[20px] flex flex-wrap items-center gap-x-[40px] gap-y-[10px] text-[22px] text-kargo-muted">
        {tipos.map((t) => (
          <span key={t.id} className="inline-flex items-center gap-[12px]">
            <span className="size-[18px] rounded-[5px]" style={{ background: cores.custo[t.id] }} aria-hidden />
            {t.rotulo}
          </span>
        ))}
        {temReceita ? (
          <span className="inline-flex items-center gap-[12px]">
            <span className="h-[4px] w-[30px] rounded" style={{ background: cores.tinta }} aria-hidden />
            Receita
          </span>
        ) : null}
        {parcial ? <span className="ml-auto">* mês em andamento, até hoje</span> : null}
      </div>
    </Moldura>
  )
}

function SlideComparativo({ painel, cores, moldura }: SlideProps) {
  const c = painel.comparativo
  if (!c) return null
  const mesmoAno = c.atual.slice(-4) === c.anterior.slice(-4)
  const antes = cap(mesmoAno ? semAno(c.anterior) : c.anterior)
  const cartoes = [...c.linhas.slice(0, 1), ...c.tipos.slice(0, 4)]
  return (
    <Moldura
      {...moldura}
      eyebrow={painel.modoAno ? 'Ano contra ano' : 'Mês contra mês'}
      titulo={`${cap(c.atual)} contra ${c.anterior}`}
      subtitulo={c.frase}
    >
      <div className="grid gap-[24px]" style={{ gridTemplateColumns: `repeat(${cartoes.length}, minmax(0, 1fr))` }}>
        {cartoes.map((l, i) => {
          const max = Math.max(Math.abs(l.atual), Math.abs(l.anterior), 1)
          const tom = tomDaVariacao(l.delta, l.subirEhBom)
          const corAtual = tom === 'bom' ? cores.bom : tom === 'ruim' ? cores.ruim : cores.tintaSuave
          return (
            <div
              key={l.id}
              data-interativo
              className={`group flex min-w-0 flex-col rounded-[28px] border bg-kargo-sidebar px-[30px] py-[30px] transition-colors hover:border-kargo-cta ${i === 0 ? 'border-kargo-cta/50' : 'border-kargo-border'}`}
            >
              <p className="flex items-center gap-[12px] text-[20px] font-bold uppercase tracking-[0.14em] text-kargo-muted">
                {l.id !== 'custo' ? (
                  <span
                    className="size-[16px] rounded-[4px]"
                    style={{ background: cores.custo[l.id as keyof typeof cores.custo] }}
                    aria-hidden
                  />
                ) : null}
                {l.rotulo}
              </p>
              <p className="mt-[16px] text-[46px] font-bold leading-none tracking-[-0.02em] tabular-nums text-kargo-text">
                {formatarMoedaCompacta(l.atual)}
              </p>
              <div className="mt-[16px]">
                <Selo texto={textoVariacaoMoeda(l.delta, l.pct)} tom={tom} cores={cores} tamanho={20} />
              </div>
              <div className="mt-auto space-y-[12px] pt-[28px] text-[19px]">
                {(
                  [
                    [antes, l.anterior, cores.apagado],
                    [mesmoAno ? cap(semAno(c.atual)) : cap(c.atual), l.atual, corAtual],
                  ] as [string, number, string][]
                ).map(([rotulo, valor, cor]) => (
                  <div key={rotulo}>
                    <div className="flex justify-between gap-[12px] text-kargo-muted">
                      <span>{rotulo}</span>
                      <span className="tabular-nums group-hover:hidden">{formatarMoedaCompacta(valor)}</span>
                      <span className="hidden tabular-nums text-kargo-text group-hover:inline">{formatarMoeda(valor)}</span>
                    </div>
                    <div className="mt-[6px] h-[12px] w-full overflow-hidden rounded-full" style={{ background: cores.grade }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.max((Math.abs(valor) / max) * 100, valor ? 2 : 0)}%`, background: cor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {c.avisos.length ? (
        <p className="mt-auto flex items-start gap-[12px] pt-[24px] text-[20px] leading-snug" style={{ color: cores.alerta }}>
          <AlertTriangle size={24} className="mt-[2px] shrink-0" aria-hidden />
          {c.avisos[0]}
        </p>
      ) : null}
    </Moldura>
  )
}

function SlideCausas({ painel, cores, moldura }: SlideProps) {
  const c = painel.comparativo
  if (!c) return null
  const causas = c.causas.slice(0, 3)
  return (
    <Moldura
      {...moldura}
      eyebrow="Análise das causas"
      titulo="Por que mudou"
      subtitulo={`O que mais pesou na diferença de ${c.anterior} para ${c.atual}.`}
    >
      <div className="grid h-full gap-[28px]" style={{ gridTemplateColumns: `repeat(${causas.length}, minmax(0, 1fr))` }}>
        {causas.map((causa) => {
          const subiu = causa.delta > 0
          const cor = subiu ? cores.ruim : cores.bom
          const Icone = subiu ? ArrowUpRight : ArrowDownRight
          return (
            <div
              key={causa.id}
              className="flex min-w-0 flex-col rounded-[28px] border border-kargo-border bg-kargo-sidebar px-[36px] py-[34px]"
            >
              <p className="flex items-start gap-[14px] text-[32px] font-bold leading-[1.15] text-kargo-text">
                <Icone size={36} className="mt-[2px] shrink-0" style={{ color: cor }} aria-hidden />
                {causa.titulo}
              </p>
              <p className="mt-[12px] text-[21px] leading-snug text-kargo-muted">{causa.resumo}</p>
              <ul className="mt-[22px] space-y-[14px] border-t border-kargo-border pt-[22px]">
                {causa.pontos.slice(0, 3).map((ponto) => (
                  <li key={ponto} className="flex gap-[12px] text-[20px] leading-[1.4] text-kargo-text">
                    <span className="mt-[11px] size-[8px] shrink-0 rounded-full" style={{ background: cor }} aria-hidden />
                    <span className="line-clamp-4">{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Moldura>
  )
}

function SlidePontos({ painel, cores, moldura }: SlideProps) {
  const lista = painel.pontos.slice(0, 6)
  const temAlerta = lista.some((p) => p.nivel !== 'bom')
  const colunas = lista.length <= 2 ? lista.length : lista.length === 4 ? 2 : 3
  return (
    <Moldura {...moldura} eyebrow="Pontos de atenção" titulo={temAlerta ? 'O que olhar primeiro' : 'A operação está folgada'}>
      <div className="grid gap-[24px]" style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}>
        {lista.map((p) => {
          const cor = p.nivel === 'risco' ? cores.ruim : p.nivel === 'bom' ? cores.bom : cores.alerta
          const Icone = p.nivel === 'bom' ? Check : AlertTriangle
          return (
            <div
              key={p.id}
              className="flex min-w-0 gap-[20px] rounded-[26px] border border-kargo-border bg-kargo-sidebar px-[30px] py-[28px]"
            >
              <span
                className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-full"
                style={{ background: `${cor}22`, color: cor }}
              >
                <Icone size={28} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[26px] font-bold leading-[1.2] text-kargo-text">{p.titulo}</p>
                <p className="mt-[10px] line-clamp-4 text-[20px] leading-[1.4] text-kargo-muted">{p.texto}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Moldura>
  )
}

function SlideArea({ slide, cores, moldura }: { slide: Slide; cores: CoresPainel; moldura: MolduraInfo }) {
  const m = slide.modelo
  if (!m) return null
  const { icone: Icone, nome } = MODULO_ICONE[m.id]
  const tamanhoDestaque = m.destaque.length <= 8 ? 120 : m.destaque.length <= 12 ? 96 : 76
  return (
    <Moldura
      {...moldura}
      eyebrow="Área da operação"
      titulo={
        <span className="inline-flex items-center gap-[22px]">
          <span className="inline-flex rounded-[18px] bg-kargo-cta/15 p-[14px] text-kargo-cta">
            <Icone size={42} strokeWidth={2.25} aria-hidden />
          </span>
          {nome}
        </span>
      }
    >
      <div className="grid h-full grid-cols-[1fr_1.1fr] gap-[80px]">
        <div className="flex min-w-0 flex-col justify-center">
          <p
            className="font-bold leading-[0.95] tracking-[-0.03em] tabular-nums text-kargo-text"
            style={{ fontSize: tamanhoDestaque }}
          >
            {m.destaque}
          </p>
          <p className="mt-[22px] text-[28px] leading-snug text-kargo-muted">{m.legenda}</p>
          {m.aviso ? (
            <p className="mt-[40px] flex items-start gap-[14px] text-[26px] leading-snug" style={{ color: cores.alerta }}>
              <AlertTriangle size={30} className="mt-[2px] shrink-0" aria-hidden />
              {m.aviso}
            </p>
          ) : null}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-[22px]">
          {m.vazio ? (
            <p className="text-[28px] leading-[1.45] text-kargo-muted">{m.vazio}</p>
          ) : (
            m.estatisticas.map((e) => (
              <div
                key={e.rotulo}
                className="flex items-center justify-between gap-[24px] rounded-[24px] border border-kargo-border bg-kargo-sidebar px-[36px] py-[26px]"
              >
                <div className="min-w-0">
                  <p className="text-[20px] font-bold uppercase tracking-[0.16em] text-kargo-muted">{e.rotulo}</p>
                  {e.detalhe ? <p className="mt-[6px] text-[20px] text-kargo-muted">{e.detalhe}</p> : null}
                </div>
                <p className="shrink-0 text-[50px] font-bold tabular-nums text-kargo-text">{e.valor}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Moldura>
  )
}

function SlideLeitura({ painel, cores, moldura }: SlideProps) {
  const { entra, naoEntra } = regrasDeLeitura(painel)
  const avisos = painel.avisos.slice(0, 3)
  return (
    <Moldura
      {...moldura}
      eyebrow="Para conferir"
      titulo="Como ler estes números"
      subtitulo="O painel soma o que está lançado no Kargo, mês a mês."
    >
      <div className="grid grid-cols-2 gap-[64px]">
        <div>
          <h3 className="flex items-center gap-[12px] text-[28px] font-bold text-kargo-text">
            <Check size={30} style={{ color: cores.bom }} aria-hidden />
            Entra na conta
          </h3>
          <ul className="mt-[18px] space-y-[14px] text-[23px] leading-snug text-kargo-muted">
            {entra.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3 className="mt-[40px] flex items-center gap-[12px] text-[28px] font-bold text-kargo-text">
            <X size={30} style={{ color: cores.ruim }} aria-hidden />
            Não entra
          </h3>
          <ul className="mt-[18px] space-y-[14px] text-[23px] leading-snug text-kargo-muted">
            {naoEntra.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3
            className="flex items-center gap-[12px] text-[28px] font-bold"
            style={{ color: avisos.length ? cores.alerta : cores.bom }}
          >
            {avisos.length ? <AlertTriangle size={30} aria-hidden /> : <Check size={30} aria-hidden />}
            {avisos.length ? 'Atenção aos dados deste período' : 'Nenhum aviso sobre os dados'}
          </h3>
          {avisos.length ? (
            <ul className="mt-[18px] space-y-[18px] text-[22px] leading-[1.45] text-kargo-muted">
              {avisos.map((t) => (
                <li key={t} className="line-clamp-4">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Moldura>
  )
}

function ConteudoSlide({
  slide,
  painel,
  cores,
  moldura,
  empresa,
  tema,
}: {
  slide: Slide
  painel: PainelPeriodo
  cores: CoresPainel
  moldura: MolduraInfo
  empresa: string
  tema: 'dark' | 'light'
}) {
  const props = { painel, cores, moldura }
  switch (slide.tipo) {
    case 'capa':
      return <SlideCapa painel={painel} empresa={empresa} tema={tema} />
    case 'resultado':
      return <SlideResultado {...props} />
    case 'composicao':
      return <SlideComposicao {...props} />
    case 'evolucao':
      return <SlideEvolucao {...props} />
    case 'comparativo':
      return <SlideComparativo {...props} />
    case 'causas':
      return <SlideCausas {...props} />
    case 'pontos':
      return <SlidePontos {...props} />
    case 'area':
      return <SlideArea slide={slide} cores={cores} moldura={moldura} />
    case 'leitura':
      return <SlideLeitura {...props} />
    default:
      return null
  }
}

function BotaoControle({
  rotulo,
  onClick,
  children,
  ativo = false,
  disabled = false,
}: {
  rotulo: string
  onClick: () => void
  children: ReactNode
  ativo?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={rotulo}
      title={rotulo}
      className={`inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition disabled:opacity-30 ${
        ativo ? 'bg-kargo-cta text-white' : 'text-kargo-text hover:bg-kargo-bg-deep/60'
      }`}
    >
      {children}
    </button>
  )
}

function proximoIndice(atual: number, total: number, passo: number, circular = false) {
  if (!(total > 0)) return 0
  const alvo = atual + passo
  if (circular) return ((alvo % total) + total) % total
  return Math.min(Math.max(alvo, 0), total - 1)
}

export function Apresentacao({
  painel,
  cores,
  empresa,
  tema,
  onFechar,
}: {
  painel: PainelPeriodo
  cores: CoresPainel
  empresa: string
  /** Tema do painel de onde a apresentação foi aberta (não o do site). */
  tema: 'dark' | 'light'
  onFechar: () => void
}) {
  const slides = useMemo(() => montarSlides(painel), [painel])
  const total = slides.length
  const [indice, setIndice] = useState(0)
  const [tocando, setTocando] = useState(false)
  const [controlesVisiveis, setControlesVisiveis] = useState(true)
  const [telaCheia, setTelaCheia] = useState(false)
  const [aviso, setAviso] = useState('')
  const [tela, setTela] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const raizRef = useRef<HTMLDivElement>(null)
  const ocultarRef = useRef<number | undefined>(undefined)
  const toqueRef = useRef<{ x: number; y: number } | null>(null)

  const atual = slides[Math.min(indice, total - 1)]
  const escala = Math.min(tela.w / SLIDE_LARGURA, tela.h / SLIDE_ALTURA) || 1
  const molduraDe = (i: number): MolduraInfo => ({
    cabecalho: `${empresa} · Painel da diretoria · ${cap(painel.rotulo)}`,
    numero: i + 1,
    total,
  })

  const sairTelaCheia = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  }
  const entrarTelaCheia = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
  }
  const fechar = () => {
    sairTelaCheia()
    onFechar()
  }
  const passar = (passo: number) => setIndice((i) => proximoIndice(i, total, passo))

  const mostrarControles = () => {
    setControlesVisiveis(true)
    window.clearTimeout(ocultarRef.current)
    ocultarRef.current = window.setTimeout(() => setControlesVisiveis(false), 2800)
  }

  useEffect(() => {
    raizRef.current?.focus()
    const corpoAntes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ocultarRef.current = window.setTimeout(() => setControlesVisiveis(false), 3500)
    const aoRedimensionar = () => setTela({ w: window.innerWidth, h: window.innerHeight })
    const aoMudarTelaCheia = () => setTelaCheia(Boolean(document.fullscreenElement))
    window.addEventListener('resize', aoRedimensionar)
    document.addEventListener('fullscreenchange', aoMudarTelaCheia)
    return () => {
      document.body.style.overflow = corpoAntes
      window.clearTimeout(ocultarRef.current)
      window.removeEventListener('resize', aoRedimensionar)
      document.removeEventListener('fullscreenchange', aoMudarTelaCheia)
    }
  }, [])

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const emBotao = Boolean((e.target as HTMLElement | null)?.closest?.('button'))
      const k = e.key
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || ((k === ' ' || k === 'Enter') && !emBotao)) {
        e.preventDefault()
        setIndice((i) => proximoIndice(i, total, 1))
      } else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') {
        e.preventDefault()
        setIndice((i) => proximoIndice(i, total, -1))
      } else if (k === 'Home') {
        e.preventDefault()
        setIndice(0)
      } else if (k === 'End') {
        e.preventDefault()
        setIndice(Math.max(total - 1, 0))
      } else if (k === 'Escape') {
        e.preventDefault()
        if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
        onFechar()
      } else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
        else document.documentElement.requestFullscreen?.().catch(() => {})
      } else if (k === 'p' || k === 'P') {
        setTocando((t) => !t)
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [total, onFechar])

  // Passar sozinho: recomeça a contar a cada troca de slide e volta ao início no fim.
  useEffect(() => {
    if (!tocando || total < 2) return undefined
    const id = window.setTimeout(() => setIndice((i) => proximoIndice(i, total, 1, true)), SEGUNDOS_POR_SLIDE * 1000)
    return () => window.clearTimeout(id)
  }, [tocando, indice, total])

  useEffect(() => {
    if (!aviso) return undefined
    const id = window.setTimeout(() => setAviso(''), 4200)
    return () => window.clearTimeout(id)
  }, [aviso])

  if (!atual) return null

  const nomeSlide = atual.tipo === 'area' && atual.modelo ? MODULO_ICONE[atual.modelo.id].nome : atual.titulo

  // Clique no fundo do slide avança (como no PowerPoint); clique num gráfico ou cartão não, pra dar
  // pra explorar os números com o mouse. Arrastar pro lado no toque também troca.
  const aoTocar = (e: React.PointerEvent) => {
    toqueRef.current = { x: e.clientX, y: e.clientY }
  }
  const aoSoltar = (e: React.PointerEvent) => {
    const inicio = toqueRef.current
    toqueRef.current = null
    if (!inicio) return
    const dx = e.clientX - inicio.x
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - inicio.y)) passar(dx < 0 ? 1 : -1)
    else if (Math.abs(dx) < 8 && !(e.target as HTMLElement).closest('[data-interativo]')) passar(1)
  }

  const baixar = (formato: string) =>
    setAviso(`No Kargo, este botão baixa a apresentação em ${formato}. Aqui é uma demonstração.`)

  return createPortal(
    <div className={`kargo-shell ${tema === 'dark' ? 'painel-tema-escuro' : 'painel-tema-claro'}`}>
      <div
        ref={raizRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Apresentação do painel da diretoria"
        onMouseMove={mostrarControles}
        className={`fixed inset-0 z-[100] overflow-hidden overscroll-contain bg-kargo-bg text-kargo-text outline-none ${
          controlesVisiveis ? '' : 'cursor-none'
        }`}
      >
        <p className="sr-only" aria-live="polite">
          Slide {indice + 1} de {total}: {nomeSlide}
        </p>

        <div className="absolute inset-0 flex items-center justify-center" onPointerDown={aoTocar} onPointerUp={aoSoltar}>
          <div className="relative" style={{ width: SLIDE_LARGURA * escala, height: SLIDE_ALTURA * escala }}>
            <div
              className="absolute left-0 top-0 overflow-hidden"
              style={{
                width: SLIDE_LARGURA,
                height: SLIDE_ALTURA,
                transform: `scale(${escala})`,
                transformOrigin: 'top left',
              }}
              data-slide={atual.id}
            >
              <div key={atual.id} className="apresentacao-slide-entrada h-full w-full">
                <ConteudoSlide
                  slide={atual}
                  painel={painel}
                  cores={cores}
                  moldura={molduraDe(indice)}
                  empresa={empresa}
                  tema={tema}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[4px] bg-kargo-border/40" aria-hidden>
          <div
            className="h-full bg-kargo-cta transition-[width] duration-300"
            style={{ width: `${((indice + 1) / total) * 100}%` }}
          />
        </div>

        {aviso ? (
          <p
            className="absolute bottom-24 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border border-kargo-cta/40 bg-kargo-sidebar px-4 py-2.5 text-center text-sm font-semibold text-kargo-text shadow-xl"
            role="status"
          >
            {aviso}
          </p>
        ) : null}

        <div
          className={`absolute bottom-5 left-1/2 flex max-w-[96vw] -translate-x-1/2 items-center gap-1 rounded-2xl border border-kargo-border bg-kargo-sidebar/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur transition-opacity duration-300 ${
            controlesVisiveis ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onMouseEnter={mostrarControles}
        >
          <BotaoControle rotulo="Slide anterior (←)" onClick={() => passar(-1)} disabled={indice === 0}>
            <ChevronLeft size={20} />
          </BotaoControle>
          <span className="min-w-[4.5rem] text-center text-sm font-bold tabular-nums text-kargo-text">
            {indice + 1} / {total}
          </span>
          <BotaoControle rotulo="Próximo slide (→)" onClick={() => passar(1)} disabled={indice === total - 1}>
            <ChevronRight size={20} />
          </BotaoControle>
          <span className="mx-1 h-6 w-px bg-kargo-border" aria-hidden />
          <BotaoControle
            rotulo={tocando ? 'Pausar (P)' : `Passar sozinho a cada ${SEGUNDOS_POR_SLIDE} s (P)`}
            onClick={() => setTocando((t) => !t)}
            ativo={tocando}
          >
            {tocando ? <Pause size={18} /> : <Play size={18} />}
            <span className="hidden sm:inline">{tocando ? 'Pausar' : 'Passar sozinho'}</span>
          </BotaoControle>
          <span className="mx-1 hidden h-6 w-px bg-kargo-border md:block" aria-hidden />
          <span className="hidden items-center md:flex">
            <BotaoControle rotulo="Baixar em PDF, um slide por página" onClick={() => baixar('PDF, um slide por página')}>
              <Download size={18} />
              <span className="hidden lg:inline">PDF</span>
            </BotaoControle>
            <BotaoControle rotulo="Baixar em PowerPoint editável" onClick={() => baixar('PowerPoint editável')}>
              <Presentation size={18} />
              <span className="hidden lg:inline">PowerPoint</span>
            </BotaoControle>
            <BotaoControle rotulo="Baixar em Excel, no formato de dashboard" onClick={() => baixar('Excel')}>
              <FileSpreadsheet size={18} />
              <span className="hidden lg:inline">Excel</span>
            </BotaoControle>
          </span>
          {'requestFullscreen' in document.documentElement ? (
            <BotaoControle
              rotulo={telaCheia ? 'Sair da tela cheia (F)' : 'Tela cheia (F)'}
              onClick={() => (telaCheia ? sairTelaCheia() : entrarTelaCheia())}
            >
              {telaCheia ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </BotaoControle>
          ) : null}
          <BotaoControle rotulo="Sair da apresentação (Esc)" onClick={fechar}>
            <X size={18} />
            <span className="hidden sm:inline">Sair</span>
          </BotaoControle>
        </div>
      </div>
    </div>,
    document.body,
  )
}
