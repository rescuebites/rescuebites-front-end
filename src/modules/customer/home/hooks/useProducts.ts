import { useQuery } from "@tanstack/react-query";
import { getTopDeals } from "../services/home.service";
import { TOP_DEALS_QUERY_KEY } from "../constants";
import { ProductResponse } from "../interfaces/responses"; 

export function useTopDeals(size = 6) {
  return useQuery<ProductResponse[], Error>({ //AGREGAR TIPOS
    queryKey: [TOP_DEALS_QUERY_KEY, size],
    queryFn: () => getTopDeals(size),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: [], //valor por defecto si la query falla, por si no hay productos en la bd
  });
}