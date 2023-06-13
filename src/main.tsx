import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import StateProvider from './Store/StoreContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
   <StateProvider>
              <App />
      </StateProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
