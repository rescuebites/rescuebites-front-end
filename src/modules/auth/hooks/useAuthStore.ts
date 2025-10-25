import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "@/modules/auth/interfaces/responses/auth.interface";

interface AuthStore {
  authResponse?: AuthResponse;
  isAuthenticated: boolean;
  setAuthResponse: (authResponse: AuthResponse) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authResponse: undefined,
      isAuthenticated: false,

      setAuthResponse: (authResponse: AuthResponse) =>
        set({ authResponse }),

      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),

      login: (authResponse: AuthResponse) =>
        set({
          authResponse,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          authResponse: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", 
    }
  )
);