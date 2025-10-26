import { EmailRequest } from "@/modules/auth/interfaces/requests/email.interface";
import { ResetPasswordRequest } from "@/modules/users/interfaces/requests/resetPassword.interface";
import { httpClient } from "@/shared/lib/httpClient";

const USER_URL = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

export const sendRecoveryEmail = async (data: EmailRequest): Promise<void> => {
  await httpClient.post<void>(`${USER_URL}/reset-password/email`, data);
};

export const resetPassword = async ({token, newPassword, confirmNewPassword}: ResetPasswordRequest): Promise<void> => {
  await httpClient.post<void>(`${USER_URL}/reset-password`, { token, newPassword, confirmNewPassword });
};

export const resendVerificationEmail = async (email: string): Promise<void> => {
  await httpClient.post<void>(`${USER_URL}/resend-verification-account`, {
    email,
  });
};