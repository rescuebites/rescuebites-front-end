export interface CommerceResponse {
  id: string;
  email: string;
  password: string;
  name: string;
  description?: string;
  commerceTypes: string[];
  schedule: string;
  address: string;
  city: string;
  profilePhoto?: string;
  phoneNumber: number;
  createdAt?: string;
  updatedAt?: string;
}