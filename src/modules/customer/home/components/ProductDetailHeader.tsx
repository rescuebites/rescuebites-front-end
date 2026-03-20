import { Box } from "@mui/material";
import { ProductChips } from "@/shared/components/layout/ProductChips";

interface ProductDetailHeaderProps {
  imageUrl?: string;
  discountPercentage: number;
}

export const ProductDetailHeader = ({
  imageUrl,
  discountPercentage,
}: ProductDetailHeaderProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 220,
        backgroundImage: `url(${imageUrl || "/placeholder.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0 0 24px 24px",
      }}
    >
      <ProductChips
        discountPercentage={discountPercentage}
        discountAsImageBadge
        showExpiration={false}
        showStock={false}
        showCondition={false}
      />
    </Box>
  );
};
