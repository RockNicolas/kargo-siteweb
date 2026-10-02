import { B, Callout, H2, Menu, P, Step, Steps, Table, UL } from '../ui'

export function PerfisDeAcesso() {
  return (
    <>
      <H2>Os três perfis</H2>
      <Table
        colunas={['Perfil', 'Onde entra', 'O que pode fazer']}
        linhas={[
          [
            <B>Administrador</B>,
            'Painel',
            'Tudo: todos os módulos contratados, criação de usuários, histórico de atividades e integração com o Sienge.',
          ],
          [
            <B>Operador</B>,
            'Painel',
            'Cadastrar, lançar e editar somente nos módulos que o administrador liberou para ele.',
          ],
          [
            <B>Diretoria</B>,
            'Painel da diretoria',
            'Ver o painel operacional (gastos, comparação com o mês anterior e causas) e consultar os módulos liberados, sem alterar nada. Qualquer tentativa de gravar é recusada.',
          ],
        ]}
      />

      <H2>Criar um usuário</H2>
      <Steps>
        <Step titulo="Abra a área de segurança">
          Entre como administrador e vá em <Menu itens={['Configurações', 'Segurança do painel']} />.
        </Step>
        <Step titulo="Clique em Novo usuário">
          Preencha nome de usuário, senha (e a confirmação) e, se quiser, o e-mail corporativo.
        </Step>
        <Step titulo="Escolha o perfil">
          <B>Operador do painel</B> para quem vai lançar dados, ou <B>Diretoria</B> (perfil de consulta) para quem só vai acompanhar os números.
        </Step>
        <Step titulo="Libere os módulos">
          Depois de criada, a conta aparece em <Menu itens={['Configurações', 'Usuários do sistema']} />. Clique
          nos módulos que essa pessoa deve ver — Combustível, Patrimônio, Documentação, Manutenção e
          Almoxarifado — para ligar ou desligar cada um.
        </Step>
      </Steps>

      <H2>Mudar módulos, perfil ou senha</H2>
      <P>
        Em <Menu itens={['Configurações', 'Usuários do sistema']} /> aparece a lista de contas. Ali o
        administrador:
      </P>
      <UL>
        <li>liga e desliga módulos de cada pessoa;</li>
        <li>troca o perfil entre operador e diretoria;</li>
        <li>redefine a senha sem precisar saber a antiga;</li>
        <li>corrige o e-mail;</li>
        <li>desativa ou exclui uma conta.</li>
      </UL>
      <Callout tipo="dica" titulo="Desative em vez de excluir">
        <p>
          Quando alguém sai da empresa, desative a conta. Ela para de funcionar na hora, mas o histórico do que
          essa pessoa lançou continua registrado com o nome dela.
        </p>
      </Callout>

      <H2>Acesso à integração Sienge</H2>
      <P>
        A configuração do Sienge tem uma permissão separada dos módulos, porque envolve a credencial da empresa
        no Sienge. O administrador sempre tem; um operador só tem se o administrador marcar a opção{' '}
        <B>Sienge</B> na conta dele.
      </P>

      <H2>Módulos contratados</H2>
      <P>
        Além da liberação por usuário, existe o limite do contrato da empresa: um módulo que não foi contratado
        não aparece para ninguém, nem para o administrador.
      </P>

      <H2>Histórico de atividades</H2>
      <P>
        Em <Menu itens={['Configurações', 'Histórico de atividades']} /> o administrador vê quem criou, alterou ou
        excluiu cada registro, e quando. Dá para filtrar por mês — útil para conferir um lançamento estranho ou
        auditar o uso do sistema.
      </P>
    </>
  )
}
