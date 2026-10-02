import { B, Callout, H2, L, Menu, P, Table, UL } from '../ui'

export function ManualDocumentacao() {
  return (
    <>
      <P>
        O módulo de Documentação reúne tudo o que tem prazo: documentos dos ativos, CNH dos motoristas e multas.
        O Kargo acompanha as datas e avisa antes de vencer, para ninguém ser pego de surpresa numa blitz ou numa
        fiscalização de obra.
      </P>

      <H2>Faixas de vencimento</H2>
      <P>Todo documento com data de vencimento é classificado automaticamente em uma faixa, com cor própria:</P>
      <Table
        colunas={['Faixa', 'Quando']}
        linhas={[
          [<B>Vencido</B>, 'A data de vencimento já passou.'],
          [<B>Até 30 dias</B>, 'Vence nos próximos 30 dias — prioridade.'],
          [<B>Até 60 dias</B>, 'Vence entre 31 e 60 dias.'],
          [<B>Até 90 dias</B>, 'Vence entre 61 e 90 dias.'],
          [<B>Em dia</B>, 'Vence daqui a mais de 90 dias.'],
        ]}
      />

      <H2>Documentos dos ativos</H2>
      <P>
        Em <Menu itens={['Documentação', 'Doc. ativos']} /> ficam os documentos de cada ativo. Tipos aceitos:
        IPVA, licenciamento, seguro, CRLV, inspeção, extintor, contrato, entrega do veículo e outros.
      </P>
      <UL>
        <li>Cada documento guarda vencimento, emissão, número da apólice ou Renavam e observações.</li>
        <li>Anexe o PDF do documento para ter tudo à mão na hora de uma fiscalização.</li>
        <li>
          O <B>IPVA</B> pode ser dividido em até 5 parcelas, cada uma com o seu PDF.
        </li>
        <li>
          IPVA e licenciamento também têm telas próprias (<Menu itens={['Documentação', 'IPVA']} /> e{' '}
          <Menu itens={['Documentação', 'Licenciamento']} />), com a situação de toda a frota de uma vez.
        </li>
      </UL>

      <H2>CNH dos motoristas</H2>
      <P>
        Em <Menu itens={['Documentação', 'CNH']} /> fica o cadastro de motoristas: nome, CPF, número e categoria da
        CNH, validade e telefone. A validade entra nas mesmas faixas de vencimento dos documentos.
      </P>
      <Callout tipo="dica">
        <p>
          Ao lançar um abastecimento ou uma multa, você pode escolher o motorista do cadastro — assim o histórico
          fica ligado à pessoa certa.
        </p>
      </Callout>

      <H2>Multas</H2>
      <P>
        Em <Menu itens={['Documentação', 'Multas']} /> as multas são cadastradas uma a uma ou em lote (várias
        multas do mesmo ativo e motorista de uma vez — o Kargo recusa multa repetida). Cada multa tem:
      </P>
      <UL>
        <li>ativo e motorista responsável;</li>
        <li>código e descrição da infração, escolhidos de um catálogo de infrações de trânsito;</li>
        <li>valor e data de vencimento;</li>
        <li>PDF da notificação e, depois de paga, o comprovante e a data de pagamento.</li>
      </UL>
      <P>
        Multas em aberto aparecem nas faixas de vencimento; ao marcar como paga, ela sai dos alertas.
      </P>
      <Callout tipo="info" titulo="Pagamento confirmado pelo Sienge">
        <p>
          Com a integração ligada, informe o número do título do Sienge na multa, no IPVA ou no licenciamento: o
          Kargo puxa valor, vencimento e parcelas e, quando o financeiro dá baixa, marca como pago sozinho. Veja{' '}
          <L to="/docs/manual/contas-a-pagar">Contas a Pagar pelo Sienge</L>.
        </p>
      </Callout>

      <H2>Alertas e relatórios</H2>
      <P>
        CNH, IPVA, licenciamento, demais documentos e multas em aberto geram alertas separados, que cada usuário
        pode ligar ou desligar em <Menu itens={['Configurações', 'Notificações']} />. Em{' '}
        <Menu itens={['Relatório', 'Documentação']} /> há relatórios de documentos, CNH, multas, IPVA e
        licenciamento, com exportação em PDF e Excel.
      </P>
    </>
  )
}
