import { httpClient } from "@/shared/lib/httpClient";
import { CreateProductRequest } from "../interfaces/requests/product.form.interface";

const PRODUCT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

export const createProduct = async (
  commerceId: string,
  data: CreateProductRequest,
  images: File[]
) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('product', jsonBlob);
  images.forEach((file) => formData.append('images', file));
  
  const response = await httpClient.post(
    `${PRODUCT_URL}/commerces/${commerceId}/products`,
    formData,
  );
  return response.data;
};