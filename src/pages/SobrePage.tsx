import { ArrowLeft, ArrowRight, Compass, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'

export function SobrePage() {
  return (
    <div className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal-400/10 blur-3xl dark:bg-signal-500/15"
      />

      <Container className="relative">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-asphalt-500 transition hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar pro início
          </Link>

          <span className="mt-6 block font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
            Sobre
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-5xl">
            A história por trás do Kargo
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">
            O Kargo é um sistema de gestão de frota e obra — combustível, documentação veicular,
            manutenção e almoxarifado num painel só, acessível de qualquer computador ou celular.
            Feito pra empresa que tem veículo próprio e obra em andamento ao mesmo tempo, e hoje
            resolve isso no meio de planilha solta e ligação de um setor pro outro.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6 sm:mt-20">
          <Reveal>
            <div className="grid gap-6 rounded-2xl border border-asphalt-200 bg-concrete-50 p-6 dark:border-asphalt-800 dark:bg-asphalt-900/60 sm:p-8 lg:grid-cols-[auto,1fr] lg:gap-8">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-400">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white">
                  De onde veio a ideia
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  <p>
                    O Kargo nasceu de um problema bem concreto: gestão de frota e de obra feita no
                    meio de planilha solta, papel e ligação de um setor pra outro. Perguntas simples do
                    dia a dia — quanto se gastou de combustível por veículo no mês, qual caminhão está
                    com o seguro, o IPVA ou a manutenção prestes a vencer, quanto material sobrou em
                    cada obra, quem tirou a última peça do almoxarifado — não tinham resposta rápida,
                    porque a informação vivia espalhada e sempre um pouco atrasada.
                  </p>
                  <p>
                    Daí veio a ideia: em vez de mais uma planilha ou mais um sistema isolado, um painel
                    único que junta frota e obra e ainda conversa com o que a operação já usa — caso do
                    Sienge, sincronizado nos dois sentidos pra estoque de obra e sistema de gestão nunca
                    ficarem desalinhados. A identidade visual do Kargo, inspirada em sinalização de
                    estrada e canteiro de obra, vem exatamente desse universo: frota na estrada, obra em
                    andamento, tudo precisando de controle em tempo real.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="grid gap-6 rounded-2xl border border-asphalt-200 bg-white p-6 dark:border-asphalt-800 dark:bg-asphalt-950 sm:p-8 lg:grid-cols-[auto,1fr] lg:gap-8">
              <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-asphalt-950 text-white dark:bg-signal-500 dark:text-asphalt-950">
                <User className="h-7 w-7" />
              </span>
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  Sobre o desenvolvedor
                </span>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white">
                  [Seu nome]
                </h2>
                <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
                  [Seu cargo — ex.: desenvolvedor e criador do Kargo]
                </p>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  <p>
                    [Sua trajetória — formação, experiência com frota, obras ou tecnologia, e o que
                    trouxe você até aqui.]
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex justify-center sm:mt-20">
          <Link
            to="/#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
          >
            Solicitar demonstração
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </div>
  )
}
