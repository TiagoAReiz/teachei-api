"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Car, Bike, Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const currentType = searchParams.get("tipo") || "";
  const currentSearch = searchParams.get("search") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/");
  };

  const hasFilters = currentType || currentSearch;

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

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 text-sm">
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



