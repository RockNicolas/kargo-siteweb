import { C, Endpoint, H2, P, Table } from '../ui'

const VEICULO = `{
  "id": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
  "codigo": 112,
  "nome": "CAMINHÃO BASCULANTE 01",
  "placa": "ABC1D23",
  "categoria": "Veículo Pesado",
  "municipio": "fortaleza",
  "localidade": "Pátio central",
  "obraId": "7c2e9a10-4b3d-4e8f-a1b2-c3d4e5f60718",
  "obra": { "id": "7c2e9a10-4b3d-4e8f-a1b2-c3d4e5f60718", "codigo": 3, "nome": "Residencial Aurora" },
  "origemPecaEstoqueId": null,
  "origemPecaEstoque": null,
  "codigoSienge": 4521,
  "ultimaSincronizacaoSiengeEm": "2026-09-25T13:45:00.000Z",
  "ultimaSincronizacaoSiengeOk": true,
  "ultimaSincronizacaoSiengeErro": null,
  "tipoMedidorPadrao": "KM",
  "intervaloManutencaoMedidor": 10000,
  "ultimoMedidorManutencao": 184320,
  "valorContratoMensal": 18500,
  "ativo": true,
  "controleDiarioRemovidoDesde": null,
  "createdAt": "2026-03-02T12:40:11.000Z",
  "updatedAt": "2026-09-20T09:15:02.000Z"
}`

export function ApiPatrimonio() {
  return (
    <>
      <Endpoint
        titulo="Listar ativos"
        metodo="GET"
        caminho="/api/veiculos"
        permissao={<>usuário com o módulo Patrimônio (<C>frota</C>).</>}
        query={[
          {
            nome: 'inativos',
            tipo: 'texto',
            descricao: (
              <>
                Envie <C>1</C> para incluir ativos inativos. Sem o parâmetro, vêm só os ativos em operação.
              </>
            ),
          },
        ]}
        resposta={`[\n  ${VEICULO.split('\n').join('\n  ')}\n]`}
      >
        <P>Devolve todos os ativos (veículos, máquinas e equipamentos), ordenados pelo código.</P>
      </Endpoint>

      <Endpoint
        titulo="Buscar ativo pelo código"
        metodo="GET"
        caminho="/api/veiculos/por-codigo/{codigo}"
        permissao="usuário com o módulo Patrimônio, Documentação ou Manutenção."
        pathParams={[{ nome: 'codigo', tipo: 'número', obrigatorio: true, descricao: 'O código (prefixo) do ativo.' }]}
        query={[
          {
            nome: 'inativos',
            tipo: 'texto',
            descricao: (
              <>
                Envie <C>1</C> para encontrar também um ativo inativo.
              </>
            ),
          },
        ]}
        resposta={VEICULO}
      >
        <P>
          Devolve um único ativo. Responde <C>400</C> se o código não for um número positivo e <C>404</C> se não
          houver ativo com esse código.
        </P>
      </Endpoint>

      <H2>Campos do ativo</H2>
      <Table
        colunas={['Campo', 'Tipo', 'Descrição']}
        linhas={[
          [<C>id</C>, 'texto', 'Identificador interno. Use nos filtros das outras rotas (ex.: veiculoId).'],
          [<C>codigo</C>, 'número', 'Código (prefixo) do ativo, como aparece nas telas.'],
          [<C>nome</C>, 'texto', 'Descrição do ativo.'],
          [<C>placa</C>, 'texto ou null', 'Placa, quando houver.'],
          [<C>categoria</C>, 'texto', <><C>Máquina</C>, <C>Veículo Pesado</C>, <C>Veículo Leve</C> ou <C>Outros</C>.</>],
          [<C>municipio</C>, 'texto', <>Município em formato de identificador (minúsculas, sem acento), ex.: <C>fortaleza</C>.</>],
          [<C>localidade</C>, 'texto ou null', 'Local de trabalho dentro do município.'],
          [<C>obraId</C> , 'texto ou null', <>Obra atual do ativo; <C>obra</C> traz código e nome dela.</>],
          [<C>origemPecaEstoqueId</C>, 'texto ou null', 'Insumo do almoxarifado de onde o ativo foi criado, quando for o caso.'],
          [<C>codigoSienge</C>, 'número ou null', 'Código do bem móvel no Sienge, quando vinculado.'],
          [<C>ultimaSincronizacaoSienge*</C>, 'vários', 'Quando e com que resultado a localização foi conferida no Sienge pela última vez.'],
          [<C>tipoMedidorPadrao</C>, 'texto ou null', <><C>KM</C> ou <C>HORIMETRO</C>.</>],
          [<C>intervaloManutencaoMedidor</C>, 'número ou null', 'Intervalo entre manutenções, na unidade do medidor.'],
          [<C>ultimoMedidorManutencao</C>, 'número ou null', 'Leitura do medidor na última manutenção.'],
          [<C>valorContratoMensal</C>, 'número ou null', 'Valor mensal do contrato de locação do ativo, em reais.'],
          [<C>ativo</C>, 'booleano', <><C>false</C> quando o ativo foi retirado de operação.</>],
          [<C>controleDiarioRemovidoDesde</C>, 'data ou null', 'Desde quando o ativo está fora do controle de entrada e saída.'],
        ]}
      />
    </>
  )
}
