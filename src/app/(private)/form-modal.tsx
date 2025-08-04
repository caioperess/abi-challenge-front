'use client';

import { HookFormInput } from '@/components/form/hook-form-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { IUserModel } from '@/data/users';
import { UsersService } from '@/services/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userSchema, UserSchemaType } from './schema';

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserModel | null;
}

export const UserFormModal = ({
  open,
  onOpenChange,
  user,
}: UserFormModalProps) => {
  const queryClient = useQueryClient();

  const formMethods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    values: {
      id: user?.id ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: UserSchemaType) => {
      if (user) {
        await UsersService.updateUser(user.id, data);
      } else {
        await UsersService.createUser(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onOpenChange(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = async (data: UserSchemaType) => {
    try {
      await createUserMutation.mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Form {...formMethods}>
        <form id="user-form" onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{user ? 'Editar' : 'Adicionar'} usuário</DialogTitle>

              <DialogDescription>
                Preencha os campos abaixo para {user ? 'editar' : 'adicionar'}{' '}
                um usuário.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <HookFormInput
                label="Nome"
                name="name"
                placeholder="Nome"
                required
              />

              <HookFormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />

              {!user && (
                <HookFormInput
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Senha"
                />
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                form="user-form"
                type="submit"
                className="cursor-pointer"
                disabled={createUserMutation.isPending}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
