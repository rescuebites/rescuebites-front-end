import { useMemo } from "react";
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
import { useFilterStore } from "@/modules/filterPanel/hooks/useFilterStore";
import { ProductCategory } from "@/modules/products/enums/product-category.enum";

interface UseProductsParams {
  commerceId?: string;
  size?: number;
  page?: number;
}


export function useTopDeals(size = 6) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;

  const query = useQuery<ProductResponse[], Error>({
    queryKey: [TOP_DEALS_QUERY_KEY, isClient ? `client-prefs-${clientId}` : locality, size],
    queryFn: () =>
      isClient
        ? getProductsByPreferencesForClient(clientId!, size)
        : getTopDeals(locality || "Cordoba Capital", size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: isClient || !!locality,
    placeholderData: [],
  });

  const filteredData = useMemo(() => {
    if (!query.data) return query.data;
    let result = query.data;
    if (temporaryPreferences.length > 0) {
      result = result.filter((p) =>
        temporaryPreferences.every((pref) => p.preferences?.includes(pref))
      );
    }
    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category as ProductCategory));
    }
    return result;
  }, [query.data, temporaryPreferences, categories]);

  return { ...query, data: filteredData };
}

//hook para obtener los productos de un comercio específico, si no se pasa commerceId, obtiene todos los productos
export const useProducts = ({ commerceId, size = 20, page = 0 }: UseProductsParams = {}) => {
  return useQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products", { commerceId, size, page }],
    queryFn: () => getProductsByCommerce(commerceId!, page, size),
    enabled: !!commerceId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};


//hook para obtener el detalle de un producto específico
export const useProductDetail = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductDetail(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

//hook para obtener los productos filtrados por tipo de comercio seleccionado
export function useProductsByCommerceType(commerceType: CommerceTypeDisplay | null, size = 12) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const temporaryPreferences = useFilterStore((state) => state.temporaryPreferences);
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;

  const query = useQuery<ProductResponse[], Error>({
    queryKey: ["products-by-category", commerceType, isClient ? `client-${clientId}` : locality, size],
    queryFn: () => {
      if (isClient) {
        return commerceType
          ? getProductsByCommerceTypeForClient(clientId!, commerceType, 0, size)
          : getProductsByPreferencesForClient(clientId!, size);
      }
      return commerceType
        ? getProductsByCommerceType(commerceType, locality || "Cordoba Capital", 0, size)
        : getTopDeals(locality || "Cordoba Capital", size);
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    enabled: isClient || !!locality,
    placeholderData: [],
  });

  const filteredData = useMemo(() => {
    if (!query.data) return query.data;
    let result = query.data;
    if (temporaryPreferences.length > 0) {
      result = result.filter((p) =>
        temporaryPreferences.every((pref) => p.preferences?.includes(pref))
      );
    }
    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category as ProductCategory));
    }
    return result;
  }, [query.data, temporaryPreferences, categories]);

  return { ...query, data: filteredData };
}
