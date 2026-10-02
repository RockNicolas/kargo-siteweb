import { B, Callout, H2, Menu, P, Table, UL } from '../ui'

export function ManualRelatorios() {
  return (
    <>
      <P>
        Tudo o que é lançado no Kargo vira relatório. Eles ficam em <Menu itens={['Relatório']} />, divididos por
        seção, e cada um pode ser filtrado, ordenado por qualquer coluna e exportado.
      </P>

      <H2>Seções</H2>
      <Table
        colunas={['Seção', 'Relatórios']}
        linhas={[
          [<B>Patrimônio</B>, 'Ativos, movimentação, contratos e controle de entrada e saída.'],
          [<B>Documentação</B>, 'Documentos dos ativos, CNH, multas, IPVA e licenciamento.'],
          [<B>Combustível</B>, 'Semanal e mensal, com totais por categoria e por tipo de combustível.'],
          [<B>Manutenção</B>, 'Preventiva, realizadas, itens e gastos (semanal, mensal e geral).'],
          [<B>Almoxarifado</B>, 'Resumo, entradas e saídas, posição atual, extrato, análise e lista de compras.'],
          [<B>Gastos Gerais</B>, 'Visão executiva: quanto cada ativo custou em combustível e manutenção, com ranking dos que mais gastam e detalhe mês a mês.'],
          [<B>Comparativo de Contrato</B>, 'Receita de contrato de cada ativo contra o custo dele — quem dá lucro e quem dá prejuízo. Fica em Patrimônio → Contrato.'],
          [<B>Obra</B>, 'Tudo de uma obra num lugar só (ver abaixo).'],
        ]}
      />

      <H2>Relatório de Obra</H2>
      <P>
        O número principal de cada obra é o <B>custo do período</B>: material consumido, manutenção, combustível e
        multas dos ativos da obra. O relatório compara com o mês anterior e mostra o que mais pesou na diferença.
        Ao clicar numa obra, abre o detalhe com quatro abas:
      </P>
      <UL>
        <li>
          <B>Estoque</B> — item por item, com quantidade e valor.
        </li>
        <li>
          <B>Manutenção</B> — o que foi gasto em manutenção dos ativos da obra.
        </li>
        <li>
          <B>Reservas e movimentações</B> — o que entrou, saiu e está separado.
        </li>
        <li>
          <B>Centro de custo</B> — o consolidado da obra, para conferir com o financeiro.
        </li>
      </UL>

      <H2>Exportar</H2>
      <UL>
        <li>
          <B>PDF</B> — com o logotipo da sua empresa no cabeçalho, pronto para enviar à diretoria ou a quem contrata o serviço.
        </li>
        <li>
          <B>Excel</B> — para quem quer cruzar os números em planilha.
        </li>
        <li>Os painéis com gráficos também podem ser exportados em PDF ou imagem.</li>
      </UL>
      <Callout tipo="dica" titulo="Filtre antes de exportar">
        <p>
          O arquivo exportado respeita os filtros da tela (período, ativo, obra, município). Filtre primeiro e
          exporte só o que interessa.
        </p>
      </Callout>

      <H2>Resumo semanal</H2>
      <P>
        Quem quiser pode receber o <B>resumo semanal</B> nas notificações, com os principais números da semana.
        Ligue ou desligue em <Menu itens={['Configurações', 'Notificações']} />.
      </P>
    </>
  )
}
