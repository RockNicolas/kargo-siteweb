import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { moduleGroups, type ModuleItem } from '../data/content'

interface CarouselItem extends ModuleItem {
  group: string
}

const CARD_W = 220
const CARD_H = 320
/** Px de deslocamento horizontal entre os centros dos cards. */
const SPACING_X = 176
/** Graus de giro (eixo Y) por passo de distância — dá o efeito de parede curvada. */
const ANGLE_STEP = 30
/** Ângulo máximo, pra evitar que os cards mais distantes girem além de 90°. */
const MAX_ANGLE = 66
/** Px que cada card "recua" em profundidade por passo — reforça a curva 3D. */
const Z_STEP = 40
/** Quantos cards pra cada lado do centro continuam visíveis. */
const VISIBLE_RANGE = 3
/** Px de arrasto equivalentes a "andar" um card. */
const DRAG_STEP_PX = 150
const AUTOPLAY_MS = 3400

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Distância com sinal mais curta entre dois índices num ciclo (pra o carrossel dar a volta em vez de "voltar"). */
function loopedDiff(index: number, active: number, length: number) {
  let diff = (index - active) % length
  if (diff > length / 2) diff -= length
  if (diff < -length / 2) diff += length
  return diff
}

export function ModulesCarousel() {
  const items = useMemo<CarouselItem[]>(
    () => moduleGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.label }))),
    []
  )
  const n = items.length

  const [activeIndex, setActiveIndex] = useState(() => Math.floor((n - 1) / 2))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [drag, setDrag] = useState<{ startX: number; deltaX: number } | null>(null)

  const goTo = useCallback((index: number) => setActiveIndex(((index % n) + n) % n), [n])
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n])

  useEffect(() => {
    if (isPaused || hoveredIndex !== null || drag) return
    const id = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, hoveredIndex, drag, goNext])

  const dragOffsetSteps = drag ? drag.deltaX / DRAG_STEP_PX : 0
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
      const steps = Math.round(-d.deltaX / DRAG_STEP_PX)
      if (steps !== 0) goTo(activeIndex + steps)
      return null
    })
  }

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carrossel"
        aria-label="Módulos do Kargo"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredIndex(null)
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={drag ? handlePointerMove : undefined}
        onPointerUp={endDrag}
        onPointerLeave={() => drag && endDrag()}
        className={`relative h-[300px] touch-pan-y select-none overflow-hidden sm:h-[340px] ${
          drag ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1300px', perspectiveOrigin: '50% 0%' }}
      >
        {items.map((item, i) => {
          const diff = loopedDiff(i, continuousActive, n)
          const absDiff = Math.abs(diff)
          const isFocused = hoveredIndex === i
          const dimmed = hoveredIndex !== null && !isFocused
          const isFlat = isFocused || absDiff < 0.5

          const rawAngle = diff * ANGLE_STEP
          const angle = isFocused ? 0 : clamp(rawAngle, -MAX_ANGLE, MAX_ANGLE)
          const x = diff * SPACING_X
          const z = isFocused ? 40 : -absDiff * Z_STEP
          const scale = isFocused ? 1.08 : Math.max(1 - absDiff * 0.05, 0.8)
          const fadedOut = absDiff > VISIBLE_RANGE
          const opacity = fadedOut ? 0 : dimmed ? 0.15 : 1
          const zIndex = isFocused ? 200 : Math.round(100 - absDiff * 10)

          return (
            <div
              key={item.title}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => goTo(i)}
              className="absolute left-1/2 top-0 cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
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

      <div className="mt-6 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para ${item.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-signal-500' : 'w-1.5 bg-asphalt-200 dark:bg-asphalt-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
