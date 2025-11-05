import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/index.tsx'
import './index.css'
import "@fontsource/roboto/700.css"
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
)
