import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Intro } from '../components/Intro'
import { PainPoints } from '../components/PainPoints'
import { Features } from '../components/Features'
import { SiengeSpotlight } from '../components/SiengeSpotlight'
import { AccessProfiles } from '../components/AccessProfiles'
import { Benefits } from '../components/Benefits'
import { CTASection } from '../components/CTASection'

export function HomePage() {
  const { hash } = useLocation()

  // Links tipo "/#perfis" vindos de outra rota (ex.: Header em /modulos) chegam
  // aqui como navegação de página inteira — o navegador tenta rolar até a
  // âncora antes da seção existir no DOM (SPA), então precisa repetir na mão
  // assim que ela renderizar. O rAF empurra pra depois do <ScrollRestoration />
  // do react-router (App.tsx), que senão reseta o scroll de volta ao topo.
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <>
      <Intro />
      <PainPoints />
      <Features />
      <SiengeSpotlight />
      <AccessProfiles />
      <Benefits />
      <div className="stripe-divider h-2.5" aria-hidden="true" />
      <CTASection />
    </>
  )
}
