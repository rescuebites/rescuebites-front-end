import { CommerceResponse } from "@/modules/customer/home/interfaces/responses";

export interface ImageResponse {
  imageId: string;
  url: string;
  publicId: string | null;
}

export interface ProductResponse {
  productId: string;
  commerce: CommerceResponse;
  commerceId: string;
  commerceName: string;
  commerceImages: ImageResponse[];  
  commerceOpeningHours: string;
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  category: string;
  categoryDisplayName: string;
  condition: string;
  conditionDisplayName: string;
  expirationDate: string | null;
  productImages: ImageResponse[];
  active: boolean;
  preferences: string[] | null;  
}