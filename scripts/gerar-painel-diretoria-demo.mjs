/**
 * Gera src/data/painelDiretoriaDemo.ts a partir do sistema (Gest-o-Frota).
 *
 * O painel da diretoria da landing mostra os números do demo "Horizonte Engenharia" — os mesmos
 * que o painel real calcula com os dados de demonstração (`?apresentacao=horizonte`). Em vez de
 * digitar números, este script roda o próprio construtor do sistema e grava o resultado de cada
 * período que dá para navegar: cada mês desde que o Kargo começou a registrar até o "hoje" do demo,
 * mais o ano.
 *
 * Uso (a partir da pasta da landing):
 *
 *   node --import "file:///<caminho-do-sistema>/scripts/testes/registrar.mjs" \
 *        scripts/gerar-painel-diretoria-demo.mjs "<caminho-do-sistema>"
 *
 * O `--import` registra o resolvedor de imports sem extensão que o sistema usa nos testes.
 * Se o formato do painel mudar, ajuste `painelDiretoriaDemo.types.ts` junto.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const sistema = process.argv[2]
if (!sistema) {
  console.error('Informe o caminho do sistema (Gest-o-Frota) como primeiro argumento.')
  process.exit(1)
}

const utils = pathToFileURL(path.join(path.resolve(sistema), 'src', 'utils') + path.sep).href
const { montarPainelApresentacao, montarPontosDeAtencao, fraseApresentacao, CORES_CUSTO } = await import(
  `${utils}painelApresentacaoCliente.js`
)
const { dadosApresentacaoHorizonte, NOME_EMPRESA_DEMO } = await import(`${utils}painelApresentacaoDemo.js`)
const { modelosCartoesModulos } = await import(`${utils}modulosApresentacao.js`)

// "Agora" do demo: a página do sistema (ClienteInicioPage.jsx) fecha a história em setembro de 2026.
// É ele que limita a navegação (nem outubro nem depois).
const AGORA_DEMO = new Date(2026, 8, 30, 12)
const dadosBase = dadosApresentacaoHorizonte()
const inicioDados = dadosBase.inicioDados // 'AAAA-MM'
const mesFinal = `${AGORA_DEMO.getFullYear()}-${String(AGORA_DEMO.getMonth() + 1).padStart(2, '0')}`

function periodosNavegaveis() {
  const lista = []
  let [ano, mes] = inicioDados.split('-').map(Number)
  const [anoFim, mesFim] = mesFinal.split('-').map(Number)
  while (ano < anoFim || (ano === anoFim && mes <= mesFim)) {
    lista.push({ ano, mes: String(mes).padStart(2, '0') })
    mes += 1
    if (mes > 12) {
      mes = 1
      ano += 1
    }
  }
  const anos = [...new Set(lista.map((p) => p.ano))]
  for (const a of anos) lista.push({ ano: a, mes: 'ANO' })
  return lista
}

function enxugar(p) {
  const pontos = montarPontosDeAtencao(p)
  return {
    rotulo: p.rotulo,
    modoAno: Boolean(p.modoAno),
    emAndamento: Boolean(p.emAndamento),
    contas: {
      receita: p.contas.receita,
      ativosComReceita: p.contas.ativosComReceita,
      custoTotal: p.contas.custoTotal,
      resultadoOperacao: p.contas.resultadoOperacao,
      margemOperacao: p.contas.margemOperacao,
      temReceita: Boolean(p.contas.temReceita),
    },
    comparacao: p.comparacao
      ? {
          rotulo: p.comparacao.rotulo ?? null,
          receita: p.comparacao.receita ?? null,
          custoTotal: p.comparacao.custoTotal ?? null,
          resultadoOperacao: p.comparacao.resultadoOperacao ?? null,
        }
      : null,
    composicao: p.composicao,
    categorias: (p.categorias || []).map((c) => ({
      id: c.id,
      rotulo: c.rotulo,
      ativos: c.ativos,
      receita: c.receita,
      custo: c.custo,
      resultado: c.resultado,
      margem: c.margem,
    })),
    ativos: p.ativos
      ? {
          total: p.ativos.total,
          contagem: p.ativos.contagem,
          alerta: p.ativos.alerta.map((a) => ({
            id: a.id,
            codigo: a.codigo,
            nome: a.nome,
            ativo: a.ativo,
            receita: a.receita,
            custo: a.custo,
            resultado: a.resultado,
            situacao: a.situacao,
          })),
        }
      : null,
    dre: p.dre,
    comparativo: p.comparativo
      ? {
          frase: p.comparativo.frase,
          atual: p.comparativo.atual,
          anterior: p.comparativo.anterior,
          linhas: p.comparativo.linhas,
          tipos: p.comparativo.tipos,
          causas: p.comparativo.causas.map((c) => ({
            id: c.id,
            titulo: c.titulo,
            resumo: c.resumo,
            delta: c.delta,
            pontos: c.pontos,
          })),
          avisos: p.comparativo.avisos || [],
        }
      : null,
    comparativoMotivo: p.comparativoMotivo || null,
    serie: p.serie.map((s) => ({
      mes: s.mes,
      rotulo: s.rotulo,
      rotuloLongo: s.rotuloLongo,
      receita: s.receita,
      combustivel: s.combustivel,
      manutencao: s.manutencao,
      multas: s.multas,
      impostos: s.impostos || 0,
      custo: s.custo,
      resultado: s.resultado,
      selecionado: Boolean(s.selecionado),
      parcial: Boolean(s.parcial),
      implantacao: Boolean(s.implantacao),
    })),
    pontos,
    modelos: modelosCartoesModulos(p).map((m) => ({
      id: m.id,
      destaque: m.destaque,
      legenda: m.legenda,
      estatisticas: m.estatisticas,
      analise: Boolean(m.analise),
      aviso: m.aviso || null,
      vazio: m.vazio || null,
    })),
    frase: fraseApresentacao(p),
    avisos: p.notas?.avisos || [],
    regras: p.notas?.regras || [],
    modulos: p.modulos,
  }
}

const periodos = {}
for (const periodo of periodosNavegaveis()) {
  const painel = montarPainelApresentacao(dadosApresentacaoHorizonte(), periodo, AGORA_DEMO)
  periodos[`${periodo.ano}-${periodo.mes}`] = enxugar(painel)
}

const dados = {
  empresa: NOME_EMPRESA_DEMO,
  inicioDados,
  mesFinal,
  coresCusto: CORES_CUSTO,
  periodos,
}

const cabecalho = `/**
 * Painel da diretoria — números do demo "${NOME_EMPRESA_DEMO}": ${Object.keys(periodos).length} períodos navegáveis.
 *
 * GERADO por scripts/gerar-painel-diretoria-demo.mjs a partir do sistema (src/utils/painelApresentacaoDemo.js
 * → montarPainelApresentacao): não edite à mão. Empresa e valores são fictícios. Para atualizar quando o
 * painel real mudar, veja o README ("Atualizar o painel da diretoria").
 */
import type { PainelDiretoriaDemo } from './painelDiretoriaDemo.types'

export const painelDiretoriaDemo: PainelDiretoriaDemo = `

const destino = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'painelDiretoriaDemo.ts')
fs.writeFileSync(destino, `${cabecalho}${JSON.stringify(dados)}\n`)
console.log(`Gravado: ${destino} — ${Object.keys(periodos).join(', ')}`)
