import { useQuery } from "@tanstack/react-query";
import { getAllCommerces, getCommerceDetail, getCommercesByType } from "../services/home.service";
import { CommercePublicResponse, PaginatedResponse } from "../interfaces/responses";
import type { CommerceResponse } from "../interfaces/responses";
import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";

//hook para obtener todos los comercios sin importar su tipo, para sección de tiendas
export function useAllCommerces() {
  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['all-commerces'], 
    queryFn: () => getAllCommerces(0),  
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
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
  return useQuery<PaginatedResponse<CommercePublicResponse>, Error>({
    queryKey: ['commerces', commerceType, size], // Identificador único de esta query en cache
    queryFn: () => getCommercesByType(commerceType, 0, size), // Función que trae los datos, en este caso la función que hace la petición a la API
    staleTime: 5 * 60 * 1000, //los datos se consideran frescos por 5 minutos, si se llama de nuevo la misma query dentro de ese tiempo, no hará otra petición a la API sino que usará los datos en cache
    retry: 2, //si la petición falla hace 2 reintentos antes de marcar la query como error
    enabled: !!commerceType, // Solo ejecuta si commerceType existe
    placeholderData: { // Valor por defecto si la query falla, si no hay comercios por ej
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