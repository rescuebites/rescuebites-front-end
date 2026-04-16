import { ImageResponse } from "@/shared/interfaces/image-response.interface";
import { CommerceType } from "@/modules/commerce/enums/commerce-type.enum";
import { BusinessHoursResponse } from "./business-hours.response";

export interface CommerceResponse {
  name: string;
  description: string;
  commerceTypes: CommerceType[];
  businessHours: BusinessHoursResponse[];
  address: string;
  locality: string;
  phone: string;
  email: string;
  images: ImageResponse[];
}
