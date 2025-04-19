
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { isAppInstalled } from '@/utils/pwa-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Don't show the prompt if the app is already installed
    if (isAppInstalled()) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, so clear it
    setDeferredPrompt(null);
    
    // Hide the install button regardless of outcome
    setShowPrompt(false);
    
    console.log(`User ${outcome} the installation`);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Install MedFlow Nexus</CardTitle>
        <CardDescription>Install our app for a better experience</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Install this application on your device for quick and easy access when you're on the go.
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setShowPrompt(false)}>
          Not now
        </Button>
        <Button onClick={handleInstallClick} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Install
        </Button>
      </CardFooter>
    </Card>
  );
}
