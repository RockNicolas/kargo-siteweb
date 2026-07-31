import { Hero } from '../components/Hero'
import { PainPoints } from '../components/PainPoints'
import { Features } from '../components/Features'
import { SiengeSpotlight } from '../components/SiengeSpotlight'
import { AccessProfiles } from '../components/AccessProfiles'
import { Benefits } from '../components/Benefits'
import { CTASection } from '../components/CTASection'

export function HomePage() {
  return (
    <>
      <Hero />
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
