import { API_ENDPOINTS } from "@/config/env";
import { api, setToken, removeToken, getToken } from "./api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Perfil,
  AtualizarPerfilRequest,
  User,
} from "@/types";
import { perfilToUser } from "@/types";

// Combined login result with user data
export interface LoginResult {
  token: string;
  usuarioId: string;
  email: string;
  expiresIn: number;
  user: User;
}

/**
 * Login user and fetch profile
 * Backend returns token-only, so we fetch profile separately
 */
export async function login(credentials: LoginRequest): Promise<LoginResult> {
  // Step 1: Get token from backend
  const authResponse = await api.post<AuthResponse>(
    API_ENDPOINTS.AUTH_LOGIN,
    credentials,
    { requireAuth: false }
  );

  // Step 2: Store token
  setToken(authResponse.token);

  // Step 3: Fetch profile with the new token
  const perfil = await api.get<Perfil>(API_ENDPOINTS.PROFILE);

  return {
    token: authResponse.token,
    usuarioId: authResponse.usuarioId,
    email: authResponse.email,
    expiresIn: authResponse.expiresIn,
    user: perfilToUser(perfil, authResponse.email),
  };
}

/**
 * Register user and fetch profile
 */
export async function register(data: RegisterRequest): Promise<LoginResult> {
  // Step 1: Register and get token
  const authResponse = await api.post<AuthResponse>(
    API_ENDPOINTS.AUTH_REGISTER,
    data,
    { requireAuth: false }
  );

  // Step 2: Store token
  setToken(authResponse.token);

  // Step 3: Fetch profile with the new token
  const perfil = await api.get<Perfil>(API_ENDPOINTS.PROFILE);

  return {
    token: authResponse.token,
    usuarioId: authResponse.usuarioId,
    email: authResponse.email,
    expiresIn: authResponse.expiresIn,
    user: perfilToUser(perfil, authResponse.email),
  };
}

/**
 * Logout user
 */
export function logout(): void {
  removeToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const perfil = await api.get<Perfil>(API_ENDPOINTS.PROFILE);
  const token = getToken();
  // We don't have email stored separately, so we'll leave it empty
  // In a real app, you might want to store the email in a cookie too
  return perfilToUser(perfil);
}

/**
 * Get profile by user ID
 */
export async function getUserProfile(id: string): Promise<User> {
  const perfil = await api.get<Perfil>(API_ENDPOINTS.PROFILE_BY_ID(id));
  return perfilToUser(perfil);
}

/**
 * Update current user profile
 */
export async function updateProfile(data: AtualizarPerfilRequest): Promise<User> {
  const perfil = await api.put<Perfil>(API_ENDPOINTS.PROFILE, data);
  return perfilToUser(perfil);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}
