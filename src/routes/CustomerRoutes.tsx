import { Routes, Route } from "react-router-dom";
import TestNavbar from "@/shared/pages/testNavbar";

export function CustomerRoutes(){
    return(
        <Routes>
      <Route path="/test-navbar" element={<TestNavbar />} />
      <Route index element={<div>Customer Home Page</div>} />
      <Route path="profile" element={<div>Customer Profile Page</div>} />
      <Route path="cart" element={<div>Customer cart Page</div>} />
      <Route path="notifications" element={<div>Customer Notifications Page</div>} />
      <Route path="orders" element={<div>Customer Orders Page</div>} />
    </Routes>
    )
}