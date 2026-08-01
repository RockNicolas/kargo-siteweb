import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { benefits } from '../data/content'

export function Benefits() {
  return (
    <section className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Por que isso importa" title="O que muda na prática" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="rounded-2xl border border-asphalt-200 p-6 dark:border-asphalt-800">
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
      </Container>
    </section>
  )
}
