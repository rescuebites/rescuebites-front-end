import { Box, Typography, Stack, Divider } from "@mui/material";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { formatCurrency } from "@/shared/utils/currency.utils";

interface ProductDetailInfoProps {
  name: string;
  description?: string;
  discountedPrice: number;
  originalPrice?: number;
  expirationDate?: string | null;
  stock: number;
  condition: string;
  conditionDisplayName: string;
  categoryDisplayName?: string;
}

export const ProductDetailInfo = ({
  name,
  description,
  discountedPrice,
  originalPrice,
  expirationDate,
  stock,
  condition,
  conditionDisplayName,
  categoryDisplayName,
}: ProductDetailInfoProps) => {
  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2D2D2D",
            mb: 1,
            fontSize: 24,
          }}
        >
          {name}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="baseline" mb={1.5}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#5FB574",
              fontSize: 32,
            }}
          >
            {formatCurrency(discountedPrice)}
          </Typography>

          {originalPrice && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#BDBDBD",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              ${formatCurrency(originalPrice)}
            </Typography>
          )}
        </Stack>

        {description && (
          <Typography
            sx={{
              color: "#666666",
              lineHeight: 1.6,
              fontSize: 15,
              mb: 1,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      <ProductChips
        expirationDate={expirationDate}
        stock={stock}
        condition={condition}
        conditionDisplayName={conditionDisplayName}
        categoryDisplayName={categoryDisplayName}
        showDiscount={false}
      />

      <Divider sx={{ my: 1 }} />
    </Stack>
  );
};
