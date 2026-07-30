import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { benefits } from '../data/content'

export function Benefits() {
  return (
    <section className="bg-asphalt-950 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Por que isso importa" title="O que muda na prática" dark />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-asphalt-800 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 text-signal-400">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-asphalt-400">{b.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
