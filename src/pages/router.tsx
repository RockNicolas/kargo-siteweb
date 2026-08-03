import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from './HomePage'
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
        path: 'sobre',
        element: <SobrePage />,
      },
    ],
  },
])
