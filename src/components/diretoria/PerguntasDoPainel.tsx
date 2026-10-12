import { painelDiretoriaDemo } from '../../data/painelDiretoriaDemo'
import { formatarMoedaCompacta, formatarPct } from './formatos'

/**
 * As perguntas que toda diretoria faz e o que o painel responde logo ao abrir — com os números do
 * próprio demo (mesmo arquivo gerado do sistema), então nunca divergem do que a janela mostra.
 */
function montarPerguntas() {
  const painel = painelDiretoriaDemo.periodos[painelDiretoriaDemo.mesFinal]
  const { contas, comparativo, rotulo } = painel
  const mes = rotulo.split(' de ')[0]
  const total = comparativo?.linhas[0]
  const mesAnterior = comparativo?.anterior.split(' de ')[0]
  const principal = comparativo?.causas[0]

  return [
    {
      pergunta: 'Quanto a operação gastou?',
      resposta: formatarMoedaCompacta(contas.custoTotal),
      detalhe: `em ${mes}, entre combustível, manutenção e multas`,
    },
    {
      pergunta: 'Subiu ou desceu?',
      resposta: total ? `${formatarPct(Math.abs(total.pct ?? 0))} ${total.delta < 0 ? 'a menos' : 'a mais'}` : 'Mês contra mês',
      detalhe: mesAnterior ? `do que em ${mesAnterior}` : 'contra o período anterior',
    },
    {
      pergunta: 'Por que mudou?',
      resposta: principal ? principal.titulo : 'A causa de cada variação',
      detalhe: principal ? principal.resumo : 'com o número que a sustenta',
    },
    {
      pergunta: 'Sobrou quanto?',
      resposta: formatarMoedaCompacta(contas.resultadoOperacao),
      detalhe: `${formatarPct(contas.margemOperacao)} da receita depois de todos os custos`,
    },
  ]
}

export function PerguntasDoPainel() {
  const perguntas = montarPerguntas()
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {perguntas.map((p) => (
        <div
          key={p.pergunta}
          className="relative overflow-hidden rounded-2xl border border-asphalt-200 bg-white p-4 dark:border-asphalt-800 dark:bg-black sm:p-5"
        >
          <span className="absolute inset-y-0 left-0 w-1 bg-signal-500" aria-hidden />
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400 sm:text-[11px]">
            {p.pergunta}
          </p>
          <p className="mt-2.5 font-display text-xl font-semibold leading-tight text-asphalt-950 dark:text-white sm:mt-3 sm:text-2xl">
            {p.resposta}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-asphalt-500 dark:text-asphalt-400 sm:mt-2 sm:text-sm">
            {p.detalhe}
          </p>
        </div>
      ))}
    </div>
  )
}
