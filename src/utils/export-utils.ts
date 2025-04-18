
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  const pdf = new jsPDF('portrait', 'pt', 'a4');
  
  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Remove any buttons or elements with the print:hidden class
  const hiddenElements = clonedElement.querySelectorAll('.print\\:hidden');
  hiddenElements.forEach(el => el.remove());
  
  // Apply print styles
  clonedElement.classList.add('print:p-8', 'bg-white', 'text-black');
  
  // Temporarily add to document to calculate sizes
  clonedElement.style.position = 'absolute';
  clonedElement.style.left = '-9999px';
  document.body.appendChild(clonedElement);
  
  // Capture HTML content
  pdf.html(clonedElement, {
    callback: function(doc) {
      doc.save(`${filename}.pdf`);
      document.body.removeChild(clonedElement);
    },
    x: 15,
    y: 15,
    width: 170, 
    windowWidth: 650,
    autoPaging: 'text'
  });
};

export const exportToExcel = (data: any, filename: string) => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

// Utility function to convert claim to Excel format
export const claimToExcelData = (claim: any) => {
  // Create basic claim info
  const basicInfo = {
    'Claim ID': claim.id,
    'Status': claim.status,
    'Submitted Date': claim.submittedDate,
    'Patient Name': claim.patient.name,
    'Patient ID': claim.patient.id,
    'Total Amount': claim.totalAmount,
    'Insurance Plan': claim.insurancePlan,
    'Provider': claim.provider.name,
    'Provider ID': claim.provider.id,
  };
  
  // Create services data
  const servicesData = claim.services.map((service: any) => ({
    'Claim ID': claim.id,
    'Service Name': service.name,
    'Service Code': service.code,
    'Date': service.date,
    'Quantity': service.quantity,
    'Amount': service.amount
  }));
  
  return servicesData.length > 0 ? servicesData : [basicInfo];
};
