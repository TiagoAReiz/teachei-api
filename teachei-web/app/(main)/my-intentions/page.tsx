"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Clock, CheckCircle, AlertCircle, CreditCard, Trash2 } from "lucide-react";
import { Button, Card, CardContent, Badge, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui";
import { useMyIntentions, useDeleteIntention } from "@/hooks/use-intentions";
import { useCreatePaymentPreference } from "@/hooks/use-payments";
import { formatCurrency, formatRelativeTime, statusLabels, vehicleTypeLabels } from "@/lib/utils";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { redirectToPaymentCheckout } from "@/lib/payments";
import type { StatusAnuncio } from "@/types";

const statusFilters: { value: StatusAnuncio | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "ATIVO", label: "Ativos" },
  { value: "PENDENTE_PAGAMENTO", label: "Pendentes" },
  { value: "FINALIZADO", label: "Finalizados" },
];

const statusIcons: Record<StatusAnuncio, typeof Clock> = {
  ATIVO: CheckCircle,
  PENDENTE_PAGAMENTO: Clock,
  FINALIZADO: CheckCircle,
  EXPIRADO: AlertCircle,
};

const statusBadgeVariants: Record<StatusAnuncio, "success" | "warning" | "default" | "error"> = {
  ATIVO: "success",
  PENDENTE_PAGAMENTO: "warning",
  FINALIZADO: "default",
  EXPIRADO: "error",
};

export default function MyIntentionsPage() {
  const router = useRouter();
  const { data: intentions, isLoading } = useMyIntentions();
  const [filter, setFilter] = useState<StatusAnuncio | "">("");
  const [payingIntentionId, setPayingIntentionId] = useState<string | null>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);
  const { error: showError, success: showSuccess } = useToast();
  
  const { mutate: createPaymentPreference, isPending: isCreatingPayment } = useCreatePaymentPreference();
  const { mutate: deleteIntention, isPending: isDeleting } = useDeleteIntention();

  const handlePayNow = (intentionId: string) => {
    setPayingIntentionId(intentionId);
    createPaymentPreference(intentionId, {
      onSuccess: (preference) => {
        showSuccess("Redirecionando para pagamento...");
        redirectToPaymentCheckout(preference);
      },
      onError: (err) => {
        showError(err.message || "Erro ao criar preferência de pagamento");
        setPayingIntentionId(null);
      },
    });
  };

  const handleDelete = () => {
    if (!deleteDialogId) return;
    
    deleteIntention(deleteDialogId, {
      onSuccess: () => {
        showSuccess("Intenção excluída com sucesso");
        setDeleteDialogId(null);
      },
      onError: (err) => {
        showError(err.message || "Erro ao excluir intenção");
      },
    });
  };

  const filteredIntentions = filter
    ? intentions?.filter((i) => i.status === filter)
    : intentions;

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minhas Intenções</h1>
          <p className="text-muted">Gerencie suas intenções de compra</p>
        </div>
        <Button onClick={() => router.push("/create")}>
          <Plus size={20} />
          Nova Intenção
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((status) => (
          <button
            key={status.value}
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              filter === status.value
                ? "bg-primary text-white"
                : "bg-surface border border-border text-foreground hover:bg-muted/10"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Intentions List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredIntentions?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mb-6">
            <Plus className="text-muted" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma intenção encontrada
          </h3>
          <p className="text-muted text-center max-w-sm mb-6">
            Crie sua primeira intenção de compra para encontrar o veículo ideal.
          </p>
          <Button onClick={() => router.push("/create")}>
            Criar Intenção
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntentions?.map((intention) => {
            const StatusIcon = statusIcons[intention.status];
            const anos = intention.veiculo.anos;
            const anoDisplay = anos.length > 1 
              ? `${Math.min(...anos)} - ${Math.max(...anos)}`
              : anos.length === 1 
                ? anos[0].toString()
                : "Qualquer ano";
            
            return (
              <Card key={intention.id} hoverable onClick={() => router.push(`/intention/${intention.id}`)}>
                <CardContent className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" size="sm">
                        {vehicleTypeLabels[intention.tipo]}
                      </Badge>
                      <h3 className="font-bold text-lg text-foreground mt-2">
                        {intention.veiculo.marcaNome} {intention.veiculo.modeloNome}
                      </h3>
                    </div>
                    <Badge variant={statusBadgeVariants[intention.status]} size="sm">
                      <StatusIcon size={12} className="mr-1" />
                      {statusLabels[intention.status]}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-muted">
                    {anoDisplay}
                    {intention.veiculo.precoMaximo && (
                      <> • até {formatCurrency(intention.veiculo.precoMaximo)}</>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border text-muted text-sm">
                    <span className="ml-auto">
                      {formatRelativeTime(intention.criadoEm)}
                    </span>
                  </div>

                  {/* Actions for pending */}
                  {intention.status === "PENDENTE_PAGAMENTO" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayNow(intention.id);
                        }}
                        isLoading={isCreatingPayment && payingIntentionId === intention.id}
                      >
                        <CreditCard size={16} />
                        <span>Pagar</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialogId(intention.id);
                        }}
                        className="text-error hover:bg-error/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog isOpen={!!deleteDialogId} onClose={() => setDeleteDialogId(null)}>
        <DialogHeader onClose={() => setDeleteDialogId(null)}>
          <DialogTitle>Excluir Intenção</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta intenção de compra? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteDialogId(null)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="bg-error hover:bg-error/90"
          >
            Excluir
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}



