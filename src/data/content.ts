import type { LucideIcon } from 'lucide-react'
import {
  Fuel,
  Truck,
  FileText,
  Wrench,
  Warehouse,
  Package,
  BarChart3,
  FileSpreadsheet,
  Bell,
  ShieldCheck,
  Users,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Receipt,
  CheckCircle2,
  LayoutDashboard,
  TrendingUp,
  SearchCheck,
  Scale,
  Landmark,
  IdCard,
  ClipboardCheck,
  ListChecks,
  CopyX,
  Building2,
  Tag,
  Fingerprint,
  Filter,
  FileDown,
  Presentation,
  Smartphone,
} from 'lucide-react'

export const navLinks = [
  { label: 'Módulos', href: '/#modules' },
  { label: 'Diretoria', href: '/#diretoria' },
  { label: 'Integração Sienge', href: '/#sienge' },
  // A documentação (/docs) existe, mas não é linkada no site: o link é enviado ao cliente que precisar.
  // Para voltar a exibir: { label: 'Documentação', href: '/docs' } aqui e os dois links no rodapé abaixo.
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/#contact' },
]

export const contact = {
  email: 'supportkargo@gmail.com',
  whatsapp: '+5585997665652',
  phoneDisplay: '(85) 99766-5652',
}

export const footerAboutLinks = [
  { label: 'Como funciona', href: '/#how-it-works' },
  { label: 'Módulos', href: '/#modules' },
  { label: 'Diretoria', href: '/#diretoria' },
  { label: 'Integração Sienge', href: '/#sienge' },
  { label: 'Contato', href: '/#contact' },
]

export const footerSupportLinks = [
  { label: 'Falar no WhatsApp', href: `https://wa.me/${contact.whatsapp}` },
]

// Preencha com as URLs reais quando tiver; links vazios não aparecem no rodapé.
export const socialLinks = [
  { label: 'Instagram', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'YouTube', href: '' },
] as const

export interface ModuleItem {
  icon: LucideIcon
  title: string
  description: string
  /** Caminho do vídeo de demonstração deste módulo (ex.: `/videos/combustivel.mp4`).
   *  Deixe undefined até o vídeo existir — o modal mostra "Vídeo em produção" nesse caso. */
  videoSrc?: string
}

export interface ModuleGroup {
  label: string
  items: ModuleItem[]
}

export const moduleGroups: ModuleGroup[] = [
  {
    label: 'Patrimônio e obras',
    items: [
      {
        icon: Truck,
        title: 'Veículos e equipamentos',
        description: 'Cadastro central com placa, categoria, município e controle de quilometragem e horímetro.',
      },
    ],
  },
  {
    label: 'Operação diária',
    items: [
      {
        icon: FileText,
        title: 'Documentação veicular',
        description:
          'IPVA, licenciamento, CNH e multas — com alerta antes do vencimento, título criado direto no Contas a Pagar do Sienge e pagamento conferido de volta.',
      },
      {
        icon: Fuel,
        title: 'Combustível',
        description:
          'Lançamento por veículo com foto do comprovante, importação em lote e painel financeiro por período.',
      },
      {
        icon: Wrench,
        title: 'Manutenção',
        description:
          'Intervalos por quilometragem ou por hora, ordem de serviço em PDF, baixa de peças na obra correta, título criado no Contas a Pagar do Sienge e boleto marcado como pago quando o financeiro dá baixa.',
      },
      {
        icon: Package,
        title: 'Almoxarifado por obra',
        description: 'Cada obra com o próprio saldo — entradas, saídas, transferências e reservas.',
      },
    ],
  },
  {
    label: 'Visão e controle',
    items: [
      {
        icon: FileSpreadsheet,
        title: 'Relatórios e painéis',
        description:
          'Indicadores de ativos e obras em tempo real, com o custo de cada obra no período e o comparativo com o mês anterior. Cada relatório é exportado em PDF ou Excel com o logotipo da empresa.',
      },
      {
        icon: Bell,
        title: 'Alertas e notificações',
        description:
          'O sistema alerta automaticamente: vencimentos, estoque baixo e divergência de quilometragem.',
      },
      {
        icon: ShieldCheck,
        title: 'Segurança e acesso',
        description:
          'Cada funcionário acessa apenas o que faz sentido para o seu trabalho. Tudo fica registrado.',
      },
    ],
  },
]

export const painPoints: string[] = [
  'Quanto estamos gastando de combustível por veículo por mês?',
  'Qual veículo está com o licenciamento, o IPVA ou a próxima manutenção prestes a vencer?',
  'Quanto material temos em estoque em cada obra agora?',
  'Quem retirou a última peça do almoxarifado e para qual equipamento?',
  'Este motorista está com a CNH em dia?',
]

export interface HowItWorksStep {
  icon: LucideIcon
  title: string
  description: string
}

export const howItWorks: HowItWorksStep[] = [
  {
    icon: Truck,
    title: 'Cadastre sua operação',
    description:
      'Veículos, obras, equipamentos e peças em um cadastro único — sem depender de planilhas espalhadas em vários lugares.',
  },
  {
    icon: Bell,
    title: 'O sistema cruza os dados automaticamente',
    description:
      'Documento perto de vencer, estoque abaixo do mínimo, manutenção atrasada: o Kargo avisa antes que se torne um problema, sem que ninguém precise verificar manualmente.',
  },
  {
    icon: Zap,
    title: 'Decisão na hora, não no fim do mês',
    description:
      'Gasto de combustível, saldo de estoque por obra e status dos ativos disponíveis no painel, com relatórios prontos para exportar quando precisar.',
  },
]

export interface SiengeBenefit {
  icon: LucideIcon
  title: string
  description: string
}

export const siengeBenefits: SiengeBenefit[] = [
  {
    icon: Warehouse,
    title: 'Estoque por obra',
    description:
      'Cada obra tem seu próprio saldo de material — nunca um estoque genérico misturando tudo.',
  },
  {
    icon: RefreshCw,
    title: 'Sincronização nos dois sentidos',
    description:
      'O que muda no Sienge chega ao Kargo, e o que você lança no Kargo segue para o Sienge — sem digitar novamente.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança de dados',
    description:
      'Credenciais da integração Sienge protegidas com criptografia — seus dados sempre seguros entre os dois sistemas.',
  },
  {
    icon: Wrench,
    title: 'Evitando retrabalho',
    description: 'Nenhuma movimentação é lançada duas vezes entre os dois sistemas.',
  },
]

export const contasAPagarPassos: SiengeBenefit[] = [
  {
    icon: Receipt,
    title: 'Crie ou informe o título',
    description:
      'O Kargo cria o título no Sienge a partir do cadastro. Se o financeiro já lançou, é só digitar o número: o Kargo puxa valor, vencimento, parcelas e a guia em PDF.',
  },
  {
    icon: SearchCheck,
    title: 'O Kargo confere sozinho',
    description:
      'Em horário comercial, o Kargo consulta o Sienge e vê quais parcelas o financeiro já deu baixa — sem ninguém abrir o sistema para olhar.',
  },
  {
    icon: CheckCircle2,
    title: 'Parcela marcada como paga',
    description:
      'Quando todas as parcelas do título estão quitadas, a manutenção, a multa ou o ano do IPVA vira pago, com a confirmação do Sienge guardada como prova.',
  },
]

export const contasAPagarOndeAplica: string[] = [
  'Boletos de manutenção',
  'Multas de trânsito',
  'IPVA em até 5 parcelas',
  'Licenciamento',
]

/* ------------------------------------------------------------------ *
 * Criação de título no Sienge (Kargo → Sienge) — showpiece da seção
 * "SiengeTitulos". Tudo aqui é exemplo ilustrativo: nomes, placas,
 * valores e números de título são fictícios, só mostram o formato.
 * ------------------------------------------------------------------ */

export type TituloFonteId = 'manutencao' | 'multa' | 'ipva' | 'licenciamento'

export interface TituloParcelaExemplo {
  vencimento: string
  valor: string
}

export interface TituloExemplo {
  id: TituloFonteId
  label: string
  icon: LucideIcon
  /** Título da janela do Kargo na demonstração. */
  janela: string
  ativo: string
  resumo: string
  /** Como o pagamento aparece no cadastro: boletos, parcelas… */
  pagamento: string
  credor: string
  documento: string
  numero: string
  emissao: string
  obra: string
  plano: string
  /** Número do título que o Sienge devolve. */
  titulo: string
  /** Usuário (fictício) que criou o título no Kargo. */
  usuario: string
  parcelas: TituloParcelaExemplo[]
  total: string
  observacao: string
}

export const tituloExemplos: TituloExemplo[] = [
  {
    id: 'manutencao',
    label: 'Manutenção',
    icon: Wrench,
    janela: 'Manutenção realizada',
    ativo: 'Caminhão basculante · ABC-1D23',
    resumo: 'Troca de pastilhas e discos de freio',
    pagamento: 'Boletos',
    credor: 'Oficina Rota Sul Ltda',
    documento: 'NFSE',
    numero: '4821',
    emissao: '05/11/2026',
    obra: 'Obra Rodovia Norte',
    plano: '2.05.06.05',
    titulo: '26104',
    usuario: 'marina.souza',
    parcelas: [
      { vencimento: '20/11/2026', valor: 'R$ 1.620,00' },
      { vencimento: '20/12/2026', valor: 'R$ 1.620,00' },
      { vencimento: '20/01/2027', valor: 'R$ 1.620,00' },
    ],
    total: 'R$ 4.860,00',
    observacao: 'Kargo — Troca de pastilhas e discos de freio · Caminhão basculante ABC-1D23',
  },
  {
    id: 'multa',
    label: 'Multas',
    icon: Scale,
    janela: 'Multa de trânsito',
    ativo: 'Pickup L200 · DEF-4G56',
    resumo: 'Velocidade até 20% acima · infração 74550',
    pagamento: 'Parcelas',
    credor: 'DETRAN',
    documento: 'REC',
    numero: '74550',
    emissao: '20/11/2026',
    obra: 'Obra Rodovia Norte',
    plano: '2.05.06.05',
    titulo: '26105',
    usuario: 'juliana.reis',
    parcelas: [{ vencimento: '20/11/2026', valor: 'R$ 130,16' }],
    total: 'R$ 130,16',
    observacao: 'Kargo — Multa · DEF4G56 · 74550 · R$ 130,16 · Velocidade até 20% · Carlos M.',
  },
  {
    id: 'ipva',
    label: 'IPVA',
    icon: Landmark,
    janela: 'IPVA 2027',
    ativo: 'Caminhonete Hilux · GHI-7J89',
    resumo: 'Exercício 2027 · pago em 5 parcelas',
    pagamento: 'Parcelas',
    credor: 'Secretaria da Fazenda',
    documento: 'REC',
    numero: 'GHI7J892027',
    emissao: '15/01/2027',
    obra: 'Obra Rodovia Norte',
    plano: '2.05.06.05',
    titulo: '26106',
    usuario: 'carlos.mendes',
    parcelas: [
      { vencimento: '15/01/2027', valor: 'R$ 1.248,00' },
      { vencimento: '15/02/2027', valor: 'R$ 1.248,00' },
      { vencimento: '15/03/2027', valor: 'R$ 1.248,00' },
      { vencimento: '15/04/2027', valor: 'R$ 1.248,00' },
      { vencimento: '15/05/2027', valor: 'R$ 1.248,00' },
    ],
    total: 'R$ 6.240,00',
    observacao: 'Kargo — IPVA do ativo Caminhonete Hilux — GHI-7J89 2027',
  },
  {
    id: 'licenciamento',
    label: 'Licenciamento',
    icon: IdCard,
    janela: 'Licenciamento 2027',
    ativo: 'Caminhão toco · JKL-0M12',
    resumo: 'Licenciamento anual · exercício 2027',
    pagamento: 'Parcelas',
    credor: 'DETRAN',
    documento: 'REC',
    numero: 'JKL0M122027',
    emissao: '30/11/2026',
    obra: 'Obra Rodovia Norte',
    plano: '2.05.06.05',
    titulo: '26107',
    usuario: 'marina.souza',
    parcelas: [{ vencimento: '30/11/2026', valor: 'R$ 172,20' }],
    total: 'R$ 172,20',
    observacao: 'Kargo — LICENCIAMENTO do ativo Caminhão toco — JKL-0M12 2027',
  },
]

export interface TituloEtapa {
  titulo: string
  descricao: string
}

export const tituloEtapas: TituloEtapa[] = [
  {
    titulo: 'Cadastre',
    descricao:
      'Lance a manutenção, a multa, o IPVA ou o licenciamento como já faz hoje e deixe ligado “Criar título ao salvar”.',
  },
  {
    titulo: 'Confira',
    descricao:
      'O Kargo monta o título com credor, documento, plano financeiro e obra — e mostra exatamente o que vai ser lançado.',
  },
  {
    titulo: 'Título criado',
    descricao:
      'Um clique e o título entra no Contas a Pagar do Sienge, com cada parcela igual à do Kargo e ligada ao boleto de origem.',
  },
  {
    titulo: 'Baixa de volta',
    descricao:
      'O financeiro dá a baixa no Sienge e o Kargo marca como pago sozinho, guardando a confirmação como prova.',
  },
]

export interface TituloGarantia {
  icon: LucideIcon
  title: string
  description: string
}

export const tituloGarantias: TituloGarantia[] = [
  {
    icon: ClipboardCheck,
    title: 'Prévia antes de enviar',
    description:
      'Uma tela de conferência mostra empresa, credor, documento, parcelas, plano financeiro e obra. Só envia depois do “Conferi os dados”.',
  },
  {
    icon: ListChecks,
    title: 'Parcela por parcela',
    description:
      'Cada boleto vira uma parcela do título, com o mesmo valor e o mesmo vencimento — inclusive quando os centavos mudam de uma parcela para outra.',
  },
  {
    icon: CopyX,
    title: 'Sem título duplicado',
    description:
      'Registro que já tem título não gera outro, e um título igual já lançado no Sienge é barrado. Clique duplo também não passa.',
  },
  {
    icon: Building2,
    title: 'Obra, plano e credor do jeito do Sienge',
    description:
      'Busca de credor que perdoa erro de digitação, plano financeiro com a máscara do Sienge e apropriação de obra dentro do título, para ele não nascer incompleto.',
  },
  {
    icon: Tag,
    title: 'Origem identificada',
    description:
      'A observação de todo título criado pelo Kargo começa com “Kargo —”: o financeiro sabe de onde ele veio.',
  },
  {
    icon: Fingerprint,
    title: 'Quem criou, e quando',
    description:
      'Cada título guarda o usuário que o criou e a data. O nome aparece nos relatórios de Manutenção, Multas, IPVA e Licenciamento.',
  },
]

export interface HistoricoAtributo {
  icon: LucideIcon
  texto: string
}

export const historicoAtributos: HistoricoAtributo[] = [
  { icon: Filter, texto: 'Filtro por módulo e por sentido da integração' },
  { icon: BarChart3, texto: 'Dashboard de análise com os números do período' },
  { icon: FileDown, texto: 'Exportação em PDF e em Excel' },
  { icon: Fingerprint, texto: 'Usuário de cada ação — título criado ou baixa confirmada' },
]

export interface HistoricoLinhaExemplo {
  modulo: string
  icon: LucideIcon
  titulo: string
  quando: string
  sentido: 'kargo-sienge' | 'sienge-kargo'
  /** Rótulo do status — vazio quando não se aplica. */
  status?: string
  paga?: boolean
  usuario: string
}

export const historicoLinhasExemplo: HistoricoLinhaExemplo[] = [
  {
    modulo: 'Manutenção',
    icon: Wrench,
    titulo: 'Título 26104 criado no Sienge',
    quando: 'há 2 min',
    sentido: 'kargo-sienge',
    status: 'Enviado',
    usuario: 'marina.souza',
  },
  {
    modulo: 'IPVA',
    icon: Landmark,
    titulo: 'Título 26106 criado — IPVA 2027 em 5 parcelas',
    quando: 'há 18 min',
    sentido: 'kargo-sienge',
    status: 'Enviado',
    usuario: 'carlos.mendes',
  },
  {
    modulo: 'Multas',
    icon: Scale,
    titulo: 'Multa DEF-4G56 · baixa confirmada',
    quando: 'há 1 h',
    sentido: 'sienge-kargo',
    paga: true,
    usuario: 'Sienge (automático)',
  },
  {
    modulo: 'Licenciamento',
    icon: IdCard,
    titulo: 'Título 26107 criado — Licenciamento 2027',
    quando: 'ontem',
    sentido: 'kargo-sienge',
    status: 'Enviado',
    usuario: 'marina.souza',
  },
]

/** Eventos por módulo no período do dashboard de exemplo. */
export const historicoBarrasExemplo: { label: string; valor: number }[] = [
  { label: 'Almoxarifado', valor: 48 },
  { label: 'Manutenção', valor: 21 },
  { label: 'Ativos', valor: 17 },
  { label: 'IPVA', valor: 14 },
  { label: 'Multas', valor: 9 },
  { label: 'Licenciamento', valor: 6 },
]

export interface DiretoriaItem {
  icon: LucideIcon
  title: string
  description: string
}

export const diretoriaItens: DiretoriaItem[] = [
  {
    icon: LayoutDashboard,
    title: 'Sabe o que olhar primeiro',
    description:
      'Ao abrir, o painel já aponta o que pede atenção: custo que subiu, margem apertada, ativo que custa mais do que rende. Sem caçar número em módulo nenhum.',
  },
  {
    icon: TrendingUp,
    title: 'Entende o porquê, não só o quanto',
    description:
      'Cada variação vem com a causa e o número que a sustenta: litros ou preço, quais ativos, o que foi pago. Acabou o “subiu, mas não sei por quê”.',
  },
  {
    icon: Presentation,
    title: 'Leva para a reunião em um clique',
    description:
      'O botão Apresentar abre os mesmos números em slides, em tela cheia. Também baixa em PDF, em PowerPoint editável e em Excel.',
  },
  {
    icon: RefreshCw,
    title: 'Sem planilha e sem relatório manual',
    description:
      'O painel se monta sozinho com o que o time já lança: combustível, manutenção, multas, IPVA e pagamentos confirmados no Sienge.',
  },
  {
    icon: ShieldCheck,
    title: 'Só de consulta, e cada um vê o seu',
    description:
      'A diretoria acompanha sem alterar nada, e cada pessoa vê apenas os módulos liberados para ela.',
  },
  {
    icon: Smartphone,
    title: 'No escritório ou na obra, em qualquer dispositivo',
    description:
      'O mesmo painel abre no computador, no tablet e em dispositivos móveis — o número certo na mão de quem decide, onde estiver.',
  },
]

export interface SiengeFlowStep {
  icon: LucideIcon
  direction: string
  label: string
  description: string
}

export const siengeFlow: SiengeFlowStep[] = [
  {
    icon: Download,
    direction: 'Sienge → Kargo',
    label: 'Leitura sob demanda',
    description:
      'Quando alguém atualiza a posição de estoque, o Kargo busca no Sienge o saldo mais recente daquela obra.',
  },
  {
    icon: Upload,
    direction: 'Kargo → Sienge',
    label: 'Envio automático',
    description:
      'Toda entrada, saída ou transferência lançada na tela de Almoxarifado do Kargo já é enviada automaticamente para o Sienge.',
  },
]

export interface Profile {
  icon: LucideIcon
  title: string
  description: string
  level: string
}

export const profiles: Profile[] = [
  {
    icon: Users,
    title: 'Operadores',
    level: 'por módulo',
    description:
      'Cada funcionário enxerga apenas as áreas liberadas para ele — nada além do necessário.',
  },
  {
    icon: LayoutDashboard,
    title: 'Diretoria',
    level: 'painel operacional',
    description:
      'Painel próprio, só de consulta: quanto a operação gastou, o que mudou em relação ao mês anterior e por quê — sem precisar entrar em cada módulo.',
  },
]

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    icon: Wrench,
    title: 'Evitando retrabalho',
    description:
      'A mesma informação não precisa ser digitada duas vezes em dois sistemas diferentes.',
  },
  {
    icon: Bell,
    title: 'Menos surpresas',
    description:
      'Vencimentos, estoque baixo e manutenção atrasada alertam antes que se tornem um problema.',
  },
  {
    icon: BarChart3,
    title: 'Tomada de decisões mais rápidas',
    description: 'Números de gasto, estoque e ativos disponíveis na hora — não no fim do mês.',
  },
  {
    icon: Smartphone,
    title: 'Seus ativos na palma da mão',
    description:
      'Abre direto no navegador do dispositivo móvel, sem baixar aplicativo, e pode ficar como ícone na tela inicial.',
  },
  {
    icon: Warehouse,
    title: 'Gestão de consulta',
    description:
      'Nada fica misturado em um único estoque. Cada obra tem a própria história no sistema.',
  },
]
