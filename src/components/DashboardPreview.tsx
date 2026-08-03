import { useState } from 'react'
import {
  ArrowLeft,
  Fuel,
  FileText,
  Wrench,
  Warehouse,
  Truck,
  Car,
  Construction,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'

interface ChartDatum {
  label: string
  value: number
  color: string
  /** Repartição própria desse item (ex.: situação de cada tipo de documento) —
   *  quando presente, clicar no item troca os dados do gráfico ligado a ele. */
  detail?: ChartDatum[]
  /** Aviso pontual pra esse item (ex.: "faltam 100km pra troca de óleo”). */
  warning?: string
}

interface AssetItem {
  name: string
  code: string
  obra: string
  metricValue: number
  metricDisplay: string
  consumo: string
  litros: number
  valor: number
}

interface AssetGroup {
  label: string
  icon: LucideIcon
  color: string
  items: AssetItem[]
}

type Breakdown =
  | { title: string; type: 'donut'; data: ChartDatum[] }
  | { title: string; type: 'bars'; data: ChartDatum[] }
  | { title: string; type: 'assets'; data: AssetGroup[] }

interface PreviewModule {
  icon: LucideIcon
  title: string
  stat: string
  statLabel: string
  breakdowns: Breakdown[]
}

// Paleta só dos gráficos (dado ilustrativo) — não são cores de marca/UI.
const violet = '#8b5cf6'
const blue = '#3b82f6'
const green = '#10b981'
const amber = '#f59e0b'
const orange = '#f0530c'

const previewModules: PreviewModule[] = [
  {
    icon: Truck,
    title: 'Patrimônio',
    stat: '73',
    statLabel: 'ativos em operação',
    breakdowns: [
      {
        title: 'Categoria',
        type: 'donut',
        data: [
          { label: 'Equipamentos', value: 51, color: violet },
          { label: 'Veículo leve', value: 26, color: blue },
          { label: 'Veículo pesado', value: 16, color: green },
          { label: 'Máquina', value: 7, color: orange },
        ],
      },
      {
        title: 'Status',
        type: 'donut',
        data: [
          { label: 'Ativo', value: 62, color: orange },
          { label: 'Inativo', value: 38, color: blue },
        ],
      },
    ],
  },
  {
    icon: Fuel,
    title: 'Combustível',
    stat: 'R$ 6.135',
    statLabel: 'gastos no mês',
    breakdowns: [
      {
        title: 'Consumo por ativo',
        type: 'assets',
        data: [
          {
            label: 'Máquinas',
            icon: Construction,
            color: orange,
            items: [
              {
                name: 'Retroescavadeira',
                code: 'MC-09',
                obra: 'Obra A',
                metricValue: 62,
                metricDisplay: '62h',
                consumo: '4,1 L/h',
                litros: 254,
                valor: 1580,
              },
              {
                name: 'Retroescavadeira',
                code: 'MC-13',
                obra: 'Obra B',
                metricValue: 48,
                metricDisplay: '48h',
                consumo: '3,8 L/h',
                litros: 182,
                valor: 1130,
              },
            ],
          },
          {
            label: 'Veículo pesado',
            icon: Truck,
            color: green,
            items: [
              {
                name: 'Volvo',
                code: 'KRG-4A21',
                obra: 'Obra A',
                metricValue: 1320,
                metricDisplay: '1.320 km',
                consumo: '2,9 km/L',
                litros: 455,
                valor: 2820,
              },
            ],
          },
          {
            label: 'Veículo leve',
            icon: Car,
            color: blue,
            items: [
              {
                name: 'Strada',
                code: 'KRG-7B02',
                obra: 'Obra C',
                metricValue: 980,
                metricDisplay: '980 km',
                consumo: '9,4 km/L',
                litros: 104,
                valor: 605,
              },
            ],
          },
        ],
      },
      {
        title: 'Tipo de combustível',
        type: 'donut',
        data: [
          { label: 'Diesel', value: 90, color: orange },
          { label: 'Gasolina', value: 10, color: blue },
        ],
      },
    ],
  },
  {
    icon: FileText,
    title: 'Documentação',
    stat: '50',
    statLabel: 'documentos vencendo',
    breakdowns: [
      {
        title: 'Por tipo',
        type: 'bars',
        data: [
          {
            label: 'Multas',
            value: 23,
            color: orange,
            detail: [
              { label: 'Em dia', value: 40, color: green },
              { label: 'Vencendo', value: 25, color: amber },
              { label: 'Vencido', value: 35, color: orange },
            ],
          },
          {
            label: 'IPVA',
            value: 11,
            color: blue,
            detail: [
              { label: 'Em dia', value: 88, color: green },
              { label: 'Vencendo', value: 8, color: amber },
              { label: 'Vencido', value: 4, color: orange },
            ],
          },
          {
            label: 'CNH',
            value: 7,
            color: green,
            detail: [
              { label: 'Em dia', value: 95, color: green },
              { label: 'Vencendo', value: 5, color: amber },
            ],
          },
          {
            label: 'Licenciamento',
            value: 9,
            color: violet,
            detail: [
              { label: 'Em dia', value: 70, color: green },
              { label: 'Vencendo', value: 20, color: amber },
              { label: 'Vencido', value: 10, color: orange },
            ],
          },
        ],
      },
      {
        title: 'Situação',
        type: 'donut',
        data: [
          { label: 'Em dia', value: 82, color: green },
          { label: 'Vencendo', value: 12, color: amber },
          { label: 'Vencido', value: 6, color: orange },
        ],
      },
    ],
  },
  {
    icon: Wrench,
    title: 'Manutenção',
    stat: '2',
    statLabel: 'ativos perto da troca',
    breakdowns: [
      {
        title: 'Perto da troca',
        type: 'bars',
        data: [
          { label: 'MC-09', value: 88, color: orange },
          {
            label: 'Volvo (KRG-4A21)',
            value: 96,
            color: green,
            warning: 'Faltam 100km para a troca de óleo',
          },
          { label: 'MC-13', value: 45, color: orange },
          { label: 'Strada (KRG-7B02)', value: 30, color: blue },
          { label: 'MC-15', value: 20, color: orange },
        ],
      },
      {
        title: 'Status geral',
        type: 'donut',
        data: [
          { label: 'Em dia', value: 85, color: green },
          { label: 'Perto da troca', value: 10, color: amber },
          { label: 'Atrasado', value: 5, color: orange },
        ],
      },
    ],
  },
  {
    icon: Warehouse,
    title: 'Almoxarifado',
    stat: '51',
    statLabel: 'peças em estoque',
    breakdowns: [
      {
        title: 'Itens em estoque',
        type: 'bars',
        data: [
          { label: 'Filtro de óleo', value: 12, color: violet },
          { label: 'Correia', value: 9, color: blue },
          { label: 'Pastilha de freio', value: 7, color: green },
          { label: 'Graxa', value: 5, color: amber },
          { label: 'Parafusos', value: 4, color: orange },
        ],
      },
      {
        title: 'Saldo por obra',
        type: 'donut',
        data: [
          { label: 'Obra A', value: 45, color: violet },
          { label: 'Obra B', value: 30, color: blue },
          { label: 'Obra C', value: 25, color: orange },
        ],
      },
    ],
  },
]

// Rosca em SVG (círculos empilhados com stroke-dasharray) — cada fatia é um
// elemento próprio, então dá pra responder ao hover fatia por fatia, coisa que
// o truque de conic-gradient (uma imagem só) não permite.
function Donut({ data }: { data: ChartDatum[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const size = 96
  const strokeWidth = 15
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const active = hovered !== null ? data[hovered] : null

  let offset = 0

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          onMouseLeave={() => setHovered(null)}
        >
          {data.map((d, i) => {
            const dash = (d.value / total) * circumference
            const dashOffset = -offset
            offset += dash
            const isHovered = hovered === i
            const isDimmed = hovered !== null && !isHovered
            return (
              <circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={isHovered ? strokeWidth + 5 : strokeWidth}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={dashOffset}
                opacity={isDimmed ? 0.35 : 1}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHovered(i)}
              />
            )
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {active && (
            <span className="text-sm font-bold text-white">
              {Math.round((active.value / total) * 100)}%
            </span>
          )}
        </div>
      </div>
      <ul className="w-full space-y-0.5">
        {data.map((d, i) => (
          <li
            key={d.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-xs transition-colors duration-150 ${
              hovered === i ? 'bg-white/5 text-white' : 'text-asphalt-400'
            }`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="min-w-0 flex-1 truncate">{d.label}</span>
            <span className="shrink-0 font-medium text-white">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Bars({
  data,
  selected,
  onSelect,
}: {
  data: ChartDatum[]
  /** Item marcado como selecionado mesmo sem o mouse em cima (clique fixa a escolha). */
  selected?: number | null
  onSelect?: (index: number) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const max = Math.max(...data.map((d) => d.value))
  const activeIndex = hovered ?? selected ?? null
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => {
        const isActive = activeIndex === i
        const isDimmed = activeIndex !== null && !isActive
        return (
          <div
            key={d.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect?.(i)}
            className={`rounded px-1 py-1 transition-opacity duration-150 ${
              onSelect ? 'cursor-pointer' : 'cursor-default'
            } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
          >
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span
                className={`flex min-w-0 items-center gap-1 truncate transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-asphalt-400'
                }`}
              >
                {d.warning && (
                  <TriangleAlert className="h-3 w-3 shrink-0" style={{ color: amber }} />
                )}
                <span className="truncate">{d.label}</span>
                {selected === i && <span className="shrink-0 text-signal-400">●</span>}
              </span>
              <span
                className={`shrink-0 font-medium transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-asphalt-300'
                }`}
              >
                {d.value}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-asphalt-800">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(d.value / max) * 100}%`,
                  backgroundColor: d.color,
                  filter: isActive ? 'brightness(1.3)' : undefined,
                }}
              />
            </div>
            {d.warning && (
              <p className="mt-1 flex items-center gap-1 text-[10px] font-medium" style={{ color: amber }}>
                <TriangleAlert className="h-3 w-3 shrink-0" />
                {d.warning}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Ativos agrupados por categoria, com a métrica embutida na própria barra —
// no molde da tela real de consumo por ativo do Kargo. O toggle troca o que
// determina a largura da barra (tempo/distância rodada vs. valor gasto).
function AssetGroups({ groups }: { groups: AssetGroup[] }) {
  const [scale, setScale] = useState<'metric' | 'valor'>('metric')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-asphalt-400">Escala da barra:</span>
        <div className="inline-flex rounded-full border border-asphalt-800 bg-asphalt-950/60 p-0.5">
          {(
            [
              ['metric', 'Horas/Km'],
              ['valor', 'Valor (R$)'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setScale(key)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-150 ${
                scale === key ? 'bg-signal-500 text-white' : 'text-asphalt-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-4 ${groups.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {groups.map((group) => {
          const Icon = group.icon
          const max = Math.max(...group.items.map((it) => (scale === 'metric' ? it.metricValue : it.valor)))
          return (
            <div key={group.label}>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                <Icon className="h-3.5 w-3.5" style={{ color: group.color }} />
                {group.label}
              </div>
              <div className="mb-3 h-0.5 rounded-full" style={{ backgroundColor: group.color }} />
              <div className="space-y-2.5">
                {group.items.map((item) => {
                  const value = scale === 'metric' ? item.metricValue : item.valor
                  const pct = Math.max((value / max) * 100, 8)
                  return (
                    <div key={item.code}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-semibold text-white">
                          {item.name} <span className="text-asphalt-500">({item.code})</span>
                        </span>
                        <span className="shrink-0 text-asphalt-500">{item.obra}</span>
                      </div>
                      <div className="relative min-h-8 overflow-hidden rounded-md bg-asphalt-800">
                        <div
                          className="absolute inset-y-0 left-0 rounded-md transition-all duration-300"
                          style={{ width: `${pct}%`, backgroundColor: group.color }}
                        />
                        <div className="relative flex items-center justify-end px-2.5 py-1.5">
                          <span className="text-right text-[9px] font-semibold leading-tight text-white">
                            {item.metricDisplay} · {item.litros}L
                            <br />
                            {item.consumo} · R$ {item.valor.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Tela de relatório de um módulo. Fica num componente próprio (montado com
// key={selected} pelo pai) só pra "linkedIndex" nascer zerado toda vez que o
// usuário troca de módulo, sem precisar de useEffect pra resetar.
function ModuleDetail({ module, onBack }: { module: PreviewModule; onBack: () => void }) {
  const [linkedIndex, setLinkedIndex] = useState(0)

  // Quando uma barra tem `detail`, ela manda no gráfico de rosca do mesmo
  // módulo — clicar em "Multas" faz a rosca de Situação mostrar só a
  // repartição de Multas, por exemplo.
  const linkedBars = module.breakdowns.find(
    (b): b is Extract<Breakdown, { type: 'bars' }> => b.type === 'bars' && b.data.some((d) => d.detail)
  )
  const linkedItem = linkedBars?.data[linkedIndex]

  return (
    <div className="animate-fade-up">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-asphalt-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar
      </button>

      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500/10 text-signal-400">
          <module.icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-white">{module.title}</h3>
      </div>

      <div className="mb-4 rounded-lg border border-signal-500/30 bg-signal-500/5 p-3.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal-400">{module.statLabel}</p>
        <p className="mt-1 text-2xl font-bold text-white">{module.stat}</p>
      </div>

      <div
        className={
          module.breakdowns.some((b) => b.type === 'assets') ? 'space-y-3' : 'grid gap-3 sm:grid-cols-2'
        }
      >
        {module.breakdowns.map((b) => (
          <div key={b.title} className="rounded-lg border border-asphalt-800 bg-asphalt-950/40 p-3.5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-asphalt-500">
              {b.title}
              {b.type === 'donut' && linkedItem && (
                <span className="text-asphalt-600"> · {linkedItem.label}</span>
              )}
            </p>
            {b.type === 'donut' ? (
              <Donut data={linkedItem?.detail ?? b.data} />
            ) : b.type === 'bars' ? (
              <Bars
                data={b.data}
                selected={b === linkedBars ? linkedIndex : undefined}
                onSelect={b === linkedBars ? setLinkedIndex : undefined}
              />
            ) : (
              <AssetGroups groups={b.data} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Mock interativo do painel do Kargo (dados fictícios). Sempre no tema escuro do
// produto real, independente do tema do site — é uma "janela" pro app, não uma
// seção do marketing.
export function DashboardPreview() {
  const [selected, setSelected] = useState<number | null>(null)
  const module = selected === null ? null : previewModules[selected]

  return (
    <div className="w-full overflow-hidden rounded-xl border border-asphalt-800 bg-asphalt-900 shadow-lg shadow-asphalt-950/30">
      <div className="flex items-center gap-1.5 border-b border-asphalt-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-asphalt-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-asphalt-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-asphalt-700" />
        <span className="ml-2 font-mono text-xs text-asphalt-500">painel.kargo</span>
      </div>

      <div className="p-4 sm:p-5">
        {module === null ? (
          <div key="overview" className="animate-fade-up">
            <p className="mb-1 text-sm font-medium text-white">Bem-vindo à sua operação.</p>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-asphalt-500">
              Interaja com os módulos para ver o relatório
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {previewModules.map((mod, index) => {
                const Icon = mod.icon
                return (
                  <button
                    key={mod.title}
                    type="button"
                    onClick={() => setSelected(index)}
                    className="group flex flex-col items-start gap-2 rounded-lg border border-asphalt-800 bg-asphalt-950/40 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-signal-500/60 hover:bg-signal-500/5 hover:shadow-lg hover:shadow-signal-500/10"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-asphalt-800 text-signal-400 transition-colors duration-200 group-hover:bg-signal-500 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-medium text-asphalt-400 transition-colors duration-200 group-hover:text-asphalt-200">
                      {mod.title}
                    </span>
                    <span className="text-lg font-semibold leading-none text-white">{mod.stat}</span>
                    <span className="text-[10px] leading-tight text-asphalt-500">{mod.statLabel}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <ModuleDetail key={selected} module={module} onBack={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}
