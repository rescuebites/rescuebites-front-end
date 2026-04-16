import { BusinessHoursRequest } from "./business-hours.request";

export interface CreateCommerceRequest {
  userId: string;
  name?: string;
  description?: string;
  commerceTypes: string[];
  businessHours: BusinessHoursRequest[];
  address: string;
  locality: string;
  phone: string;
}

export interface CreateCommerceParams {
  createCommerceRequest: CreateCommerceRequest;
  profilePictures?: File[];
}