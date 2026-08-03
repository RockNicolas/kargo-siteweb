import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { DashboardPreview } from '../components/DashboardPreview'
import { contact } from '../data/content'

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
            <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-asphalt-200 bg-concrete-50 p-6 dark:border-transparent dark:bg-asphalt-950 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
              <div className="mx-auto w-full max-w-sm lg:max-w-none">
                <DashboardPreview />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
                  De onde veio a ideia
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  <p>
                    O Kargo começou pequeno: uma ferramenta pensada só para controlar o consumo de
                    combustível da frota. Ainda nessa fase inicial surgiu a pergunta que mudou o rumo
                    do projeto — por que não transformar aquilo em um sistema completo de controle de
                    frota? Dali nasceu o módulo que hoje dá facilidade para localizar cada ativo pela
                    placa, buscar a documentação de cada veículo e acompanhar o pagamento desses
                    documentos, tudo em um só lugar.
                  </p>
                  <p>
                    Foi esse ganho de escopo que fez o Kargo crescer. Vieram o controle de
                    manutenções, pra nunca mais perder de vista revisão, licenciamento ou IPVA
                    prestes a vencer, e o almoxarifado — a parte mais diferenciada, que uniu o controle de frota
                    ao controle de obra em um único fluxo. É essa junção que dá ao Kargo a identidade
                    que ele tem hoje: um painel só para gerir frota e canteiro de obra ao mesmo tempo.
                  </p>
                </div>
                <Link
                  to="/modulos"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-medium text-white transition hover:bg-signal-400"
                >
                  Ver todos os módulos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-asphalt-200 bg-white p-6 dark:border-transparent dark:bg-asphalt-950 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  Sobre o desenvolvedor
                </span>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
                  Nicolas Rock
                </h2>
                <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
                  Desenvolvedor full stack e criador do Kargo
                </p>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  <p>
                    Tenho 4 anos de experiência no mercado de tecnologia, atuando tanto na criação
                    de sites quanto no desenvolvimento de grandes sistemas. Estagiei por um ano no
                    ICC — Instituto do Câncer do Ceará, onde trabalhei com sistemas de grande
                    porte como o Tasy, sistema de gestão hospitalar, e participei do desenvolvimento
                    do sistema Unimed Amparo - Private Unimed Pharmacy
                  </p>
                  <p>
                    Hoje atuo como desenvolvedor full stack, aplicando essas habilidades no
                    dia a dia. Também tenho um ano de experiência como auxiliar de edificações,
                    período em que aprendi na prática o fluxo de obras e medições. foi dessas vivências
                    de mercado que nasceu o Kargo!
                  </p>
                </div>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-medium text-white transition hover:bg-signal-400"
                >
                  Falar comigo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl lg:max-w-none">
                <img
                  src="/nicolas-rock.jpg"
                  alt="Nicolas Rock, desenvolvedor e criador do Kargo"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}
