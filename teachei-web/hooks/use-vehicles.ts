"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarcas, getModelos, getAnos, getPrecoFipe } from "@/lib/vehicles";
import type { TipoVeiculo } from "@/types";

const STALE_TIME_24H = 24 * 60 * 60 * 1000; // 24 hours - FIPE data doesn't change often

/**
 * Hook for fetching vehicle brands by type
 */
export function useMarcas(tipoVeiculo: TipoVeiculo | null) {
  return useQuery({
    queryKey: ["vehicles", "marcas", tipoVeiculo],
    queryFn: () => getMarcas(tipoVeiculo!),
    enabled: !!tipoVeiculo,
    staleTime: STALE_TIME_24H,
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
    queryFn: () => getModelos(tipoVeiculo!, marcaCodigo!),
    enabled: !!tipoVeiculo && !!marcaCodigo,
    staleTime: STALE_TIME_24H,
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
    queryFn: () => getAnos(tipoVeiculo!, marcaCodigo!, modeloCodigo!),
    enabled: !!tipoVeiculo && !!marcaCodigo && !!modeloCodigo,
    staleTime: STALE_TIME_24H,
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
      getPrecoFipe(tipoVeiculo!, marcaCodigo!, modeloCodigo!, anoCodigo!),
    enabled: !!tipoVeiculo && !!marcaCodigo && !!modeloCodigo && !!anoCodigo,
    staleTime: STALE_TIME_24H,
  });
}

// Aliases for English naming (backwards compatibility)
export const useBrands = useMarcas;
export const useModels = useModelos;
export const useYears = useAnos;
export const useFipePrice = usePrecoFipe;
