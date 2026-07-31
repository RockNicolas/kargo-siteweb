import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { Container } from './ui/Container'
import { InstrumentCluster } from './InstrumentCluster'

const stack = ['Combustível', 'Frota', 'Documentação', 'Manutenção', 'Almoxarifado']

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-concrete-50 pb-16 pt-32 transition-colors duration-300 dark:bg-asphalt-950 sm:pb-24 sm:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-signal-400/10 blur-3xl"
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <span
              className="animate-fade-up inline-flex items-center rounded-full bg-asphalt-950 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-signal-400 dark:bg-asphalt-800"
              style={{ animationDelay: '0ms' }}
            >
              Frota + obras, um só painel
            </span>

            <h1
              className="animate-fade-up mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-asphalt-950 dark:text-white sm:text-5xl lg:text-[3.4rem]"
              style={{ animationDelay: '90ms' }}
            >
              Sua frota e suas obras, sob controle em um único painel.
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300"
              style={{ animationDelay: '180ms' }}
            >
              O Kargo substitui planilha, papel e controle manual por um painel único — acessível de
              qualquer computador ou celular, com histórico completo e alertas automáticos.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '260ms' }}
            >
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3.5 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
              >
                Solicitar demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#modulos"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-asphalt-200 px-6 py-3.5 font-medium text-asphalt-700 transition hover:border-asphalt-950 dark:border-asphalt-700 dark:text-asphalt-200 dark:hover:border-white"
              >
                Ver módulos do sistema
              </a>
            </div>

            <div
              className="animate-fade-up mt-6 flex items-center gap-2 text-sm text-asphalt-500 dark:text-asphalt-400"
              style={{ animationDelay: '320ms' }}
            >
              <Monitor className="h-4 w-4" />
              <Smartphone className="h-4 w-4" />
              Acesse do computador, tablet ou celular
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-asphalt-200 pt-6 text-sm text-asphalt-500 dark:border-asphalt-800 dark:text-asphalt-400">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <InstrumentCluster />
          </div>
        </div>
      </Container>
    </section>
  )
}
