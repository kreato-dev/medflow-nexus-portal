
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search, Clock, Mail, AlertCircle, Info, Bell, CheckCircle, Trash2, MailOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock notification data
const mockNotifications = [
  {
    id: 'notification-001',
    title: 'Appointment Reminder',
    message: 'You have an upcoming appointment with Dr. Khan tomorrow at 2:30 PM. Please arrive 15 minutes early to complete paperwork.',
    type: 'reminder',
    date: '2023-10-20T14:30:00',
    isRead: true,
  },
  {
    id: 'notification-002',
    title: 'Lab Results Available',
    message: 'Your recent blood work results are now available in your medical records. Please review them at your earliest convenience.',
    type: 'info',
    date: '2023-10-19T09:15:00',
    isRead: false,
  },
  {
    id: 'notification-003',
    title: 'Prescription Refill',
    message: 'Your prescription for Lisinopril has been refilled and is ready for pickup at your preferred pharmacy.',
    type: 'success',
    date: '2023-10-18T16:45:00',
    isRead: true,
  },
  {
    id: 'notification-004',
    title: 'Payment Due',
    message: 'You have an outstanding balance of $125.00 for your recent visit. Please make a payment at your earliest convenience to avoid late fees.',
    type: 'alert',
    date: '2023-10-17T10:00:00',
    isRead: false,
  },
];

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  
  // Filter notifications based on search
  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    toast.success('All notifications marked as read');
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
    toast.success('Notification marked as read');
  };
  
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };
  
  const handleViewNotification = (id: string) => {
    navigate(`/notifications/${id}`);
  };
  
  // Group notifications by date
  const groupedNotifications: { [key: string]: typeof mockNotifications } = {};
  filteredNotifications.forEach(notification => {
    const date = new Date(notification.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [];
    }
    groupedNotifications[date].push(notification);
  });
  
  // Get icon based on notification type
  const getIconByType = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <MailOpen className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="text-destructive" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Notifications List */}
        <div className="space-y-8">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">No Notifications</h2>
              <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <div key={date} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {dateNotifications.map((notification, index) => (
                        <div 
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-accent/50 transition-colors cursor-pointer",
                            !notification.isRead && "bg-accent/20"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1">{getIconByType(notification.type)}</div>
                            <div className="flex-1 space-y-1" onClick={() => handleViewNotification(notification.id)}>
                              <div className="flex items-center justify-between">
                                <h4 className={cn(
                                  "font-medium",
                                  !notification.isRead && "font-semibold"
                                )}>
                                  {notification.title}
                                  {!notification.isRead && (
                                    <Badge className="ml-2 h-2 w-2 p-0 rounded-full bg-primary" />
                                  )}
                                </h4>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {new Date(notification.date).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 ml-9 flex items-center gap-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                Mark as read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-destructive"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
