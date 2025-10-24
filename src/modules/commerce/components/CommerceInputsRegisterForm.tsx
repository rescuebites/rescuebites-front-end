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
        {...register("name", { required: true })}
        id="name"
        label="Nombre"
        type="text"
        fullWidth
      />

      <TextField
        {...register("address", { required: true })}
        id="address"
        label="Dirección"
        type="text"
        fullWidth
      />
      <TextField
        {...register("city", { required: true })}
        id="city"
        label="Localidad"
        type="text"
        fullWidth
      />
      <TextField
        {...register("phoneNumber", { required: true })}
        id="phoneNumber"
        label="Teléfono"
        type="number"
        fullWidth
      />

      <TextField
        {...register("description")}
        id="description"
        label="Descripción"
        type="text"
        fullWidth
      />

      <TextField
        {...register("schedule", { required: true })}
        id="schedule"
        label="Horario"
        type="text"
        fullWidth
      />

      <CommerceCheckboxGroup control={control} errors={errors} />

      <ImageUpload register={register} error={errors?.profilePhoto?.message} />
    </>
  );
}
