import { API_ENDPOINTS } from "@/config/env";
import { api } from "./api";
import type {
  TipoVeiculo,
  Marca,
  Modelo,
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


