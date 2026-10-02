import { B, Callout, H2, Menu, P, Step, Steps, UL } from '../ui'

export function ManualCombustivel() {
  return (
    <>
      <P>
        O módulo de Combustível registra cada abastecimento da frota e mostra quanto se gasta por ativo, por
        categoria e por período. Ele tem duas visões — <B>semanal</B> e <B>mensal</B> — escolhidas no menu{' '}
        <Menu itens={['Combustível', 'Semanal']} /> ou <Menu itens={['Combustível', 'Mensal']} />.
      </P>

      <H2>Lançar um abastecimento</H2>
      <Steps>
        <Step titulo="Abra a aba Cadastro e clique para lançar">
          O formulário abre com os campos do abastecimento.
        </Step>
        <Step titulo="Busque o ativo">
          Digite o código, a placa ou o nome. Ao escolher, a categoria do ativo e o combustível padrão dessa
          categoria são preenchidos sozinhos (dá para trocar).
        </Step>
        <Step titulo="Informe litros e valor">
          Preencha também o motorista (do cadastro de CNH) e a localidade, se quiser.
        </Step>
        <Step titulo="Anexe o comprovante">
          Comprovante do PIX e fotos do abastecimento (bomba, painel, cupom), até 20 MB por arquivo.
        </Step>
      </Steps>
      <Callout tipo="dica" titulo="Abasteceu duas vezes na semana?">
        <p>
          Marque <B>Abasteceu 2 vezes nesta semana</B> no formulário: o mesmo lançamento passa a aceitar dois
          comprovantes PIX e até 10 fotos.
        </p>
      </Callout>

      <H2>Tipos de combustível</H2>
      <P>
        O botão <B>Combustíveis</B>, no topo da tela, abre o cadastro de tipos. O Kargo já vem com Diesel,
        Gasolina Comum, Aditivada e Álcool; dá para incluir outros (Arla, GNV…) e desativar os que a
        empresa não usa. Os relatórios e gráficos separam o gasto por tipo automaticamente.
      </P>

      <H2>Salvar o período</H2>
      <P>
        Ao fechar a semana ou o mês, salve o cadastro com um título e o mês de referência. Ele vai para a aba{' '}
        <B>Salvos</B>, agrupado por mês, e pode ser reaberto a qualquer momento para conferência.
      </P>

      <H2>Importação em lote</H2>
      <P>
        Quem já controla combustível em planilha pode importar vários lançamentos de uma vez a partir de um
        arquivo Excel, sem digitar um a um. Linhas com problema são apontadas na tela.
      </P>

      <H2>Acompanhamento</H2>
      <UL>
        <li>Resumo financeiro do período com totais por categoria (máquinas, veículos pesados, leves e outros).</li>
        <li>
          Alerta de <B>sem cadastro semanal</B> quando a semana passa sem lançamentos.
        </li>
        <li>
          Relatórios semanal e mensal em <Menu itens={['Relatório', 'Combustível']} />, com PDF e Excel.
        </li>
      </UL>
    </>
  )
}
