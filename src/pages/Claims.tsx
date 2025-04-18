
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { exportToPDF, exportToExcel } from '@/utils/export-utils';

// Mock claims data
const mockClaims = [
  {
    id: 'claim-001',
    patient: 'Fatima Ahmed',
    patientId: 'patient-001',
    provider: 'Dr. Ali Khan',
    service: 'Consultation',
    date: '2023-10-15',
    amount: 3500,
    status: 'pending',
    insurancePlan: 'EFU Health Insurance'
  },
  {
    id: 'claim-002',
    patient: 'Ahmed Khan',
    patientId: 'patient-002',
    provider: 'Dr. Saima Jabeen',
    service: 'Blood Test',
    date: '2023-10-12',
    amount: 2200,
    status: 'approved',
    insurancePlan: 'Jubilee Insurance'
  },
  {
    id: 'claim-003',
    patient: 'Zainab Ali',
    patientId: 'patient-003',
    provider: 'Dr. Hamid Raza',
    service: 'X-Ray',
    date: '2023-10-10',
    amount: 4500,
    status: 'rejected',
    insurancePlan: 'Adamjee Insurance'
  },
  {
    id: 'claim-004',
    patient: 'Bilal Ahmad',
    patientId: 'patient-004',
    provider: 'Dr. Nadia Khan',
    service: 'Annual Physical',
    date: '2023-10-08',
    amount: 6000,
    status: 'approved',
    insurancePlan: 'EFU Health Insurance'
  },
  {
    id: 'claim-005',
    patient: 'Sara Imran',
    patientId: 'patient-005',
    provider: 'Dr. Ali Khan',
    service: 'Ultrasound',
    date: '2023-10-05',
    amount: 5500,
    status: 'pending',
    insurancePlan: 'State Life Insurance'
  }
];

export default function Claims() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Get unique insurance plans for filter dropdown
  const insurancePlans = ['all', ...new Set(mockClaims.map(claim => claim.insurancePlan))];
  
  // Filter claims based on search query and filters
  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      claim.status === statusFilter;
    
    const matchesInsurance = 
      insuranceFilter === 'all' || 
      claim.insurancePlan === insuranceFilter;
    
    // Date filter logic (simplified for demo)
    const claimDate = new Date(claim.date);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);
    
    let matchesDate = true;
    if (dateFilter === '30days') {
      matchesDate = claimDate >= thirtyDaysAgo;
    } else if (dateFilter === '90days') {
      matchesDate = claimDate >= ninetyDaysAgo;
    }
    
    return matchesSearch && matchesStatus && matchesInsurance && matchesDate;
  });
  
  const getStatusBadge = (status: string) => {
    let className = '';
    let icon = null;
    
    switch (status) {
      case 'approved':
        className = 'bg-success/10 text-success border-success/20';
        icon = <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'pending':
        className = 'bg-warning/10 text-warning border-warning/20';
        icon = <Clock className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'rejected':
        className = 'bg-destructive/10 text-destructive border-destructive/20';
        icon = <XCircle className="h-3.5 w-3.5 mr-1" />;
        break;
      default:
        className = 'bg-muted/50 text-muted-foreground border-muted/20';
        icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
    
    return (
      <Badge variant="outline" className={className}>
        <span className="flex items-center">
          {icon}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </Badge>
    );
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleExportPDF = () => {
    exportToPDF('claims-content', 'claims-list');
  };
  
  const handleExportExcel = () => {
    const data = filteredClaims.map(claim => ({
      'Claim ID': claim.id,
      'Patient': claim.patient,
      'Patient ID': claim.patientId,
      'Provider': claim.provider,
      'Service': claim.service,
      'Date': claim.date,
      'Amount': claim.amount,
      'Status': claim.status,
      'Insurance Plan': claim.insurancePlan
    }));
    
    exportToExcel(data, 'claims-list');
  };

  return (
    <MainLayout>
      <div className="space-y-6" id="claims-content">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Claims Management</h1>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Submit New Claim
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select
              defaultValue={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              defaultValue={insuranceFilter}
              onValueChange={setInsuranceFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by insurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Insurances</SelectItem>
                {insurancePlans.filter(p => p !== 'all').map(plan => (
                  <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              defaultValue={dateFilter}
              onValueChange={setDateFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Claims List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredClaims.length}</strong> of <strong>{mockClaims.length}</strong> claims
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Claim ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                        Provider
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                        Service
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-muted/30">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Link 
                            to={`/claims/${claim.id}`} 
                            className="flex items-center text-primary hover:underline"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            {claim.id}
                          </Link>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Link 
                            to={`/patients/${claim.patientId}`}
                            className="hover:underline"
                          >
                            {claim.patient}
                          </Link>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                          {claim.provider}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                          {claim.service}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {claim.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap font-medium">
                          ₨ {claim.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(claim.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/claims/${claim.id}`}>
                              View
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredClaims.length === 0 && (
                  <div className="py-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No claims found</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
