import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products.api";

export const useProductById = (commerceId: string | undefined, productId: string | undefined) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(commerceId!, productId!),
    enabled: !!productId && !!commerceId,
  });
};
