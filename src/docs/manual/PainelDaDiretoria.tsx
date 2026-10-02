import { B, Callout, H2, L, Menu, P, Table, UL } from '../ui'

export function ManualPainelDaDiretoria() {
  return (
    <>
      <P>
        O <B>Painel operacional</B> reúne em uma tela só o que a diretoria precisa: quanto a operação gastou, o que
        mudou em relação ao período anterior e por quê. É um painel de consulta — dá para ver tudo, mas não alterar
        nada — e mostra apenas os módulos liberados para cada pessoa.
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

      <H2>O que o painel mostra</H2>
      <Table
        colunas={['Bloco', 'Para que serve']}
        linhas={[
          [
            <B>Pontos de atenção</B>,
            'O que olhar primeiro: custo que subiu, margem apertada, ativo que custa mais do que rende.',
          ],
          [
            <B>De onde vem e para onde vai o dinheiro</B>,
            'Receita dos contratos menos combustível, manutenção, multas e IPVA, mês a mês e por categoria de ativo.',
          ],
          [
            <B>Mês contra mês</B>,
            'O gasto total e o de cada tipo de custo, lado a lado com o período anterior.',
          ],
          [
            <B>Por que mudou</B>,
            'A causa de cada variação, com números: combustível (litros ou preço), manutenção (quais ativos, quais serviços), multas e IPVA.',
          ],
          [<B>Cada área em poucos números</B>, 'Um cartão por módulo. Quem quiser detalhe abre a análise daquele módulo.'],
        ]}
      />

      <Callout tipo="info" titulo="Sem comparação quando não há base">
        <p>
          Se o período anterior não tem dados — por exemplo, no primeiro mês de uso — o painel mostra o total do
          período e avisa o motivo, em vez de inventar uma comparação.
        </p>
      </Callout>

      <H2>De onde vêm os números</H2>
      <P>
        Tudo é calculado com o que já foi lançado nos módulos: combustível, manutenção, multas, IPVA e contratos
        dos ativos. Por isso o painel só fica tão bom quanto o registro em dia. Quando um pagamento é confirmado
        pelo Sienge, ele entra nos custos sem ninguém digitar de novo — veja{' '}
        <L to="/docs/manual/contas-a-pagar">Contas a Pagar pelo Sienge</L>.
      </P>

      <H2>Quem pode ver</H2>
      <P>
        Cada usuário vê somente os módulos liberados para ele; os custos de um módulo desligado ou não contratado não
        aparecem no painel. Veja <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
      </P>
    </>
  )
}
