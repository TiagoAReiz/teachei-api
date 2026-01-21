"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArrowRight, ChevronRight, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrands, useModels } from "@/hooks/use-vehicles";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { groupModelsByBase, getVersionName } from "@/lib/vehicles";
import { cn } from "@/lib/utils";

export default function CreateVehiclePage() {
  const router = useRouter();
  const {
    tipoVeiculo,
    marcaCodigo,
    marcaNome,
    modeloBaseNome,
    versoesSelecionadas,
    todasVersoes,
    setMarca,
    setModeloBase,
    toggleVersao,
    setTodasVersoes,
  } = useCreateIntentionStore();

  // Redirect if no type selected
  useEffect(() => {
    if (!tipoVeiculo) {
      router.push("/create");
    }
  }, [tipoVeiculo, router]);

  const { data: brands, isLoading: isLoadingBrands } = useBrands(tipoVeiculo);
  const { data: models, isLoading: isLoadingModels } = useModels(tipoVeiculo, marcaCodigo);

  // Group models by base name
  const groupedModels = useMemo(() => {
    if (!models) return [];
    return groupModelsByBase(models);
  }, [models]);

  // Get the currently selected group's versions
  const currentGroup = useMemo(() => {
    if (!modeloBaseNome) return null;
    return groupedModels.find(g => g.baseName === modeloBaseNome);
  }, [groupedModels, modeloBaseNome]);

  const handleSelectBase = (baseName: string) => {
    setModeloBase(baseName);
  };

  const handleToggleVersion = (codigo: string, nome: string) => {
    toggleVersao({ codigo, nome });
  };

  const handleSelectAll = () => {
    if (!currentGroup) return;
    
    if (todasVersoes) {
      // Deselect all
      setTodasVersoes(false);
    } else {
      // Select all versions
      const allVersions = currentGroup.versoes.map(v => ({
        codigo: v.codigo,
        nome: v.nome,
      }));
      setTodasVersoes(true, allVersions);
    }
  };

  const handleContinue = () => {
    if (marcaCodigo && versoesSelecionadas.length > 0) {
      router.push("/create/specs");
    }
  };

  const canContinue = marcaCodigo && versoesSelecionadas.length > 0;

  if (!tipoVeiculo) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Qual veículo você procura?
        </h1>
        <p className="text-muted">
          Selecione a marca, modelo e versões desejadas
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

      {/* Model Selection (Grouped) */}
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
            <div className="max-h-72 overflow-y-auto space-y-2 border border-border rounded-xl p-2">
              {groupedModels.map((group) => {
                const isSelected = modeloBaseNome === group.baseName;
                const versionCount = group.versoes.length;
                
                return (
                  <button
                    key={group.baseName}
                    onClick={() => handleSelectBase(group.baseName)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left",
                      isSelected
                        ? "bg-primary text-white"
                        : "hover:bg-muted/10"
                    )}
                  >
                    <div>
                      <span className="font-medium">{group.baseName}</span>
                      <span className={cn(
                        "ml-2 text-sm",
                        isSelected ? "text-white/80" : "text-muted"
                      )}>
                        ({versionCount} {versionCount === 1 ? "versão" : "versões"})
                      </span>
                    </div>
                    {isSelected ? (
                      <ChevronDown size={18} className="text-white" />
                    ) : (
                      <ChevronRight size={18} className="text-muted" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Version Selection (Multi-select) */}
      {currentGroup && (
        <div className="space-y-3 animate-slide-up">
          <label className="block text-sm font-medium text-foreground">
            Versões do {modeloBaseNome}
          </label>
          
          <div className="border border-border rounded-xl p-2 space-y-2">
            {/* Select All Option */}
            <button
              onClick={handleSelectAll}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left border-b border-border pb-3 mb-1",
                todasVersoes
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted/10"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                todasVersoes ? "bg-primary border-primary" : "border-muted"
              )}>
                {todasVersoes && (
                  <Check size={14} className="text-white" />
                )}
              </div>
              <span className="font-medium">Selecionar todas as versões</span>
            </button>

            {/* Individual Versions */}
            <div className="max-h-48 overflow-y-auto space-y-1">
              {currentGroup.versoes.map((version) => {
                const isSelected = versoesSelecionadas.some(v => v.codigo === version.codigo);
                const versionName = getVersionName(version.nome, modeloBaseNome || "");
                
                return (
                  <button
                    key={version.codigo}
                    onClick={() => handleToggleVersion(version.codigo, version.nome)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/10"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary border-primary" : "border-muted"
                    )}>
                      {isSelected && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    <span className="font-medium">{versionName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {versoesSelecionadas.length > 0 && (
            <p className="text-sm text-success">
              {todasVersoes 
                ? "Todas as versões selecionadas" 
                : `${versoesSelecionadas.length} versão(ões) selecionada(s)`
              }
            </p>
          )}
        </div>
      )}

      {/* Selected Summary */}
      {marcaNome && versoesSelecionadas.length > 0 && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl animate-scale-in">
          <p className="text-sm text-muted mb-1">Selecionado:</p>
          <p className="font-bold text-foreground">
            {marcaNome} {modeloBaseNome}
          </p>
          {todasVersoes ? (
            <p className="text-sm text-muted mt-1">Todas as versões</p>
          ) : versoesSelecionadas.length > 1 ? (
            <p className="text-sm text-muted mt-1">
              {versoesSelecionadas.length} versões selecionadas
            </p>
          ) : (
            <p className="text-sm text-muted mt-1">
              {getVersionName(versoesSelecionadas[0].nome, modeloBaseNome || "")}
            </p>
          )}
        </div>
      )}

      <Button
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full"
        size="lg"
      >
        <span>Continuar</span>
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}
