"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPreference,
  openPaymentCheckout,
  payForIntention,
} from "@/lib/payments";
import type { PagamentoResponse } from "@/types";

/**
 * Hook for creating a payment preference
 */
export function useCreatePaymentPreference() {
  return useMutation({
    mutationFn: (anuncioId: string) => createPreference(anuncioId),
  });
}

/**
 * Hook for the full payment flow:
 * Creates preference and opens checkout in new window
 */
export function usePayForIntention() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (anuncioId: string) => payForIntention(anuncioId),
    onSuccess: () => {
      // Invalidate intentions to refresh status after payment
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}

/**
 * Helper hook to open payment checkout from an existing preference
 */
export function useOpenPaymentCheckout() {
  return {
    openCheckout: (preference: PagamentoResponse, useSandbox?: boolean) =>
      openPaymentCheckout(preference, useSandbox),
  };
}


