import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // para debug
import { CategoryDisplay } from '../interfaces/types';

interface FilterState {
  selectedCategory: CategoryDisplay | null;
  searchQuery: string;
  
  // Actions
  setSelectedCategory: (category: CategoryDisplay | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      // Estado inicial
      selectedCategory: null,
      searchQuery: '',

      // Acciones
      setSelectedCategory: (category) => 
        set({ selectedCategory: category }, false, 'setSelectedCategory'),
      
      setSearchQuery: (query) => 
        set({ searchQuery: query }, false, 'setSearchQuery'),
      
      resetFilters: () => 
        set({ selectedCategory: null, searchQuery: '' }, false, 'resetFilters'),
    }),
    { name: 'FilterStore' } // Nombre para el devtools
  )
);