
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
import ClaimDetails from "./pages/ClaimDetails";
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import Notifications from "./pages/Notifications";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Corporates from "./pages/corporate/Corporates";
import CorporateDetail from "./pages/corporate/CorporateDetail";
import CorporateForm from "./pages/corporate/CorporateForm";
import Companies from "./pages/corporate/Companies";
import CompanyDetail from "./pages/corporate/CompanyDetail";
import CompanyForm from "./pages/corporate/CompanyForm";
import Employees from "./pages/corporate/Employees";
import EmployeeDetail from "./pages/corporate/EmployeeDetail";
import EmployeeForm from "./pages/corporate/EmployeeForm";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
        path="/claims/:claimId" 
        element={
          <ProtectedRoute>
            <ClaimDetails />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/patients/:patientId" 
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/doctors/:doctorId" 
        element={
          <ProtectedRoute>
            <DoctorProfile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <Notifications />
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
      
      {/* Admin, Doctor and Corporate only routes */}
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'doctor', 'corporate']}>
            <Analytics />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin, Patient and Corporate only route */}
      <Route 
        path="/billing" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'patient', 'corporate']}>
            <Billing />
          </ProtectedRoute>
        } 
      />
      
      {/* Corporate Routes */}
      <Route 
        path="/corporates" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <Corporates />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/corporates/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <CorporateDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/corporates/new" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CorporateForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/corporates/edit/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <CorporateForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/companies" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <Companies />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/companies/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <CompanyDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/companies/new" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <CompanyForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/companies/edit/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <CompanyForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employees" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <Employees />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employees/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <EmployeeDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employees/new" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <EmployeeForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employees/edit/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'corporate']}>
            <EmployeeForm />
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
    <ThemeProvider defaultTheme="system" storageKey="medflow-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
