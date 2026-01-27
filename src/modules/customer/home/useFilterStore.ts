import { create } from 'zustand';
import { PreferenceType, ProductCategory, ProductFilters } from '../home/interfaces/filter.interface';

interface FilterStore extends ProductFilters {
  // Estado
  isFilterDrawerOpen: boolean;
  
  // Acciones
  setPermanentPreferences: (preferences: PreferenceType[]) => void;
  toggleTemporaryPreference: (preference: PreferenceType) => void;
  toggleCategory: (category: ProductCategory) => void;
  clearTemporaryFilters: () => void;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  
  // Getters
  getAllActivePreferences: () => PreferenceType[];
  getActiveFiltersCount: () => number;
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  // Estado inicial
  permanentPreferences: [],
  temporaryPreferences: [],
  categories: [],
  isFilterDrawerOpen: false,

  // Setear preferencias permanentes (desde el perfil del usuario)
  setPermanentPreferences: (preferences) => {
    set({ permanentPreferences: preferences });
  },

  // Toggle preferencia temporal
  toggleTemporaryPreference: (preference) => {
    set((state) => {
      const isActive = state.temporaryPreferences.includes(preference);
      return {
        temporaryPreferences: isActive
          ? state.temporaryPreferences.filter((p) => p !== preference)
          : [...state.temporaryPreferences, preference],
      };
    });
  },

  // Toggle categoría
  toggleCategory: (category) => {
    set((state) => {
      const isActive = state.categories.includes(category);
      return {
        categories: isActive
          ? state.categories.filter((c) => c !== category)
          : [...state.categories, category],
      };
    });
  },

  // Limpiar filtros temporales
  clearTemporaryFilters: () => {
    set({
      temporaryPreferences: [],
      categories: [],
    });
  },

  // Abrir/cerrar drawer
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

  // Obtener todas las preferencias activas (permanentes + temporales)
  getAllActivePreferences: () => {
    const state = get();
    return [...new Set([...state.permanentPreferences, ...state.temporaryPreferences])];
  },

  // Contar filtros activos
  getActiveFiltersCount: () => {
    const state = get();
    return state.temporaryPreferences.length + state.categories.length;
  },

  // Verificar si hay filtros activos
  hasActiveFilters: () => {
    const state = get();
    return state.temporaryPreferences.length > 0 || state.categories.length > 0;
  },
}));