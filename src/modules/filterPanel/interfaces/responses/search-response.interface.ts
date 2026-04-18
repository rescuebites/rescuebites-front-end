import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { Page } from "@/shared/interfaces/page.interface";
import { SuggestionType } from "../enums/suggestion-type.enum";

export interface SearchSuggestion {
  id: string;
  label: string;
  type: SuggestionType;
}

export interface SearchCommerceResponse {
  commerceId: string;
  name: string;
  address: string;
  locality: string;
  commerceType: string;
  images: ImageResponse[];
}

export interface SearchProductResponse {
  productId: string;
  commerceId: string;
  commerceName: string;
  commerceBusinessHours: { day: string; openTime: string; closeTime: string }[];
  name: string;
  description: string;
  stock: number;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  category: string;
  conditions: string[];
  conditionDisplayNames: string[];
  expirationDate: string | null;
  productImages: ImageResponse[];
  active: boolean;
  preferences: string[];
}

export interface SearchResultResponse {
  commerces: Page<SearchCommerceResponse>;
  products: Page<SearchProductResponse>;
}
