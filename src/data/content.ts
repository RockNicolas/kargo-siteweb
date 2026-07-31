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
  UserCog,
  Eye,
} from 'lucide-react'

// Prefixado com "/" (não "#..." puro): o Header aparece em toda rota (App.tsx),
// então precisa apontar pra âncora na home mesmo quando o usuário está em /modulos.
export const navLinks = [
  { label: 'Módulos', href: '/#modulos' },
  { label: 'Integração Sienge', href: '/#sienge' },
  { label: 'Perfis de acesso', href: '/#perfis' },
  { label: 'Contato', href: '/#contato' },
]

export const contact = {
  email: 'supportkargo@gmail.com',
  whatsapp: '+5585997665652',
  phoneDisplay: '(85) 99766-5652',
  address: {
    street: 'Avenida Santos Dumont 1740',
    city: '60140-160 Fortaleza, Ceará',
  },
}

export const footerAboutLinks = [
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Módulos', href: '/modulos' },
  { label: 'Integração Sienge', href: '/#sienge' },
  { label: 'Perfis de acesso', href: '/#perfis' },
  { label: 'Contato', href: '/#contato' },
]

export const footerSupportLinks = [
  { label: 'Solicitar demonstração', href: '/#contato' },
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
  /** Caminho do vídeo de demonstração (ex.: "/videos/combustivel.mp4"). Sem isso, a página de
   *  módulos mostra um placeholder "vídeo em breve" no lugar — é só preencher quando gravar. */
  videoSrc?: string
}

export interface ModuleGroup {
  label: string
  items: ModuleItem[]
}

// Mesma sequência do menu lateral do sistema:
// Patrimônio, Documentação, Combustível, Manutenção, Almoxarifado, Rastreio, Relatório.
export const moduleGroups: ModuleGroup[] = [
  {
    label: 'Patrimônio & obra',
    items: [
      {
        icon: Truck,
        title: 'Veículos e equipamentos',
        description: 'Cadastro central com placa, categoria, município e controle de km/horímetro.',
      },
    ],
  },
  {
    label: 'Operação diária',
    items: [
      {
        icon: FileText,
        title: 'Documentação veicular',
        description: 'IPVA, licenciamento, seguro, CNH e multas — com alerta antes do vencimento.',
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
        description: 'Intervalo por km ou hora, ordem de serviço em PDF e baixa de peças na obra certa.',
      },
      {
        icon: Warehouse,
        title: 'Almoxarifado por obra',
        description: 'Cada obra com seu próprio saldo — entradas, saídas, transferências e reservas.',
      },
    ],
  },
  {
    label: 'Visão & controle',
    items: [
      {
        icon: BarChart3,
        title: 'Relatórios e painéis',
        description:
          'Dashboard com indicadores de frota e obra em tempo real — filtra por período, veículo ou obra e acompanha tudo num só painel. Além disso, cada relatório sai em PDF ou Excel, com a logo da empresa.',
      },
      {
        icon: Bell,
        title: 'Alertas e notificações',
        description: 'O sistema avisa sozinho: vencimento, estoque baixo, divergência de km.',
      },
      {
        icon: ShieldCheck,
        title: 'Segurança e acesso',
        description: 'Cada funcionário só acessa o que faz sentido pro seu trabalho. Tudo fica registrado.',
      },
    ],
  },
]

export const painPoints: string[] = [
  'Quanto estamos gastando com combustível por veículo, por mês?',
  'Qual veículo está prestes a vencer o seguro, o IPVA ou a próxima manutenção?',
  'Quanto de material temos em estoque em cada obra, agora?',
  'Quem tirou a última peça do almoxarifado, e para qual equipamento?',
  'Esse motorista está com a CNH em dia?',
]

export interface Profile {
  icon: LucideIcon
  title: string
  level: string
  description: string
}

export const profiles: Profile[] = [
  {
    icon: UserCog,
    title: 'Administrador',
    level: 'total',
    description: 'Cadastra usuários, define o que cada um pode ver e editar, acompanha a auditoria completa.',
  },
  {
    icon: Users,
    title: 'Operadores',
    level: 'por módulo',
    description: 'Cada funcionário enxerga só as áreas liberadas pra ele — nada além do necessário.',
  },
  {
    icon: Eye,
    title: 'Cliente',
    level: 'visualização',
    description: 'Portal simplificado pra quem contrata o serviço acompanhar os próprios dados.',
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
    description: 'A mesma informação não precisa ser digitada duas vezes em dois sistemas diferentes.',
  },
  {
    icon: Bell,
    title: 'Menos surpresa',
    description: 'Vencimento, estoque baixo e manutenção atrasada avisam antes de virar problema.',
  },
  {
    icon: BarChart3,
    title: 'Decisão mais rápida',
    description: 'Números de gasto, estoque e frota disponíveis na hora, não no fim do mês.',
  },
  {
    icon: Warehouse,
    title: 'Controle real por obra',
    description: 'Nada fica misturado num estoque só. Cada obra tem sua própria história no sistema.',
  },
]
