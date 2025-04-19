
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Building, User, Edit, ArrowLeft, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockCompanies, mockEmployees, mockInsurancePackages, mockCorporates } from '@/data/mockCorporate';
import { Company, Employee } from '@/types/corporate';

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Find company by ID
    const foundCompany = mockCompanies.find((comp) => comp.id === id);
    if (foundCompany) {
      setCompany(foundCompany);
    }

    // Find employees associated with this company
    const relatedEmployees = mockEmployees.filter((emp) => emp.companyId === id);
    setEmployees(relatedEmployees);
  }, [id]);

  const getCorporateName = (corporateId: string) => {
    const corporate = mockCorporates.find(c => c.id === corporateId);
    return corporate ? corporate.name : 'Unknown';
  };

  const getInsurancePackageName = (packageId: string) => {
    const pkg = mockInsurancePackages.find(p => p.id === packageId);
    return pkg ? pkg.name : 'None';
  };

  if (!company) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl">Company not found</h2>
          <Button variant="outline" onClick={() => navigate('/companies')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Companies
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
            <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Company Details</h1>
          </div>
          <Button onClick={() => navigate(`/companies/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Company
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>
              <CardTitle className="text-center">{company.name}</CardTitle>
              <CardDescription className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    company.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : company.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {company.status}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Corporate</h3>
                  <p>{getCorporateName(company.corporateId)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p>{company.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{company.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p>{company.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p>{company.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                  <p>{new Date(company.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Employees</h3>
                  <p>{company.employeeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="employees">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="employees">Employees</TabsTrigger>
              </TabsList>
              <TabsContent value="employees" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Company Employees</CardTitle>
                    <Button size="sm" onClick={() => navigate('/employees/new')}>
                      <Plus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {employees.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Insurance Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {employees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {employee.avatar ? (
                                    <img
                                      src={employee.avatar}
                                      alt={employee.name}
                                      className="h-8 w-8 rounded-full mr-2"
                                    />
                                  ) : (
                                    <User className="h-8 w-8 rounded-full mr-2 p-1 bg-primary/10" />
                                  )}
                                  {employee.name}
                                </div>
                              </TableCell>
                              <TableCell>{employee.position}</TableCell>
                              <TableCell>{employee.department}</TableCell>
                              <TableCell>{getInsurancePackageName(employee.insurancePackageId)}</TableCell>
                              <TableCell>
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
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => navigate(`/employees/${employee.id}`)}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No employees found for this company.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/employees/new')} 
                          className="mt-2"
                        >
                          Add Employee
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDetail;
