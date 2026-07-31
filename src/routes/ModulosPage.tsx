import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { moduleGroups } from '../data/content'

export function ModulosPage() {
  return (
    <div className="pb-20 pt-32 sm:pb-28 sm:pt-40">
      <Container>
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-asphalt-500 transition hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar pro início
          </Link>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-5xl">
            Todos os módulos do Kargo
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">
            Cada módulo resolve uma parte específica da rotina de frota e obra — e todos conversam
            entre si, num painel só.
          </p>
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
                    <div className="rounded-2xl border border-asphalt-200 p-6 dark:border-asphalt-800">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-asphalt-950 text-signal-400 dark:bg-asphalt-800">
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
    </div>
  )
}
