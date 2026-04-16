import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import CheckboxList from "@/shared/components/CheckboxList";

const commerceTypes = [
  { label: "Verdulería", value: "GREENGROCERY" },
  { label: "Restaurante", value: "RESTAURANT" },
  { label: "Panadería", value: "BAKERY" },
  { label: "Supermercado", value: "SUPERMARKET" },
  { label: "Kiosco", value: "KIOSK" },
];

interface CommerceTypesCheckboxesProps<T extends { commerceTypes?: string[] }> {
  control: Control<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
}

export default function CommerceTypesCheckboxes<
  T extends { commerceTypes?: string[] },
>({ control, errors, isRequired = true }: CommerceTypesCheckboxesProps<T>) {
  return (
    <FormControl
      error={!!errors.commerceTypes}
      variant="standard"
      required={isRequired}
    >
      <Controller
        name={"commerceTypes" as any}
        control={control}
        render={({ field }) => (
          <>
            <CheckboxList
              options={commerceTypes}
              selectedValues={field.value || []}
              onChange={(value) => {
                const currentValue = (field.value || []) as string[];
                const newValue = currentValue.includes(value)
                  ? currentValue.filter((v: string) => v !== value)
                  : [...currentValue, value];
                field.onChange(newValue);
              }}
              color="#77A787"
              gridSpacing={1}
            />
            {errors.commerceTypes && (
              <FormHelperText>
                {errors.commerceTypes.message as string}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
}
