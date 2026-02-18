import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresPage";
import ProductsDealsPage from "@/modules/customer/home/pages/DealProductsPage";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/stores/:commerceId" element={<StoresPage />} />
      <Route path="/allProducts" element={<ProductsDealsPage />} />

    </Routes>
  );
}