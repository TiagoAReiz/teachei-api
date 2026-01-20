"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button, CurrencyInput, Select, Input } from "@/components/ui";
import { useCreateIntentionStore } from "@/stores/create-intention-store";
import { useAnos } from "@/hooks/use-vehicles";
import { vehicleColors } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CreateSpecsPage() {
  const router = useRouter();
  const {
    tipoVeiculo,
    marcaCodigo,
    modeloCodigo,
    anoMinimo,
    anoMaximo,
    cores,
    precoMaximo,
    quilometragemMinima,
    quilometragemMaxima,
    observacoes,
    setAnos,
    setCores,
    setPreco,
    setQuilometragem,
    setObservacoes,
  } = useCreateIntentionStore();

  // Fetch FIPE years for the selected model
  const { data: fipeAnos, isLoading: isLoadingAnos } = useAnos(
    tipoVeiculo,
    marcaCodigo,
    modeloCodigo
  );

  // Redirect if no vehicle selected
  useEffect(() => {
    if (!tipoVeiculo || !marcaCodigo || !modeloCodigo) {
      router.push("/create");
    }
  }, [tipoVeiculo, marcaCodigo, modeloCodigo, router]);

  // Build year options from FIPE data or fall back to generic range
  const yearOptions = useMemo(() => {
    if (fipeAnos && fipeAnos.length > 0) {
      // Extract years from FIPE anos (format: "2024 Gasolina", "2023 Flex", etc.)
      const yearsFromFipe = fipeAnos
        .map((ano) => {
          // Extract year number from the nome (e.g., "2024 Gasolina" -> 2024)
          const match = ano.nome.match(/^(\d{4})/);
          return match ? parseInt(match[1]) : null;
        })
        .filter((year): year is number => year !== null)
        // Remove duplicates and sort descending
        .filter((year, index, arr) => arr.indexOf(year) === index)
        .sort((a, b) => b - a);

      if (yearsFromFipe.length > 0) {
        return yearsFromFipe.map((year) => ({
          value: year.toString(),
          label: year.toString(),
        }));
      }
    }

    // Fallback to generic year range
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString(),
    }));
  }, [fipeAnos]);

  const toggleColor = (colorValue: string) => {
    if (cores.includes(colorValue)) {
      setCores(cores.filter((c) => c !== colorValue));
    } else {
      setCores([...cores, colorValue]);
    }
  };

  const handleContinue = () => {
    router.push("/create/review");
  };

  if (!tipoVeiculo || !marcaCodigo || !modeloCodigo) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Especificações desejadas
        </h1>
        <p className="text-muted">
          Defina os detalhes do veículo que você procura
        </p>
      </div>

      {/* Year Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Ano do veículo
          {isLoadingAnos && (
            <span className="ml-2 text-xs text-muted">(carregando anos...)</span>
          )}
          {fipeAnos && fipeAnos.length > 0 && (
            <span className="ml-2 text-xs text-success">(anos FIPE)</span>
          )}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Select
            options={[{ value: "", label: "A partir de" }, ...yearOptions]}
            value={anoMinimo?.toString() || ""}
            onChange={(e) => setAnos(e.target.value ? parseInt(e.target.value) : null, anoMaximo)}
            placeholder="A partir de"
            disabled={isLoadingAnos}
          />
          <Select
            options={[{ value: "", label: "Até" }, ...yearOptions]}
            value={anoMaximo?.toString() || ""}
            onChange={(e) => setAnos(anoMinimo, e.target.value ? parseInt(e.target.value) : null)}
            placeholder="Até"
            disabled={isLoadingAnos}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Cores preferidas
        </label>
        <div className="flex flex-wrap gap-2">
          {vehicleColors.map((color) => {
            const isSelected = cores.includes(color.value);
            return (
              <button
                key={color.value}
                onClick={() => toggleColor(color.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted"
                )}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                  {color.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <CurrencyInput
        label="Preço máximo"
        value={precoMaximo}
        onChange={(value) => setPreco(null, value)}
      />

      {/* Mileage Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Quilometragem (opcional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Mínima (km)"
            value={quilometragemMinima?.toString() || ""}
            onChange={(e) => setQuilometragem(
              e.target.value ? parseInt(e.target.value) : null,
              quilometragemMaxima
            )}
          />
          <Input
            type="number"
            placeholder="Máxima (km)"
            value={quilometragemMaxima?.toString() || ""}
            onChange={(e) => setQuilometragem(
              quilometragemMinima,
              e.target.value ? parseInt(e.target.value) : null
            )}
          />
        </div>
        <p className="text-xs text-muted">
          Deixe em branco se não tiver preferência de quilometragem
        </p>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Observações adicionais
        </label>
        <textarea
          placeholder="Ex: Procuro versão completa, com teto solar, baixa km..."
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={4}
          className="w-full bg-surface border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-xl p-4 focus:ring-2 focus:ring-primary focus:bg-surface transition-all text-base resize-none"
        />
      </div>

      <Button onClick={handleContinue} className="w-full" size="lg">
        <span>Continuar</span>
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}



