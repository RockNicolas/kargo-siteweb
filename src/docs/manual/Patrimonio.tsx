import { B, Callout, H2, H3, L, Menu, P, Step, Steps, Table, UL } from '../ui'

export function ManualPatrimonio() {
  return (
    <>
      <P>
        O Patrimônio é o cadastro central de tudo o que a empresa tem rodando: veículos, caminhões, máquinas e
        equipamentos — no Kargo, todos são chamados de <B>ativos</B>. Documentação, combustível e manutenção se
        apoiam nesse cadastro, por isso vale começar por aqui.
      </P>

      <H2>Ativos</H2>
      <P>
        Em <Menu itens={['Patrimônio', 'Ativos']} /> fica a lista completa, com abas por categoria (máquinas,
        veículos pesados, veículos leves e equipamentos) e filtro de ativos e inativos.
      </P>
      <Table
        colunas={['Campo', 'Para que serve']}
        linhas={[
          [<B>Código</B>, 'Número único do ativo (o “prefixo”). É por ele que se busca o ativo em todo o sistema.'],
          [<B>Nome</B>, 'Descrição do ativo, ex.: “Caminhão Basculante 01” ou “Escavadeira 320”.'],
          [<B>Placa</B>, 'Opcional — máquinas e equipamentos normalmente não têm.'],
          [<B>Categoria</B>, 'Máquina, Veículo Pesado, Veículo Leve ou Outros (equipamentos). Usada nos filtros e relatórios.'],
          [<B>Município e localidade</B>, 'Onde o ativo está trabalhando. Organiza o controle de entrada e saída e a manutenção.'],
          [<B>Obra</B>, 'Obra em que o ativo está alocado (a mesma lista de obras do Almoxarifado).'],
          [<B>Medidor</B>, 'Se o desgaste é contado em quilômetros ou em horas (horímetro), e o intervalo entre manutenções.'],
        ]}
      />
      <Callout tipo="dica" titulo="Ativo que saiu da operação">
        <p>
          Vendeu ou devolveu um ativo? Marque como <B>inativo</B> em vez de excluir. Ele some das listas do dia a
          dia, mas todo o histórico de combustível, documentos e manutenção continua disponível nos relatórios.
        </p>
      </Callout>

      <H2>Controle de entrada e saída</H2>
      <P>
        Em <Menu itens={['Patrimônio', 'Controle Entrada Saida']} /> fica a planilha de quilometragem e horímetro
        de cada ativo, separada por município. Cada linha é um ativo e cada coluna um dia do período; o Kargo soma
        o total rodado (km) ou trabalhado (horas) no período.
      </P>
      <UL>
        <li>
          <B>Período configurável</B> — diário, semanal, quinzenal ou mensal, conforme a rotina da empresa.
        </li>
        <li>
          <B>Divergências</B> — se a leitura inicial de um dia não bate com a final do lançamento anterior, o
          Kargo marca a divergência, pede uma observação explicando a diferença e gera um alerta.
        </li>
        <li>
          <B>Atualização da manutenção</B> — as leituras lançadas aqui atualizam o medidor usado na manutenção
          preventiva, na hora de salvar ou de forma automática agendada. Assim a próxima revisão é calculada com a
          quilometragem real.
        </li>
        <li>
          Um ativo pode ser retirado do controle sem ser excluído do patrimônio (por exemplo, enquanto está parado).
        </li>
      </UL>

      <H2>Movimentação</H2>
      <P>
        Em <Menu itens={['Patrimônio', 'Movimentação']} /> se registra a transferência de um ativo para outro
        município, localidade ou obra, com o responsável pela movimentação. O histórico mostra por onde cada ativo
        passou.
      </P>
      <Callout tipo="info" titulo="Com o Sienge">
        <p>
          Se a empresa usa o Sienge e ligou a sincronização de ativos, o Kargo confere no Sienge a cada 15 minutos
          onde cada bem vinculado está e atualiza a obra dele aqui. Veja{' '}
          <L to="/docs/manual/sienge-visao-geral">Como funciona a integração</L>.
        </p>
      </Callout>

      <H2>Contrato</H2>
      <P>
        Para empresas que alugam seus ativos, <Menu itens={['Patrimônio', 'Contrato']} /> guarda o{' '}
        <B>valor mensal do contrato</B> de cada ativo e os PDFs do contrato e do termo de entrega. No topo da tela
        aparecem a receita mensal somada e quantos ativos estão sem contrato.
      </P>
      <P>
        Esse valor alimenta o relatório <B>Comparativo de Contrato</B>, que coloca lado a lado o que cada ativo
        rende e quanto ele custa em combustível e manutenção — ver{' '}
        <L to="/docs/manual/relatorios">Relatórios e painéis</L>.
      </P>

      <H2>Primeiro cadastro, passo a passo</H2>
      <Steps>
        <Step titulo="Abra Patrimônio › Ativos e clique em adicionar">Preencha código, nome e categoria.</Step>
        <Step titulo="Informe onde o ativo está">Município, localidade e, se houver, a obra.</Step>
        <Step titulo="Defina o medidor">Quilômetros ou horas, e o intervalo de manutenção preventiva.</Step>
        <Step titulo="Salve">
          O ativo já pode receber abastecimentos, documentos e manutenções.
        </Step>
      </Steps>

      <H3>Relatórios do módulo</H3>
      <P>
        Ativos, movimentação, contratos e controle de entrada e saída têm relatório próprio em{' '}
        <Menu itens={['Relatório', 'Patrimônio']} />, com exportação em PDF e Excel.
      </P>
    </>
  )
}
