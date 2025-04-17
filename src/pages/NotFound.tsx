
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  // Automatic redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-warning/10 p-3 rounded-full mb-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-warning" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">404</h1>
          <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
          <p className="text-muted-foreground mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              <Link to={isAuthenticated ? '/dashboard' : '/'}>
                {isAuthenticated ? 'Dashboard' : 'Home'}
              </Link>
            </Button>
          </div>
          
          {isAuthenticated && user && (
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Looking for something specific?</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {user.role === 'patient' && (
                  <>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/appointments">My Appointments</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/doctors">Find Doctors</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/records">My Records</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/messages">My Messages</Link>
                    </Button>
                  </>
                )}
                
                {user.role === 'doctor' && (
                  <>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/appointments">My Schedule</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/patients">My Patients</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/messages">Messages</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/records">Medical Records</Link>
                    </Button>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/patients">Patients</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/doctors">Doctors</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/appointments">Appointments</Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <Link to="/analytics">Analytics</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-8">
            You will be automatically redirected to {isAuthenticated ? 'dashboard' : 'home'} in a few seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
