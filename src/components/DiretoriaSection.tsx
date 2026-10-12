import { lazy, Suspense } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { diretoriaItens } from '../data/content'

// Dados dos períodos e apresentação em slides: carregados sob demanda, fora do primeiro carregamento.
const DiretoriaPainel = lazy(() => import('./diretoria/DiretoriaPainel'))

/** Reserva o espaço do painel enquanto ele carrega, para a página não pular. */
function EsqueletoPainel() {
  return (
    <div className="mt-12" aria-hidden>
      <div className="h-28 rounded-2xl bg-asphalt-200/50 dark:bg-asphalt-900" />
      <div className="mt-10 h-[640px] rounded-2xl bg-asphalt-200/50 dark:bg-asphalt-900 lg:h-[820px]" />
    </div>
  )
}

export function DiretoriaSection() {
  return (
    <section id="diretoria" className="bg-concrete-50 py-20 dark:bg-asphalt-950 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Painel da diretoria · o painel real"
            title="A operação inteira em uma tela, para quem decide."
            description="Isto não é um desenho: é o painel do Kargo funcionando, aberto com os dados de uma empresa de demonstração. Quanto a operação gastou, o que mudou em relação ao mês anterior e por que mudou — sem abrir cada módulo e sem planilha."
          />
        </Reveal>

        <Suspense fallback={<EsqueletoPainel />}>
          <Reveal delay={60}>
            <DiretoriaPainel />
          </Reveal>
        </Suspense>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                O que a diretoria ganha
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
                Decidir com o número certo na mão, sem esperar o fim do mês.
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diretoriaItens.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <div className="h-full rounded-2xl border border-asphalt-200 bg-white p-6 transition hover:border-signal-500/50 dark:border-asphalt-800 dark:bg-black">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display font-semibold text-asphalt-950 dark:text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={60}>
          <div className="mt-16 flex flex-col items-center gap-5 border-t border-asphalt-200 pt-12 text-center dark:border-asphalt-800">
            <p className="font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
              Quer esse painel na sua empresa?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
            >
              Solicitar demonstração
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
