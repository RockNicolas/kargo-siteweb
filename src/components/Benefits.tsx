import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { benefits } from '../data/content'

// Layout editorial (linhas numeradas + filete) em vez de grade de cards: as
// seções vizinhas — Integração Sienge, Perfis de acesso e PainPoints — já usam
// card retangular com ícone em cima, e repetir aqui deixava tudo com a mesma
// silhueta.
export function Benefits() {
  return (
    <section className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Por que isso importa"
            title="O que muda na prática"
            description="Não se trata de ter mais um sistema — trata-se do que deixa de dar errado no dia a dia."
          />
        </Reveal>

        <div className="mt-12 border-b border-asphalt-200 dark:border-asphalt-800 sm:mt-16">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="group relative grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-t border-asphalt-200 py-8 dark:border-asphalt-800 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:py-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-signal-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <span className="font-mono text-lg text-asphalt-300 transition-colors duration-300 group-hover:text-signal-500 dark:text-asphalt-700 dark:group-hover:text-signal-400">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
                    {b.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                    {b.description}
                  </p>
                </div>

                <b.icon
                  aria-hidden
                  strokeWidth={1}
                  className="hidden h-16 w-16 shrink-0 text-asphalt-950/[0.07] transition duration-500 group-hover:scale-110 group-hover:text-signal-500/30 dark:text-white/[0.08] dark:group-hover:text-signal-400/30 sm:block"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
