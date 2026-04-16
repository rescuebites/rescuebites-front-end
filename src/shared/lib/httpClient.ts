import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/interfaces/error-response.interface.ts";
import { EXCLUDED_BEARER_ROUTES } from "@/shared/lib/constants.ts";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore.ts";
import { useSnackbarStore } from "@/shared/hooks/useSnackbarStore.ts";
import { isTokenExpired } from "@/shared/utils/jwt.utils.ts";


export const httpClient = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const data = error.response?.data;
    const errorMessage =
      data?.message ??
      data?.error ??
      (error.response?.status === 403 || error.response?.status === 401
        ? "No estás autorizado para acceder a este recurso."
        : "Ocurrió un error inesperado.");

    // Mostrar mensaje con snackbar
    useSnackbarStore.getState().showMessage(errorMessage, "error");

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use((config) => {
  const { authResponse } = useAuthStore.getState();
  if (!authResponse) return config;

  const { token } = authResponse;

  if (isTokenExpired(token)) {
    useAuthStore.getState().logout();
    useSnackbarStore.getState().showMessage("Tu sesión ha expirado. Por favor, iniciá sesión nuevamente.", "warning");
    return Promise.reject(new axios.Cancel("Token expirado"));
  }

  const shouldExclude = EXCLUDED_BEARER_ROUTES.some((path) => {
    const urlWithoutBase = config.url?.split('?')[0]; // Remover query params
    return urlWithoutBase === path || urlWithoutBase === `${path}/`;
  });

  if (!shouldExclude && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});