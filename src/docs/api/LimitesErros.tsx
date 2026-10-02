import { B, C, Callout, Code, H2, P, Table, UL } from '../ui'

export function ApiLimitesErros() {
  return (
    <>
      <H2>Limites de requisição</H2>
      <P>
        Para manter o serviço rápido para todos, a API limita quantas chamadas podem ser feitas num intervalo de
        tempo:
      </P>
      <Table
        colunas={['Limite', 'Valor', 'Contado por']}
        linhas={[
          [<B>Geral</B>, '600 requisições por minuto', 'endereço IP de origem'],
          [<B>Login</B>, '12 tentativas a cada 15 minutos', 'usuário + endereço IP'],
          [<B>Gravações</B>, '240 por minuto', 'sessão (não se aplica às rotas de consulta desta referência)'],
        ]}
      />
      <P>
        <C>GET /api/health</C> fica fora do limite geral. Os valores podem ser ajustados com o tempo — trate a
        resposta <C>429</C> em vez de fixar esses números no seu código.
      </P>

      <H2>Quando o limite é atingido</H2>
      <P>
        A API responde <C>429 Too Many Requests</C> com o cabeçalho <C>Retry-After</C> (em segundos) e o mesmo
        tempo no corpo:
      </P>
      <Code lang="http" titulo="resposta 429">{`HTTP/1.1 429 Too Many Requests
Retry-After: 42
Content-Type: application/json

{
  "error": "Muitas requisições deste endereço. Aguarde um minuto e tente de novo.",
  "retryAfterSegundos": 42
}`}</Code>
      <Callout tipo="dica" titulo="Boas práticas">
        <p>
          Espere o tempo de <C>Retry-After</C> antes de tentar de novo, em vez de repetir em loop. Reaproveite o
          token por até 12 horas e, para sincronizações periódicas, prefira intervalos de alguns minutos — os dados
          não mudam a cada segundo.
        </p>
      </Callout>

      <H2>Formato dos erros</H2>
      <P>
        Toda resposta de erro é um JSON com o campo <C>error</C>, uma mensagem em português. Alguns erros trazem
        também <C>codigo</C>, um identificador fixo para tratar no código:
      </P>
      <Code lang="json">{`{
  "error": "Empresa \\"construtora-exmplo\\" não encontrada.",
  "codigo": "EMPRESA_NAO_ENCONTRADA"
}`}</Code>

      <H2>Códigos de status</H2>
      <Table
        colunas={['Status', 'Significado']}
        linhas={[
          [<C>200</C>, 'Deu certo.'],
          [<C>400</C>, 'Pedido inválido — parâmetro com formato errado ou faltando. A mensagem diz qual.'],
          [<C>401</C>, 'Sem token, token inválido ou expirado. Faça login de novo.'],
          [<C>403</C>, 'O usuário não tem acesso a esse módulo, foi desativado ou teve a senha trocada.'],
          [<C>404</C>, 'Registro (ou empresa) não encontrado.'],
          [<C>429</C>, <>Limite de requisições atingido. Respeite o <C>Retry-After</C>.</>],
          [<C>500</C>, 'Erro inesperado no servidor. Tente de novo em instantes; se persistir, fale com o suporte.'],
          [<C>503</C>, 'Serviço temporariamente indisponível. Tente de novo em instantes.'],
        ]}
      />

      <H2>Códigos de erro da empresa</H2>
      <Table
        colunas={['codigo', 'Status', 'Quando']}
        linhas={[
          [<C>EMPRESA_NAO_INFORMADA</C>, <C>400</C>, <>O login foi feito sem o cabeçalho <C>X-Kargo-Empresa</C>.</>],
          [<C>EMPRESA_NAO_ENCONTRADA</C>, <C>404</C>, 'O identificador de empresa enviado não existe.'],
          [<C>EMPRESA_DESATIVADA</C>, <C>403</C>, 'A empresa está desativada. Fale com o suporte.'],
        ]}
      />

      <H2>Sem permissão para um módulo</H2>
      <UL>
        <li>
          Cada rota informa o módulo que exige. Se o usuário do token não tem esse módulo, a resposta é{' '}
          <C>403</C> com <C>{'"error": "Sem permissão para este módulo."'}</C>.
        </li>
        <li>Peça ao administrador para liberar o módulo na conta da integração.</li>
      </UL>
    </>
  )
}
