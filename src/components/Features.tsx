import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { moduleGroups } from '../data/content'

export function Features() {
  return (
    <section id="modulos" className="relative overflow-hidden bg-white py-20 dark:bg-asphalt-950 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal-400/10 blur-3xl dark:bg-signal-500/15"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Módulos"
            title="Tudo o que sua operação precisa, em um painel só."
            description="Organizado do jeito que quem administra frota e obra realmente pensa no dia a dia."
          />
        </Reveal>

        <div className="mt-14 space-y-12">
          {moduleGroups.map((group) => (
            <div key={group.label}>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-signal-500/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  {group.label}
                </span>
              </Reveal>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((mod, i) => (
                  <Reveal key={mod.title} delay={i * 70}>
                    <div className="group relative overflow-hidden rounded-2xl border border-asphalt-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-signal-500/60 hover:shadow-xl hover:shadow-signal-500/10 dark:border-asphalt-800 dark:hover:shadow-signal-500/5">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 group-hover:scale-x-100"
                      />
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-asphalt-950 text-signal-400 transition duration-300 group-hover:scale-110 group-hover:bg-signal-500 group-hover:text-white dark:bg-asphalt-800">
                        <mod.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold text-asphalt-950 dark:text-white">
                        {mod.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                        {mod.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            to="/modulos"
            className="inline-flex items-center gap-2 rounded-lg border border-asphalt-200 px-6 py-3 font-medium text-asphalt-700 transition hover:border-asphalt-950 dark:border-asphalt-700 dark:text-asphalt-200 dark:hover:border-white"
          >
            Ver todos os módulos em detalhe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
