
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  ChevronLeft, 
  ClipboardList, 
  CreditCard, 
  Home, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users, 
  BadgeAlert, 
  BarChartBig,
  Heart,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Define sidebar link types
type SidebarLink = {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
};

// Define sidebar sections
const sidebarLinks: SidebarLink[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Home className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: <Calendar className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: <Users className="h-5 w-5" />,
    roles: ['admin', 'doctor'],
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: <BadgeAlert className="h-5 w-5" />,
    roles: ['admin', 'patient'],
  },
  {
    title: 'Medical Records',
    path: '/records',
    icon: <ClipboardList className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
  {
    title: 'Claims',
    path: '/claims',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: <BarChartBig className="h-5 w-5" />,
    roles: ['admin', 'doctor'],
  },
  {
    title: 'Billing',
    path: '/billing',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['admin', 'patient'],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['admin', 'doctor', 'patient'],
  },
];

export function Sidebar() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const { pathname } = useLocation();

  // Filter links based on user role
  const filteredLinks = user 
    ? sidebarLinks.filter(link => link.roles.includes(user.role))
    : [];

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed z-50 top-4 left-4 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-sidebar border-r border-border transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full"
        )}
      >
        {/* Logo Header */}
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-lg">MedFlow Nexus</div>
          </Link>
          
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
            </Button>
          )}
        </div>
        
        <Separator />
        
        {/* User Info */}
        {user && (
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs opacity-70 capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        )}
        
        <Separator />
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {link.icon}
                <span className="ml-3">{link.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            MedFlow Nexus v1.0
          </div>
        </div>
      </div>
    </>
  );
}
