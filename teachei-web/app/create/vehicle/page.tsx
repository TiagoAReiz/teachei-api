"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, Search, ChevronRight } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrands, useModels } from "@/hooks/use-vehicles";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { cn } from "@/lib/utils";

export default function CreateVehiclePage() {
  const router = useRouter();
  const {
    tipoVeiculo,
    marcaCodigo,
    marcaNome,
    modeloCodigo,
    modeloNome,
    setMarca,
    setModelo,
  } = useCreateIntentionStore();

  // Redirect if no type selected
  useEffect(() => {
    if (!tipoVeiculo) {
      router.push("/create");
    }
  }, [tipoVeiculo, router]);

  const { data: brands, isLoading: isLoadingBrands } = useBrands(tipoVeiculo);
  const { data: models, isLoading: isLoadingModels } = useModels(tipoVeiculo, marcaCodigo);

  const handleContinue = () => {
    if (marcaCodigo && modeloCodigo) {
      router.push("/create/specs");
    }
  };

  if (!tipoVeiculo) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Qual veículo você procura?
        </h1>
        <p className="text-muted">
          Selecione a marca e o modelo desejado
        </p>
      </div>

      {/* Brand Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Marca
        </label>
        
        {isLoadingBrands ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-2 border border-border rounded-xl p-2">
            {brands?.map((brand) => {
              const isSelected = marcaCodigo === brand.codigo;
              return (
                <button
                  key={brand.codigo}
                  onClick={() => setMarca(brand.codigo, brand.nome)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left",
                    isSelected
                      ? "bg-primary text-white"
                      : "hover:bg-muted/10"
                  )}
                >
                  <span className="font-medium">{brand.nome}</span>
                  <ChevronRight size={18} className={isSelected ? "text-white" : "text-muted"} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Model Selection */}
      {marcaCodigo && (
        <div className="space-y-3 animate-slide-up">
          <label className="block text-sm font-medium text-foreground">
            Modelo
          </label>
          
          {isLoadingModels ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2 border border-border rounded-xl p-2">
              {models?.map((model) => {
                const isSelected = modeloCodigo === model.codigo;
                return (
                  <button
                    key={model.codigo}
                    onClick={() => setModelo(model.codigo, model.nome)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left",
                      isSelected
                        ? "bg-primary text-white"
                        : "hover:bg-muted/10"
                    )}
                  >
                    <span className="font-medium">{model.nome}</span>
                    <ChevronRight size={18} className={isSelected ? "text-white" : "text-muted"} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Summary */}
      {marcaNome && modeloNome && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl animate-scale-in">
          <p className="text-sm text-muted mb-1">Selecionado:</p>
          <p className="font-bold text-foreground">{marcaNome} {modeloNome}</p>
        </div>
      )}

      <Button
        onClick={handleContinue}
        disabled={!marcaCodigo || !modeloCodigo}
        className="w-full"
        size="lg"
      >
        <span>Continuar</span>
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}



