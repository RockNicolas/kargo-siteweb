import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-asphalt-950">
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
