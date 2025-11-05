//get datos
import { httpClient } from "@/shared/lib/httpClient";

export async function getClientProfile() {
  const response = await httpClient.get("/commerces/register"); // verificar endpoint correcto
  return response.data;
}
