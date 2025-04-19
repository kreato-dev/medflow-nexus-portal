
import { useState, useEffect } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { isOnline, setupNetworkListeners } from '@/utils/pwa-utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function OfflineIndicator() {
  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    const cleanup = setupNetworkListeners(
      () => setOnline(true),
      () => setOnline(false)
    );
    
    return cleanup;
  }, []);

  if (online) {
    return null;
  }

  return (
    <Alert variant="destructive" className="fixed bottom-4 left-4 right-4 md:left-auto md:w-72 z-50 flex items-center">
      <WifiOff className="h-4 w-4 mr-2" />
      <AlertDescription>
        You're offline. Some features may be unavailable.
      </AlertDescription>
    </Alert>
  );
}
