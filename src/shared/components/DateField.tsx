import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface DateFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: string;
  minDate?: string;
  size?: "small" | "medium";
  sx?: object;
}

export default function DateField({ control, name, label, error, minDate, size, sx }: DateFieldProps) {
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