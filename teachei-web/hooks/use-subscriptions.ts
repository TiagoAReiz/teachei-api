import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlanos,
  fetchMinhaAssinatura,
  checkAssinaturaAtiva,
  criarAssinatura,
  cancelarAssinatura,
  type PlanoAssinatura,
} from "@/lib/subscriptions";

/**
 * Hook to fetch available subscription plans.
 */
export function usePlanos() {
  return useQuery({
    queryKey: ["planos"],
    queryFn: fetchPlanos,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Hook to fetch current user's subscription.
 */
export function useMinhaAssinatura() {
  return useQuery({
    queryKey: ["minha-assinatura"],
    queryFn: fetchMinhaAssinatura,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to check if user has active subscription.
 */
export function useAssinaturaAtiva() {
  return useQuery({
    queryKey: ["assinatura-ativa"],
    queryFn: checkAssinaturaAtiva,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to create a new subscription.
 */
export function useCriarAssinatura() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plano: PlanoAssinatura) => criarAssinatura(plano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minha-assinatura"] });
      queryClient.invalidateQueries({ queryKey: ["assinatura-ativa"] });
    },
  });
}

/**
 * Hook to cancel a subscription.
 */
export function useCancelarAssinatura() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelarAssinatura(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minha-assinatura"] });
      queryClient.invalidateQueries({ queryKey: ["assinatura-ativa"] });
    },
  });
}
