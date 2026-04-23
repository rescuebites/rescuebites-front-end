import { Box } from "@mui/material";
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
  onApply,
}: DateRangeFilterProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr auto" },
          gap: 2,
          alignItems: "center",
          justifyItems: { sm: "center", xs: "stretch" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 320,
          }}
        >
          <CustomTitle
            text="Desde"
            fontSize={14}
            color="#6B7280"
            align="center"
          />
          <DateField
            control={control}
            name="from"
            size="small"
            sx={{ ...fieldSx, margin: "0 auto" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 320,
          }}
        >
          <CustomTitle
            text="Hasta"
            fontSize={14}
            color="#6B7280"
            align="center"
          />
          <DateField
            control={control}
            name="to"
            size="small"
            sx={{ ...fieldSx, margin: "0 auto" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
          }}
        >
          <CustomButton
            text="Aplicar filtro"
            onClick={onApply}
            disabled={!from || !to}
            sx={{
              bgcolor: "#77A787",
              "&:hover": { bgcolor: "#6B9A7B" },
              whiteSpace: "nowrap",
              width: "auto",
              px: 3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
