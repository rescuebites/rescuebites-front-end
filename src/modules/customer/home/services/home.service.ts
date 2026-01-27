// import { httpClient } from "@/shared/lib/httpClient";
// import {Deal, Store, Product} from "../interfaces/types";

// // Tipo genérico para respuestas paginadas. Service actúa comocapa de adaptación para la vista de topDeals
// interface PaginatedResponse<T> {
//   content: T[];
//   totalElements: number;
//   totalPages: number;
//   size: number;
//   number: number;
// }

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// export const getFeaturedStores = async (): Promise<Store[]> => {
//     const {data} = await httpClient.get<Store[]>(`${BACKEND_URL}/stores/featured`);
//     return data;
// };

// export const getProducts  =async (page=0, size=10): Promise<PaginatedResponse<Product>> => {
//     const {data} = await httpClient.get<PaginatedResponse<Product>>(`/api/v1/products`, {params:{ page, size }});
//     return data;
// };

// export const getTopDeals = async (size = 6): Promise<Product[]> => {
//   const { data } = await getProducts(0, size);
//   return data.content
//     .filter(product => product.active)
//     .sort((a, b) => b.discountPercentage - a.discountPercentage);
// };