import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Globe, Monitor, Smartphone } from 'lucide-react'
import { Container } from './ui/Container'

const stack = ['Combustível', 'Frota', 'Documentação', 'Manutenção', 'Almoxarifado']

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function smootherstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * t * (t * (t * 6 - 15) + 10)
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

// Persegue `target` quadro a quadro em vez de saltar direto pra ele. Sem isso a
// animação fica presa 1:1 na posição do scroll: no mobile o dissolve inteiro
// cabe em ~145px de rolagem, e num flick rápido esses px passam em um ou dois
// quadros — o efeito "pula" pro fim em vez de acontecer. Com a perseguição, a
// animação leva o mesmo tempo independentemente da velocidade do scroll.
function useSmoothed(target: number, factor = 0.07) {
  const [value, setValue] = useState(target)
  const valueRef = useRef(target)

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const diff = target - valueRef.current
      // Perto o bastante: encaixa no alvo e encerra o loop (não fica um rAF
      // rodando à toa gastando bateria no celular). O limiar não é menor
      // porque o decaimento é exponencial: quanto mais fino, mais longa a
      // cauda de quadros — e abaixo disso a diferença já é invisível, já que
      // `progress` só alimenta opacidade/escala.
      if (Math.abs(diff) < 0.002) {
        valueRef.current = target
        setValue(target)
        return
      }
      valueRef.current += diff * factor
      setValue(valueRef.current)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, factor])

  return value
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

function NotebookPhotoPair({
  darkSrc,
  lightSrc,
  opacity,
  blur = 0,
  scale = 1,
}: {
  darkSrc: string
  lightSrc: string
  opacity: number
  blur?: number
  scale?: number
}) {
  const isDark = useIsDark()

  if (opacity < 0.004) return null

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        transform: scale === 1 ? undefined : `scale(${scale})`,
        filter: blur > 0.15 ? `blur(${blur}px)` : undefined,
        willChange: blur > 0.15 ? 'opacity, filter, transform' : 'opacity',
      }}
    >
      <img
        src={darkSrc}
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
        style={{ opacity: isDark ? 1 : 0 }}
        draggable={false}
      />
      <img
        src={lightSrc}
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
        style={{ opacity: isDark ? 0 : 1 }}
        draggable={false}
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
        Sua frota e suas obras sob controle em um único painel.
      </h1>

      <p
        className="animate-fade-up mx-auto mt-5 max-w-md text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300 sm:mx-0"
        style={{ animationDelay: '180ms' }}
      >
        O Kargo substitui a planilha, o papel e o controle manual por um painel único — acessível de
        qualquer computador, tablet ou celular, com histórico completo e alertas automáticos.
      </p>

      <div
        className="animate-fade-up mt-7 flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: '260ms' }}
      >
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
        >
          Solicitar demonstração
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#modules"
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
        Acesse do computador ou qualquer dispositivo móvel
      </div>

      <div
        className="animate-fade-up mt-2 flex items-center justify-center gap-2 text-sm text-asphalt-500 dark:text-asphalt-400 sm:justify-start"
        style={{ animationDelay: '360ms' }}
      >
        <Globe className="h-4 w-4" />
        Sem depender de uma máquina fixa: acesse o Kargo de qualquer lugar
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
      className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/5 blur-3xl transition-colors duration-300 dark:bg-signal-500/20"
    />
  )
}

const GROW_SCALE = 1.18
const GROW_END = 0.32
const SWAP_START = 0.18
const SWAP_END = 0.58
const DISSOLVE_BLUR_PX = 7
const ZOOM_SCALE = 1.4
const ZOOM_START = 0.38
const ZOOM_END = 0.74
const MAX_SHIFT_PX = 160
const CENTER_SCALE = 1.65
const CENTER_START = 0.78
const CENTER_END = 1

function NotebookRig({ p, rowLeft, rowWidth }: { p: number; rowLeft: number; rowWidth: number }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const box = useElementRect(boxRef)

  const captionOpacity = 1 - smoothstep(0, 0.2, p)
  const centerT = smootherstep(CENTER_START, CENTER_END, p)
  const scale = isDesktop
    ? 1 +
      (GROW_SCALE - 1) * smootherstep(0, GROW_END, p) +
      (ZOOM_SCALE - GROW_SCALE) * smootherstep(ZOOM_START, ZOOM_END, p) +
      (CENTER_SCALE - ZOOM_SCALE) * centerT
    : 1

  const swap = smootherstep(SWAP_START, SWAP_END, p)
  const dissolvePeak = Math.sin(Math.PI * swap)
  const dissolveBlur = DISSOLVE_BLUR_PX * dissolvePeak
  const angledOpacity = 1 - swap
  const frontOpacity = swap
  const angledLayerScale = 1 + 0.03 * swap
  const frontLayerScale = 0.97 + 0.03 * swap

  const clipShiftX = isDesktop ? Math.max(-(box.width * (scale - 1)) / 2, -MAX_SHIFT_PX) : 0

  let shiftX = clipShiftX
  if (isDesktop && centerT > 0 && rowWidth > 0 && box.width > 0) {
    const boxCenterX = box.left + box.width / 2
    const rowCenterX = rowLeft + rowWidth / 2
    const centerShiftX = rowCenterX - boxCenterX
    shiftX = clipShiftX + (centerShiftX - clipShiftX) * centerT
  }

  return (
    <div className="relative flex justify-center sm:justify-end">
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
        style={{ opacity: captionOpacity }}
      >
        <span className="relative h-6 w-4 rounded-full border-2 border-signal-600 dark:border-signal-400">
          <span className="animate-mouse-scroll absolute left-1/2 top-1 h-1.5 w-[3px] -translate-x-1/2 rounded-full bg-signal-600 dark:bg-signal-400" />
        </span>
        <span className="animate-chevron-bounce h-2 w-2 border-b-2 border-r-2 border-signal-600 dark:border-signal-400" />
      </div>

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
          <NotebookPhotoPair
            darkSrc="/notebook-dark.webp"
            lightSrc="/notebook-light.webp"
            opacity={angledOpacity}
            blur={dissolveBlur}
            scale={angledLayerScale}
          />
          <NotebookPhotoPair
            darkSrc="/notebook-front-light.webp"
            lightSrc="/notebook-front-dark.webp"
            opacity={frontOpacity}
            blur={dissolveBlur}
            scale={frontLayerScale}
          />
        </div>
      </div>
    </div>
  )
}

export function Intro() {
  const trackRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const rawProgress = useScrollProgress(trackRef)
  const progress = useSmoothed(rawProgress)
  const row = useElementRect(rowRef)
  const isDesktop = useIsDesktop()
  const reducedMotion = usePrefersReducedMotion()
  const textOpacity = isDesktop ? 1 - 0.82 * smootherstep(CENTER_START, CENTER_END, progress) : 1

  if (reducedMotion) {
    return (
      <section
        id="intro"
        className="relative overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-black sm:py-28"
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
    // No mobile o conteúdo do hero (~930px) é bem mais alto que a área visível
    // do Safari no iOS (~664px num iPhone 14), então prender tudo numa tela só
    // com `overflow-hidden` cortava o notebook, que fica por último. Lá o hero
    // flui naturalmente; a pinagem cinematográfica fica só no desktop, onde o
    // conteúdo cabe. `dvh` (e não `vh`) porque no iOS `vh` mede a viewport com
    // a barra do navegador escondida — sempre maior que o que se vê de fato.
    <section
      id="intro"
      ref={trackRef}
      className={`relative bg-white transition-colors duration-300 dark:bg-black ${
        isDesktop ? 'h-[220dvh]' : ''
      }`}
    >
      <div
        className={
          isDesktop
            ? 'sticky top-0 flex h-dvh w-full items-center overflow-hidden pt-20'
            : 'flex w-full flex-col pb-16 pt-28'
        }
      >
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
