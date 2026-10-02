import { B, Callout, H2, L, P, Step, Steps, UL } from '../ui'

export function ApiWebhooks() {
  return (
    <>
      <H2>Sienge → Kargo</H2>
      <P>
        O Kargo <B>recebe</B> webhooks do Sienge: quando o estoque de uma obra vinculada muda lá, o Sienge chama o
        Kargo na hora e o saldo é atualizado aqui, sem esperar uma sincronização manual.
      </P>
      <Steps>
        <Step titulo="O Kargo monta o endereço">
          Cada empresa tem o próprio endereço de recebimento, com um segredo que só o Kargo e o Sienge conhecem.
          Ninguém precisa digitar URL.
        </Step>
        <Step titulo="O registro é feito pela tela">
          Na tela de integração Sienge, um clique registra o webhook no Sienge da empresa. Veja{' '}
          <L to="/docs/manual/sienge-como-conectar">Conectar ao Sienge</L>.
        </Step>
        <Step titulo="O Kargo confere cada aviso">
          Avisos com segredo errado são recusados. Os válidos disparam a atualização do saldo da obra, por
          diferença — receber o mesmo aviso duas vezes não duplica estoque.
        </Step>
      </Steps>
      <UL>
        <li>A tela da integração mostra quando chegou o último aviso e quantos já foram recebidos.</li>
        <li>
          Se um aviso se perder (Sienge fora do ar, por exemplo), o botão de sincronizar puxa a posição atual e
          acerta a diferença.
        </li>
      </UL>

      <H2>Kargo → sistemas de terceiros</H2>
      <P>
        O Kargo ainda não envia webhooks para outros sistemas. Para acompanhar mudanças, consulte as rotas de
        listagem periodicamente — por exemplo, a cada 5 ou 10 minutos — usando <B>createdAt</B> e{' '}
        <B>updatedAt</B> para processar só o que mudou desde a última leitura.
      </P>
      <Callout tipo="info" titulo="Precisa de aviso em tempo real?">
        <p>
          Conte para o <L to="/docs/manual/suporte">suporte</L> qual evento você precisa receber (ex.: documento
          vencendo, estoque abaixo do mínimo). Isso ajuda a priorizar os próximos webhooks.
        </p>
      </Callout>
    </>
  )
}
