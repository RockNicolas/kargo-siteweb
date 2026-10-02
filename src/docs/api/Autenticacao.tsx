import { B, C, Callout, Code, Endpoint, H2, P, Table, UL } from '../ui'

export function ApiAutenticacao() {
  return (
    <>
      <P>
        A API usa <B>token de acesso</B> (Bearer). Você troca usuário e senha por um token uma vez e envia esse
        token no cabeçalho de todas as chamadas seguintes.
      </P>

      <Endpoint
        titulo="Obter o token (login)"
        metodo="POST"
        caminho="/api/auth/login"
        permissao="qualquer usuário ativo da empresa (não exige token)."
        body={[
          { nome: 'user', tipo: 'texto', obrigatorio: true, descricao: 'Nome de usuário, como cadastrado no Kargo.' },
          { nome: 'password', tipo: 'texto', obrigatorio: true, descricao: 'Senha do usuário.' },
        ]}
        resposta={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "integracao.bi",
  "mode": "app_user",
  "role": "cliente",
  "modulos": ["frota", "combustivel", "manutencao"],
  "modulosContratados": ["combustivel", "frota", "documentacao", "manutencao", "almoxarifado"],
  "siengeAcesso": false,
  "themePreference": "dark"
}`}
      >
        <P>
          Envie também o cabeçalho <C>X-Kargo-Empresa</C> com o identificador da sua empresa — é ele que diz em
          qual empresa o login deve ser feito.
        </P>
        <Code lang="bash">{`curl -X POST "{BASE_URL}/api/auth/login" \\
  -H "Content-Type: application/json" \\
  -H "X-Kargo-Empresa: construtora-exemplo" \\
  -d '{"user":"integracao.bi","password":"sua-senha"}'`}</Code>
      </Endpoint>

      <H2>Campos da resposta</H2>
      <Table
        colunas={['Campo', 'Significado']}
        linhas={[
          [<C>token</C>, 'O token de acesso. Guarde-o para as próximas chamadas.'],
          [<C>role</C>, <><C>admin</C>, <C>user</C> (operador) ou <C>cliente</C> (só leitura).</>],
          [<C>modulos</C>, <>Módulos que este usuário pode acessar: <C>combustivel</C>, <C>frota</C> (Patrimônio), <C>documentacao</C>, <C>manutencao</C>, <C>almoxarifado</C>.</>],
          [<C>modulosContratados</C>, <>Módulos do contrato da empresa, ou <C>null</C> quando não há limite.</>],
        ]}
      />

      <H2>Usar o token</H2>
      <P>
        Envie o token no cabeçalho <C>Authorization</C>, com o prefixo <C>Bearer</C>:
      </P>
      <Code lang="bash">{`curl "{BASE_URL}/api/auth/me" \\
  -H "Authorization: Bearer {TOKEN}"`}</Code>
      <Code lang="javascript" titulo="javascript (fetch)">{`const BASE_URL = process.env.KARGO_API_URL
const EMPRESA = process.env.KARGO_EMPRESA

async function entrar() {
  const resp = await fetch(\`\${BASE_URL}/api/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Kargo-Empresa': EMPRESA },
    body: JSON.stringify({ user: process.env.KARGO_USER, password: process.env.KARGO_PASSWORD }),
  })
  const dados = await resp.json()
  if (!resp.ok) throw new Error(dados.error)
  return dados.token
}

const token = await entrar()
const veiculos = await fetch(\`\${BASE_URL}/api/veiculos\`, {
  headers: { Authorization: \`Bearer \${token}\` },
}).then((r) => r.json())`}</Code>

      <Endpoint
        titulo="Conferir a sessão"
        metodo="GET"
        caminho="/api/auth/me"
        permissao="qualquer token válido."
        resposta={`{
  "username": "integracao.bi",
  "role": "cliente",
  "modulos": ["frota", "combustivel", "manutencao"],
  "modulosContratados": ["combustivel", "frota", "documentacao", "manutencao", "almoxarifado"],
  "siengeAcesso": false,
  "themePreference": "dark"
}`}
      >
        <P>Devolve quem é o dono do token e o que ele pode acessar. Bom para testar a integração.</P>
      </Endpoint>

      <H2>Validade e renovação</H2>
      <UL>
        <li>
          O token vale por <B>12 horas</B>. Depois disso, as chamadas respondem <C>401</C> e é só fazer login de
          novo.
        </li>
        <li>
          O token deixa de valer antes do prazo se a senha do usuário for trocada ou redefinida, ou se o usuário for
          desativado — nesses casos a resposta é <C>403</C>. Faça login de novo com a credencial atual.
        </li>
        <li>
          Reaproveite o mesmo token enquanto ele valer — fazer login a cada chamada gasta o limite de tentativas de
          login.
        </li>
      </UL>

      <H2>Erros do login</H2>
      <Table
        colunas={['Status', 'Quando']}
        linhas={[
          [<C>400</C>, 'Usuário ou senha não enviados.'],
          [<C>401</C>, 'Usuário ou senha inválidos.'],
          [<C>403</C>, 'Usuário desativado.'],
          [<C>404</C>, <>Empresa do cabeçalho <C>X-Kargo-Empresa</C> não encontrada.</>],
          [<C>429</C>, 'Tentativas demais para esse usuário (12 a cada 15 minutos). Aguarde e tente de novo.'],
        ]}
      />

      <Callout tipo="aviso" titulo="Guarde as credenciais com cuidado">
        <p>
          Usuário, senha e token dão acesso aos dados da empresa. Guarde-os em variáveis de ambiente ou num cofre de
          segredos — nunca em código publicado, em páginas web ou em planilhas compartilhadas.
        </p>
      </Callout>
    </>
  )
}
