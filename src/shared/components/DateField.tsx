import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DateFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
  minDate?: string;
  maxDate?: string;
  size?: "small" | "medium";
  sx?: object;
}

export default function DateField<T extends FieldValues = FieldValues>({ control, name, label, error, minDate, maxDate, size, sx }: DateFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          size={size}
          error={!!error}
          helperText={error}
          {...field}
          inputProps={{
            min: minDate,
            max: maxDate,
            placeholder: "dd/mm/aaaa",
            style: { cursor: "text" },
          }}
          sx={{ 
            "& input": { color: field.value ? "black" : "gray" }, 
            ...sx 
          }}
        />
      )}
    />
  );
}