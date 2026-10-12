import { useState } from 'react'
import { formatarPct } from './formatos'

export interface ItemDistribuicao {
  id: string
  rotulo: string
  valor: number
  cor: string
}

interface CaixaMosaico {
  x: number
  y: number
  largura: number
  altura: number
}

/** Divide a área proporcionalmente, sem ampliar artificialmente categorias pequenas (igual ao sistema). */
function dividirMosaico(
  itens: ItemDistribuicao[],
  total: number,
  caixa: CaixaMosaico = { x: 0, y: 0, largura: 100, altura: 100 },
): (ItemDistribuicao & CaixaMosaico)[] {
  if (!itens.length || !total) return []
  if (itens.length === 1) return [{ ...itens[0], ...caixa }]
  const [primeiro, ...resto] = itens
  const parte = primeiro.valor / total
  const horizontal = caixa.largura >= caixa.altura
  const tamanho = (horizontal ? caixa.largura : caixa.altura) * parte
  const atual = horizontal ? { ...caixa, largura: tamanho } : { ...caixa, altura: tamanho }
  const restante = horizontal
    ? { ...caixa, x: caixa.x + tamanho, largura: caixa.largura - tamanho }
    : { ...caixa, y: caixa.y + tamanho, altura: caixa.altura - tamanho }
  return [{ ...primeiro, ...atual }, ...dividirMosaico(resto, total - primeiro.valor, restante)]
}

function corDoTexto(hex: string) {
  const rgb = [1, 3, 5].map((inicio) => parseInt(hex.slice(inicio, inicio + 2), 16) / 255)
  const linear = rgb.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722 > 0.179 ? '#101827' : '#ffffff'
}

interface DistribuicaoProps {
  tipo: 'barras' | 'mosaico' | 'faixa'
  titulo: string
  dados: ItemDistribuicao[]
  formatarValor: (valor: number) => string
  totalValor: string
  totalRotulo: string
  vazio: string
}

export function GraficoDistribuicao({
  tipo,
  titulo,
  dados,
  formatarValor,
  totalValor,
  totalRotulo,
  vazio,
}: DistribuicaoProps) {
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const itens = dados.map((item) => ({ ...item, valor: Number.isFinite(item.valor) ? Math.max(0, item.valor) : 0 }))
  const total = itens.reduce((soma, item) => soma + item.valor, 0)
  const ativos = itens.filter((item) => item.valor > 0)
  const selecionar = (id: string) => setSelecionado((atual) => (atual === id ? null : id))
  const rotulo = (item: ItemDistribuicao) =>
    `${item.rotulo}: ${formatarValor(item.valor)}, ${formatarPct(item.valor / total, 1)}`
  const foco = ativos.find((item) => item.id === selecionado)
  const mosaico = tipo === 'mosaico' ? dividirMosaico([...ativos].sort((a, b) => b.valor - a.valor), total) : []

  return (
    <div className={`operacao-distribuicao operacao-distribuicao-${tipo}`}>
      {tipo !== 'mosaico' ? (
        <div className="operacao-distribuicao-total">
          <strong>{total > 0 ? totalValor : '—'}</strong>
          <span>{totalRotulo}</span>
        </div>
      ) : null}
      {!total ? (
        <p className="grid min-h-[180px] place-items-center rounded-xl border border-dashed border-kargo-border p-5 text-center text-xs leading-relaxed text-kargo-muted">
          {vazio}
        </p>
      ) : (
        <>
          {tipo === 'mosaico' ? (
            <div className="operacao-mosaico" role="group" aria-label={titulo}>
              {mosaico.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={rotulo(item)}
                  title={rotulo(item)}
                  aria-pressed={selecionado === item.id}
                  onClick={() => selecionar(item.id)}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: `${item.largura}%`,
                    height: `${item.altura}%`,
                    background: item.cor,
                    color: corDoTexto(item.cor),
                    opacity: foco && foco.id !== item.id ? 0.35 : 1,
                  }}
                >
                  {item.largura > 28 && item.altura > 26 ? (
                    <div className="operacao-mosaico-texto" aria-hidden>
                      <strong>{formatarPct(item.valor / total, 1)}</strong>
                      <span>{item.rotulo}</span>
                    </div>
                  ) : item.largura > 15 && item.altura > 10 ? (
                    <span className="operacao-mosaico-mini" aria-hidden>
                      {formatarPct(item.valor / total, 1)}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          {tipo === 'faixa' ? (
            <>
              <div className="operacao-faixa" role="group" aria-label={titulo}>
                {ativos.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={rotulo(item)}
                    title={rotulo(item)}
                    aria-pressed={selecionado === item.id}
                    onClick={() => selecionar(item.id)}
                    style={{
                      width: `${(item.valor / total) * 100}%`,
                      background: item.cor,
                      opacity: foco && foco.id !== item.id ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
              <p className="operacao-faixa-resumo">
                {foco
                  ? `${foco.rotulo}: ${formatarValor(foco.valor)} (${formatarPct(foco.valor / total, 1)})`
                  : 'Selecione uma situação para destacar sua participação.'}
              </p>
            </>
          ) : null}

          <ul
            className={tipo === 'barras' ? 'operacao-ranking' : 'operacao-rosca-legenda'}
            aria-label={`Legenda de ${titulo}`}
          >
            {itens.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  disabled={!item.valor}
                  aria-pressed={selecionado === item.id}
                  onClick={() => selecionar(item.id)}
                  className={foco?.id === item.id ? 'is-active' : ''}
                >
                  {tipo === 'barras' ? (
                    <>
                      <span className="operacao-ranking-linha">
                        <span>{item.rotulo}</span>
                        <strong>{formatarValor(item.valor)}</strong>
                      </span>
                      <span className="operacao-ranking-grafico">
                        <span className="operacao-ranking-trilho">
                          <span
                            style={{
                              width: `${(item.valor / total) * 100}%`,
                              background: item.cor,
                              opacity: foco && foco.id !== item.id ? 0.3 : 1,
                            }}
                          />
                        </span>
                        <span>{formatarPct(item.valor / total, 1)}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="operacao-rosca-chave" style={{ background: item.cor }} aria-hidden />
                      <span className="operacao-rosca-item">
                        <span>{item.rotulo}</span>
                        <strong>{formatarValor(item.valor)}</strong>
                      </span>
                      <span className="operacao-rosca-percentual">{formatarPct(item.valor / total, 1)}</span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

const RAIO = 66
const CIRCUNFERENCIA = 2 * Math.PI * RAIO

export function GraficoRosca({
  titulo,
  dados,
  formatarValor,
  totalRotulo,
  totalValor,
  vazio,
}: Omit<DistribuicaoProps, 'tipo'>) {
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const [destaque, setDestaque] = useState<string | null>(null)
  const itens = dados.map((item) => ({ ...item, valor: Number.isFinite(item.valor) ? Math.max(0, item.valor) : 0 }))
  const total = itens.reduce((soma, item) => soma + item.valor, 0)
  const ativos = itens.filter((item) => item.valor > 0)
  const foco = itens.find((item) => item.id === (selecionado ?? destaque) && item.valor > 0)
  const fatias = ativos.map((item, index) => {
    const inicio = ativos.slice(0, index).reduce((soma, anterior) => soma + anterior.valor, 0) / total
    const comprimento = (item.valor / total) * CIRCUNFERENCIA
    const intervalo = ativos.length > 1 ? Math.min(3, comprimento * 0.12) : 0
    return { ...item, inicio, comprimento, intervalo }
  })
  const selecionar = (id: string) => setSelecionado((atual) => (atual === id ? null : id))

  return (
    <div className="operacao-rosca">
      <div className="operacao-rosca-figura" onMouseLeave={() => setDestaque(null)}>
        <svg
          viewBox="0 0 180 180"
          role="img"
          aria-label={`${titulo}: ${
            total > 0
              ? itens
                  .map((item) => `${item.rotulo}, ${formatarValor(item.valor)}, ${formatarPct(item.valor / total, 1)}`)
                  .join('; ')
              : vazio
          }`}
        >
          <circle cx="90" cy="90" r={RAIO} fill="none" stroke="var(--k-border)" strokeWidth="20" />
          <g transform="rotate(-90 90 90)">
            {fatias.map((item) => (
              <circle
                key={item.id}
                cx="90"
                cy="90"
                r={RAIO}
                fill="none"
                stroke={item.cor}
                strokeWidth={foco?.id === item.id ? 24 : 20}
                strokeDasharray={`${item.comprimento - item.intervalo} ${CIRCUNFERENCIA - item.comprimento + item.intervalo}`}
                strokeDashoffset={-item.inicio * CIRCUNFERENCIA - item.intervalo / 2}
                opacity={foco && foco.id !== item.id ? 0.25 : 1}
                className="operacao-rosca-fatia"
                onMouseEnter={() => setDestaque(item.id)}
                onClick={() => selecionar(item.id)}
              />
            ))}
          </g>
        </svg>
        <div className={`operacao-rosca-centro${foco ? ' is-active' : ''}`} aria-hidden="true">
          <strong style={foco ? { color: foco.cor } : undefined}>
            {foco ? formatarPct(foco.valor / total, 1) : total > 0 ? totalValor : '—'}
          </strong>
          <span>{foco ? foco.rotulo : totalRotulo}</span>
        </div>
      </div>
      {total > 0 ? (
        <ul className="operacao-rosca-legenda" aria-label={`Legenda de ${titulo}`}>
          {itens.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={item.valor === 0}
                aria-pressed={selecionado === item.id}
                onClick={() => selecionar(item.id)}
                onMouseEnter={() => setDestaque(item.id)}
                onMouseLeave={() => setDestaque(null)}
                onFocus={() => setDestaque(item.id)}
                onBlur={() => setDestaque(null)}
                className={foco?.id === item.id ? 'is-active' : ''}
              >
                <span className="operacao-rosca-chave" style={{ background: item.cor }} aria-hidden />
                <span className="operacao-rosca-item">
                  <span>{item.rotulo}</span>
                  <strong>{formatarValor(item.valor)}</strong>
                </span>
                <span className="operacao-rosca-percentual">{formatarPct(item.valor / total, 1)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="min-h-20 px-2 py-4 text-center text-xs leading-relaxed text-kargo-muted">{vazio}</p>
      )}
    </div>
  )
}
