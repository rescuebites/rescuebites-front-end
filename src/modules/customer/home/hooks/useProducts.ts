import { useQuery } from "@tanstack/react-query";
import { getProductDetail, getProductsByCategory, getProductsByCommerce, getTopDeals } from "../services/home.service";
import { TOP_DEALS_QUERY_KEY } from "../constants";
import { ProductResponse, PaginatedResponse } from "../interfaces/responses"; 
import { CategoryDisplay } from "../interfaces/types";
import { useLocalityStore } from "./useLocalityStore";

interface UseProductsParams {
  commerceId?: string;
  size?: number;
  page?: number;
}


export function useTopDeals(size = 6) {
  const locality = useLocalityStore((state) => state.locality);

  return useQuery<ProductResponse[], Error>({ 
    queryKey: [TOP_DEALS_QUERY_KEY, locality, size], //identificador único de esta query en cache (para evitar hacer otra petición si se llama de nuevo elmismo id)
    queryFn: () => getTopDeals(locality || 'Córdoba Capital', size), //función que trae los datos, en este caso la función que hace la petición a la API
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
    placeholderData: [], //valor por defecto si la query falla, por si no hay productos en la bd
  });
}

//hook para obtener los productos de un comercio específico, si no se pasa commerceId, obtiene todos los productos
export const useProducts = ({ commerceId, size = 20, page = 0 }: UseProductsParams = {}) => {
  return useQuery<PaginatedResponse<ProductResponse>, Error>({
    queryKey: ["products", { commerceId, size, page }],
    queryFn: () => getProductsByCommerce(commerceId!, page, size), // El "!" indica que estamos seguros de que commerceId no es null aquí, ya que la query solo se ejecutará si commerceId existe
    enabled: !!commerceId, // Solo ejecuta la query si commerceId existe
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: 2,
  });
};


//hook para obtener el detalle de un producto específico
export const useProductDetail = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductDetail(productId!), 
    enabled: !!productId, 
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
  });
};

//hook para obtener los productos filtrados por tipo de coemrcio seleccionado
export function useProductsByCategory(category: CategoryDisplay | null, size = 12) {
  const locality = useLocalityStore((state) => state.locality);

  return useQuery<ProductResponse[], Error>({
    queryKey: ['products-by-category', category, locality, size],
    queryFn: () => {
      if (!category) {
        return getTopDeals(locality || 'Córdoba Capital', size); //si no hay categoría seleccionada, muestra los top deals
      }
      return getProductsByCategory(category, locality || 'Córdoba Capital', 0, size);
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
    enabled: !!locality,
    placeholderData: [],
  });
}