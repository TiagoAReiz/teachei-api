"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, Edit2, CreditCard, Car, Calendar, Palette, DollarSign, Phone } from "lucide-react";
import { Button, Card, CardContent, Badge, Input } from "@/components/ui";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { useCreateIntention } from "@/hooks/use-intentions";
import { useCreatePaymentPreference } from "@/hooks/use-payments";
import { useAuth } from "@/hooks/use-auth";
import { formatCurrency, vehicleTypeLabels } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { redirectToPaymentCheckout } from "@/lib/payments";

export default function CreateReviewPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const { user, updateProfile, isUpdatingProfile } = useAuth();
  
  // Contact phone state - initialized with user's whatsapp if available
  const [telefoneContato, setTelefoneContato] = useState(() => user?.whatsapp || "");
  const [showUpdateProfileDialog, setShowUpdateProfileDialog] = useState(false);
  const hasInitializedRef = useRef(!!user?.whatsapp);
  
  const {
    tipoVeiculo,
    marcaCodigo,
    marcaNome,
    modeloCodigo,
    modeloNome,
    anoMinimo,
    anoMaximo,
    cores,
    precoMaximo,
    observacoes,
    reset,
  } = useCreateIntentionStore();

  const { mutate: createIntention, isPending: isCreating } = useCreateIntention();
  const { mutate: createPaymentPreference, isPending: isCreatingPayment } = useCreatePaymentPreference();
  
  // Track the created intention ID for payment retry
  const [createdIntentionId, setCreatedIntentionId] = useState<string | null>(null);
  const [showPaymentRetry, setShowPaymentRetry] = useState(false);

  const isPending = isCreating || isCreatingPayment;

  // Redirect if incomplete
  useEffect(() => {
    if (!tipoVeiculo || !marcaCodigo || !modeloCodigo) {
      router.push("/create");
    }
  }, [tipoVeiculo, marcaCodigo, modeloCodigo, router]);

  // Pre-fill contact phone from user profile (only once when user data loads)
  // This is a valid pattern for async data initialization
  useEffect(() => {
    if (user?.whatsapp && !hasInitializedRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTelefoneContato(user.whatsapp);
      hasInitializedRef.current = true;
    }
  }, [user?.whatsapp]);

  // Proceed with payment after intention is created
  const proceedWithPayment = (intentionId: string) => {
    createPaymentPreference(intentionId, {
      onSuccess: (preference) => {
        success("Redirecionando para pagamento...");
        reset();
        // Redirect to Mercado Pago checkout
        redirectToPaymentCheckout(preference);
      },
      onError: (err) => {
        error(err.message || "Erro ao criar preferência de pagamento");
        setCreatedIntentionId(intentionId);
        setShowPaymentRetry(true);
      },
    });
  };

  // Retry payment for an already created intention
  const handleRetryPayment = () => {
    if (createdIntentionId) {
      setShowPaymentRetry(false);
      proceedWithPayment(createdIntentionId);
    }
  };

  const proceedWithCreation = () => {
    if (!tipoVeiculo || !marcaNome || !modeloNome || !precoMaximo) return;

    // Build anos array from anoMinimo and anoMaximo
    const anos: number[] = [];
    if (anoMinimo && anoMaximo) {
      for (let year = anoMinimo; year <= anoMaximo; year++) {
        anos.push(year);
      }
    } else if (anoMinimo) {
      anos.push(anoMinimo);
    } else if (anoMaximo) {
      anos.push(anoMaximo);
    }

    createIntention(
      {
        tipo: tipoVeiculo,
        marcaCodigo: marcaCodigo || undefined,
        marcaNome,
        modeloCodigo: modeloCodigo || undefined,
        modeloNome,
        anos,
        cores,
        precoMaximo,
        observacoes: observacoes || undefined,
      },
      {
        onSuccess: (data) => {
          success("Intenção criada! Iniciando pagamento...");
          // Proceed with payment after intention is created
          proceedWithPayment(data.id);
        },
        onError: (err) => {
          error(err.message || "Erro ao criar intenção");
        },
      }
    );
  };

  const handleUpdateProfileAndCreate = () => {
    updateProfile(
      { whatsapp: telefoneContato },
      {
        onSuccess: () => {
          setShowUpdateProfileDialog(false);
          proceedWithCreation();
        },
        onError: (err) => {
          error(err.message || "Erro ao atualizar perfil");
        },
      }
    );
  };

  const handleSkipProfileUpdate = () => {
    // Update profile silently (required for backend) but don't show confirmation
    updateProfile(
      { whatsapp: telefoneContato },
      {
        onSuccess: () => {
          setShowUpdateProfileDialog(false);
          proceedWithCreation();
        },
        onError: (err) => {
          error(err.message || "Erro ao atualizar perfil");
        },
      }
    );
  };

  const handleSubmit = () => {
    if (!tipoVeiculo || !marcaNome || !modeloNome || !precoMaximo) return;

    // Validate contact phone
    if (!telefoneContato || telefoneContato.trim() === "") {
      error("WhatsApp é obrigatório para contato");
      return;
    }

    // Check if phone changed from profile
    if (telefoneContato !== user?.whatsapp) {
      setShowUpdateProfileDialog(true);
      return;
    }

    proceedWithCreation();
  };

  if (!tipoVeiculo || !marcaNome || !modeloNome) return null;

  const summaryItems = [
    {
      icon: Car,
      label: "Veículo",
      value: `${marcaNome} ${modeloNome}`,
      badge: vehicleTypeLabels[tipoVeiculo],
    },
    {
      icon: Calendar,
      label: "Ano",
      value: anoMinimo && anoMaximo 
        ? `${anoMinimo} - ${anoMaximo}` 
        : anoMinimo || anoMaximo 
          ? `${anoMinimo || anoMaximo}` 
          : "Qualquer",
    },
    {
      icon: Palette,
      label: "Cores",
      value: cores.length > 0 ? cores.join(", ") : "Qualquer",
    },
    {
      icon: DollarSign,
      label: "Preço máximo",
      value: precoMaximo ? formatCurrency(precoMaximo) : "Sem limite",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Revise sua intenção
        </h1>
        <p className="text-muted">
          Confirme os detalhes antes de publicar
        </p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {summaryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-muted/10 rounded-lg">
                  <Icon size={20} className="text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
                {item.badge && (
                  <Badge variant="default">{item.badge}</Badge>
                )}
              </div>
            );
          })}

          {observacoes && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted mb-2">Observações</p>
              <p className="text-foreground">{observacoes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Phone Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3">Telefone de contato</h3>
          <p className="text-sm text-muted mb-4">
            Os vendedores entrarão em contato por este número via WhatsApp.
          </p>
          <Input
            value={telefoneContato}
            onChange={(e) => setTelefoneContato(e.target.value)}
            label="WhatsApp"
            placeholder="+5511999998888"
            icon={<Phone size={20} />}
          />
          <p className="text-xs text-muted mt-2">
            Use o formato internacional com código do país (ex: +5511999998888)
          </p>
        </CardContent>
      </Card>

      {/* Edit Button */}
      <button
        onClick={() => router.push("/create")}
        className="flex items-center justify-center gap-2 w-full p-3 text-primary font-medium hover:bg-primary/5 rounded-xl transition-colors"
      >
        <Edit2 size={18} />
        Editar informações
      </button>

      {/* Pricing Info */}
      <Card variant="outlined" className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Taxa de publicação</p>
              <p className="text-sm text-muted">Válido por 30 dias</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xl font-bold text-primary">R$ 2,00</p>
            </div>
          </div>
          <ul className="text-sm text-muted space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-success" />
              Aparece para todos os vendedores
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-success" />
              Receba propostas ilimitadas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-success" />
              Destaque no feed
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="w-full" size="lg" isLoading={isPending}>
        <span>Publicar e Pagar</span>
        <CreditCard size={20} />
      </Button>

      <p className="text-center text-xs text-muted">
        Ao continuar, você será redirecionado para o Mercado Pago para concluir o pagamento.
      </p>

      {/* Update Profile Dialog */}
      <Dialog isOpen={showUpdateProfileDialog} onClose={() => setShowUpdateProfileDialog(false)}>
        <DialogHeader onClose={() => setShowUpdateProfileDialog(false)}>
          <DialogTitle>Atualizar telefone no perfil?</DialogTitle>
          <DialogDescription>
            Você alterou o telefone de contato. Deseja salvar este número no seu perfil para uso futuro?
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="p-4 bg-muted/10 rounded-xl">
            <p className="text-sm text-muted">Novo número:</p>
            <p className="font-medium text-foreground">{telefoneContato}</p>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleSkipProfileUpdate}
            isLoading={isUpdatingProfile}
          >
            Continuar sem salvar
          </Button>
          <Button 
            onClick={handleUpdateProfileAndCreate}
            isLoading={isUpdatingProfile}
          >
            Sim, atualizar perfil
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Payment Retry Dialog */}
      <Dialog isOpen={showPaymentRetry} onClose={() => setShowPaymentRetry(false)}>
        <DialogHeader onClose={() => setShowPaymentRetry(false)}>
          <DialogTitle>Erro no pagamento</DialogTitle>
          <DialogDescription>
            Sua intenção foi criada, mas houve um erro ao iniciar o pagamento. Deseja tentar novamente?
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="p-4 bg-error/10 rounded-xl">
            <p className="text-sm text-error">
              A intenção está pendente de pagamento. Você pode tentar pagar agora ou acessá-la depois em &quot;Minhas Intenções&quot;.
            </p>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowPaymentRetry(false);
              reset();
              router.push("/my-intentions");
            }}
          >
            Ver minhas intenções
          </Button>
          <Button 
            onClick={handleRetryPayment}
            isLoading={isCreatingPayment}
          >
            Tentar novamente
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}



