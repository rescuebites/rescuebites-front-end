import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import ShoppingCartPage from "@/modules/cart/pages/ShoppingCartPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";
import SearchResultsPage from "@/modules/catalog/pages/SearchResultsPage";
import ClientNavbar from "@/modules/navbar/components/ClientNavbar";
import AppLayout from "@/shared/components/layout/AppLayout";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout navbar={<ClientNavbar />} />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />

          <Route path="/stores/:commerceId" element={<StoresPage />} />
          <Route path="/allProducts" element={<AllProductsPage />} />
          <Route path="/allStores" element={<AllStoresPage/>}/>
          <Route path="/search" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
};