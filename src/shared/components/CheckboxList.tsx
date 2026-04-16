import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CustomTitle from "@/shared/components/CustomTitle";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxListProps {
  title?: string;
  titleVariant?: "h6" | "body2";
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  color?: string;
  gridSpacing?: number;
}

/**
 * Componente reutilizable para mostrar una lista de checkboxes con estilo consistente.
 * Puede usarse de forma independiente o integrado con react-hook-form.
 */
export default function CheckboxList({
  title,
  titleVariant = "h6",
  options,
  selectedValues,
  onChange,
  color = "#77A787",
  gridSpacing = 1,
}: CheckboxListProps) {
  return (
    <Box>
      {title && (
        <CustomTitle variant={titleVariant} align="left" text={title} />
      )}
      <Grid container spacing={gridSpacing}>
        {options.map((option) => (
          <Grid size={{ xs: 12, md: 6 }} key={option.value}>
            <FormControlLabel
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  checked={selectedValues.includes(option.value)}
                  onChange={() => onChange(option.value)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  sx={{
                    color: color,
                    "&.Mui-checked": { color: color },
                  }}
                />
              }
              label={option.label}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
