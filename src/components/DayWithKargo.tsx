import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { dayWithKargo } from '../data/content'

export function DayWithKargo() {
  return (
    <section id="um-dia" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Um dia com o Kargo"
            title="Da bomba ao Sienge sem planilha no meio."
            description="Os módulos não vivem isolados: eles encadeiam o dia da operação."
          />
        </Reveal>

        <ol className="relative mt-14 max-w-3xl list-none space-y-0">
          {/* Linha contínua da timeline */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-asphalt-200 dark:bg-asphalt-800 sm:left-[1.4rem]"
          />

          {dayWithKargo.map((step, i) => (
            <Reveal key={step.time} delay={i * 80}>
              <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-asphalt-950 text-signal-400 ring-4 ring-white dark:bg-signal-500 dark:text-asphalt-950 dark:ring-black sm:h-11 sm:w-11">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>

                <div className="min-w-0 pt-0.5 sm:pt-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <time className="font-mono text-xs font-medium tabular-nums tracking-widest text-signal-600 dark:text-signal-400">
                      {step.time}
                    </time>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-asphalt-400">
                      {step.module}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
