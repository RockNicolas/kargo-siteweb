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
} from 'lucide-react'

export const navLinks = [
  { label: 'Módulos', href: '/#modules' },
  { label: 'Diretoria', href: '/#diretoria' },
  { label: 'Integração Sienge', href: '/#sienge' },
  { label: 'Documentação', href: '/docs' },
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
  { label: 'Manual do usuário', href: '/docs/manual/o-que-e-o-kargo' },
  { label: 'Referência da API', href: '/docs/api/introducao' },
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
          'IPVA, licenciamento, CNH e multas — com alerta antes do vencimento e pagamento conferido no Contas a Pagar do Sienge.',
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
          'Intervalos por quilometragem ou por hora, ordem de serviço em PDF, baixa de peças na obra correta e boleto marcado como pago quando o Sienge dá baixa.',
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
          'Indicadores de frota e obras em tempo real, com o custo de cada obra no período e o comparativo com o mês anterior. Cada relatório é exportado em PDF ou Excel com o logotipo da empresa.',
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
      'Gasto de combustível, saldo de estoque por obra e status da frota disponíveis no painel, com relatórios prontos para exportar quando precisar.',
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
    title: 'Informe o título',
    description:
      'Na manutenção, na multa ou no IPVA, digite o número do título do Sienge. O Kargo puxa valor, vencimento, parcelas e a guia em PDF.',
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

export interface DiretoriaItem {
  icon: LucideIcon
  title: string
  description: string
}

export const diretoriaItens: DiretoriaItem[] = [
  {
    icon: LayoutDashboard,
    title: 'Pontos de atenção primeiro',
    description:
      'Ao abrir, o painel mostra primeiro o que pede atenção: custo que subiu, margem apertada, ativo que custa mais do que rende.',
  },
  {
    icon: TrendingUp,
    title: 'Mês contra mês, com a causa',
    description:
      'Não basta saber que o gasto subiu: o painel mostra de onde veio a diferença — litros ou preço, quais ativos, o que foi pago.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Cada área em poucos números',
    description:
      'Combustível, manutenção, multas e IPVA resumidos em cartões. Quem quiser aprofundar abre a análise do módulo.',
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
    description: 'Números de gasto, estoque e frota disponíveis na hora — não no fim do mês.',
  },
  {
    icon: Warehouse,
    title: 'Gestão de consulta',
    description:
      'Nada fica misturado em um único estoque. Cada obra tem a própria história no sistema.',
  },
]
