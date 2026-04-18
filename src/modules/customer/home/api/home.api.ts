import { httpClient } from "@/shared/lib/httpClient";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";

import { CommerceTypeDisplay } from "@/shared/utils/commerce-mapping";
import { getCommerceTypeFromDisplay } from "@/shared/utils/commerce.utils";
import { PaginatedResponse } from "../interfaces/responses/paginated.response";
import { CommercePublicResponse } from "@/modules/commerce/interfaces/responses/commerce-public.response";
import { CommerceResponse } from "@/modules/commerce/interfaces/responses/commerce.response";

// ── Client-specific endpoints ─────────────────────────────────────────────────
// Backend resolves locality + preferences from the client's own profile.

// Products filtered by the client's stored preferences (vegan, celiac, etc.)
export const getProductsByPreferencesForClient = async (
  clientId: string,
  size = 12
): Promise<ProductResponse[]> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/clients/${clientId}/products/preferences`,
      { params: { page: 0, size } }
    );
    return data?.content ?? [];
  } catch (error) {
    console.error("Error fetching products by preferences for client:", error);
    return [];
  }
};


export const getProductsByCommerceTypeForClient = async (
  clientId: string,
  commerceTypeDisplay: CommerceTypeDisplay,
  page = 0,
  size = 12
): Promise<ProductResponse[]> => {
  try {
    const commerceType = getCommerceTypeFromDisplay(commerceTypeDisplay);
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/clients/${clientId}/products/type/${commerceType}/ordered-by-price`,
      { params: { page, size } }
    );
    return (data?.content ?? []).map((product) => ({
      ...product,
      productImages: (product as any).images || product.productImages || [],
    }));
  } catch (error) {
    console.error("Error fetching products by category for client:", error);
    return [];
  }
};

// ── Public endpoints (locality required) ─────────────────────────────────────

// Productos destacados del home (ordenados por precio)
export const getTopDeals = async (locality: string, size = 12): Promise<ProductResponse[]> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/public/products/ordered-by-price`,
      { params: { locality, page: 0, size } }
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

//Obtener todos los comercios paginados -> para sección de tiendas
export const getAllCommerces = async (locality: string, page = 0): Promise<PaginatedResponse<CommercePublicResponse>> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<CommercePublicResponse>>(
      `/api/v1/public/commerces`,
      { params: { locality, page } }
    );
    return data;
  } catch (error) {
    console.error("Error fetching all commerces:", error);
    return { 
      content: [], 
      totalElements: 0, 
      totalPages: 0, 
      size: 0, 
      number: 0 
    };
  }
};

// Comercios por tipo (para stores)
export const getCommercesByType = async (
  locality: string,
  commerceTypeDisplay: CommerceTypeDisplay, 
  page = 0, 
  size = 6
): Promise<PaginatedResponse<CommercePublicResponse>> => {
  try {
    const commerceType = getCommerceTypeFromDisplay(commerceTypeDisplay);
    const { data } = await httpClient.get<PaginatedResponse<CommercePublicResponse>>(
      `/api/v1/public/commerces/type/${commerceType}`,
      { params: { locality, page, size } }
    );
    // Si la respuesta es null/undefined, devuelve estructura vacía
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

//Productos de un comercio específico
export const getProductsByCommerce = async (
  commerceId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<ProductResponse>> => {
  const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
    `/api/v1/public/products/commerce/${commerceId}`,
    { params: { page, size } }
  );
  return data;
};

//Detalle de un producto específico
export const getProductDetail = async (productId: string): Promise<ProductResponse> => {
  const { data } = await httpClient.get<ProductResponse>(
    `/api/v1/public/products/${productId}`
  );
  return data;
};

//Detalle de un comercio específico
export const getCommerceDetail = async (commerceId: string): Promise<CommerceResponse> => {
  const { data } = await httpClient.get<CommerceResponse>(
    `/api/v1/public/commerces/${commerceId}`
  );
  return data;
};

// Productos ordenados por precio filtrados por preferencias del cliente (autenticado)
export const getTopDealsByClient = async (
  clientId: string,
  size = 12
): Promise<ProductResponse[]> => {
  try {
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/clients/${clientId}/products/ordered-by-price`,
      { params: { page: 0, size } }
    );
    return (data?.content ?? []).map(product => ({
      ...product,
      productImages: (product as any).images || product.productImages || []
    }));
  } catch (error) {
    console.error("Error fetching top deals by client:", error);
    return [];
  }
};

// Productos por tipo de comercio filtrados por preferencias del cliente (autenticado)
export const getProductsByCommerceTypeForClient = async (
  clientId: string,
  commerceTypeDisplay: CommerceTypeDisplay,
  size = 12
): Promise<ProductResponse[]> => {
  try {
    const commerceType = getCommerceTypeFromDisplay(commerceTypeDisplay);
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/clients/${clientId}/products/type/${commerceType}/ordered-by-price`,
      { params: { page: 0, size } }
    );
    return (data?.content ?? []).map(product => ({
      ...product,
      productImages: (product as any).images || product.productImages || []
    }));
  } catch (error) {
    console.error("Error fetching products by commerce type for client:", error);
    return [];
  }
};

//Obtener productos por tipo de comercio seleccionado
export const getProductsByCommerceType = async (
  commerceTypeDisplay: CommerceTypeDisplay,
  locality: string,
  page = 0,
  size = 12
): Promise<ProductResponse[]> => {
  try {
    const commerceType = getCommerceTypeFromDisplay(commerceTypeDisplay);
    const { data } = await httpClient.get<PaginatedResponse<ProductResponse>>(
      `/api/v1/public/products/type/${commerceType}/ordered-by-price`,
      { params: { locality, page, size } }
    );

    //Normalizar respuesta de imagenes de backend (puede venir como 'images' o 'productImages')
    const normalizedContent = (data?.content ?? []).map(product => ({
      ...product,
      // Si viene 'images', se copia a 'productImages'
      productImages: (product as any).images || product.productImages || []
    }));

    return normalizedContent;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};