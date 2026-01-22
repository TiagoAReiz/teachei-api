"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Car, Bike, Truck, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Select, CurrencyInput } from "@/components/ui";
import { useMarcas, useModelos } from "@/hooks/use-vehicles";
import { vehicleOptions } from "@/lib/vehicle-options";
import { cn } from "@/lib/utils";
import type { TipoVeiculo } from "@/types";

const vehicleTypes: { value: TipoVeiculo | ""; label: string; icon: typeof Car }[] = [
  { value: "", label: "Todos", icon: Car },
  { value: "CARRO", label: "Carros", icon: Car },
  { value: "MOTO", label: "Motos", icon: Bike },
  { value: "CAMINHAO", label: "Caminhões", icon: Truck },
];

interface FilterState {
  tipo: TipoVeiculo | "";
  marca: string;
  modelo: string;
  opcionais: string[];
  precoMin: number | null;
  precoMax: number | null;
  anoMin: number | null;
  anoMax: number | null;
}

interface FilterPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export function FilterPanel({ isCollapsed, onToggleCollapse, className }: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const [filters, setFilters] = useState<FilterState>({
    tipo: (searchParams.get("tipo") as TipoVeiculo) || "",
    marca: searchParams.get("marca") || "",
    modelo: searchParams.get("modelo") || "",
    opcionais: searchParams.get("opcionais")?.split(",").filter(Boolean) || [],
    precoMin: searchParams.get("precoMin") ? parseInt(searchParams.get("precoMin")!) : null,
    precoMax: searchParams.get("precoMax") ? parseInt(searchParams.get("precoMax")!) : null,
    anoMin: searchParams.get("anoMin") ? parseInt(searchParams.get("anoMin")!) : null,
    anoMax: searchParams.get("anoMax") ? parseInt(searchParams.get("anoMax")!) : null,
  });

  // Fetch brands when vehicle type is selected
  const { data: marcas, isLoading: isLoadingMarcas } = useMarcas(filters.tipo || null);
  
  // Fetch models when brand is selected
  const { data: modelos, isLoading: isLoadingModelos } = useModelos(
    filters.tipo || null,
    filters.marca || null
  );

  // Build year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

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

  const applyFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.tipo) params.set("tipo", newFilters.tipo);
    if (newFilters.marca) params.set("marca", newFilters.marca);
    if (newFilters.modelo) params.set("modelo", newFilters.modelo);
    if (newFilters.opcionais.length > 0) params.set("opcionais", newFilters.opcionais.join(","));
    if (newFilters.precoMin !== null) params.set("precoMin", newFilters.precoMin.toString());
    if (newFilters.precoMax !== null) params.set("precoMax", newFilters.precoMax.toString());
    if (newFilters.anoMin !== null) params.set("anoMin", newFilters.anoMin.toString());
    if (newFilters.anoMax !== null) params.set("anoMax", newFilters.anoMax.toString());
    
    // Keep search param if exists
    const search = searchParams.get("search");
    if (search) params.set("search", search);

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleTipoChange = (tipo: TipoVeiculo | "") => {
    const newFilters = { ...filters, tipo, marca: "", modelo: "" };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleMarcaChange = (marca: string) => {
    const newFilters = { ...filters, marca, modelo: "" };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleModeloChange = (modelo: string) => {
    const newFilters = { ...filters, modelo };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleOpcional = (opcional: string) => {
    const newOpcionais = filters.opcionais.includes(opcional)
      ? filters.opcionais.filter((o) => o !== opcional)
      : [...filters.opcionais, opcional];
    const newFilters = { ...filters, opcionais: newOpcionais };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClear = () => {
    const cleared: FilterState = {
      tipo: "",
      marca: "",
      modelo: "",
      opcionais: [],
      precoMin: null,
      precoMax: null,
      anoMin: null,
      anoMax: null,
    };
    setFilters(cleared);
    applyFilters(cleared);
  };

  const handleApply = () => {
    applyFilters(filters);
  };

  if (isCollapsed) {
    return (
      <div className={cn("w-12 bg-surface border-r border-border flex flex-col items-center py-4", className)}>
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
          title="Expandir filtros"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("w-72 bg-surface border-r border-border flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">Filtros</h2>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
          title="Colapsar filtros"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Vehicle Type */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Tipo de Veículo
          </label>
          <div className="flex flex-wrap gap-1.5">
            {vehicleTypes.map((type) => {
              const Icon = type.icon;
              const isActive = filters.tipo === type.value;

              return (
                <button
                  key={type.value}
                  onClick={() => handleTipoChange(type.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-medium text-xs transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-background border border-border text-foreground hover:bg-muted/10"
                  )}
                >
                  <Icon size={14} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Marca
          </label>
          {!filters.tipo && (
            <div className="flex items-center gap-1.5 p-2 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>Selecione um tipo de veículo primeiro</span>
            </div>
          )}
          <Select
            options={marcaOptions}
            value={filters.marca}
            onChange={(e) => handleMarcaChange(e.target.value)}
            disabled={!filters.tipo || isLoadingMarcas}
            className="text-sm"
          />
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Modelo
          </label>
          {!filters.marca && filters.tipo && (
            <div className="flex items-center gap-1.5 p-2 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>Selecione uma marca primeiro</span>
            </div>
          )}
          <Select
            options={modeloOptions}
            value={filters.modelo}
            onChange={(e) => handleModeloChange(e.target.value)}
            disabled={!filters.marca || isLoadingModelos}
            className="text-sm"
          />
        </div>

        {/* Optional Features */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Opcionais
          </label>
          <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto">
            {vehicleOptions.slice(0, 8).map((option) => {
              const isSelected = filters.opcionais.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleOpcional(option.value)}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-colors text-left text-xs",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-muted text-foreground"
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "bg-primary border-primary" : "border-muted"
                  )}>
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Faixa de Preço
          </label>
          <div className="grid grid-cols-2 gap-2">
            <CurrencyInput
              label=""
              placeholder="Mínimo"
              value={filters.precoMin}
              onChange={(value) => setFilters((prev) => ({ ...prev, precoMin: value }))}
            />
            <CurrencyInput
              label=""
              placeholder="Máximo"
              value={filters.precoMax}
              onChange={(value) => setFilters((prev) => ({ ...prev, precoMax: value }))}
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted uppercase tracking-wide">
            Faixa de Ano
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              options={[{ value: "", label: "De" }, ...yearOptions]}
              value={filters.anoMin?.toString() || ""}
              onChange={(e) => setFilters((prev) => ({ 
                ...prev, 
                anoMin: e.target.value ? parseInt(e.target.value) : null 
              }))}
              className="text-sm"
            />
            <Select
              options={[{ value: "", label: "Até" }, ...yearOptions]}
              value={filters.anoMax?.toString() || ""}
              onChange={(e) => setFilters((prev) => ({ 
                ...prev, 
                anoMax: e.target.value ? parseInt(e.target.value) : null 
              }))}
              className="text-sm"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border flex gap-2">
        <Button variant="outline" onClick={handleClear} className="flex-1 text-sm" size="sm">
          Limpar
        </Button>
        <Button onClick={handleApply} className="flex-1 text-sm" size="sm">
          Aplicar
        </Button>
      </div>
    </div>
  );
}
