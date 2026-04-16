import { Route, Routes } from "react-router-dom";
import CommerceDashboardPage from "@/modules/commerce/pages/CommerceDashboardPage";
import SearchResultsPage from "@/modules/commerce/components/SearchResultsPage";
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

export function CommerceRoutes() {
  return (
    <Routes>
      {/* Layout principal del comercio */}
      <Route element={<AppLayout navbar={<CommerceNavbar />} />}>
        {/* Dashboard principal */}
        <Route index element={<CommerceDashboardPage />} />
        <Route path="profile" element={<CommerceProfilePage />} />
        <Route path="search" element={<SearchResultsPage />} />

        <Route path="products/expiring" element={<ExpiringProductsPage />} />
        <Route path="orders/:orderId" element={<CommerceOrderDetailPage />} />
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
