import { Link, NavLink } from 'react-router-dom'
import type { DocArea } from './registry'
import { DOC_AREAS, artigosDaArea, caminhoDoArtigo } from './registry'

/** Troca entre Manual e API (topo no desktop, dentro do menu no celular). */
export function DocsAreaTabs({ areaAtual, compacto = false }: { areaAtual?: DocArea; compacto?: boolean }) {
  return (
    <div className={`flex gap-1 ${compacto ? 'rounded-xl bg-concrete-100 p-1 dark:bg-asphalt-900' : ''}`}>
      {DOC_AREAS.map((area) => {
        const ativo = area.id === areaAtual?.id
        const Icon = area.icon
        return (
          <Link
            key={area.id}
            to={caminhoDoArtigo(artigosDaArea(area)[0])}
            className={
              compacto
                ? `flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    ativo
                      ? 'bg-white text-asphalt-950 shadow-sm dark:bg-asphalt-800 dark:text-white'
                      : 'text-asphalt-500 hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white'
                  }`
                : `relative inline-flex h-16 items-center gap-2 whitespace-nowrap px-3 text-sm font-medium transition ${
                    ativo
                      ? 'text-asphalt-950 dark:text-white'
                      : 'text-asphalt-500 hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:text-white'
                  }`
            }
          >
            <Icon className="h-4 w-4" aria-hidden />
            {compacto ? (
              area.tituloCurto
            ) : (
              <>
                <span className="xl:hidden">{area.tituloCurto}</span>
                <span className="hidden xl:inline">{area.titulo}</span>
              </>
            )}
            {!compacto && ativo && (
              <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-signal-500" />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export function DocsNav({ area }: { area: DocArea }) {
  return (
    <nav aria-label={area.titulo} className="space-y-8">
      {area.grupos.map((grupo) => (
        <div key={grupo.titulo}>
          <p className="px-3 font-mono text-xs font-medium uppercase tracking-widest text-asphalt-500 dark:text-asphalt-400">
            {grupo.titulo}
          </p>
          <ul className="mt-2 space-y-0.5">
            {grupo.artigos.map((a) => (
              <li key={a.slug}>
                <NavLink
                  to={caminhoDoArtigo(a)}
                  className={({ isActive }) =>
                    `block rounded-lg border-l-2 px-3 py-2 text-[0.95rem] transition ${
                      isActive
                        ? 'border-signal-500 bg-signal-500/5 font-medium text-asphalt-950 dark:bg-signal-500/10 dark:text-white'
                        : 'border-transparent text-asphalt-600 hover:bg-concrete-50 hover:text-asphalt-950 dark:text-asphalt-400 dark:hover:bg-asphalt-900 dark:hover:text-white'
                    }`
                  }
                >
                  {a.titulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
