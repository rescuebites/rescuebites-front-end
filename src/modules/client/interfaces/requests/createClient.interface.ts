interface CreateClientRequest {
  firstName: string;
  lastName: string;
  birthDate: string; // formato 'YYYY-MM-DD'
  address: string;
  phone: string;
  userId: string;
  preferences: string[];
  locality: string;
}

export interface CreateClientParams {
  createClientRequest: CreateClientRequest;
  profilePicture?: File | string;
}
