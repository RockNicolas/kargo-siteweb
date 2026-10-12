import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Info,
  Layers,
  Minus,
  Moon,
  Percent,
  Presentation,
  Sun,
  TrendingDown,
  Wallet,
} from 'lucide-react'
import './painel-diretoria.css'
import { painelDiretoriaDemo } from '../../data/painelDiretoriaDemo'
import type {
  CustoId,
  DemoAtivoAlerta,
  DemoLinhaComparativa,
  DemoModulo,
  DemoPonto,
  PainelPeriodo,
} from '../../data/painelDiretoriaDemo.types'
import { useIsDark } from '../../hooks/useIsDark'
import { Apresentacao } from './Apresentacao'
import { Cartao, Rotulo, Secao } from './blocos'
import { GraficoDistribuicao, GraficoRosca } from './distribuicao'
import { GraficoMensal, MapaMensal } from './evolucao'
import type { CoresPainel } from './evolucao'
import { formatarInteiro, formatarMoeda, formatarMoedaCompacta, formatarPct, maiuscula } from './formatos'
import { MODULO_ICONE } from './modulos'
import {
  chaveDoPeriodo,
  definirModoPeriodo,
  deslocarPeriodo,
  limitesPeriodo,
  periodoInicial,
  rotuloPeriodo,
} from './periodo'
import type { Periodo } from './periodo'

type Tema = 'dark' | 'light'

const CORES_CATEGORIA: Record<string, string> = { maquina: '#f59e0b', pesado: '#60a5fa', leve: '#a78bfa', equipamento: '#2dd4bf' }
const CORES_CATEGORIA_CLARO: Record<string, string> = { maquina: '#b45309', pesado: '#2563eb', leve: '#7c3aed', equipamento: '#0f766e' }

function useCoresPainel(isDark: boolean): CoresPainel {
  return useMemo(
    () => ({
      isDark,
      custo: isDark ? painelDiretoriaDemo.coresCusto.escuro : painelDiretoriaDemo.coresCusto.claro,
      tinta: isDark ? '#e2e8f0' : '#1e293b',
      tintaSuave: isDark ? '#a0aec0' : '#64748b',
      grade: isDark ? '#2f3139' : '#e2e8f0',
      superficie: isDark ? '#24252d' : '#ffffff',
      apagado: isDark ? '#4a5060' : '#cbd5e1',
      destaque: '#ed8936',
      bom: '#0ca30c',
      ruim: '#d03b3b',
      alerta: '#fab219',
    }),
    [isDark],
  )
}

/* ------------------------------------------------------------------ Cabeçalho */

function classeModo(ativo: boolean) {
  return `inline-flex min-h-9 items-center rounded-lg px-3.5 text-xs font-black uppercase tracking-wide transition ${
    ativo ? 'bg-kargo-cta text-white shadow-lg shadow-kargo-cta/25' : 'text-kargo-muted hover:text-kargo-text'
  }`
}

function Cabecalho({
  periodo,
  onMudar,
  onApresentar,
  tema,
  onAlternarTema,
}: {
  periodo: Periodo
  onMudar: (p: Periodo) => void
  onApresentar: () => void
  tema: Tema
  onAlternarTema: () => void
}) {
  const [menuAberto, setMenuAberto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const inicio = painelDiretoriaDemo.inicioDados

  // Fecha o menu do usuário ao clicar fora ou com Esc.
  useEffect(() => {
    if (!menuAberto) return undefined
    const aoClicar = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuAberto(false)
    }
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAberto(false)
    }
    document.addEventListener('mousedown', aoClicar)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicar)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [menuAberto])
  const modoAno = periodo.mes === 'ANO'
  const { podeVoltar, podeAvancar } = limitesPeriodo(periodo, inicio)

  return (
    <header className="operacao-header z-30 border-b border-kargo-border bg-kargo-sidebar/95 backdrop-blur">
      <div className="operacao-header-content w-full">
        <div className="operacao-marca">
          <img src={tema === 'dark' ? '/Kargo.png' : '/Kargo-light.png'} alt="Kargo" className="operacao-logo" />
          <span className="operacao-marca-divisor" aria-hidden />
          <div className="min-w-0 leading-tight">
            <p className="operacao-titulo text-kargo-text">Painel da diretoria</p>
            <p className="truncate text-[11px] font-semibold text-kargo-muted">{painelDiretoriaDemo.empresa}</p>
          </div>
        </div>

        <div className="operacao-controles">
          <div className="operacao-periodo">
            <div
              className="operacao-periodo-modo inline-flex rounded-xl border border-kargo-border bg-kargo-bg-deep/50 p-1"
              role="group"
              aria-label="Recorte"
            >
              <button
                type="button"
                className={classeModo(!modoAno)}
                aria-pressed={!modoAno}
                onClick={() => onMudar(definirModoPeriodo(periodo, 'mes'))}
              >
                Mês
              </button>
              <button
                type="button"
                className={classeModo(modoAno)}
                aria-pressed={modoAno}
                onClick={() => onMudar(definirModoPeriodo(periodo, 'ano'))}
              >
                Ano
              </button>
            </div>
            <div className="operacao-periodo-seletor inline-flex items-center rounded-xl border border-kargo-border bg-kargo-sidebar">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-l-xl text-kargo-text transition hover:bg-kargo-bg-deep/50 disabled:opacity-30 @3xl:size-10"
                aria-label="Período anterior"
                disabled={!podeVoltar}
                onClick={() => onMudar(deslocarPeriodo(periodo, -1, inicio))}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="operacao-periodo-rotulo text-center text-sm font-bold text-kargo-text" aria-live="polite">
                {rotuloPeriodo(periodo)}
              </span>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-r-xl text-kargo-text transition hover:bg-kargo-bg-deep/50 disabled:opacity-30 @3xl:size-10"
                aria-label="Próximo período"
                disabled={!podeAvancar}
                onClick={() => onMudar(deslocarPeriodo(periodo, 1, inicio))}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={onApresentar}
            className="hidden min-h-11 shrink-0 items-center gap-2 rounded-lg border border-kargo-cta/50 bg-kargo-cta/10 px-3 text-xs font-bold text-kargo-cta transition hover:bg-kargo-cta hover:text-white @3xl:inline-flex"
          >
            <Presentation size={14} aria-hidden />
            Apresentar
          </button>
        </div>

        <div className="operacao-usuario flex items-center gap-2">
          <button
            type="button"
            onClick={onAlternarTema}
            aria-label={tema === 'dark' ? 'Mudar o painel para tema claro' : 'Mudar o painel para tema escuro'}
            className="hidden size-11 items-center justify-center rounded-full border border-kargo-border bg-kargo-bg text-kargo-muted transition hover:border-kargo-cta hover:text-kargo-cta @3xl:inline-flex"
          >
            {tema === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuAberto((v) => !v)}
              aria-expanded={menuAberto}
              aria-haspopup="true"
              aria-label="Usuário"
              className="inline-flex size-11 items-center justify-center rounded-full border border-kargo-cta/60 bg-kargo-bg text-xs font-black text-kargo-cta transition hover:bg-kargo-cta/10"
            >
              D
            </button>
            {menuAberto ? (
              <div
                role="status"
                className="absolute right-0 top-full z-40 mt-2 w-64 rounded-xl border border-kargo-border bg-kargo-elevated p-4 text-left shadow-2xl"
              >
                <p className="text-sm font-black text-kargo-text">Diretoria</p>
                <p className="mt-0.5 text-xs text-kargo-muted">{painelDiretoriaDemo.empresa}</p>
                <p className="mt-3 text-xs leading-relaxed text-kargo-muted">
                  Perfil de consulta: a diretoria vê os números e as análises, sem alterar nada, e só os módulos
                  liberados para ela.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ Visão geral */

function Indicador({
  icone: Icone,
  rotulo,
  valor,
  detalhe,
  tom,
}: {
  icone: LucideIcon
  rotulo: string
  valor: string
  detalhe: string
  tom?: 'positivo' | 'negativo'
}) {
  return (
    <Cartao className={`operacao-indicador ${tom ? `operacao-indicador-${tom}` : ''}`}>
      <div>
        <span>{rotulo}</span>
        <Icone size={17} aria-hidden />
      </div>
      <strong className="operacao-valor-destaque">{valor}</strong>
      <p>{detalhe}</p>
    </Cartao>
  )
}

function CabecalhoGrafico({ numero, titulo, subtitulo }: { numero: string; titulo: string; subtitulo: string }) {
  return (
    <header className="operacao-grafico-header">
      <span className="operacao-grafico-numero" aria-hidden>
        {numero}
      </span>
      <div>
        <h3>{titulo}</h3>
        <p>{subtitulo}</p>
      </div>
    </header>
  )
}

function OpcoesGrafico<T extends string>({
  rotulo,
  opcoes,
  valor,
  onChange,
}: {
  rotulo: string
  opcoes: [T, string][]
  valor: T
  onChange: (v: T) => void
}) {
  return (
    <div className="operacao-grafico-opcoes" role="group" aria-label={rotulo}>
      {opcoes.map(([id, texto]) => (
        <button key={id} type="button" aria-pressed={valor === id} onClick={() => onChange(id)}>
          {texto}
        </button>
      ))}
    </div>
  )
}

function VisaoGeral({ painel, cores }: { painel: PainelPeriodo; cores: CoresPainel }) {
  const [tipoGastos, setTipoGastos] = useState<'barras' | 'rosca'>('barras')
  const [medida, setMedida] = useState<'receita' | 'custo'>('receita')
  const { contas, composicao, categorias, ativos, serie } = painel

  const dadosGastos = composicao.map((c) => ({ id: c.id, rotulo: c.rotulo, valor: c.valor, cor: cores.custo[c.id] }))
  const paleta = cores.isDark ? CORES_CATEGORIA : CORES_CATEGORIA_CLARO
  const dadosCategoria = categorias.map((c) => ({
    id: c.id,
    rotulo: c.rotulo,
    valor: medida === 'receita' ? c.receita : c.custo,
    cor: paleta[c.id] || '#64748b',
  }))
  const totalCategorias = dadosCategoria.reduce((soma, d) => soma + d.valor, 0)
  const contagem = ativos?.contagem
  const dadosAtivos = contagem
    ? [
        { id: 'saudavel', rotulo: 'Com folga', valor: contagem.saudavel, cor: cores.isDark ? '#34d399' : '#059669' },
        { id: 'atencao', rotulo: 'Perto do limite', valor: contagem.atencao, cor: cores.isDark ? '#fbbf24' : '#b45309' },
        { id: 'prejuizo', rotulo: 'No prejuízo', valor: contagem.prejuizo, cor: cores.isDark ? '#fb7185' : '#e11d48' },
        { id: 'semReceita', rotulo: 'Custo sem receita', valor: contagem.semReceita, cor: cores.isDark ? '#a78bfa' : '#7c3aed' },
      ]
    : []
  const negativo = contas.resultadoOperacao < 0

  return (
    <div className="operacao-visao-geral">
      {painel.emAndamento ? (
        <p className="text-xs leading-relaxed text-kargo-muted">Período em andamento: valores apurados até hoje.</p>
      ) : null}
      <div className="operacao-indicadores">
        {contas.temReceita ? (
          <Indicador
            icone={ArrowUpRight}
            rotulo="Receita dos contratos"
            valor={formatarMoedaCompacta(contas.receita)}
            detalhe={`${formatarInteiro(contas.ativosComReceita)} ativos geraram receita`}
          />
        ) : null}
        <Indicador
          icone={ArrowDownLeft}
          rotulo="Custo da operação"
          valor={formatarMoedaCompacta(contas.custoTotal)}
          detalhe="Gastos registrados no período"
        />
        {contas.temReceita ? (
          <>
            <Indicador
              icone={Wallet}
              rotulo="Resultado da operação"
              valor={formatarMoedaCompacta(contas.resultadoOperacao)}
              detalhe="Receita menos todos os custos"
              tom={negativo ? 'negativo' : 'positivo'}
            />
            <Indicador
              icone={Percent}
              rotulo={negativo ? 'Déficit da operação' : 'Margem da operação'}
              valor={formatarPct(Math.abs(contas.margemOperacao), 1)}
              detalhe={negativo ? 'Prejuízo em relação à receita' : 'Parcela da receita que sobra'}
              tom={negativo ? 'negativo' : 'positivo'}
            />
          </>
        ) : null}
      </div>

      <div className="operacao-graficos-grid">
        <Cartao className="operacao-grafico-cartao">
          <CabecalhoGrafico numero="01" titulo="Para onde vai o dinheiro" subtitulo="Participação de cada tipo no custo total" />
          <OpcoesGrafico
            rotulo="Formato dos gastos"
            opcoes={[
              ['barras', 'Barras'],
              ['rosca', 'Rosca'],
            ]}
            valor={tipoGastos}
            onChange={setTipoGastos}
          />
          {tipoGastos === 'rosca' ? (
            <GraficoRosca
              titulo="Composição dos gastos"
              dados={dadosGastos}
              formatarValor={formatarMoeda}
              totalValor={formatarMoedaCompacta(contas.custoTotal)}
              totalRotulo="em gastos"
              vazio="Nenhum gasto registrado neste período."
            />
          ) : (
            <GraficoDistribuicao
              tipo="barras"
              titulo="Composição dos gastos"
              dados={dadosGastos}
              formatarValor={formatarMoeda}
              totalValor={formatarMoedaCompacta(contas.custoTotal)}
              totalRotulo="em gastos"
              vazio="Nenhum gasto registrado neste período."
            />
          )}
          <p className="operacao-grafico-nota">Os valores refletem os lançamentos disponíveis no Kargo.</p>
        </Cartao>

        {categorias.length ? (
          <Cartao className="operacao-grafico-cartao">
            <CabecalhoGrafico
              numero="02"
              titulo="Peso de cada categoria"
              subtitulo={
                medida === 'receita'
                  ? 'Participação na receita dos contratos'
                  : 'Participação nos custos vinculados aos ativos'
              }
            />
            <OpcoesGrafico
              rotulo="Medida por categoria"
              opcoes={[
                ['receita', 'Receita'],
                ['custo', 'Custos'],
              ]}
              valor={medida}
              onChange={setMedida}
            />
            <GraficoDistribuicao
              key={medida}
              tipo="mosaico"
              titulo={medida === 'receita' ? 'Receita por categoria' : 'Custos por categoria'}
              dados={dadosCategoria}
              formatarValor={formatarMoeda}
              totalValor={formatarMoedaCompacta(totalCategorias)}
              totalRotulo={medida === 'receita' ? 'em receita' : 'em custos'}
              vazio="Nenhum valor registrado nas categorias neste período."
            />
            <p className="operacao-grafico-nota">
              {medida === 'custo'
                ? 'IPVA e licenciamento não têm categoria e ficam na composição geral dos gastos.'
                : 'A área de cada bloco corresponde à participação na receita. Selecione para destacar.'}
            </p>
          </Cartao>
        ) : null}

        {ativos ? (
          <Cartao className="operacao-grafico-cartao">
            <CabecalhoGrafico numero="03" titulo="Equilíbrio dos ativos" subtitulo="Situação financeira dos ativos com contrato" />
            <div className="operacao-grafico-etiqueta">
              <Layers size={13} aria-hidden /> Receita × custo por ativo
            </div>
            <GraficoDistribuicao
              tipo="faixa"
              titulo="Situação dos ativos"
              dados={dadosAtivos}
              formatarValor={(valor) => `${formatarInteiro(valor)} ${valor === 1 ? 'ativo' : 'ativos'}`}
              totalValor={formatarInteiro(ativos.total)}
              totalRotulo="ativos analisados"
              vazio="Nenhum ativo com contrato e movimentação neste período."
            />
            <p className="operacao-grafico-nota">
              Considera receita, manutenção e multas dos ativos com movimentação no período. Perto do limite: custo a
              partir de 80% da receita.
            </p>
          </Cartao>
        ) : null}
      </div>

      {serie.length > 0 ? (
        <div className="operacao-visao-evolucao">
          <GraficoMensal serie={serie} cores={cores} />
          <MapaMensal serie={serie} cores={cores} />
        </div>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ Prioridades */

const TOM_PONTO = {
  risco: { rotulo: 'Risco', classe: 'border-red-500/40 bg-red-500/10 text-red-400', Icone: AlertTriangle },
  atencao: { rotulo: 'Atenção', classe: 'border-amber-500/40 bg-amber-500/10 text-amber-400', Icone: AlertTriangle },
  bom: { rotulo: 'Bom', classe: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400', Icone: Check },
} as const

/** Onde o clique leva: o bloco da tela de onde o número saiu (igual ao sistema). */
function destinoDoPonto(id: string) {
  if (/^(manutencao|docs|multas|estoque)/.test(id)) return 'demo-modulos'
  if (/^(custo|receita)/.test(id)) return 'demo-comparativo'
  return 'demo-custos-lucros'
}

function Pontos({ pontos, irPara }: { pontos: DemoPonto[]; irPara: (id: string) => void }) {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const visiveis = mostrarTodos ? pontos : pontos.slice(0, 3)
  return (
    <div>
      <div id="demo-lista-pontos" className="operacao-pontos-grid">
        {visiveis.map((ponto) => {
          const tom = TOM_PONTO[ponto.nivel] || TOM_PONTO.atencao
          const Icone = tom.Icone
          return (
            <button
              key={ponto.id}
              type="button"
              onClick={() => irPara(destinoDoPonto(ponto.id))}
              className="flex min-w-0 flex-col rounded-2xl border border-kargo-border bg-kargo-sidebar p-4 text-left transition hover:border-kargo-cta/50"
            >
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${tom.classe}`}
              >
                <Icone size={12} aria-hidden />
                {tom.rotulo}
              </span>
              <span className="mt-3 text-base font-black leading-snug text-kargo-text">{ponto.titulo}</span>
              <span className="mt-1.5 text-sm leading-relaxed text-kargo-muted">{ponto.texto}</span>
              <span className="operacao-ponto-acao inline-flex items-center gap-1 text-[11px] font-bold text-kargo-cta">
                Ver na tela
                <ChevronRight size={13} aria-hidden />
              </span>
            </button>
          )
        })}
      </div>
      {pontos.length > 3 ? (
        <button
          type="button"
          className="operacao-expandir mt-3"
          aria-expanded={mostrarTodos}
          aria-controls="demo-lista-pontos"
          onClick={() => setMostrarTodos(!mostrarTodos)}
        >
          {mostrarTodos ? 'Mostrar só os 3 primeiros' : `Ver mais ${pontos.length - 3} pontos`}
          <ChevronDown size={16} className={mostrarTodos ? 'rotate-180' : ''} aria-hidden />
        </button>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ Custos e resultados */

function Dre({ painel, cores }: { painel: PainelPeriodo; cores: CoresPainel }) {
  const { dre } = painel
  return (
    <Cartao className="h-full">
      <Rotulo icone={FileSpreadsheet}>Em reais, {painel.rotulo}</Rotulo>
      <ul className="mt-4 divide-y divide-kargo-border/60 [&>li:last-child]:border-b-0">
        {dre.linhas.map((linha) => {
          const ehTotal = linha.tipo === 'total'
          const ehResultado = ehTotal && linha.id !== 'custoTotal'
          const negativo = linha.valor < 0
          const valor = `${linha.tipo === 'custo' || negativo ? '−' : ''}${formatarMoeda(Math.abs(linha.valor))}`
          let corValor = 'text-kargo-text'
          if (ehResultado) corValor = negativo ? 'text-red-400' : 'text-emerald-400'
          return (
            <li
              key={linha.id}
              className={`operacao-dre-linha ${ehTotal ? 'operacao-dre-total mt-2 border-t-2 border-kargo-text/25 pt-5' : 'py-3.5'}`}
            >
              <span
                className={`flex min-w-0 items-center gap-2.5 text-kargo-text ${
                  ehTotal ? 'text-sm font-black uppercase tracking-wide' : linha.tipo === 'receita' ? 'font-bold' : ''
                }`}
              >
                {linha.tipo === 'custo' && linha.cor ? (
                  <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: cores.custo[linha.cor] }} aria-hidden />
                ) : null}
                <span className="break-words">{linha.rotulo}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className={`block tabular-nums ${ehTotal ? 'text-2xl font-black' : 'text-base font-bold'} ${corValor}`}>
                  {valor}
                </span>
                {ehResultado && linha.pct != null ? (
                  <span className="block text-xs font-bold tabular-nums text-kargo-muted">
                    {negativo ? 'déficit' : 'margem'} de {formatarPct(Math.abs(linha.pct))}
                  </span>
                ) : null}
              </span>
            </li>
          )
        })}
      </ul>
      {dre.faltando.length ? (
        <p className="mt-5 text-xs leading-relaxed text-kargo-muted">
          Este acesso não inclui {dre.faltando.join(', ')}; o que está de fora não entra na conta.
        </p>
      ) : null}
    </Cartao>
  )
}

function CategoriasResultado({ categorias }: { categorias: PainelPeriodo['categorias'] }) {
  return (
    <Cartao className="h-full">
      <Rotulo icone={Layers}>Resultado por categoria</Rotulo>
      <ul className="mt-4 divide-y divide-kargo-border/60">
        {categorias.map((c) => {
          const negativo = c.resultado < 0
          return (
            <li key={c.id} className="operacao-categoria">
              <div className="operacao-categoria-nome min-w-0">
                <p className="font-bold text-kargo-text">{c.rotulo}</p>
                <p className="text-xs text-kargo-muted">
                  {c.ativos} {c.ativos === 1 ? 'ativo' : 'ativos'}
                </p>
              </div>
              <div className="operacao-categoria-receita text-right">
                <p className="text-[10px] uppercase tracking-wider text-kargo-muted">Receita</p>
                <p className="text-sm font-bold tabular-nums text-kargo-text">{formatarMoeda(c.receita)}</p>
              </div>
              <div className="operacao-categoria-custo text-right">
                <p className="text-[10px] uppercase tracking-wider text-kargo-muted">Custos</p>
                <p className="text-sm font-bold tabular-nums text-kargo-text">{formatarMoeda(c.custo)}</p>
              </div>
              <span className="operacao-categoria-resultado block text-right">
                <span className={`block text-base font-black tabular-nums ${negativo ? 'text-red-400' : 'text-emerald-400'}`}>
                  {negativo ? '−' : ''}
                  {formatarMoeda(Math.abs(c.resultado))}
                </span>
                {c.margem != null ? (
                  <span className="block text-xs font-bold tabular-nums text-kargo-muted">
                    {negativo ? 'déficit' : 'margem'} de {formatarPct(Math.abs(c.margem))}
                  </span>
                ) : null}
              </span>
            </li>
          )
        })}
      </ul>
    </Cartao>
  )
}

const SITUACAO_ATIVO = {
  prejuizo: { rotulo: 'Prejuízo', classe: 'text-red-400', Icone: TrendingDown },
  semReceita: { rotulo: 'Custo sem receita', classe: 'text-red-400', Icone: AlertTriangle },
  atencao: { rotulo: 'Perto do limite', classe: 'text-amber-400', Icone: AlertTriangle },
} as const

function LinhaAtivo({ ativo }: { ativo: DemoAtivoAlerta }) {
  const s = SITUACAO_ATIVO[ativo.situacao] || SITUACAO_ATIVO.atencao
  const Icone = s.Icone
  return (
    <li className="py-4">
      <div className="operacao-ativo-linha flex items-start justify-between gap-4">
        <p className="line-clamp-2 min-w-0 font-bold leading-snug text-kargo-text" title={ativo.nome}>
          <span className="mr-1.5 text-kargo-muted">#{ativo.codigo}</span>
          {ativo.nome}
          {!ativo.ativo ? <span className="ml-2 text-[10px] font-bold uppercase text-kargo-muted">desativado</span> : null}
        </p>
        <p className={`shrink-0 text-base font-black tabular-nums ${ativo.resultado >= 0 ? 'text-kargo-text' : 'text-red-400'}`}>
          {ativo.resultado < 0 ? '−' : ''}
          {formatarMoeda(Math.abs(ativo.resultado))}
        </p>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-kargo-muted">
        <span className={`inline-flex items-center gap-1 font-bold ${s.classe}`}>
          <Icone size={13} aria-hidden />
          {s.rotulo}
        </span>
        <span>
          receita {formatarMoeda(ativo.receita)} · custo {formatarMoeda(ativo.custo)}
        </span>
      </p>
    </li>
  )
}

function AtivosAtencao({ ativos }: { ativos: NonNullable<PainelPeriodo['ativos']> }) {
  const [aberta, setAberta] = useState(false)
  if (ativos.total === 0) return null
  const itens = aberta ? ativos.alerta : ativos.alerta.slice(0, 3)
  const resto = ativos.alerta.length - 3
  return (
    <Cartao className="h-full">
      <div className="flex items-center justify-between gap-3">
        <Rotulo icone={AlertTriangle}>Ativos que pedem atenção</Rotulo>
        {ativos.alerta.length ? (
          <span className="rounded-full bg-kargo-bg-deep/60 px-2.5 py-0.5 text-xs font-black tabular-nums text-kargo-text">
            {ativos.alerta.length}
          </span>
        ) : null}
      </div>
      {itens.length ? (
        <>
          <ul className="mt-3 divide-y divide-kargo-border/60">
            {itens.map((a) => (
              <LinhaAtivo key={a.id} ativo={a} />
            ))}
          </ul>
          {resto > 0 ? (
            <button
              type="button"
              onClick={() => setAberta((v) => !v)}
              className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-kargo-border px-4 text-xs font-bold text-kargo-text transition hover:border-kargo-cta/60 hover:text-kargo-cta"
            >
              {aberta ? 'Mostrar menos' : `Ver os outros ${resto}`}
            </button>
          ) : null}
        </>
      ) : (
        <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-kargo-muted">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
          Nenhum ativo com contrato fechou o período no prejuízo ou perto do limite.
        </p>
      )}
    </Cartao>
  )
}

/* ------------------------------------------------------------------ Comparativo e causas */

function moedaSinal(valor: number) {
  return `${valor < 0 ? '−' : '+'}${formatarMoeda(Math.abs(valor))}`
}

/** Custo subindo é ruim; receita e resultado subindo é bom. Sempre com seta e sinal. */
function tomDoDelta(delta: number, subirEhBom: boolean) {
  if (Math.abs(delta) < 0.005) return 'neutro' as const
  return delta > 0 === subirEhBom ? ('bom' as const) : ('ruim' as const)
}

const CLASSE_TOM = {
  bom: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  ruim: 'border-red-500/40 bg-red-500/10 text-red-400',
  neutro: 'border-kargo-border bg-kargo-bg-deep/40 text-kargo-muted',
} as const

function SeloDelta({ linha }: { linha: DemoLinhaComparativa }) {
  const tom = tomDoDelta(linha.delta, linha.subirEhBom)
  const Icone = tom === 'neutro' ? Minus : linha.delta > 0 ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={`operacao-selo-delta inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-black tabular-nums ${CLASSE_TOM[tom]}`}
    >
      <Icone size={16} aria-hidden />
      {tom === 'neutro' ? 'igual' : moedaSinal(linha.delta)}
      {linha.pct != null && tom !== 'neutro' ? (
        <span className="font-bold opacity-80">({formatarPct(Math.abs(linha.pct))})</span>
      ) : null}
    </span>
  )
}

function BarraValor({
  rotulo,
  valor,
  max,
  cor,
  forte = false,
}: {
  rotulo: string
  valor: number
  max: number
  cor: string
  forte?: boolean
}) {
  const largura = max > 0 ? Math.min(Math.abs(valor) / max, 1) * 100 : 0
  return (
    <div>
      <div className="operacao-barra-valor text-sm">
        <span className={forte ? 'font-bold text-kargo-text' : 'text-kargo-muted'}>{rotulo}</span>
        <span className={`tabular-nums ${forte ? 'font-black text-kargo-text' : 'font-bold text-kargo-muted'}`}>
          {valor < 0 ? '−' : ''}
          {formatarMoeda(Math.abs(valor))}
        </span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-kargo-bg-deep/60" aria-hidden>
        <div className="h-full rounded-full" style={{ width: `${Math.max(largura, valor ? 1.5 : 0)}%`, backgroundColor: cor }} />
      </div>
    </div>
  )
}

function CartaoLinha({
  linha,
  atual,
  anterior,
  cores,
  corTipo,
}: {
  linha: DemoLinhaComparativa
  atual: string
  anterior: string
  cores: CoresPainel
  corTipo?: string
}) {
  const max = Math.max(Math.abs(linha.atual), Math.abs(linha.anterior))
  const tom = tomDoDelta(linha.delta, linha.subirEhBom)
  const corAtual = tom === 'bom' ? cores.bom : tom === 'ruim' ? cores.ruim : cores.tintaSuave
  return (
    <Cartao className="flex h-full flex-col">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kargo-muted">
        {corTipo ? <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: corTipo }} aria-hidden /> : null}
        {linha.rotulo}
      </p>
      <p className="operacao-valor-destaque mt-4 font-black tracking-tight text-kargo-text">
        {linha.atual < 0 ? '−' : ''}
        {formatarMoeda(Math.abs(linha.atual))}
      </p>
      <div className="mt-4">
        <SeloDelta linha={linha} />
      </div>
      <div className="mt-8 space-y-4">
        <BarraValor rotulo={maiuscula(anterior)} valor={linha.anterior} max={max} cor={cores.apagado} />
        <BarraValor rotulo={maiuscula(atual)} valor={linha.atual} max={max} cor={corAtual} forte />
      </div>
    </Cartao>
  )
}

function ResumoSemComparacao({ painel }: { painel: PainelPeriodo }) {
  const itens = [
    { rotulo: 'Gasto total', valor: painel.contas.custoTotal },
    ...painel.composicao.filter((p) => p.valor > 0).map((p) => ({ rotulo: p.rotulo, valor: p.valor })),
  ]
  return (
    <div className="space-y-6">
      {painel.comparativoMotivo ? (
        <p className="max-w-3xl text-base leading-relaxed text-kargo-muted">{painel.comparativoMotivo}</p>
      ) : null}
      <div className="operacao-comparativo-grid">
        {itens.map((i) => (
          <Cartao key={i.rotulo}>
            <Rotulo>{i.rotulo}</Rotulo>
            <p className="operacao-valor-destaque mt-4 font-black tracking-tight text-kargo-text">{formatarMoeda(i.valor)}</p>
          </Cartao>
        ))}
      </div>
    </div>
  )
}

function Comparativo({ painel, cores }: { painel: PainelPeriodo; cores: CoresPainel }) {
  const c = painel.comparativo
  if (!c) return <ResumoSemComparacao painel={painel} />
  return (
    <div className="space-y-6 @3xl:space-y-8">
      <p className="max-w-4xl text-lg font-medium leading-relaxed text-kargo-text @3xl:text-2xl @3xl:leading-relaxed">
        {c.frase}
      </p>
      <div className="operacao-comparativo-grid">
        <CartaoLinha linha={c.linhas[0]} atual={c.atual} anterior={c.anterior} cores={cores} />
        {c.tipos.map((t) => (
          <CartaoLinha
            key={t.id}
            linha={t}
            atual={c.atual}
            anterior={c.anterior}
            cores={cores}
            corTipo={cores.custo[t.id as CustoId]}
          />
        ))}
      </div>
      {c.avisos.length ? (
        <ul className="space-y-2">
          {c.avisos.map((aviso) => (
            <li key={aviso} className="flex items-start gap-2.5 text-sm leading-relaxed text-amber-400">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
              <span>{aviso}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Causas({ painel, cores }: { painel: PainelPeriodo; cores: CoresPainel }) {
  const causas = painel.comparativo?.causas || []
  if (!causas.length) return null
  return (
    <div className={`grid grid-cols-1 gap-5 @3xl:gap-6 ${causas.length > 1 ? '@5xl:grid-cols-2' : ''}`}>
      {causas.map((k) => {
        const sobe = k.delta >= 0
        const bom = !sobe
        return (
          <Cartao key={k.id} className="flex flex-col">
            <div className="flex flex-wrap items-start gap-3.5">
              <span className="mt-1.5 size-3 shrink-0 rounded-sm" style={{ backgroundColor: cores.custo[k.id] }} aria-hidden />
              <div className="min-w-0">
                <h3 className="text-xl font-black leading-tight text-kargo-text @3xl:text-2xl">{k.titulo}</h3>
                <p className="mt-1 text-sm text-kargo-muted">{k.resumo}</p>
              </div>
              <span
                className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-black ${bom ? CLASSE_TOM.bom : CLASSE_TOM.ruim}`}
              >
                {sobe ? <ArrowUpRight size={14} aria-hidden /> : <ArrowDownRight size={14} aria-hidden />}
                {bom ? 'a favor' : 'contra'}
              </span>
            </div>
            <ul className="mt-6 space-y-4 border-t border-kargo-border/60 pt-6">
              {k.pontos.map((ponto) => (
                <li key={ponto} className="flex gap-3 text-[15px] leading-relaxed text-kargo-text">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-kargo-cta" aria-hidden />
                  <span>{ponto}</span>
                </li>
              ))}
            </ul>
          </Cartao>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ Áreas da operação */

function CartaoModulo({ modulo }: { modulo: DemoModulo }) {
  const { icone: Icone, nome } = MODULO_ICONE[modulo.id]
  return (
    <Cartao className="flex h-full w-full flex-col">
      <div className="flex flex-col items-start gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex shrink-0 rounded-xl bg-kargo-cta/15 p-2.5 text-kargo-cta">
            <Icone size={20} strokeWidth={2.25} aria-hidden />
          </span>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-kargo-cta">{nome}</p>
        </div>
      </div>
      <div className="mt-7">
        <p className="operacao-valor-destaque font-black tracking-tight text-kargo-text">{modulo.destaque}</p>
        <p className="mt-2 text-sm text-kargo-muted">{modulo.legenda}</p>
      </div>
      {modulo.vazio ? <p className="mt-6 text-sm leading-relaxed text-kargo-muted">{modulo.vazio}</p> : null}
      {!modulo.vazio && modulo.estatisticas.length ? (
        <dl className="operacao-modulo-estatisticas mt-7 border-t border-kargo-border/60 pt-6">
          {modulo.estatisticas.map((e) => (
            <div key={e.rotulo} className="min-w-0">
              <dt className="text-[10px] font-bold uppercase leading-tight tracking-wider text-kargo-muted">{e.rotulo}</dt>
              <dd className="mt-1.5 break-words text-lg font-black leading-tight text-kargo-text">{e.valor}</dd>
              {e.detalhe ? <p className="mt-0.5 text-[11px] leading-snug text-kargo-muted">{e.detalhe}</p> : null}
            </div>
          ))}
        </dl>
      ) : null}
      {modulo.aviso ? (
        <p className="mt-auto flex items-start gap-2 pt-6 text-sm leading-snug text-amber-400">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
          <span>{modulo.aviso}</span>
        </p>
      ) : null}
    </Cartao>
  )
}

function Modulos({ modelos }: { modelos: DemoModulo[] }) {
  if (!modelos.length) return null
  // Em duas colunas, um cartão sozinho na última linha ocupa a linha inteira.
  const sobraUm = modelos.length % 2 === 1
  return (
    <div className="grid grid-cols-1 gap-5 @3xl:grid-cols-2 @3xl:gap-6 @7xl:grid-cols-3">
      {modelos.map((modulo, i) => (
        <div
          key={modulo.id}
          className={`flex ${sobraUm && i === modelos.length - 1 ? '@3xl:col-span-2 @7xl:col-span-1' : ''}`}
        >
          <CartaoModulo modulo={modulo} />
        </div>
      ))}
    </div>
  )
}

function Notas({ painel }: { painel: PainelPeriodo }) {
  const { regras, avisos } = painel
  if (!regras.length && !avisos.length) return null
  return (
    <details className="operacao-notas group rounded-3xl border border-kargo-border bg-kargo-sidebar/70 px-5 py-4 @3xl:px-7 @3xl:py-5">
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-kargo-text [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2.5">
          <Info size={17} className="text-kargo-cta" aria-hidden />
          Como ler estes números
          {avisos.length ? (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-black text-amber-400">
              {avisos.length} {avisos.length === 1 ? 'aviso' : 'avisos'}
            </span>
          ) : null}
        </span>
        <ChevronDown size={18} className="text-kargo-muted transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-6 space-y-8 text-sm leading-relaxed text-kargo-muted">
        {avisos.length ? (
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-kargo-text">Avisos</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-amber-400">
              {avisos.map((aviso) => (
                <li key={aviso}>{aviso}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {regras.length ? (
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-kargo-text">Regras de cálculo</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-kargo-cta">
              {regras.map((regra) => (
                <li key={regra}>{regra}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </details>
  )
}

/* ------------------------------------------------------------------ Janela */

/**
 * Réplica do Painel da diretoria do sistema, com os números do demo "Horizonte Engenharia".
 * Os blocos, textos, cálculos, cores e controles são os do painel real — Mês/Ano, mês anterior e
 * próximo, Apresentar e tema funcionam; só não há dados de cliente nem as janelas de "Análise".
 */
export function PainelDiretoriaDemo() {
  // O painel tem tema próprio: começa igual ao do site, e a lua do painel troca só o painel.
  const temaSite: Tema = useIsDark() ? 'dark' : 'light'
  const [temaLocal, setTemaLocal] = useState<Tema | null>(null)
  const tema: Tema = temaLocal ?? temaSite
  const cores = useCoresPainel(tema === 'dark')
  const rolagemRef = useRef<HTMLDivElement>(null)
  const cabecalhoRef = useRef<HTMLDivElement>(null)
  const [rolou, setRolou] = useState(false)
  const [periodo, setPeriodo] = useState<Periodo>(periodoInicial)
  const [apresentando, setApresentando] = useState(false)

  const chave = chaveDoPeriodo(periodo)
  const painel = painelDiretoriaDemo.periodos[chave] ?? painelDiretoriaDemo.periodos[chaveDoPeriodo(periodoInicial())]

  const irPara = (id: string) => {
    const caixa = rolagemRef.current
    const alvo = document.getElementById(id)
    if (!caixa || !alvo) return
    const topoCabecalho = cabecalhoRef.current?.getBoundingClientRect().height ?? 0
    const delta = alvo.getBoundingClientRect().top - caixa.getBoundingClientRect().top
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    caixa.scrollTo({ top: caixa.scrollTop + delta - topoCabecalho - 16, behavior: reduzido ? 'auto' : 'smooth' })
  }

  const temCustosELucros = painel.serie.length > 0
  const temCategoriasOuAtivos = painel.categorias.length > 0 || Boolean(painel.ativos && painel.ativos.total > 0)
  const temAlerta = painel.pontos.some((p) => p.nivel !== 'bom')
  const temCausas = Boolean(painel.comparativo?.causas.length)

  const atalhos = [
    ['demo-visao-geral', 'Visão geral'],
    painel.pontos.length ? ['demo-pontos', 'Prioridades'] : null,
    temCustosELucros ? ['demo-custos-lucros', 'Custos e resultados'] : null,
    ['demo-comparativo', 'Comparativo'],
    temCausas ? ['demo-causas', 'Causas'] : null,
    painel.modelos.length ? ['demo-modulos', 'Áreas da operação'] : null,
  ].filter((a): a is string[] => Boolean(a))

  return (
    <div className={`kargo-shell ${tema === 'dark' ? 'painel-tema-escuro' : 'painel-tema-claro'} relative overflow-hidden rounded-2xl border border-kargo-border bg-kargo-bg text-kargo-text shadow-2xl shadow-asphalt-950/20 dark:shadow-black/50`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-kargo-cta/30 bg-kargo-cta/10 px-4 py-2.5 sm:px-5">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-kargo-cta px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
          Painel real
        </span>
        <p className="min-w-0 flex-1 text-xs font-semibold leading-snug text-kargo-text sm:text-[13px]">
          É assim que a sua diretoria vai ver a operação — aberto com os dados de uma empresa de demonstração.{' '}
          <span className="font-medium text-kargo-muted">Troque o mês, role e clique: tudo funciona.</span>
        </p>
      </div>
      <div
        ref={rolagemRef}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop > 24) setRolou(true)
        }}
        className="painel-diretoria-demo h-[560px] overflow-y-auto overflow-x-hidden bg-kargo-bg sm:h-[640px] lg:h-[760px]"
        tabIndex={0}
        aria-label="Painel da diretoria de demonstração — role para ver todas as seções"
      >
        <div ref={cabecalhoRef} className="sticky top-0 z-30">
          <Cabecalho
            periodo={periodo}
            onMudar={setPeriodo}
            onApresentar={() => setApresentando(true)}
            tema={tema}
            onAlternarTema={() => setTemaLocal(tema === 'dark' ? 'light' : 'dark')}
          />
        </div>

        <div className="operacao-conteudo mx-auto w-full max-w-[1800px]">
          <div key={chave} className="operacao-secoes">
            <nav className="operacao-atalhos" aria-label="Seções do painel da diretoria">
              {atalhos.map(([id, rotulo]) => (
                <button key={id} type="button" onClick={() => irPara(id)}>
                  {rotulo}
                </button>
              ))}
            </nav>

            <Secao id="demo-visao-geral" eyebrow={painel.rotulo} titulo="Toda a operação em uma visão">
              <VisaoGeral painel={painel} cores={cores} />
            </Secao>

            {painel.pontos.length ? (
              <Secao
                id="demo-pontos"
                eyebrow={temAlerta ? 'O que olhar primeiro' : 'O que está bem'}
                titulo={temAlerta ? 'Pontos de atenção' : 'A operação está folgada'}
              >
                <Pontos pontos={painel.pontos} irPara={irPara} />
              </Secao>
            ) : null}

            {temCustosELucros ? (
              <Secao id="demo-custos-lucros" eyebrow="Custos e lucros" titulo="De onde vem e para onde vai o dinheiro">
                <div className="space-y-5 @3xl:space-y-6">
                  <Dre painel={painel} cores={cores} />
                  {temCategoriasOuAtivos ? (
                    <div className="operacao-detalhes-grid">
                      <div className="min-w-0">{painel.categorias.length ? <CategoriasResultado categorias={painel.categorias} /> : null}</div>
                      <div className="min-w-0">{painel.ativos ? <AtivosAtencao ativos={painel.ativos} /> : null}</div>
                    </div>
                  ) : null}
                </div>
              </Secao>
            ) : null}

            <Secao
              id="demo-comparativo"
              eyebrow={
                painel.comparativo ? (painel.modoAno ? 'Ano contra ano' : 'Mês contra mês') : painel.rotulo
              }
              titulo={
                painel.comparativo
                  ? `${maiuscula(painel.comparativo.atual)} contra ${painel.comparativo.anterior}`
                  : 'Como a operação fechou'
              }
            >
              <Comparativo painel={painel} cores={cores} />
            </Secao>

            {temCausas ? (
              <Secao id="demo-causas" eyebrow="Análise das causas" titulo="Por que mudou">
                <Causas painel={painel} cores={cores} />
              </Secao>
            ) : null}

            <Secao id="demo-modulos" eyebrow="Módulo a módulo" titulo="Cada área em poucos números">
              <Modulos modelos={painel.modelos} />
            </Secao>

            <Notas painel={painel} />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-kargo-bg via-kargo-bg/80 to-transparent pb-4 transition-opacity duration-500 ${
          rolou ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-kargo-cta/50 bg-kargo-sidebar px-4 py-1.5 text-xs font-bold text-kargo-cta shadow-lg">
          Role dentro do painel para ver tudo
          <ChevronDown size={14} className="animate-bounce" />
        </span>
      </div>

      {apresentando ? (
        <Apresentacao
          painel={painel}
          cores={cores}
          tema={tema}
          empresa={painelDiretoriaDemo.empresa}
          onFechar={() => setApresentando(false)}
        />
      ) : null}
    </div>
  )
}
