import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "@/modules/auth/interfaces/responses/auth.interface";
import { CommerceType } from "@/shared/enums/commerce-type.enum";
import { decodeJwtPayload } from "@/shared/utils/jwt.utils";

interface AuthStore {
  authResponse?: AuthResponse;
  isAuthenticated: boolean;
  clientId?: string;
  commerceId?: string;
  commerceType?: CommerceType;
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
      clientId: undefined,
      commerceId: undefined,
      commerceType: undefined,

      setAuthResponse: (authResponse: AuthResponse) => set({ authResponse }),

      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),

      login: (authResponse: AuthResponse) => {
        const jwtPayload = decodeJwtPayload(authResponse.token);

        set({
          authResponse,
          isAuthenticated: true,
          clientId: jwtPayload?.clientId,
          commerceId: jwtPayload?.commerceId,
          commerceType: jwtPayload?.commerceType,
        });
      },

      logout: () =>
        set({
          authResponse: undefined,
          isAuthenticated: false,
          clientId: undefined,
          commerceId: undefined,
          commerceType: undefined,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.authResponse?.token && (!state.clientId || !state.commerceId || !state.commerceType)) {
          const jwtPayload = decodeJwtPayload(state.authResponse.token);
          useAuthStore.setState({
            clientId: jwtPayload?.clientId,
            commerceId: jwtPayload?.commerceId,
            commerceType: jwtPayload?.commerceType,
          });
        }
      },
    },
  ),
);
