import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/shared/lib/httpClient";
import type { ProductDetailResponse } from "../interfaces/responses";

export const useProductDetail = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-detail", productId],
    queryFn: async (): Promise<ProductDetailResponse> => {
      const response = await httpClient.get(`/api/v1/public/products/${productId}`);
      return response.data;
    },
    enabled: !!productId, // Solo ejecuta la query si productId existe
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
  });
};