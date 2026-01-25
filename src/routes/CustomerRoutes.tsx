import { Routes, Route } from "react-router-dom";
import HomePage from "@/shared/pages/customer/HomePage";
import StoresPage from "@/shared/pages/customer/StoresPage";
import ProductsDealsPage from "@/shared/pages/customer/DealProductsPage";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/allProducts" element={<ProductsDealsPage />} />
    </Routes>
  );
}