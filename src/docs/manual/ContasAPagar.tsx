import { B, Callout, H2, H3, L, Menu, P, Step, Steps, Table, UL } from '../ui'

export function ManualContasAPagar() {
  return (
    <>
      <P>
        Com a integração com o Sienge ligada, o Kargo descobre sozinho quando um pagamento foi feito. Você informa o
        número do <B>título</B> do Contas a Pagar e o Kargo acompanha cada parcela até o financeiro dar baixa — ninguém
        precisa perguntar se o boleto, a multa ou o IPVA já foi pago.
      </P>

      <H2>Onde funciona</H2>
      <Table
        colunas={['Onde', 'O que o título acompanha']}
        linhas={[
          [<B>Manutenção</B>, 'Os boletos da manutenção realizada. Cada parcela fica paga quando o Sienge dá baixa.'],
          [<B>Multas</B>, 'A multa fica paga quando todas as parcelas do título estão quitadas.'],
          [
            <B>IPVA e licenciamento</B>,
            'O ano (exercício) fica pago quando todas as parcelas do título estão quitadas. O IPVA pode ter até 5 parcelas.',
          ],
        ]}
      />

      <H2>Como usar</H2>
      <Steps>
        <Step titulo="Informe o número do título">
          No cadastro da manutenção, da multa ou do IPVA/licenciamento, digite o número do título do Sienge e clique
          para buscar.
        </Step>
        <Step titulo="Confira o que veio">
          O Kargo preenche o valor, o vencimento e as parcelas, e traz a guia em PDF anexada ao título quando
          existir. Revise e salve.
        </Step>
        <Step titulo="Deixe o Kargo acompanhar">
          Em horário comercial, o Kargo consulta o Sienge e marca como paga cada parcela que recebeu baixa. A lista
          mostra o selo <B>Aguarda baixa</B> enquanto não pagou e <B>Pago pelo Sienge</B> depois.
        </Step>
      </Steps>
      <Callout tipo="dica" titulo="Quer conferir agora?">
        <p>
          Em <Menu itens={['Integração Sienge']} /> o botão <B>Conferir agora</B> consulta os títulos na hora, sem
          esperar a próxima verificação automática. Tudo o que foi confirmado fica no histórico, com data e hora.
        </p>
      </Callout>

      <H2>Regras que protegem os seus números</H2>
      <UL>
        <li>
          Só vira <B>pago</B> o que o Sienge marca como <B>totalmente paga</B>. Parcela parcial ou em aberto continua
          em aberto no Kargo.
        </li>
        <li>
          O Sienge só <B>marca</B> parcelas como pagas; ele nunca desmarca. Se alguém lançou um pagamento por
          engano, a correção é feita na própria parcela, no Kargo.
        </li>
        <li>
          Uma multa ou um ano de IPVA pago por fora do Sienge pode ser marcado à mão, parcela por parcela — o
          título não é obrigatório.
        </li>
        <li>
          Se você desfaz um pagamento que veio do Sienge, o Kargo solta o título para não marcar de novo no próximo
          ciclo. As parcelas continuam registradas.
        </li>
      </UL>

      <H2>IPVA e licenciamento: o ano fecha sozinho</H2>
      <P>
        Em IPVA e licenciamento o que se paga é o ano. Quando todas as parcelas do título do ano são quitadas, o
        Kargo acrescenta o ano aos anos pagos e passa o vencimento para o ano seguinte. Se precisar corrigir, o
        botão <B>Reabrir</B> desfaz o fechamento.
      </P>

      <H3>Limites do Sienge</H3>
      <P>
        A conferência usa a cota de consultas do plano de API da empresa e respeita o horário comercial, para não
        gastar a cota à toa. Veja mais em <L to="/docs/manual/sienge-visao-geral">Como funciona a integração</L> e,
        para ligar, em <L to="/docs/manual/sienge-como-conectar">Conectar ao Sienge</L>.
      </P>
    </>
  )
}
