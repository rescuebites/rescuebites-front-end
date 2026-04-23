import { useQuery } from "@tanstack/react-query";
import { getProductsByStock } from "../api/products.api";

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
