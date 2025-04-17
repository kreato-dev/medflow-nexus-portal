
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Eye, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MedicalRecords = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Mock records data
  const records = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Jane Smith',
      recordType: 'Lab Result',
      date: '2025-03-15',
      status: 'completed',
      fileName: 'blood_test_results.pdf'
    },
    {
      id: 2,
      patientName: 'Alice Johnson',
      doctorName: 'Dr. Jane Smith',
      recordType: 'Prescription',
      date: '2025-04-01',
      status: 'active',
      fileName: 'prescription_123.pdf'
    },
    {
      id: 3,
      patientName: 'Bob Williams',
      doctorName: 'Dr. Jane Smith',
      recordType: 'Medical History',
      date: '2025-03-22',
      status: 'archived',
      fileName: 'medical_history_bob.pdf'
    },
    {
      id: 4,
      patientName: 'Emma Davis',
      doctorName: 'Dr. Jane Smith',
      recordType: 'X-Ray',
      date: '2025-04-10',
      status: 'completed',
      fileName: 'xray_chest_emma.pdf'
    }
  ];
  
  // Filter records based on search query and filter type
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      record.status === filterType;
    
    return matchesSearch && matchesFilter;
  });
  
  // Patient and doctor specific content
  const renderRoleSpecificContent = () => {
    if (user?.role === 'patient') {
      return (
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Here are all your medical records. You can view or download them at any time.
              </p>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    } else if (user?.role === 'doctor' || user?.role === 'admin') {
      return (
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{user?.role === 'doctor' ? 'Patient Records Management' : 'Medical Records Management'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access and manage patient medical records. You can upload new documents or search through existing ones.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload New Record
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Create Record
                </Button>
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
          <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
        </div>
        
        {renderRoleSpecificContent()}
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Record
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Doctor
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
                      {filteredRecords.map((record) => (
                        <tr key={record.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{record.recordType}</div>
                                <div className="text-sm text-muted-foreground">{record.fileName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {record.patientName}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {record.doctorName}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge
                              variant="outline"
                              className={
                                record.status === 'active'
                                  ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                  : record.status === 'completed'
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              }
                            >
                              {record.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
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
          
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 mr-2 text-primary" />
                        <div>
                          <h3 className="font-medium">{record.recordType}</h3>
                          <p className="text-sm text-muted-foreground">{record.fileName}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          record.status === 'active'
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                            : record.status === 'completed'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="col-span-2">{record.patientName}</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="col-span-2">{record.doctorName}</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="col-span-2">{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
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

export default MedicalRecords;
