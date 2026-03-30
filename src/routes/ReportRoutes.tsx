import { Routes, Route } from "react-router-dom";
import HomePage from "@/modules/customer/home/pages/HomePage";
import ClientNavbar from "@/modules/navbar/components/ClientNavbar";
import AppLayout from "@/shared/pages/layouts/AppLayout";
import { SalesReport } from "@/modules/reports/SalesReport/SalesReport";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout navbar={<ClientNavbar />} />}>
        <Route index element={<HomePage />} />
        <Route path="sales" element={<SalesReport />} />
      </Route>
    </Routes>
  );
}
