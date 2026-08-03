import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { ModulesCarousel } from './ModulesCarousel'

export function Features() {
  return (
    <section id="modules" className="relative overflow-hidden bg-white py-20 dark:bg-black sm:py-28">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Módulos"
            title="Tudo o que sua operação precisa em um único painel."
            description="Organizado da forma como quem administra frota e obras realmente pensa no dia a dia."
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
            digitar novamente.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
