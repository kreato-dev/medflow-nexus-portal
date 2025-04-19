
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { checkInstallable, installPWA } from '@/utils/pwa-utils';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function InstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAndSetInstallable = async () => {
      const installable = await checkInstallable();
      setCanInstall(installable);
      // Only show the prompt if the app is installable and not already installed
      if (installable && !window.matchMedia('(display-mode: standalone)').matches) {
        // Wait a bit before showing the prompt to not overwhelm the user
        setTimeout(() => setIsVisible(true), 3000);
      }
    };

    checkAndSetInstallable();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      window.deferredPrompt = e;
      // Check again if the app is installable
      checkAndSetInstallable();
    };

    // Add the event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      // Hide the install button
      setCanInstall(false);
      setIsVisible(false);
      // Clear the saved prompt
      window.deferredPrompt = null;
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Clean up event listeners
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    await installPWA();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !canInstall) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 md:w-80 z-50 shadow-lg border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Download className="mr-2 h-5 w-5" />
          Install MedFlow App
        </CardTitle>
        <CardDescription>
          Add to your home screen for easier access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Button onClick={handleInstall} className="flex-1">
            Install
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
