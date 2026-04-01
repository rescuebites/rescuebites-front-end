import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import NotificationsPage from "@/shared/pages/notifications";
import ProfilePage from "@/shared/pages/ProfilePage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";
import OrdersPage from "@/shared/pages/OrdersPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";
import SearchResultsPage from "@/modules/filterPanel/pages/SearchResultsPage";
import ClientNavbar from "@/modules/navbar/components/ClientNavbar";
import AppLayout from "@/shared/pages/layouts/AppLayout";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout navbar={<ClientNavbar />} />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          <Route path="notifications" element={<NotificationsPage/>} />
          <Route path="profile" element={<ProfilePage/>} />        
          <Route index element={<HomePage />} />
          <Route path="/stores/:commerceId" element={<StoresPage />} />
          <Route path="/allProducts" element={<AllProductsPage />} />
          <Route path="/allStores" element={<AllStoresPage/>}/>
          <Route path="/search" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
};