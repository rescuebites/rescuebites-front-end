import { Stack, Box } from "@mui/material";
import CustomTitle from "@/shared/components/CustomTitle";

interface ProductLegendItemProps {
  name: string;
  unitsSold: number;
  revenue: number;
  percentage: number;
  fill: string;
}

export const ProductLegendItem = ({
  name,
  unitsSold,
  revenue,
  percentage,
  fill,
}: ProductLegendItemProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1 }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: `${fill}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: fill,
            }}
          />
        </Box>
        <Box>
          <CustomTitle
            text={name}
            fontSize={20}
            color="#1F2937"
            variant="body1"
            align="left"
          />
          <CustomTitle
            text={`${unitsSold} Unidades Vendidas`}
            fontSize={17}
            color="#6B7280"
            variant="body2"
            align="left"
          />
        </Box>
      </Stack>
      <Box textAlign="right">
        <CustomTitle
          text={`$${revenue.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`}
          fontSize={20}
          align="right"
          variant="body1"
        />
        <CustomTitle
          text={`${percentage.toFixed(1)}%`}
          fontSize={17}
          color={fill}
          align="right"
          variant="body2"
        />
      </Box>
    </Stack>
  );
};
