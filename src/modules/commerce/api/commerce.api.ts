//funciones para realizar peticiones HTTP relacionadas con comercios
import { httpClient } from "@/shared/lib/httpClient";
import { CreateCommerceParams } from "../interfaces/createCommerce.interface";

export const createCommerce = async (
  params: CreateCommerceParams
): Promise<void> => {
  const { createCommerceRequest, profilePicture } = params;
  const formData = new FormData();

  // El backend espera @RequestPart("commerce") como JSON
  formData.append(
    "commerce",
    new Blob([JSON.stringify(createCommerceRequest)], {
      type: "application/json",
    })
  );

  // El backend espera @RequestPart("images") como MultipartFile[]
  if (profilePicture) {
    formData.append("images", profilePicture);
  }

  await httpClient.post<void>("/api/v1/commerces", formData);
};