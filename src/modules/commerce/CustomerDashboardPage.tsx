import { Box, Typography } from "@mui/material";
import ProductsSection from "./ProductsSection";
import type { ProductResponse } from "../customer/home/interfaces/responses";
import StatisticsCard from "./StatisticsCard";
import OrdersSection from "./OrdersSection";
import QuickActions from "./QuickActions";
import SearchBar from "@/shared/components/layout/SearchBar";
import CollapsibleSection from "./CollapsibleSection";

const mockProducts: ProductResponse[] = [
  {
    id: 1,
    name: "Origen Café",
    discountedPrice: 25,
    originalPrice: 50,
    discountPercentage: 50,
    expirationDate: "2026-01-22",
    productImages: [{ url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" }],
    stock: 6,
  },
  {
    id: 2,
    name: "Medialuna",
    discountedPrice: 12,
    originalPrice: 30,
    discountPercentage: 40,
    expirationDate: "2026-01-21",
    productImages: [{ url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b" }],
    stock: 2,
  },
] as any;

export default function CustomerDashboardPage() {
  return (
    <>
      <Box
        sx={{
          px: 2.5,
          pt: 1,
          pb: 1,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        {/* Search */}
        <SearchBar onSearchChange={() => {}} />

        {/* Quick actions */}
        <Box mt={3}>
          <Typography fontWeight={700} fontSize={20} mb={2}>
            Quick Actions
          </Typography>

          <QuickActions />
        </Box>
      </Box>
      <Box
        sx={{
          px: 2.5,
          pb: 12,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <CollapsibleSection title="Orders">
          <OrdersSection />
        </CollapsibleSection>

        <CollapsibleSection title="Statistics">
          <StatisticsCard />
        </CollapsibleSection>

        <CollapsibleSection title="Products">
          <ProductsSection products={mockProducts} />
        </CollapsibleSection>
      </Box>
    </>
  );
}
