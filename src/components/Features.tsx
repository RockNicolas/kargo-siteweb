import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { moduleGroups } from '../data/content'

export function Features() {
  return (
    <section id="modulos" className="bg-white py-20 dark:bg-asphalt-950 sm:py-28">
      <Container>
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
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  {group.label}
                </p>
              </Reveal>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((mod, i) => (
                  <Reveal key={mod.title} delay={i * 70}>
                    <div className="group rounded-2xl border border-asphalt-200 p-6 transition hover:border-signal-500/50 hover:shadow-lg hover:shadow-asphalt-950/5 dark:border-asphalt-800">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-asphalt-950 text-signal-400 transition group-hover:bg-signal-500 group-hover:text-white dark:bg-asphalt-800">
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
      </Container>
    </section>
  )
}
