import { Routes, Route } from "react-router-dom";
import TestNavbar from "@/shared/pages/testNavbar";
import OrdersPage from "@/shared/pages/OrdersPage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";
import NotificationsPage from "@/shared/pages/notifications";
import ProfilePage from "@/shared/pages/ProfilePage";
import CustomerLayout from "@/shared/components/layout/CustomerLayout";

export function CustomerRoutes(){
    return(
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/test-navbar" element={<TestNavbar />} />
        <Route index element={<div>Customer Home Page</div>} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
    </Routes>
    )
}