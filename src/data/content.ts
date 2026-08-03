import type { LucideIcon } from 'lucide-react'
import {
  Fuel,
  Truck,
  FileText,
  Wrench,
  Warehouse,
  BarChart3,
  Bell,
  ShieldCheck,
  Users,
  Eye,
  Zap,
  RefreshCw,
  Download,
  Upload,
} from 'lucide-react'

export const navLinks = [
  { label: 'Módulos', href: '/#modules' },
  { label: 'Integração Sienge', href: '/#sienge' },
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
        description: 'IPVA, licenciamento, CNH e multas — com alerta antes do vencimento.',
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
          'Intervalos por quilometragem ou por hora, ordem de serviço em PDF e baixa de peças na obra correta.',
      },
      {
        icon: Warehouse,
        title: 'Almoxarifado por obra',
        description: 'Cada obra com o próprio saldo — entradas, saídas, transferências e reservas.',
      },
    ],
  },
  {
    label: 'Visão e controle',
    items: [
      {
        icon: BarChart3,
        title: 'Relatórios e painéis',
        description:
          'Indicadores de frota e obras em tempo real. Filtre por período, veículo ou obra e acompanhe tudo em um único painel. Cada relatório é exportado em PDF ou Excel com o logotipo da empresa.',
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
    title: 'Nenhum lançamento se perde',
    description:
      'Se a sincronização falhar por instabilidade, o lançamento continua salvo no Kargo e fica sinalizado para revisão.',
  },
  {
    icon: Wrench,
    title: 'Menos retrabalho',
    description: 'Nenhuma movimentação é lançada duas vezes entre os dois sistemas.',
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
    icon: Eye,
    title: 'Cliente',
    level: 'visualização',
    description:
      'Portal simplificado para que quem contrata o serviço possa acompanhar os próprios dados.',
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
    title: 'Menos retrabalho',
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
    title: 'Decisão mais rápida',
    description: 'Números de gasto, estoque e frota disponíveis na hora — não no fim do mês.',
  },
  {
    icon: Warehouse,
    title: 'Controle real por obra',
    description:
      'Nada fica misturado em um único estoque. Cada obra tem a própria história no sistema.',
  },
]
