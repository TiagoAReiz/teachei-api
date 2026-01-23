"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Car, Bike, Truck, AlertCircle } from "lucide-react";
import { Button, Select, CurrencyInput } from "@/components/ui";
import { useMarcas, useModelos } from "@/hooks/use-vehicles";
import { vehicleOptions } from "@/lib/vehicle-options";
import { cn, generateYearOptions } from "@/lib/utils";
import { groupModelsByBase } from "@/lib/vehicles";
import type { TipoVeiculo } from "@/types";

const vehicleTypes: { value: TipoVeiculo | ""; label: string; icon: typeof Car }[] = [
  { value: "", label: "Todos", icon: Car },
  { value: "CARRO", label: "Carros", icon: Car },
  { value: "MOTO", label: "Motos", icon: Bike },
  { value: "CAMINHAO", label: "Caminhões", icon: Truck },
];

export interface FilterState {
  tipo: TipoVeiculo | "";
  marca: string;
  modelo: string; // Base model name (e.g., "Onix")
  versao: string; // Specific version code (e.g., "1234-5")
  modeloCodigos?: string[]; // All version codes for base model (computed when applying)
  opcionais: string[];
  precoMin: number | null;
  precoMax: number | null;
  anoMin: number | null;
  anoMax: number | null;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
}

export function FilterSidebar({ isOpen, onClose, initialFilters, onApply }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Reset local state when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Fetch brands when vehicle type is selected
  const { data: marcas, isLoading: isLoadingMarcas } = useMarcas(filters.tipo || null);
  
  // Fetch models when brand is selected
  const { data: modelos, isLoading: isLoadingModelos } = useModelos(
    filters.tipo || null,
    filters.marca || null
  );

  // Build year options (includes next year)
  const yearOptions = generateYearOptions(30);

  // Build brand options
  const marcaOptions = [
    { value: "", label: "Todas as marcas" },
    ...(marcas?.map((m) => ({ value: m.codigo, label: m.nome })) || []),
  ];
  
  // Group models by base name
  const groupedModels = useMemo(() => {
    if (!modelos) return [];
    return groupModelsByBase(modelos);
  }, [modelos]);

  // Build base model options (grouped)
  const modeloOptions = useMemo(() => [
    { value: "", label: "Todos os modelos" },
    ...groupedModels.map((g) => ({
      value: g.baseName,
      label: `${g.baseName} (${g.versoes.length})`,
    })),
  ], [groupedModels]);

  // Get versions for selected base model
  const currentGroup = useMemo(() => {
    if (!filters.modelo) return null;
    return groupedModels.find((g) => g.baseName === filters.modelo);
  }, [groupedModels, filters.modelo]);

  // Build version options for selected base model
  const versaoOptions = useMemo(() => {
    if (!currentGroup) return [];
    return [
      { value: "", label: "Todas as versões" },
      ...currentGroup.versoes.map((v) => ({
        value: v.codigo,
        label: v.nome.replace(filters.modelo, "").trim() || v.nome,
      })),
    ];
  }, [currentGroup, filters.modelo]);

  const handleTipoChange = (tipo: TipoVeiculo | "") => {
    setFilters((prev) => ({
      ...prev,
      tipo,
      marca: "",
      modelo: "",
      versao: "",
    }));
  };

  const handleMarcaChange = (marca: string) => {
    setFilters((prev) => ({
      ...prev,
      marca,
      modelo: "",
      versao: "",
    }));
  };

  const handleModeloChange = (modelo: string) => {
    setFilters((prev) => ({
      ...prev,
      modelo,
      versao: "",
    }));
  };

  const handleVersaoChange = (versao: string) => {
    setFilters((prev) => ({
      ...prev,
      versao,
    }));
  };

  const toggleOpcional = (opcional: string) => {
    setFilters((prev) => ({
      ...prev,
      opcionais: prev.opcionais.includes(opcional)
        ? prev.opcionais.filter((o) => o !== opcional)
        : [...prev.opcionais, opcional],
    }));
  };

  const handleClear = () => {
    const cleared: FilterState = {
      tipo: "",
      marca: "",
      modelo: "",
      versao: "",
      opcionais: [],
      precoMin: null,
      precoMax: null,
      anoMin: null,
      anoMax: null,
    };
    setFilters(cleared);
    onApply(cleared);
    onClose();
  };

  const handleApply = () => {
    // Compute version codes for the selected model
    let filtersWithCodes = { ...filters };
    if (filters.modelo && !filters.versao) {
      // No specific version selected - include all version codes
      const group = groupedModels.find((g) => g.baseName === filters.modelo);
      if (group) {
        filtersWithCodes.modeloCodigos = group.versoes.map((v) => v.codigo);
      }
    } else if (filters.versao) {
      // Specific version selected - just that code
      filtersWithCodes.modeloCodigos = [filters.versao];
    }
    onApply(filtersWithCodes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-surface z-50 shadow-xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Vehicle Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Tipo de Veículo
            </label>
            <div className="flex flex-wrap gap-2">
              {vehicleTypes.map((type) => {
                const Icon = type.icon;
                const isActive = filters.tipo === type.value;

                return (
                  <button
                    key={type.value}
                    onClick={() => handleTipoChange(type.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-background border border-border text-foreground hover:bg-muted/10"
                    )}
                  >
                    <Icon size={16} />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Marca
            </label>
            {!filters.tipo && (
              <div className="flex items-center gap-2 p-2 bg-warning/10 border border-warning/30 rounded-lg text-sm text-warning">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>Selecione um tipo de veículo primeiro</span>
              </div>
            )}
            <Select
              options={marcaOptions}
              value={filters.marca}
              onChange={(e) => handleMarcaChange(e.target.value)}
              disabled={!filters.tipo || isLoadingMarcas}
            />
          </div>

          {/* Model */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Modelo
            </label>
            {!filters.marca && filters.tipo && (
              <div className="flex items-center gap-2 p-2 bg-warning/10 border border-warning/30 rounded-lg text-sm text-warning">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>Selecione uma marca primeiro</span>
              </div>
            )}
            <Select
              options={modeloOptions}
              value={filters.modelo}
              onChange={(e) => handleModeloChange(e.target.value)}
              disabled={!filters.marca || isLoadingModelos}
            />
          </div>

          {/* Version (only shown when base model is selected) */}
          {filters.modelo && versaoOptions.length > 1 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Versão
              </label>
              <Select
                options={versaoOptions}
                value={filters.versao}
                onChange={(e) => handleVersaoChange(e.target.value)}
              />
            </div>
          )}

          {/* Optional Features */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Opcionais
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {vehicleOptions.map((option) => {
                const isSelected = filters.opcionais.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleOpcional(option.value)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-left text-sm",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-muted text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary border-primary" : "border-muted"
                    )}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Faixa de Preço
            </label>
            <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Faixa de Ano
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                options={[{ value: "", label: "A partir de" }, ...yearOptions]}
                value={filters.anoMin?.toString() || ""}
                onChange={(e) => setFilters((prev) => ({ 
                  ...prev, 
                  anoMin: e.target.value ? parseInt(e.target.value) : null 
                }))}
              />
              <Select
                options={[{ value: "", label: "Até" }, ...yearOptions]}
                value={filters.anoMax?.toString() || ""}
                onChange={(e) => setFilters((prev) => ({ 
                  ...prev, 
                  anoMax: e.target.value ? parseInt(e.target.value) : null 
                }))}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-3">
          <Button variant="outline" onClick={handleClear} className="flex-1">
            Limpar
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </>
  );
}
