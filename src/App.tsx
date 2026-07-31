import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
      {/* getKey por pathname+hash: sem isso, voltar pra "/#perfis" reusa a mesma
          chave ("default") de uma visita anterior à "/" sem hash, e o scroll
          salvo daquela visita (ex.: topo) vence o scrollIntoView manual do
          HomePage — cada âncora precisa da própria posição lembrada. */}
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
