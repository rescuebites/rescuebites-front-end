import SearchBar from "@/shared/components/layout/SearchBar";
import OrderList from "../components/OrdersListCard";
import OrderStatusFilter from "../components/OrderStatusFilter";
import { useOrderFilters } from "../hooks/useOrderFilters";
import { mockOrders } from "../components/OrdersListCard";
import { Box } from "@mui/material";

const ListClientOrdersPage = () => {
  const { activeStatus, setActiveStatus, filteredOrders } = useOrderFilters(mockOrders);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, mx: "auto", mt: { xs: 1, sm: 2 } }}>
      <SearchBar onSearchChange={(value) => console.log("buscando", value)} />
      <Box mt={4}>
        <OrderStatusFilter value={activeStatus} onChange={setActiveStatus} />
      </Box>
      <Box mt={2}>
        <OrderList orders={filteredOrders} />
      </Box>
    </Box>
  );
};

export default ListClientOrdersPage;