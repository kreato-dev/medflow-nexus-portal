
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AppointmentCalendar } from '@/components/appointments/AppointmentCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  LayoutGrid, 
  List, 
  CalendarDays, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate, formatRelativeTime } from '@/lib/date-utils';

// Mock data for appointments list
const appointmentsList = [
  {
    id: '1',
    patientName: 'Alice Johnson',
    patientId: 'p1',
    doctorName: 'Dr. Jane Smith',
    doctorId: '1',
    date: '2023-05-22',
    time: '09:30 AM',
    duration: 30,
    status: 'confirmed',
    type: 'follow-up',
  },
  {
    id: '2',
    patientName: 'Bob Williams',
    patientId: 'p2',
    doctorName: 'Dr. Jane Smith',
    doctorId: '1',
    date: '2023-05-22',
    time: '11:00 AM',
    duration: 30,
    status: 'pending',
    type: 'new',
  },
  {
    id: '3',
    patientName: 'Carol Davis',
    patientId: 'p3',
    doctorName: 'Dr. John Williams',
    doctorId: '2',
    date: '2023-05-23',
    time: '10:15 AM',
    duration: 45,
    status: 'confirmed',
    type: 'urgent',
  },
  {
    id: '4',
    patientName: 'Dave Brown',
    patientId: 'p4',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: '3',
    date: '2023-05-24',
    time: '02:30 PM',
    duration: 30,
    status: 'confirmed',
    type: 'follow-up',
  },
  {
    id: '5',
    patientName: 'Eve Wilson',
    patientId: 'p5',
    doctorName: 'Dr. Michael Chen',
    doctorId: '4',
    date: '2023-05-25',
    time: '09:00 AM',
    duration: 60,
    status: 'cancelled',
    type: 'follow-up',
  },
  {
    id: '6',
    patientName: 'Frank Miller',
    patientId: 'p6',
    doctorName: 'Dr. Jane Smith',
    doctorId: '1',
    date: '2023-05-26',
    time: '03:45 PM',
    duration: 30,
    status: 'confirmed',
    type: 'routine',
  },
  {
    id: '7',
    patientName: 'Grace Taylor',
    patientId: 'p7',
    doctorName: 'Dr. John Williams',
    doctorId: '2',
    date: '2023-05-26',
    time: '11:30 AM',
    duration: 30,
    status: 'pending',
    type: 'new',
  },
  {
    id: '8',
    patientName: 'Henry Clark',
    patientId: 'p8',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: '3',
    date: '2023-05-27',
    time: '10:00 AM',
    duration: 45,
    status: 'confirmed',
    type: 'urgent',
  },
];

const Appointments = () => {
  const [viewType, setViewType] = useState<'calendar' | 'list'>('list');
  const [listView, setListView] = useState<'grid' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Filter appointments based on search and filters
  const filteredAppointments = appointmentsList.filter(appointment => {
    const matchesSearch = 
      searchQuery === '' || 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      appointment.status === statusFilter;
      
    const matchesType = 
      typeFilter === 'all' || 
      appointment.type === typeFilter;
      
    return matchesSearch && matchesStatus && matchesType;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> New Appointment
            </Button>
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewType === 'calendar' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewType('calendar')}
              >
                <CalendarDays className="h-4 w-4 mr-2" /> Calendar
              </Button>
              <Button 
                variant={viewType === 'list' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewType('list')}
              >
                <List className="h-4 w-4 mr-2" /> List
              </Button>
            </div>
          </div>
          
          <TabsContent value="upcoming" className="space-y-4">
            {viewType === 'calendar' ? (
              <AppointmentCalendar />
            ) : (
              <>
                {/* List view with filtering */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search appointments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="routine">Routine</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex border rounded-md overflow-hidden">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "rounded-none border-r", 
                          listView === 'table' && "bg-muted"
                        )}
                        onClick={() => setListView('table')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "rounded-none", 
                          listView === 'grid' && "bg-muted"
                        )}
                        onClick={() => setListView('grid')}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {listView === 'table' ? (
                  <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Patient
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Doctor
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Type
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
                          {filteredAppointments.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-muted/50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="font-medium">{appointment.patientName}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                {appointment.doctorName}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div>{formatDate(new Date(appointment.date))}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    appointment.type === 'new' && 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                                    appointment.type === 'follow-up' && 'bg-green-500/10 text-green-500 border-green-500/20',
                                    appointment.type === 'urgent' && 'bg-red-500/10 text-red-500 border-red-500/20',
                                    appointment.type === 'routine' && 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                  )}
                                >
                                  {appointment.type}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    appointment.status === 'confirmed' && 'bg-success/10 text-success border-success/20',
                                    appointment.status === 'pending' && 'bg-warning/10 text-warning border-warning/20',
                                    appointment.status === 'cancelled' && 'bg-destructive/10 text-destructive border-destructive/20',
                                    appointment.status === 'completed' && 'bg-muted text-muted-foreground'
                                  )}
                                >
                                  {appointment.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAppointments.map((appointment) => (
                      <Card key={appointment.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{appointment.patientName}</CardTitle>
                              <CardDescription>{appointment.doctorName}</CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                appointment.status === 'confirmed' && 'bg-success/10 text-success border-success/20',
                                appointment.status === 'pending' && 'bg-warning/10 text-warning border-warning/20',
                                appointment.status === 'cancelled' && 'bg-destructive/10 text-destructive border-destructive/20',
                                appointment.status === 'completed' && 'bg-muted text-muted-foreground'
                              )}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <div className="text-sm">
                                <div className="font-medium">{formatDate(new Date(appointment.date))}</div>
                                <div className="text-muted-foreground">{appointment.time} ({appointment.duration} min)</div>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  appointment.type === 'new' && 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                                  appointment.type === 'follow-up' && 'bg-green-500/10 text-green-500 border-green-500/20',
                                  appointment.type === 'urgent' && 'bg-red-500/10 text-red-500 border-red-500/20',
                                  appointment.type === 'routine' && 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                )}
                              >
                                {appointment.type}
                              </Badge>
                            </div>
                            <div className="pt-2 flex justify-end space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="rounded-lg border p-8 text-center">
              <h3 className="text-lg font-medium">Past Appointments</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View your appointment history
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="rounded-lg border p-8 text-center">
              <h3 className="text-lg font-medium">All Appointments</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View all appointments
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Appointments;
