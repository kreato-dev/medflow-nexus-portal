
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './utils/pwa-utils'

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    registerServiceWorker()
      .then(registration => {
        // Listen for new service workers
        if (registration) {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                  // You can show a notification to the user here
                }
              });
            }
          });
        }
      })
      .catch(console.error);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
