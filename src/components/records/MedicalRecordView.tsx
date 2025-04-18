
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, Eye, FileText, X, Printer, ArrowLeft
} from 'lucide-react';
import { exportToPDF } from '@/utils/export-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface MedicalRecordViewProps {
  record: any;
  open: boolean;
  onClose: () => void;
}

export const MedicalRecordView: React.FC<MedicalRecordViewProps> = ({
  record,
  open,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    exportToPDF('medical-record-content', `medical-record-${record.id}`);
  };

  if (!record) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Medical Record
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
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription>
            Detailed view of the selected medical record
          </DialogDescription>
        </DialogHeader>
        
        <div id="medical-record-content" className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{record.recordType}</h2>
              <p className="text-sm text-muted-foreground">{record.fileName}</p>
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
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Patient Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Patient Name:</span>
                <span>{record.patientName}</span>
                <span className="text-muted-foreground">Patient ID:</span>
                <span>PATIENT-{Math.floor(1000 + Math.random() * 9000)}</span>
                <span className="text-muted-foreground">Date of Birth:</span>
                <span>01/15/1985</span>
                <span className="text-muted-foreground">Gender:</span>
                <span>Female</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Record Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Record Type:</span>
                <span>{record.recordType}</span>
                <span className="text-muted-foreground">Created Date:</span>
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <span className="text-muted-foreground">Created By:</span>
                <span>{record.doctorName}</span>
                <span className="text-muted-foreground">Status:</span>
                <span className="capitalize">{record.status}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Content</h3>
            <Card>
              <CardContent className="p-4">
                {record.recordType === 'Lab Result' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Blood Test Results</h4>
                    <div className="grid grid-cols-3 gap-y-2 text-sm">
                      <div className="font-medium">Test</div>
                      <div className="font-medium">Result</div>
                      <div className="font-medium">Reference Range</div>
                      
                      <div>Hemoglobin</div>
                      <div>14.2 g/dL</div>
                      <div className="text-muted-foreground">12.0 - 15.5 g/dL</div>
                      
                      <div>White Blood Cells</div>
                      <div>8.3 x10^9/L</div>
                      <div className="text-muted-foreground">4.5 - 11.0 x10^9/L</div>
                      
                      <div>Platelets</div>
                      <div>250 x10^9/L</div>
                      <div className="text-muted-foreground">150 - 450 x10^9/L</div>
                      
                      <div>Glucose</div>
                      <div className="text-red-500">110 mg/dL</div>
                      <div className="text-muted-foreground">70 - 100 mg/dL</div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-sm">
                        Patient shows slightly elevated glucose levels. Recommended follow-up in 3 months.
                      </p>
                    </div>
                  </div>
                )}
                
                {record.recordType === 'Prescription' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Medications</h4>
                        <ul className="space-y-3 text-sm">
                          <li>
                            <div className="font-medium">Cetirizine 10mg</div>
                            <div className="text-muted-foreground">1 tablet once daily</div>
                            <div className="text-muted-foreground">Quantity: 30</div>
                            <div className="text-muted-foreground">Refills: 2</div>
                          </li>
                          <li>
                            <div className="font-medium">Fluticasone Nasal Spray</div>
                            <div className="text-muted-foreground">2 sprays each nostril daily</div>
                            <div className="text-muted-foreground">Quantity: 1 bottle</div>
                            <div className="text-muted-foreground">Refills: 1</div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Instructions</h4>
                        <p className="text-sm">
                          Take medications as prescribed. Avoid known allergens when possible. 
                          Return for follow-up in 30 days.
                        </p>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Diagnosis</h4>
                          <p className="text-sm">Seasonal allergies (J30.2)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {record.recordType === 'X-Ray' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Chest X-Ray Report</h4>
                    <div className="text-sm space-y-2">
                      <p><span className="font-medium">Procedure:</span> PA and Lateral Chest X-ray</p>
                      <p><span className="font-medium">Clinical Indication:</span> Cough, shortness of breath</p>
                      <p><span className="font-medium">Findings:</span> Lungs are clear. No infiltrates, effusions, or pneumothorax. The heart is normal in size. Pulmonary vascularity is within normal limits. No pleural effusion or pneumothorax. No acute bony abnormality.</p>
                      <p><span className="font-medium">Impression:</span> Normal chest X-ray.</p>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="border p-2 rounded-md flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">View X-ray images</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {record.recordType === 'Medical History' && (
                  <div className="space-y-4 text-sm">
                    <h4 className="font-medium">Medical History Summary</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium">Chronic Conditions</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Hypertension - diagnosed 2018</li>
                          <li>Type 2 Diabetes Mellitus - diagnosed 2019</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Allergies</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Penicillin - severe reaction (hives, difficulty breathing)</li>
                          <li>Pollen - moderate (seasonal rhinitis)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Past Surgeries</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Appendectomy - 2010</li>
                          <li>Cesarean section - 2015</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Family History</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Father: Hypertension, Coronary Artery Disease</li>
                          <li>Mother: Type 2 Diabetes, Breast Cancer</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
