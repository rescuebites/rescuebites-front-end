import { BusinessHoursRequest } from "./business-hours.request";

export interface UpdateCommerceRequest {
  name?: string;
  description?: string;
  commerceTypes?: string[];
  businessHours?: BusinessHoursRequest[];
  address?: string;
  locality?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UpdateCommerceParams {
  commerceId: string;
  updateCommerceRequest: UpdateCommerceRequest;
  images?: File[];
}
