import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Clapperboard } from 'lucide-react'
import type { ModuleItem } from '../data/content'

/** Só o que o modal realmente usa — assim qualquer lista de módulos (carrossel,
 *  menu do painel etc.) pode abrir vídeo sem precisar ter uma `description`. */
export type VideoModule = Pick<ModuleItem, 'icon' | 'title' | 'videoSrc'>

type ModuleVideoModalProps = {
  module: VideoModule | null
  onClose: () => void
  /** true = não cobre a janela inteira; fica restrito ao card que o chama
   *  (precisa ser o último filho de um ancestral `relative overflow-hidden`).
   *  Usado na página /demo de verdade, pra o vídeo abrir "dentro" do painel em
   *  vez de por cima do site inteiro. Na miniatura da home (fixedSize) o card
   *  é pequeno demais pra isso — ali continua cobrindo a janela toda via portal. */
  confined?: boolean
}

export function ModuleVideoModal({ module, onClose, confined = false }: ModuleVideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = module !== null

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!module) return null

  const content = (
    <div
      className={`${confined ? 'absolute overflow-hidden rounded-2xl' : 'fixed'} inset-0 z-[100] flex items-center justify-center p-4`}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 cursor-pointer bg-asphalt-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Vídeo de demonstração — ${module.title}`}
        className={`relative z-10 flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-asphalt-200 bg-white shadow-2xl shadow-asphalt-950/30 dark:border-asphalt-800 dark:bg-asphalt-950 ${
          // Confinado: preenche o card inteiro (menos o padding do overlay) —
          // vídeo grande de verdade, não uma caixinha sobrando no meio dele.
          // Sem confinar (portal cobrindo a janela toda), mantém a caixa
          // modesta de sempre — do tamanho da janela, um vídeo do card
          // inteiro ficaria gigante e desproporcional.
          confined ? 'h-full w-full' : 'w-full max-w-3xl'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-asphalt-200 px-5 py-4 dark:border-asphalt-800">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
              <module.icon className="h-4 w-4" />
            </span>
            <h2 className="truncate font-display font-semibold text-asphalt-950 dark:text-white">
              {module.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-lg p-1.5 text-asphalt-400 transition hover:bg-asphalt-100 hover:text-asphalt-700 dark:hover:bg-asphalt-800 dark:hover:text-white"
            aria-label="Fechar vídeo"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="min-h-0 flex-1 bg-asphalt-950"
          style={confined ? undefined : { aspectRatio: '16 / 9' }}
        >
          {module.videoSrc ? (
            <video
              key={module.videoSrc}
              src={module.videoSrc}
              controls
              autoPlay
              playsInline
              // Confinado: a caixa já tem o tamanho do card (h-full acima) — o
              // vídeo usa esse espaço todo mantendo a proporção original, com
              // tarja preta se sobrar (object-contain), em vez de esticar.
              className={`h-full w-full ${confined ? 'object-contain' : ''}`}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/70">
                <Clapperboard className="h-5 w-5" />
              </span>
              <p className="font-display font-semibold text-white">Vídeo em produção</p>
              <p className="max-w-xs text-sm text-white/50">
                Estamos gravando a demonstração deste módulo. Volte em breve.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Confinado ao card (posição relativa ao ancestral mais próximo com
  // `relative`): sem portal, pra `position: absolute` valer contra esse card
  // e não contra a janela toda.
  return confined ? content : createPortal(content, document.body)
}
