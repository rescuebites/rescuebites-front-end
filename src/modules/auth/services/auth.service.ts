import { httpClient } from "@/shared/lib/httpClient";
import { LoginRequest } from "../interfaces/requests/login.interface";
import { AuthResponse } from "../interfaces/responses/auth.interface";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await httpClient.post<AuthResponse>(`${BACKEND_URL}/auth/login`, data);
  return response.data;
};