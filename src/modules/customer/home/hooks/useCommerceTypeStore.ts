//Hook para guardar el tipo de comercio seleccionado en el home, para mostrarlo en la barra de categorias y en los productos destacados
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CommerceTypeDisplay } from '@/shared/utils/commerce-mapping';

interface CommerceTypeState {
  selectedCommerceType: CommerceTypeDisplay | null;
  setSelectedCommerceType: (type: CommerceTypeDisplay | null) => void;
  reset: () => void;
}

export const useCommerceTypeStore = create<CommerceTypeState>()(
  devtools(
    (set) => ({
      selectedCommerceType: null,

      setSelectedCommerceType: (type) =>
        set({ selectedCommerceType: type }, false, 'setSelectedCommerceType'),

      reset: () =>
        set({ selectedCommerceType: null }, false, 'reset'),
    }),
    { name: 'CommerceTypeStore' }
  )
);
