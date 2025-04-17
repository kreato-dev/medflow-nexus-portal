
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, UserRole } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Analytics from "./pages/Analytics";
import MedicalRecords from "./pages/MedicalRecords";
import Messages from "./pages/Messages";
import Claims from "./pages/Claims";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Protected route component with role-based access control
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: JSX.Element, 
  allowedRoles?: UserRole[] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Routes for all authenticated users */}
      <Route 
        path="/appointments" 
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/records" 
        element={
          <ProtectedRoute>
            <MedicalRecords />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/messages" 
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/claims" 
        element={
          <ProtectedRoute>
            <Claims />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin and Doctor only routes */}
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
            <Patients />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin and Patient only routes */}
      <Route 
        path="/doctors" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'patient']}>
            <Doctors />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin and Doctor only routes */}
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
            <Analytics />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin and Patient only route */}
      <Route 
        path="/billing" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'patient']}>
            <Billing />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all not found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
