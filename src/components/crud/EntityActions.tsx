
import { useState } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface EntityActionsProps {
  entityId: string;
  entityType: 'patient' | 'doctor' | 'notification' | 'setting';
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewOnly?: boolean;
}

export function EntityActions({
  entityId,
  entityType,
  onView,
  onEdit,
  onDelete,
  viewOnly = false
}: EntityActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const handleView = () => {
    if (onView) {
      onView();
    }
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };
  
  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete();
      toast.success(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully`);
    }
    setShowDeleteDialog(false);
  };
  
  return (
    <>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={handleView} title={`View ${entityType}`}>
          <Eye className="h-4 w-4" />
        </Button>
        
        {!viewOnly && (
          <>
            <Button variant="ghost" size="icon" onClick={handleEdit} title={`Edit ${entityType}`}>
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowDeleteDialog(true)} 
              className="text-destructive"
              title={`Delete ${entityType}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              {' '}{entityType}{' '}and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
