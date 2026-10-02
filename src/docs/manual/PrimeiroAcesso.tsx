import { B, C, Callout, H2, L, Menu, P, Step, Steps, UL } from '../ui'

export function PrimeiroAcesso() {
  return (
    <>
      <H2>O endereço da sua empresa</H2>
      <P>
        Cada empresa tem o próprio endereço do Kargo, no formato <C>suaempresa.kargo-web.com</C>. Os dados de
        uma empresa ficam separados dos das outras — ninguém de fora enxerga o que é seu. O endereço exato é
        enviado pela equipe do Kargo na implantação.
      </P>
      <Callout tipo="dica">
        <p>Salve o endereço nos favoritos do navegador (no celular, use “Adicionar à tela inicial”).</p>
      </Callout>

      <H2>Entrar no sistema</H2>
      <P>
        Não existe cadastro aberto: toda conta é criada pelo administrador da sua empresa, que te passa o
        usuário e a senha.
      </P>
      <Steps>
        <Step titulo="Abra o endereço da sua empresa">A tela de login aparece.</Step>
        <Step titulo="Digite usuário e senha">Use exatamente o usuário que o administrador criou.</Step>
        <Step titulo="Pronto">
          Administradores e operadores caem no <B>Início</B> do painel, com os indicadores dos módulos
          liberados. Usuários do perfil Diretoria caem direto no painel de consulta.
        </Step>
      </Steps>

      <Callout tipo="aviso" titulo="Muitas tentativas erradas">
        <p>
          Por segurança, depois de várias tentativas de senha errada seguidas o login daquele usuário fica
          bloqueado por 15 minutos. Se não lembrar a senha, não insista — peça para o administrador redefinir.
        </p>
      </Callout>

      <H2>Esqueci minha senha</H2>
      <P>
        O administrador redefine a senha de qualquer usuário, sem precisar saber a antiga, em{' '}
        <Menu itens={['Configurações', 'Usuários do sistema']} />. Ao trocar a senha, as sessões abertas daquele
        usuário em outros aparelhos são encerradas.
      </P>
      <P>
        Se quem esqueceu a senha foi o próprio administrador principal, fale com o{' '}
        <L to="/docs/manual/suporte">suporte do Kargo</L>.
      </P>

      <H2>Saída automática</H2>
      <P>
        Para proteger os dados em computadores compartilhados, o Kargo encerra a sessão sozinho depois de um
        tempo sem uso e quando o navegador é fechado. É só entrar de novo.
      </P>

      <H2>Tema claro ou escuro</H2>
      <P>
        Em <Menu itens={['Configurações']} /> você escolhe entre tema escuro e claro. A escolha fica salva na sua
        conta, então vale em qualquer computador ou celular em que você entrar.
      </P>

      <H2>Usando no celular</H2>
      <UL>
        <li>As listas viram cartões e os formulários se ajustam à tela, com botões maiores para o dedo.</li>
        <li>Tudo o que é lançado no celular aparece na hora para quem está no escritório.</li>
      </UL>
    </>
  )
}
