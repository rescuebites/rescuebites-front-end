//rellenar datos back
import { getCommerceProfile } from "../services/updateCommerce";
import { useForm } from "react-hook-form";
import type { Inputs } from "../interfaces/createCommerceInteface";

export const fillUpFields = async () => {
  const { setValue } = useForm<Inputs>();

  try {
    const clientData = await getCommerceProfile();

    setValue("email", clientData.email);
    setValue("password", clientData.password);
    setValue("name", clientData.name);
    setValue("description", clientData.description);
    setValue("commerceTypes", clientData.commerceTypes);
    setValue("schedule", clientData.schedule);
    setValue("address", clientData.address);
    setValue("city", clientData.city);
    setValue("profilePhoto", clientData.profilePhoto);
    setValue("phoneNumber", clientData.phoneNumber);
  } catch (error) {
    console.error("Error al obtener datos del cliente", error);
  }
};
