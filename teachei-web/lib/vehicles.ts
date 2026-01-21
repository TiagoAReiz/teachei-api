import { API_ENDPOINTS } from "@/config/env";
import { api } from "./api";
import type {
  TipoVeiculo,
  Marca,
  Modelo,
  ModeloAgrupado,
  Ano,
  MarcasResponse,
  ModelosResponse,
  AnosResponse,
  PrecoFipeResponse,
} from "@/types";

/**
 * Fetch vehicle brands for a given type
 * Backend returns { marcas: [...] }, we unwrap it
 */
export async function getMarcas(tipoVeiculo: TipoVeiculo): Promise<Marca[]> {
  const tipo = tipoVeiculo.toLowerCase();
  const response = await api.get<MarcasResponse>(
    API_ENDPOINTS.VEHICLE_BRANDS(tipo),
    { requireAuth: false }
  );
  return response.marcas;
}

/**
 * Fetch models for a given brand
 * Backend returns { modelos: [...] }, we unwrap it
 */
export async function getModelos(
  tipoVeiculo: TipoVeiculo,
  marcaCodigo: string
): Promise<Modelo[]> {
  const tipo = tipoVeiculo.toLowerCase();
  const response = await api.get<ModelosResponse>(
    API_ENDPOINTS.VEHICLE_MODELS(tipo, marcaCodigo),
    { requireAuth: false }
  );
  return response.modelos;
}

/**
 * Fetch years for a given model
 * Backend returns { anos: [...] }, we unwrap it
 */
export async function getAnos(
  tipoVeiculo: TipoVeiculo,
  marcaCodigo: string,
  modeloCodigo: string
): Promise<Ano[]> {
  const tipo = tipoVeiculo.toLowerCase();
  const response = await api.get<AnosResponse>(
    API_ENDPOINTS.VEHICLE_YEARS(tipo, marcaCodigo, modeloCodigo),
    { requireAuth: false }
  );
  return response.anos;
}

/**
 * Fetch FIPE price for a specific vehicle
 */
export async function getPrecoFipe(
  tipoVeiculo: TipoVeiculo,
  marcaCodigo: string,
  modeloCodigo: string,
  anoCodigo: string
): Promise<PrecoFipeResponse> {
  const tipo = tipoVeiculo.toLowerCase();
  return api.get<PrecoFipeResponse>(
    API_ENDPOINTS.VEHICLE_PRICE(tipo, marcaCodigo, modeloCodigo, anoCodigo),
    { requireAuth: false }
  );
}

/**
 * Group models by their base name (first word).
 * 
 * Example:
 * - "Onix 1.0 LT 5p" -> baseName: "Onix", version: "1.0 LT 5p"
 * - "Onix 1.0 LTZ 5p" -> baseName: "Onix", version: "1.0 LTZ 5p"
 * - "HB20 1.0 Comfort" -> baseName: "HB20", version: "1.0 Comfort"
 * 
 * @param modelos - Array of models from FIPE API
 * @returns Array of grouped models with base name and versions
 */
export function groupModelsByBase(modelos: Modelo[]): ModeloAgrupado[] {
  const groups = new Map<string, Modelo[]>();
  
  for (const modelo of modelos) {
    // First word is the base name
    const baseName = modelo.nome.split(" ")[0];
    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }
    groups.get(baseName)!.push(modelo);
  }
  
  // Sort groups alphabetically by base name
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([baseName, versoes]) => ({
      baseName,
      versoes,
    }));
}

/**
 * Get the version name from a full model name by removing the base name.
 * 
 * @param fullName - Full model name (e.g., "Onix 1.0 LT 5p")
 * @param baseName - Base model name (e.g., "Onix")
 * @returns Version name (e.g., "1.0 LT 5p")
 */
export function getVersionName(fullName: string, baseName: string): string {
  const version = fullName.replace(baseName, "").trim();
  return version || fullName;
}


