import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from './HomePage'
import { ModulosPage } from './ModulosPage'
import { SobrePage } from './SobrePage'

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
        path: 'modulos',
        element: <ModulosPage />,
      },
      {
        path: 'sobre',
        element: <SobrePage />,
      },
    ],
  },
])
