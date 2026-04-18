import { useQuery } from "@tanstack/react-query";
import {
  getProductDetail,
  getProductsByCommerceType,
  getProductsByCommerce,
  getTopDeals,
  getProductsByCommerceTypeForClient,
  getProductsByPreferencesForClient,
} from "../api/home.api";
import { TOP_DEALS_QUERY_KEY } from "../constants";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { PaginatedResponse } from "../interfaces/responses/paginated.response";
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { useLocalityStore } from "./useLocalityStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";

interface UseProductsParams {
  commerceId?: string;
  size?: number;
  page?: number;
}


export function useTopDeals(size = 6) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const clientId = useAuthStore((state) => state.clientId);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;

  return useQuery<ProductResponse[], Error>({
    queryKey: [TOP_DEALS_QUERY_KEY, isClient ? `client-prefs-${clientId}` : locality, size],
    queryFn: () =>
      isClient
        ? getProductsByPreferencesForClient(clientId!, size)
        : getTopDeals(locality || "Córdoba Capital", size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    // isClient already guarantees !!clientId; guests need a locality
    enabled: isClient || !!locality,
    placeholderData: [],
  });

  return {
    ...query,
    data: applyFilters(query.data ?? [], temporaryPreferences, categories),
  };
}

//hook para obtener los productos de un comercio específico, si no se pasa commerceId, obtiene todos los productos
export const useProducts = ({ commerceId, size = 20, page = 0 }: UseProductsParams = {}) => {
  return useQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products", { commerceId, size, page }],
    queryFn: () => getProductsByCommerce(commerceId!, page, size), // El "!" indica que estamos seguros de que commerceId no es null aquí, ya que la query solo se ejecutará si commerceId existe
    enabled: !!commerceId, // Solo ejecuta la query si commerceId existe
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: 2,
  });
};


//hook para obtener el detalle de un producto específico
export const useProductDetail = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductDetail(productId!), 
    enabled: !!productId, 
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
  });
};

//hook para obtener los productos filtrados por tipo de comercio seleccionado
export function useProductsByCommerceType(commerceType: CommerceTypeDisplay | null, size = 12) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const clientId = useAuthStore((state) => state.clientId);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;

  return useQuery<ProductResponse[], Error>({
    queryKey: ["products-by-category", commerceType, isClient ? `client-${clientId}` : locality, size],
    queryFn: () => {
      if (isClient) {
        // When a commerce-type chip is selected the backend doesn’t have a
        // "/type/{type}/preferences" endpoint, so we use the type+price one.
        // When nothing is selected we use /preferences to respect dietary prefs.
        return commerceType
          ? getProductsByCommerceTypeForClient(clientId!, commerceType, 0, size)
          : getProductsByPreferencesForClient(clientId!, size);
      }
      return commerceType
        ? getProductsByCommerceType(commerceType, locality || "Córdoba Capital", 0, size)
        : getTopDeals(locality || "Córdoba Capital", size);
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    // isClient already guarantees !!clientId; guests need a locality
    enabled: isClient || !!locality,
    placeholderData: [],
  });

  return {
    ...query,
    data: applyFilters(query.data ?? [], temporaryPreferences, categories),
  };
}