import { httpClient } from "@/shared/lib/httpClient";
import { CreateProductRequest } from "../interfaces/requests/product.form.interface";
import { UpdateProductRequest } from "../interfaces/requests/update-product-request.interface";
import { ProductResponse } from "../interfaces/responses/product-response.interface";
import { PaginatedResponse } from "@/modules/customer/home/interfaces/responses/paginated.response";

const getProductUrl = (commerceId: string) =>
  `/api/v1/commerces/${commerceId}/products`;

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
    getProductUrl(commerceId),
    formData,
  );
  return response.data;
};

export const updateProduct = async (
  commerceId: string,
  productId: string,
  data: UpdateProductRequest,
  images: File[]
) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('product', jsonBlob);
  images.forEach((file) => formData.append('images', file));
  
  const response = await httpClient.patch(
    `${getProductUrl(commerceId)}/${productId}`,
    formData,
  );
  return response.data;
};

export const getProductById = async (commerceId: string, productId: string): Promise<ProductResponse> => {
  const response = await httpClient.get<ProductResponse>(
    `${getProductUrl(commerceId)}/${productId}`
  );
  return response.data;
};

export const deleteProductImage = async (
  _commerceId: string,
  _productId: string,
  imageId: string
): Promise<void> => {
  // Se importa dinámicamente para evitar dependencia circular
  const { deleteImage } = await import("@/shared/lib/images.api");
  await deleteImage(imageId);
};

export const getProductsByStock = async (
  commerceId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<ProductResponse>> => {
  const response = await httpClient.get<PaginatedResponse<ProductResponse>>(
    `${getProductUrl(commerceId)}/ordered-by-stock`,
    { params: { page, size } }
  );
  return response.data;
};