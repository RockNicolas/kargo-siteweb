import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, CodeXml } from 'lucide-react'

import { OQueEOKargo } from './manual/OQueEOKargo'
import { PrimeiroAcesso } from './manual/PrimeiroAcesso'
import { PerfisDeAcesso } from './manual/PerfisDeAcesso'
import { ManualPatrimonio } from './manual/Patrimonio'
import { ManualDocumentacao } from './manual/Documentacao'
import { ManualCombustivel } from './manual/Combustivel'
import { ManualManutencao } from './manual/Manutencao'
import { ManualAlmoxarifado } from './manual/Almoxarifado'
import { ManualRelatorios } from './manual/Relatorios'
import { ManualAlertas } from './manual/Alertas'
import { ManualContasAPagar } from './manual/ContasAPagar'
import { ManualPainelDaDiretoria } from './manual/PainelDaDiretoria'
import { SiengeVisaoGeral } from './manual/SiengeVisaoGeral'
import { SiengeComoConectar } from './manual/SiengeComoConectar'
import { PerguntasFrequentes } from './manual/PerguntasFrequentes'
import { Suporte } from './manual/Suporte'

import { ApiIntroducao } from './api/Introducao'
import { ApiAutenticacao } from './api/Autenticacao'
import { ApiLimitesErros } from './api/LimitesErros'
import { ApiPatrimonio } from './api/Patrimonio'
import { ApiDocumentacao } from './api/Documentacao'
import { ApiCombustivel } from './api/Combustivel'
import { ApiManutencao } from './api/Manutencao'
import { ApiAlmoxarifado } from './api/Almoxarifado'
import { ApiWebhooks } from './api/Webhooks'

export type DocAreaId = 'manual' | 'api'

export interface DocArticle {
  area: DocAreaId
  slug: string
  titulo: string
  /** Frase de abertura do artigo — também aparece nos cards e na busca. */
  resumo: string
  /** Termos extras pra busca (sinônimos que a pessoa pode digitar). */
  palavras?: string[]
  Component: ComponentType
}

export interface DocGroup {
  titulo: string
  artigos: DocArticle[]
}

export interface DocArea {
  id: DocAreaId
  titulo: string
  tituloCurto: string
  descricao: string
  icon: LucideIcon
  grupos: DocGroup[]
}

function artigos(area: DocAreaId, lista: Omit<DocArticle, 'area'>[]): DocArticle[] {
  return lista.map((a) => ({ ...a, area }))
}

const manual: DocArea = {
  id: 'manual',
  titulo: 'Manual do usuário',
  tituloCurto: 'Manual',
  descricao:
    'Como usar cada tela do Kargo no dia a dia: cadastros, lançamentos, relatórios, alertas e a integração com o Sienge.',
  icon: BookOpen,
  grupos: [
    {
      titulo: 'Começando',
      artigos: artigos('manual', [
        {
          slug: 'o-que-e-o-kargo',
          titulo: 'O que é o Kargo',
          resumo:
            'Um painel único para frota e obras: patrimônio, documentação, combustível, manutenção e almoxarifado, integrado ao Sienge.',
          palavras: ['visão geral', 'módulos', 'introdução'],
          Component: OQueEOKargo,
        },
        {
          slug: 'primeiro-acesso',
          titulo: 'Primeiro acesso',
          resumo: 'O endereço da sua empresa, como entrar, trocar o tema e o que fazer se esquecer a senha.',
          palavras: ['login', 'entrar', 'senha', 'endereço', 'tema escuro', 'celular'],
          Component: PrimeiroAcesso,
        },
        {
          slug: 'perfis-de-acesso',
          titulo: 'Perfis de acesso',
          resumo:
            'Administrador, Operador e Diretoria — o que cada um vê e pode fazer, e como liberar módulos por usuário.',
          palavras: ['usuário', 'permissão', 'administrador', 'operador', 'diretoria', 'cliente', 'módulos', 'histórico'],
          Component: PerfisDeAcesso,
        },
      ]),
    },
    {
      titulo: 'Módulos',
      artigos: artigos('manual', [
        {
          slug: 'patrimonio',
          titulo: 'Patrimônio',
          resumo:
            'Cadastro de ativos (veículos, máquinas e equipamentos), controle de entrada e saída, movimentação e contratos.',
          palavras: ['ativos', 'veículos', 'frota', 'placa', 'quilometragem', 'horímetro', 'contrato', 'movimentação'],
          Component: ManualPatrimonio,
        },
        {
          slug: 'documentacao',
          titulo: 'Documentação',
          resumo: 'IPVA, licenciamento, seguro, CNH e multas — tudo com alerta antes de vencer.',
          palavras: ['ipva', 'licenciamento', 'cnh', 'multas', 'crlv', 'seguro', 'vencimento', 'motoristas'],
          Component: ManualDocumentacao,
        },
        {
          slug: 'combustivel',
          titulo: 'Combustível',
          resumo: 'Lançamento de abastecimentos com comprovante, cadastro semanal e mensal e tipos de combustível.',
          palavras: ['abastecimento', 'diesel', 'gasolina', 'litros', 'pix', 'comprovante'],
          Component: ManualCombustivel,
        },
        {
          slug: 'manutencao',
          titulo: 'Manutenção',
          resumo:
            'Preventiva por quilometragem ou horas, manutenções realizadas com ordem de serviço e controle de gastos.',
          palavras: ['preventiva', 'corretiva', 'ordem de serviço', 'peças', 'boleto', 'gastos'],
          Component: ManualManutencao,
        },
        {
          slug: 'almoxarifado',
          titulo: 'Almoxarifado por obra',
          resumo:
            'Estoque separado por obra: insumos, entradas, saídas, transferências, reservas e carga inicial.',
          palavras: ['estoque', 'insumos', 'peças', 'obras', 'transferência', 'reserva', 'inicialização', 'planilha'],
          Component: ManualAlmoxarifado,
        },
        {
          slug: 'relatorios',
          titulo: 'Relatórios e painéis',
          resumo: 'Relatórios por módulo, gastos gerais, custo de cada obra no período e comparativo de contrato — em PDF ou Excel.',
          palavras: ['pdf', 'excel', 'exportar', 'dashboard', 'gastos gerais', 'obra'],
          Component: ManualRelatorios,
        },
        {
          slug: 'painel-da-diretoria',
          titulo: 'Painel da diretoria',
          resumo:
            'Painel operacional só de consulta: gasto do período, comparação com o mês anterior e a causa de cada variação.',
          palavras: ['diretoria', 'painel operacional', 'cliente', 'comparativo', 'mês contra mês', 'custos', 'lucro', 'dre', 'causas'],
          Component: ManualPainelDaDiretoria,
        },
        {
          slug: 'alertas',
          titulo: 'Alertas e notificações',
          resumo: 'O que o Kargo avisa sozinho e como escolher quais alertas aparecem para você.',
          palavras: ['notificações', 'sininho', 'vencimento', 'estoque baixo', 'ruptura'],
          Component: ManualAlertas,
        },
      ]),
    },
    {
      titulo: 'Integração Sienge',
      artigos: artigos('manual', [
        {
          slug: 'sienge-visao-geral',
          titulo: 'Como funciona a integração',
          resumo:
            'O que o Kargo troca com o Sienge: estoque das obras, localização dos ativos e pagamento de manutenções, multas e IPVA.',
          palavras: ['sienge', 'sincronização', 'webhook', 'estoque', 'contas a pagar', 'ativos'],
          Component: SiengeVisaoGeral,
        },
        {
          slug: 'contas-a-pagar',
          titulo: 'Contas a Pagar pelo Sienge',
          resumo:
            'Como o Kargo confirma o pagamento de manutenções, multas, IPVA e licenciamento a partir do título do Sienge.',
          palavras: ['contas a pagar', 'título', 'boleto', 'parcela', 'baixa', 'pago', 'multa', 'ipva', 'licenciamento', 'financeiro'],
          Component: ManualContasAPagar,
        },
        {
          slug: 'sienge-como-conectar',
          titulo: 'Conectar ao Sienge',
          resumo:
            'Passo a passo para ligar a integração: liberações do usuário de API, credencial, plano, obras, tipos de movimento e automático.',
          palavras: [
            'sienge',
            'credencial',
            'plano',
            'configurar',
            'centro de custo',
            'tipo de movimento',
            'liberação',
            'permissão',
            'usuário de api',
            'autorizações',
            'webhook',
            'inventory_movement',
          ],
          Component: SiengeComoConectar,
        },
      ]),
    },
    {
      titulo: 'Ajuda',
      artigos: artigos('manual', [
        {
          slug: 'perguntas-frequentes',
          titulo: 'Perguntas frequentes',
          resumo: 'Respostas rápidas para as dúvidas mais comuns de quem está começando.',
          palavras: ['faq', 'dúvidas'],
          Component: PerguntasFrequentes,
        },
        {
          slug: 'suporte',
          titulo: 'Suporte',
          resumo: 'Como falar com a equipe do Kargo por WhatsApp ou e-mail, direto do painel.',
          palavras: ['ajuda', 'contato', 'whatsapp', 'email', 'feedback'],
          Component: Suporte,
        },
      ]),
    },
  ],
}

const api: DocArea = {
  id: 'api',
  titulo: 'Referência da API',
  tituloCurto: 'API',
  descricao:
    'Para equipes de TI e integradores: autenticação, limites, formato de resposta e os endpoints de leitura de cada módulo.',
  icon: CodeXml,
  grupos: [
    {
      titulo: 'Primeiros passos',
      artigos: artigos('api', [
        {
          slug: 'introducao',
          titulo: 'Introdução',
          resumo: 'O que a API do Kargo oferece, como pedir acesso e as convenções usadas em todas as rotas.',
          palavras: ['base url', 'rest', 'json', 'empresa'],
          Component: ApiIntroducao,
        },
        {
          slug: 'autenticacao',
          titulo: 'Autenticação',
          resumo: 'Como obter o token de acesso e enviá-lo em cada chamada.',
          palavras: ['login', 'token', 'bearer', 'jwt', 'x-kargo-empresa'],
          Component: ApiAutenticacao,
        },
        {
          slug: 'limites-e-erros',
          titulo: 'Limites e erros',
          resumo: 'Quantas requisições por minuto, o que acontece ao passar do limite e o formato dos erros.',
          palavras: ['rate limit', '429', 'retry-after', 'status', 'erro'],
          Component: ApiLimitesErros,
        },
      ]),
    },
    {
      titulo: 'Endpoints',
      artigos: artigos('api', [
        {
          slug: 'patrimonio',
          titulo: 'Patrimônio',
          resumo: 'Consulta de ativos (veículos, máquinas e equipamentos).',
          palavras: ['veiculos', 'ativos', 'frota'],
          Component: ApiPatrimonio,
        },
        {
          slug: 'documentacao',
          titulo: 'Documentação',
          resumo: 'Documentos dos ativos, resumo de vencimentos, multas e motoristas.',
          palavras: ['documentos', 'multas', 'motoristas', 'cnh', 'ipva'],
          Component: ApiDocumentacao,
        },
        {
          slug: 'combustivel',
          titulo: 'Combustível',
          resumo: 'Lançamentos de abastecimento e tipos de combustível.',
          palavras: ['registros', 'abastecimento', 'tipos'],
          Component: ApiCombustivel,
        },
        {
          slug: 'manutencao',
          titulo: 'Manutenção',
          resumo: 'Manutenções realizadas e gastos de manutenção por período.',
          palavras: ['manutencoes-realizadas', 'gastos'],
          Component: ApiManutencao,
        },
        {
          slug: 'almoxarifado',
          titulo: 'Almoxarifado',
          resumo: 'Obras, saldo de estoque por obra, movimentações e reservas.',
          palavras: ['obras', 'saldos', 'estoque', 'movimentacoes', 'reservas'],
          Component: ApiAlmoxarifado,
        },
      ]),
    },
    {
      titulo: 'Integrações',
      artigos: artigos('api', [
        {
          slug: 'webhooks',
          titulo: 'Webhooks',
          resumo: 'Como o Kargo recebe avisos do Sienge em tempo real.',
          palavras: ['webhook', 'sienge', 'eventos', 'tempo real'],
          Component: ApiWebhooks,
        },
      ]),
    },
  ],
}

export const DOC_AREAS: DocArea[] = [manual, api]

export function areaPorId(id: string | undefined): DocArea | undefined {
  return DOC_AREAS.find((a) => a.id === id)
}

export function artigosDaArea(area: DocArea): DocArticle[] {
  return area.grupos.flatMap((g) => g.artigos)
}

export const TODOS_ARTIGOS: DocArticle[] = DOC_AREAS.flatMap(artigosDaArea)

export function caminhoDoArtigo(a: Pick<DocArticle, 'area' | 'slug'>) {
  return `/docs/${a.area}/${a.slug}`
}

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

/** Busca simples por título, resumo e palavras-chave — todas as palavras digitadas precisam bater. */
export function buscarArtigos(consulta: string): DocArticle[] {
  const termos = normalizar(consulta).split(/\s+/).filter(Boolean)
  if (termos.length === 0) return []
  return TODOS_ARTIGOS.map((a) => {
    const titulo = normalizar(a.titulo)
    const resto = normalizar([a.resumo, ...(a.palavras ?? [])].join(' '))
    let pontos = 0
    for (const t of termos) {
      if (titulo.includes(t)) pontos += 3
      else if (resto.includes(t)) pontos += 1
      else return { a, pontos: 0 }
    }
    return { a, pontos }
  })
    .filter((r) => r.pontos > 0)
    .sort((x, y) => y.pontos - x.pontos)
    .map((r) => r.a)
}
