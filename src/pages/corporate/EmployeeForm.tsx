
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { mockEmployees, mockCompanies, mockInsurancePackages } from '@/data/mockCorporate';
import { Employee } from '@/types/corporate';

const EmployeeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    position: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
    insurancePackageId: '',
    companyId: '',
    phone: '',
    address: '',
    emergencyContact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const employee = mockEmployees.find((emp) => emp.id === id);
      if (employee) {
        setFormData(employee);
      } else {
        toast({
          title: "Employee not found",
          description: "Unable to load employee data for editing.",
          variant: "destructive",
        });
        navigate('/employees');
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.position || !formData.companyId) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, this would send data to an API
      setTimeout(() => {
        if (isEditing) {
          toast({
            title: "Employee updated",
            description: `${formData.name} has been updated successfully.`,
          });
        } else {
          toast({
            title: "Employee created",
            description: `${formData.name} has been created successfully.`,
          });
        }
        navigate('/employees');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the employee.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/employees')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Employee' : 'Add New Employee'}</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Update the employee information below.'
                : 'Enter the new employee details below.'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyId">Company *</Label>
                <Select 
                  value={formData.companyId} 
                  onValueChange={(value) => handleSelectChange('companyId', value)}
                >
                  <SelectTrigger id="companyId">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCompanies.map(company => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter employee's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="Enter job position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date *</Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter home address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  placeholder="Name: Phone number"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurancePackageId">Insurance Package</Label>
                <Select 
                  value={formData.insurancePackageId} 
                  onValueChange={(value) => handleSelectChange('insurancePackageId', value)}
                >
                  <SelectTrigger id="insurancePackageId">
                    <SelectValue placeholder="Select insurance package" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInsurancePackages.map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.premium}/{pkg.premiumFrequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/employees')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Employee' : 'Create Employee'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeForm;
