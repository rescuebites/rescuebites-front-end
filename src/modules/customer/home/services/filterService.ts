// // src/modules/customer/services/filterService.ts

// import { ProductFilters, PreferenceType } from '../interfaces/filter.interface';

// // Tipos para las respuestas de la API
// export interface ClientPreferencesResponse {
//   dietaryPreferences: PreferenceType[];
// }

// export interface FilteredProductsResponse {
//   content: any[]; // Reemplaza 'any' con tu interface de Product
//   totalElements: number;
//   totalPages: number;
//   number: number;
//   size: number;
// }

// export interface FilterProductsRequest extends ProductFilters {
//   searchQuery?: string;
//   page?: number;
//   size?: number;
//   sortBy?: string;
//   sortDirection?: 'ASC' | 'DESC';
// }

// class FilterService {
//   private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

//   /**
//    * Obtiene las preferencias alimenticias del cliente desde su perfil
//    */
//   async getClientPreferences(): Promise<PreferenceType[]> {
//     try {
//       const response = await fetch(`${this.baseUrl}/client/preferences`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Agrega aquí tu token de autenticación
//           // 'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Error obteniendo preferencias del cliente');
//       }

//       const data: ClientPreferencesResponse = await response.json();
//       return data.dietaryPreferences;
//     } catch (error) {
//       console.error('Error en getClientPreferences:', error);
//       throw error;
//     }
//   }

//   /**
//    * Filtra productos según los criterios especificados
//    */
//   async filterProducts(
//     filters: FilterProductsRequest
//   ): Promise<FilteredProductsResponse> {
//     try {
//       const response = await fetch(`${this.baseUrl}/products/filter`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Agrega aquí tu token de autenticación
//           // 'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(filters),
//       });

//       if (!response.ok) {
//         throw new Error('Error filtrando productos');
//       }

//       const data: FilteredProductsResponse = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error en filterProducts:', error);
//       throw error;
//     }
//   }

//   /**
//    * Actualiza las preferencias alimenticias del cliente
//    */
//   async updateClientPreferences(
//     preferences: PreferenceType[]
//   ): Promise<void> {
//     try {
//       const response = await fetch(`${this.baseUrl}/client/preferences`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           // Agrega aquí tu token de autenticación
//           // 'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ dietaryPreferences: preferences }),
//       });

//       if (!response.ok) {
//         throw new Error('Error actualizando preferencias del cliente');
//       }
//     } catch (error) {
//       console.error('Error en updateClientPreferences:', error);
//       throw error;
//     }
//   }
// }

// export const filterService = new FilterService();