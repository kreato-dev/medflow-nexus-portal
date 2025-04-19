
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome to MedFlow Nexus!',
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login handlers - quick access for testing
  const loginAsAdmin = () => {
    setEmail('admin@example.com');
    setPassword('password123');
  };

  const loginAsDoctor = () => {
    setEmail('doctor@example.com');
    setPassword('password123');
  };

  const loginAsPatient = () => {
    setEmail('patient@example.com');
    setPassword('password123');
  };

  const loginAsCorporate = () => {
    setEmail('corporate@example.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary rounded-md p-2">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">MedFlow Nexus Portal</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/reset-password" 
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center w-full">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Create account
              </Link>
            </div>
            
            <div className="w-full">
              <p className="text-xs text-center text-muted-foreground mb-2">
                Demo accounts for testing
              </p>
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsAdmin}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsDoctor}
                  className="text-xs"
                >
                  Doctor
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsPatient}
                  className="text-xs"
                >
                  Patient
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loginAsCorporate}
                  className="text-xs"
                >
                  Corporate
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
