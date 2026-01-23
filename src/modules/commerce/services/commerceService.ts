import { httpClient } from "@/shared/lib/httpClient";
import type { Inputs } from "../interfaces/createCommerceInteface";
import type { CommerceResponse } from "../interfaces/commerce.interface";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerCommerce = async (data: Inputs) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, value as any);
    }
  });

  const response = await httpClient.post<CommerceResponse>(
    `${BACKEND_URL}/commerces/register`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

export const getCommerceById = async (id: string): Promise<CommerceResponse> => {
  const response = await httpClient.get<CommerceResponse>(
    `${BACKEND_URL}/commerces/${id}`
  );
  return response.data;
};

export const updateCommerce = async (
  id: string,
  data: Partial<Inputs>
): Promise<CommerceResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Solo agregar campos que no sean undefined
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value as any);
      }
    }
  });

  const response = await httpClient.patch<CommerceResponse>(
    `${BACKEND_URL}/commerces/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};