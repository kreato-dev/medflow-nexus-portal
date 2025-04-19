
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash2, Mail, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
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

export default function NotificationDetail() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  
  // Find notification by ID or show a not found state
  const notification = mockNotifications.find(n => n.id === notificationId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(notification?.message || '');
  
  if (!notification) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Notification Not Found</h2>
          <p className="text-muted-foreground mb-6">The notification you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/notifications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notifications
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleDelete = () => {
    // In a real app, you would make an API call to delete the notification
    toast.success('Notification deleted successfully');
    navigate('/notifications');
  };

  const handleEdit = () => {
    if (isEditing) {
      // In a real app, you would make an API call to update the notification
      toast.success('Notification updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleMarkAsRead = () => {
    // In a real app, you would make an API call to mark the notification as read
    toast.success('Notification marked as read');
    navigate('/notifications');
  };

  // Icon based on notification type
  const getIconByType = () => {
    switch (notification.type) {
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

  // Badge styling based on notification type
  const getBadgeVariant = () => {
    switch (notification.type) {
      case 'reminder':
        return "bg-primary/10 text-primary border-primary/20";
      case 'alert':
        return "bg-destructive/10 text-destructive border-destructive/20";
      case 'success':
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-info/10 text-info border-info/20";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')} className="px-0 sm:px-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notifications
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                {getIconByType()}
                <CardTitle>{notification.title}</CardTitle>
              </div>
              <Badge variant="outline" className={getBadgeVariant()}>
                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(notification.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-md"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
            ) : (
              <p className="text-foreground whitespace-pre-line">{notification.message}</p>
            )}
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{notification.isRead ? 'Read' : 'Unread'}</span>
            </div>
            {!notification.isRead && (
              <Button variant="ghost" size="sm" onClick={handleMarkAsRead}>
                Mark as read
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
