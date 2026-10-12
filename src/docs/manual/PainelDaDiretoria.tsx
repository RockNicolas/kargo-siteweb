import { B, Callout, H2, H3, L, Menu, P, Table, UL } from '../ui'

export function ManualPainelDaDiretoria() {
  return (
    <>
      <P>
        O <B>Painel da diretoria</B> reúne em uma tela só o que a diretoria precisa: quanto a operação gastou, o que
        mudou em relação ao período anterior e por quê. É um painel de consulta — dá para ver tudo, mas não alterar
        nada — e mostra apenas os módulos liberados para cada pessoa. Funciona no computador, no tablet e no celular.
      </P>

      <H2>Como abrir</H2>
      <UL>
        <li>
          <B>Perfil de consulta (diretoria e sócios)</B> — o painel é a tela inicial ao entrar.
        </li>
        <li>
          <B>Administradores e operadores</B> — clique em <Menu itens={['Painel operacional']} /> no menu lateral.
        </li>
      </UL>

      <H2>Escolher o período</H2>
      <P>
        No topo, a chave <B>Mês / Ano</B> define o recorte e as setas ao lado do período navegam para o anterior ou o
        próximo. A navegação vai do primeiro mês com lançamentos no Kargo até o mês corrente.
      </P>
      <UL>
        <li>
          O <B>mês em andamento</B> mostra os valores apurados até hoje e é marcado com asterisco no gráfico.
        </li>
        <li>
          A comparação com o período anterior só aparece quando o período fecha — para não comparar meio mês com um
          mês inteiro — e não existe no primeiro mês de uso. Nesses casos o painel mostra o total e diz o motivo.
        </li>
      </UL>

      <H2>O que o painel mostra</H2>
      <Table
        colunas={['Bloco', 'Para que serve']}
        linhas={[
          [
            <B>Toda a operação em uma visão</B>,
            'Receita dos contratos, custo, resultado e margem; para onde vai o dinheiro (em barras ou rosca); o peso de cada categoria de ativo; o equilíbrio dos ativos; e a evolução mês a mês, com o resultado de cada mês.',
          ],
          [
            <B>Pontos de atenção</B>,
            'O que olhar primeiro, em ordem de gravidade: risco, atenção e o que está bem. Cada ponto leva ao bloco de onde o número saiu.',
          ],
          [
            <B>De onde vem e para onde vai o dinheiro</B>,
            'A conta inteira em reais — receita menos combustível, manutenção, multas e IPVA —, o resultado por categoria de ativo e os ativos que fecharam o período no prejuízo ou perto disso.',
          ],
          [<B>Mês contra mês</B>, 'O gasto total e o de cada tipo de custo, lado a lado com o período anterior.'],
          [
            <B>Por que mudou</B>,
            'A causa de cada variação, com números: combustível (litros ou preço), manutenção (quais ativos, quais serviços), multas e IPVA.',
          ],
          [
            <B>Cada área em poucos números</B>,
            'Um cartão por módulo: combustível, manutenção, patrimônio, documentos e almoxarifado. Quem quiser detalhe abre a análise daquele módulo.',
          ],
          [<B>Como ler estes números</B>, 'Recolhido no fim da tela: as regras de cálculo e os avisos sobre os dados.'],
        ]}
      />
      <P>
        Os atalhos no topo (Visão geral, Prioridades, Custos e resultados, Comparativo, Causas e Áreas da operação)
        levam direto a cada bloco.
      </P>

      <Callout tipo="info" titulo="Sem comparação quando não há base">
        <p>
          Se o período anterior não tem dados — por exemplo, no primeiro mês de uso — o painel mostra o total do
          período e avisa o motivo, em vez de inventar uma comparação.
        </p>
      </Callout>

      <H2>Apresentar em reunião</H2>
      <P>
        O botão <B>Apresentar</B> abre os mesmos números em <B>slides, em tela cheia</B> — um assunto por slide, com
        letra grande, pronto para reunião ou para a TV da sala. Os slides seguem o período que está na tela: capa,
        resultado, para onde foi o dinheiro, mês a mês, comparativo, causas, pontos de atenção, uma página por área
        da operação e como ler os números.
      </P>
      <UL>
        <li>
          Passe com as <B>setas</B> do teclado, com a barra de espaço ou clicando no slide; <B>Esc</B> sai e{' '}
          <B>F</B> alterna a tela cheia.
        </li>
        <li>
          <B>P</B> liga o <B>passar sozinho</B>, que troca de slide a cada 12 segundos — bom para deixar na TV.
        </li>
        <li>
          Dá para baixar a apresentação em <B>PDF</B> (um slide por página), em <B>PowerPoint editável</B> — para
          juntar com os slides da própria empresa — e em <B>Excel</B>.
        </li>
      </UL>
      <Callout tipo="dica" titulo="No celular">
        <p>
          O botão Apresentar aparece em telas maiores, onde há tela cheia. No celular, o painel inteiro continua
          disponível, com os blocos empilhados.
        </p>
      </Callout>

      <H2>De onde vêm os números</H2>
      <P>
        Tudo é calculado com o que já foi lançado nos módulos: combustível, manutenção, multas, IPVA e contratos
        dos ativos. Por isso o painel só fica tão bom quanto o registro em dia. Quando um pagamento é confirmado
        pelo Sienge, ele entra nos custos sem ninguém digitar de novo — veja{' '}
        <L to="/docs/manual/contas-a-pagar">Contas a Pagar pelo Sienge</L>.
      </P>
      <H3>O que entra e o que não entra</H3>
      <UL>
        <li>
          <B>Entra:</B> receita do contrato de cada ativo, combustível lançado, manutenção já paga (boleto ou PIX) e
          multas, IPVA e licenciamento já pagos.
        </li>
        <li>
          <B>Não entra:</B> serviço feito e ainda não pago (fica como “a pagar”), material consumido do almoxarifado
          e despesas que não são lançadas no Kargo.
        </li>
      </UL>

      <H2>Quem pode ver</H2>
      <P>
        Cada usuário vê somente os módulos liberados para ele; os custos de um módulo desligado ou não contratado não
        aparecem no painel. Veja <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
      </P>
    </>
  )
}
