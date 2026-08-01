import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Intro } from '../components/Intro'
import { PainPoints } from '../components/PainPoints'
import { DayWithKargo } from '../components/DayWithKargo'
import { Features } from '../components/Features'
import { SiengeSpotlight } from '../components/SiengeSpotlight'
import { AccessProfiles } from '../components/AccessProfiles'
import { Benefits } from '../components/Benefits'
import { CTASection } from '../components/CTASection'

export function HomePage() {
  const { hash } = useLocation()

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
      <DayWithKargo />
      <Features />
      <SiengeSpotlight />
      <AccessProfiles />
      <Benefits />
      <div className="stripe-divider h-2.5" aria-hidden="true" />
      <CTASection />
    </>
  )
}
