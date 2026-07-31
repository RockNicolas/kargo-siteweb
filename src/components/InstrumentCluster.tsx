import { useEffect, useState } from 'react'

interface GaugeData {
  label: string
  value: number
}

const gauges: GaugeData[] = [
  { label: 'Frota em dia', value: 96 },
  { label: 'Docs. em dia', value: 88 },
  { label: 'Estoque OK', value: 91 },
]

const readouts: { label: string; value: string; trend?: string }[] = [
  { label: 'Combustível / mês', value: 'R$ 18.420', trend: '-8%' },
  { label: 'Próxima manutenção', value: '4 dias' },
]

function Gauge({ label, value }: GaugeData) {
  const [progress, setProgress] = useState(0)
  const radius = 34
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const t = setTimeout(() => setProgress(value), 250)
    return () => clearTimeout(t)
  }, [value])

  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <div className="relative aspect-square w-full max-w-[88px]">
        <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="var(--color-asphalt-800)" strokeWidth="7" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="var(--color-signal-500)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-[1200ms] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-white sm:text-base">
          {progress}%
        </div>
      </div>
      <span className="mt-2 text-center font-mono text-[9px] uppercase leading-tight tracking-wider text-asphalt-400 sm:text-[10px] sm:tracking-widest">
        {label}
      </span>
    </div>
  )
}

export function InstrumentCluster() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-asphalt-800 bg-asphalt-900 p-4 shadow-2xl shadow-asphalt-950/30 sm:p-8">
      <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-between sm:inset-x-8">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="h-2 w-px bg-asphalt-700" />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 pt-2">
        <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-widest text-asphalt-400">
          Painel · Kargo
        </span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-signal-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-400" />
          Ao vivo
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1 sm:gap-3">
        {gauges.map((g) => (
          <Gauge key={g.label} {...g} />
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-asphalt-800 pt-5">
        {readouts.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2 font-mono text-xs">
            <span className="min-w-0 truncate uppercase tracking-wider text-asphalt-400">{r.label}</span>
            <span className="shrink-0 text-white">
              {r.value}
              {r.trend && <span className="ml-2 text-signal-400">{r.trend}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
