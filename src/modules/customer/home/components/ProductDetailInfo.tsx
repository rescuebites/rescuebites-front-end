import { Box, Stack } from "@mui/material";
import { ProductChips } from "@/shared/components/layout/ProductChips";
import { formatCurrency } from "@/shared/utils/currency.utils";
import CustomTitle from "@/shared/components/CustomTitle";

interface ProductDetailInfoProps {
  name: string;
  description?: string;
  discountedPrice: number;
  originalPrice?: number;
  expirationDate?: string | null;
  stock: number;
  conditions: string[];
  categoryDisplayName?: string;
}

export const ProductDetailInfo = ({
  name,
  description,
  discountedPrice,
  originalPrice,
  expirationDate,
  stock,
  conditions,
  categoryDisplayName,
}: ProductDetailInfoProps) => {
  return (
    <Stack spacing={1.2}>
      <Box>
        <CustomTitle
          text={name}
          fontSize={24}
          variant="h6"
          color="#2D2D2D"
          align="left"
        />

        <Stack direction="row" spacing={2} alignItems="baseline" mb={1.5}>
          <CustomTitle
            text={`$${formatCurrency(discountedPrice)}`}
            fontSize={28}
            variant="h6"
            align="left"
          />

          {originalPrice && (
            <CustomTitle
              text={`$${formatCurrency(originalPrice)}`}
              fontSize={18}
              variant="h6"
              align="left"
              textDecoration="line-through"
              color="#BDBDBD"
              fontStyle="italic"
            />
          )}
        </Stack>

        {description && (
          <CustomTitle
            text={description}
            fontSize={16}
            variant="body1"
            align="left"
            color="#585858"
          />
        )}
      </Box>

      <ProductChips
        expirationDate={expirationDate}
        stock={stock}
        conditions={conditions}
        categoryDisplayName={categoryDisplayName}
        showDiscount={false}
      />
    </Stack>
  );
};
