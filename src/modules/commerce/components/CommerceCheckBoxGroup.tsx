import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type Props = {
  control: any;
  errors: any;
};

const commerceTypes = [
  "verduleria",
  "restaurante",
  "panaderia",
  "supermercado",
  "kiosco",
];

export default function CommerceCheckboxGroup({ control, errors }: Props) {
  return (
    <FormControl error={!!errors.commerceTypes} variant="standard">
      <FormLabel component="legend">Tipo de comercio</FormLabel>

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
                <Grid sx={{ xs: 6 }} key={option}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    key={option}
                    control={
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={field.value?.includes(option) || false} //determina si se selecciona un check
                        onChange={(e) => {
                          //se actualiza el array de opciones al marcar o desmarcar los check
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...(field.value || []), option]
                            : field.value.filter((v: string) => v !== option);
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
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
  );
}
