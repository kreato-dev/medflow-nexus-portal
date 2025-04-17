
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Search, Filter, Trash2, Edit, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock data for patients
const patientsData = [
  {
    id: 1,
    name: 'Alice Johnson',
    dateOfBirth: '1985-03-12',
    email: 'alice.johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, New York, NY',
    status: 'active',
    lastVisit: '2023-04-10',
    insuranceProvider: 'BlueCross',
    insuranceNumber: 'BC123456789',
  },
  {
    id: 2,
    name: 'Bob Williams',
    dateOfBirth: '1970-08-22',
    email: 'bob.williams@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Chicago, IL',
    status: 'active',
    lastVisit: '2023-03-25',
    insuranceProvider: 'Aetna',
    insuranceNumber: 'AE987654321',
  },
  {
    id: 3,
    name: 'Carol Davis',
    dateOfBirth: '1990-05-15',
    email: 'carol.davis@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine St, Los Angeles, CA',
    status: 'inactive',
    lastVisit: '2022-11-14',
    insuranceProvider: 'UnitedHealth',
    insuranceNumber: 'UH456789123',
  },
  {
    id: 4,
    name: 'David Miller',
    dateOfBirth: '1982-11-30',
    email: 'david.miller@example.com',
    phone: '(555) 456-7890',
    address: '101 Maple Dr, Houston, TX',
    status: 'active',
    lastVisit: '2023-04-02',
    insuranceProvider: 'Cigna',
    insuranceNumber: 'CI789123456',
  },
  {
    id: 5,
    name: 'Eva Wilson',
    dateOfBirth: '1975-07-08',
    email: 'eva.wilson@example.com',
    phone: '(555) 567-8901',
    address: '202 Cedar Ln, Miami, FL',
    status: 'active',
    lastVisit: '2023-03-18',
    insuranceProvider: 'Humana',
    insuranceNumber: 'HU321654987',
  },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter patients based on search query and status filter
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              defaultValue={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Patients List/Grid Tabs */}
        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredPatients.length}</strong> of <strong>{patientsData.length}</strong> patients
            </div>
          </div>
          
          {/* List View */}
          <TabsContent value="list" className="space-y-4">
            <ChartCard title="" className="w-full">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Insurance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(patient.dateOfBirth).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>{patient.email}</div>
                          <div className="text-sm text-muted-foreground">{patient.phone}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>{patient.insuranceProvider}</div>
                          <div className="text-sm text-muted-foreground">{patient.insuranceNumber}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={cn(
                              patient.status === 'active' && 'bg-success/10 text-success border-success/20',
                              patient.status === 'inactive' && 'bg-muted/50 text-muted-foreground border-muted/20'
                            )}
                          >
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="View Records">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Delete" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>
          </TabsContent>
          
          {/* Grid View */}
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{patient.name}</CardTitle>
                        <CardDescription>{new Date(patient.dateOfBirth).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          patient.status === 'active' && 'bg-success/10 text-success border-success/20',
                          patient.status === 'inactive' && 'bg-muted/50 text-muted-foreground border-muted/20'
                        )}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Email:</div>
                        <div className="text-sm col-span-2">{patient.email}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Phone:</div>
                        <div className="text-sm col-span-2">{patient.phone}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Insurance:</div>
                        <div className="text-sm col-span-2">{patient.insuranceProvider}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Last Visit:</div>
                        <div className="text-sm col-span-2">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Records
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" title="Delete" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Patients;
