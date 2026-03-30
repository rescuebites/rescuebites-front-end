import { ImageResponse } from "@/shared/interfaces/image-response.interface";

export interface CommercePublicResponse {
  commerceId: string;
  name: string;
  images: ImageResponse[];
}

export interface CommerceResponse {
  commerceId: string;
  name: string;
  description?: string;
  address: string;
  locality: string;
  openingHours: string;
  phone: string;
  images: ImageResponse[];
  commerceTypes?: string[];
}

//para mantener la estructura de paginacion en las respuestas (backend)
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}