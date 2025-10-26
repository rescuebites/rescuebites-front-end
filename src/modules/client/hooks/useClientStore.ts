import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClientStore {
  preferenceIds: string[];
  setPreferences: (ids: string[]) => void;
  reset: () => void;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      preferenceIds: [],
      setPreferences: (ids) => set({ preferenceIds: ids }),
      reset: () => set({ preferenceIds: [] }),
    }),
    {
      name: "client-storage",
      partialize: (state) => ({ preferenceIds: state.preferenceIds }),
    }
  )
);
