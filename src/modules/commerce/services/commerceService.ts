import { httpClient } from "@/shared/lib/httpClient";
import type { Inputs } from "../components/CommerceRegisterForm";

export const registerCommerce = async (data: Inputs) => {
  //recibe datos del formulario (data) y los envía al back
  const formData = new FormData(); //creación de instancia de formData para luego enviar los datos

  Object.entries(data).forEach(([key, value]) => {
    //convierte los datos del objeto data en pares valor/clave para que el back los reciba correctamente
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, value as any);
    }
  });

  const response = await httpClient.post("/commerces/register", formData, {
    //envía petición HTTP POST al endpoint /commerces/register.
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
