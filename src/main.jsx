import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FullFeaturedApp from './FullFeaturedApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FullFeaturedApp />
  </StrictMode>,
)
