import { useQuery } from "@tanstack/react-query";
import { getProductDetail, getProductsByCommerceType, getProductsByCommerce, getTopDeals, getTopDealsByClient, getProductsByCommerceTypeForClient } from "../api/home.api";
import { TOP_DEALS_QUERY_KEY } from "../constants";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { PaginatedResponse } from "../interfaces/responses"; 
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { useLocalityStore } from "./useLocalityStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useFilterStore } from "../../../filterPanel/hooks/useFilterStore";
import { PreferenceType } from "@/modules/client/enums/preference-type.enum";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";

function matchesPreferences(product: ProductResponse, preferences: PreferenceType[]): boolean {
  if (preferences.length === 0) return true;
  if (!product.preferences || product.preferences.length === 0) return false;
  return preferences.every((pref) => product.preferences!.includes(pref));
}

function matchesCategories(product: ProductResponse, categories: ProductCategory[]): boolean {
  if (categories.length === 0) return true;
  return categories.includes(product.category as unknown as ProductCategory);
}

function applyFilters(
  products: ProductResponse[],
  preferences: PreferenceType[],
  categories: ProductCategory[],
): ProductResponse[] {
  return products.filter(
    (p) => matchesPreferences(p, preferences) && matchesCategories(p, categories),
  );
}

interface UseProductsParams {
  commerceId?: string;
  size?: number;
  page?: number;
}


export function useTopDeals(size = 6) {
  const locality = useLocalityStore((state) => state.locality);
  const clientId = useAuthStore((state) => state.clientId);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const query = useQuery<ProductResponse[], Error>({ 
    queryKey: [TOP_DEALS_QUERY_KEY, clientId, locality, size],
    queryFn: () =>
      clientId
        ? getTopDealsByClient(clientId, size)
        : getTopDeals(locality || 'Córdoba Capital', size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
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
  const locality = useLocalityStore((state) => state.locality);
  const clientId = useAuthStore((state) => state.clientId);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const query = useQuery<ProductResponse[], Error>({
    queryKey: ['products-by-category', clientId, commerceType, locality, size],
    queryFn: () => {
      if (clientId) {
        return commerceType
          ? getProductsByCommerceTypeForClient(clientId, commerceType, size)
          : getTopDealsByClient(clientId, size);
      }
      if (!commerceType) {
        return getTopDeals(locality || 'Córdoba Capital', size);
      }
      return getProductsByCommerceType(commerceType, locality || 'Córdoba Capital', 0, size);
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
    placeholderData: [],
  });

  return {
    ...query,
    data: applyFilters(query.data ?? [], temporaryPreferences, categories),
  };
}