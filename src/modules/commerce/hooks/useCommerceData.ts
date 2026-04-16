import { useQuery } from "@tanstack/react-query";
import { getCommerceOrders, getCommerceProductsByStock, getCommerceProductsByExpiration } from "../api/commerce.api";
import { ProductExpirationFilter } from "@/modules/products/enums/product-expiration-filter.enum";

export const useCommerceOrders = (commerceId: string | null | undefined) => {
  return useQuery({
    queryKey: ["commerce-orders", commerceId],
    queryFn: () => getCommerceOrders(commerceId!),
    enabled: !!commerceId,
  });
};

export const useCommerceProductsByStock = (commerceId: string | null | undefined) => {
  return useQuery({
    queryKey: ["commerce-products-by-stock", commerceId],
    queryFn: () => getCommerceProductsByStock(commerceId!),
    enabled: !!commerceId,
  });
};

export const useCommerceProductsByExpiration = (
  commerceId: string | null | undefined,
  filter: ProductExpirationFilter
) => {
  return useQuery({
    queryKey: ["commerce-products-by-expiration", commerceId, filter],
    queryFn: () => getCommerceProductsByExpiration(commerceId!, filter),
    enabled: !!commerceId,
  });
};
