import { httpClient } from "@/shared/lib/httpClient";
import { CreateProductParams } from "@/modules/products/interfaces/requests/createProduct.interface";

const PRODUCT_URL = import.meta.env.VITE_BACKEND_URL;

export const createProduct = async ({
  commerceId,
  product,
  images,
}: CreateProductParams): Promise<void> => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(product)], {
      type: "application/json",
    })
  );

  images.forEach((image) => formData.append("images", image));

  await httpClient.post<void>(
    `${PRODUCT_URL}/api/v1/commerce/${commerceId}/products`,
    formData
  );
};
