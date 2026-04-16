import { ImageResponse } from "@/shared/interfaces/image-response.interface";

export interface CommercePublicResponse {
  commerceId: string;
  name: string;
  images: ImageResponse[];
}
