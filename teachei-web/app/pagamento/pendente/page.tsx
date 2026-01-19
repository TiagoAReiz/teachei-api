"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, Home, ArrowRight } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intentionId = searchParams.get("id");
  const [countdown, setCountdown] = useState(5);

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
            {/* Pending Icon */}
            <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-warning" size={48} />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Pagamento em processamento
            </h1>
            <p className="text-muted mb-6">
              Seu pagamento está sendo processado. Assim que for confirmado, sua intenção será publicada automaticamente.
            </p>

            {/* Info */}
            <div className="p-4 bg-warning/10 rounded-xl mb-6">
              <p className="text-sm text-warning-foreground">
                Se você gerou um boleto, lembre-se de pagá-lo dentro do prazo de vencimento. A confirmação pode levar até 2 dias úteis.
              </p>
            </div>

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

              <Button 
                variant="ghost" 
                onClick={() => router.push("/my-intentions")} 
                className="w-full"
              >
                <span>Ver todas minhas intenções</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
