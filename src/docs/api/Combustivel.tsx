import { C, Callout, Endpoint, H2, P, Table } from '../ui'

export function ApiCombustivel() {
  return (
    <>
      <Endpoint
        titulo="Listar abastecimentos"
        metodo="GET"
        caminho="/api/registros"
        permissao={<>usuário com o módulo Combustível (<C>combustivel</C>).</>}
        resposta={`[
  {
    "id": "c4d5e6f7-a8b9-4c0d-9e1f-2a3b4c5d6e7f",
    "nome": "CAMINHÃO BASCULANTE 01",
    "motorista": "JOSÉ DA SILVA",
    "motoristaId": "1f2e3d4c-5b6a-4987-8a6b-5c4d3e2f1a0b",
    "veiculoId": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "localidade": null,
    "categoria": "Veículo Pesado",
    "tipo": "Diesel",
    "periodo": "semanal",
    "valor": 842,
    "litros": 310.5,
    "precoLitro": 6.19,
    "custo": 1921.995,
    "observacoes": null,
    "comprovantePixNome": "pix-posto.pdf",
    "temComprovantePix": true,
    "comprovantesPix": [],
    "fotosAbastecimento": [
      { "id": "f1", "nome": "bomba.jpg", "mime": "image/jpeg" }
    ],
    "createdAt": "2026-09-22T17:48:05.000Z",
    "updatedAt": "2026-09-22T17:48:05.000Z"
  }
]`}
      >
        <P>
          Devolve todos os lançamentos de abastecimento, do mais recente para o mais antigo. Esta rota não tem
          filtros: para sincronizações periódicas, guarde o <C>createdAt</C> mais recente que você já leu e
          processe só o que vier depois.
        </P>
      </Endpoint>

      <H2>Campos do abastecimento</H2>
      <Table
        colunas={['Campo', 'Tipo', 'Descrição']}
        linhas={[
          [<C>nome</C>, 'texto', 'Identificação do ativo abastecido (ou do item, na categoria Outros).'],
          [<C>veiculoId</C>, 'texto ou null', 'Ativo do cadastro de Patrimônio, quando o lançamento foi ligado a um.'],
          [<C>motorista</C>, 'texto', <>Nome do motorista. <C>motoristaId</C> liga ao cadastro de motoristas, quando houver.</>],
          [<C>categoria</C>, 'texto', <><C>Máquina</C>, <C>Veículo Pesado</C>, <C>Veículo Leve</C> ou <C>Outros</C>.</>],
          [<C>tipo</C>, 'texto', 'Nome do tipo de combustível (veja a rota de tipos abaixo).'],
          [<C>periodo</C>, 'texto', <><C>semanal</C> ou <C>mensal</C>.</>],
          [<C>valor</C>, 'número', 'Quilômetros rodados (veículos) ou horas trabalhadas (máquinas) no período; 0 quando não se aplica.'],
          [<C>litros</C>, 'número', 'Litros abastecidos.'],
          [<C>custo</C>, 'número', 'Total gasto, em reais.'],
          [<C>precoLitro</C>, 'número', <>Preço médio por litro (<C>custo ÷ litros</C>).</>],
          [<C>temComprovantePix</C>, 'booleano', <>Se há comprovante de pagamento anexado. <C>comprovantesPix</C> lista os comprovantes extras.</>],
          [<C>fotosAbastecimento</C>, 'lista', <>Fotos anexadas (<C>id</C>, <C>nome</C>, <C>mime</C>). Os arquivos em si não vêm na listagem.</>],
          [<C>observacoes</C>, 'texto ou null', 'Observações do lançamento. Pode conter anotações automáticas do Kargo.'],
        ]}
      />
      <Callout tipo="info" titulo="Arquivos anexados">
        <p>
          A listagem traz só os dados dos anexos (nome e tipo), nunca o arquivo, para manter a resposta leve.
        </p>
      </Callout>

      <Endpoint
        titulo="Listar tipos de combustível"
        metodo="GET"
        caminho="/api/combustivel/tipos"
        permissao="usuário com o módulo Combustível."
        query={[{ nome: 'inativos', tipo: 'texto', descricao: <>Envie <C>1</C> para incluir tipos desativados.</> }]}
        resposta={`[
  { "id": "diesel", "codigo": 1, "nome": "Diesel", "familia": "diesel", "ordem": 0, "ativo": true },
  { "id": "gasolina_comum", "codigo": 2, "nome": "Gasolina Comum", "familia": "gasolina", "ordem": 1, "ativo": true },
  { "id": "aditivada", "codigo": 3, "nome": "Aditivada", "familia": "gasolina", "ordem": 2, "ativo": true },
  { "id": "alcool", "codigo": 4, "nome": "Álcool", "familia": "alcool", "ordem": 3, "ativo": true }
]`}
      >
        <P>
          O catálogo de combustíveis da empresa. <C>familia</C> agrupa tipos parecidos (<C>diesel</C>,{' '}
          <C>gasolina</C>, <C>alcool</C> ou <C>outros</C>) e é o que os relatórios usam para somar.
        </P>
      </Endpoint>
    </>
  )
}
