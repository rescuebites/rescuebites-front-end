import { httpClient } from "@/shared/lib/httpClient";
import { LoginRequest } from "../interfaces/requests/login.interface";
import { AuthResponse } from "../interfaces/responses/auth.interface";
import { RegisterRequest } from "../interfaces/requests/register.interface";
import { VerifyAccountRequest } from "../interfaces/requests/verify-account.interface";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const verifyAccount = async (params: VerifyAccountRequest) => {
  const { userId, token } = params;

  await httpClient.post<void>(`${BACKEND_URL}/api/users/${userId}/verify-account`, {
    token,
  });
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await httpClient.post<AuthResponse>(`${BACKEND_URL}/auth/login`, data);
  return response.data;
};

export async function registerUser(params: RegisterRequest) {
  await httpClient.post(`${BACKEND_URL}/auth/register`, params);
}
