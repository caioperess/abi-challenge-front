'use client';

import { HookFormInput } from '@/components/form/hook-form-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/context/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, RedirectType } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signInSchema, SignInType } from '../schema';

export default function SignIn() {
  const { signIn } = useAuth();

  const formMethods = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = async (data: any) => {
    try {
      await signIn(data);

      redirect('/', RedirectType.replace);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-600">
      <Form {...formMethods}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>

            <CardDescription>
              Forneça seu email e senha para fazer login
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="sign-in-form"
              onSubmit={formMethods.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <HookFormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <HookFormInput
                    label="Senha"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              form="sign-in-form"
              type="submit"
              className="w-full cursor-pointer"
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
