import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
      <ScrollRestoration getKey={(location) => location.pathname + location.hash} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
