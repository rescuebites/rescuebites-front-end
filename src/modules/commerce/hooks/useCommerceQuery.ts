import { useQuery } from "@tanstack/react-query";
import { getCommerceById } from "../services/commerceService";

export const useCommerceQuery = (id: string) => {
  return useQuery({
    queryKey: ["commerce", id],
    queryFn: () => getCommerceById(id),
    enabled: !!id, // Solo ejecutar la query si hay un id
    staleTime: 5 * 60 * 1000, // Los datos son frescos por 5 minutos
  });
};