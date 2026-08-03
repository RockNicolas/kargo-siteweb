import { createBrowserRouter, Navigate } from 'react-router-dom'
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
        path: 'about',
        element: <SobrePage />,
      },
      {
        path: 'sobre',
        element: <Navigate to="/about" replace />,
      },
    ],
  },
])
