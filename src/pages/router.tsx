import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import { HomePage } from './HomePage'
import { SobrePage } from './SobrePage'
import { DemoPage } from './DemoPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <SobrePage />,
      },
      {
        path: 'sobre',
        element: <Navigate to="/about" replace />,
      },
    ],
  },
  {
    // Fora do layout de marketing (sem Header/Footer) — essa tela replica o
    // painel de verdade, então tem a própria "chrome" (sidebar, topo etc.).
    path: '/demo',
    element: <DemoPage />,
  },
  {
    // Documentação pública (manual + referência da API). Também fora do layout de marketing, com
    // barra e menu lateral próprios. Carregada sob demanda: não pesa no bundle da home.
    path: '/docs',
    lazy: async () => ({ Component: (await import('../docs/DocsLayout')).DocsLayout }),
    // Tela vazia (na cor do tema) enquanto o pedaço da documentação baixa no acesso direto a /docs.
    hydrateFallbackElement: <div className="min-h-screen bg-white dark:bg-black" />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('../docs/DocsHome')).DocsHome }),
      },
      {
        path: ':area',
        lazy: async () => ({ Component: (await import('../docs/DocsAreaRedirect')).DocsAreaRedirect }),
      },
      {
        path: ':area/:slug',
        lazy: async () => ({ Component: (await import('../docs/DocArticlePage')).DocArticlePage }),
      },
    ],
  },
])
