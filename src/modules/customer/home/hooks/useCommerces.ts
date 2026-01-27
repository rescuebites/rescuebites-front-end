import { useQuery } from "@tanstack/react-query";
import { getCommercesByType } from "../services/home.service";
import { CommercePublicResponse, PaginatedResponse } from "../interfaces/responses";

export function useCommercesByType(commerceType: string, size = 6) {
  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['commerces', commerceType, size],
    queryFn: () => getCommercesByType(commerceType, 0, size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!commerceType, // Solo ejecuta si commerceType existe
  });
}