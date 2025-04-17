
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  Calendar, 
  Users, 
  Heart, 
  Activity, 
  ClipboardList, 
  CreditCard, 
  BarChart, 
  MessageSquare, 
  Check, 
  Clock,
  Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', time: '9:00 AM', status: 'confirmed' },
    { id: 2, patientName: 'Jane Smith', time: '10:30 AM', status: 'pending' },
    { id: 3, patientName: 'Alice Johnson', time: '1:00 PM', status: 'confirmed' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Review patient records', isCompleted: false },
    { id: 2, description: 'Prepare for surgery', isCompleted: true },
    { id: 3, description: 'Send prescription refills', isCompleted: false },
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleTaskToggle = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const handleAppointmentStatus = (id: number, status: string) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status } : appointment
    ));
    toast({
      title: "Appointment updated!",
      description: `Appointment status updated to ${status}.`,
    })
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="max-w-sm" />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Patients"
            value="1,250"
            icon={Users}
            description="Increase of 20% from last month"
          />
          <StatCard
            title="Appointments Today"
            value="32"
            icon={Calendar}
            description="10% increase from yesterday"
          />
          <StatCard
            title="Positive Feedback"
            value="96%"
            icon={Heart}
            description="Based on 245 reviews"
          />
          <StatCard
            title="System Health"
            value="100%"
            icon={Activity}
            description="All systems operational"
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <ChartCard 
            title="Patient Statistics" 
            chartType="line"
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'New Patients',
                  data: [65, 59, 80, 81, 56, 55],
                  borderColor: '#2563eb',
                  fill: false,
                },
                {
                  label: 'Returning Patients',
                  data: [28, 48, 40, 19, 86, 27],
                  borderColor: '#16a34a',
                  fill: false,
                },
              ],
            }}
          />
          <ChartCard 
            title="Appointment Overview" 
            chartType="bar"
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Scheduled',
                  data: [12, 19, 3, 5, 2, 3, 14],
                  backgroundColor: '#db2777',
                },
                {
                  label: 'Completed',
                  data: [5, 8, 9, 2, 4, 7, 6],
                  backgroundColor: '#eab308',
                },
              ],
            }}
          />
        </div>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <ClipboardList className="mr-2 h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt={appointment.patientName} />
                                <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                <div className="text-sm text-gray-500">patient@example.com</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.time}</div>
                            <div className="text-sm text-gray-500">Consultation</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.status === 'confirmed' && (
                              <Badge variant="outline">
                                <Check className="mr-2 h-4 w-4" />
                                Confirmed
                              </Badge>
                            )}
                            {appointment.status === 'pending' && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Clock className="mr-2 h-4 w-4" />
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button size="sm" onClick={() => handleAppointmentStatus(appointment.id, 'confirmed')}>Confirm</Button>
                            <Button variant="destructive" size="sm">Cancel</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Tasks</h2>
                <ul>
                  {tasks.map(task => (
                    <li key={task.id} className="py-2">
                      <label className="flex items-center space-x-3">
                        <Input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => handleTaskToggle(task.id)}
                        />
                        <span>{task.description}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                <p>No billing information available at this time.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Messages</h2>
                <p>No messages available at this time.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
