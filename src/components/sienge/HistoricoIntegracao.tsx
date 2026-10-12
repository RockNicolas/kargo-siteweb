import { ArrowLeftRight, BarChart3, Boxes, CheckCircle2, FileDown, FileSpreadsheet, User } from 'lucide-react'
import {
  historicoAtributos,
  historicoBarrasExemplo,
  historicoLinhasExemplo,
} from '../../data/content'

const MODULOS = ['Almoxarifado', 'Ativos', 'Manutenção', 'Multas', 'IPVA', 'Licenciamento']
const SENTIDOS = ['Ambos os sentidos', 'Sienge → Kargo', 'Kargo → Sienge']

function JanelaHistorico() {
  const maior = Math.max(...historicoBarrasExemplo.map((b) => b.valor))

  return (
    <div className="kargo-shell min-w-0 overflow-hidden rounded-2xl border border-[var(--k-border)] bg-[var(--k-bg)] text-[var(--k-text)] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-[var(--k-border)] bg-[var(--k-sidebar)] px-4 py-3">
        <span className="inline-flex shrink-0 rounded-lg bg-white p-1">
          <img src="/sienge-icone-real.png" alt="" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-black">Histórico da integração</p>
          <p className="truncate text-[11px] text-[var(--k-muted)]">
            Tudo que passou entre o Kargo e o Sienge, nos módulos a que você tem acesso.
          </p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase text-[var(--k-muted)]">Módulo:</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--k-cta)] bg-[var(--k-cta)] px-2.5 py-1 text-[11px] font-bold text-white">
            <Boxes className="h-3 w-3" aria-hidden />
            Todos
          </span>
          {MODULOS.map((m) => (
            <span
              key={m}
              className="rounded-full border border-[var(--k-border)] bg-[var(--k-sidebar)] px-2.5 py-1 text-[11px] font-bold text-[var(--k-muted)]"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)] p-0.5">
            {SENTIDOS.map((s, i) => (
              <span
                key={s}
                className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                  i === 0 ? 'bg-[var(--k-cta)] text-white' : 'text-[var(--k-muted)]'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { rotulo: 'Dashboard', Icone: BarChart3 },
              { rotulo: 'PDF', Icone: FileDown },
              { rotulo: 'Excel', Icone: FileSpreadsheet },
            ].map(({ rotulo, Icone }) => (
              <span
                key={rotulo}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)] px-2.5 py-1.5 text-[10px] font-bold uppercase text-[var(--k-text)]"
              >
                <Icone className="h-3 w-3" aria-hidden />
                {rotulo}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-1.5">
          {historicoLinhasExemplo.map((l) => {
            const Icone = l.icon
            return (
              <li
                key={l.titulo}
                className="rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)]/60 px-3 py-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-bold">
                    <Icone className="h-3 w-3 shrink-0 text-[var(--k-muted)]" aria-hidden />
                    <span className="truncate">{l.titulo}</span>
                  </span>
                  <span className="text-[11px] text-[var(--k-muted)]">{l.quando}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[var(--k-border)] px-2 py-0.5 text-[var(--k-muted)]">
                    <ArrowLeftRight className="h-2.5 w-2.5" aria-hidden />
                    {l.sentido === 'kargo-sienge' ? 'Kargo → Sienge' : 'Sienge → Kargo'}
                  </span>
                  {l.status ? (
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                      {l.status}
                    </span>
                  ) : null}
                  {l.paga ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                      <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                      Paga
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 rounded-full border border-[var(--k-border)] px-2 py-0.5 normal-case text-[var(--k-text)]">
                    <User className="h-2.5 w-2.5" aria-hidden />
                    {l.usuario}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="rounded-lg border border-[var(--k-border)] bg-[var(--k-sidebar)]/60 p-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--k-muted)]">
            Dashboard · eventos por módulo no período
          </p>
          <ul className="mt-2.5 space-y-1.5" aria-hidden>
            {historicoBarrasExemplo.map((b) => (
              <li key={b.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)_1.75rem] items-center gap-2 text-[11px]">
                <span className="truncate text-[var(--k-muted)]">{b.label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[var(--k-bg-deep)]">
                  <span
                    className="block h-full rounded-full bg-[var(--k-cta)]"
                    style={{ width: `${Math.round((b.valor / maior) * 100)}%` }}
                  />
                </span>
                <span className="text-right font-bold tabular-nums">{b.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function HistoricoIntegracao() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div>
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-400">
          Histórico da integração
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Cada título, cada baixa e cada usuário em uma linha do tempo.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-asphalt-300">
          Quando alguém pergunta “quem lançou isso no Sienge?”, a resposta está a dois cliques. A tela da
          integração junta tudo o que passou entre os dois sistemas, nos dois sentidos, para explicar qualquer
          lançamento em segundos — e levar para a reunião em PDF ou Excel.
        </p>
        <ul className="mt-6 space-y-3">
          {historicoAtributos.map((a) => (
            <li key={a.texto} className="flex items-start gap-3 text-sm leading-relaxed text-asphalt-200">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal-500/15 text-signal-400">
                <a.icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="pt-0.5">{a.texto}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <JanelaHistorico />
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-asphalt-500">
          Exemplo ilustrativo
        </p>
      </div>
    </div>
  )
}
