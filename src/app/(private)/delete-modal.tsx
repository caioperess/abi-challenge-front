import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IUserModel } from '@/data/users';
import { UsersService } from '@/services/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserModel | null;
}

export const DeleteModal = ({ open, onOpenChange, user }: DeleteModalProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id?: string) => {
      if (!id) {
        throw new Error('User not found');
      }

      await UsersService.deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onOpenChange(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar usuário</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm">
            Tem certeza que deseja deletar o usuário <b>{user?.name}</b>?
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => deleteMutation.mutateAsync(user?.id)}
            disabled={deleteMutation.isPending}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
