interface CreateClientRequest {
  firstName: string;
  lastName: string;
  birthDate: string; // formato 'YYYY-MM-DD'
  address: string;
  userId: string;
  preferences: string[];
}

export interface CreateClientParams {
  createClientRequest: CreateClientRequest;
  profilePicture?: File | string;
}
