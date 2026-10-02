import { B, C, Callout, Code, H2, L, P, Step, Steps, Table, UL } from '../ui'

export function ApiIntroducao() {
  return (
    <>
      <H2>Visão geral</H2>
      <P>
        A API do Kargo é uma API REST: você faz requisições HTTPS e recebe respostas em JSON. É a mesma API que o
        próprio painel do Kargo usa, então os dados são exatamente os que aparecem nas telas.
      </P>
      <P>
        Esta referência cobre as rotas de <B>consulta</B> liberadas para integração — patrimônio, documentação,
        combustível, manutenção e almoxarifado. Com elas dá para levar os dados do Kargo para um BI, um ERP, uma
        planilha automática ou um sistema próprio.
      </P>
      <Callout tipo="aviso" titulo="Só o que está aqui é contrato">
        <p>
          O Kargo tem outras rotas (gravação, administração, integrações internas), mas elas não são públicas e
          podem mudar sem aviso. Use somente as rotas documentadas nesta referência.
        </p>
      </Callout>

      <H2>Como obter acesso</H2>
      <Steps>
        <Step titulo="Fale com o suporte do Kargo">
          Você recebe o <B>endereço base da API</B> e confirma o <B>identificador da sua empresa</B>. Veja{' '}
          <L to="/docs/manual/suporte">Suporte</L>.
        </Step>
        <Step titulo="Crie um usuário só para a integração">
          Peça ao administrador uma conta dedicada com perfil <B>Cliente</B> (só leitura) e apenas os módulos que a
          integração precisa. Assim a integração nunca altera dados e dá para desligá-la sem afetar ninguém.
        </Step>
        <Step titulo="Obtenha o token">
          Faça login pela API com esse usuário — <L to="/docs/api/autenticacao">Autenticação</L>.
        </Step>
      </Steps>

      <H2>Endereço base</H2>
      <P>
        Nos exemplos desta referência, <C>{'{BASE_URL}'}</C> representa o endereço base informado pelo suporte e{' '}
        <C>{'{TOKEN}'}</C> o token de acesso. Todas as rotas começam com <C>/api</C>; use sempre HTTPS.
      </P>
      <Code lang="bash">{`curl "{BASE_URL}/api/veiculos" \\
  -H "Authorization: Bearer {TOKEN}"`}</Code>

      <H2>Identificação da empresa</H2>
      <P>
        Cada empresa tem seus dados separados. O identificador da empresa é o mesmo nome que aparece no endereço
        dela: em <C>construtora-exemplo.kargo-web.com</C>, o identificador é <C>construtora-exemplo</C>.
      </P>
      <UL>
        <li>
          No <B>login</B>, envie o identificador no cabeçalho <C>X-Kargo-Empresa</C>.
        </li>
        <li>
          Depois do login, o <B>token já carrega a empresa</B>: não precisa (e não adianta) mandar o cabeçalho de
          novo — um token só vale para a empresa em que foi emitido.
        </li>
      </UL>

      <H2>Convenções</H2>
      <Table
        colunas={['Assunto', 'Como funciona']}
        linhas={[
          [<B>Formato</B>, <>JSON em UTF-8. Envie <C>Content-Type: application/json</C> quando houver corpo.</>],
          [<B>Datas</B>, <>Datas de calendário como <C>2026-09-25</C>; momentos (criação, atualização) em ISO 8601 UTC, como <C>2026-09-25T14:03:11.000Z</C>.</>],
          [<B>Identificadores</B>, <><C>id</C> é texto (UUID) e é o que as outras rotas esperam nos filtros. <C>codigo</C> é o número legível que aparece nas telas.</>],
          [<B>Valores</B>, 'Números decimais em reais (ex.: 1234.5), sem formatação.'],
          [<B>Campos vazios</B>, <>Vêm como <C>null</C> — o campo continua presente na resposta.</>],
          [<B>Listas</B>, 'As rotas de listagem devolvem um array JSON direto. Onde existe limite de itens, ele está descrito na rota.'],
          [<B>Idioma</B>, 'Mensagens de erro em português, prontas para mostrar a um usuário.'],
        ]}
      />

      <H2>Verificar se a API está no ar</H2>
      <P>
        <C>GET /api/health</C> não exige token e responde <C>{'{ "ok": true }'}</C> quando o serviço está
        funcionando. Útil para monitoramento.
      </P>
      <Code lang="bash">{`curl "{BASE_URL}/api/health"
# {"ok":true}`}</Code>
    </>
  )
}
