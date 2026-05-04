import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getProductsByStock, StockFilter } from "../api/products.api";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses/paginated.response";
import { ProductResponse } from "../interfaces/responses/product-response.interface";

export const useProductsByStock = (commerceId: string | null | undefined) => {
  return useQuery({
    queryKey: ["products-by-stock", commerceId],
    queryFn: () => {
      if (!commerceId) {
        throw new Error("commerceId is required to fetch products");
      }
      return getProductsByStock(commerceId);
    },
    enabled: !!commerceId,
    staleTime: 30 * 1000,
    retry: 2,
  });
};

export const useInfiniteProductsByStock = (
  commerceId: string | null | undefined,
  size = 20,
  stockFilter: StockFilter = "ALL",
) => {
  return useInfiniteQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products-by-stock-infinite", commerceId, size, stockFilter],
    queryFn: ({ pageParam }) => {
      if (!commerceId) throw new Error("commerceId is required");
      return getProductsByStock(
        commerceId,
        pageParam as number,
        size,
        stockFilter,
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
