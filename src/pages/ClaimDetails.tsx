
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calendar, Download, Printer, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useEffect } from 'react';

// Mock claim data
const mockClaim = {
  id: 'claim-001',
  status: 'pending',
  submittedDate: '2023-10-15',
  lastUpdated: '2025-04-17',
  patient: {
    name: 'Fatima Ahmed',
    id: 'patient-001'
  },
  totalAmount: 3500,
  insurancePlan: 'EFU Health Insurance',
  provider: {
    name: 'Dr. Ali Khan',
    id: 'practitioner-001'
  },
  diagnosis: [
    {
      name: 'Dengue fever',
      code: 'A90'
    }
  ],
  services: [
    {
      name: 'Consultation, established patient',
      code: '99213',
      date: '2023-10-10',
      quantity: 1,
      amount: 3500
    }
  ],
  insurance: {
    plan: 'EFU Health Insurance',
    coverageId: 'coverage-001',
    authRef: 'auth-001'
  }
};

export default function ClaimDetails() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(mockClaim);
  
  // In a real application, fetch the claim data based on the ID
  useEffect(() => {
    // Simulate API call
    // In a real app, you would fetch data from your backend
    console.log(`Fetching claim details for ${claimId}`);
    // setClaim(fetchedData)
  }, [claimId]);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-muted/20';
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF or other file format
    alert('Downloading claim details as PDF...');
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-8 print:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/claims')}
              >
                Back to Claims
              </Button>
              <h1 className="text-2xl font-bold">Claim {claim.id}</h1>
              <Badge className={getStatusColor(claim.status)}>
                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Submitted on {claim.submittedDate}
            </p>
          </div>
          
          <div className="flex gap-2 self-start">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="default" size="sm">
              Actions
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Claim Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status</span>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Last updated on</span>
                  <span>{claim.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Patient Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{claim.patient.name}</span>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Patient ID</span>
                  <span>{claim.patient.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Amount Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">₨ {claim.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{claim.insurancePlan}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Claim Details</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Information about the healthcare services provided
            </p>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Provider Information */}
                  <div>
                    <h3 className="font-medium mb-3">Provider Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-medium">{claim.provider.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provider ID</p>
                        <p className="font-medium">{claim.provider.id}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Diagnosis */}
                  <div>
                    <h3 className="font-medium mb-3">Diagnosis</h3>
                    {claim.diagnosis.map((diag, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm text-muted-foreground">Diagnosis {index + 1}</p>
                        <div className="flex justify-between">
                          <p className="font-medium">{diag.name}</p>
                          <p className="text-sm font-medium">{diag.code}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Services & Items */}
                  <div>
                    <h3 className="font-medium mb-3">Services & Items</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="pb-2">Service</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Quantity</th>
                            <th className="pb-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {claim.services.map((service, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 pr-4">
                                <div>{service.name}</div>
                                <div className="text-xs text-muted-foreground">{service.code}</div>
                              </td>
                              <td className="py-3 pr-4">{service.date}</td>
                              <td className="py-3 pr-4">{service.quantity}</td>
                              <td className="py-3 text-right">₨ {service.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={3} className="py-3 text-right font-medium">Total</td>
                            <td className="py-3 text-right font-medium">₨ {claim.totalAmount.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Insurance Information</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Details about the insurance coverage for this claim
            </p>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Insurance Plan</p>
                    <p className="font-medium">{claim.insurance.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage ID</p>
                    <p className="font-medium">{claim.insurance.coverageId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pre-Authorization Reference</p>
                    <p className="font-medium">{claim.insurance.authRef}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Alert variant="default" className="bg-muted/30 border-muted">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need help with this claim?</AlertTitle>
            <AlertDescription>
              Contact our support team at support@medflow.com or call +92 321 9876543
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </MainLayout>
  );
}
