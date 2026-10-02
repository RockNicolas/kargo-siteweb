import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  Truck,
  FileText,
  Fuel,
  Wrench,
  Package,
  FileSpreadsheet,
  Settings,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '../Logo'
import { ModuleVideoModal, type VideoModule } from '../ModuleVideoModal'
import { useTheme } from '../../hooks/useTheme'
import {
  CHART_COLORS,
  DonutChart,
  DonutLegend,
  HorizontalBars,
  VerticalBars,
  type CategoricalSlice,
} from './charts'

/** Dados fictícios só pra ilustrar o layout — nenhum número aqui é de cliente real.
 *  Cores e categorias iguais às do painel de verdade (Veículo Leve/Pesado, Máquina,
 *  Equipamentos): ver src/components/listaCategoria/listaCategoriaUtils.js no
 *  repositório do sistema. */
const patrimonioSlices: CategoricalSlice[] = [
  { label: 'Equipamentos', value: 30, ...CHART_COLORS.violet },
  { label: 'Veículo leve', value: 20, ...CHART_COLORS.blue },
  { label: 'Veículo pesado', value: 10, ...CHART_COLORS.green },
  { label: 'Máquina', value: 4, ...CHART_COLORS.orange },
]
const totalAtivos = patrimonioSlices.reduce((sum, s) => sum + s.value, 0)

const combustivelBars: CategoricalSlice[] = [
  { label: 'Veículo leve', value: 410, ...CHART_COLORS.blue },
  { label: 'Veículo pesado', value: 310, ...CHART_COLORS.green },
  { label: 'Equipamentos', value: 140, ...CHART_COLORS.violet },
  { label: 'Máquina', value: 120, ...CHART_COLORS.orange },
]

const multasBars = [
  { label: 'Motorista A', value: 3 },
  { label: 'Motorista B', value: 2 },
  { label: 'Motorista C', value: 1 },
]

// Cores de status (vencendo/perto da troca), iguais ao painel real —
// CORES_STATUS_MANUTENCAO em src/utils/resumoManutencaoGrafico.js.
const manutencaoBars = [
  { label: 'EQ-04', value: 92, cor: '#f97316' },
  { label: 'EQ-11', value: 78, cor: '#f59e0b' },
]

const almoxarifadoBars = [
  { label: 'Cimento', value: 12 },
  { label: 'Vergalhão', value: 9 },
  { label: 'Tinta', value: 7 },
  { label: 'Luva', value: 6 },
  { label: 'Broca', value: 4 },
]

const gastosSemana = [
  { dia: 'SEG', destaque: false },
  { dia: 'TER', destaque: false },
  { dia: 'QUA', destaque: true },
  { dia: 'QUI', destaque: false },
  { dia: 'SEX', destaque: false },
  { dia: 'SÁB', destaque: false },
  { dia: 'DOM', destaque: false },
]
const gastosLinhas = [
  { veiculo: 'Van 01', placa: 'ABC-1D23', valores: [0, 120, 0, 0, 0, 0, 0], total: 120 },
  { veiculo: 'Van 02', placa: 'DEF-4G56', valores: [0, 0, 340, 0, 90, 0, 0], total: 430 },
  { veiculo: 'Pickup 03', placa: 'HIJ-7K89', valores: [0, 0, 0, 0, 60, 0, 0], total: 60 },
  { veiculo: 'Utilitário 04', placa: 'LMN-0P12', valores: [0, 0, 210, 0, 0, 0, 0], total: 210 },
]

interface SidebarModule {
  key: string
  icon: VideoModule['icon']
  title: string
  /** Itens reais do submenu de cada módulo (copiados do painel de verdade —
   *  PainelFrotaSidebar.jsx). Relatório não tem submenu no sistema real, então
   *  clica e vai direto. */
  subItens?: string[]
  videoSrc?: string
}

const sidebarModules: SidebarModule[] = [
  {
    key: 'patrimonio',
    icon: Truck,
    title: 'Patrimônio',
    subItens: ['Ativos', 'Controle Entrada Saida', 'Movimentação', 'Contrato'],
    videoSrc: '/ativos.mp4',
  },
  {
    key: 'documentacao',
    icon: FileText,
    title: 'Documentação',
    subItens: ['Doc. ativos', 'CNH', 'IPVA', 'Licenciamento', 'Multas'],
    videoSrc: '/documentos.mp4',
  },
  {
    key: 'combustivel',
    icon: Fuel,
    title: 'Combustível',
    subItens: ['Semanal', 'Mensal'],
    videoSrc: '/combustivel.mp4',
  },
  {
    key: 'manutencao',
    icon: Wrench,
    title: 'Manutenção',
    subItens: [
      'Manutenção de ativos',
      'Manutenções realizadas',
      'Gastos de manutenção',
      'Item de manutenção',
    ],
    videoSrc: '/manutencoes.mp4',
  },
  {
    key: 'almoxarifado',
    icon: Package,
    title: 'Almoxarifado',
    subItens: ['Insumos', 'Movimentação por obra', 'Obras', 'Reservas'],
    videoSrc: '/almoxerifado.mp4',
  },
  { key: 'relatorio', icon: FileSpreadsheet, title: 'Relatório', videoSrc: '/relatorio.mp4' },
]

/** Cabeçalho de card igual ao real: badge do ícone e rótulo em laranja (cta),
 *  não cinza — ver InicioKpiGrid.jsx / InicioGastosManutencaoResumo.jsx. */
function CardHeader({
  icon: Icon,
  label,
  onOpenVideo,
}: {
  icon: VideoModule['icon']
  label: string
  onOpenVideo: () => void
}) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-1.5 border-b border-[var(--k-border)]/50 px-3 py-1.5">
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="inline-flex shrink-0 rounded-lg bg-[var(--k-cta)]/15 p-1 text-[var(--k-cta)]">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <p className="truncate text-[10px] font-black uppercase tracking-wider text-[var(--k-cta)]">
          {label}
        </p>
      </div>
      <button
        type="button"
        onClick={onOpenVideo}
        title="Assistir vídeo de demonstração"
        aria-label={`Assistir vídeo de ${label}`}
        className="cursor-pointer rounded p-1 text-[var(--k-muted)] transition hover:bg-[var(--k-cta)]/10 hover:text-[var(--k-cta)]"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </header>
  )
}

export interface DemoScreenProps {
  /** false = tela decorativa (preview em miniatura) — nada clicável, o clique
   *  passa direto pro elemento por trás (ex.: o <Link> que envolve o preview). */
  interactive?: boolean
  /** true = usa um tamanho fixo em pixels em vez de preencher a viewport
   *  (h-dvh) — necessário pra poder encolher a tela inteira com um `transform:
   *  scale()` num card pequeno, já que unidades de viewport ignoram o
   *  elemento-pai. */
  fixedSize?: boolean
  initialExpandido?: boolean
  initialModuloAberto?: string | null
}

export function DemoScreen({
  interactive = true,
  fixedSize = false,
  initialExpandido = false,
  initialModuloAberto = null,
}: DemoScreenProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [videoModule, setVideoModule] = useState<VideoModule | null>(null)
  // Só um módulo aberto por vez — igual ao "moduloAberto" do painel real, que
  // começa fechado (null) até o usuário clicar em algo.
  const [moduloAberto, setModuloAberto] = useState<string | null>(initialModuloAberto)
  // A sidebar em si também começa recolhida (só ícones) — igual ao "expandido"
  // do painel real. Clicar num módulo expande; clicar fora recolhe de novo.
  const [expandido, setExpandido] = useState(initialExpandido)
  // Sidebar de verdade some abaixo de md — no celular, esse drawer é quem
  // deixa o painel navegável (o sistema real tem o equivalente).
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  // Painel deslizante da gaveta mobile — precisa contar como "dentro da
  // sidebar" pro listener de clique-fora abaixo, senão o mesmo clique que
  // abre um submenu no celular já dispara o recolhimento (pensando que foi
  // um clique fora da sidebar de desktop, que é invisível no celular).
  const mobileDrawerRef = useRef<HTMLDivElement>(null)
  // Marca se a interação (mousedown/tap) *começou* dentro da sidebar — precisa ser
  // capturado no pointerdown, antes do click disparar. Sem isso, o mesmo clique que
  // expande a sidebar também aciona o listener de "clique fora" recém-criado (o
  // clique ainda está se propagando até o document quando o efeito já rodou) e
  // recolhe na hora — mesmo bug que o painel real evita com essa técnica.
  const interacaoIniciouNaSidebarRef = useRef(false)

  useEffect(() => {
    // Só na rota /demo de verdade (fixedSize=false) — a tela já é h-dvh e tem
    // rolagem própria por dentro (o <main>); travar a página garante que
    // nunca sobra nem 1px de rolagem no navegador por fora dela, então uma
    // pequena imprecisão de arredondamento não vira barra de rolagem visível.
    if (fixedSize) return
    // Só em ponteiro fino (mouse/trackpad) — em touch (celular/tablet), o
    // 100dvh de alguns navegadores não bate exatamente com a área visível de
    // verdade (a barra de endereço soma/some e o cálculo às vezes atrasa ou
    // erra), e trancar body+html nesse caso pode deixar uma fatia do
    // conteúdo inalcançável: sem rolagem nem por dentro (já não sobrou
    // espaço) nem por fora (travada). Em mouse esse descompasso não existe,
    // então mantém a trava (só evita aquele 1px de rolagem residual).
    if (window.matchMedia('(pointer: coarse)').matches) return
    // Trava tanto <html> quanto <body>: com só um dos dois em hidden, o
    // navegador pode escolher o outro como "root scroller" e a rolagem da
    // página continua acontecendo mesmo assim.
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [fixedSize])

  useEffect(() => {
    const marcarOrigemInteracao = (e: PointerEvent) => {
      const alvo = e.target as Node
      interacaoIniciouNaSidebarRef.current =
        (sidebarRef.current?.contains(alvo) ?? false) || (mobileDrawerRef.current?.contains(alvo) ?? false)
    }
    document.addEventListener('pointerdown', marcarOrigemInteracao, true)
    return () => document.removeEventListener('pointerdown', marcarOrigemInteracao, true)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!expandido) return
    const onClickOutside = (e: MouseEvent) => {
      if (interacaoIniciouNaSidebarRef.current) {
        interacaoIniciouNaSidebarRef.current = false
        return
      }
      if ((e.target as Element)?.closest?.('[role="dialog"]')) return
      setExpandido(false)
      setModuloAberto(null)
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [expandido])

  const handleModuleClick = (mod: SidebarModule) => {
    setExpandido(true)
    if (!mod.subItens) {
      setVideoModule(mod)
      return
    }
    setModuloAberto((prev) => (prev === mod.key ? null : mod.key))
  }

  /** Sienge + Configurações, sempre nessa ordem no rodapé — igual ao painel real. */
  const renderSiengeConfig = () => (
    <div className="mt-auto space-y-1">
      <button
        type="button"
        onClick={() => setExpandido(true)}
        className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 transition-colors hover:bg-[var(--k-bg-deep)]/50"
      >
        {/* A logo do Sienge é sempre azul-marinho fixo — por isso a pastilha branca
            atrás não segue o tema, senão fica ilegível no escuro (igual ao
            SiengeWordmark do painel real). */}
        <span className="inline-flex items-center rounded-md bg-white px-3 py-2">
          <img src="/sienge-logo-real.png" alt="Sienge" className="h-5 w-auto object-contain" />
        </span>
      </button>

      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[var(--k-text)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
      >
        <Settings className="h-4.5 w-4.5 shrink-0" />
        Configurações
      </button>
    </div>
  )

  /** Lista de módulos com acordeão — usada no drawer mobile. `onLeafClick` fecha
   *  o drawer depois de uma ação final (abrir vídeo), mas não ao só abrir/fechar
   *  um submenu (o usuário ainda precisa ver os itens pra escolher). */
  const renderModuleNav = (onLeafClick: () => void) => (
    <nav className="mt-8 flex-1 space-y-1">
      {sidebarModules.map((mod) => {
        if (!mod.subItens) {
          return (
            <button
              key={mod.key}
              type="button"
              onClick={() => {
                handleModuleClick(mod)
                onLeafClick()
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[var(--k-text)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
            >
              <mod.icon className="h-4.5 w-4.5 shrink-0" />
              {mod.title}
            </button>
          )
        }

        const aberto = moduloAberto === mod.key
        return (
          <div key={mod.key}>
            <button
              type="button"
              onClick={() => handleModuleClick(mod)}
              aria-expanded={aberto}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[var(--k-text)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
            >
              <mod.icon className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1">{mod.title}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ${aberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="mt-1 space-y-0.5 pl-4">
                  {mod.subItens.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setVideoModule(mod)
                        onLeafClick()
                      }}
                      className="block w-full cursor-pointer truncate rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-[var(--k-muted)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )

  const cards = useMemo(
    () => [
      { icon: Truck, title: 'Patrimônio', videoSrc: '/ativos.mp4' },
      { icon: FileText, title: 'Documentação', videoSrc: '/documentos.mp4' },
      { icon: Fuel, title: 'Combustível', videoSrc: '/combustivel.mp4' },
      { icon: Wrench, title: 'Manutenção', videoSrc: '/manutencoes.mp4' },
      { icon: Package, title: 'Almoxarifado', videoSrc: '/almoxerifado.mp4' },
    ],
    []
  )

  const actionBtnClass =
    'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--k-border)] bg-[var(--k-elevated)] text-[var(--k-muted)] transition hover:border-[var(--k-cta)]/50 hover:bg-[var(--k-cta)]/10 hover:text-[var(--k-cta)]'

  return (
    <div
      className={`kargo-shell flex flex-col overflow-hidden bg-[var(--k-bg)] text-[var(--k-text)] ${
        // A miniatura (fixedSize) precisa parecer "desktop" sempre, não importa a
        // largura real da janela — classes responsivas (md:/lg:) checam o
        // viewport de verdade, não o tamanho do card escalado, então numa janela
        // média (~768–1024px) a sidebar aparecia mas a fileira ainda empilhava
        // em coluna. Fixa a fileira sem depender de breakpoint nesse caso; na
        // página /demo de verdade, md: (mesmo ponto em que a sidebar aparece)
        // evita esse mesmo hiato de largura.
        fixedSize ? 'flex-row' : 'md:flex-row'
      } ${fixedSize ? '' : 'h-dvh max-h-dvh w-full'} ${interactive ? '' : 'pointer-events-none select-none'}`}
      style={
        fixedSize
          ? // Só a largura é travada (precisa de um valor fixo pra caber no
            // transform: scale() do preview). A altura fica automática — se
            // travasse também, sobraria espaço vazio embaixo sempre que o
            // conteúdo real fosse mais baixo que o valor escolhido.
            { width: 1400 }
          : // Página /demo de verdade: mesmo view-transition-name do card da
            // prévia na home (ver Features.tsx) — o navegador anima um
            // "virando" o outro em vez de cortar seco entre as páginas.
            { viewTransitionName: 'kargo-panel' }
      }
    >
      {/* Sidebar — mesma estrutura, ícones e comportamento de recolher/expandir do painel
          de verdade (PainelFrotaSidebar.jsx: começa só com ícones, expande ao clicar num
          módulo, recolhe ao clicar fora). */}
      <aside
        ref={sidebarRef}
        className={`${fixedSize ? 'flex' : 'hidden md:flex'} shrink-0 flex-col overflow-hidden border-r border-[var(--k-border)] bg-[var(--k-sidebar)] py-5 transition-[width] duration-200 ease-out ${
          expandido ? 'w-64 px-3' : 'w-[84px] px-2'
        }`}
      >
        <div className="flex h-9 items-center justify-center overflow-hidden px-1">
          {expandido ? (
            <Logo />
          ) : (
            // Recolhida: a wordmark completa não cabe em 84px — escala ela toda
            // pra caber (max-h + max-w juntos, sem travar um eixo só), em vez de
            // espremer a proporção como o max-width sozinho fazia.
            <>
              <img
                src="/Kargo-light.png"
                alt="Kargo"
                className="max-h-7 max-w-[64px] object-contain dark:hidden"
              />
              <img
                src="/Kargo.png"
                alt="Kargo"
                className="hidden max-h-7 max-w-[64px] object-contain dark:block"
              />
            </>
          )}
        </div>

        {expandido ? (
          renderModuleNav(() => {})
        ) : (
          <nav className="mt-8 flex flex-1 flex-col items-center gap-2">
            {sidebarModules.map((mod) => (
              <button
                key={mod.key}
                type="button"
                title={mod.title}
                onClick={() => handleModuleClick(mod)}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-[var(--k-text)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
              >
                <mod.icon className="h-5 w-5" />
              </button>
            ))}
          </nav>
        )}

        {/* Sienge e Configurações ficam juntos no rodapé, nessa ordem — igual ao painel real. */}
        {expandido ? (
          renderSiengeConfig()
        ) : (
          <div className="mt-auto flex flex-col items-center gap-2">
            <button
              type="button"
              title="Integração Sienge"
              onClick={() => setExpandido(true)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-[var(--k-bg-deep)]/50"
            >
              <img src="/sienge-icone-real.png" alt="Sienge" className="h-6 w-6 object-contain" />
            </button>
            <button
              type="button"
              title="Configurações"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-[var(--k-text)] transition-colors hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        )}
      </aside>

      {/* Drawer mobile — a sidebar de verdade só existe a partir de md; abaixo
          disso, é essa gaveta (mesmo menu, sempre expandido) que dá acesso aos
          módulos. Só existe na página /demo de verdade — nunca na miniatura da
          home (fixedSize sempre finge ser desktop; um overlay fixed:inset-0
          dali cobriria a página inteira por trás do card pequeno). */}
      {interactive && !fixedSize ? (
        <div className={`fixed inset-0 z-40 md:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}>
          {/* Fundo escurecido, só pra fechar no clique — não faz parte da navegação
              por teclado/leitor de tela (o X visível e a tecla Esc já cobrem isso),
              então fica fora da árvore de acessibilidade em vez de duplicar o rótulo
              do botão de fechar de verdade. */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            ref={mobileDrawerRef}
            className={`absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col overflow-y-auto border-r border-[var(--k-border)] bg-[var(--k-sidebar)] px-3 py-5 shadow-2xl transition-transform duration-200 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between px-2">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--k-text)] transition hover:bg-[var(--k-bg-deep)]/50"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderModuleNav(() => setMobileMenuOpen(false))}
            {renderSiengeConfig()}
          </div>
        </div>
      ) : null}

      {/* min-h-0 é essencial aqui: sem ele, um item flex por padrão não encolhe
          abaixo da altura do próprio conteúdo (min-height: auto), então o
          <main> com overflow-y-auto nunca chega a precisar rolar — em vez
          disso a página toda cresce e é o navegador que rola. O painel real
          tem exatamente esse min-h-0 no wrapper equivalente (InicioPage.jsx). */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topo */}
        <section className="flex h-14 shrink-0 items-center gap-2 border-b border-[var(--k-border)] bg-[var(--k-sidebar)] px-4 md:px-6">
          {interactive && !fixedSize ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--k-text)] transition hover:bg-[var(--k-bg-deep)]/50 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          {interactive ? (
            <Link
              to="/"
              viewTransition
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--k-muted)] transition hover:bg-[var(--k-bg-deep)]/50 hover:text-[var(--k-cta)]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar ao site</span>
            </Link>
          ) : (
            // Preview em miniatura: fica dentro de outro <Link> (o do card na home) —
            // um <a> real aqui seria <a> aninhado em <a>, HTML inválido.
            <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--k-muted)]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar ao site</span>
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={actionBtnClass}
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              <Sun className="hidden h-4.5 w-4.5 dark:block" />
              <Moon className="h-4.5 w-4.5 dark:hidden" />
            </button>
            <span className={`${actionBtnClass} relative`}>
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 font-mono text-[9px] font-bold leading-none text-white">
                3
              </span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--k-cta)]/40 bg-[var(--k-elevated)] font-mono text-xs font-black tracking-wide text-[var(--k-cta)]">
              DM
            </span>
          </div>
        </section>

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2 sm:p-2.5 lg:p-3 2xl:p-4">
          {/* @container: o grid responde à largura real desta área (sidebar
              recolhida/expandida), não ao viewport — assim o layout se
              ajeita em notebook, 1080p, ultrawide e 4K. Sem max-width: o
              painel ocupa o espaço disponível em qualquer monitor. */}
          {/* Sem overflow-hidden aqui: no celular o conteúdo empilha mais alto
              que o espaço disponível de propósito, e é o <main> (acima) que
              rola pra mostrar o resto. Um overflow-hidden neste card corta
              esse excesso em vez de deixá-lo rolável.
              shrink-0: min-h-full troca o min-height:auto do flex item; sem
              isso o painel cinza encolhe à altura visível do <main> e os
              cards de baixo ficam fora do fundo. */}
          <section className="@container relative flex min-h-full w-full shrink-0 flex-col rounded-2xl border border-[var(--k-border)] bg-[var(--k-elevated)] p-3 shadow-xl sm:p-3.5 lg:p-4">
            <header className="shrink-0">
              <h1 className="text-base font-black leading-tight @3xl:text-lg @6xl:text-xl">
                Bem-vindo(a).
              </h1>
              <p className="mt-0.5 max-w-3xl text-xs text-[var(--k-muted)] @6xl:text-sm">
                Este é o mesmo layout do painel Kargo, com dados fictícios pra você conhecer os
                módulos. Clique em qualquer módulo — no menu ou nos cards — pra assistir a
                demonstração em vídeo.
              </p>
            </header>

            {/* Fileira 1: Patrimônio (estreito) + Gastos (largo). flex-1 só quando
                as duas colunas cabem lado a lado — no celular os cards empilham
                na altura natural e a página rola. */}
            {/* auto-rows-fr só a partir de @3xl: antes disso os dois cards
                empilham em linhas separadas (não lado a lado), e igualar a
                altura deles só deixava o card de Gastos esticado bem mais
                alto que a própria tabela — um vão vazio sobrando embaixo. */}
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 @3xl:min-h-0 @3xl:auto-rows-fr @3xl:flex-[1.2] @3xl:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] @3xl:gap-3">
              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <CardHeader icon={Truck} label="Patrimônio" onOpenVideo={() => setVideoModule(cards[0])} />
                <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
                  <p className="shrink-0 text-sm font-black leading-tight @5xl:text-base">
                    {totalAtivos} ativos em operação
                  </p>
                  <div className="mt-2 flex min-h-0 flex-1 items-center gap-3 border-t border-[var(--k-border)]/40 pt-2 @5xl:gap-5">
                    <div className="aspect-square w-[clamp(4.75rem,32%,9.5rem)] shrink-0">
                      <DonutChart slices={patrimonioSlices} isDark={isDark} size={120} thickness={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <DonutLegend slices={patrimonioSlices} isDark={isDark} />
                    </div>
                  </div>
                </div>
              </article>

              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <header className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--k-border)]/50 px-3 py-1.5">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="inline-flex shrink-0 rounded-lg bg-[var(--k-cta)]/15 p-1 text-[var(--k-cta)]">
                      <FileSpreadsheet className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <p className="truncate text-[10px] font-black uppercase tracking-wider text-[var(--k-cta)]">
                      Gastos de manutenção
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-black tabular-nums text-[var(--k-cta)]">
                    R$ 820,00
                  </span>
                </header>
                <div className="relative flex flex-1 items-stretch px-2 py-2">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[36rem] border-collapse text-xs @5xl:min-w-0">
                      <thead>
                        <tr>
                          <th className="pb-1.5 pl-1 text-left text-[9px] font-black uppercase tracking-wide text-[var(--k-muted)]">
                            Ativo
                          </th>
                          {gastosSemana.map((d) => (
                            <th
                              key={d.dia}
                              className={`px-1 pb-1.5 text-center text-[9px] font-black uppercase ${
                                d.destaque
                                  ? 'rounded-t-md bg-[var(--k-cta)]/10 text-[var(--k-cta)]'
                                  : 'text-[var(--k-muted)]'
                              }`}
                            >
                              {d.dia}
                            </th>
                          ))}
                          <th className="border-l border-[var(--k-border)]/50 pb-1.5 pl-2 text-right text-[9px] font-black uppercase text-[var(--k-muted)]">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {gastosLinhas.map((linha) => (
                          <tr key={linha.veiculo} className="border-t border-[var(--k-border)]/30">
                            <td className="py-1.5 pl-1 pr-2">
                              <p className="font-black leading-tight">{linha.veiculo}</p>
                              <p className="text-[9px] font-semibold text-[var(--k-muted)]">{linha.placa}</p>
                            </td>
                            {linha.valores.map((v, i) => (
                              <td
                                key={gastosSemana[i].dia}
                                className={`px-1 py-1.5 text-center tabular-nums ${
                                  v > 0 ? 'font-medium' : 'text-[var(--k-muted)]/40'
                                } ${gastosSemana[i].destaque ? 'bg-[var(--k-cta)]/5' : ''}`}
                              >
                                {v > 0 ? v.toLocaleString('pt-BR') : '—'}
                              </td>
                            ))}
                            <td className="border-l border-[var(--k-border)]/40 py-1.5 pl-2 text-right font-black tabular-nums text-[var(--k-cta)]">
                              {linha.total.toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--k-sidebar)] to-transparent @3xl:hidden"
                  />
                </div>
              </article>
            </div>

            {/* Fileira 2: 1 col no celular, 2 no tablet, 4 no desktop — baseado
                na largura do container, não da janela. */}
            {/* mesma lógica: auto-rows-fr só a partir de @xl, onde os cards
                realmente passam a ficar lado a lado (2 colunas). */}
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 @xl:auto-rows-fr @xl:grid-cols-2 @3xl:gap-3 @5xl:min-h-0 @5xl:flex-1 @5xl:grid-cols-4">
              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <CardHeader icon={Fuel} label="Combustível" onOpenVideo={() => setVideoModule(cards[2])} />
                <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
                  <p className="shrink-0 text-sm font-black leading-tight @5xl:text-base">R$ 7.420,00</p>
                  <p className="shrink-0 text-[11px] text-[var(--k-muted)]">980 litros (semanal) · 55% diesel</p>
                  <div className="mt-2 min-h-0 flex-1 border-t border-[var(--k-border)]/40 pt-2">
                    <HorizontalBars data={combustivelBars} isDark={isDark} formatValue={(v) => `${v} L`} />
                  </div>
                </div>
              </article>

              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <CardHeader icon={FileText} label="Documentação" onOpenVideo={() => setVideoModule(cards[1])} />
                <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
                  <p className="shrink-0 text-sm font-black leading-tight @5xl:text-base">6 multas em aberto</p>
                  <p className="shrink-0 text-[11px] text-[var(--k-muted)]">Multas em aberto por motorista</p>
                  <div className="mt-2 min-h-0 flex-1 border-t border-[var(--k-border)]/40 pt-2">
                    <VerticalBars data={multasBars} color={CHART_COLORS.blue.light} />
                  </div>
                </div>
              </article>

              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <CardHeader icon={Wrench} label="Manutenção" onOpenVideo={() => setVideoModule(cards[3])} />
                <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
                  <p className="shrink-0 text-sm font-black leading-tight @5xl:text-base">2 críticos</p>
                  <p className="shrink-0 text-[11px] text-[var(--k-muted)]">Perto da troca</p>
                  <div className="mt-2 min-h-0 flex-1 border-t border-[var(--k-border)]/40 pt-2">
                    <VerticalBars data={manutencaoBars} color={CHART_COLORS.orange.light} />
                  </div>
                </div>
              </article>

              <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--k-border)] bg-[var(--k-sidebar)]">
                <CardHeader icon={Package} label="Almoxarifado" onOpenVideo={() => setVideoModule(cards[4])} />
                <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
                  <p className="shrink-0 text-sm font-black leading-tight @5xl:text-base">38 peças</p>
                  <p className="shrink-0 text-[11px] text-[var(--k-muted)]">
                    0 com estoque baixo · R$ 31.200,00 em estoque
                  </p>
                  <div className="mt-2 min-h-0 flex-1 border-t border-[var(--k-border)]/40 pt-2">
                    <VerticalBars data={almoxarifadoBars} color={CHART_COLORS.teal.light} />
                  </div>
                </div>
              </article>
            </div>

            <p className="mt-auto shrink-0 pt-2 text-right text-[10px] font-semibold text-[var(--k-muted)]/70">
              Base: Demonstração · Versão: Kargo 1.0.0
            </p>

            {/* Confinado ao card na página /demo de verdade — o vídeo abre "dentro"
                do painel em vez de cobrir o site inteiro. Na miniatura da home
                (fixedSize) o card é pequeno demais pra isso; ali continua cobrindo
                a janela toda (ver o prop `confined` no próprio modal). */}
            <ModuleVideoModal
              module={videoModule}
              onClose={() => setVideoModule(null)}
              confined={!fixedSize}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
