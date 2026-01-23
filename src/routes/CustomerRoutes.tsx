import { Routes, Route } from "react-router-dom";
import HomePage from "@/shared/pages/customer/HomePage";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
