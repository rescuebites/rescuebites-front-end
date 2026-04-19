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
import SearchResultsPage from "@/modules/filterPanel/pages/SearchResultsPage";
import ShoppingCartPage from "@/modules/cart/pages/ShoppingCartPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";
import ListClientOrdersPage from "@/modules/orders/pages/ListClientOrdersPage";
import NotificationsPage from "@/modules/notifications/NotificationsPage";

function LocalityGuard() {
  const locality = useLocalityStore((s) => s.locality);
  return locality ? <Outlet /> : <Navigate to="/locality" replace />;
}

export function CustomerRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      <Route
        element={
          <AppLayout
            navbar={isAuthenticated ? <ClientNavbar /> : <PublicNavbar />}
          />
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
            <Route path="orders" element={<ListClientOrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={null} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
