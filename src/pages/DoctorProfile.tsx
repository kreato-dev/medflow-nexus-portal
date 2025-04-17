
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  Globe, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Star, 
  Users 
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Mock doctor data
const mockDoctor = {
  id: 'doctor-001',
  name: 'Dr. Ahmed Khan',
  specialty: 'Cardiologist',
  verified: true,
  registrationId: 'PMDC-12345-K',
  email: 'dr.ahmed.khan@medpractice.pk',
  phone: '+92 321 1234567',
  address: 'Medical Plaza, Suite 203, Clifton, Karachi',
  website: 'www.doctorahmed.pk',
  statistics: {
    patients: 4825,
    experience: 15,
    rating: 4.8,
    reviews: 352
  },
  specializations: [
    'Interventional Cardiology',
    'Cardiac Imaging',
    'Heart Failure',
    'Preventive Cardiology'
  ],
  languages: ['English', 'Urdu', 'Punjabi'],
  biography: 'Experienced cardiologist with over 15 years of practice specializing in interventional cardiology and cardiac imaging. Graduated from Aga Khan University Hospital with additional training from Royal College of Physicians, London.',
  experience: [
    {
      position: 'Senior Consultant Cardiologist',
      organization: 'Shifa International Hospital',
      period: '2018 - Present'
    },
    {
      position: 'Consultant Cardiologist',
      organization: 'South City Hospital',
      period: '2014 - 2018'
    },
    {
      position: 'Associate Cardiologist',
      organization: 'Aga Khan University Hospital',
      period: '2011 - 2014'
    }
  ],
  education: [
    {
      degree: 'MBBS',
      institution: 'Aga Khan University Hospital',
      year: '2005'
    },
    {
      degree: 'FCPS (Cardiology)',
      institution: 'College of Physicians and Surgeons Pakistan',
      year: '2011'
    },
    {
      degree: 'Fellowship in Interventional Cardiology',
      institution: 'Royal College of Physicians',
      year: '2013'
    }
  ]
};

export default function DoctorProfile() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(mockDoctor);
  
  // In a real application, fetch the doctor data based on the ID
  useEffect(() => {
    // Simulate API call
    console.log(`Fetching doctor profile for ${doctorId}`);
    // setDoctor(fetchedData)
  }, [doctorId]);

  return (
    <MainLayout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Doctor Profile</h1>
          <p className="text-sm text-muted-foreground">Manage and view your professional profile</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0D8ABC&color=fff`} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-bold">{doctor.name}</h2>
                        {doctor.verified && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="bg-muted/30">PMDC: {doctor.registrationId}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`https://${doctor.website}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {doctor.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Statistics Card */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold">{doctor.statistics.patients.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Patients</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold">{doctor.statistics.experience} yrs</p>
                    <p className="text-sm text-muted-foreground">Experience</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <p className="text-2xl font-bold">{doctor.statistics.rating}</p>
                      <Star className="h-5 w-5 text-warning fill-warning" />
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold">{doctor.statistics.reviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Specializations & Languages */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, i) => (
                    <Badge key={i} variant="outline" className="bg-secondary/10">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, i) => (
                    <Badge key={i} variant="outline" className="bg-muted/30">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="qualifications" className="flex-1">Qualifications</TabsTrigger>
            <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{doctor.biography}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {doctor.experience.map((exp, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 flex flex-col items-center mr-4">
                        <Building2 className="h-6 w-6 text-primary" />
                        {index < doctor.experience.length - 1 && (
                          <div className="w-px h-full bg-muted-foreground/20 my-2"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-muted-foreground mb-1">{exp.organization}</p>
                        <p className="text-sm">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 flex flex-col items-center mr-4">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        {index < doctor.education.length - 1 && (
                          <div className="w-px h-full bg-muted-foreground/20 my-2"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-muted-foreground mb-1">{edu.institution}</p>
                        <p className="text-sm">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="qualifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Qualifications and certifications would be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Doctor's schedule and availability would be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Patient reviews and ratings would be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
