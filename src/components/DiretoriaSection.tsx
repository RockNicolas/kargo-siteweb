import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { diretoriaItens } from '../data/content'

interface CartaoExemplo {
  rotulo: string
  atual: string
  variacao: string
  subiu: boolean
  anterior: number
  agora: number
}

// Números de exemplo — ilustram o formato do painel, não são dados de cliente.
const cartoes: CartaoExemplo[] = [
  { rotulo: 'Gasto total', atual: 'R$ 184.300', variacao: '+R$ 21.900 (13,5%)', subiu: true, anterior: 78, agora: 88 },
  { rotulo: 'Combustível', atual: 'R$ 96.700', variacao: '+R$ 14.200 (17,2%)', subiu: true, anterior: 70, agora: 82 },
  { rotulo: 'Manutenção', atual: 'R$ 71.400', variacao: '−R$ 3.800 (5,1%)', subiu: false, anterior: 75, agora: 71 },
]

const causas = [
  'Combustível: o preço médio do litro subiu 9% e o consumo, 7% — a maior parte da alta veio do preço.',
  'Manutenção: três ativos concentram 58% do valor; duas das ordens foram corretivas.',
  'Multas: nenhuma nova no mês.',
]

function CartaoComparativo({ c }: { c: CartaoExemplo }) {
  const Seta = c.subiu ? ArrowUpRight : ArrowDownRight
  // Custo subindo é ruim (vermelho); caindo é bom (verde) — sempre com seta e sinal, não só cor.
  const tom = c.subiu
    ? 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
  const barra = c.subiu ? 'bg-red-500' : 'bg-emerald-500'
  return (
    <div className="rounded-xl border border-asphalt-200 bg-white p-4 dark:border-asphalt-800 dark:bg-asphalt-950">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-asphalt-500 dark:text-asphalt-400">
        {c.rotulo}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold text-asphalt-950 dark:text-white">{c.atual}</p>
      <span
        className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold tabular-nums ${tom}`}
      >
        <Seta className="h-3.5 w-3.5" aria-hidden />
        {c.variacao}
      </span>
      <div className="mt-4 space-y-2" aria-hidden>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-concrete-100 dark:bg-asphalt-800">
          <div className="h-full rounded-full bg-asphalt-300 dark:bg-asphalt-600" style={{ width: `${c.anterior}%` }} />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-concrete-100 dark:bg-asphalt-800">
          <div className={`h-full rounded-full ${barra}`} style={{ width: `${c.agora}%` }} />
        </div>
      </div>
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
            eyebrow="Painel da diretoria"
            title="A operação inteira em uma tela, para quem decide."
            description="Um painel pensado para a diretoria: quanto a operação gastou, o que mudou em relação ao mês anterior e por que mudou — sem abrir cada módulo e sem planilha."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {diretoriaItens.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-asphalt-200 bg-white p-6 dark:border-asphalt-800 dark:bg-black">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display font-semibold text-asphalt-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-asphalt-200 bg-white shadow-xl shadow-asphalt-950/5 dark:border-asphalt-800 dark:bg-black dark:shadow-black/40">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-asphalt-200 px-5 py-3 dark:border-asphalt-800">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  Mês contra mês
                </p>
                <h3 className="font-display text-lg font-semibold text-asphalt-950 dark:text-white">
                  Setembro contra agosto
                </h3>
              </div>
              <span className="rounded-full bg-concrete-100 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-asphalt-500 dark:bg-asphalt-800 dark:text-asphalt-300">
                Exemplo ilustrativo
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3">
                {cartoes.map((c) => (
                  <CartaoComparativo key={c.rotulo} c={c} />
                ))}
              </div>

              <div className="rounded-xl border border-asphalt-200 bg-concrete-50 p-5 dark:border-asphalt-800 dark:bg-asphalt-900/60 lg:col-span-2">
                <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-asphalt-500 dark:text-asphalt-400">
                  Análise das causas · por que mudou
                </p>
                <ul className="mt-3 space-y-3">
                  {causas.map((c) => (
                    <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-asphalt-700 dark:text-asphalt-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-asphalt-500 dark:text-asphalt-400">
            O painel é só de consulta — a diretoria acompanha sem alterar nada. Cada pessoa vê apenas os
            módulos liberados para ela.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
