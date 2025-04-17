
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Filter,
  Download,
  CreditCard,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Claims = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock claims data
  const claims = [
    {
      id: 'CLM-001',
      patientName: 'John Doe',
      patientId: 'P-123',
      doctorName: 'Dr. Jane Smith',
      appointmentDate: '2025-03-15',
      claimDate: '2025-03-17',
      amount: 150.00,
      status: 'approved',
      insuranceProvider: 'Blue Cross',
      policyNumber: 'BC123456789',
      service: 'Consultation'
    },
    {
      id: 'CLM-002',
      patientName: 'Alice Johnson',
      patientId: 'P-124',
      doctorName: 'Dr. Jane Smith',
      appointmentDate: '2025-03-22',
      claimDate: '2025-03-24',
      amount: 350.50,
      status: 'pending',
      insuranceProvider: 'Aetna',
      policyNumber: 'AE987654321',
      service: 'Lab Tests'
    },
    {
      id: 'CLM-003',
      patientName: 'Bob Williams',
      patientId: 'P-125',
      doctorName: 'Dr. Jane Smith',
      appointmentDate: '2025-04-01',
      claimDate: '2025-04-02',
      amount: 75.00,
      status: 'denied',
      insuranceProvider: 'Cigna',
      policyNumber: 'CI456789123',
      service: 'Follow-up'
    },
    {
      id: 'CLM-004',
      patientName: 'Emma Davis',
      patientId: 'P-126',
      doctorName: 'Dr. Jane Smith',
      appointmentDate: '2025-04-10',
      claimDate: '2025-04-12',
      amount: 550.75,
      status: 'approved',
      insuranceProvider: 'UnitedHealth',
      policyNumber: 'UH789123456',
      service: 'X-Ray and Consultation'
    }
  ];
  
  // Filter claims based on search query and status filter
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      statusFilter === 'all' || 
      claim.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Role-specific actions and content
  const renderActionButton = () => {
    if (user?.role === 'doctor') {
      return (
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Submit New Claim
        </Button>
      );
    } else if (user?.role === 'admin') {
      return (
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Claim
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Claims
          </Button>
        </div>
      );
    } else {
      return (
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          View Insurance Details
        </Button>
      );
    }
  };
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'denied':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'denied':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Claims Management</h1>
          {renderActionButton()}
        </div>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                <h3 className="text-2xl font-bold mt-1">42</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <h3 className="text-2xl font-bold mt-1">25</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <h3 className="text-2xl font-bold mt-1">$8,245</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Claims</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Claims list */}
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date
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
                        <tr key={claim.id}>
                          <td className="px-4 py-4 whitespace-nowrap font-medium">
                            {claim.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>
                              <div>{claim.patientName}</div>
                              <div className="text-xs text-muted-foreground">{claim.patientId}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {claim.service}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap font-medium">
                            ${claim.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>
                              <div>{new Date(claim.claimDate).toLocaleDateString()}</div>
                              <div className="text-xs text-muted-foreground">
                                Appointment: {new Date(claim.appointmentDate).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(claim.status)}
                              <Badge
                                variant="outline"
                                className={cn("ml-2", getStatusColor(claim.status))}
                              >
                                {claim.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClaims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{claim.service}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(claim.status)}
                    >
                      {claim.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm font-medium">${claim.amount.toFixed(2)}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <span className="text-muted-foreground">Submitted:</span> {new Date(claim.claimDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Patient:</span> {claim.patientName}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Provider:</span> {claim.insuranceProvider}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Policy:</span> {claim.policyNumber}
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Claims;
