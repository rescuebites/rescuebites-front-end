import { AuthRoutes } from "@/routes/AuthRoutes";
import { UserRoutes } from "@/routes/UserRoutes";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { useLocalityStore } from "@/modules/customer/home/hooks/useLocalityStore";
import AppLayout from "@/shared/components/layout/AppLayout";
import ClientNavbar from "@/modules/navbar/components/ClientNavbar";
import PublicNavbar from "@/modules/navbar/components/PublicNavbar";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresDetailPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import SearchResultsPage from "@/modules/catalog/pages/SearchResultsPage";
import LoadLocalityPage from "@/modules/catalog/pages/LoadLocalityPage";
import ShoppingCartPage from "@/modules/cart/pages/ShoppingCartPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";

function LocalityGuard() {
  const locality = useLocalityStore((s) => s.locality);
  return locality ? <Outlet /> : <Navigate to="/locality" replace />;
}

export default function RoutesProvider() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/api/users/*" element={<UserRoutes />} />

      {/* Locality picker — outside AppLayout, no navbar */}
      <Route path="locality" element={<LoadLocalityPage />} />

      <Route
        element={
          <AppLayout navbar={isAuthenticated ? <ClientNavbar /> : <PublicNavbar />} />
        }
      >
        {/* Require locality before browsing */}
        <Route element={<LocalityGuard />}>
          {/* Public browsing routes — accessible to all */}
          <Route index element={<HomePage />} />
          <Route path="stores/:commerceId" element={<StoresDetailPage />} />
          <Route path="allStores" element={<AllStoresPage />} />
          <Route path="allProducts" element={<AllProductsPage />} />
          <Route path="search" element={<SearchResultsPage />} />

          {/* Protected routes — show NotLoggedInScreen for guests */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="orders" element={null} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="notifications" element={null} />
            <Route path="profile" element={null} />
          </Route>
        </Route>
      </Route>

      {/* Legacy redirects so old links don't 404 */}
      <Route path="/customer/*" element={<Navigate to="/" replace />} />
      <Route path="/public/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
