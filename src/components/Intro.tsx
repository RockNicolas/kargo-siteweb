import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { Container } from './ui/Container'

const stack = ['Combustível', 'Frota', 'Documentação', 'Manutenção', 'Almoxarifado']

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function useIsDark() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const el = document.documentElement
    const observer = new MutationObserver(() => setIsDark(el.classList.contains('dark')))
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

// Abaixo de `sm` o grid vira 1 coluna e a foto já nasce centralizada — o ajuste
// de posição (que só existe pra compensar o crescimento ficando ancorado à
// direita) não se aplica nesse layout.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    setIsDesktop(mq.matches)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

// Posição/largura "de repouso" de um elemento (sem nenhum transform aplicado
// a ele) — serve pra calcular deslocamentos (compensar o crescimento, mirar
// o centro da seção) sem entrar em loop, já que o elemento medido aqui nunca
// recebe o transform diretamente.
function useElementRect(ref: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setRect({ left: r.left, width: r.width })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [ref])

  return rect
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? -rect.top / total : 0
      setProgress(Math.min(1, Math.max(0, p)))
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])

  return progress
}

// Um par dark/dark photo — a troca entre eles por tema é sempre por
// crossfade em CSS (evento discreto de clique, então pode ter transition).
// A opacidade do PAR inteiro (prop `opacity`) já vem calculada quadro a
// quadro a partir do scroll, então essa não leva transition — senão o
// crossfade entre ângulos ficaria atrasado em relação ao scroll.
function NotebookPhotoPair({
  darkSrc,
  lightSrc,
  opacity,
}: {
  darkSrc: string
  lightSrc: string
  opacity: number
}) {
  const isDark = useIsDark()

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <img
        src={darkSrc}
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
      />
      <img
        src={lightSrc}
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        style={{ opacity: isDark ? 0 : 1 }}
      />
    </div>
  )
}

function StaticNotebookPhoto({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative ${className ?? ''}`} style={{ aspectRatio: '3000 / 2250', ...style }}>
      <NotebookPhotoPair darkSrc="/notebook-dark.webp" lightSrc="/notebook-light.webp" opacity={1} />
    </div>
  )
}

function IntroHeadline({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="text-center sm:text-left" style={style}>
      <h1
        className="animate-fade-up font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-asphalt-950 dark:text-white"
        style={{ animationDelay: '90ms' }}
      >
        Sua frota e suas obras, sob controle em um único painel.
      </h1>

      <p
        className="animate-fade-up mx-auto mt-5 max-w-md text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300 sm:mx-0"
        style={{ animationDelay: '180ms' }}
      >
        O Kargo substitui planilha, papel e controle manual por um painel único — acessível de
        qualquer computador ou celular, com histórico completo e alertas automáticos.
      </p>

      <div
        className="animate-fade-up mt-7 flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: '260ms' }}
      >
        <a
          href="#contato"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
        >
          Solicitar demonstração
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#modulos"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-asphalt-200 px-6 py-3 font-medium text-asphalt-700 transition hover:border-asphalt-950 dark:border-asphalt-700 dark:text-asphalt-200 dark:hover:border-white"
        >
          Ver módulos do sistema
        </a>
      </div>

      <div
        className="animate-fade-up mt-6 flex items-center justify-center gap-2 text-sm text-asphalt-500 dark:text-asphalt-400 sm:justify-start"
        style={{ animationDelay: '340ms' }}
      >
        <Monitor className="h-4 w-4" />
        <Smartphone className="h-4 w-4" />
        Acesse do computador, tablet ou celular
      </div>

      <div
        className="animate-fade-up mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-asphalt-200 pt-5 text-sm text-asphalt-500 dark:border-asphalt-800 dark:text-asphalt-400 sm:justify-start"
        style={{ animationDelay: '400ms' }}
      >
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function IntroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/10 blur-3xl transition-colors duration-300 dark:bg-signal-500/20"
    />
  )
}

// Quatro fases que não se sobrepõem, pra cada uma ficar "limpa" na sua janela
// do scroll: 1) cresce um pouco (foto angulada, ainda ancorada à direita);
// 2) com o tamanho já parado, troca rápido pra foto frontal — janela curta
// pra não demorar na dupla exposição do crossfade; 3) já como frontal, dá um
// zoom contido (o quanto cabe sem passar por cima do texto); 4) solta essa
// contenção e vai pro centro de verdade da seção — o texto ao lado esmaece
// nessa última janela porque é literalmente por cima dele que a foto passa.
const GROW_SCALE = 1.18
const GROW_END = 0.25

const SWAP_START = 0.32
const SWAP_END = 0.48

// Zoom deliberadamente contido: pra manter a borda direita sem cortar, o
// deslize pra esquerda cresce o DOBRO do ganho de largura (compensa o próprio
// crescimento simétrico da escala, mais o deslize em si) — então um zoom
// grande demais avançaria por cima do texto. 1.4 é o teto que ainda cabe
// com folga na coluna de até 580px sem tocar o conteúdo à esquerda.
const ZOOM_SCALE = 1.4
const ZOOM_START = SWAP_END
const ZOOM_END = 0.72

// Rede de segurança da fase de zoom contido: mesmo com a conta acima, nunca
// deslizar mais que isso antes de soltar pro centro de verdade.
const MAX_SHIFT_PX = 160

// Fase final: escala um pouco mais (com margem de sobra, já que centralizada
// na seção inteira não corre risco de cortar) e desliza até o centro real.
const CENTER_SCALE = 1.65
const CENTER_START = 0.8
const CENTER_END = 1

function NotebookRig({ p, rowLeft, rowWidth }: { p: number; rowLeft: number; rowWidth: number }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const box = useElementRect(boxRef)

  const captionOpacity = 1 - smoothstep(0, 0.2, p)
  const centerT = smoothstep(CENTER_START, CENTER_END, p)
  const scale =
    1 +
    (GROW_SCALE - 1) * smoothstep(0, GROW_END, p) +
    (ZOOM_SCALE - GROW_SCALE) * smoothstep(ZOOM_START, ZOOM_END, p) +
    (CENTER_SCALE - ZOOM_SCALE) * centerT
  const swap = smoothstep(SWAP_START, SWAP_END, p)

  // A foto nasce ancorada à direita (`sm:justify-end`). Ao crescer a partir do
  // próprio centro (`transformOrigin` 50%), metade do ganho de largura vazaria
  // pra fora da tela à direita — desliza pra a esquerda exatamente esse tanto,
  // então a borda direita não passa de onde já estava em repouso. Só no
  // desktop: no mobile ela já nasce centralizada.
  const clipShiftX = isDesktop ? Math.max(-(box.width * (scale - 1)) / 2, -MAX_SHIFT_PX) : 0

  // Na fase final, troca essa contenção por um alvo medido de verdade: o
  // centro horizontal da SEÇÃO inteira (as duas colunas), não só da coluna
  // da foto — por isso ela passa por cima de onde o texto está.
  let shiftX = clipShiftX
  if (isDesktop && centerT > 0 && rowWidth > 0 && box.width > 0) {
    const boxCenterX = box.left + box.width / 2
    const rowCenterX = rowLeft + rowWidth / 2
    const centerShiftX = rowCenterX - boxCenterX
    shiftX = clipShiftX + (centerShiftX - clipShiftX) * centerT
  }

  return (
    <div className="relative flex justify-center sm:justify-end">
      <p
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-signal-600 dark:text-signal-400 sm:text-xs"
        style={{ opacity: captionOpacity }}
      >
        Role pra ver o Kargo de perto
      </p>

      <div
        ref={boxRef}
        className="relative w-full max-w-[min(100%,580px)]"
        style={{ aspectRatio: '3000 / 2250' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translateX(${shiftX}px) scale(${scale})`,
            transformOrigin: '50% 42%',
            willChange: 'transform',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))',
          }}
        >
          <NotebookPhotoPair darkSrc="/notebook-dark.webp" lightSrc="/notebook-light.webp" opacity={1 - swap} />
          <NotebookPhotoPair
            darkSrc="/notebook-front-dark.webp"
            lightSrc="/notebook-front-light.webp"
            opacity={swap}
          />
        </div>
      </div>
    </div>
  )
}

export function Intro() {
  const trackRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(trackRef)
  const row = useElementRect(rowRef)
  const isDesktop = useIsDesktop()
  const reducedMotion = usePrefersReducedMotion()

  // Some junto com o esmaecimento pro centro do NotebookRig (mesma janela
  // CENTER_START–CENTER_END) — só no desktop, onde a foto de fato passa por
  // cima desse espaço; no mobile (1 coluna) ela nunca invade o texto.
  const textOpacity = isDesktop ? 1 - 0.82 * smoothstep(CENTER_START, CENTER_END, progress) : 1

  if (reducedMotion) {
    return (
      <section
        id="intro"
        className="relative overflow-hidden bg-concrete-50 py-20 transition-colors duration-300 dark:bg-asphalt-950 sm:py-28"
      >
        <IntroGlow />
        <Container className="relative">
          <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-8">
            <IntroHeadline />
            <div className="flex justify-center sm:justify-end">
              <StaticNotebookPhoto
                className="w-full max-w-[min(100%,580px)]"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))' }}
              />
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      id="intro"
      ref={trackRef}
      className="relative h-[220vh] bg-concrete-50 transition-colors duration-300 dark:bg-asphalt-950"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden pt-20">
        <IntroGlow />
        <Container className="relative w-full">
          <div ref={rowRef} className="grid items-center gap-8 sm:grid-cols-2 sm:gap-8">
            <IntroHeadline style={{ opacity: textOpacity }} />
            <NotebookRig p={progress} rowLeft={row.left} rowWidth={row.width} />
          </div>
        </Container>
      </div>
    </section>
  )
}
