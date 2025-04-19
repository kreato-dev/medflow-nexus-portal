
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { User, Edit, ArrowLeft, Phone, Mail, Calendar, Building, CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockEmployees, mockCompanies, mockInsurancePackages } from '@/data/mockCorporate';
import { Employee, InsurancePackage } from '@/types/corporate';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [insurancePackage, setInsurancePackage] = useState<InsurancePackage | null>(null);

  useEffect(() => {
    // Find employee by ID
    const foundEmployee = mockEmployees.find((emp) => emp.id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
      
      // Find insurance package
      const foundPackage = mockInsurancePackages.find(
        (pkg) => pkg.id === foundEmployee.insurancePackageId
      );
      if (foundPackage) {
        setInsurancePackage(foundPackage);
      }
    }
  }, [id]);

  const getCompanyName = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown';
  };

  if (!employee) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl">Employee not found</h2>
          <Button variant="outline" onClick={() => navigate('/employees')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Employees
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate('/employees')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Employee Profile</h1>
          </div>
          <Button onClick={() => navigate(`/employees/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {employee.avatar ? (
                  <img 
                    src={employee.avatar} 
                    alt={employee.name} 
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>
              <CardTitle className="text-center">{employee.name}</CardTitle>
              <CardDescription className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <span>{employee.position}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : employee.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Company</span>
                  <span className="ml-auto">{getCompanyName(employee.companyId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="ml-auto">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="ml-auto">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Join Date</span>
                  <span className="ml-auto">{new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-sm font-medium">Department</h3>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Address</h3>
                  <p>{employee.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Emergency Contact</h3>
                  <p>{employee.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="insurance">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="insurance">Insurance Details</TabsTrigger>
              </TabsList>
              <TabsContent value="insurance" className="mt-4">
                {insurancePackage ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        {insurancePackage.name}
                      </CardTitle>
                      <CardDescription>
                        Premium: ${insurancePackage.premium}/{insurancePackage.premiumFrequency}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-medium mb-4">Coverage Details</h3>
                      <div className="space-y-4">
                        {insurancePackage.coverages.map((coverage) => (
                          <Card key={coverage.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base capitalize">{coverage.type} Coverage</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 pt-0">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Coverage</h4>
                                  <p>{coverage.coveragePercentage}%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Max Coverage</h4>
                                  <p>${coverage.maxCoverage.toLocaleString()}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Deductible</h4>
                                  <p>${coverage.deductible.toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                                <p className="text-sm">{coverage.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <h3 className="text-lg font-medium mb-2">No Insurance Package Found</h3>
                      <p className="text-muted-foreground mb-4">This employee does not have an insurance package assigned.</p>
                      <Button onClick={() => navigate(`/employees/edit/${id}`)}>
                        Assign Insurance Package
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetail;
