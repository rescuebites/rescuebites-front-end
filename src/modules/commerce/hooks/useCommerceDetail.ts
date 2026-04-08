import { useQuery } from "@tanstack/react-query";
import { getCommerceDetail } from "@/modules/customer/home/services/home.service";
import type { CommerceResponse } from "@/modules/commerce/interfaces/responses/commerce.response";

export const useCommerceDetail = (commerceId: string | null | undefined) => {
  return useQuery<CommerceResponse, Error>({
    queryKey: ["commerce-detail", commerceId],
    queryFn: () => getCommerceDetail(commerceId!),
    enabled: !!commerceId,
    staleTime: 5 * 60 * 1000,
  });
};

export default useCommerceDetail;
