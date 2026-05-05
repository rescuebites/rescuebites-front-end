import { useMemo, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getProductDetail,
  getProductsByCommerceType,
  getProductsByCommerce,
  getTopDeals,
  getProductsByCommerceTypeForClient,
  getProductsByPreferencesForClient,
  getProductsByCommerceTypePage,
  getProductsByCommerceTypeForClientPage,
  getProductsByPreferencesPage,
  getTopDealsPage,
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
  const temporaryPreferences = useFilterStore(
    (state) => state.temporaryPreferences,
  );
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;
  const effectiveSize = categories.length > 0 ? 200 : size;

  const query = useQuery<ProductResponse[], Error>({
    queryKey: [
      TOP_DEALS_QUERY_KEY,
      isClient ? `client-prefs-${clientId}` : locality,
      effectiveSize,
      categories,
    ],
    queryFn: () =>
      isClient
        ? getProductsByPreferencesForClient(clientId!, effectiveSize)
        : getTopDeals(locality || "Cordoba Capital", effectiveSize),
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
        temporaryPreferences.every((pref) => p.preferences?.includes(pref)),
      );
    }
    if (categories.length > 0) {
      result = result.filter((p) =>
        categories.includes(p.category as ProductCategory),
      );
    }
    return result;
  }, [query.data, temporaryPreferences, categories]);

  return { ...query, data: filteredData };
}

//hook para obtener los productos de un comercio específico, si no se pasa commerceId, obtiene todos los productos
export const useProducts = ({
  commerceId,
  size = 20,
  page = 0,
}: UseProductsParams = {}) => {
  return useQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products", { commerceId, size, page }],
    queryFn: () => getProductsByCommerce(commerceId!, page, size),
    enabled: !!commerceId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useInfiniteProducts = (
  commerceId: string | undefined,
  size = 20,
) => {
  return useInfiniteQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products-infinite", { commerceId, size }],
    queryFn: ({ pageParam }) =>
      getProductsByCommerce(commerceId!, pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages
        ? lastPage.number + 1
        : undefined,
    enabled: !!commerceId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

// Hook con infinite-query + auto-fetch para AllProductsPage
export function useInfiniteProductsByCommerceType(
  commerceType: CommerceTypeDisplay | null,
  size = 20,
) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const temporaryPreferences = useFilterStore(
    (state) => state.temporaryPreferences,
  );
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;

  const query = useInfiniteQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: [
      "products-by-category-infinite",
      commerceType,
      isClient ? `client-${clientId}` : locality,
      size,
    ],
    queryFn: ({ pageParam }) => {
      const page = pageParam as number;
      if (isClient) {
        return commerceType
          ? getProductsByCommerceTypeForClientPage(
              clientId!,
              commerceType,
              page,
              size,
            )
          : getProductsByPreferencesPage(clientId!, page, size);
      }
      return commerceType
        ? getProductsByCommerceTypePage(
            commerceType,
            locality || "Cordoba Capital",
            page,
            size,
          )
        : getTopDealsPage(locality || "Cordoba Capital", page, size);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages
        ? lastPage.number + 1
        : undefined,
    enabled: isClient || !!locality,
  });

  const allProducts = useMemo(
    () => query.data?.pages.flatMap((p) => p.content) ?? [],
    [query.data],
  );

  const filteredData = useMemo(() => {
    let result = allProducts;
    if (temporaryPreferences.length > 0) {
      result = result.filter((p) =>
        temporaryPreferences.every((pref) => p.preferences?.includes(pref)),
      );
    }
    if (categories.length > 0) {
      result = result.filter((p) =>
        categories.includes(p.category as ProductCategory),
      );
    }
    return result;
  }, [allProducts, temporaryPreferences, categories]);

  const hasFilters = temporaryPreferences.length > 0 || categories.length > 0;

  // Auto-fetch more pages when client-side filters yield sparse results
  useEffect(() => {
    if (!hasFilters) return;
    if (!query.hasNextPage || query.isFetchingNextPage || query.isFetching)
      return;
    if (filteredData.length >= size) return;
    query.fetchNextPage();
  }, [
    filteredData.length,
    hasFilters,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isFetching,
    size,
    query.fetchNextPage,
  ]);

  return {
    data: filteredData,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
}

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
export function useProductsByCommerceType(
  commerceType: CommerceTypeDisplay | null,
  size = 12,
) {
  const { isAuthenticated, clientId } = useAuthStore();
  const locality = useLocalityStore((state) => state.locality);
  const temporaryPreferences = useFilterStore(
    (state) => state.temporaryPreferences,
  );
  const categories = useFilterStore((state) => state.categories);

  const isClient = isAuthenticated && !!clientId;
  const effectiveSize =
    categories.length > 0 || temporaryPreferences.length > 0 ? 200 : size;

  const query = useQuery<ProductResponse[], Error>({
    queryKey: [
      "products-by-category",
      commerceType,
      isClient ? `client-${clientId}` : locality,
      effectiveSize,
      categories,
      temporaryPreferences,
    ],
    queryFn: () => {
      if (isClient) {
        return commerceType
          ? getProductsByCommerceTypeForClient(
              clientId!,
              commerceType,
              0,
              effectiveSize,
            )
          : getProductsByPreferencesForClient(clientId!, effectiveSize);
      }
      return commerceType
        ? getProductsByCommerceType(
            commerceType,
            locality || "Cordoba Capital",
            0,
            effectiveSize,
          )
        : getTopDeals(locality || "Cordoba Capital", effectiveSize);
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
        temporaryPreferences.every((pref) => p.preferences?.includes(pref)),
      );
    }
    if (categories.length > 0) {
      result = result.filter((p) =>
        categories.includes(p.category as ProductCategory),
      );
    }
    return result;
  }, [query.data, temporaryPreferences, categories]);

  return { ...query, data: filteredData };
}
