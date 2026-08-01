import { RefreshCw, Check } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

const points = [
  'Sem planilha intermediária',
  'Sem lançar a mesma movimentação duas vezes',
  'Nada se perde se a sincronização falhar por instabilidade',
]

const stockPreview: [string, string][] = [
  ['Cimento CP-II 50kg', '128 un'],
  ['Vergalhão 10mm', '340 un'],
  ['Tinta acrílica 18L', '22 un'],
]

export function SiengeSpotlight() {
  return (
    <section id="sienge" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-signal-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-signal-600 dark:text-signal-400">
                <RefreshCw className="h-3.5 w-3.5" />
                Integração
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-4xl">
                Já usa Sienge? O Kargo conversa com ele automaticamente.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                Sincronização dos dois lados: a posição de estoque de cada obra é atualizada no Kargo
                sem redigitar nada. Toda entrada, saída ou transferência lançada no Kargo é enviada
                automaticamente para o Sienge.
              </p>
              <ul className="mt-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-asphalt-700 dark:text-asphalt-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-500/15 text-signal-600 dark:text-signal-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-asphalt-200 bg-concrete-50 p-6 dark:border-asphalt-800 dark:bg-asphalt-900/60 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 dark:bg-asphalt-950">
                <span className="min-w-0 font-mono text-xs text-asphalt-600 dark:text-asphalt-300">
                  Obra Residencial Norte
                </span>
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  Sincronizado
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {stockPreview.map(([item, qty]) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/60 px-4 py-3 text-sm dark:bg-asphalt-950/60"
                  >
                    <span className="min-w-0 truncate text-asphalt-600 dark:text-asphalt-300">{item}</span>
                    <span className="shrink-0 font-mono font-medium text-asphalt-950 dark:text-white">
                      {qty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-asphalt-500 sm:items-center">
                <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0" />
                <span>Kargo ↔ Sienge · última sincronização há 2 min</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
