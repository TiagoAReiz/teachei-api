"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, Edit2, CreditCard, Car, Calendar, Palette, DollarSign, Settings, FileText } from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { useCreateIntention } from "@/hooks/use-intentions";
import { formatCurrency, vehicleTypeLabels } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function CreateReviewPage() {
  const router = useRouter();
  const { success, error } = useToast();
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
    transmissao,
    combustivel,
    observacoes,
    reset,
  } = useCreateIntentionStore();

  const { mutate: createIntention, isPending } = useCreateIntention();

  // Redirect if incomplete
  useEffect(() => {
    if (!tipoVeiculo || !marcaCodigo || !modeloCodigo) {
      router.push("/create");
    }
  }, [tipoVeiculo, marcaCodigo, modeloCodigo, router]);

  const handleSubmit = () => {
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
          success("Intenção criada com sucesso!");
          reset();
          // Redirect to payment or intention page
          router.push(`/intention/${data.id}`);
        },
        onError: (err) => {
          error(err.message || "Erro ao criar intenção");
        },
      }
    );
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
    {
      icon: Settings,
      label: "Transmissão",
      value: transmissao || "Qualquer",
    },
    {
      icon: FileText,
      label: "Combustível",
      value: combustivel || "Qualquer",
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
              <p className="text-xl font-bold text-primary">R$ 19,90</p>
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
    </div>
  );
}



