import { useQuery } from "@tanstack/react-query";
import { getAllCommerces, getCommercesByType } from "../api/home.api";
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { PaginatedResponse } from "../interfaces/responses/paginated.response";
import { CommercePublicResponse } from "@/modules/commerce/interfaces/responses/commerce-public.response";
import { useLocalityStore } from "./useLocalityStore";

export function useAllCommerces() {
  const locality = useLocalityStore((state) => state.locality);

  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['all-commerces', locality], 
    queryFn: () => getAllCommerces(locality || 'Córdoba Capital', 0),  
    staleTime: 5 * 60 * 1000, 
    retry: 2,
    enabled: !!locality,
    placeholderData: { 
      content: [], 
      totalElements: 0,
      totalPages: 0,
      size: 0,
      number: 0
    },
  });
}

export function useCommercesByType(commerceType: CommerceTypeDisplay, size = 6) {
  const locality = useLocalityStore((state) => state.locality);
  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['commerces', commerceType, locality, size],
    queryFn: () => getCommercesByType(locality || 'Córdoba Capital', commerceType, 0, size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!commerceType && !!locality,
    placeholderData: { 
      content: [], 
      totalElements: 0, 
      totalPages: 0, 
      size: 0, 
      number: 0 
    },
  });
}