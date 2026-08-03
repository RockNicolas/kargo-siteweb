import { useEffect, useRef } from 'react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { howItWorks } from '../data/content'

export function HowItWorks() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="como-funciona" className="bg-white py-20 dark:bg-black sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Como funciona"
            title="Três passos entre a planilha e o controle real."
            description="Sem implantação complicada: você cadastra, o sistema cuida do resto."
          />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-asphalt-200 dark:bg-asphalt-800 sm:block"
          />

          {howItWorks.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-asphalt-950 text-signal-400 ring-8 ring-white dark:bg-signal-500 dark:text-asphalt-950 dark:ring-black">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="mt-4 font-mono text-xs uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  Passo {i + 1}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-asphalt-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mx-auto mt-16 max-w-none text-center font-display text-xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:mt-20 sm:whitespace-nowrap sm:text-2xl lg:text-3xl">
            Imagina sua rotina assim: painel interativo, dado sempre atualizado — longe de planilhas.
          </p>
        </Reveal>

        <Reveal delay={340}>
          <div className="mx-auto mt-8 max-w-4xl">
            <div
              className="overflow-hidden rounded-2xl border-2 border-signal-500 bg-asphalt-950 shadow-xl shadow-signal-500/20 dark:border-signal-400"
              style={{ aspectRatio: '1366 / 606' }}
            >
              <video
                ref={videoRef}
                src="/kargo-intro.mp4"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
