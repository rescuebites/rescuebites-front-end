import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateClientParams } from "@/modules/client/interfaces/requests/createClient.interface";
import type { CreateCommerceParams } from "@/modules/commerce/interfaces/requests/create-commerce.interface";

interface PendingRegistrationState {
  clientData?: CreateClientParams;
  profilePicture?: File | null;
  commerceData?: CreateCommerceParams;
  pendingCommerceImages: File[];
  setClientData: (data: CreateClientParams) => void;
  setCommerceData: (data: CreateCommerceParams) => void;
  setPendingCommerceImages: (images: File[]) => void;
  pendingUserCredentials?: {  
    email: string;
    password: string;
    confirmPassword: string;
  };
  setProfilePicture: (file: File | null) => void;
  setPendingUserCredentials: (credentials: { email: string; password: string; confirmPassword: string }) => void;
  clearData: () => void;
}

export const usePendingRegistrationStore = create<PendingRegistrationState>()(
  persist(
    (set) => ({
      clientData: undefined,
      profilePicture: null,
      commerceData: undefined,
      pendingCommerceImages: [],

      setClientData: (data) => set({ clientData: data }),
      setCommerceData: (data) => set({ commerceData: data }),  
      setProfilePicture: (file) => set({ profilePicture: file }),
      setPendingCommerceImages: (images) => set({ pendingCommerceImages: images }),

      pendingUserCredentials: undefined,
      setPendingUserCredentials: (credentials) => set({ pendingUserCredentials: credentials }),
      clearData: () =>
        set({ clientData: undefined, profilePicture: null, commerceData: undefined, pendingCommerceImages: [] }),
    }),
    {
      name: "pending-registration-store",
      partialize: (state) => ({
        clientData: state.clientData
          ? { ...state.clientData, profilePicture: undefined }
          : undefined,
        commerceData: state.commerceData
          ? { ...state.commerceData, profilePictures: undefined }
          : undefined,
          pendingUserCredentials: state.pendingUserCredentials, //persistir credenciales
      }),
    }
  )
);