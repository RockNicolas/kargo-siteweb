import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { ModulesCarousel } from './ModulesCarousel'

export function Features() {
  return (
    <section id="modulos" className="relative overflow-hidden bg-white py-20 dark:bg-black sm:py-28">
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

          <div className="mt-6 flex items-center justify-center">
            <Link
              to="/modulos"
              className="group inline-flex items-center gap-1.5 font-medium text-asphalt-950 underline decoration-asphalt-300 underline-offset-4 transition hover:decoration-asphalt-950 dark:text-white dark:decoration-asphalt-600 dark:hover:decoration-white"
            >
              Ver todos os módulos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
