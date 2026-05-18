import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { getConsent } from './lib/consent';
import { initTracking } from './lib/tracking';
import './index.css';

// Restaura tracking si el usuario ya había aceptado en una visita anterior.
// Si nunca aceptó o rechazó, el banner pedirá decisión y no carga nada.
if (getConsent() === 'accepted') {
  initTracking();
}

// Initialize app
const initApp = () => {
  
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}