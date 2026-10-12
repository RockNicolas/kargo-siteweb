import { ArrowLeftRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { Logo } from './Logo'
import { TituloFlowDemo } from './sienge/TituloFlowDemo'
import { HistoricoIntegracao } from './sienge/HistoricoIntegracao'
import { tituloGarantias } from '../data/content'

/**
 * Diferencial do Kargo: o título nasce no Contas a Pagar do Sienge a partir do cadastro
 * (manutenção, multa, IPVA e licenciamento) e a baixa volta sozinha.
 *
 * A seção é sempre escura (classe `dark` local), independente do tema do site — é o "palco"
 * da página: contrasta com as seções vizinhas nos dois temas e mantém as janelas do app
 * (que sempre usam as cores do painel escuro) com a aparência de verdade.
 */
export function SiengeTitulos() {
  return (
    <section id="sienge" className="dark relative overflow-hidden bg-asphalt-950 text-white">
      <div className="stripe-divider h-2.5" aria-hidden />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, black 20%, transparent 75%)',
          }}
        />
        <div className="absolute left-1/2 top-24 h-[420px] w-[860px] max-w-[140vw] -translate-x-1/2 rounded-full bg-signal-500/20 blur-3xl" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-signal-500/40 bg-signal-500/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-signal-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Novo · Diferencial do Kargo
            </span>

            <div className="mt-7 flex items-center justify-center gap-4 sm:gap-5">
              <Logo dark className="!h-8 sm:!h-9" />
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-signal-400">
                <ArrowLeftRight className="h-4 w-4" aria-hidden />
              </span>
              <img src="/sienge-logo-white.png" alt="Sienge" className="h-7 w-auto sm:h-8" />
            </div>

            <h2 className="mt-7 font-display text-[clamp(2rem,4.8vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
              Lançou no Kargo? O título já nasce{' '}
              <span className="text-signal-400">no Contas a Pagar do Sienge.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-asphalt-300">
              Manutenção, multa, IPVA e licenciamento viram título no financeiro direto do cadastro — conferido
              antes de enviar, sem digitar a mesma nota duas vezes. E quando o financeiro dá a baixa, o Kargo marca
              como pago sozinho.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <TituloFlowDemo />
        </Reveal>

        <div className="mt-24 sm:mt-28">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-signal-400">
                Feito para o financeiro confiar
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Automático não quer dizer descuidado.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-asphalt-300">
                Lançar título é mexer no dinheiro da empresa. Por isso cada passo é conferido, rastreável e
                protegido contra duplicidade.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tituloGarantias.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 90}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-signal-500/40 hover:bg-white/[0.05]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/15 text-signal-400">
                    <g.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold text-white">{g.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-asphalt-300">{g.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={60}>
            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-signal-500/30 bg-signal-500/10 p-5 sm:p-6">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal-500 text-asphalt-950">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-base leading-relaxed text-asphalt-200">
                <strong className="font-semibold text-white">A baixa continua com o financeiro.</strong> O Kargo
                cria o título e acompanha cada parcela; quem dá a baixa é o financeiro, na tela do Sienge. O Kargo
                só marca como pago depois que o Sienge confirma.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 sm:mt-28">
          <Reveal>
            <HistoricoIntegracao />
          </Reveal>
        </div>

      </Container>

      <div className="stripe-divider h-2.5" aria-hidden />
    </section>
  )
}
