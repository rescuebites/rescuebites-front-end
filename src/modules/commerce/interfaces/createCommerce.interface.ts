export interface CreateCommerceRequest {
  userId: string;
  name: string;
  description?: string;
  commerceTypes: string[];
  openingHours: string;
  address: string;
  locality: string;
  phone: string;
}

export interface CreateCommerceParams {
  createCommerceRequest: CreateCommerceRequest;
  profilePicture?: File;
}