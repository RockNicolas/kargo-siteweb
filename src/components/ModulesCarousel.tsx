import { useCallback, useEffect, useMemo, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { moduleGroups, type ModuleItem } from '../data/content'

interface CarouselItem extends ModuleItem {
  group: string
}

interface CarouselMetrics {
  cardW: number
  cardH: number
  /** Px de deslocamento horizontal entre os centros dos cards. */
  spacingX: number
  /** Graus de giro (eixo Y) por passo de distância — dá o efeito de parede curvada. */
  angleStep: number
  /** Ângulo máximo, pra evitar que os cards mais distantes girem além de 90°. */
  maxAngle: number
  /** Px que cada card "recua" em profundidade por passo — reforça a curva 3D. */
  zStep: number
  /** Quantos cards pra cada lado do centro continuam visíveis. */
  visibleRange: number
  containerH: number
}

/** Quanto maior a tela, mais a "parede curva" se espalha — usa o espaço extra de
 *  monitores largos/4K em vez de deixar o carrossel do mesmo tamanho de sempre. */
const METRICS_TIERS: [minWidth: number, metrics: CarouselMetrics][] = [
  [1920, { cardW: 300, cardH: 420, spacingX: 250, angleStep: 22, maxAngle: 72, zStep: 50, visibleRange: 4, containerH: 520 }],
  [1280, { cardW: 260, cardH: 370, spacingX: 215, angleStep: 24, maxAngle: 70, zStep: 46, visibleRange: 4, containerH: 460 }],
  [640, { cardW: 220, cardH: 320, spacingX: 176, angleStep: 30, maxAngle: 66, zStep: 40, visibleRange: 3, containerH: 400 }],
  [0, { cardW: 190, cardH: 280, spacingX: 140, angleStep: 28, maxAngle: 60, zStep: 34, visibleRange: 3, containerH: 340 }],
]

function useCarouselMetrics(): CarouselMetrics {
  const [metrics, setMetrics] = useState<CarouselMetrics>(METRICS_TIERS[METRICS_TIERS.length - 1][1])

  useEffect(() => {
    const queries = METRICS_TIERS.map(([minWidth]) => window.matchMedia(`(min-width: ${minWidth}px)`))

    const update = () => {
      const tierIndex = queries.findIndex((mq) => mq.matches)
      setMetrics(METRICS_TIERS[tierIndex === -1 ? METRICS_TIERS.length - 1 : tierIndex][1])
    }

    update()
    queries.forEach((mq) => mq.addEventListener('change', update))
    return () => queries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  return metrics
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

// Toque simula um "mouseenter" ao tocar num card mas quase nunca dispara o
// "mouseleave" correspondente (não existe cursor saindo de cima de nada) —
// sem essa checagem, o efeito de foco/hover ficava "travado" num card fora do
// centro em touch, achatado e ampliado sem recentralizar, estourando a
// máscara de desvanecimento nas pontas do carrossel.
function useHoverCapable() {
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCapable(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return capable
}

/** Distância com sinal mais curta entre dois índices num ciclo (pra o carrossel dar a volta em vez de "voltar"). */
function loopedDiff(index: number, active: number, length: number) {
  let diff = (index - active) % length
  if (diff > length / 2) diff -= length
  if (diff < -length / 2) diff += length
  return diff
}

const AUTOPLAY_MS = 3400

export function ModulesCarousel() {
  const items = useMemo<CarouselItem[]>(
    () => moduleGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.label }))),
    []
  )
  const n = items.length
  const metrics = useCarouselMetrics()
  const hoverCapable = useHoverCapable()
  const dragStepPx = Math.round(metrics.spacingX * 0.85)

  const [activeIndex, setActiveIndex] = useState(() => Math.floor((n - 1) / 2))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [drag, setDrag] = useState<{ startX: number; deltaX: number } | null>(null)

  const goTo = useCallback((index: number) => setActiveIndex(((index % n) + n) % n), [n])
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n])
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + n) % n), [n])

  useEffect(() => {
    if (isPaused || hoveredIndex !== null || drag) return
    const id = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, hoveredIndex, drag, goNext])

  const dragOffsetSteps = drag ? drag.deltaX / dragStepPx : 0
  const continuousActive = activeIndex - dragOffsetSteps

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setDrag({ startX: e.clientX, deltaX: 0 })
  }
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    setDrag((d) => (d ? { ...d, deltaX: e.clientX - d.startX } : d))
  }
  const endDrag = () => {
    setDrag((d) => {
      if (!d) return null
      const steps = Math.round(-d.deltaX / dragStepPx)
      if (steps !== 0) goTo(activeIndex + steps)
      return null
    })
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    }
  }

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div
        role="group"
        aria-roledescription="carrossel"
        aria-label="Módulos do Kargo"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredIndex(null)
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={drag ? handlePointerMove : undefined}
        onPointerUp={endDrag}
        onPointerLeave={() => drag && endDrag()}
        className={`group/carousel relative touch-pan-y select-none outline-none ${
          drag ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ height: metrics.containerH }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_40%,rgba(240,83,12,0.07),transparent_70%)] dark:bg-[radial-gradient(ellipse_55%_65%_at_50%_40%,rgba(240,83,12,0.14),transparent_70%)]"
        />

        <div
          className="relative h-full overflow-hidden"
          style={{
            perspective: '1300px',
            perspectiveOrigin: '50% 0%',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          {items.map((item, i) => {
            const diff = loopedDiff(i, continuousActive, n)
            const absDiff = Math.abs(diff)
            const isFocused = hoveredIndex === i
            const dimmed = hoveredIndex !== null && !isFocused
            const isFlat = isFocused || absDiff < 0.5

            const rawAngle = diff * metrics.angleStep
            const angle = isFocused ? 0 : clamp(rawAngle, -metrics.maxAngle, metrics.maxAngle)
            const x = diff * metrics.spacingX
            const z = isFocused ? 40 : -absDiff * metrics.zStep
            const scale = isFocused ? 1.08 : Math.max(1 - absDiff * 0.05, 0.8)
            const fadedOut = absDiff > metrics.visibleRange
            const opacity = fadedOut ? 0 : dimmed ? 0.15 : 1
            const zIndex = isFocused ? 200 : Math.round(100 - absDiff * 10)

            return (
              <div
                key={item.title}
                onMouseEnter={() => hoverCapable && setHoveredIndex(i)}
                onMouseLeave={() => hoverCapable && setHoveredIndex(null)}
                onClick={() => goTo(i)}
                className="absolute left-1/2 top-0 cursor-pointer"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  transformOrigin: 'top',
                  transform: `translateX(calc(-50% + ${x}px)) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: fadedOut ? 'none' : 'auto',
                  transition: drag
                    ? 'none'
                    : 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                }}
              >
                <div
                  className={`flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isFocused
                      ? 'border-signal-500/70 bg-white dark:bg-asphalt-900'
                      : 'border-asphalt-200 bg-white dark:border-asphalt-800 dark:bg-asphalt-900'
                  } ${isFlat ? 'p-6' : 'items-center justify-center p-4 text-center'}`}
                >
                  {isFlat ? (
                    <>
                      <span
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-signal-400 transition duration-300 dark:bg-asphalt-800 ${
                          isFocused ? 'scale-110 bg-signal-500 text-white' : 'bg-asphalt-950'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold text-asphalt-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                        {item.description}
                      </p>
                    </>
                  ) : (
                    <>
                      <item.icon
                        aria-hidden
                        strokeWidth={1.25}
                        className="h-12 w-12 text-asphalt-950/[0.15] dark:text-white/[0.12]"
                      />
                      <span className="mt-4 line-clamp-2 font-display text-sm font-semibold text-asphalt-950/70 dark:text-white/60">
                        {item.title}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Módulo anterior"
          className="absolute left-3 top-1/2 z-[210] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-asphalt-200 bg-white/90 text-asphalt-700 opacity-0 shadow-sm backdrop-blur transition duration-300 hover:border-signal-500 hover:text-signal-600 group-hover/carousel:opacity-100 focus-visible:opacity-100 sm:left-6 dark:border-asphalt-700 dark:bg-asphalt-900/80 dark:text-asphalt-200 dark:hover:text-signal-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próximo módulo"
          className="absolute right-3 top-1/2 z-[210] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-asphalt-200 bg-white/90 text-asphalt-700 opacity-0 shadow-sm backdrop-blur transition duration-300 hover:border-signal-500 hover:text-signal-600 group-hover/carousel:opacity-100 focus-visible:opacity-100 sm:right-6 dark:border-asphalt-700 dark:bg-asphalt-900/80 dark:text-asphalt-200 dark:hover:text-signal-400"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para ${item.title}`}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-signal-500' : 'w-1.5 bg-asphalt-200 dark:bg-asphalt-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
