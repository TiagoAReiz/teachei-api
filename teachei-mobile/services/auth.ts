import api from "./api";
import { API_ENDPOINTS } from "@/constants/config";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Perfil,
  AtualizarPerfilRequest,
  User,
  perfilToUser,
} from "@/types";

// Backend AuthResponse (token-only)
export interface LoginResult {
  token: string;
  usuarioId: string;
  email: string;
  expiresIn: number;
  user: User;
}

export const authService = {
  /**
   * Login user and fetch profile
   * Backend returns token-only, so we fetch profile separately
   */
  async login(data: LoginRequest): Promise<LoginResult> {
    // Step 1: Get token from backend
    const authResponse = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      data
    );
    const auth = authResponse.data;

    // Step 2: Fetch profile with the new token (manually set header)
    const profileResponse = await api.get<Perfil>(API_ENDPOINTS.PROFILE, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const perfil = profileResponse.data;

    return {
      token: auth.token,
      usuarioId: auth.usuarioId,
      email: auth.email,
      expiresIn: auth.expiresIn,
      user: perfilToUser(perfil, auth.email),
    };
  },

  /**
   * Register user and fetch profile
   */
  async register(data: RegisterRequest): Promise<LoginResult> {
    // Step 1: Register and get token
    const authResponse = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REGISTER,
      data
    );
    const auth = authResponse.data;

    // Step 2: Fetch profile with the new token
    const profileResponse = await api.get<Perfil>(API_ENDPOINTS.PROFILE, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const perfil = profileResponse.data;

    return {
      token: auth.token,
      usuarioId: auth.usuarioId,
      email: auth.email,
      expiresIn: auth.expiresIn,
      user: perfilToUser(perfil, auth.email),
    };
  },

  /**
   * Get current user's profile
   */
  async getProfile(): Promise<Perfil> {
    const response = await api.get<Perfil>(API_ENDPOINTS.PROFILE);
    return response.data;
  },

  /**
   * Get profile by user ID
   */
  async getProfileById(usuarioId: string): Promise<Perfil> {
    const response = await api.get<Perfil>(
      API_ENDPOINTS.PROFILE_BY_ID(usuarioId)
    );
    return response.data;
  },

  /**
   * Update current user's profile
   */
  async updateProfile(data: AtualizarPerfilRequest): Promise<Perfil> {
    const response = await api.put<Perfil>(API_ENDPOINTS.PROFILE, data);
    return response.data;
  },
};
