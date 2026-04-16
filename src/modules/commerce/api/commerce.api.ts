//funciones para realizar peticiones HTTP relacionadas con comercios
import { httpClient } from "@/shared/lib/httpClient";
import { CreateCommerceParams } from "../interfaces/requests/create-commerce.interface";
import { UpdateCommerceParams } from "../interfaces/requests/update-commerce.interface";
import { Page } from "@/modules/catalog/interfaces/types";
import { OrderSummaryForCommerceResponse } from "@/modules/orders/interfaces/responses/order-summary-commerce-response.interface";
import { ProductResponse } from "@/modules/products/interfaces/responses/product-response.interface";
import { ProductExpirationFilter } from "@/modules/products/enums/product-expiration-filter.enum";

export const createCommerce = async (
  params: CreateCommerceParams
): Promise<void> => {
  const { createCommerceRequest } = params;
  const formData = new FormData();

  formData.append(
    "commerce",
    new Blob([JSON.stringify(createCommerceRequest)], {
      type: "application/json",
    })
  );

  (params.profilePictures ?? []).forEach((img) => formData.append("images", img));
  await httpClient.post<void>("/api/v1/commerces", formData);
};

export const updateCommerce = async (
  params: UpdateCommerceParams
): Promise<void> => {
  const { commerceId, updateCommerceRequest, images } = params;
  const formData = new FormData();

  formData.append(
    "commerce",
    new Blob([JSON.stringify(updateCommerceRequest)], {
      type: "application/json",
    })
  );

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  await httpClient.patch<void>(`/api/v1/commerces/${commerceId}`, formData);
};

export const getCommerceOrders = async (
  commerceId: string
): Promise<Page<OrderSummaryForCommerceResponse>> => {
  const { data } = await httpClient.get<Page<OrderSummaryForCommerceResponse>>(
    `/api/v1/commerces/${commerceId}/orders`
  );
  return data;
};

export const getCommerceProductsByStock = async (
  commerceId: string
): Promise<Page<ProductResponse>> => {
  const { data } = await httpClient.get<Page<ProductResponse>>(
    `/api/v1/commerces/${commerceId}/products/ordered-by-stock`
  );
  return data;
};

export const getCommerceProductsByExpiration = async (
  commerceId: string,
  filter: ProductExpirationFilter
): Promise<Page<ProductResponse>> => {
  const { data } = await httpClient.get<Page<ProductResponse>>(
    `/api/v1/commerces/${commerceId}/products/expiration`,
    {
      params: { filter },
    }
  );
  return data;
};

export const deleteCommerceImage = async (
  _commerceId: string,
  imageId: string
): Promise<void> => {
  // Se importa dinámicamente para evitar dependencia circular
  const { deleteImage } = await import("@/shared/lib/images.api");
  await deleteImage(imageId);
};