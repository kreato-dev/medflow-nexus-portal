
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye 
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockCorporates } from '@/data/mockCorporate';
import { Corporate } from '@/types/corporate';

const Corporates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [corporates, setCorporates] = useState<Corporate[]>(mockCorporates);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [corporateToDelete, setCorporateToDelete] = useState<Corporate | null>(null);

  // Filter corporates based on search query
  const filteredCorporates = corporates.filter(
    (corporate) =>
      corporate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corporate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (id: string) => {
    navigate(`/corporates/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/corporates/edit/${id}`);
  };

  const openDeleteDialog = (corporate: Corporate) => {
    setCorporateToDelete(corporate);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (corporateToDelete) {
      setCorporates(corporates.filter((c) => c.id !== corporateToDelete.id));
      toast({
        title: 'Corporate deleted',
        description: `${corporateToDelete.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setCorporateToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Corporate Management</h1>
          <Button onClick={() => navigate('/corporates/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Corporate
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Corporate List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search corporates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Table>
              <TableCaption>List of all corporate clients</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Companies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCorporates.length > 0 ? (
                  filteredCorporates.map((corporate) => (
                    <TableRow key={corporate.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {corporate.logo ? (
                            <img
                              src={corporate.logo}
                              alt={corporate.name}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                          ) : (
                            <Building className="h-8 w-8 rounded-full mr-2 p-1 bg-primary/10" />
                          )}
                          {corporate.name}
                        </div>
                      </TableCell>
                      <TableCell>{corporate.contactPerson}</TableCell>
                      <TableCell>{corporate.email}</TableCell>
                      <TableCell>{corporate.phone}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{corporate.companyCount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(corporate.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(corporate.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(corporate)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No corporates found
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
              Are you sure you want to delete {corporateToDelete?.name}? This action cannot be undone.
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

export default Corporates;
