import { httpClient } from "@/shared/lib/httpClient";
import { 
  ProductResponse, 
  CommercePublicResponse, 
  PaginatedResponse 
} from "../interfaces/responses";

// Productos destacados del home (ordenados por precio)
export const getTopDeals = async (size = 12): Promise<ProductResponse[]> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/public/products/ordered-by-price`,
      { params: { page: 0, size } }
    );
    return data?.content ?? [];
  } catch (error) {
    console.error("Error fetching top deals:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

// Todos los productos paginados -> para secciones de tiendas
export const getAllProducts = async (page = 0, size = 10): Promise<PaginatedResponse<ProductResponse>> => {
  const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
    `/api/v1/public/products`,
    { params: { page, size } }
  );
  return data;
};

// Comercios por tipo (para stores)
export const getCommercesByType = async (
  commerceType: string, 
  page = 0, 
  size = 6
): Promise<PaginatedResponse<CommercePublicResponse>> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<CommercePublicResponse>>(
      `/api/v1/public/commerces/type/${commerceType}`,
      { params: { page, size } }
    );
    // Si la respuesta es null/undefined, devolver estructura vacía
      return data ?? { 
        content: [], 
        totalElements: 0, 
        totalPages: 0, 
        size: 0, 
        number: 0 
      };
    } catch (error) {
    console.error('Error al obtener comercios:', error);
    return { 
      content: [], 
      totalElements: 0, 
      totalPages: 0, 
      size: 0, 
      number: 0 
    };
  }
};