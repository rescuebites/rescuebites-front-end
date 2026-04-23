import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/hooks/useAuthStore";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";
import CommerceDashboardPage from "@/modules/commerce/pages/CommerceDashboardPage";
import SearchResultsPage from "@/modules/commerce/pages/SearchResultsPage";
import ExpiringProductsPage from "@/modules/products/pages/ExpiringProductsPage";
import AppLayout from "@/shared/pages/layouts/AppLayout";
import { CreateProductPage } from "@/modules/products/pages/CreateProductPage";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout";
import EditCommercePage from "@/modules/commerce/pages/EditCommercePage";
import { EditProductPage } from "@/modules/products/pages/EditProductPage";
import RegisterCommercePage from "@/modules/commerce/pages/registerCommercePage";
import BusinessHoursPage from "@/modules/commerce/pages/BusinessHoursPage";
import CommerceNavbar from "@/modules/navbar/components/CommerceNavbar";
import CommerceProfilePage from "@/modules/commerce/pages/CommerceProfilePage";
import CommerceOrderDetailPage from "@/modules/orders/pages/CommerceOrderDetailPage";
import { SalesReportPage } from "@/modules/reports/pages/SalesReportPage";
import ListCommerceOrdersPage from "@/modules/orders/pages/ListCommerceOrdersPage";
import ListCommerceProductsPage from "@/modules/products/pages/ListCommerceProductsPage";

export function CommerceRoutes() {
  const { isAuthenticated, commerceId, clientId } = useAuthStore();

  // No autenticado → login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Autenticado como cliente → no puede acceder a rutas de comercio
  if (!!clientId && !commerceId) {
    return <UnauthorizedPage />;
  }

  return (
    <Routes>
      {/* Layout principal del comercio */}
      <Route element={<AppLayout navbar={<CommerceNavbar />} />}>
        {/* Dashboard principal */}
        <Route index element={<CommerceDashboardPage />} />
        <Route path="profile" element={<CommerceProfilePage />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="products" element={<ListCommerceProductsPage />} />
        <Route path="products/expiring" element={<ExpiringProductsPage />} />
        <Route path="orders" element={<ListCommerceOrdersPage />} />
        <Route path="orders/:orderId" element={<CommerceOrderDetailPage />} />
        <Route path="sales" element={<SalesReportPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="register-commerce" element={<RegisterCommercePage />} />
        <Route
          path="register-commerce/business-hours"
          element={<BusinessHoursPage />}
        />
        <Route path="create-product" element={<CreateProductPage />} />
        <Route path="edit-commerce-profile" element={<EditCommercePage />} />
        <Route
          path="edit-commerce-profile/business-hours"
          element={<BusinessHoursPage />}
        />
        <Route
          path={"products/:productId/edit-product"}
          element={<EditProductPage />}
        />
      </Route>
    </Routes>
  );
}
