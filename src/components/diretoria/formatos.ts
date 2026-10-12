/** Mesmos formatos do painel real (painelApresentacaoCliente.js): R$ 413.900,00 · R$ 413,9 mil · 50,9%. */

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const BRL_COMPACTO = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatarMoeda(valor: number) {
  return BRL.format(Math.round((Number(valor) || 0) * 100) / 100)
}

export function formatarMoedaCompacta(valor: number) {
  const n = Number(valor) || 0
  if (Math.abs(n) < 10000) return BRL.format(n)
  return BRL_COMPACTO.format(n)
}

export function formatarPct(fracao: number | null | undefined, casas = 0) {
  if (fracao == null || !Number.isFinite(fracao)) return '—'
  return `${(fracao * 100).toLocaleString('pt-BR', { maximumFractionDigits: casas, minimumFractionDigits: 0 })}%`
}

export function formatarInteiro(n: number) {
  return Math.round(Number(n) || 0).toLocaleString('pt-BR')
}

export function maiuscula(texto: string) {
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : texto
}
