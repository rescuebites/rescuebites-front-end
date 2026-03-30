interface UpdateClientRequestData {
  firstName: string;
  lastName: string;
  birthDate: string; // formato 'YYYY-MM-DD'
  address: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  preferences: string[];
  locality: string;
}

export interface UpdateClientParams {
  clientId: string;
  updateClientRequest: UpdateClientRequestData;
  profilePicture?: File | null;
}
