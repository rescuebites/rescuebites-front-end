import { useQuery } from "@tanstack/react-query";
import { getAllCommerces, getCommerceDetail, getCommercesByType } from "../services/home.service";
import { CommercePublicResponse, PaginatedResponse } from "../interfaces/responses";
import type { CommerceResponse } from "../interfaces/responses";
import { CategoryDisplay } from "../interfaces/types";
import { useLocalityStore } from "./useLocalityStore";

//hook para obtener todos los comercios sin importar su tipo, para sección de tiendas
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

export function useCommercesByType(commerceType: CategoryDisplay, size = 6) {
  const locality = useLocalityStore((state) => state.locality);

  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['commerces', commerceType, locality, size],
    queryFn: () => getCommercesByType(commerceType, locality || 'Córdoba Capital', 0, size),
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


//hook para obtener la información de un comercio en específico
export const useCommerceDetail = (commerceId: string | null) => {
  return useQuery<CommerceResponse, Error>({
    queryKey: ["commerce-detail", commerceId],
    queryFn: () => getCommerceDetail(commerceId!),
    enabled: !!commerceId, // Solo ejecuta si commerceId existe
    staleTime: 5 * 60 * 1000,
  });
};