import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useLocalityStore } from "@/modules/customer/home/hooks/useLocalityStore";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import AppLayout from "@/shared/pages/layouts/AppLayout";
import ClientNavbar from "@/modules/navbar/components/ClientNavbar";
import PublicNavbar from "@/modules/navbar/components/PublicNavbar";
import HomePage from "@/modules/customer/home/pages/HomePage";
import StoresDetailPage from "@/modules/customer/home/pages/StoresDetailPage";
import AllStoresPage from "@/modules/customer/home/pages/AllStoresPage";
import AllProductsPage from "@/modules/customer/home/pages/AllProductsPage";
import SearchResultsPage from "@/modules/catalog/pages/SearchResultsPage";
import ShoppingCartPage from "@/modules/cart/pages/ShoppingCartPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";
import { useClientSync } from "@/modules/customer/home/hooks/useClientSync";

/**
 * Authenticated clients bypass the locality requirement: their locality is
 * fetched from their profile by useClientSync and synced into the store.
 * Unauthenticated visitors still need to select a locality first.
 */
function LocalityGuard() {
  const locality = useLocalityStore((s) => s.locality);
  const { isAuthenticated, clientId } = useAuthStore();
  const isClient = isAuthenticated && !!clientId;
  return (isClient || !!locality) ? <Outlet /> : <Navigate to="/locality" replace />;
}

export function CustomerRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Sync the client's locality from their profile into the locality store
  // so that commerce hooks (public endpoints) always use the correct locality.
  useClientSync();

  return (
    <Routes>
      <Route
        element={
          <AppLayout navbar={isAuthenticated ? <ClientNavbar /> : <PublicNavbar />} />
        }
      >
        <Route element={<LocalityGuard />}>
          {/* Navegación pública — accesible para todos */}
          <Route index element={<HomePage />} />
          <Route path="stores/:commerceId" element={<StoresDetailPage />} />
          <Route path="allStores" element={<AllStoresPage />} />
          <Route path="allProducts" element={<AllProductsPage />} />
          <Route path="search" element={<SearchResultsPage />} />

          {/* Protected — mostrar NotLoggedInScreen para invitados */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="orders" element={null} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="notifications" element={null} />
            <Route path="profile" element={null} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}