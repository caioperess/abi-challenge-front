'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/context/auth';
import { IUserModel } from '@/data/users';
import { UsersService } from '@/services/users';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteModal } from './delete-modal';
import { UserFormModal } from './form-modal';

export default function Home() {
  const { signOut } = useAuth();

  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
  });

  const users: IUserModel[] = useMemo(
    () =>
      usersResponse?.users.map((user) => ({
        ...user,
        createdAt: formatDate(user.createdAt),
      })) ?? [],
    [usersResponse],
  );

  const [isUserFormModalOpen, setIsUserFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4 flex-col items-center h-screen bg-gray-500">
        <span className="text-lg text-white font-bold">Carregando...</span>
        <Skeleton className="w-96 h-60" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen bg-indigo-600">
      <div className="mx-auto flex-col flex bg-white p-4 gap-4 rounded-md w-[600px]">
        <Button
          type="button"
          className="w-fit self-end cursor-pointer"
          onClick={() => {
            setSelectedUser(null);
            setIsUserFormModalOpen(true);
          }}
        >
          Adicionar usuário
        </Button>

        <Table>
          <TableCaption>Lista de usuários</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUserFormModalOpen(true);
                    }}
                  >
                    <Pencil />
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button className="w-[400px] cursor-pointer" onClick={() => signOut()}>
        Sair
      </Button>

      <UserFormModal
        open={isUserFormModalOpen}
        onOpenChange={() => setIsUserFormModalOpen(false)}
        user={selectedUser}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
