/**
 * Navegação de período do painel — a mesma lógica do sistema (painelApresentacaoCliente.js):
 * mês a mês do primeiro lançamento até o mês corrente, ou o ano. Aqui o "agora" é o do demo
 * (setembro de 2026), igual à página de demonstração do sistema: nada além de setembro existe.
 */

export interface Periodo {
  ano: number
  /** `01`…`12` ou `ANO`. */
  mes: string
}

const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

/** "Hoje" do demo: setembro de 2026 fechado, como na página de demonstração do sistema. */
const AGORA_DEMO = new Date(2026, 8, 30, 12)

const chaveMes = (ano: number, mes: number | string) => `${ano}-${String(mes).padStart(2, '0')}`

function deslocarChave(chave: string, delta: number) {
  const [ano, mes] = chave.split('-').map(Number)
  const d = new Date(ano, mes - 1 + delta, 1)
  return chaveMes(d.getFullYear(), d.getMonth() + 1)
}

const mesAtual = () => chaveMes(AGORA_DEMO.getFullYear(), AGORA_DEMO.getMonth() + 1)

export function periodoInicial(): Periodo {
  const atual = mesAtual()
  return { ano: Number(atual.slice(0, 4)), mes: atual.slice(5, 7) }
}

/** Chave do período nos dados: `2026-09` para um mês, `2026-ANO` para o ano. */
export function chaveDoPeriodo(p: Periodo) {
  return p.mes === 'ANO' ? `${p.ano}-ANO` : chaveMes(p.ano, p.mes)
}

export function rotuloPeriodo(p: Periodo) {
  if (p.mes === 'ANO') return String(p.ano)
  const nome = MESES[Number(p.mes) - 1]
  return `${nome.charAt(0).toUpperCase()}${nome.slice(1)} de ${p.ano}`
}

export function definirModoPeriodo(p: Periodo, modo: 'mes' | 'ano'): Periodo {
  if (modo === 'ano') return { ano: p.ano, mes: 'ANO' }
  if (p.mes !== 'ANO') return p
  // Voltando do ano pro mês: o mês corrente, se o ano é o atual; senão dezembro daquele ano.
  if (p.ano === AGORA_DEMO.getFullYear()) return periodoInicial()
  return { ano: p.ano, mes: '12' }
}

export function deslocarPeriodo(p: Periodo, direcao: 1 | -1, inicioDados: string): Periodo {
  const atual = mesAtual()
  const inicio = inicioDados && inicioDados <= atual ? inicioDados : atual
  if (p.mes === 'ANO') {
    const ano = p.ano + direcao
    if (ano < Number(inicio.slice(0, 4)) || ano > AGORA_DEMO.getFullYear()) return p
    return { ano, mes: 'ANO' }
  }
  const destino = deslocarChave(chaveMes(p.ano, p.mes), direcao)
  if (destino < inicio || destino > atual) return p
  return { ano: Number(destino.slice(0, 4)), mes: destino.slice(5, 7) }
}

export function limitesPeriodo(p: Periodo, inicioDados: string) {
  const mudou = (outro: Periodo) => outro.ano !== p.ano || outro.mes !== p.mes
  return {
    podeVoltar: mudou(deslocarPeriodo(p, -1, inicioDados)),
    podeAvancar: mudou(deslocarPeriodo(p, 1, inicioDados)),
  }
}
