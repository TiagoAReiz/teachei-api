import { API_ENDPOINTS } from "@/config/env";
import { api } from "./api";
import type { PagamentoResponse } from "@/types";

/**
 * Create a payment preference for an intention
 * Returns Mercado Pago init_point URL
 */
export async function createPreference(
  anuncioId: string
): Promise<PagamentoResponse> {
  return api.post<PagamentoResponse>(
    API_ENDPOINTS.PAYMENT_PREFERENCE(anuncioId)
  );
}

/**
 * Open payment checkout in new window/tab
 * Uses sandbox URL in development, production URL in prod
 */
export function openPaymentCheckout(
  paymentResponse: PagamentoResponse,
  useSandbox = process.env.NODE_ENV !== "production"
): Window | null {
  const url = useSandbox
    ? paymentResponse.sandboxInitPoint || paymentResponse.initPoint
    : paymentResponse.initPoint;

  return window.open(url, "_blank");
}

/**
 * Convenience method to create preference and open checkout
 */
export async function payForIntention(
  anuncioId: string,
  useSandbox = process.env.NODE_ENV !== "production"
): Promise<Window | null> {
  const preference = await createPreference(anuncioId);
  return openPaymentCheckout(preference, useSandbox);
}


