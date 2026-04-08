import { CommerceResponse } from "@/modules/commerce/interfaces/responses/commerce.response";
import { ImageResponse } from "@/shared/interfaces/image-response.interface";

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
  conditions: string[];
  expirationDate: string | null;
  productImages: ImageResponse[];
  active: boolean;
  preferences: string[] | null;
}
