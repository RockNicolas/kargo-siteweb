import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Maximize2 } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { ModulesCarousel } from './ModulesCarousel'
import { DemoScreen } from './demo/DemoScreen'

/** Largura "natural" (não escalada) em que a DemoScreen renderiza pra virar
 *  miniatura — precisa de pixel fixo (não vw) pra dar pra encolher com
 *  transform: scale() de forma previsível. A altura NÃO é fixa — é medida do
 *  conteúdo de verdade (ver ScaledPreview), senão sobra espaço vazio embaixo
 *  sempre que o conteúdo é mais baixo que a altura fixa escolhida. */
const PREVIEW_WIDTH = 1400

/** Renderiza `children` na largura natural informada e encolhe com
 *  `transform: scale()` até caber na largura real do contêiner — mede via
 *  ResizeObserver (largura do contêiner E altura real do conteúdo) pra ficar
 *  de verdade responsivo e sem sobra de espaço vazio embaixo. */
function ScaledPreview({ naturalWidth, children }: { naturalWidth: number; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const wrapEl = wrapRef.current
    const innerEl = innerRef.current
    if (!wrapEl || !innerEl) return
    const update = () => {
      setScale(wrapEl.clientWidth / naturalWidth)
      setNaturalHeight(innerEl.scrollHeight)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrapEl)
    ro.observe(innerEl)
    return () => ro.disconnect()
  }, [naturalWidth])

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ height: naturalHeight && scale ? naturalHeight * scale : undefined }}
    >
      <div
        ref={innerRef}
        className="origin-top-left"
        style={{ width: naturalWidth, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section id="modules" className="relative overflow-hidden bg-white py-20 dark:bg-black sm:py-28">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Módulos"
            title="Tudo o que sua operação precisa em um único painel."
            description="Organizado da forma como quem administra frota e obras realmente pensa no dia a dia."
          />
        </Reveal>

      </Container>

      <Reveal delay={90} className="mt-20 sm:mt-24">
        <ModulesCarousel />
      </Reveal>

      {/* Fora do <Container> de propósito — a prévia precisa de bem mais espaço
          horizontal do que a largura padrão do site pra não ficar ilegível
          (é um painel de verdade em miniatura, com bastante texto pequeno). */}
      <Reveal delay={110} className="relative mt-16 w-screen left-1/2 right-1/2 -mx-[50vw] px-5 sm:mt-20 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="text-center lg:w-72 lg:shrink-0 lg:text-left xl:w-80">
            <h3 className="font-display text-2xl font-semibold text-asphalt-950 sm:text-3xl dark:text-white">
              É este o painel dinâmico que você vai visualizar diariamente.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-base text-asphalt-500 lg:mx-0 dark:text-asphalt-400">
              Explore o painel ao lado: navegue pelos módulos, acesse o menu e assista às
              demonstrações em vídeo. Não se trata de uma simulação —{' '}
              <span className="font-semibold text-asphalt-700 dark:text-asphalt-200">
                é o ambiente real, pronto para você explorar.
              </span>
            </p>
            <Link
              to="/demo"
              viewTransition
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-asphalt-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
            >
              Ver o painel completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="group relative min-w-0 flex-1">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,rgba(240,83,12,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,rgba(240,83,12,0.16),transparent_70%)]"
            />

            {/* Chamada pro clique, acima do card — não em cima dele, pra não
                colidir com a logo/topo da prévia. */}
            <p className="mb-3 text-center font-display text-base font-semibold text-signal-600 lg:text-left dark:text-signal-400">
              Experimente: clique em um módulo abaixo
            </p>

            <div
              className="overflow-hidden rounded-2xl border border-asphalt-200 shadow-xl shadow-asphalt-950/10 dark:border-asphalt-800 dark:shadow-black/40"
              style={{ viewTransitionName: 'kargo-panel' }}
            >
              <ScaledPreview naturalWidth={PREVIEW_WIDTH}>
                {/* Prévia interativa de verdade — clique nos módulos, expanda a
                    sidebar, veja os vídeos, igual à /demo. */}
                <DemoScreen fixedSize initialExpandido initialModuloAberto="patrimonio" />
              </ScaledPreview>
            </div>

            {/* Fora do card em si, pra não brigar com os cliques da prévia por baixo —
                atalho pra abrir em tela cheia. */}
            <Link
              to="/demo"
              viewTransition
              aria-label="Abrir o painel em tela cheia"
              title="Abrir em tela cheia"
              className="absolute -right-3 -top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-asphalt-200 bg-white text-asphalt-700 shadow-md transition hover:border-signal-500 hover:text-signal-600 dark:border-asphalt-700 dark:bg-asphalt-900 dark:text-asphalt-200 dark:hover:text-signal-400"
            >
              <Maximize2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
