import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { moduleGroups, type ModuleItem } from '../data/content'

function ModuleMedia({ mod }: { mod: ModuleItem }) {
  if (mod.videoSrc) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl border border-asphalt-200 bg-asphalt-950 dark:border-asphalt-800">
        <video src={mod.videoSrc} controls preload="metadata" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="group/media relative aspect-video overflow-hidden rounded-2xl border border-asphalt-200 bg-gradient-to-br from-asphalt-900 via-asphalt-950 to-black dark:border-asphalt-800">
      <mod.icon
        aria-hidden
        strokeWidth={1.25}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-white/[0.06]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition duration-300 group-hover/media:scale-110 group-hover/media:bg-signal-500 group-hover/media:ring-signal-500">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
        <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/70">
          Vídeo em breve
        </span>
      </div>
    </div>
  )
}

function ModuleRow({ mod, reverse }: { mod: ModuleItem; reverse: boolean }) {
  return (
    <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-12">
      <Reveal className={reverse ? 'sm:order-2' : ''}>
        <ModuleMedia mod={mod} />
      </Reveal>
      <Reveal delay={90} className={reverse ? 'sm:order-1' : ''}>
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-asphalt-950 text-signal-400 dark:bg-asphalt-800">
            <mod.icon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-asphalt-950 dark:text-white">
            {mod.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-asphalt-600 dark:text-asphalt-300">
            {mod.description}
          </p>
        </div>
      </Reveal>
    </div>
  )
}

export function ModulosPage() {
  let rowIndex = 0

  return (
    <div className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal-400/10 blur-3xl dark:bg-signal-500/15"
      />

      <Container className="relative">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-asphalt-500 transition hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar pro início
          </Link>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-asphalt-950 dark:text-white sm:text-5xl">
            Todos os módulos do Kargo
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-asphalt-600 dark:text-asphalt-300">
            Cada módulo resolve uma parte específica da rotina de frota e obras — e todos conversam
            entre si num painel só. Assista de perto como funciona cada um.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
          {moduleGroups.map((group) => (
            <div key={group.label}>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-signal-500/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-signal-600 dark:text-signal-400">
                  {group.label}
                </span>
              </Reveal>

              <div className="mt-8 space-y-14 sm:mt-10 sm:space-y-20">
                {group.items.map((mod) => {
                  const reverse = rowIndex % 2 === 1
                  rowIndex += 1
                  return <ModuleRow key={mod.title} mod={mod} reverse={reverse} />
                })}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center sm:mt-24">
          <Link
            to="/#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-asphalt-950 px-6 py-3 font-medium text-white transition hover:bg-signal-500 dark:bg-signal-500 dark:text-asphalt-950 dark:hover:bg-signal-400"
          >
            Solicitar demonstração
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </div>
  )
}
