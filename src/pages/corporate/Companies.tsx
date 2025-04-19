
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye,
  Users
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
import { mockCompanies, mockCorporates } from '@/data/mockCorporate';
import { Company } from '@/types/corporate';

const Companies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [corporateFilter, setCorporateFilter] = useState<string>('all');

  // Filter companies based on search query and corporate filter
  const filteredCompanies = companies.filter(
    (company) => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCorporate = 
        corporateFilter === 'all' || 
        company.corporateId === corporateFilter;
      
      return matchesSearch && matchesCorporate;
    }
  );

  const handleView = (id: string) => {
    navigate(`/companies/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/companies/edit/${id}`);
  };

  const openDeleteDialog = (company: Company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (companyToDelete) {
      setCompanies(companies.filter((c) => c.id !== companyToDelete.id));
      toast({
        title: 'Company deleted',
        description: `${companyToDelete.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setCompanyToDelete(null);
    }
  };

  const getCorporateName = (corporateId: string) => {
    const corporate = mockCorporates.find(c => c.id === corporateId);
    return corporate ? corporate.name : 'Unknown';
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Company Management</h1>
          <Button onClick={() => navigate('/companies/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={corporateFilter} 
                onValueChange={setCorporateFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Corporate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Corporates</SelectItem>
                  {mockCorporates.map(corporate => (
                    <SelectItem key={corporate.id} value={corporate.id}>
                      {corporate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableCaption>List of all companies</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Corporate</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
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
                      <TableCell>{getCorporateName(company.corporateId)}</TableCell>
                      <TableCell>{company.contactPerson}</TableCell>
                      <TableCell>{company.email}</TableCell>
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
                      <TableCell>{company.employeeCount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(company.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(company.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(company)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No companies found
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
              Are you sure you want to delete {companyToDelete?.name}? This action cannot be undone.
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

export default Companies;
