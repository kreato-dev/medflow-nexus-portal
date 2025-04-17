
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadIcon, Calendar, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Cell, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for analytics
const appointmentTrends = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 75 },
  { month: 'Mar', count: 90 },
  { month: 'Apr', count: 85 },
  { month: 'May', count: 110 },
  { month: 'Jun', count: 130 },
  { month: 'Jul', count: 120 },
  { month: 'Aug', count: 140 },
  { month: 'Sep', count: 150 },
  { month: 'Oct', count: 160 },
  { month: 'Nov', count: 145 },
  { month: 'Dec', count: 125 },
];

const revenueData = [
  { month: 'Jan', revenue: 12500, expenses: 8000 },
  { month: 'Feb', revenue: 15000, expenses: 8200 },
  { month: 'Mar', revenue: 18000, expenses: 8500 },
  { month: 'Apr', revenue: 16500, expenses: 8300 },
  { month: 'May', revenue: 21000, expenses: 9000 },
  { month: 'Jun', revenue: 25000, expenses: 9500 },
  { month: 'Jul', revenue: 23000, expenses: 9200 },
  { month: 'Aug', revenue: 27000, expenses: 9800 },
  { month: 'Sep', revenue: 28500, expenses: 10000 },
  { month: 'Oct', revenue: 30000, expenses: 10200 },
  { month: 'Nov', revenue: 27500, expenses: 9900 },
  { month: 'Dec', revenue: 24000, expenses: 9600 },
];

const patientDemographics = [
  { name: '0-18', value: 250 },
  { name: '19-35', value: 300 },
  { name: '36-50', value: 280 },
  { name: '51-65', value: 220 },
  { name: '65+', value: 150 },
];

const appointmentsBySpecialty = [
  { name: 'Cardiology', value: 150 },
  { name: 'Neurology', value: 120 },
  { name: 'Pediatrics', value: 180 },
  { name: 'Orthopedics', value: 110 },
  { name: 'Dermatology', value: 90 },
  { name: 'Other', value: 100 },
];

const doctorPerformance = [
  { name: 'Dr. Smith', patients: 120, satisfaction: 4.8, revenue: 18500 },
  { name: 'Dr. Wilson', patients: 95, satisfaction: 4.6, revenue: 14200 },
  { name: 'Dr. Chen', patients: 85, satisfaction: 4.9, revenue: 12800 },
  { name: 'Dr. Brown', patients: 140, satisfaction: 4.7, revenue: 21500 },
  { name: 'Dr. Johnson', patients: 75, satisfaction: 4.5, revenue: 11000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#AAAAAA'];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          
          <div className="flex items-center gap-2">
            <Select 
              defaultValue={timeframe} 
              onValueChange={setTimeframe}
            >
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
            
            <Button variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="demographics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Demographics</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Appointment Trends"
                description="Monthly appointment distribution"
              >
                <div className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={appointmentTrends}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} />
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Appointment Distribution by Specialty"
                description="Percentage of appointments by medical specialty"
              >
                <div className="p-6 h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={appointmentsBySpecialty}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {appointmentsBySpecialty.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Patient Age Demographics"
                description="Distribution of patients by age group"
              >
                <div className="p-6 h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={patientDemographics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {patientDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>
          
          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ChartCard
                title="Appointment Trends"
                description="Monthly appointment distribution"
              >
                <div className="p-6 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={appointmentTrends}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Appointments" 
                        stroke="hsl(var(--primary))" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Appointment Distribution by Specialty"
                description="Percentage of appointments by medical specialty"
              >
                <div className="p-6 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={appointmentsBySpecialty}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" tickLine={false} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Appointments" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>
          
          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ChartCard
                title="Revenue Analysis"
                description="Monthly revenue and expenses"
              >
                <div className="p-6 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
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
              
              <ChartCard
                title="Doctor Performance"
                description="Comparison of patient count and revenue by doctor"
              >
                <div className="p-6 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={doctorPerformance}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" tickLine={false} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="patients" 
                        name="Patients" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="revenue" 
                        name="Revenue ($)" 
                        fill="hsl(var(--secondary))" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>
          
          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Patient Age Demographics"
                description="Distribution of patients by age group"
              >
                <div className="p-6 h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={patientDemographics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {patientDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
              
              <ChartCard
                title="Patient Satisfaction"
                description="Doctor performance by satisfaction rating"
              >
                <div className="p-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={doctorPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[0, 5]} tickLine={false} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar 
                        dataKey="satisfaction" 
                        name="Satisfaction Rating (0-5)" 
                        fill="hsl(var(--accent))" 
                        radius={[0, 4, 4, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
