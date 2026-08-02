
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { siengeBenefits, siengeFlow } from '../data/content'

const stockPreview: [string, string][] = [
  ['Cimento CP-II 50kg', '128 un'],
  ['Vergalhão 10mm', '340 un'],
  ['Tinta acrílica 18L', '22 un'],
]

export function SiengeSpotlight() {
  return (
    <section id="sienge" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Integração Sienge"
            title="Seu estoque de obra e o Sienge, sempre batendo."
            description="O Kargo mantém o estoque de cada obra sincronizado com o Sienge nos dois sentidos — sem lançar a mesma movimentação duas vezes."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siengeBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-asphalt-200 p-6 dark:border-asphalt-800">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display font-semibold text-asphalt-950 dark:text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                  {b.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-8 rounded-2xl border border-asphalt-200 bg-concrete-50 p-6 dark:border-asphalt-800 dark:bg-asphalt-900/60 sm:p-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-asphalt-400">
                Como funciona
              </span>

              <div className="mt-5 space-y-6">
                {siengeFlow.map((step) => (
                  <div key={step.direction} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="font-display font-semibold text-asphalt-950 dark:text-white">
                          {step.direction}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-asphalt-400">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-xl bg-white p-4 dark:bg-asphalt-950 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-concrete-50 p-4 dark:bg-asphalt-900">
                <span className="min-w-0 font-mono text-xs text-asphalt-600 dark:text-asphalt-300">
                  Obra Residencial Norte
                </span>
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  Atualizado
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {stockPreview.map(([item, qty]) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-lg bg-concrete-50/60 px-4 py-3 text-sm dark:bg-asphalt-900/60"
                  >
                    <span className="min-w-0 truncate text-asphalt-600 dark:text-asphalt-300">{item}</span>
                    <span className="shrink-0 font-mono font-medium text-asphalt-950 dark:text-white">
                      {qty}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-asphalt-500">
                Posição trazida do Sienge na última atualização manual.
              </p>
            </div>
          </Reveal>
        </div>

        
      </Container>
    </section>
  )
}
