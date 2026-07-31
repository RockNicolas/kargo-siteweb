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

function NotebookPhoto({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const isDark = useIsDark()

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{ aspectRatio: '3000 / 2250', ...style }}
    >
      <img
        src="/notebook-dark.webp"
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
      />
      <img
        src="/notebook-light.webp"
        alt="Notebook exibindo o painel do Kargo"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        style={{ opacity: isDark ? 0 : 1 }}
      />
    </div>
  )
}

function IntroHeadline() {
  return (
    <div className="text-center sm:text-left">
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

const MAX_SCALE = 1.55

export function Intro() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(trackRef)
  const reducedMotion = usePrefersReducedMotion()

  const scale = 1 + (MAX_SCALE - 1) * smoothstep(0.05, 0.9, progress)
  const captionOpacity = 1 - smoothstep(0, 0.2, progress)

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
              <NotebookPhoto
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
          <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-8">
            <IntroHeadline />

            <div className="relative flex justify-center sm:justify-end">
              <p
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-signal-600 dark:text-signal-400 sm:text-xs"
                style={{ opacity: captionOpacity }}
              >
                Role pra ver o Kargo de perto
              </p>

              <NotebookPhoto
                className="w-full max-w-[min(100%,580px)]"
                style={{
                  transformOrigin: '50% 42%',
                  transform: `scale(${scale})`,
                  willChange: 'transform',
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))',
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
