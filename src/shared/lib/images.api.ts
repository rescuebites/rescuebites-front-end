import { httpClient } from "./httpClient";

export const deleteImage = async (imageId: string): Promise<void> => {
  await httpClient.delete(`/api/v1/images/${imageId}`);
};
