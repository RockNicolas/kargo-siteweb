import { B, Callout, H2, L, P, Step, Steps, Table, UL } from '../ui'

export function OQueEOKargo() {
  return (
    <>
      <H2>Um painel para frota e obras</H2>
      <P>
        O Kargo junta em um só lugar o que normalmente fica espalhado em planilhas, papéis e mensagens: os
        veículos e máquinas da empresa, a documentação de cada um, o combustível, as manutenções e o
        material de cada obra. Tudo fica com histórico — quem lançou, quando e por quê — e o sistema avisa
        sozinho quando algo precisa de atenção.
      </P>

      <Table
        colunas={['Módulo', 'O que resolve']}
        linhas={[
          [<B>Patrimônio</B>, 'Cadastro de ativos, quilometragem e horímetro, movimentação entre obras e contratos de locação.'],
          [<B>Documentação</B>, 'IPVA, licenciamento, seguro, CRLV, CNH dos motoristas e multas, com alerta antes do vencimento.'],
          [<B>Combustível</B>, 'Abastecimentos por ativo, com comprovante e foto, e o gasto por período.'],
          [<B>Manutenção</B>, 'Preventiva por quilometragem ou horas, manutenções realizadas, ordem de serviço e gastos.'],
          [<B>Almoxarifado</B>, 'Estoque separado por obra: entradas, saídas, transferências, reservas e saldo sempre atualizado.'],
          [<B>Relatórios</B>, 'Relatórios de cada módulo e visão consolidada de gastos, exportados em PDF ou Excel com o seu logotipo.'],
        ]}
      />

      <Callout tipo="info" titulo="Módulos contratados">
        <p>
          Cada empresa usa os módulos que contratou. Se um módulo não aparece no seu menu, ele não faz parte
          do seu plano ou não foi liberado para o seu usuário — veja{' '}
          <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
        </p>
      </Callout>

      <H2>Painel e painel da diretoria</H2>
      <P>O Kargo tem duas formas de acesso, de acordo com o perfil de cada pessoa:</P>
      <UL>
        <li>
          <B>Painel</B> — para administradores e operadores. É onde se cadastra, lança e edita: abastecimentos,
          documentos, manutenções, movimentações de estoque e assim por diante.
        </li>
        <li>
          <B>Painel da diretoria</B> — só para consulta. Mostra quanto a operação gastou, o que mudou em relação ao
          mês anterior e por quê, além das listas dos módulos liberados, sem permitir alterações. Ideal para
          diretoria, sócios ou um contratante que precisa acompanhar sem mexer. Veja{' '}
          <L to="/docs/manual/painel-da-diretoria">Painel da diretoria</L>.
        </li>
      </UL>

      <H2>Onde funciona</H2>
      <P>
        O Kargo roda no navegador — não é preciso instalar nada. Funciona em computador, tablet e celular, e
        as telas se ajustam ao tamanho da tela. Os dados ficam na nuvem, então o que é lançado no campo aparece
        na hora para o escritório.
      </P>

      <H2>Integração com o Sienge</H2>
      <P>
        Para quem já usa o Sienge, o Kargo conversa com ele: o estoque das obras fica igual nos dois
        sistemas, a obra onde cada ativo está é atualizada sozinha e a baixa de um título no financeiro marca como
        paga a manutenção, a multa ou o IPVA. Entenda em <L to="/docs/manual/sienge-visao-geral">Como funciona a integração</L>.
      </P>

      <H2>Por onde começar</H2>
      <Steps>
        <Step titulo="Acesse o endereço da sua empresa">
          Veja como em <L to="/docs/manual/primeiro-acesso">Primeiro acesso</L>.
        </Step>
        <Step titulo="Crie os usuários da equipe">
          O administrador cria cada conta e escolhe os módulos de cada pessoa —{' '}
          <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
        </Step>
        <Step titulo="Cadastre os ativos">
          Veículos, máquinas e equipamentos são a base de quase tudo — <L to="/docs/manual/patrimonio">Patrimônio</L>.
        </Step>
        <Step titulo="Cadastre as obras e o estoque inicial">
          Se for usar o almoxarifado, comece pelas obras e pela carga inicial —{' '}
          <L to="/docs/manual/almoxarifado">Almoxarifado por obra</L>.
        </Step>
      </Steps>
    </>
  )
}
