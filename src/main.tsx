import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home.tsx'
import App from './App.tsx'
import ConfigureDownload from './screens/ConfigureDownload.tsx'
import './index.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="pdf-download" element={<ConfigureDownload />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
