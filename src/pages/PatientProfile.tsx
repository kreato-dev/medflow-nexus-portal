
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Download, Mail, Phone, Printer, User } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Mock patient data
const mockPatient = {
  id: 'patient-001',
  name: 'Ayesha Malik',
  primaryCondition: 'Hypertension',
  age: 48,
  gender: 'Female',
  phone: '+92 321 1234567',
  email: 'ayesha.malik@example.com',
  lastVisit: '2023-10-15',
  latestDiagnosis: {
    date: '2023-10-15',
    description: 'Patient presented with symptoms of seasonal allergies. Prescribed antihistamine medication.'
  },
  medications: [
    { name: 'Cetirizine 10mg', instructions: 'Once daily' },
    { name: 'Montelukast 10mg', instructions: 'Once daily at bedtime' },
    { name: 'Fluticasone Nasal Spray', instructions: '2 sprays each nostril daily' }
  ],
  allergies: [
    { allergen: 'Penicillin', severity: 'Severe' },
    { allergen: 'Dust', severity: 'Moderate' },
    { allergen: 'Pollen', severity: 'Moderate' }
  ],
  lastVisitDetails: {
    date: '2023-10-15',
    description: 'Follow-up appointment for allergies. Patient reports improvement with prescribed medications.'
  },
  timeline: [
    {
      date: 'October 15, 2023',
      time: '10:30 AM',
      type: 'Follow-up Appointment',
      description: 'Allergy follow-up with Dr. Khan'
    },
    {
      date: 'September 3, 2023',
      time: '9:00 AM',
      type: 'Initial Consultation',
      description: 'Diagnosed with seasonal allergies'
    },
    {
      date: 'September 3, 2023',
      time: '9:45 AM',
      type: 'Prescription',
      description: 'Antihistamine prescribed'
    },
    {
      date: 'July 12, 2023',
      time: '2:15 PM',
      type: 'Annual Physical',
      description: 'All vitals normal'
    },
    {
      date: 'July 12, 2023',
      time: '3:00 PM',
      type: 'Blood Work',
      description: 'Samples collected for routine testing'
    }
  ]
};

export default function PatientProfile() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(mockPatient);
  
  // In a real application, fetch the patient data based on the ID
  useEffect(() => {
    // Simulate API call
    console.log(`Fetching patient profile for ${patientId}`);
    // setPatient(fetchedData)
  }, [patientId]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF or other file format
    alert('Downloading patient records as PDF...');
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-8 print:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Patient Info Card */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=0D8ABC&color=fff`} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold">{patient.name}</h2>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      {patient.primaryCondition}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.gender}
                    </p>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Last visit: {patient.lastVisit || 'Unknown'}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Records
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Latest Diagnosis */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Latest Diagnosis</CardTitle>
                <p className="text-xs text-muted-foreground">{patient.latestDiagnosis.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{patient.latestDiagnosis.description}</p>
              </CardContent>
            </Card>
            
            {/* Current Medications */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Current Medications</CardTitle>
                <p className="text-xs text-muted-foreground">Updated {patient.lastVisit}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {patient.medications.map((med, index) => (
                    <li key={index} className="text-sm">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-muted-foreground">{med.instructions}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Allergies */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {patient.allergies.map((allergy, index) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <span>{allergy.allergen}</span>
                      <Badge variant="outline" className={
                        allergy.severity === 'Severe' 
                          ? 'bg-destructive/10 text-destructive border-destructive/20'
                          : 'bg-warning/10 text-warning border-warning/20'
                      }>
                        {allergy.severity}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="medical-history" className="flex-1">Medical History</TabsTrigger>
                <TabsTrigger value="vital-signs" className="flex-1">Vital Signs</TabsTrigger>
                <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                <TabsTrigger value="messaging" className="flex-1">Messaging</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Last Visit Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Last Visit Details</CardTitle>
                    <p className="text-xs text-muted-foreground">{patient.lastVisitDetails.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{patient.lastVisitDetails.description}</p>
                  </CardContent>
                </Card>
                
                {/* Recent Timeline */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Recent Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {patient.timeline.reduce((acc, event, index, array) => {
                        // Group events by date
                        if (index === 0 || event.date !== array[index - 1].date) {
                          acc.push(
                            <div key={`date-${index}`} className="space-y-3">
                              <h3 className="text-sm font-semibold">{event.date}</h3>
                              <div className="border-l-2 border-muted pl-4 space-y-4">
                                <div className="relative">
                                  <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{event.time}</span>
                                  </div>
                                  <div className="mt-1">
                                    <p className="font-medium text-sm">{event.type}</p>
                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          // Add to the last date group
                          const lastGroup = acc[acc.length - 1];
                          const newEvent = (
                            <div key={`event-${index}`} className="relative">
                              <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{event.time}</span>
                              </div>
                              <div className="mt-1">
                                <p className="font-medium text-sm">{event.type}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              </div>
                            </div>
                          );
                          
                          const lastGroupChildren = lastGroup.props.children[1].props.children;
                          const updatedChildren = Array.isArray(lastGroupChildren) 
                            ? [...lastGroupChildren, newEvent]
                            : [lastGroupChildren, newEvent];
                          
                          const updatedDateGroup = (
                            <div key={`date-${index-1}`} className="space-y-3">
                              {lastGroup.props.children[0]}
                              <div className="border-l-2 border-muted pl-4 space-y-4">
                                {updatedChildren}
                              </div>
                            </div>
                          );
                          
                          acc[acc.length - 1] = updatedDateGroup;
                        }
                        return acc;
                      }, [])}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical-history" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Medical history details would be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vital-signs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Vital signs and measurements would be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Patient documents and files would be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messaging" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Patient communications would be shown here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
