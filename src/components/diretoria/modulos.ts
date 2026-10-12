import type { LucideIcon } from 'lucide-react'
import { FileText, Fuel, Package, Truck, Wrench } from 'lucide-react'
import type { CustoId, DemoModulo } from '../../data/painelDiretoriaDemo.types'

/** Ícone e nome de cada área da operação, como no painel do sistema (utils/modulosCliente.js). */
export const MODULO_ICONE: Record<DemoModulo['id'], { icone: LucideIcon; nome: string }> = {
  combustivel: { icone: Fuel, nome: 'Combustível' },
  manutencao: { icone: Wrench, nome: 'Manutenção' },
  frota: { icone: Truck, nome: 'Patrimônio' },
  documentacao: { icone: FileText, nome: 'Documentos' },
  almoxarifado: { icone: Package, nome: 'Almoxarifado' },
}

/** Tipos de custo, na ordem da pilha dos gráficos (combustível embaixo). */
export const TIPOS_CUSTO: { id: CustoId; rotulo: string }[] = [
  { id: 'combustivel', rotulo: 'Combustível' },
  { id: 'manutencao', rotulo: 'Manutenção' },
  { id: 'multas', rotulo: 'Multas' },
  { id: 'impostos', rotulo: 'IPVA e licenciamento' },
]
