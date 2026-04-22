import CommerceOrdersListCard from "../components/CommerceOrdersListCard";
import OrderStatusFilter from "../components/OrderStatusFilter";
import { useOrderFilters } from "../hooks/useOrderFilters";
import { useCommerceOrders } from "../hooks/useCommerceOrders";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { Box, CircularProgress, Typography } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";

const ListCommerceOrdersPage = () => {
  const commerceId = useAuthStore((state) => state.commerceId);
  const { data, isLoading, isError } = useCommerceOrders(commerceId);
  const orders = data?.content ?? [];
  const { activeStatus, setActiveStatus, filteredOrders } = useOrderFilters(orders);

  return (
    <Box mt={2} sx={{ px: { xs: 2, sm: 4, md: 8 }, mx: "auto" }}>
      <Box mb={3}>
        <BackButton />
      </Box>
      <Box mt={4}>
        <OrderStatusFilter value={activeStatus} onChange={setActiveStatus} />
      </Box>
      <Box mt={2}>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Typography color="error" textAlign="center" mt={4}>
            Error al cargar los pedidos.
          </Typography>
        )}
        {!isLoading && !isError && <CommerceOrdersListCard orders={filteredOrders} />}
      </Box>
    </Box>
  );
};

export default ListCommerceOrdersPage;
