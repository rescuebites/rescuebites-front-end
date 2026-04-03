import SearchBar from "@/shared/components/layout/SearchBar";
import OrderList from "../components/OrdersListCard";
import OrderStatusFilter from "../components/OrderStatusFilter";

const ListClientOrdersPage = () => {
  const [activeStatus, setActiveStatus] = useOrderFilters(mockOrders);

  return (
    <>
      <SearchBar onSearchChange={(value) => console.log("buscando", value)} />
      <OrderStatusFilter value={activeStatus} onChange={setActiveStatus} />
      <OrderList />
    </>
  );
};

export default ListClientOrdersPage;