import React from 'react'
import ReactDOM from 'react-dom/client'

import { AlertProvider } from 'components/alert/AlertContext'
import { ThemeProvider } from 'components/ThemeProvider'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
