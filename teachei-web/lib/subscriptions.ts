import { api } from "./api";

// ============================================
// Subscription Types
// ============================================

export type PlanoAssinatura = "INDIVIDUAL" | "TRIMESTRAL" | "ANUAL";
export type StatusAssinatura = "PENDENTE" | "ATIVO" | "EXPIRADO" | "CANCELADO";

export interface PlanoResponse {
  id: PlanoAssinatura;
  nome: string;
  precoCentavos: number;
  precoFormatado: string;
  duracaoDias: number;
  recorrente: boolean;
}

export interface AssinaturaResponse {
  id: string;
  plano: PlanoAssinatura;
  planoNome: string;
  status: StatusAssinatura;
  dataInicio: string | null;
  dataFim: string | null;
  assinaturaAtiva: boolean;
  diasRestantes: number;
}

export interface AssinaturaPreferenciaResponse {
  assinaturaId: string;
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string;
  valorCentavos: number;
  valorFormatado: string;
}

export interface StatusResponse {
  assinaturaAtiva: boolean;
}

// ============================================
// Subscription API Functions
// ============================================

/**
 * Fetch available subscription plans (public endpoint).
 */
export async function fetchPlanos(): Promise<PlanoResponse[]> {
  const response = await api.get<PlanoResponse[]>("/api/v1/assinaturas/planos", {
    requireAuth: false, // Public endpoint - no auth required
  });
  return response;
}

/**
 * Fetch current user's subscription status.
 * Returns null if user is not authenticated.
 */
export async function fetchMinhaAssinatura(): Promise<AssinaturaResponse | null> {
  try {
    const response = await api.get<AssinaturaResponse | null>("/api/v1/assinaturas/minha");
    return response;
  } catch {
    // Return null if not authenticated - don't redirect
    return null;
  }
}

/**
 * Check if current user has active subscription.
 */
export async function checkAssinaturaAtiva(): Promise<boolean> {
  const response = await api.get<StatusResponse>("/api/v1/assinaturas/status");
  return response.assinaturaAtiva;
}

/**
 * Create a new subscription and get payment URL.
 */
export async function criarAssinatura(plano: PlanoAssinatura): Promise<AssinaturaPreferenciaResponse> {
  const response = await api.post<AssinaturaPreferenciaResponse>("/api/v1/assinaturas", { plano });
  return response;
}

/**
 * Cancel a subscription.
 */
export async function cancelarAssinatura(id: string): Promise<void> {
  await api.delete(`/api/v1/assinaturas/${id}`);
}

/**
 * Redirect to Mercado Pago checkout for subscription.
 */
export function redirectToSubscriptionCheckout(preference: AssinaturaPreferenciaResponse): void {
  // Use sandbox URL in development, production URL in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const checkoutUrl = isDevelopment ? preference.sandboxInitPoint : preference.initPoint;
  
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    console.error("No checkout URL available");
  }
}
