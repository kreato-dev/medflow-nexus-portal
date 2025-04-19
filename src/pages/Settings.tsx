
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { PWASettings } from "@/components/pwa/PWASettings";

const Settings = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Profile</h3>
                      <p className="text-muted-foreground text-sm">
                        Your profile information and settings
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <div className="text-sm">{user?.name}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <div className="text-sm">{user?.email}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Role</label>
                        <div className="text-sm capitalize">{user?.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Preference settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="application" className="space-y-4 mt-4">
            <PWASettings />
            
            <Card>
              <CardHeader>
                <CardTitle>About MedFlow Nexus</CardTitle>
                <CardDescription>
                  Application information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Version</label>
                    <div className="text-sm">1.0.0</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Updated</label>
                    <div className="text-sm">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
