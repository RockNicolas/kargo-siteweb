import { PainelDiretoriaDemo } from './PainelDiretoriaDemo'
import { PerguntasDoPainel } from './PerguntasDoPainel'

/**
 * Perguntas + painel da diretoria. Fica num módulo próprio para a home carregá-lo sob demanda
 * (React.lazy): os dados dos períodos e a apresentação em slides não pesam no primeiro carregamento.
 */
export default function DiretoriaPainel() {
  return (
    <>
      <div className="mt-12">
        <p className="mb-4 text-center font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500 dark:text-asphalt-400">
          O que o painel responde assim que abre
        </p>
        <PerguntasDoPainel />
      </div>
      <div className="mt-10">
        <PainelDiretoriaDemo />
      </div>
    </>
  )
}
