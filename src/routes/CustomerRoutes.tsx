import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/stores/:commerceId" element={<StoresPage />} />
      <Route path="/allProducts" element={<AllProductsPage />} />
      <Route path="/allStores" element={<AllStoresPage/>}/>

    </Routes>
  );
}