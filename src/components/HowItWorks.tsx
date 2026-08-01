import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { howItWorks } from '../data/content'

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Como funciona"
            title="Três passos entre a planilha e o controle real."
            description="Sem implantação complicada: você cadastra, o sistema cuida do resto."
          />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-asphalt-200 dark:bg-asphalt-800 sm:block"
          />

          {howItWorks.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-asphalt-950 text-signal-400 ring-8 ring-white dark:bg-signal-500 dark:text-asphalt-950 dark:ring-black">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="mt-4 font-mono text-xs uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  Passo {i + 1}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-asphalt-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
