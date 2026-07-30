import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PainPoints } from './components/PainPoints'
import { Features } from './components/Features'
import { SiengeSpotlight } from './components/SiengeSpotlight'
import { AccessProfiles } from './components/AccessProfiles'
import { Benefits } from './components/Benefits'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-asphalt-950">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <SiengeSpotlight />
        <AccessProfiles />
        <Benefits />
        <div className="stripe-divider h-2.5" aria-hidden="true" />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
