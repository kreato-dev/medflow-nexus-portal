
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Printer } from 'lucide-react';
import { exportToPDF } from '@/utils/export-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface PatientRecordViewProps {
  patient: any;
  open: boolean;
  onClose: () => void;
}

export const PatientRecordView: React.FC<PatientRecordViewProps> = ({
  patient,
  open,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    exportToPDF('patient-record-content', `patient-${patient.id}-record`);
  };

  if (!patient) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Patient Record
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Close</span>
                  &times;
                </Button>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete medical record for {patient.name}
          </DialogDescription>
        </DialogHeader>
        
        <div id="patient-record-content" className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">
                {patient.age} years • {patient.gender}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Patient ID:</span>
                <span>{patient.id}</span>
                <span className="text-muted-foreground">Phone:</span>
                <span>{patient.phone}</span>
                <span className="text-muted-foreground">Email:</span>
                <span>{patient.email}</span>
                <span className="text-muted-foreground">Last Visit:</span>
                <span>{patient.lastVisit}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Health Status</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Primary Condition:</span>
                <span>{patient.primaryCondition}</span>
                <span className="text-muted-foreground">Latest Diagnosis:</span>
                <span>{patient.latestDiagnosis?.date}</span>
                <span className="text-muted-foreground">Blood Type:</span>
                <span>O+ (On file)</span>
                <span className="text-muted-foreground">Height/Weight:</span>
                <span>168cm / 64kg</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Latest Diagnosis</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{patient.latestDiagnosis?.date}</p>
                <p>{patient.latestDiagnosis?.description}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Medications</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Updated {patient.lastVisit}</p>
                <ul className="space-y-3">
                  {patient.medications?.map((med: any, index: number) => (
                    <li key={index} className="text-sm">
                      <div className="font-medium">{med.name}</div>
                      <div className="text-muted-foreground">{med.instructions}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Allergies</h3>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {patient.allergies?.map((allergy: any, index: number) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <span>{allergy.allergen}</span>
                      <span className={
                        allergy.severity === 'Severe' 
                          ? 'text-destructive font-medium'
                          : 'text-warning font-medium'
                      }>
                        {allergy.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recent Timeline</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-6">
                  {patient.timeline?.reduce((acc: any, event: any, index: number, array: any) => {
                    // Group events by date
                    if (index === 0 || event.date !== array[index - 1].date) {
                      acc.push(
                        <div key={`date-${index}`} className="space-y-3">
                          <h4 className="text-sm font-semibold">{event.date}</h4>
                          <div className="border-l-2 border-muted pl-4 space-y-4">
                            <div className="relative">
                              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                              <div className="flex items-center gap-2 text-sm">
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
                      if (lastGroup && lastGroup.props && lastGroup.props.children) {
                        const lastGroupChildren = lastGroup.props.children[1];
                        if (lastGroupChildren && lastGroupChildren.props && lastGroupChildren.props.children) {
                          // Add new event to the timeline
                          const newEvent = (
                            <div key={`event-${index}`} className="relative">
                              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-xs text-muted-foreground">{event.time}</span>
                              </div>
                              <div className="mt-1">
                                <p className="font-medium text-sm">{event.type}</p>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              </div>
                            </div>
                          );
                          
                          // Create updated group with new event
                          const updatedChildren = Array.isArray(lastGroupChildren.props.children) 
                            ? [...lastGroupChildren.props.children, newEvent]
                            : [lastGroupChildren.props.children, newEvent];
                          
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
                      }
                    }
                    return acc;
                  }, [])}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>This is a confidential medical record.</p>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
