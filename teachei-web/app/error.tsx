"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-error" size={32} />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Algo deu errado
        </h1>
        <p className="text-muted mb-8">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCw size={18} />
            Tentar novamente
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Home size={18} />
              Voltar ao início
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-muted">
            Código do erro: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}



