/**
 * Gráficos leves em SVG puro, sem dependência externa — só pro replay visual
 * do painel na página /demo. Paleta categórica validada com o script da skill
 * de dataviz (3 matizes passam em all-pairs claro/escuro; a 4ª categoria de
 * verdade dobra pra cinza neutro, como a skill manda quando não sobra um 4º
 * matiz seguro — ver conversa/commit que introduziu este arquivo).
 */

export interface CategoricalSlice {
  label: string
  value: number
  light: string
  dark: string
}

/** Mesmas cores exatas do painel de verdade — copiadas de
 *  src/components/listaCategoria/listaCategoriaUtils.js (CORES_HEX_CATEGORIA_COMBUSTIVEL)
 *  e src/utils/relatorioDashboardUtils.js (CORES_GRAFICO) do repositório do sistema.
 *  Uma cor só por categoria, igual nos dois temas — é assim que o sistema faz. */
export const CHART_COLORS = {
  blue: { light: '#3b82f6', dark: '#3b82f6' }, // Veículo Leve
  green: { light: '#16a34a', dark: '#16a34a' }, // Veículo Pesado
  orange: { light: '#f97316', dark: '#f97316' }, // Máquina
  violet: { light: '#8b5cf6', dark: '#8b5cf6' }, // Equipamentos
  teal: { light: '#14b8a6', dark: '#14b8a6' }, // Almoxarifado (CORES_GRAFICO[6])
}

function pct(value: number, total: number) {
  return Math.round((value / total) * 100)
}

export function DonutChart({
  slices,
  isDark,
  size = 128,
  thickness = 16,
  className = 'h-auto w-full',
}: {
  slices: CategoricalSlice[]
  isDark: boolean
  size?: number
  thickness?: number
  className?: string
}) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  const gap = 3
  let cursor = 0

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`-rotate-90 ${className}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={thickness}
        stroke="var(--k-border)"
      />
      {slices.map((s) => {
        const frac = total > 0 ? s.value / total : 0
        const len = Math.max(frac * c - gap, 0)
        const offset = -cursor
        cursor += frac * c
        return (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={offset}
            stroke={isDark ? s.dark : s.light}
          >
            <title>
              {s.label}: {pct(s.value, total)}%
            </title>
          </circle>
        )
      })}
    </svg>
  )
}

export function DonutLegend({ slices, isDark }: { slices: CategoricalSlice[]; isDark: boolean }) {
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  return (
    <ul className="space-y-1.5">
      {slices.map((s) => (
        <li key={s.label} className="flex items-center gap-2 text-xs">
          <span
            aria-hidden
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: isDark ? s.dark : s.light }}
          />
          <span className="min-w-0 flex-1 truncate text-[var(--k-text)]">{s.label}</span>
          <span className="shrink-0 font-mono text-[var(--k-muted)]">{pct(s.value, total)}%</span>
        </li>
      ))}
    </ul>
  )
}

export function HorizontalBars({
  data,
  isDark,
  formatValue = (v: number) => String(v),
}: {
  data: CategoricalSlice[]
  isDark: boolean
  formatValue?: (v: number) => string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex h-full min-h-0 flex-col justify-evenly gap-1.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 sm:gap-2.5">
          <span className="w-[30%] max-w-[6.5rem] min-w-[4.25rem] shrink-0 truncate text-[11px] leading-none text-[var(--k-muted)]">
            {d.label}
          </span>
          <div className="h-2 min-w-0 flex-1 rounded-full bg-[var(--k-bg-deep)]">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: isDark ? d.dark : d.light,
              }}
            />
          </div>
          <span className="w-14 shrink-0 text-right font-mono text-[11px] leading-none text-[var(--k-muted)]">
            {formatValue(d.value)}
          </span>
          <span className="sr-only">{`${d.label}: ${formatValue(d.value)}`}</span>
        </div>
      ))}
    </div>
  )
}

/** Barras verticais de uma medida só por item nomeado — sem legenda (série única).
 *  Preenche a altura do pai (gráficos acompanham o card em qualquer monitor). */
export function VerticalBars({
  data,
  color,
}: {
  data: { label: string; value: number; cor?: string }[]
  color: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex h-full min-h-[4.5rem] items-stretch gap-2 sm:gap-3">
      {data.map((d) => {
        const pctH = Math.max((d.value / max) * 100, 8)
        return (
          <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <span className="shrink-0 font-mono text-[10px] text-[var(--k-muted)]">{d.value}</span>
            <div className="flex min-h-0 w-full flex-1 items-end justify-center">
              <div
                title={`${d.label}: ${d.value}`}
                className="min-h-[4px] w-[55%] max-w-8 rounded-t-[4px]"
                style={{ height: `${pctH}%`, backgroundColor: d.cor || color }}
              />
            </div>
            <span className="w-full shrink-0 truncate text-center text-[10px] text-[var(--k-muted)]">
              {d.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
