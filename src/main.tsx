import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { getConsent } from './lib/consent';
import { initTracking } from './lib/tracking';
import './index.css';

// Restaura tracking si el usuario ya había aceptado en una visita anterior.
// Si nunca aceptó o rechazó, el banner pedirá decisión y no carga nada.
if (getConsent() === 'accepted') {
  initTracking();
}

const initApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  const app = (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );

  // Si react-snap prerendereó el HTML estático, hidratamos en vez de remontar.
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}