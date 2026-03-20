import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LocalityState {
  locality: string | null;
  setLocality: (locality: string) => void;
  clearLocality: () => void;
}

export const useLocalityStore = create<LocalityState>()(
  devtools(
    persist(
      (set) => ({
        locality: null,
        
        setLocality: (locality: string) => 
          set({ locality }, false, 'setLocality'),
        
        clearLocality: () => 
          set({ locality: null }, false, 'clearLocality'),
      }),
      { name: 'LocalityStore' }
    ),
    { name: 'LocalityStore' }
  )
);
