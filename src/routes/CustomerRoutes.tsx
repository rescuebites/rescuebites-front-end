import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresPage";
import ProductsDealsPage from "@/modules/customer/home/pages/DealProductsPage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";
import OrdersPage from "@/shared/pages/OrdersPage";
import CustomerLayout from "@/shared/components/layout/CustomerLayout";
import NotificationsPage from "@/shared/pages/notifications";
import ProfilePage from "@/shared/pages/ProfilePage";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="stores/:commerceId" element={<StoresPage />} />
        <Route path="allProducts" element={<ProductsDealsPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="notifications" element={<NotificationsPage/>} />
        <Route path="profile" element={<ProfilePage/>} />
      </Route>
    </Routes>
  );
};