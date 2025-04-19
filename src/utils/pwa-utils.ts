
// PWA Utility functions
import { toast } from "sonner";

// Check if the app is online
export const isOnline = () => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
};

// Setup network listeners to detect online/offline status
export const setupNetworkListeners = (
  onlineCallback: () => void,
  offlineCallback: () => void
) => {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);

  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
};

// Register service worker for PWA
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported by this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
};

// Check if the app can be installed (is installable)
export const checkInstallable = async () => {
  if (!window.deferredPrompt) {
    return false;
  }
  return true;
};

// Install the PWA app
export const installPWA = async () => {
  const promptEvent = window.deferredPrompt;
  
  if (!promptEvent) {
    toast.error("Installation is not available");
    return false;
  }
  
  // Show the install prompt
  promptEvent.prompt();
  
  // Wait for the user to respond to the prompt
  const choiceResult = await promptEvent.userChoice;
  
  // Clear the saved prompt since it can't be used again
  window.deferredPrompt = null;
  
  if (choiceResult.outcome === 'accepted') {
    toast.success("Installation successful!");
    return true;
  } else {
    toast.info("Installation was declined");
    return false;
  }
};

// Check for service worker updates
export const checkForUpdates = async () => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      return false;
    }
    
    await registration.update();
    return true;
  } catch (error) {
    console.error('Error checking for updates:', error);
    return false;
  }
};

// Clear the PWA cache
export const clearCache = async () => {
  if (!('caches' in window)) {
    toast.error("Cache API not supported");
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    toast.success("Cache cleared successfully");
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    toast.error("Failed to clear cache");
    return false;
  }
};
