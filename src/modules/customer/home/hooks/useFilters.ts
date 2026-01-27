import { useEffect } from 'react';
import { useFilterStore } from '../useFilterStore';
import { PreferenceType } from '../interfaces/filter.interface';

/**
 * Hook personalizado para manejar los filtros de productos
 * Carga las preferencias permanentes del usuario al montar
 */
export const useFilters = () => {
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
    const loadUserPreferences = async () => {
      try {
        // TODO: Reemplazar con tu llamada real a la API
        // const response = await api.get('/api/client/preferences');
        // setPermanentPreferences(response.data.dietaryPreferences);
        
        // Ejemplo de datos mock (eliminar cuando tengas la API)
        const mockPreferences: PreferenceType[] = [
          PreferenceType.VEGAN,
          PreferenceType.NUT_FREE,
        ];
        setPermanentPreferences(mockPreferences);
      } catch (error) {
        console.error('Error cargando preferencias del usuario:', error);
      }
    };

    loadUserPreferences();
  }, [setPermanentPreferences]);

  /**
   * Obtiene los filtros activos para enviar a la API
   */
  const getActiveFiltersForAPI = () => {
    return {
      permanentPreferences,
      temporaryPreferences,
      categories,
    };
  };

  /**
   * Aplica los filtros y ejecuta una búsqueda
   */
  const applyFilters = async (additionalParams?: any) => {
    const filters = getActiveFiltersForAPI();
    
    try {
      // TODO: Reemplazar con tu llamada real a la API
      // const response = await api.post('/api/products/filter', {
      //   ...filters,
      //   ...additionalParams,
      // });
      // return response.data;
      
      console.log('Filtros aplicados:', filters);
      return filters;
    } catch (error) {
      console.error('Error aplicando filtros:', error);
      throw error;
    }
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
    applyFilters,
    getActiveFiltersForAPI,
  };
};