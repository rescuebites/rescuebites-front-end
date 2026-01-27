import { httpClient } from "@/shared/lib/httpClient";
import { 
  ProductResponse, 
  CommercePublicResponse, 
  PaginatedResponse 
} from "../interfaces/responses";

// Productos destacados del home (ordenados por precio)
export const getTopDeals = async (size = 12): Promise<ProductResponse[]> => {
  const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
    `/api/v1/public/products/ordered-by-price`,
    { params: { page: 0, size } }
  );
  return data.content;
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
  const { data } = await httpClient.get<PaginatedResponse<CommercePublicResponse>>(
    `/api/v1/public/commerces/type/${commerceType}`,
    { params: { page, size } }
  );
  return data;
};