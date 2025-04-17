import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  UserPlus,
  Stethoscope,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const appointmentData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 20 },
  { name: 'Fri', count: 25 },
  { name: 'Sat', count: 10 },
  { name: 'Sun', count: 5 },
];

const patientGrowthData = [
  { date: 'Jan', count: 120 },
  { date: 'Feb', count: 145 },
  { date: 'Mar', count: 160 },
  { date: 'Apr', count: 190 },
  { date: 'May', count: 210 },
  { date: 'Jun', count: 245 },
  { date: 'Jul', count: 280 },
];

const revenueData = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 15000, expenses: 8500 },
  { month: 'Mar', revenue: 18000, expenses: 9000 },
  { month: 'Apr', revenue: 14000, expenses: 8800 },
  { month: 'May', revenue: 19000, expenses: 9200 },
  { month: 'Jun', revenue: 22000, expenses: 9500 },
];

const specialtiesData = [
  { name: 'Cardiology', value: 35 },
  { name: 'Pediatrics', value: 25 },
  { name: 'Neurology', value: 18 },
  { name: 'Orthopedics', value: 15 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const upcomingAppointments = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    date: '2023-05-22',
    time: '09:30 AM',
    status: 'confirmed',
    type: 'follow-up',
    doctor: 'Dr. Jane Smith',
  },
  {
    id: 2,
    patientName: 'Bob Williams',
    date: '2023-05-22',
    time: '11:00 AM',
    status: 'pending',
    type: 'new',
    doctor: 'Dr. Jane Smith',
  },
  {
    id: 3,
    patientName: 'Carol Davis',
    date: '2023-05-23',
    time: '10:15 AM',
    status: 'confirmed',
    type: 'urgent',
    doctor: 'Dr. Jane Smith',
  },
  {
    id: 4,
    patientName: 'Dave Brown',
    date: '2023-05-23',
    time: '02:30 PM',
    status: 'confirmed',
    type: 'follow-up',
    doctor: 'Dr. Jane Smith',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('weekly');
  
  const getStatsByRole = () => {
    switch(user?.role) {
      case 'admin':
        return [
          { title: 'Total Patients', value: '1,283', change: { value: 12, isPositive: true }, icon: <Users className="h-6 w-6" /> },
          { title: 'Total Doctors', value: '42', change: { value: 5, isPositive: true }, icon: <Heart className="h-6 w-6" /> },
          { title: 'Appointments Today', value: '64', change: { value: 8, isPositive: true }, icon: <Calendar className="h-6 w-6" /> },
          { title: 'Revenue (MTD)', value: '$48,350', change: { value: 15, isPositive: true }, icon: <DollarSign className="h-6 w-6" /> },
        ];
      case 'doctor':
        return [
          { title: 'My Patients', value: '213', change: { value: 5, isPositive: true }, icon: <Users className="h-6 w-6" /> },
          { title: 'Appointments Today', value: '12', change: { value: 2, isPositive: true }, icon: <Calendar className="h-6 w-6" /> },
          { title: 'Hours Worked (Week)', value: '32', change: { value: 4, isPositive: false }, icon: <Clock className="h-6 w-6" /> },
          { title: 'Claims Pending', value: '8', change: { value: 2, isPositive: false }, icon: <FileText className="h-6 w-6" /> },
        ];
      case 'patient':
      default:
        return [
          { title: 'Upcoming Appointments', value: '3', icon: <Calendar className="h-6 w-6" /> },
          { title: 'Last Checkup', value: '2 weeks ago', icon: <CheckCircle className="h-6 w-6" /> },
          { title: 'Prescriptions', value: '4 active', icon: <FileText className="h-6 w-6" /> },
          { title: 'Messages', value: '2 unread', icon: <MessageSquare className="h-6 w-6" /> },
        ];
    }
  };
  
  const stats = getStatsByRole();

  const getAvailableTabs = () => {
    if (user?.role === 'admin') {
      return ['overview', 'appointments', 'patients', 'doctors', 'revenue'];
    } else if (user?.role === 'doctor') {
      return ['overview', 'appointments', 'patients'];
    } else {
      return ['overview', 'appointments', 'doctors'];
    }
  };

  const tabs = getAvailableTabs();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {user?.role === 'admin' ? 'Admin Dashboard' : 
             user?.role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
          </h1>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        
        <Tabs defaultValue={tabs[0]} className="space-y-4">
          <TabsList>
            {tabs.includes('overview') && <TabsTrigger value="overview">Overview</TabsTrigger>}
            {tabs.includes('appointments') && <TabsTrigger value="appointments">Appointments</TabsTrigger>}
            {tabs.includes('patients') && <TabsTrigger value="patients">Patients</TabsTrigger>}
            {tabs.includes('doctors') && <TabsTrigger value="doctors">Doctors</TabsTrigger>}
            {tabs.includes('revenue') && <TabsTrigger value="revenue">Revenue</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {user?.role === 'patient' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Your Health Timeline"
                  description="Recent appointments and checkups"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { date: 'Jan', value: 70 },
                          { date: 'Feb', value: 75 },
                          { date: 'Mar', value: 72 },
                          { date: 'Apr', value: 80 },
                          { date: 'May', value: 85 },
                          { date: 'Jun', value: 82 },
                          { date: 'Jul', value: 88 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          name="Health Score"
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                <ChartCard
                  title="Upcoming Treatments"
                  description="Your scheduled medical activities"
                >
                  <div className="divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center p-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Stethoscope className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {i === 1 ? 'General Checkup' : i === 2 ? 'Blood Work' : 'Cardiology Consultation'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {i === 1 ? 'Tomorrow, 10:00 AM' : i === 2 ? 'July 28, 9:30 AM' : 'August 5, 2:00 PM'}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </ChartCard>
              </div>
            )}
            
            {user?.role === 'doctor' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Your Schedule"
                  description="Appointments this week"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={appointmentData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar 
                          dataKey="count" 
                          name="Appointments" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                <ChartCard
                  title="Patient Distribution"
                  description="Categorized by treatment type"
                >
                  <div className="p-6 h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={specialtiesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {specialtiesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
              </div>
            )}
            
            {user?.role === 'admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Appointments Trend"
                  description="Weekly appointments distribution"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={appointmentData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                <ChartCard
                  title="Patient Growth"
                  description="Monthly patient acquisition"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={patientGrowthData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="hsl(var(--secondary))" 
                          fill="hsl(var(--secondary))" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
              </div>
            )}
            
            {user?.role === 'admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Revenue Overview"
                  description="Monthly revenue vs. expenses"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="revenue" 
                          name="Revenue" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="expenses" 
                          name="Expenses" 
                          fill="hsl(var(--secondary))" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                <ChartCard
                  title="Specialties Distribution"
                  description="Patient distribution by specialty"
                >
                  <div className="p-6 h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={specialtiesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {specialtiesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="appointments">
            <ChartCard title="Upcoming Appointments" className="w-full">
              <div className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Patient
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {upcomingAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-medium">{appointment.patientName}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div>{new Date(appointment.date).toLocaleDateString()}</div>
                            <div className="text-sm text-muted-foreground">{appointment.time}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge
                              variant="outline"
                              className={cn(
                                appointment.type === 'new' && 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                                appointment.type === 'follow-up' && 'bg-green-500/10 text-green-500 border-green-500/20',
                                appointment.type === 'urgent' && 'bg-red-500/10 text-red-500 border-red-500/20'
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
                                appointment.status === 'cancelled' && 'bg-destructive/10 text-destructive border-destructive/20'
                              )}
                            >
                              {appointment.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {appointment.doctor}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ChartCard>
          </TabsContent>
          
          <TabsContent value="patients">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCard title="New Patients" description="Recently registered patients">
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center p-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Patient Name {i}</div>
                        <div className="text-sm text-muted-foreground">Registered {i} day{i !== 1 ? 's' : ''} ago</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
              
              <ChartCard title="Patient Growth" description="Monthly patient acquisition">
                <div className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={patientGrowthData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" tickLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="hsl(var(--accent))" 
                        fill="hsl(var(--accent))" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>
          
          <TabsContent value="doctors">
            <div className="grid grid-cols-1 gap-4">
              <ChartCard title="Available Doctors" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="p-4 flex flex-col h-full">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=Doctor+${i}&background=0D8ABC&color=fff`} />
                            <AvatarFallback>DR{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">Dr. Name {i}</h3>
                            <p className="text-sm text-muted-foreground">
                              {i % 3 === 0 ? 'Cardiologist' : i % 3 === 1 ? 'Pediatrician' : 'Neurologist'}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm mb-4 flex-1">
                          <p className="mb-2">
                            <span className="font-medium">Experience:</span> {5 + i} years
                          </p>
                          <p className="mb-2">
                            <span className="font-medium">Patients:</span> {100 + (i * 20)}+
                          </p>
                          <p>
                            <span className="font-medium">Languages:</span> English
                            {i % 2 === 0 ? ', Spanish' : ''}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <Button className="w-full">
                            {user?.role === 'admin' ? 'View Profile' : 'Book Appointment'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ChartCard>
            </div>
          </TabsContent>
          
          {user?.role === 'admin' && (
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard
                  title="Revenue Overview"
                  description="Monthly revenue vs. expenses"
                >
                  <div className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" tickLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="revenue" 
                          name="Revenue" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="expenses" 
                          name="Expenses" 
                          fill="hsl(var(--muted))" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
                
                <ChartCard title="Revenue Statistics" className="h-full">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Revenue
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$112,850</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-success font-medium">+12.5%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Average Claim Value
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$325</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-success font-medium">+4.2%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Claims Processed
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">347</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-success font-medium">+8.1%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Rejection Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2.4%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-success font-medium">-0.8%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </ChartCard>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
