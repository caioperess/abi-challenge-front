import { z } from 'zod';

export const userSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, 'Campo obrigatório'),
    email: z.email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.id && !data.password) {
      ctx.addIssue({
        path: ['password'],
        code: 'custom',
        message: 'Senha é obrigatória',
      });
    }
  });

export type UserSchemaType = z.infer<typeof userSchema>;
