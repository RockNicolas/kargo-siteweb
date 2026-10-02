import { B, C, Endpoint, H2, P, Table } from '../ui'

const OBRA_ID = '7c2e9a10-4b3d-4e8f-a1b2-c3d4e5f60718'
const PECA_ID = '2d3e4f50-6172-4839-9a0b-1c2d3e4f5061'

export function ApiAlmoxarifado() {
  return (
    <>
      <P>
        O estoque do Kargo é separado por obra. O caminho mais comum numa integração é: listar as obras, depois
        consultar o saldo de cada uma e, se precisar do histórico, as movimentações.
      </P>

      <Endpoint
        titulo="Listar obras"
        metodo="GET"
        caminho="/api/almoxarifado/obras"
        permissao={<>usuário com o módulo Almoxarifado (<C>almoxarifado</C>).</>}
        query={[{ nome: 'inativos', tipo: 'texto', descricao: <>Envie <C>1</C> para incluir obras encerradas.</> }]}
        resposta={`[
  {
    "id": "${OBRA_ID}",
    "codigo": 3,
    "codigoSienge": 1204,
    "nome": "Residencial Aurora",
    "municipio": "Fortaleza",
    "localidade": "Bairro Messejana",
    "sistemaPadrao": false,
    "ativo": true,
    "buildingIdSienge": 88,
    "unidadeConstrutivaSienge": null,
    "itemOrcamentoSienge": null,
    "ultimaSincronizacaoEm": "2026-09-25T13:40:12.000Z",
    "ultimaSincronizacaoOk": true,
    "ultimaSincronizacaoErro": null,
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-09-25T13:40:12.000Z"
  }
]`}
      >
        <P>
          <C>sistemaPadrao</C> marca a obra “Geral”, o estoque padrão da empresa. <C>codigoSienge</C> é o centro
          de custo da obra no Sienge, quando vinculada; os campos <C>ultimaSincronizacao*</C> dizem como foi a
          última conferência com o Sienge.
        </P>
      </Endpoint>

      <Endpoint
        titulo="Consultar saldo por obra"
        metodo="GET"
        caminho="/api/almoxarifado/saldos"
        permissao="usuário com o módulo Almoxarifado."
        query={[
          { nome: 'obraId', tipo: 'texto', descricao: 'Só o saldo desta obra.' },
          { nome: 'pecaId', tipo: 'texto', descricao: 'Só o saldo deste insumo (em todas as obras).' },
        ]}
        resposta={`[
  {
    "id": "8e9f0a1b-2c3d-4e5f-9a6b-7c8d9e0f1a2b",
    "pecaId": "${PECA_ID}",
    "obraId": "${OBRA_ID}",
    "quantidadeAtual": 42,
    "valorMedio": 38.9,
    "valorTotal": 1633.8,
    "updatedAt": "2026-09-24T18:22:40.000Z",
    "peca": {
      "id": "${PECA_ID}",
      "codigo": 1507,
      "nome": "CIMENTO PORTLAND CP II 50KG",
      "unidadeMedida": "sc",
      "quantidadeMinima": 20
    },
    "obra": { "id": "${OBRA_ID}", "codigo": 3, "nome": "Residencial Aurora" }
  }
]`}
      >
        <P>
          Uma linha por insumo em cada obra, ordenada por obra e nome do insumo. <C>valorTotal</C> é{' '}
          <C>quantidadeAtual × valorMedio</C>. Compare <C>quantidadeAtual</C> com <C>peca.quantidadeMinima</C>{' '}
          para achar o que está abaixo do mínimo.
        </P>
      </Endpoint>

      <Endpoint
        titulo="Listar movimentações de estoque"
        metodo="GET"
        caminho="/api/almoxarifado/movimentacoes-obra"
        permissao="usuário com o módulo Almoxarifado."
        query={[
          { nome: 'obraId', tipo: 'texto', descricao: 'Só movimentações desta obra.' },
          {
            nome: 'incluirOrigem',
            tipo: 'texto',
            descricao: <>Com <C>true</C>, inclui também as transferências que <B>saíram</B> da obra (não só as que entraram).</>,
          },
          { nome: 'pecaId', tipo: 'texto', descricao: 'Só movimentações deste insumo.' },
          {
            nome: 'tipo',
            tipo: 'texto',
            descricao: (
              <>
                <C>entrada</C>, <C>saida</C>, <C>transferencia</C>, <C>manutencao</C>, <C>ajuste</C>,{' '}
                <C>realocacao</C> ou <C>inicializacao</C>.
              </>
            ),
          },
          { nome: 'de', tipo: 'data', descricao: <>Lançadas a partir desta data (<C>AAAA-MM-DD</C>).</> },
          { nome: 'ate', tipo: 'data', descricao: 'Lançadas até esta data, inclusive.' },
          { nome: 'limit', tipo: 'número', descricao: 'Quantidade máxima de itens. Padrão 200, máximo 500.' },
        ]}
        resposta={`[
  {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "pecaId": "${PECA_ID}",
    "tipo": "saida",
    "tipoLabel": "Saída",
    "quantidade": 8,
    "quantidadeAntes": 50,
    "quantidadeDepois": 42,
    "motivo": "Concretagem bloco B",
    "manutencaoRealizadaId": null,
    "obraId": "${OBRA_ID}",
    "obraOrigemId": null,
    "tipoMovimentoId": "5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e",
    "documentoSiengeOverride": null,
    "valorUnitario": 38.9,
    "dataMovimento": "2026-09-24T00:00:00.000Z",
    "actorUsername": "almox.aurora",
    "siengeSincronizado": true,
    "siengeErro": null,
    "siengeSincronizadoEm": "2026-09-24T18:22:43.000Z",
    "createdAt": "2026-09-24T18:22:40.000Z",
    "peca": { "id": "${PECA_ID}", "codigo": 1507, "nome": "CIMENTO PORTLAND CP II 50KG", "unidadeMedida": "sc" },
    "obra": { "id": "${OBRA_ID}", "codigo": 3, "nome": "Residencial Aurora", "codigoSienge": 1204 },
    "obraOrigem": null,
    "tipoMovimento": { "id": "5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e", "nome": "Consumo", "direcao": "saida" }
  }
]`}
      >
        <P>
          Da mais recente para a mais antiga. Numa transferência, <C>obraOrigem</C> é de onde o material saiu e{' '}
          <C>obra</C> para onde foi. <C>siengeSincronizado</C> indica se o lançamento já chegou ao Sienge; o texto
          de <C>siengeErro</C> só aparece para usuários com acesso ao Sienge.
        </P>
      </Endpoint>

      <Endpoint
        titulo="Listar reservas"
        metodo="GET"
        caminho="/api/almoxarifado/reservas"
        permissao="usuário com o módulo Almoxarifado."
        query={[
          { nome: 'obraId', tipo: 'texto', descricao: 'Só reservas desta obra.' },
          { nome: 'pecaId', tipo: 'texto', descricao: 'Só reservas deste insumo.' },
          {
            nome: 'situacao',
            tipo: 'texto',
            descricao: (
              <>
                <C>pendente</C>, <C>parcial</C>, <C>atendida</C> ou <C>cancelada</C>.
              </>
            ),
          },
        ]}
        resposta={`[
  {
    "id": "d4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f70",
    "pecaId": "${PECA_ID}",
    "obraId": "${OBRA_ID}",
    "quantidade": 10,
    "quantidadeAtendida": 4,
    "quantidadePendente": 6,
    "situacao": "parcial",
    "veiculoId": null,
    "observacao": "Reservado para a laje do 3º pavimento",
    "actorUsername": "eng.aurora",
    "createdAt": "2026-09-20T11:00:00.000Z",
    "updatedAt": "2026-09-23T15:12:00.000Z",
    "peca": { "id": "${PECA_ID}", "codigo": 1507, "nome": "CIMENTO PORTLAND CP II 50KG", "unidadeMedida": "sc" },
    "obra": { "id": "${OBRA_ID}", "codigo": 3, "nome": "Residencial Aurora", "codigoSienge": 1204 },
    "veiculo": null
  }
]`}
      >
        <P>
          <C>quantidadePendente</C> é o que ainda falta entregar. O saldo da obra só é debitado quando a reserva é
          atendida.
        </P>
      </Endpoint>

      <H2>Tipos de movimentação</H2>
      <Table
        colunas={['tipo', 'Significado']}
        linhas={[
          [<C>entrada</C>, 'Material que entrou na obra (compra, devolução…).'],
          [<C>saida</C>, 'Material que saiu da obra (consumo, perda…).'],
          [<C>transferencia</C>, 'Material levado de uma obra para outra.'],
          [<C>manutencao</C>, 'Peça baixada ao registrar uma manutenção realizada.'],
          [<C>inicializacao</C>, 'Carga do saldo inicial da obra.'],
          [<C>ajuste</C>, 'Correção de saldo.'],
          [<C>realocacao</C>, 'Reclassificação da apropriação do insumo, sem mudar a quantidade em estoque.'],
        ]}
      />
    </>
  )
}
