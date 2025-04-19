
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Building, Users, Edit, ArrowLeft } from 'lucide-react';
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
import { mockCorporates, mockCompanies } from '@/data/mockCorporate';
import { Corporate, Company } from '@/types/corporate';

const CorporateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [corporate, setCorporate] = useState<Corporate | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Find corporate by ID
    const foundCorporate = mockCorporates.find((corp) => corp.id === id);
    if (foundCorporate) {
      setCorporate(foundCorporate);
    }

    // Find companies associated with this corporate
    const relatedCompanies = mockCompanies.filter((comp) => comp.corporateId === id);
    setCompanies(relatedCompanies);
  }, [id]);

  if (!corporate) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl">Corporate not found</h2>
          <Button variant="outline" onClick={() => navigate('/corporates')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Corporates
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
            <Button variant="outline" size="icon" onClick={() => navigate('/corporates')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Corporate Details</h1>
          </div>
          <Button onClick={() => navigate(`/corporates/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Corporate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {corporate.logo ? (
                  <img 
                    src={corporate.logo} 
                    alt={corporate.name} 
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>
              <CardTitle className="text-center">{corporate.name}</CardTitle>
              <CardDescription className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    corporate.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : corporate.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {corporate.status}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p>{corporate.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{corporate.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p>{corporate.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p>{corporate.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                  <p>{new Date(corporate.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Companies</h3>
                  <p>{corporate.companyCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="companies">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="companies">Companies</TabsTrigger>
              </TabsList>
              <TabsContent value="companies" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Associated Companies</CardTitle>
                    <Button size="sm" onClick={() => navigate('/companies/new')}>
                      <Users className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {companies.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Employees</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {company.logo ? (
                                    <img
                                      src={company.logo}
                                      alt={company.name}
                                      className="h-8 w-8 rounded-full mr-2"
                                    />
                                  ) : (
                                    <Building className="h-8 w-8 rounded-full mr-2 p-1 bg-primary/10" />
                                  )}
                                  {company.name}
                                </div>
                              </TableCell>
                              <TableCell>
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
                              </TableCell>
                              <TableCell>{company.contactPerson}</TableCell>
                              <TableCell>{company.employeeCount}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => navigate(`/companies/${company.id}`)}
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
                        <p className="text-muted-foreground">No companies associated with this corporate.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/companies/new')} 
                          className="mt-2"
                        >
                          Add Company
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

export default CorporateDetail;
