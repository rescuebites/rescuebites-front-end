import OrderList from "../components/OrdersListCard";
import OrderStatusFilter from "../components/OrderStatusFilter";
import { useOrderFilters } from "../hooks/useOrderFilters";
import { useClientOrders } from "../hooks/useClientOrders";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { Box, CircularProgress, Typography } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";

const ListClientOrdersPage = () => {
  const clientId = useAuthStore((state) => state.clientId);
  const { data, isLoading, isError } = useClientOrders(clientId);
  const orders = data?.content ?? [];
  const { activeStatus, setActiveStatus, filteredOrders } = useOrderFilters(orders);

  return (
    <Box mt={2} sx={{ px: { xs: 2, sm: 4, md: 8 }, mx: "auto" }}>
      <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ position: "absolute", left: { xs: 2, sm: 10 }, display: "flex", alignItems: "center" }}>
          <BackButton />
        </Box>
        <Box sx={{ mt: { xs: 1, sm: 2 } }}>
          <CustomTitle text="Mis Pedidos" variant="h4" color="#2d2d2d" align="center" />
        </Box>
      </Box>
      <Box mt={2}>
        <OrderStatusFilter value={activeStatus} onChange={setActiveStatus} />
      </Box>
      <Box mt={2}>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Typography color="error" textAlign="center" mt={4} fontSize={{ xs: 15, sm: 16 }}>
            Error al cargar los pedidos.
          </Typography>
        )}
        {!isLoading && !isError && <OrderList orders={filteredOrders} />}
      </Box>
    </Box>
  );
};

export default ListClientOrdersPage;