import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** Peças visuais do painel — as mesmas do sistema (apresentacaoUi.jsx). */

export function Secao({
  id,
  eyebrow,
  titulo,
  children,
}: {
  id: string
  eyebrow?: string
  titulo: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="min-w-0">
      <header className="operacao-secao-header">
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-kargo-cta @3xl:text-[11px]">{eyebrow}</p>
        ) : null}
        <h2 id={`${id}-titulo`} className="operacao-secao-titulo text-kargo-text">
          {titulo}
        </h2>
      </header>
      {children}
    </section>
  )
}

export function Cartao({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`operacao-cartao min-w-0 border border-kargo-border bg-kargo-sidebar ${className}`.trim()}>
      {children}
    </div>
  )
}

export function Rotulo({
  icone: Icone,
  children,
  className = '',
}: {
  icone?: LucideIcon
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`flex min-w-0 items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kargo-muted ${className}`.trim()}
    >
      {Icone ? <Icone size={14} className="shrink-0" aria-hidden /> : null}
      <span className="min-w-0 break-words">{children}</span>
    </p>
  )
}
