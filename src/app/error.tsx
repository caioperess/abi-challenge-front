'use client'

import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Readonly<ErrorProps>) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Erro</h2>
        <p>Algo deu errado</p>
        <p>Por favor, tente novamente</p>

        <div className="rounded-sm bg-muted p-2">
          <span className="text-sm text-muted-foreground">
            Error: {error.message}
          </span>
        </div>
      </div>

      <Button onClick={() => reset()}>Tentar novamente</Button>
    </div>
  );
}
