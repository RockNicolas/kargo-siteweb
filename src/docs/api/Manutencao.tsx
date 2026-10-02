import { C, Endpoint, H2, P, Table } from '../ui'

const REALIZADA = `{
  "id": "e7f8a9b0-c1d2-4e3f-8a4b-5c6d7e8f9a0b",
  "equipamentoId": 58,
  "itemManutencaoId": "oleo_motor_filtro",
  "itensManutencaoIds": null,
  "esLote": false,
  "veiculoId": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
  "dataRealizacao": "2026-09-18T12:00:00.000Z",
  "medidorNaRealizacao": 184320,
  "responsavelTipo": "oficina",
  "responsavelNome": "AUTO DIESEL CENTRO",
  "tipoRealizacao": "preventiva",
  "valor": 1480,
  "valorMaoDeObra": 350,
  "itensDetalhados": [
    { "id": "oleo_motor_filtro", "quantidade": 1, "valorUnitario": 1130 },
    { "id": "oleo_motor_filtro", "quantidade": 1, "valorUnitario": 350, "tipoCusto": "mao_de_obra" }
  ],
  "boletos": [
    { "valor": 740, "vencimento": "2026-10-05", "pagoComBoleto": true, "pagoViaSienge": true },
    { "valor": 740, "vencimento": "2026-11-05", "pagoComBoleto": false }
  ],
  "qtdParcelas": 2,
  "dataPagamentoPrevisto": "2026-10-05",
  "billIdSienge": 23486,
  "documentoSienge": "NF",
  "numeroDocumentoSienge": "4512",
  "pecaId": null,
  "quantidadePeca": null,
  "obraId": null,
  "observacoes": null,
  "temOrdemServicoPdf": true,
  "ordemServicoPdfNome": "os-2231.pdf",
  "equipamento": { "id": 58, "prefixo": "112", "descricao": "CAMINHÃO BASCULANTE 01", "codigoVeiculo": 112, "unidadeMedidor": "km", "municipio": "fortaleza", "tipoManutencao": "oleo_motor_filtro", "categoria": "Veículo Pesado" },
  "peca": null,
  "obra": null,
  "veiculo": { "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e", "codigo": 112, "nome": "CAMINHÃO BASCULANTE 01", "placa": "ABC1D23", "categoria": "Veículo Pesado", "municipio": "fortaleza" },
  "createdAt": "2026-09-18T15:31:09.000Z",
  "updatedAt": "2026-10-05T14:02:51.000Z"
}`

export function ApiManutencao() {
  return (
    <>
      <Endpoint
        titulo="Listar manutenções realizadas"
        metodo="GET"
        caminho="/api/manutencoes-realizadas"
        permissao={<>usuário com o módulo Manutenção (<C>manutencao</C>).</>}
        query={[
          { nome: 'veiculoId', tipo: 'texto', descricao: <>Só manutenções deste ativo (o <C>id</C> do ativo).</> },
          { nome: 'itemManutencaoId', tipo: 'texto', descricao: 'Só manutenções que incluem este serviço do catálogo.' },
          { nome: 'dataInicio', tipo: 'data', descricao: <>Realizadas a partir desta data (<C>AAAA-MM-DD</C>).</> },
          { nome: 'dataFim', tipo: 'data', descricao: 'Realizadas até esta data, inclusive.' },
          { nome: 'limite', tipo: 'número', descricao: 'Quantidade máxima de itens. Padrão 2000, máximo 5000.' },
        ]}
        resposta={`[\n  ${REALIZADA.split('\n').join('\n  ')}\n]`}
      >
        <P>Devolve as manutenções da mais recente para a mais antiga.</P>
      </Endpoint>

      <Endpoint
        titulo="Detalhar uma manutenção realizada"
        metodo="GET"
        caminho="/api/manutencoes-realizadas/{id}"
        permissao="usuário com o módulo Manutenção."
        pathParams={[{ nome: 'id', tipo: 'texto', obrigatorio: true, descricao: 'O id da manutenção realizada.' }]}
      >
        <P>
          Devolve uma única manutenção, com os mesmos campos da listagem. Responde <C>400</C> se o id for
          inválido e <C>404</C> se não existir.
        </P>
      </Endpoint>

      <H2>Campos da manutenção realizada</H2>
      <Table
        colunas={['Campo', 'Tipo', 'Descrição']}
        linhas={[
          [<C>veiculoId</C>, 'texto ou null', <>Ativo que recebeu a manutenção; <C>veiculo</C> traz código, nome e placa.</>],
          [<C>dataRealizacao</C>, 'data e hora', 'Quando o serviço foi feito.'],
          [<C>medidorNaRealizacao</C>, 'número', 'Leitura do medidor (km ou horas) no dia do serviço.'],
          [<C>tipoRealizacao</C>, 'texto', <><C>preventiva</C> ou <C>corretiva</C>.</>],
          [<C>itemManutencaoId</C>, 'texto', <>Serviço do catálogo. Quando é <C>todas</C>, a manutenção cobre vários serviços, listados em <C>itensManutencaoIds</C> (e <C>esLote</C> é <C>true</C>).</>],
          [<C>responsavelTipo</C>, 'texto', <><C>interno</C>, <C>terceirizado</C>, <C>oficina</C> ou <C>distribuidora</C>; <C>responsavelNome</C> traz o nome.</>],
          [<C>valor</C>, 'número ou null', 'Valor total da manutenção, em reais.'],
          [<C>valorMaoDeObra</C>, 'número ou null', 'Parte do valor que é mão de obra.'],
          [<C>itensDetalhados</C>, 'lista', <>Peças e mão de obra por serviço: <C>id</C> do serviço, <C>quantidade</C>, <C>valorUnitario</C> e, na mão de obra, <C>tipoCusto: "mao_de_obra"</C>.</>],
          [<C>boletos</C>, 'lista', <>Parcelas do pagamento: <C>valor</C>, <C>vencimento</C>, <C>pagoComBoleto</C> (paga ou não) e, quando a baixa veio do Sienge, <C>pagoViaSienge</C>.</>],
          [<C>billIdSienge</C>, 'número ou null', 'Número do título no Contas a Pagar do Sienge, quando informado.'],
          [<C>pecaId</C>, 'texto ou null', <>Peça baixada do almoxarifado, com <C>quantidadePeca</C> e a obra de onde saiu (<C>obraId</C>).</>],
          [<C>temOrdemServicoPdf</C>, 'booleano', 'Se há ordem de serviço ou nota fiscal anexada.'],
        ]}
      />

      <Endpoint
        titulo="Listar o catálogo de serviços"
        metodo="GET"
        caminho="/api/itens-manutencao"
        permissao="usuário com o módulo Manutenção."
        resposta={`[
  {
    "id": "oleo_motor_filtro",
    "codigo": 1,
    "nome": "Óleo de motor + filtro",
    "tipo": "fluidos",
    "observacao": null,
    "categoria": "veiculo",
    "ordem": 0,
    "ativo": true
  }
]`}
      >
        <P>
          Os serviços cadastrados em Item de manutenção. Use para traduzir o <C>itemManutencaoId</C> das
          manutenções no nome do serviço.
        </P>
      </Endpoint>
    </>
  )
}
