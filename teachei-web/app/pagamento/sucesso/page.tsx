"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Home, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { useIntention } from "@/hooks/use-intentions";

type PaymentState = "checking" | "confirmed" | "pending";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intentionId = searchParams.get("id");
  const [paymentState, setPaymentState] = useState<PaymentState>("checking");
  const [pollCount, setPollCount] = useState(0);
  const [countdown, setCountdown] = useState(5);

  // Fetch intention to check status
  const { data: intention, refetch, isLoading } = useIntention(intentionId || "");

  // Poll for status update
  const pollStatus = useCallback(async () => {
    if (!intentionId) {
      setPaymentState("confirmed"); // No ID, assume success
      return;
    }

    const result = await refetch();
    const status = result.data?.status;
    
    if (status === "ATIVO") {
      setPaymentState("confirmed");
    } else if (pollCount >= 10) {
      // Max 10 polls (30 seconds), show pending state
      setPaymentState("pending");
    } else {
      setPollCount((prev) => prev + 1);
    }
  }, [intentionId, refetch, pollCount]);

  // Initial check and polling
  useEffect(() => {
    if (!intentionId) {
      setPaymentState("confirmed");
      return;
    }

    if (intention?.status === "ATIVO") {
      setPaymentState("confirmed");
      return;
    }

    if (paymentState === "checking" && pollCount < 10) {
      const timer = setTimeout(pollStatus, 3000); // Poll every 3 seconds
      return () => clearTimeout(timer);
    }
  }, [intentionId, intention?.status, paymentState, pollCount, pollStatus]);

  // Countdown timer for redirect (only when confirmed)
  useEffect(() => {
    if (paymentState !== "confirmed") return;

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
  }, [router, paymentState]);

  // Show checking state
  if (paymentState === "checking") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="text-primary animate-spin" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Verificando pagamento...
          </h1>
          <p className="text-muted mb-6">
            Aguarde enquanto confirmamos seu pagamento com o Mercado Pago.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted">
            <Clock size={16} />
            <span>Tentativa {pollCount + 1} de 10</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show pending state (webhook didn't confirm)
  if (paymentState === "pending") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="text-warning" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pagamento em processamento
          </h1>
          <p className="text-muted mb-6">
            Seu pagamento está sendo processado. Isso pode levar alguns minutos.
            Você pode acompanhar o status em &quot;Minhas Intenções&quot;.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/my-intentions")} className="w-full">
              <span>Ver Minhas Intenções</span>
              <ArrowRight size={20} />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setPollCount(0);
                setPaymentState("checking");
              }} 
              className="w-full"
            >
              <RefreshCw size={20} />
              <span>Verificar novamente</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Confirmed state
  return (
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
  );
}

function LoadingFallback() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-muted">Carregando...</p>
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Suspense fallback={<LoadingFallback />}>
          <PaymentSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
