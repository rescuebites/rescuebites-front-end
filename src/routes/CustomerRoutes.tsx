import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresPage";
import ProductsDealsPage from "@/modules/customer/home/pages/DealProductsPage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";
import OrdersPage from "@/shared/pages/OrdersPage";
import CustomerLayout from "@/shared/components/layout/CustomerLayout";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="stores/:commerceId" element={<StoresPage />} />
        <Route path="allProducts" element={<ProductsDealsPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="notifications" element={<div>Notifications</div>} />
        <Route path="profile" element={<div>Profile</div>} />
      </Route>
    </Routes>
  );
};