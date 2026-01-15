import { create } from "zustand";
import { User, UserRole, AuthState } from "@/types";
import { saveToken, getToken, removeToken, saveUser, getUser, clearAllStorage, saveRole, getRole } from "@/utils/storage";

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRole: (role: UserRole) => void;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  
  setRole: async (role) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, role };
      set({ user: updatedUser });
      await saveUser(updatedUser);
      await saveRole(role);
    }
  },
  
  setLoading: (isLoading) => set({ isLoading }),

  login: async (user, token) => {
    await saveToken(token);
    await saveUser(user);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await clearAllStorage();
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  loadStoredAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await getToken();
      const user = await getUser() as User | null;
      
      if (token && user) {
        set({ user, token, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Failed to load stored auth:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));



