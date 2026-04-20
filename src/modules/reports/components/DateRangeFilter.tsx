import { Box, Stack } from "@mui/material";
import { Control } from "react-hook-form";
import CustomTitle from "@/shared/components/CustomTitle";
import CustomButton from "@/shared/components/CustomButton";
import DateField from "@/shared/components/DateField";
import { fieldSx } from "@/shared/styles/fieldSx";

interface DateRangeFormValues {
  from: string;
  to: string;
}

interface DateRangeFilterProps {
  control: Control<DateRangeFormValues>;
  from: string;
  to: string;
  onApply: () => void;
}

export const DateRangeFilter = ({ 
  control, 
  from, 
  to, 
  onApply 
}: DateRangeFilterProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CustomTitle text="Desde" fontSize={14} color="#6B7280" align="left" />
          <DateField control={control} name="from" size="small" sx={fieldSx} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CustomTitle text="Hasta" fontSize={14} color="#6B7280" align="left" />
          <DateField control={control} name="to" size="small" sx={fieldSx} />
        </Box>
      </Box>
      <CustomButton
        text="Aplicar filtro"
        onClick={onApply}
        disabled={!from || !to}
        sx={{ bgcolor: "#77A787", "&:hover": { bgcolor: "#6B9A7B" } }}
      />
    </Stack>
  );
};
