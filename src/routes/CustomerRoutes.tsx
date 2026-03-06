import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import NotificationsPage from "@/shared/pages/notifications";
import ProfilePage from "@/shared/pages/ProfilePage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";
import OrdersPage from "@/shared/pages/OrdersPage";
import CustomerLayout from "@/shared/components/layout/CustomerLayout";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="stores/:commerceId" element={<StoresPage />} />
        <Route path="allProducts" element={<AllProductsPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="notifications" element={<NotificationsPage/>} />
        <Route path="profile" element={<ProfilePage/>} />
      </Route>
      <Route index element={<HomePage />} />
      <Route path="/stores/:commerceId" element={<StoresPage />} />
      <Route path="/allProducts" element={<AllProductsPage />} />
      <Route path="/allStores" element={<AllStoresPage/>}/>

    </Routes>
  );
};