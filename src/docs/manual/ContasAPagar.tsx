import { B, Callout, H2, H3, L, Menu, P, Step, Steps, Table, UL } from '../ui'

export function ManualContasAPagar() {
  return (
    <>
      <P>
        Com a integração com o Sienge ligada, o Kargo conversa com o Contas a Pagar nos dois sentidos: <B>cria o
        título</B> a partir do cadastro e, depois, descobre sozinho quando o financeiro deu a baixa. Ninguém precisa
        digitar a mesma nota duas vezes nem perguntar se o boleto, a multa ou o IPVA já foi pago.
      </P>

      <H2>Onde funciona</H2>
      <Table
        colunas={['Onde', 'O que vira título', 'Quando fica pago']}
        linhas={[
          [
            <B>Manutenção</B>,
            'Os boletos da manutenção, uma parcela do título para cada boleto.',
            'Cada parcela fica paga quando o Sienge dá baixa.',
          ],
          [
            <B>Multas</B>,
            'As parcelas da multa — ou o valor à vista, quando não há parcelamento.',
            'A multa fica paga quando todas as parcelas do título estão quitadas.',
          ],
          [
            <B>IPVA e licenciamento</B>,
            'As parcelas do ano. O IPVA pode ter até 5 parcelas.',
            'O ano (exercício) fica pago quando todas as parcelas do título estão quitadas.',
          ],
        ]}
      />

      <H2>Criar o título pelo Kargo</H2>
      <P>
        Ao cadastrar uma manutenção (com pagamento em boleto), uma multa, o IPVA ou o licenciamento, ligue a chave{' '}
        <B>Criar título ao salvar</B>. Depois de gravar o cadastro, o Kargo abre a conferência e lança o título no
        Contas a Pagar do Sienge.
      </P>
      <Steps>
        <Step titulo="Cadastre com valor e vencimento">
          Lance o registro como já faz hoje. Cada boleto da manutenção, cada parcela da multa e cada parcela do
          IPVA ou do licenciamento vira uma parcela do título — com o mesmo valor e o mesmo vencimento.
        </Step>
        <Step titulo="Escolha o credor e confirme os dados">
          O Kargo sugere o que já sabe: tipo e número do documento, emissão, obra, plano financeiro e observação.
          Falta escolher o <B>credor</B> — a busca aceita nome, código ou CNPJ/CPF, mesmo com erro de digitação — e,
          quando a obra do Sienge exige, a <B>apropriação de obra</B> (obra, unidade construtiva e item do
          orçamento).
        </Step>
        <Step titulo="Confira o que vai ser lançado">
          Uma tela mostra exatamente o que será enviado: empresa, credor, documento, parcelas, plano financeiro,
          centro de custo e observação. Marque <B>Conferi os dados</B> e confirme.
        </Step>
        <Step titulo="Título criado">
          O título entra no Contas a Pagar, o número fica gravado no cadastro e cada boleto ou parcela fica ligado à
          sua parcela no Sienge. Dali em diante a conferência da baixa é automática.
        </Step>
      </Steps>

      <H3>O que protege o financeiro</H3>
      <UL>
        <li>
          <B>Sem duplicidade.</B> Um registro que já tem título não gera outro, e um título igual (mesmo credor e
          número de documento) já lançado no Sienge é barrado.
        </li>
        <li>
          <B>Origem identificada.</B> A observação de todo título criado pelo Kargo começa com “Kargo —”.
        </li>
        <li>
          <B>Quem fez e quando.</B> O usuário que criou o título fica registrado e aparece no{' '}
          <L to="/docs/manual/sienge-visao-geral">Histórico da integração</L> e nos relatórios de Manutenção,
          Multas, IPVA e Licenciamento.
        </li>
        <li>
          <B>A baixa continua com o financeiro.</B> O Kargo cria o título e acompanha; quem dá a baixa é o
          financeiro, na tela do Sienge.
        </li>
      </UL>
      <Callout tipo="aviso" titulo="Título criado não é apagado pelo Kargo">
        <p>
          A API do Sienge não permite apagar um título. Se algo foi lançado errado, o financeiro cancela o título no
          próprio Sienge — por isso a conferência vem antes do envio.
        </p>
      </Callout>
      <Callout tipo="info" titulo="Precisa de permissão no Sienge">
        <p>
          Criar título exige que o usuário de API do Kargo tenha escrita em <B>Títulos do Contas a Pagar</B>. As
          rotas estão em <L to="/docs/manual/sienge-como-conectar">Conectar ao Sienge</L>. Enquanto algum recurso
          opcional (plano financeiro, tipos de documento, nome das empresas) não estiver liberado, os códigos são
          digitados à mão e o resto funciona igual.
        </p>
      </Callout>

      <H2>Acompanhar o pagamento</H2>
      <P>
        Vale para o título criado pelo Kargo e também para um que o financeiro já tenha lançado: nesse caso, no
        cadastro da manutenção, da multa ou do IPVA/licenciamento, digite o número do título do Sienge e clique para
        buscar — o Kargo traz valor, vencimento e parcelas, e a guia em PDF anexada ao título quando existir.
      </P>
      <Steps>
        <Step titulo="Confira o que veio">
          Revise valor, vencimento e parcelas e salve.
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
