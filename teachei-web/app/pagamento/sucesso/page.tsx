"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Home, ArrowRight } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intentionId = searchParams.get("id");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-success" size={48} />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Pagamento confirmado!
            </h1>
            <p className="text-muted mb-6">
              Sua intenção de compra foi publicada com sucesso e já está visível para os vendedores.
            </p>

            {/* Countdown */}
            <p className="text-sm text-muted mb-6">
              Redirecionando para o feed em {countdown} segundos...
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={() => router.push("/")} className="w-full">
                <Home size={20} />
                <span>Ir para o feed</span>
              </Button>
              
              {intentionId && (
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/intention/${intentionId}`)} 
                  className="w-full"
                >
                  <span>Ver minha intenção</span>
                  <ArrowRight size={20} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
