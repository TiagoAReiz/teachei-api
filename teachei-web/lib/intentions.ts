import { API_ENDPOINTS } from "@/config/env";
import { api } from "./api";
import type {
  Anuncio,
  CreateAnuncioRequest,
  PaginatedResponse,
  IntentionFilters,
} from "@/types";

/**
 * Fetch paginated list of intentions with filters
 */
export async function getIntentions(
  filters: IntentionFilters = {}
): Promise<PaginatedResponse<Anuncio>> {
  const params = new URLSearchParams();

  if (filters.tipoVeiculo) params.append("tipoVeiculo", filters.tipoVeiculo);
  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.page !== undefined) params.append("page", filters.page.toString());
  if (filters.size !== undefined) params.append("size", filters.size.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ENDPOINTS.INTENTIONS}?${queryString}`
    : API_ENDPOINTS.INTENTIONS;

  return api.get<PaginatedResponse<Anuncio>>(url, { requireAuth: false });
}

/**
 * Fetch a single intention by ID
 */
export async function getIntentionById(id: string): Promise<Anuncio> {
  return api.get<Anuncio>(API_ENDPOINTS.INTENTION_BY_ID(id), {
    requireAuth: false,
  });
}

/**
 * Fetch current user's intentions
 */
export async function getMyIntentions(): Promise<Anuncio[]> {
  return api.get<Anuncio[]>(API_ENDPOINTS.MY_INTENTIONS);
}

/**
 * Create a new intention
 */
export async function createIntention(
  data: CreateAnuncioRequest
): Promise<Anuncio> {
  return api.post<Anuncio>(API_ENDPOINTS.INTENTIONS, data);
}

/**
 * Update an existing intention
 */
export async function updateIntention(
  id: string,
  data: Partial<CreateAnuncioRequest>
): Promise<Anuncio> {
  return api.put<Anuncio>(API_ENDPOINTS.INTENTION_BY_ID(id), data);
}

/**
 * Mark an intention as completed/sold
 */
export async function markAsCompleted(id: string): Promise<Anuncio> {
  return api.post<Anuncio>(`${API_ENDPOINTS.INTENTION_BY_ID(id)}/finalizar`);
}

/**
 * Delete an intention
 */
export async function deleteIntention(id: string): Promise<void> {
  return api.delete(API_ENDPOINTS.INTENTION_BY_ID(id));
}


