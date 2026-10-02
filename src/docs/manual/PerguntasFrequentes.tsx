import { B, H2, L, Menu, P, Pergunta } from '../ui'

export function PerguntasFrequentes() {
  return (
    <>
      <H2>Acesso</H2>
      <Pergunta titulo="Preciso instalar alguma coisa?">
        <P>
          Não. O Kargo funciona no navegador, em computador, tablet ou celular. Basta abrir o endereço da sua
          empresa.
        </P>
      </Pergunta>
      <Pergunta titulo="Como crio um usuário para alguém da equipe?">
        <P>
          Só o administrador cria contas, em <Menu itens={['Configurações', 'Segurança do painel']} />. O passo a
          passo está em <L to="/docs/manual/perfis-de-acesso">Perfis de acesso</L>.
        </P>
      </Pergunta>
      <Pergunta titulo="Esqueci minha senha. E agora?">
        <P>
          Peça ao administrador: ele redefine a sua senha sem precisar saber a antiga. Se o esquecimento foi do
          administrador principal, fale com o <L to="/docs/manual/suporte">suporte</L>.
        </P>
      </Pergunta>
      <Pergunta titulo="Por que um módulo não aparece no meu menu?">
        <P>
          Ou ele não foi liberado para o seu usuário (o administrador liga em{' '}
          <Menu itens={['Configurações', 'Usuários do sistema']} />), ou ele não faz parte do contrato da sua
          empresa.
        </P>
      </Pergunta>

      <H2>Dados</H2>
      <Pergunta titulo="Consigo trazer o que eu já tenho em planilha?">
        <P>
          Sim. Abastecimentos podem ser importados de um arquivo Excel, e o estoque inicial das obras pode vir de
          planilha (até 1.500 linhas por arquivo) ou do PDF de posição de estoque do Sienge.
        </P>
      </Pergunta>
      <Pergunta titulo="Um ativo foi vendido. Devo excluir?">
        <P>
          Melhor <B>desativar</B>. Ele sai das listas do dia a dia, mas o histórico de combustível, documentos e
          manutenção continua nos relatórios.
        </P>
      </Pergunta>
      <Pergunta titulo="Outras empresas conseguem ver os meus dados?">
        <P>
          Não. Cada empresa tem o próprio endereço e os dados ficam num banco de dados separado, que só os
          usuários da sua empresa acessam.
        </P>
      </Pergunta>
      <Pergunta titulo="Dá para saber quem alterou um registro?">
        <P>
          Sim. O administrador vê em <Menu itens={['Configurações', 'Histórico de atividades']} /> quem criou,
          alterou ou excluiu cada registro, e quando.
        </P>
      </Pergunta>
      <Pergunta titulo="Consigo tirar os relatórios do sistema?">
        <P>
          Sim, em PDF (com o logotipo da empresa) ou Excel. Veja{' '}
          <L to="/docs/manual/relatorios">Relatórios e painéis</L>.
        </P>
      </Pergunta>

      <H2>Sienge</H2>
      <Pergunta titulo="O Kargo substitui o Sienge?">
        <P>
          Não. O Sienge continua sendo o sistema de gestão da empresa; o Kargo cuida do controle de campo — frota,
          documentação, combustível, manutenção e almoxarifado das obras — e conversa com o Sienge para ninguém
          lançar a mesma coisa duas vezes.
        </P>
      </Pergunta>
      <Pergunta titulo="Se o Sienge sair do ar, perco o que lancei no Kargo?">
        <P>
          Não. O lançamento fica salvo no Kargo e é enviado ao Sienge quando ele voltar; o que não conseguir ser
          enviado fica sinalizado para revisão.
        </P>
      </Pergunta>
      <Pergunta titulo="Preciso pagar algo a mais ao Sienge?">
        <P>
          A integração usa a API do Sienge, que é contratada com o próprio Sienge. Existe um plano gratuito (Free),
          com um limite menor de consultas por dia. Veja{' '}
          <L to="/docs/manual/sienge-como-conectar">Conectar ao Sienge</L>.
        </P>
      </Pergunta>
    </>
  )
}
