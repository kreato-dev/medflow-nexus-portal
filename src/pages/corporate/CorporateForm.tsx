
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
import { mockCorporates } from '@/data/mockCorporate';
import { Corporate } from '@/types/corporate';

const CorporateForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Corporate>>({
    name: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'active',
    companyCount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const corporate = mockCorporates.find((corp) => corp.id === id);
      if (corporate) {
        setFormData(corporate);
      } else {
        toast({
          title: "Corporate not found",
          description: "Unable to load corporate data for editing.",
          variant: "destructive",
        });
        navigate('/corporates');
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      status: value as 'active' | 'inactive' | 'pending' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.contactPerson) {
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
            title: "Corporate updated",
            description: `${formData.name} has been updated successfully.`,
          });
        } else {
          toast({
            title: "Corporate created",
            description: `${formData.name} has been created successfully.`,
          });
        }
        navigate('/corporates');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the corporate.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/corporates')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Corporate' : 'Add New Corporate'}
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Corporate' : 'Add New Corporate'}</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Update the corporate information below.'
                : 'Enter the new corporate details below.'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Corporate Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter corporate name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="Enter contact person name"
                  value={formData.contactPerson}
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

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="companyCount">Company Count</Label>
                  <Input
                    id="companyCount"
                    name="companyCount"
                    type="number"
                    placeholder="Enter number of companies"
                    value={formData.companyCount}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/corporates')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Corporate' : 'Create Corporate'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CorporateForm;
