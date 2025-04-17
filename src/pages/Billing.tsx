
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Receipt,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Billing = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Mock invoices data
  const invoices = [
    {
      id: 'INV-2025-001',
      patientName: 'John Doe',
      patientId: 'P-123',
      serviceName: 'Cardiology Consultation',
      amount: 120.00,
      date: '2025-04-10',
      dueDate: '2025-04-25',
      status: 'paid',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'INV-2025-002',
      patientName: 'Alice Johnson',
      patientId: 'P-124',
      serviceName: 'Lab Tests - Complete Blood Count',
      amount: 85.50,
      date: '2025-04-12',
      dueDate: '2025-04-27',
      status: 'pending',
      paymentMethod: 'Insurance'
    },
    {
      id: 'INV-2025-003',
      patientName: 'Bob Williams',
      patientId: 'P-125',
      serviceName: 'X-Ray - Chest',
      amount: 210.75,
      date: '2025-04-05',
      dueDate: '2025-04-20',
      status: 'overdue',
      paymentMethod: 'Insurance'
    },
    {
      id: 'INV-2025-004',
      patientName: 'Emma Davis',
      patientId: 'P-126',
      serviceName: 'Follow-up Appointment',
      amount: 75.00,
      date: '2025-04-15',
      dueDate: '2025-04-30',
      status: 'paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'INV-2025-005',
      patientName: 'John Doe',
      patientId: 'P-123',
      serviceName: 'Prescription Renewal',
      amount: 45.25,
      date: '2025-04-18',
      dueDate: '2025-05-03',
      status: 'pending',
      paymentMethod: 'Credit Card'
    }
  ];
  
  // Filter invoices based on search and filter status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      invoice.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  // Status badge and color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };
  
  // Payment method details
  const paymentMethods = [
    {
      id: 1,
      name: 'Credit Card',
      last4: '4242',
      expiry: '04/27',
      type: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      name: 'Bank Account',
      last4: '6789',
      type: 'ACH',
      isDefault: false
    }
  ];
  
  // Role-specific cards and actions
  const renderRoleSpecificContent = () => {
    if (user?.role === 'patient') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <h3 className="text-2xl font-bold mt-1">$85.50</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <Button className="w-full mt-4">Pay Now</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Claims Status</p>
                  <h3 className="text-2xl font-bold mt-1">4 Active</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View Claims</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Year-to-Date Spending</p>
                  <h3 className="text-2xl font-bold mt-1">$780.25</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Download Summary</Button>
            </CardContent>
          </Card>
        </div>
      );
    } else if (user?.role === 'admin') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$24,850</h3>
                  <p className="text-xs text-success mt-1">+12% from last {selectedPeriod}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <h3 className="text-2xl font-bold mt-1">$4,325</h3>
                  <p className="text-xs text-muted-foreground mt-1">12 invoices</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <h3 className="text-2xl font-bold mt-1">$1,250</h3>
                  <p className="text-xs text-destructive mt-1">3 invoices</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Claims</p>
                  <h3 className="text-2xl font-bold mt-1">$18,425</h3>
                  <p className="text-xs text-muted-foreground mt-1">42 claims this {selectedPeriod}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Billing & Payments</h1>
          
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            {user?.role === 'admin' && (
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Invoice
              </Button>
            )}
          </div>
        </div>
        
        {renderRoleSpecificContent()}
        
        {/* Payment methods section for patients */}
        {user?.role === 'patient' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map(method => (
                <Card key={method.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">{method.name}</h3>
                      </div>
                      {method.isDefault && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                          Default
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <div>•••• {method.last4}</div>
                      {method.expiry && <div>Expires {method.expiry}</div>}
                      <div>Type: {method.type}</div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">Set as Default</Button>
                      )}
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Invoices section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Invoices & Transactions</h2>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoices</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Invoice
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
                            Date / Due Date
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
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td className="px-4 py-4 whitespace-nowrap font-medium">
                              {invoice.id}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div>
                                <div>{invoice.patientName}</div>
                                <div className="text-xs text-muted-foreground">{invoice.patientId}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {invoice.serviceName}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap font-medium">
                              ${invoice.amount.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div>
                                <div>{new Date(invoice.date).toLocaleDateString()}</div>
                                <div className="text-xs text-muted-foreground">
                                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(invoice.status)}
                                {getStatusBadge(invoice.status)}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                {invoice.status !== 'paid' && user?.role === 'patient' && (
                                  <Button size="sm">Pay</Button>
                                )}
                                {user?.role === 'admin' && (
                                  <Button variant="outline" size="sm">Edit</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{invoice.id}</CardTitle>
                          <CardDescription>{invoice.serviceName}</CardDescription>
                        </div>
                        {getStatusBadge(invoice.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Amount</span>
                          <span className="text-xl font-bold">${invoice.amount.toFixed(2)}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Invoice Date</span>
                            <span className="text-sm">{new Date(invoice.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Due Date</span>
                            <span className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Patient</span>
                            <span className="text-sm">{invoice.patientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Payment Method</span>
                            <span className="text-sm">{invoice.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      
                      {invoice.status !== 'paid' && user?.role === 'patient' && (
                        <Button className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                      
                      {user?.role === 'admin' && (
                        <Button variant="outline" className="flex items-center gap-1">
                          <RefreshCw className="h-4 w-4" />
                          Update Status
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Billing;
