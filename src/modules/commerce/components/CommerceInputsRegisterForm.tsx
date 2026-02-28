import { Controller, FieldErrors } from "react-hook-form";
import type { Inputs } from "@/modules/commerce/interfaces/createCommerce.interface";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type Props = {
  register: any;
  control: any;
  errors: FieldErrors<Inputs>;
};

const commerceTypes = [
  { label: "Verdulería", value: "GREENGROCERY" },
  { label: "Restaurante", value: "RESTAURANT" },
  { label: "Panadería", value: "BAKERY" },
  { label: "Supermercado", value: "SUPERMARKET" },
  { label: "Kiosco", value: "KIOSK" },
];

export  default function CommerceInputsRegisterForm({
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
          required: "Ingrese la dirección de su comercio", message: "Este campo es obligatorio"
        })}
        id="address"
        label="Dirección"
        type="text"
        fullWidth
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <TextField
        {...register("locality", { required: "Ingrese su localidad", message: "Este campo es obligatorio" })}
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
          pattern: {
            value: /^\+54(9)?[0-9]{10}$/,
            message: "Formato inválido. Ejemplo: +5493512345678",
          },
        })}
        id="phone"
        label="Teléfono"
        placeholder="+5493512345678"
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
        {...register("openingHours", { required: "Ingrese el horario" , message: "Este campo es obligatorio"})}
        id="openingHours"
        label="Horario"
        type="text"
        fullWidth
        error={!!errors.openingHours}
        helperText={errors.openingHours?.message}
      />

      {/* //checkbox para tipos de comercio ----- */}

      <FormControl error={!!errors.commerceTypes} variant="standard">
      <CustomTitle variant="h6" align="left" text="Preferencias alimenticias" />

      <Controller //conecta los checkboxes con react-hook-form, para controlar su valor y validación.
        name="commerceTypes"
        control={control}
        rules={{
          validate: (value) =>
            value.length > 0 || "Seleccioná al menos un rubro",
        }}
        render={({ field }) => (
          <>
            <Grid container spacing={1} alignItems="flex-start">
              {commerceTypes.map((option) => (
                <Grid sx={{ xs: 12, md: 6 }} key={option.value}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    key={option.value}
                    control={
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={field.value?.includes(option.value) || false} //determina si se selecciona un check
                        onChange={(e) => {
                          //se actualiza el array de opciones al marcar o desmarcar los check
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...(field.value || []), option.value]
                            : field.value.filter((v: string) => v !== option.value);
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label={option.label}
                  />
                </Grid>
              ))}
            </Grid>
            {errors.commerceTypes && (
              <FormHelperText>{errors.commerceTypes.message}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>

    </>
  );
}


