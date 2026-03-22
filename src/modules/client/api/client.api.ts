import { httpClient } from "@/shared/lib/httpClient";
import { CreateClientParams } from "../interfaces/requests/createClient.interface";
import { UpdateClientParams } from "../interfaces/requests/updateClient.interface";
import { ClientResponse } from "../interfaces/responses/client.response";

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

export const getClientById = async (clientId: string): Promise<ClientResponse> => {
  const response = await httpClient.get<ClientResponse>(
    `${CLIENT_URL}/api/v1/clients/${clientId}`
  );
  return response.data;
};

export const updateClient = async (
  params: UpdateClientParams
): Promise<ClientResponse> => {
  const { clientId, updateClientRequest, profilePicture } = params;
  const formData = new FormData();

  formData.append(
    "client",
    new Blob([JSON.stringify(updateClientRequest)], {
      type: "application/json",
    })
  );

  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  const response = await httpClient.patch<ClientResponse>(
    `${CLIENT_URL}/api/v1/clients/${clientId}`,
    formData
  );
  return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  const response = await httpClient.delete<void>(
    `${CLIENT_URL}/api/v1/clients/${clientId}`
  );
  return response.data;
};