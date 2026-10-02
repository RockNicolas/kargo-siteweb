import { B, Callout, H2, H3, L, Menu, P, Table, UL } from '../ui'

export function SiengeVisaoGeral() {
  return (
    <>
      <P>
        Para empresas que já usam o Sienge, o Kargo se conecta a ele para que a mesma informação não precise ser
        digitada duas vezes. A integração é dividida em três áreas, que podem ser ligadas separadamente em{' '}
        <Menu itens={['Integração Sienge']} />.
      </P>

      <Table
        colunas={['Área', 'Direção', 'O que acontece']}
        linhas={[
          [
            <B>Almoxarifado</B>,
            'Nos dois sentidos',
            'O estoque de cada obra vinculada fica igual nos dois sistemas: o que muda no Sienge chega ao Kargo, e as entradas, saídas e transferências lançadas no Kargo vão para o Sienge.',
          ],
          [
            <B>Movimentação de Ativos</B>,
            'Sienge → Kargo',
            'A cada 15 minutos o Kargo vê no Sienge em que obra cada bem vinculado está e atualiza a obra do ativo aqui.',
          ],
          [
            <B>Contas a Pagar</B>,
            'Sienge → Kargo',
            'Em horário comercial, o Kargo confere se o financeiro deu baixa no título e marca a parcela como paga — em manutenções, multas, IPVA e licenciamento.',
          ],
        ]}
      />

      <H2>Almoxarifado</H2>
      <H3>Do Sienge para o Kargo</H3>
      <P>
        Quando o estoque de uma obra muda no Sienge, o próprio Sienge avisa o Kargo na hora (por um{' '}
        <B>webhook</B>, que o Kargo registra sozinho) e o saldo é atualizado por diferença — sem duplicar
        lançamentos. Insumos que ainda não existem no Kargo são criados automaticamente. Também dá para puxar a
        posição atual a qualquer momento pelo botão de sincronizar.
      </P>
      <H3>Do Kargo para o Sienge</H3>
      <P>
        Com o automático ligado, cada entrada, saída ou transferência lançada numa obra vinculada é enviada ao
        Sienge logo depois de salva. A coluna <B>Sienge</B> da movimentação mostra o que já foi enviado.
      </P>
      <Callout tipo="info" titulo="Nenhum lançamento se perde">
        <p>
          Se o Sienge estiver fora do ar ou recusar um envio, o lançamento continua salvo no Kargo normalmente. O
          Kargo tenta enviar de novo sozinho e, se ainda assim não passar, o item fica sinalizado para revisão —
          com a explicação do erro em linguagem simples.
        </p>
      </Callout>

      <H2>Movimentação de Ativos</H2>
      <P>
        Os veículos e máquinas do Kargo são ligados aos bens móveis do Sienge — pela placa ou criando o ativo a
        partir do cadastro do Sienge. Depois disso, a obra onde cada ativo está passa a acompanhar o Sienge
        sozinha, a cada 15 minutos.
      </P>

      <H2>Contas a Pagar</H2>
      <P>
        Ao registrar uma manutenção realizada, uma multa ou o IPVA/licenciamento de um ativo, informe o número do
        título do Contas a Pagar do Sienge. O Kargo puxa os dados do título (valor, vencimento, parcelas e a guia em
        PDF) e, quando o financeiro dá baixa no Sienge, marca a parcela como paga — com a confirmação do Sienge
        guardada como prova. Veja o passo a passo em{' '}
        <L to="/docs/manual/contas-a-pagar">Contas a Pagar pelo Sienge</L>.
      </P>

      <H2>Histórico</H2>
      <P>
        A tela da integração tem um histórico único das três áreas: o que foi enviado, o que chegou e o que deu
        erro, com data e hora. É o primeiro lugar para olhar quando algo não bater entre os dois sistemas.
      </P>

      <H2>Limites do Sienge</H2>
      <UL>
        <li>
          Cada empresa tem um plano de API contratado com o Sienge, com um número máximo de consultas por dia. O
          Kargo controla esse uso e mostra quanto da cota já foi consumido.
        </li>
        <li>
          Quando a cota do dia acaba, a sincronização pausa e volta sozinha no dia seguinte. Os lançamentos feitos
          no Kargo nesse meio-tempo não se perdem.
        </li>
      </UL>
      <P>
        Pronto para ligar? Siga <L to="/docs/manual/sienge-como-conectar">Conectar ao Sienge</L>.
      </P>
    </>
  )
}
