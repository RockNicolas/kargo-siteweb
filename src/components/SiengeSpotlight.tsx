
import { ArrowRight, BadgeCheck, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { siengeBenefits, contasAPagarPassos, contasAPagarOndeAplica } from '../data/content'

export function SiengeSpotlight() {
  return (
    <section id="sienge" className="bg-white pb-12 pt-20 dark:bg-black sm:pb-16 sm:pt-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Integrações via API"
            title="Integrações com sistemas ERP"
            description="O Kargo se conecta a sistemas ERP via API para manter o estoque de cada obra sempre sincronizado — hoje com o Sienge: estoque nos dois sentidos e pagamentos conferidos no Contas a Pagar, sem lançar a mesma coisa duas vezes."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siengeBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-asphalt-200 p-6 dark:border-asphalt-800">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display font-semibold text-asphalt-950 dark:text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                  {b.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>


        <Reveal delay={40}>
          <div className="mt-14 rounded-3xl border border-asphalt-200 bg-concrete-50 p-6 dark:border-asphalt-800 dark:bg-asphalt-900/60 sm:p-10">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                Contas a Pagar
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-3xl">
                O financeiro dá baixa no Sienge. O Kargo marca como pago.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                Chega de perguntar se aquele boleto, multa ou IPVA já foi pago. O Kargo lê o título no Sienge e
                acompanha cada parcela até a baixa.
              </p>
            </div>

            <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
              {contasAPagarPassos.flatMap((p, i) => {
                const card = (
                  <li
                    key={p.title}
                    className="rounded-2xl border border-asphalt-200 bg-white p-5 dark:border-asphalt-800 dark:bg-black"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-asphalt-400">
                        Passo {i + 1}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display font-semibold text-asphalt-950 dark:text-white">{p.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                      {p.description}
                    </p>
                  </li>
                )
                if (i === contasAPagarPassos.length - 1) return [card]
                return [
                  card,
                  <li key={`seta-${i}`} aria-hidden className="flex items-center justify-center text-asphalt-300 dark:text-asphalt-600">
                    <ArrowRight className="hidden h-5 w-5 md:block" />
                    <ChevronDown className="h-5 w-5 md:hidden" />
                  </li>,
                ]
              })}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-asphalt-500 dark:text-asphalt-400">Vale para:</span>
              {contasAPagarOndeAplica.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-asphalt-200 bg-white px-3 py-1 text-xs font-medium text-asphalt-700 dark:border-asphalt-700 dark:bg-black dark:text-asphalt-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm text-asphalt-500 dark:text-asphalt-400">
              Parcela paga só no Sienge é marcada; nunca desmarcada. Parcial ou em aberto continua em aberto.{' '}
              <Link
                to="/docs/manual/contas-a-pagar"
                className="font-medium text-signal-600 underline-offset-4 hover:underline dark:text-signal-400"
              >
                Como funciona na prática
              </Link>
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-asphalt-200 bg-concrete-50 dark:border-asphalt-800 dark:bg-asphalt-900/60">
            <div className="h-1 bg-signal-500" aria-hidden />
            <div className="flex flex-col items-center gap-8 px-6 py-10 text-center sm:px-10 md:flex-row md:gap-12 md:text-left lg:px-14 lg:py-12">
              <div className="flex shrink-0 flex-col items-center gap-4 md:w-72">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Parceiro de integração
                </span>
                <img src="/sienge-logo.svg" alt="Sienge" className="h-14 w-auto dark:hidden" />
                <img src="/sienge-logo-white.png" alt="Sienge" className="hidden h-12 w-auto dark:block" />
              </div>

              <div className="hidden h-24 w-px bg-asphalt-200 dark:bg-asphalt-800 md:block" aria-hidden />

              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold text-asphalt-950 dark:text-white sm:text-2xl">
                  Tudo o que o financeiro e o almoxarifado já fazem no Sienge, sem digitar de novo no Kargo.
                </p>
                <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {['Estoque por obra', 'Localização dos ativos', 'Contas a Pagar'].map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-asphalt-200 bg-white px-3 py-1 text-xs font-medium text-asphalt-700 dark:border-asphalt-700 dark:bg-black dark:text-asphalt-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
