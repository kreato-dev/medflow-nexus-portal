
/**
 * Utility functions for PWA functionality
 */

// Check if the app is in standalone/installed mode
export const isAppInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         // @ts-ignore (iOS Safari)
         window.navigator.standalone === true;
};

// Check if service worker is supported
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// Check if the app is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void
): () => void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Register the service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    console.warn('Service workers are not supported by this browser');
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('ServiceWorker registration successful with scope:', registration.scope);
    return registration;
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    return null;
  }
};

// Check for service worker updates
export const checkForUpdates = async (): Promise<void> => {
  if (!isServiceWorkerSupported()) {
    return;
  }
  
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.update();
  }
};

// Update service worker immediately
export const updateServiceWorker = (): void => {
  if (!isServiceWorkerSupported() || !navigator.serviceWorker.controller) {
    return;
  }
  
  navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
};

// Clear the PWA cache
export const clearCache = async (): Promise<boolean> => {
  if ('caches' in window) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
    return true;
  }
  return false;
};
