import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { ModulesCarousel } from './ModulesCarousel'

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
            align="center"
            eyebrow="Módulos"
            title="Tudo o que sua operação precisa em um painel só."
            description="Organizado do jeito que quem administra frota e obras realmente pensa no dia a dia."
          />
        </Reveal>

      </Container>

      <Reveal delay={90} className="mt-20 sm:mt-24">
        <ModulesCarousel />
      </Reveal>

      <Container className="relative">
        <Reveal className="mt-12 text-center sm:mt-14">
          <p className="mx-auto max-w-xl text-base text-asphalt-500 dark:text-asphalt-400">
            Cada módulo já nasce conectado aos outros — sem retrabalho, sem planilha extra, sem
            redigitar nada.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link
              to="/modulos"
              className="group inline-flex items-center gap-1.5 font-medium text-asphalt-950 underline decoration-asphalt-300 underline-offset-4 transition hover:decoration-asphalt-950 dark:text-white dark:decoration-asphalt-600 dark:hover:decoration-white"
            >
              Ver todos os módulos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/#contato"
              className="font-medium text-asphalt-950 underline decoration-asphalt-300 underline-offset-4 transition hover:decoration-asphalt-950 dark:text-white dark:decoration-asphalt-600 dark:hover:decoration-white"
            >
              Solicitar demonstração
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
