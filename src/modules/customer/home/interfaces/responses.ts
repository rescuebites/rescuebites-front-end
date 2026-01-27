export interface ImageResponse {
  imageId: string;
  imageUrl: string;
}

export interface ProductResponse {
  productId: string;
  commerceId: string;
  commerceName: string;
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  category: string;
  condition: string;
  expirationDate: string | null;
  images: ImageResponse[];
  active: boolean;
}

//interface limitada para los datos que se muestran enel front-end
export interface ProductPublicResponse {
  productId: string;
  name: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  expirationDate: string | null;
  images: ImageResponse[];
}

export interface CommercePublicResponse {
  commerceId: string;
  name: string;
  images: ImageResponse[];
}

//para mantener la estructura de paginacion en las respuestas (backend)
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}