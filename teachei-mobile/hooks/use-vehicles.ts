import { useQuery } from "@tanstack/react-query";
import { vehiclesService } from "@/services/vehicles";
import { TipoVeiculo } from "@/types";

/**
 * Hook for fetching vehicle brands by type
 */
export function useMarcas(tipoVeiculo: TipoVeiculo | null) {
  return useQuery({
    queryKey: ["vehicles", "marcas", tipoVeiculo],
    queryFn: () => vehiclesService.getMarcas(tipoVeiculo!),
    enabled: !!tipoVeiculo,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - FIPE data doesn't change often
  });
}

/**
 * Hook for fetching vehicle models by brand
 */
export function useModelos(
  tipoVeiculo: TipoVeiculo | null,
  marcaCodigo: string | null
) {
  return useQuery({
    queryKey: ["vehicles", "modelos", tipoVeiculo, marcaCodigo],
    queryFn: () => vehiclesService.getModelos(tipoVeiculo!, marcaCodigo!),
    enabled: !!tipoVeiculo && !!marcaCodigo,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Hook for fetching vehicle years by model
 */
export function useAnos(
  tipoVeiculo: TipoVeiculo | null,
  marcaCodigo: string | null,
  modeloCodigo: string | null
) {
  return useQuery({
    queryKey: ["vehicles", "anos", tipoVeiculo, marcaCodigo, modeloCodigo],
    queryFn: () =>
      vehiclesService.getAnos(tipoVeiculo!, marcaCodigo!, modeloCodigo!),
    enabled: !!tipoVeiculo && !!marcaCodigo && !!modeloCodigo,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

/**
 * Hook for fetching FIPE price for a specific vehicle
 */
export function usePrecoFipe(
  tipoVeiculo: TipoVeiculo | null,
  marcaCodigo: string | null,
  modeloCodigo: string | null,
  anoCodigo: string | null
) {
  return useQuery({
    queryKey: [
      "vehicles",
      "preco",
      tipoVeiculo,
      marcaCodigo,
      modeloCodigo,
      anoCodigo,
    ],
    queryFn: () =>
      vehiclesService.getPrecoFipe(
        tipoVeiculo!,
        marcaCodigo!,
        modeloCodigo!,
        anoCodigo!
      ),
    enabled: !!tipoVeiculo && !!marcaCodigo && !!modeloCodigo && !!anoCodigo,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
