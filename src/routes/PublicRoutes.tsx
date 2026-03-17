// routes/UserRoutes.tsx
import { Routes, Route } from "react-router-dom";
import PublicNavbar from "@/modules/navbar/components/PublicNavbar";
import HomePage from "@/modules/customer/home/pages/HomePage";
import NotLoggedInScreen from "@/modules/navbar/pages/NotLoggedInScreen";
import StorePage from "@/modules/customer/home/pages/StorePage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import SearchResultsPage from "@/modules/catalog/pages/SearchResultsPage";
import AppLayout from "@/shared/components/layout/AppLayout";


export function PublicRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout navbar={<PublicNavbar />} />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<NotLoggedInScreen />} />
        <Route path="orders" element={<NotLoggedInScreen />} />
        <Route path="notifications" element={<NotLoggedInScreen />} />
        <Route path="profile" element={<NotLoggedInScreen />} />
        
        <Route path="stores/:commerceId" element={<StorePage />} />
        <Route path="allProducts" element={<AllProductsPage />} />
        <Route path="allStores" element={<AllStoresPage />} />
        <Route path="search" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
}