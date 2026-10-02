import { contact } from '../../data/content'
import { B, H2, Menu, P, Step, Steps, Table } from '../ui'

export function Suporte() {
  return (
    <>
      <H2>Pelo próprio Kargo</H2>
      <P>
        O jeito mais rápido é abrir o suporte de dentro do sistema, porque a mensagem já chega identificando a sua
        empresa e o seu usuário.
      </P>
      <Steps>
        <Step titulo="Abra Configurações e clique em Suporte">
          No painel, o botão fica em <Menu itens={['Configurações']} />. No painel da diretoria, fica no menu do
          seu usuário, no topo da tela.
        </Step>
        <Step titulo="Escolha o assunto">
          Patrimônio, Documentação, Manutenção, Almoxarifado, Combustível, Usuários e acesso, Integração Sienge ou
          Outros.
        </Step>
        <Step titulo="Descreva o que aconteceu">
          Diga em qual tela estava e o que tentou fazer. Se apareceu uma mensagem de erro, copie o texto dela.
        </Step>
        <Step titulo="Envie por WhatsApp ou por e-mail">
          O e-mail é enviado direto pelo Kargo, sem precisar abrir o seu programa de e-mail.
        </Step>
      </Steps>

      <H2>Contatos diretos</H2>
      <Table
        colunas={['Canal', 'Contato']}
        linhas={[
          [
            <B>WhatsApp</B>,
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-signal-600 underline decoration-signal-500/30 underline-offset-4 dark:text-signal-400"
            >
              {contact.phoneDisplay}
            </a>,
          ],
          [
            <B>E-mail</B>,
            <a
              href={`mailto:${contact.email}`}
              className="font-medium text-signal-600 underline decoration-signal-500/30 underline-offset-4 dark:text-signal-400"
            >
              {contact.email}
            </a>,
          ],
        ]}
      />

      <H2>Dar sua opinião</H2>
      <P>
        Em <Menu itens={['Configurações']} />, a opção de feedback permite dar uma nota de 1 a 5 para o sistema e
        deixar um comentário. Toda sugestão é lida — boa parte do que existe hoje no Kargo nasceu de pedidos de quem usa.
      </P>
    </>
  )
}
