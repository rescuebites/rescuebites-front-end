export interface ImageResponse {
  imageId: string;
  url: string;
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
  conditionDisplayName: string;
  expirationDate: string | null;
  images: ImageResponse[];
  active: boolean;
  preferences: string[] | null;  
}


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