import { CssBaseline } from '@mui/material'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <CssBaseline/>
    <App />
  </StrictMode>,
)
