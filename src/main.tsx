// ─── Legacy CSS (orden idéntico al que tenían los <link> en cada HTML)
// Nota: Bootstrap y Font Awesome van en index.html como <link> ya que
// son archivos estáticos de /public/vendor/ que Vite no procesa como módulos.
import '@/styles/pages/_legacy-global.css';
import '@/styles/pages/_legacy-mejoras.css';
import '@/styles/pages/_legacy-profesional.css';
import '@/styles/pages/_legacy-elite.css';

// ─── Orquestador principal (Fase de nueva UI - Se activará gradualmente)
import '@/styles/components/_product-card.css';
import '@/styles/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('[MuscleRice] No se encontró el elemento #root en index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
