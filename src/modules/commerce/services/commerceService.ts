import { httpClient } from "@/shared/lib/httpClient";
import type { Inputs } from "../components/CommerceRegisterForm";
import { Role } from "@/shared/enums/role.enum";

const registerUser = async (data: { email: string; password: string; confirmPassword: string }) => {
  await httpClient.post("/auth/register", {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    role: Role.COMMERCE,                                                 // ← Asegúrate de que este valor exista en tu enum
  });
};

// Paso 2: Crea el perfil del comercio con FormData
const createCommerce = async (data: Inputs) => {
  const formData = new FormData();

  const commerceData = {
    name: data.name,
    description: data.description,
    commerceTypes: data.commerceTypes,
    openingHours: data.openingHours,
    address: data.address,
    locality: data.locality,
    phone: data.phone,
  };

  // El backend espera @RequestPart("commerce") como JSON
  formData.append(
    "commerce",
    new Blob([JSON.stringify(commerceData)], { type: "application/json" })
  );

  // El backend espera @RequestPart("images") como MultipartFile[]
  if (data.profilePhoto) {
    formData.append("images", data.profilePhoto);
  }

  const response = await httpClient.post("/api/v1/commerces", formData);
  return response.data;
};

// Función principal: ejecuta los dos pasos en orden
export const registerCommerce = async (data: Inputs) => {
  // Paso 1: crear usuario
  await registerUser(data);

  // Paso 2: crear perfil del comercio
  return await createCommerce(data);
};