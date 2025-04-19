
export interface InsuranceCoverage {
  id: string;
  type: 'medical' | 'dental' | 'vision' | 'life' | 'disability';
  coveragePercentage: number;
  maxCoverage: number;
  deductible: number;
  description: string;
}

export interface InsurancePackage {
  id: string;
  name: string;
  premium: number;
  premiumFrequency: 'monthly' | 'quarterly' | 'annually';
  coverages: InsuranceCoverage[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  insurancePackageId: string;
  companyId: string;
  phone: string;
  address: string;
  emergencyContact: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'pending';
  employeeCount: number;
  corporateId: string;
  logo?: string;
}

export interface Corporate {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'pending';
  companyCount: number;
  logo?: string;
}
