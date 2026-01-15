import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, LoginResult } from "@/services/auth";
import { useAuthStore } from "@/stores/auth-store";
import { LoginRequest, RegisterRequest, Perfil, perfilToUser } from "@/types";
import { router } from "expo-router";

/**
 * Hook for user login
 * Service handles: login → fetch profile → return combined result
 */
export function useLogin() {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (result: LoginResult) => {
      await login(result.user, result.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Navigate based on role - if no role, show role selection
      if (!result.user.role) {
        router.replace("/(auth)/role-select");
      } else {
        router.replace("/(tabs)");
      }
    },
  });
}

/**
 * Hook for user registration
 * Service handles: register → fetch profile → return combined result
 */
export function useRegister() {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: async (result: LoginResult) => {
      await login(result.user, result.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // New users always go to role selection
      router.replace("/(auth)/role-select");
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/(auth)/login");
    },
  });
}

/**
 * Hook for fetching current user's profile
 * Returns Perfil from backend
 */
export function useProfile() {
  const { isAuthenticated, user } = useAuthStore();

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const perfil = await authService.getProfile();
      return perfilToUser(perfil, user?.email);
    },
    enabled: isAuthenticated,
  });
}

/**
 * Hook for fetching a user's profile by ID
 */
export function useProfileById(usuarioId: string) {
  return useQuery({
    queryKey: ["user", "profile", usuarioId],
    queryFn: async () => {
      const perfil = await authService.getProfileById(usuarioId);
      return perfilToUser(perfil);
    },
    enabled: !!usuarioId,
  });
}

/**
 * Hook for updating current user's profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}
