//get datos
import { httpClient } from "@/shared/lib/httpClient";

export async function getCommerceProfile() {
  const response = await httpClient.get("/commerces/register"); // verificar endpoint correcto
  return response.data;
}
