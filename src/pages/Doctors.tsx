
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Search, Filter, Trash2, Edit, Calendar, Mail, Phone } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock data for doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@medflow.com',
    phone: '(555) 123-4567',
    specialty: 'Cardiology',
    experience: 15,
    status: 'active',
    availability: 'Mon, Wed, Fri',
    appointmentsToday: 8,
    totalPatients: 256,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
  },
  {
    id: 2,
    name: 'Dr. John Wilson',
    email: 'john.wilson@medflow.com',
    phone: '(555) 234-5678',
    specialty: 'Neurology',
    experience: 12,
    status: 'active',
    availability: 'Tue, Thu, Sat',
    appointmentsToday: 6,
    totalPatients: 189,
    avatar: 'https://ui-avatars.com/api/?name=John+Wilson&background=0D8ABC&color=fff',
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    email: 'emily.chen@medflow.com',
    phone: '(555) 345-6789',
    specialty: 'Pediatrics',
    experience: 8,
    status: 'inactive',
    availability: 'Mon, Tue, Wed',
    appointmentsToday: 0,
    totalPatients: 210,
    avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=0D8ABC&color=fff',
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@medflow.com',
    phone: '(555) 456-7890',
    specialty: 'Orthopedics',
    experience: 20,
    status: 'active',
    availability: 'Wed, Thu, Fri',
    appointmentsToday: 10,
    totalPatients: 320,
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=0D8ABC&color=fff',
  },
  {
    id: 5,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medflow.com',
    phone: '(555) 567-8901',
    specialty: 'Dermatology',
    experience: 10,
    status: 'active',
    availability: 'Mon, Wed, Fri',
    appointmentsToday: 7,
    totalPatients: 175,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
  },
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter doctors based on search query, specialty, and status filters
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phone.includes(searchQuery) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = 
      specialtyFilter === 'all' || 
      doctor.specialty.toLowerCase() === specialtyFilter.toLowerCase();
    
    const matchesStatus = 
      statusFilter === 'all' || 
      doctor.status === statusFilter;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });
  
  // Get unique specialties for filter dropdown
  const specialties = ['all', ...new Set(doctorsData.map(doc => doc.specialty.toLowerCase()))];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
          
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Doctor
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-col sm:flex-row">
            <Select
              defaultValue={specialtyFilter}
              onValueChange={setSpecialtyFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.filter(s => s !== 'all').map(specialty => (
                  <SelectItem 
                    key={specialty} 
                    value={specialty}
                    className="capitalize"
                  >
                    {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
          </div>
        </div>
        
        {/* Doctors List/Grid Tabs */}
        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredDoctors.length}</strong> of <strong>{doctorsData.length}</strong> doctors
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
                        Doctor
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Specialty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Availability
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Patients
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredDoctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img src={doctor.avatar} alt={doctor.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-muted-foreground">{doctor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>{doctor.specialty}</div>
                          <div className="text-sm text-muted-foreground">{doctor.experience} years</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {doctor.availability}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={cn(
                              doctor.status === 'active' && 'bg-success/10 text-success border-success/20',
                              doctor.status === 'inactive' && 'bg-muted/50 text-muted-foreground border-muted/20'
                            )}
                          >
                            {doctor.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>{doctor.totalPatients} total</div>
                          <div className="text-sm text-muted-foreground">
                            {doctor.appointmentsToday} today
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Schedule">
                              <Calendar className="h-4 w-4" />
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
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                          <img src={doctor.avatar} alt={doctor.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          doctor.status === 'active' && 'bg-success/10 text-success border-success/20',
                          doctor.status === 'inactive' && 'bg-muted/50 text-muted-foreground border-muted/20'
                        )}
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Available: {doctor.availability}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="bg-muted/30 p-2 rounded-md text-center">
                          <div className="text-sm font-medium">{doctor.totalPatients}</div>
                          <div className="text-xs text-muted-foreground">Patients</div>
                        </div>
                        <div className="bg-muted/30 p-2 rounded-md text-center">
                          <div className="text-sm font-medium">{doctor.experience} yrs</div>
                          <div className="text-xs text-muted-foreground">Experience</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Schedule
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

export default Doctors;
