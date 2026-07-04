import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { EmployeeProvider } from './context/EmployeeContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)