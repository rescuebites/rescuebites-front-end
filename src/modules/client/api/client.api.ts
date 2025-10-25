import { httpClient } from "@/shared/lib/httpClient";
import { CreateClientParams } from "../interfaces/requests/createClient.interface";

const CLIENT_URL = import.meta.env.VITE_BACKEND_URL;

export const createClient = async (
  params: CreateClientParams
): Promise<void> => {
  const { createClientRequest, profilePicture } = params;
  const formData = new FormData();

  formData.append(
    "client",
    new Blob([JSON.stringify(createClientRequest)], {
      type: "application/json",
    })
  );

  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  console.log("URL final:", `${CLIENT_URL}/api/v1/clients`);
console.log("FormData keys:", [...formData.keys()]);

  const response = await httpClient.post<void>(
    `${CLIENT_URL}/api/v1/clients`,
    formData
  );
  return response.data;
};