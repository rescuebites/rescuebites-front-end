import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getCommerceOrders,
  getCommerceProductsByStock,
  getCommerceProductsByExpiration,
} from "../api/commerce.api";
import { ProductExpirationFilter } from "@/modules/products/enums/product-expiration-filter.enum";
import { Page } from "@/modules/catalog/interfaces/types";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";

export const useCommerceOrders = (commerceId: string | null | undefined) => {
  return useQuery({
    queryKey: ["commerce-orders", commerceId],
    queryFn: () => getCommerceOrders(commerceId!),
    enabled: !!commerceId,
  });
};

export const useCommerceProductsByStock = (
  commerceId: string | null | undefined,
) => {
  return useQuery({
    queryKey: ["commerce-products-by-stock", commerceId],
    queryFn: () => getCommerceProductsByStock(commerceId!),
    enabled: !!commerceId,
  });
};

export const useCommerceProductsByExpiration = (
  commerceId: string | null | undefined,
  filter: ProductExpirationFilter,
) => {
  return useQuery({
    queryKey: ["commerce-products-by-expiration", commerceId, filter],
    queryFn: () => getCommerceProductsByExpiration(commerceId!, filter),
    enabled: !!commerceId,
  });
};

export const useInfiniteProductsByExpiration = (
  commerceId: string | null | undefined,
  filter: ProductExpirationFilter,
  size = 20,
) => {
  return useInfiniteQuery<Page<ProductResponse>, Error>({
    queryKey: [
      "commerce-products-by-expiration-infinite",
      commerceId,
      filter,
      size,
    ],
    queryFn: ({ pageParam }) => {
      if (!commerceId) throw new Error("commerceId is required");
      return getCommerceProductsByExpiration(
        commerceId,
        filter,
        pageParam as number,
        size,
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.number + 1 < lastPage.totalPages
        ? lastPage.number + 1
        : undefined,
    enabled: !!commerceId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};
