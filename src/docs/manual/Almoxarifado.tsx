import { B, Callout, H2, L, Menu, P, Step, Steps, Table, UL } from '../ui'

export function ManualAlmoxarifado() {
  return (
    <>
      <P>
        No Kargo o estoque não é uma caixa única: <B>cada obra tem o próprio saldo</B>. Assim dá para saber
        exatamente quanto cimento, quantos filtros ou quantos litros de óleo existem em cada obra agora, e quem
        tirou o quê, quando e para quê.
      </P>

      <H2>Como a tela é organizada</H2>
      <P>O Almoxarifado tem uma barra de abas no topo:</P>
      <Table
        colunas={['Aba', 'Para que serve']}
        linhas={[
          [<B>Insumos</B>, 'Cadastro de peças e materiais: código, nome, unidade, categoria, estoque mínimo e valor unitário.'],
          [<B>Entradas e saídas</B>, 'Histórico de entradas e saídas, com filtro por insumo e por tipo.'],
          [<B>Obras</B>, 'Cada obra (ou base/almoxarifado central) que tem estoque próprio. Aqui também se vincula a obra ao Sienge.'],
          [<B>Movimentação por obra</B>, 'Entradas, saídas e transferências entre obras — o dia a dia do almoxarifado.'],
          [<B>Reservas</B>, 'Separar material para um ativo ou obra sem tirá-lo do saldo antes da hora.'],
          [<B>Tipos de movimento</B>, 'Catálogo de motivos: compra, consumo, devolução, transferência… cada um de entrada, saída ou ambos.'],
          [<B>Categorias de insumos</B>, 'Agrupamentos usados em filtros e relatórios (ex.: filtros, lubrificantes, EPIs).'],
          [<B>Inicialização de estoque</B>, 'Carga do saldo inicial de uma obra, por digitação, planilha ou PDF do Sienge.'],
        ]}
      />

      <H2>Lançar uma movimentação</H2>
      <Steps>
        <Step titulo="Abra Movimentação por obra e clique para lançar">Escolha o tipo de movimento.</Step>
        <Step titulo="Escolha a obra e o insumo">
          Numa <B>transferência</B>, informe a obra de origem e a de destino: sai de uma e entra na outra no mesmo
          lançamento.
        </Step>
        <Step titulo="Informe quantidade, data e documento">
          O campo de documento aceita, por exemplo, o número da nota fiscal ou da ordem de serviço.
        </Step>
        <Step titulo="Salve">
          O saldo da obra é atualizado na hora. A lista mostra o saldo antes e depois de cada movimento e quem
          lançou.
        </Step>
      </Steps>
      <Callout tipo="info" titulo="Baixa pela manutenção">
        <p>
          Peças usadas numa manutenção realizada não precisam ser lançadas aqui de novo: ao registrar a
          manutenção, escolha de qual obra a peça saiu e o Kargo debita o estoque certo. Veja{' '}
          <L to="/docs/manual/manutencao">Manutenção</L>.
        </p>
      </Callout>

      <H2>Reservas</H2>
      <P>
        Uma reserva separa material para um ativo ou uma obra. Ela fica <B>pendente</B> até o material ser
        entregue — só então o saldo é debitado. Pode ser atendida aos poucos (<B>parcial</B>), por completo (
        <B>atendida</B>) ou <B>cancelada</B>.
      </P>

      <H2>Carga inicial do estoque</H2>
      <P>
        Em <Menu itens={['Almoxarifado', 'Inicialização de estoque']} /> se informa o saldo de partida de uma obra.
        Três jeitos:
      </P>
      <UL>
        <li>
          <B>Digitando</B> — a tela mostra o saldo atual de cada insumo e uma prévia “de X para Y” antes de
          confirmar. Se a contagem for menor que o saldo, o Kargo pede confirmação.
        </li>
        <li>
          <B>Planilha Excel</B> — baixe o modelo, preencha e envie (até 1.500 linhas por arquivo).
        </li>
        <li>
          <B>PDF do Sienge</B> — envie o relatório “Posições de Estoque Atual” do Sienge; o Kargo lê o PDF e já
          cria a obra pelo código dela no Sienge.
        </li>
      </UL>
      <P>As últimas inicializações ficam listadas no fim da tela, para conferência.</P>

      <H2>Estoque mínimo e previsão de ruptura</H2>
      <P>
        Cada insumo pode ter um estoque mínimo. Abaixo dele, o Kargo avisa. Além disso, olhando o ritmo de
        consumo, ele calcula o que <B>vai faltar em breve</B> — antes de faltar de verdade. O relatório de lista
        de compras mostra os itens em ruptura ou a caminho dela, com a quantidade sugerida e o valor estimado para
        repor.
      </P>

      <H2>Transformar insumo em ativo</H2>
      <P>
        Comprou um equipamento que entrou pelo almoxarifado (uma betoneira, um gerador)? Na lista de insumos dá
        para transformá-lo em ativo do Patrimônio: uma unidade sai do estoque e o ativo nasce já ligado à origem.
      </P>

      <H2>Com o Sienge</H2>
      <P>
        Obras vinculadas ao Sienge ficam com o saldo igual nos dois sistemas: o que é lançado aqui vai para o
        Sienge, e o que muda lá chega aqui. A coluna <B>Sienge</B> da movimentação mostra se cada lançamento já foi
        enviado. Veja <L to="/docs/manual/sienge-visao-geral">Como funciona a integração</L>.
      </P>

      <H2>Relatórios</H2>
      <P>
        Em <Menu itens={['Relatório', 'Almoxarifado']} />: resumo, entradas e saídas, posição atual, extrato por
        insumo, análise e lista de compras — todos filtráveis por obra, com PDF e Excel.
      </P>
    </>
  )
}
