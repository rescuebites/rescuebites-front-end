import { Box } from "@mui/material";
import SearchBar from "@/shared/components/layout/SearchBar";
import ProductsSection from "../components/ProductsSection";
import OrdersSection from "../components/OrdersSection";
import QuickActions from "../components/QuickActions";
import CollapsibleSection from "../components/CollapsibleSection";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import {
  useCommerceOrders,
  useCommerceProductsByStock,
} from "../hooks/useCommerceData";
import LoadingState from "@/shared/components/LoadingState";
import CustomTitle from "@/shared/components/CustomTitle";

export default function CustomerDashboardPage() {
  const commerceId = useAuthStore((state) => state.commerceId);
  const { data: ordersData, isLoading: ordersLoading } =
    useCommerceOrders(commerceId);
  const { data: productsData, isLoading: productsLoading } =
    useCommerceProductsByStock(commerceId);

  if (!commerceId) {
    return (
      <CustomTitle
        text="No se encontró información del comercio. Por favor, inicia sesión como
          comercio."
        variant="h6"
        align="center"
        color="error"
      />
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
