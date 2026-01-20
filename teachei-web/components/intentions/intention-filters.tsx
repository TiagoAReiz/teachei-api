"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Car, Bike, Truck, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui";
import { useMarcas, useModelos } from "@/hooks/use-vehicles";
import type { TipoVeiculo } from "@/types";

const vehicleTypes: { value: TipoVeiculo | ""; label: string; icon: typeof Car }[] = [
  { value: "", label: "Todos", icon: Car },
  { value: "CARRO", label: "Carros", icon: Car },
  { value: "MOTO", label: "Motos", icon: Bike },
  { value: "CAMINHAO", label: "Caminhões", icon: Truck },
];

interface IntentionFiltersProps {
  className?: string;
}

export function IntentionFilters({ className }: IntentionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = (searchParams.get("tipo") as TipoVeiculo) || "";
  const currentSearch = searchParams.get("search") || "";
  const currentMarca = searchParams.get("marca") || "";
  const currentModelo = searchParams.get("modelo") || "";

  // Fetch brands when vehicle type is selected
  const { data: marcas, isLoading: isLoadingMarcas } = useMarcas(currentType || undefined);
  
  // Fetch models when brand is selected
  const { data: modelos, isLoading: isLoadingModelos } = useModelos(
    currentType || undefined,
    currentMarca || undefined
  );

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Clear dependent filters
    if (key === "tipo") {
      params.delete("marca");
      params.delete("modelo");
    }
    if (key === "marca") {
      params.delete("modelo");
    }
    
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/");
  };

  const hasFilters = currentType || currentSearch || currentMarca || currentModelo;
  
  // Build brand options
  const marcaOptions = [
    { value: "", label: "Todas as marcas" },
    ...(marcas?.map((m) => ({ value: m.codigo, label: m.nome })) || []),
  ];
  
  // Build model options
  const modeloOptions = [
    { value: "", label: "Todos os modelos" },
    ...(modelos?.map((m) => ({ value: m.codigo, label: m.nome })) || []),
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Vehicle Type Chips */}
      <div className="flex flex-wrap gap-2">
        {vehicleTypes.map((type) => {
          const Icon = type.icon;
          const isActive = currentType === type.value;

          return (
            <button
              key={type.value}
              onClick={() => updateFilter("tipo", type.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-foreground hover:bg-muted/10"
              )}
            >
              <Icon size={16} />
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Brand and Model Filters - show when vehicle type is selected */}
      {currentType && (
        <div className="flex flex-wrap gap-3 items-center">
          <Filter size={16} className="text-muted" />
          <Select
            options={marcaOptions}
            value={currentMarca}
            onChange={(e) => updateFilter("marca", e.target.value)}
            disabled={isLoadingMarcas}
            className="min-w-[160px]"
          />
          {currentMarca && (
            <Select
              options={modeloOptions}
              value={currentModelo}
              onChange={(e) => updateFilter("modelo", e.target.value)}
              disabled={isLoadingModelos}
              className="min-w-[180px]"
            />
          )}
        </div>
      )}

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Filtros ativos:</span>
          
          {currentType && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              {vehicleTypes.find((t) => t.value === currentType)?.label}
              <button
                onClick={() => updateFilter("tipo", "")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {currentMarca && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              {marcas?.find((m) => m.codigo === currentMarca)?.nome || currentMarca}
              <button
                onClick={() => updateFilter("marca", "")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {currentModelo && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              {modelos?.find((m) => m.codigo === currentModelo)?.nome || currentModelo}
              <button
                onClick={() => updateFilter("modelo", "")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}

          {currentSearch && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
              &quot;{currentSearch}&quot;
              <button
                onClick={() => updateFilter("search", "")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}

          <button
            onClick={clearFilters}
            className="text-muted hover:text-foreground transition-colors ml-2"
          >
            Limpar tudo
          </button>
        </div>
      )}
    </div>
  );
}



