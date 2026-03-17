import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { TextField, InputAdornment, Typography } from "@mui/material";
import { fieldSx } from "../styles/fieldSx";

type CurrencyTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: boolean;
  helperText?: string;
};

export const CurrencyTextField = <T extends FieldValues>({
  name,
  control,
  error,
  helperText,
}: CurrencyTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <NumericFormat
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        allowNegative={false}
        placeholder="0"
        fullWidth
        size="small"
        sx={fieldSx}
        error={error}
        helperText={helperText}
        value={field.value}
        onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
        onBlur={field.onBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography color="#999" fontSize={14}>$</Typography>
            </InputAdornment>
          ),
        }}
      />
    )}
  />
);