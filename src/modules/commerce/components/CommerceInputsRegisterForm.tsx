import { FieldErrors } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import TextField from "@mui/material/TextField";
import CommerceCheckboxGroup from "./CommerceCheckBoxGroup";

type Props = {
  register: any;
  control: any;
  errors: FieldErrors<Inputs>;
};

export default function CommerceCheckForm({
  errors,
  control,
  register,
}: Props) {
  return (
    <>
      <TextField
        {...register("name", { required: "Ingrese el nombre de su comercio" })}
        id="name"
        label="Nombre"
        type="text"
        fullWidth
        error={!!errors.name} //activa estilo de error si lo hay
        helperText={errors.name?.message} //muestra el mensaje de error si no se completa
      />

      <TextField
        {...register("address", {
          required: "Ingrese la dirección de su comercio",
        })}
        id="address"
        label="Dirección"
        type="text"
        fullWidth
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <TextField
        {...register("locality", { required: "Ingrese su localidad" })}
        id="locality"
        label="Localidad"
        type="text"
        fullWidth
        error={!!errors.locality}
        helperText={errors.locality?.message}
      />
      <TextField
        {...register("phone", {
          required: "Ingrese un número de teléfono",
        })}
        id="phone"
        label="Teléfono"
        type="text"
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        {...register("description")}
        id="description"
        label="Descripción"
        type="text"
        fullWidth
      />

      <TextField
        {...register("openingHours", { required: "Ingrese el horario" })}
        id="openingHours"
        label="Horario"
        type="text"
        fullWidth
        error={!!errors.openingHours}
        helperText={errors.openingHours?.message}
      />

      <CommerceCheckboxGroup control={control} errors={errors} />
    </>
  );
}
