
import { useState } from 'react';
import { RefreshCw, Trash2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkForUpdates, clearCache, isAppInstalled, updateServiceWorker } from '@/utils/pwa-utils';
import { toast } from "sonner";

export function PWASettings() {
  const [isClearing, setIsClearing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const installed = isAppInstalled();

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      const cleared = await clearCache();
      if (!cleared) {
        toast({
          title: 'Could not clear cache',
          description: 'Cache API not available',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error clearing cache',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleCheckForUpdates = async () => {
    setIsUpdating(true);
    try {
      await checkForUpdates();
      toast({
        title: 'Checking for updates',
        description: 'Checking for application updates...',
      });
      
      // Wait a moment before allowing another update check
      setTimeout(() => setIsUpdating(false), 5000);
    } catch (error) {
      toast({
        title: 'Error checking for updates',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      setIsUpdating(false);
    }
  };

  const handleApplyUpdates = () => {
    updateServiceWorker();
    toast({
      title: 'Applying updates',
      description: 'The application will refresh to apply updates.',
    });
    
    // Give the service worker a moment to activate
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Smartphone className="mr-2 h-5 w-5" />
          PWA Settings
        </CardTitle>
        <CardDescription>
          Manage your installed application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          {installed ? (
            <p className="text-green-600 dark:text-green-400">
              ✓ You are using the installed application
            </p>
          ) : (
            <p>
              You can install this app on your device for offline access and improved performance.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleCheckForUpdates}
            disabled={isUpdating}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Check for updates
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleApplyUpdates}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Apply updates
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleClearCache}
            disabled={isClearing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear cache
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
