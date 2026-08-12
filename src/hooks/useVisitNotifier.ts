import { useEffect } from 'react'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
const STORAGE_KEY = 'kargo_visit_notified_on'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Envia um aviso por e-mail (via Web3Forms) quando alguém acessa o site,
 * no máximo uma vez por dia por navegador (marcado em localStorage).
 * Não roda em desenvolvimento para não gerar avisos enquanto você testa localmente.
 */
export function useVisitNotifier() {
  useEffect(() => {
    if (import.meta.env.DEV) return
    if (!WEB3FORMS_ACCESS_KEY) return
    if (localStorage.getItem(STORAGE_KEY) === todayKey()) return

    let cancelled = false

    const notify = async () => {
      let local = 'Localização não identificada'
      try {
        const geoRes = await fetch('https://ipwho.is/')
        const geo = await geoRes.json()
        if (geo.success) {
          local = [geo.city, geo.region, geo.country].filter(Boolean).join(' / ')
        }
      } catch {
        // segue sem localização
      }

      if (cancelled) return

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Novo acesso ao site — ${local}`,
            from_name: 'Kargo — Aviso de acesso',
            Local: local,
            Pagina: window.location.pathname,
            Referencia: document.referrer || 'Direto',
            Navegador: navigator.userAgent,
            Horario: new Date().toLocaleString('pt-BR'),
          }),
        })
        const data = await res.json()
        if (data.success) {
          localStorage.setItem(STORAGE_KEY, todayKey())
        }
      } catch {
        // falha silenciosa, tenta de novo na próxima visita
      }
    }

    notify()

    return () => {
      cancelled = true
    }
  }, [])
}
