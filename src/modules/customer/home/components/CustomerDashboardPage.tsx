import { Box } from "@mui/material";
import SectionHeader from "./SectionHeader";
import StatisticsChartCard from "./StatisticsChartCard";
import ProductsSection from "./ProductsSection";
import type { ProductResponse } from "../interfaces/responses";

const mockProducts: ProductResponse[] = [
  {
    id: 1,
    name: "Origen Café",
    discountedPrice: 25,
    originalPrice: 50,
    discountPercentage: 50,
    expirationDate: "2026-01-22",
    productImages: [{ url: "/coffee.jpg" }],
    stock: 6
  },
  {
    id: 2,
    name: "Medialuna",
    discountedPrice: 12,
    originalPrice: 30,
    discountPercentage: 40,
    expirationDate: "2026-01-21",
    productImages: [{ url: "/croissant.jpg" }],
    stock: 2
  }
] as any;

export default function CustomerDashboardPage() {
  return (
    <Box
      sx={{
        px: 2.5,
        pb: 12,
        maxWidth: 600,
        mx: "auto"
      }}
    >
      {/* Statistics */}
      <SectionHeader title="Statistics" />
      
      {/* Products */}
      <SectionHeader title="Products" />

      <ProductsSection products={mockProducts} />
    </Box>
  );
}