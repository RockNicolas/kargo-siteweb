/** Formato dos dados do painel da diretoria de demonstração (ver painelDiretoriaDemo.ts). */

export type CustoId = 'combustivel' | 'manutencao' | 'multas' | 'impostos'
export type CategoriaId = 'maquina' | 'pesado' | 'leve' | 'equipamento'

export interface DemoComposicao { id: CustoId; rotulo: string; valor: number; pct: number }
export interface DemoCategoria { id: CategoriaId; rotulo: string; ativos: number; receita: number; custo: number; resultado: number; margem: number | null }
export interface DemoDreLinha { id: string; tipo: 'receita' | 'custo' | 'total'; rotulo: string; valor: number; cor?: CustoId; pct?: number }
export interface DemoLinhaComparativa { id: string; rotulo: string; atual: number; anterior: number; delta: number; pct: number | null; subirEhBom: boolean }
export interface DemoCausa { id: CustoId; titulo: string; resumo: string; delta: number; pontos: string[] }
export interface DemoMes {
  mes: string
  rotulo: string
  rotuloLongo: string
  receita: number
  combustivel: number
  manutencao: number
  multas: number
  impostos: number
  custo: number
  resultado: number
  selecionado: boolean
  parcial: boolean
  implantacao: boolean
}
export interface DemoPonto { id: string; nivel: 'risco' | 'atencao' | 'bom'; titulo: string; texto: string }
export interface DemoEstatistica { rotulo: string; valor: string; detalhe?: string }
export interface DemoModulo {
  id: 'combustivel' | 'manutencao' | 'frota' | 'documentacao' | 'almoxarifado'
  destaque: string
  legenda: string
  estatisticas: DemoEstatistica[]
  analise: boolean
  aviso: string | null
  vazio: string | null
}
export interface DemoAtivoAlerta {
  id: string
  codigo: number
  nome: string
  ativo: boolean
  receita: number
  custo: number
  resultado: number
  situacao: 'prejuizo' | 'semReceita' | 'atencao'
}
/** Variação (fração) de cada total contra o período anterior; `null` quando não há base. */
export interface DemoComparacao {
  rotulo: string | null
  receita: number | null
  custoTotal: number | null
  resultadoOperacao: number | null
}
export interface DemoComparativo {
  frase: string
  atual: string
  anterior: string
  linhas: DemoLinhaComparativa[]
  tipos: DemoLinhaComparativa[]
  causas: DemoCausa[]
  avisos: string[]
}

/** O painel de UM período (mês ou ano), como o sistema calcula. */
export interface PainelPeriodo {
  rotulo: string
  modoAno: boolean
  emAndamento: boolean
  contas: {
    receita: number
    ativosComReceita: number
    custoTotal: number
    resultadoOperacao: number
    margemOperacao: number
    temReceita: boolean
  }
  comparacao: DemoComparacao | null
  composicao: DemoComposicao[]
  categorias: DemoCategoria[]
  ativos: {
    total: number
    contagem: { saudavel: number; atencao: number; prejuizo: number; semReceita: number; semContrato: number }
    alerta: DemoAtivoAlerta[]
  } | null
  dre: { linhas: DemoDreLinha[]; faltando: string[] }
  comparativo: DemoComparativo | null
  comparativoMotivo: string | null
  serie: DemoMes[]
  pontos: DemoPonto[]
  modelos: DemoModulo[]
  frase: string
  avisos: string[]
  regras: string[]
  modulos: string[]
}

export interface PainelDiretoriaDemo {
  empresa: string
  /** Primeiro mês com lançamentos (AAAA-MM). */
  inicioDados: string
  /** Último mês navegável: o "hoje" do demo (AAAA-MM). */
  mesFinal: string
  coresCusto: { claro: Record<CustoId, string>; escuro: Record<CustoId, string> }
  /** Chave `AAAA-MM` para um mês e `AAAA-ANO` para o ano inteiro. */
  periodos: Record<string, PainelPeriodo>
}
