import { C, Endpoint, H2, P, Table } from '../ui'

const FAIXA = (
  <>
    Faixa de vencimento: <C>vencido</C>, <C>ate30</C>, <C>ate60</C>, <C>ate90</C> ou <C>ok</C>.
  </>
)

const MUNICIPIO = (
  <>
    Município dos ativos, em formato de identificador (ex.: <C>fortaleza</C>).
  </>
)

export function ApiDocumentacao() {
  return (
    <>
      <H2>Faixas de vencimento</H2>
      <P>
        Documentos, CNH e multas em aberto trazem a faixa calculada pelo Kargo com base na data de hoje:
      </P>
      <Table
        colunas={['Valor', 'Significado']}
        linhas={[
          [<C>vencido</C>, 'A data de vencimento já passou.'],
          [<C>ate30</C>, 'Vence em até 30 dias.'],
          [<C>ate60</C>, 'Vence entre 31 e 60 dias.'],
          [<C>ate90</C>, 'Vence entre 61 e 90 dias.'],
          [<C>ok</C>, 'Vence em mais de 90 dias.'],
        ]}
      />

      <Endpoint
        titulo="Listar documentos dos ativos"
        metodo="GET"
        caminho="/api/documentos"
        permissao={<>usuário com o módulo Documentação (<C>documentacao</C>).</>}
        query={[
          { nome: 'veiculoId', tipo: 'texto', descricao: <>Só documentos deste ativo (o <C>id</C> do ativo).</> },
          {
            nome: 'tipo',
            tipo: 'texto',
            descricao: (
              <>
                Só um tipo: <C>ipva</C>, <C>licenciamento</C>, <C>seguro</C>, <C>crlv</C>, <C>inspecao</C>,{' '}
                <C>extintor</C>, <C>contrato</C>, <C>entrega_veiculo</C> ou <C>outro</C>.
              </>
            ),
          },
          {
            nome: 'excluirTipos',
            tipo: 'texto',
            descricao: <>Tipos a deixar de fora, separados por vírgula (ignorado quando <C>tipo</C> é enviado).</>,
          },
          { nome: 'faixa', tipo: 'texto', descricao: FAIXA },
          { nome: 'municipio', tipo: 'texto', descricao: MUNICIPIO },
        ]}
        resposta={`[
  {
    "id": "5e1d2c3b-4a59-4f68-8e7d-6c5b4a392817",
    "veiculoId": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "veiculoCodigo": 112,
    "veiculoNome": "CAMINHÃO BASCULANTE 01",
    "veiculoPlaca": "ABC1D23",
    "veiculoCategoria": "Veículo Pesado",
    "tipo": "licenciamento",
    "tipoLabel": "Licenciamento",
    "dataVencimento": "2026-10-15",
    "dataEmissao": "2025-10-10",
    "numeroApoliceOuRenavam": "01234567890",
    "anosPagos": null,
    "observacoes": null,
    "arquivoPdfNome": "crlv-abc1d23.pdf",
    "parcelasPdf": [],
    "temPdf": true,
    "ativo": true,
    "faixaVencimento": "ate30",
    "createdAt": "2025-10-11T13:20:44.000Z",
    "updatedAt": "2025-10-11T13:20:44.000Z"
  }
]`}
      >
        <P>
          Devolve os documentos ativos, do vencimento mais próximo para o mais distante. No IPVA parcelado,{' '}
          <C>parcelasPdf</C> lista cada parcela (<C>parcela</C>, <C>pdfNome</C>, <C>temPdf</C>).
        </P>
      </Endpoint>

      <Endpoint
        titulo="Resumo de vencimentos"
        metodo="GET"
        caminho="/api/documentos/resumo"
        permissao="usuário com o módulo Documentação."
        query={[{ nome: 'municipio', tipo: 'texto', descricao: MUNICIPIO }]}
        resposta={`{
  "documentos": { "vencido": 2, "ate30": 5, "ate60": 3, "ate90": 4, "ok": 61, "total": 75 },
  "cnh": { "vencido": 0, "ate30": 1, "ate60": 2, "ate90": 0, "ok": 38 }
}`}
      >
        <P>Quantos documentos e quantas CNHs estão em cada faixa — ideal para um painel.</P>
      </Endpoint>

      <Endpoint
        titulo="Listar multas"
        metodo="GET"
        caminho="/api/multas"
        permissao="usuário com o módulo Documentação."
        query={[
          { nome: 'veiculoId', tipo: 'texto', descricao: 'Só multas deste ativo.' },
          { nome: 'motoristaId', tipo: 'texto', descricao: 'Só multas deste motorista.' },
          { nome: 'pago', tipo: 'texto', descricao: <><C>true</C> para só pagas, <C>false</C> para só em aberto.</> },
          { nome: 'faixa', tipo: 'texto', descricao: <>{FAIXA} Multas pagas não têm faixa.</> },
          { nome: 'municipio', tipo: 'texto', descricao: MUNICIPIO },
        ]}
        resposta={`[
  {
    "id": "9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d",
    "veiculoId": "0b6f3c1e-8a2d-4f5b-9c7e-1d2a3b4c5d6e",
    "veiculoCodigo": 112,
    "veiculoNome": "CAMINHÃO BASCULANTE 01",
    "veiculoPlaca": "ABC1D23",
    "veiculoCategoria": "Veículo Pesado",
    "motoristaId": "1f2e3d4c-5b6a-4987-8a6b-5c4d3e2f1a0b",
    "motoristaCodigo": 27,
    "motoristaNome": "JOSÉ DA SILVA",
    "motoristaCnh": "01234567890",
    "grupoId": null,
    "tipo": "multas",
    "tipoLabel": "Multas",
    "dataVencimento": "2026-10-02",
    "valorMulta": 130.16,
    "codigoInfracao": "745-50",
    "tipoInfracaoDescricao": "Transitar em velocidade superior à máxima permitida em até 20%",
    "observacoes": null,
    "arquivoPdfNome": "notificacao.pdf",
    "temPdf": true,
    "arquivoComprovantePdfNome": null,
    "temComprovante": false,
    "pago": false,
    "dataPagamento": null,
    "ativo": true,
    "faixaVencimento": "ate30",
    "createdAt": "2026-09-12T10:02:37.000Z",
    "updatedAt": "2026-09-12T10:02:37.000Z"
  }
]`}
      >
        <P>
          Multas cadastradas juntas, num mesmo lote, compartilham o mesmo <C>grupoId</C>.
        </P>
      </Endpoint>

      <Endpoint
        titulo="Listar motoristas"
        metodo="GET"
        caminho="/api/motoristas"
        permissao="usuário com o módulo Patrimônio ou Documentação."
        query={[
          { nome: 'busca', tipo: 'texto', descricao: 'Um número busca pelo código do motorista; um texto busca no nome.' },
          { nome: 'alerta', tipo: 'texto', descricao: <>Filtra pela faixa da CNH ({FAIXA})</> },
          { nome: 'inativos', tipo: 'texto', descricao: <>Envie <C>1</C> para incluir motoristas inativos.</> },
        ]}
        resposta={`[
  {
    "id": "1f2e3d4c-5b6a-4987-8a6b-5c4d3e2f1a0b",
    "codigo": 27,
    "nome": "JOSÉ DA SILVA",
    "cpf": "12345678900",
    "cnhNumero": "01234567890",
    "cnhCategoria": "D",
    "cnhValidade": "2027-04-18",
    "telefone": "85999990000",
    "ativo": true,
    "temCnh": true,
    "faixaCnh": "ok",
    "createdAt": "2025-05-06T11:22:33.000Z",
    "updatedAt": "2026-01-10T08:00:00.000Z"
  }
]`}
      >
        <P>
          Devolve o cadastro de motoristas com a CNH. <C>faixaCnh</C> é <C>null</C> quando o motorista não tem CNH
          registrada.
        </P>
      </Endpoint>
    </>
  )
}
