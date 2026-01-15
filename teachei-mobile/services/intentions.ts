import api from "./api";
import { API_ENDPOINTS } from "@/constants/config";
import {
  Anuncio,
  CreateAnuncioRequest,
  PaginatedResponse,
  IntentionFilters,
} from "@/types";

export const intentionsService = {
  /**
   * Get paginated list of intentions with filters
   */
  async getIntentions(
    page = 0,
    size = 10,
    filters?: IntentionFilters
  ): Promise<PaginatedResponse<Anuncio>> {
    const params: Record<string, string | number> = { page, size };

    if (filters?.tipoVeiculo) {
      params.tipoVeiculo = filters.tipoVeiculo;
    }
    if (filters?.search) {
      params.search = filters.search;
    }
    if (filters?.status) {
      params.status = filters.status;
    }

    const response = await api.get<PaginatedResponse<Anuncio>>(
      API_ENDPOINTS.INTENTIONS,
      { params }
    );
    return response.data;
  },

  /**
   * Get a single intention by ID
   */
  async getIntentionById(id: string): Promise<Anuncio> {
    const response = await api.get<Anuncio>(API_ENDPOINTS.INTENTION_BY_ID(id));
    return response.data;
  },

  /**
   * Get current user's intentions
   */
  async getMyIntentions(
    page = 0,
    size = 10
  ): Promise<PaginatedResponse<Anuncio>> {
    const response = await api.get<PaginatedResponse<Anuncio>>(
      API_ENDPOINTS.MY_INTENTIONS,
      { params: { page, size } }
    );
    return response.data;
  },

  /**
   * Create a new intention
   */
  async createIntention(data: CreateAnuncioRequest): Promise<Anuncio> {
    const response = await api.post<Anuncio>(API_ENDPOINTS.INTENTIONS, data);
    return response.data;
  },

  /**
   * Update an existing intention
   */
  async updateIntention(
    id: string,
    data: Partial<CreateAnuncioRequest>
  ): Promise<Anuncio> {
    const response = await api.put<Anuncio>(
      API_ENDPOINTS.INTENTION_BY_ID(id),
      data
    );
    return response.data;
  },

  /**
   * Mark an intention as completed/sold
   */
  async markAsCompleted(id: string): Promise<Anuncio> {
    const response = await api.post<Anuncio>(
      `${API_ENDPOINTS.INTENTION_BY_ID(id)}/finalizar`
    );
    return response.data;
  },

  /**
   * Delete an intention
   */
  async deleteIntention(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.INTENTION_BY_ID(id));
  },
};
