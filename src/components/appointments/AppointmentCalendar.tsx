
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  User, 
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  formatDate, 
  formatTime, 
  getDayOfWeek, 
  generateTimeSlots, 
  toISODateString 
} from '@/lib/date-utils';
import { cn } from '@/lib/utils';

// Types for appointments
interface Appointment {
  id: string;
  patientName: string;
  patientId?: string;
  doctorName: string;
  doctorId?: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'new' | 'follow-up' | 'urgent' | 'routine';
  notes?: string;
}

// Mock data for demonstration
const mockDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. John Williams', specialty: 'Pediatrics' },
  { id: '3', name: 'Dr. Sarah Johnson', specialty: 'Neurology' },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'Orthopedics' },
];

const mockAppointments: Appointment[] = [
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
];

// Helper function to get appointments for a specific day
const getAppointmentsForDay = (appointments: Appointment[], date: Date): Appointment[] => {
  const dateString = toISODateString(date);
  return appointments.filter(appointment => appointment.date === dateString);
};

// Helper function to get appointments for a specific doctor
const getAppointmentsForDoctor = (appointments: Appointment[], doctorId: string): Appointment[] => {
  return appointments.filter(appointment => appointment.doctorId === doctorId);
};

// Helper function to check if a day has appointments
const hasDayAppointments = (appointments: Appointment[], date: Date): boolean => {
  const dateString = toISODateString(date);
  return appointments.some(appointment => appointment.date === dateString);
};

export function AppointmentCalendar() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'day' | 'week'>('calendar');
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(
    user?.role === 'doctor' ? user.id : undefined
  );
  
  // Filter appointments based on user role and selected doctor
  const filteredAppointments = selectedDoctor
    ? getAppointmentsForDoctor(mockAppointments, selectedDoctor)
    : mockAppointments;
  
  // Get appointments for the selected day
  const dayAppointments = getAppointmentsForDay(filteredAppointments, date);
  
  // Generate time slots for the day view
  const timeSlots = generateTimeSlots(8, 18, 30);
  
  // Handle day click in calendar
  const handleDayClick = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setView('day');
    }
  };
  
  // Render calendar view with appointment indicators
  const renderCalendarView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Appointment Calendar</h2>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedDoctor}
            onValueChange={setSelectedDoctor}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Doctors</SelectItem>
              {mockDoctors.map(doctor => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        className="rounded-md border max-w-full"
        modifiers={{
          hasAppointment: (date: Date) => hasDayAppointments(filteredAppointments, date),
        }}
        modifiersClassNames={{
          hasAppointment: "bg-primary/10 font-bold text-primary",
        }}
        components={{
          DayContent: (props) => {
            const hasAppt = hasDayAppointments(filteredAppointments, props.date);
            return (
              <div
                className="relative w-full h-full p-2 flex items-center justify-center"
              >
                {props.date.getDate()}
                {hasAppt && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
            );
          },
        }}
      />
    </>
  );
  
  // Render day view with time slots and appointments
  const renderDayView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setView('calendar')}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-semibold">
            {formatDate(date)} ({getDayOfWeek(date)})
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const prev = new Date(date);
              prev.setDate(prev.getDate() - 1);
              setDate(prev);
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const next = new Date(date);
              next.setDate(next.getDate() + 1);
              setDate(next);
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="grid grid-cols-[100px_1fr] border-b">
          <div className="p-3 font-medium text-sm text-muted-foreground border-r">Time</div>
          <div className="p-3 font-medium text-sm">Appointments</div>
        </div>
        
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map((time, i) => {
            const slotAppointments = dayAppointments.filter(a => a.time === time);
            
            return (
              <div 
                key={i} 
                className={cn(
                  "grid grid-cols-[100px_1fr] border-b min-h-[80px]",
                  i % 2 === 0 ? "bg-background" : "bg-card"
                )}
              >
                <div className="p-3 text-sm text-muted-foreground font-medium border-r flex items-start">
                  <Clock className="h-3 w-3 mr-1 mt-0.5" /> {time}
                </div>
                <div className="p-2">
                  {slotAppointments.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <Button variant="ghost" size="sm" className="h-full w-full border border-dashed border-muted text-muted-foreground">
                        <Plus className="h-4 w-4 mr-2" /> Available
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slotAppointments.map(appointment => (
                        <Card key={appointment.id} className="overflow-hidden border-l-4 shadow-sm" style={{ 
                          borderLeftColor: appointment.status === 'confirmed' 
                            ? 'hsl(var(--success))' 
                            : appointment.status === 'pending' 
                              ? 'hsl(var(--warning))' 
                              : 'hsl(var(--destructive))' 
                        }}>
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <p className="font-medium">{appointment.patientName}</p>
                                </div>
                                
                                <div className="text-xs text-muted-foreground mt-1">
                                  <span>{appointment.doctorName}</span>
                                  <span className="mx-1">•</span>
                                  <span>{appointment.duration} min</span>
                                </div>
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
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
  
  return (
    <div className="space-y-4">
      {view === 'calendar' ? renderCalendarView() : renderDayView()}
    </div>
  );
}
