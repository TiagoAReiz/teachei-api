"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, Home } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { useCreatePaymentPreference } from "@/hooks/use-payments";
import { redirectToPaymentCheckout } from "@/lib/payments";
import { useToast } from "@/components/ui/toast";

export default function PaymentErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intentionId = searchParams.get("id");
  const { error: showError } = useToast();
  
  const { mutate: createPaymentPreference, isPending } = useCreatePaymentPreference();

  const handleRetry = () => {
    if (!intentionId) {
      router.push("/my-intentions");
      return;
    }

    createPaymentPreference(intentionId, {
      onSuccess: (preference) => {
        redirectToPaymentCheckout(preference);
      },
      onError: (err) => {
        showError(err.message || "Erro ao criar preferência de pagamento");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="text-error" size={48} />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Pagamento não concluído
            </h1>
            <p className="text-muted mb-6">
              Houve um problema com o seu pagamento. Sua intenção foi criada mas está pendente de pagamento.
            </p>

            {/* Info */}
            <div className="p-4 bg-muted/10 rounded-xl mb-6">
              <p className="text-sm text-muted">
                Você pode tentar pagar novamente agora ou acessar sua intenção posteriormente em &quot;Minhas Intenções&quot;.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {intentionId && (
                <Button onClick={handleRetry} className="w-full" isLoading={isPending}>
                  <RefreshCw size={20} />
                  <span>Tentar novamente</span>
                </Button>
              )}
              
              <Button variant="outline" onClick={() => router.push("/my-intentions")} className="w-full">
                <span>Ver minhas intenções</span>
              </Button>

              <Button variant="ghost" onClick={() => router.push("/")} className="w-full">
                <Home size={20} />
                <span>Voltar ao feed</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
