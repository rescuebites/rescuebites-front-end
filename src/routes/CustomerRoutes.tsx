import { Routes, Route } from "react-router-dom";
import TestNavbar from "@/shared/pages/testNavbar";
import OrdersPage from "@/shared/pages/OrdersPage";
import ShoppingCartPage from "@/shared/pages/ShoppingCartPage";

export function CustomerRoutes(){
    return(
        <Routes>
      <Route path="/test-navbar" element={<TestNavbar />} />
      <Route index element={<div>Customer Home Page</div>} />
      <Route path="profile" element={<div>Customer Profile Page</div>} />
      <Route path="cart" element={<ShoppingCartPage />} />
      <Route path="notifications" element={<div>Customer Notifications Page</div>} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
    )
}