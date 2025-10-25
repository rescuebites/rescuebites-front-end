import { TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface BirthDateFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: string;
}

export default function BirthDateField({ control, name, label = "Fecha de Nacimiento", error }: BirthDateFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          type="date"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          {...field}
          inputProps={{
            placeholder: "dd/mm/aaaa",
            style: { cursor: "text" },
          }}
          sx={{ "& input": { color: field.value ? "black" : "gray" } }}
        />
      )}
    />
  );
}
