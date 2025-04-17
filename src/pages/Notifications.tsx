
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, CheckCheck, Clock, FileText, Heart, ShieldAlert, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: 'New lab results available',
    description: "Faisal Ahmed's blood test results are ready for review.",
    time: '29 minutes ago',
    type: 'lab-results',
    isNew: true
  },
  {
    id: 2,
    title: 'Appointment rescheduled',
    description: 'Zainab Khan rescheduled her appointment to tomorrow at 2:00 PM.',
    time: 'about 1 hour ago',
    type: 'appointments',
    isNew: true
  },
  {
    id: 3,
    title: 'Payment received',
    description: 'Received payment of ₨ 4,500 from Ayesha Malik for consultation.',
    time: 'about 3 hours ago',
    type: 'payments',
    isNew: false
  },
  {
    id: 4,
    title: 'New authorization request',
    description: "Insurance approval needed for Hamid Raza's MRI scan.",
    time: 'about 5 hours ago',
    type: 'authorizations',
    isNew: false
  },
  {
    id: 5,
    title: 'Prescription refill request',
    description: 'Saima Bibi requested a refill for her hypertension medication.',
    time: '1 day ago',
    type: 'prescriptions',
    isNew: false
  }
];

// Notification type icons mapping
const typeIcons = {
  'appointments': <Clock className="h-5 w-5" />,
  'lab-results': <FileText className="h-5 w-5" />,
  'payments': <FileText className="h-5 w-5" />,
  'authorizations': <ShieldAlert className="h-5 w-5" />,
  'prescriptions': <Heart className="h-5 w-5" />
};

// Notification type colors mapping
const typeColors = {
  'appointments': 'bg-primary/10 text-primary',
  'lab-results': 'bg-success/10 text-success',
  'payments': 'bg-secondary/10 text-secondary',
  'authorizations': 'bg-warning/10 text-warning',
  'prescriptions': 'bg-accent/10 text-accent'
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  
  const unreadCount = notifications.filter(n => n.isNew).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.isNew;
    return notification.type === filter;
  });
  
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const handleMarkRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isNew: false } : n
    ));
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <X className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <Card>
            <CardHeader className="pb-0">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="flex-none">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-none">Unread</TabsTrigger>
                <TabsTrigger value="appointments" className="flex-none">Appointments</TabsTrigger>
                <TabsTrigger value="lab-results" className="flex-none">Lab Results</TabsTrigger>
                <TabsTrigger value="payments" className="flex-none">Payments</TabsTrigger>
                <TabsTrigger value="authorizations" className="flex-none">Authorizations</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You don't have any {filter !== 'all' ? filter : ''} notifications at the moment.
                  </p>
                </div>
              ) : (
                <ul className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <li key={notification.id} className={cn(
                      "p-4 relative hover:bg-muted/30 transition-colors",
                      notification.isNew && "bg-muted/20"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex-shrink-0 p-2 rounded-full",
                          typeColors[notification.type as keyof typeof typeColors]
                        )}>
                          {typeIcons[notification.type as keyof typeof typeIcons]}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{notification.title}</h3>
                            {notification.isNew && (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {notification.isNew && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMarkRead(notification.id)}
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => handleDismiss(notification.id)}
                            title="Dismiss"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
}
