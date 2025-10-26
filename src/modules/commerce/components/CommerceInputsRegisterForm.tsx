import { FieldErrors } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/components/CommerceRegisterForm";
import TextField from "@mui/material/TextField";
import CommerceCheckboxGroup from "./CommerceCheckBoxGroup";
import ImageUpload from "./ImageUpload";

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
        {...register("city", { required: "Ingrese su localidad" })}
        id="city"
        label="Localidad"
        type="text"
        fullWidth
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        {...register("phoneNumber", {
          required: "Ingrese un número de teléfono",
        })}
        id="phoneNumber"
        label="Teléfono"
        type="number"
        fullWidth
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      <TextField
        {...register("description")}
        id="description"
        label="Descripción"
        type="text"
        fullWidth
      />

      <TextField
        {...register("schedule", { required: "Ingrese el horario" })}
        id="schedule"
        label="Horario"
        type="text"
        fullWidth
        error={!!errors.schedule}
        helperText={errors.schedule?.message}
      />

      <CommerceCheckboxGroup control={control} errors={errors} />
    </>
  );
}
