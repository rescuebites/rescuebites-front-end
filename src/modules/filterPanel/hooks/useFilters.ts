import { useEffect } from 'react';
import { useFilterStore } from './useFilterStore';
import { getClientById } from '@/modules/client/api/client.api';
import { useAuthStore } from '@/modules/auth/hooks/useAuthStore';

/**
 * Hook personalizado para manejar los filtros de productos
 * Carga las preferencias permanentes del usuario al montar
 */
export const useFilters = () => {
  const clientId = useAuthStore((state) => state.clientId);
  const {
    permanentPreferences,
    temporaryPreferences,
    categories,
    setPermanentPreferences,
    getAllActivePreferences,
    getActiveFiltersCount,
    hasActiveFilters,
    clearTemporaryFilters,
  } = useFilterStore();

  // Cargar preferencias permanentes del usuario desde la API
  useEffect(() => {
    if (!clientId) return;

    const loadUserPreferences = async () => {
      try {
        const client = await getClientById(clientId);
        setPermanentPreferences(client.preferences);
      } catch (error) {
        console.error('Error cargando preferencias del usuario:', error);
      }
    };

    loadUserPreferences();
  }, [clientId, setPermanentPreferences]);

  /**
   * Obtiene los filtros activos para enviar a la API
   */
  const getActiveFiltersForAPI = () => {
    return {
      preferences: getAllActivePreferences(),
      categories,
    };
  };

  return {
    // Estado
    permanentPreferences,
    temporaryPreferences,
    categories,
    
    // Métodos
    getAllActivePreferences: getAllActivePreferences(),
    getActiveFiltersCount: getActiveFiltersCount(),
    hasActiveFilters: hasActiveFilters(),
    clearTemporaryFilters,
    getActiveFiltersForAPI,
  };
};