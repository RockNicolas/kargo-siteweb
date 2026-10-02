import { B, Callout, H2, Menu, P, Table } from '../ui'

export function ManualAlertas() {
  return (
    <>
      <P>
        O Kargo acompanha prazos e números por você. Quando algo precisa de atenção, aparece um aviso no{' '}
        <B>sininho</B> do topo do painel (e do painel da diretoria), com o link direto para a tela certa.
      </P>

      <H2>O que gera alerta</H2>
      <Table
        colunas={['Módulo', 'Alertas']}
        linhas={[
          [<B>Patrimônio</B>, 'Divergências no controle de entrada e saída; avisos da sincronização automática com o Sienge.'],
          [<B>Documentação</B>, 'CNH vencendo, IPVA vencendo, licenciamento vencendo, demais documentos (seguro, CRLV, inspeção, extintor) e multas em aberto.'],
          [<B>Manutenção</B>, 'Manutenção preventiva perto de vencer ou atrasada; boletos de manutenção.'],
          [<B>Almoxarifado</B>, 'Estoque abaixo do mínimo ou zerado; previsão de ruptura (vai faltar em breve).'],
          [<B>Combustível</B>, 'Semana sem cadastro de abastecimento.'],
          [<B>Relatórios</B>, 'Resumo semanal com os principais números.'],
        ]}
      />
      <P>
        Cada pessoa só recebe alertas dos módulos que tem liberados — quem não mexe com almoxarifado não é
        incomodado com estoque baixo.
      </P>

      <H2>Escolher os seus alertas</H2>
      <P>
        Em <Menu itens={['Configurações', 'Notificações']} /> você liga ou desliga cada tipo de alerta, ou um
        módulo inteiro de uma vez. A escolha vale só para você: desligar um alerta não afeta os outros usuários.
      </P>

      <H2>Ler e dispensar</H2>
      <P>
        Clique num aviso para ir direto ao registro. Dá para marcar como lido ou dispensar, um por um ou todos de
        uma vez.
      </P>
      <Callout tipo="info" titulo="Sem avisos repetidos">
        <p>
          Um vencimento avisa em momentos-chave (antes de vencer, no dia e depois de vencido), em vez de repetir o
          mesmo aviso todo dia.
        </p>
      </Callout>
    </>
  )
}
