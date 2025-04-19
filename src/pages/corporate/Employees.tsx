
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye,
  Building
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { mockEmployees, mockCompanies, mockInsurancePackages } from '@/data/mockCorporate';
import { Employee } from '@/types/corporate';

const Employees = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [companyFilter, setCompanyFilter] = useState<string>('all');

  // Filter employees based on search query and company filter
  const filteredEmployees = employees.filter(
    (employee) => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCompany = 
        companyFilter === 'all' || 
        employee.companyId === companyFilter;
      
      return matchesSearch && matchesCompany;
    }
  );

  const handleView = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const openDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((e) => e.id !== employeeToDelete.id));
      toast({
        title: 'Employee deleted',
        description: `${employeeToDelete.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const getCompanyName = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown';
  };

  const getInsurancePackageName = (packageId: string) => {
    const pkg = mockInsurancePackages.find(p => p.id === packageId);
    return pkg ? pkg.name : 'None';
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <Button onClick={() => navigate('/employees/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={companyFilter} 
                onValueChange={setCompanyFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {mockCompanies.map(company => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableCaption>List of all employees</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Insurance Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
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
                      <TableCell>{getCompanyName(employee.companyId)}</TableCell>
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
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(employee.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(employee.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(employee)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No employees found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {employeeToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Employees;
