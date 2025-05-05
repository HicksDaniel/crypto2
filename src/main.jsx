import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes.jsx'
import { RouterProvider } from 'react-router'
import { PrimeReactProvider } from 'primereact/api'
import 'primeicons/primeicons.css';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>,
)
