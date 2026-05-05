import CommerceOrdersListCard from "../components/CommerceOrdersListCard";
import OrderStatusFilter from "../components/OrderStatusFilter";
import { useOrderFilters } from "../hooks/useOrderFilters";
import { useInfiniteCommerceOrders } from "../hooks/useCommerceOrders";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import BackButton from "@/shared/components/ui/BackButton";
import CustomTitle from "@/shared/components/CustomTitle";

const ListCommerceOrdersPage = () => {
  const commerceId = useAuthStore((state) => state.commerceId);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCommerceOrders(commerceId);
  const orders = data?.pages.flatMap((p) => p.content) ?? [];
  const { activeStatus, setActiveStatus, filteredOrders } =
    useOrderFilters(orders);

  return (
    <Box mt={2} sx={{ px: { xs: 2, sm: 4, md: 8 }, mx: "auto" }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: { xs: 2, sm: 10 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <BackButton />
        </Box>
        <Box sx={{ mt: { xs: 1, sm: 2 }, textAlign: "center" }}>
          <CustomTitle
            text="Gestión de Pedidos"
            variant="h5"
            color="#2d2d2d"
            align="center"
          />
          <CustomTitle
            text="Administra y actualiza el estado de los pedidos de tus clientes"
            variant="body2"
            align="center"
            color="text.secondary"
            fontWeight={400}
            sx={{ mt: -1 }}
          />
        </Box>
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
        {!isLoading && !isError && (
          <CommerceOrdersListCard orders={filteredOrders} />
        )}

        {hasNextPage && (
          <Box display="flex" justifyContent="center" mt={3} mb={2}>
            <Button
              variant="outlined"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              sx={{
                borderRadius: 8,
                borderColor: "#77A787",
                color: "#77A787",
                px: 4,
                "&:hover": {
                  borderColor: "#3E6A53",
                  color: "#3E6A53",
                  bgcolor: "transparent",
                },
              }}
            >
              {isFetchingNextPage ? (
                <CircularProgress size={20} sx={{ color: "#77A787" }} />
              ) : (
                "Cargar más"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ListCommerceOrdersPage;
