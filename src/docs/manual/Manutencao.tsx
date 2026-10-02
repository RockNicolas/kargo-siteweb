import { B, Callout, H2, L, Menu, P, Step, Steps, UL } from '../ui'

export function ManualManutencao() {
  return (
    <>
      <P>
        A Manutenção cobre as duas pontas: o que <B>precisa</B> ser feito (a preventiva, calculada pela
        quilometragem ou pelas horas de uso) e o que <B>foi</B> feito (as manutenções realizadas, com peças, mão
        de obra, ordem de serviço e pagamento).
      </P>

      <H2>Manutenção de ativos (preventiva)</H2>
      <P>
        Em <Menu itens={['Manutenção', 'Manutenção de ativos']} /> cada ativo aparece com o medidor atual e o
        intervalo de cada serviço — por exemplo, troca de óleo a cada 10.000 km ou revisão a cada 250 horas. O
        Kargo compara a leitura atual com a da última manutenção e mostra o que está em dia, perto de vencer ou
        atrasado.
      </P>
      <UL>
        <li>A lista pode ser filtrada por município.</li>
        <li>
          As leituras de km e horímetro chegam do <B>controle de entrada e saída</B> do Patrimônio, sem precisar
          digitar duas vezes.
        </li>
        <li>Quando uma manutenção realizada é registrada, o ciclo daquele serviço recomeça a contar.</li>
      </UL>

      <H2>Manutenções realizadas</H2>
      <P>
        Em <Menu itens={['Manutenção', 'Manutenções realizadas']} /> fica o registro detalhado de cada serviço
        executado.
      </P>
      <Steps>
        <Step titulo="Escolha o ativo e a data">
          Informe também a leitura do medidor no dia e o responsável pelo serviço.
        </Step>
        <Step titulo="Selecione os serviços realizados">
          Um ou vários itens do catálogo (ex.: óleo, filtros, pneus) e a natureza: preventiva ou corretiva.
        </Step>
        <Step titulo="Lance peças e mão de obra">
          Cada item pode ter peças/materiais e mão de obra com valor próprio; o total é somado sozinho.
        </Step>
        <Step titulo="Dê baixa das peças do estoque (opcional)">
          Se a peça saiu do almoxarifado, escolha de qual <B>obra</B> ela saiu — o estoque certo é debitado na
          hora.
        </Step>
        <Step titulo="Informe o pagamento e anexe a OS">
          Número de parcelas e vencimentos, e o PDF da ordem de serviço ou nota fiscal (até 20 MB).
        </Step>
      </Steps>
      <P>
        A ordem de serviço anexada fica disponível na lista de realizadas (e no painel da diretoria) para abrir a
        qualquer momento.
      </P>

      <Callout tipo="info" titulo="Pagamento confirmado pelo Sienge">
        <p>
          Com a integração ligada, informe o número do título do Sienge na manutenção: o Kargo puxa os dados do
          título e, quando o financeiro dá baixa no Sienge, marca a parcela como paga aqui sozinho. Veja{' '}
          <L to="/docs/manual/sienge-visao-geral">Como funciona a integração</L>.
        </p>
      </Callout>

      <H2>Gastos de manutenção</H2>
      <P>
        Em <Menu itens={['Manutenção', 'Gastos de manutenção']} /> os custos são consolidados por ativo, na visão
        semanal ou mensal. Os valores das manutenções realizadas são trazidos para cá automaticamente, com as
        parcelas e boletos de cada uma — assim dá para ver o que vence na semana e o que já foi pago.
      </P>

      <H2>Itens de manutenção</H2>
      <P>
        Em <Menu itens={['Manutenção', 'Item de manutenção']} /> fica o catálogo de serviços usados na preventiva
        e nas manutenções realizadas. Mantenha esse catálogo enxuto e padronizado: é por ele que os relatórios
        agrupam os gastos.
      </P>

      <H2>Alertas e relatórios</H2>
      <P>
        O Kargo avisa sobre manutenção preventiva vencendo e boletos de manutenção. Em{' '}
        <Menu itens={['Relatório', 'Manutenção']} /> há relatórios de preventiva, realizadas, itens e gastos, com
        PDF e Excel.
      </P>
    </>
  )
}
