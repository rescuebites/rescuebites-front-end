import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateClientParams } from "@/modules/client/interfaces/requests/createClient.interface";

interface PendingRegistrationState {
  clientData?: CreateClientParams;
  profilePicture?: File | null; 
  commerceData?: any;
  setClientData: (data: CreateClientParams) => void;
  setProfilePicture: (file: File | null) => void;
  clearData: () => void;
}

export const usePendingRegistrationStore = create<PendingRegistrationState>()(
  persist(
    (set) => ({
      clientData: undefined,
      profilePicture: null,
      commerceData: undefined,

      setClientData: (data) => set({ clientData: data }),

      setProfilePicture: (file) => set({ profilePicture: file }),

      clearData: () =>
        set({ clientData: undefined, profilePicture: null, commerceData: undefined }),
    }),
    {
      name: "pending-registration-store",
      partialize: (state) => ({
        // Solo persistimos lo que NO tiene File
        clientData: state.clientData
          ? { ...state.clientData, profilePicture: undefined }
          : undefined,
        commerceData: state.commerceData,
      }),
    }
  )
);
