import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force clean reload once to bust aggressive browser caching of dev bundles
const BUNDLE_VERSION = 'v_cache_bust_106';
if (localStorage.getItem('scanpass_bundle_version') !== BUNDLE_VERSION) {
  localStorage.setItem('scanpass_bundle_version', BUNDLE_VERSION);
  window.location.reload();
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
