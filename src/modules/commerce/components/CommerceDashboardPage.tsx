import { Box, Typography } from "@mui/material";
import SearchBar from "@/shared/components/layout/SearchBar";
import ProductsSection from "./ProductsSection";
import OrdersSection from "./OrdersSection";
import QuickActions from "./QuickActions";
import CollapsibleSection from "./CollapsibleSection";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import {
  useCommerceOrders,
  useCommerceProductsByStock,
} from "../hooks/useCommerceData";
import LoadingState from "@/shared/components/LoadingState";

export default function CustomerDashboardPage() {
  const commerceId = useAuthStore((state) => state.commerceId);
  const { data: ordersData, isLoading: ordersLoading } =
    useCommerceOrders(commerceId);
  const { data: productsData, isLoading: productsLoading } =
    useCommerceProductsByStock(commerceId);

  if (!commerceId) {
    return (
      <Box sx={{ px: 2.5, pt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          No se encontró información del comercio. Por favor, inicia sesión como
          comercio.
        </Typography>
      </Box>
    );
  }

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
        <SearchBar onSearchChange={() => {}} />

        <QuickActions />
      </Box>
      <Box
        sx={{
          px: 2.5,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <CollapsibleSection title="Pedidos">
          {ordersLoading ? (
            <LoadingState />
          ) : (
            <OrdersSection orders={ordersData?.content || []} />
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Productos">
          {productsLoading ? (
            <LoadingState />
          ) : (
            <ProductsSection products={productsData?.content || []} />
          )}
        </CollapsibleSection>
      </Box>
    </>
  );
}
