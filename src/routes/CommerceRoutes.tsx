import { Route, Routes } from "react-router-dom";
import RegisterForm from "@/modules/commerce/components/CommerceRegisterForm";
import { EditCommercePage } from '@/shared/pages/commerce/EditCommercePage';

export function CommerceRoutes() {
  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
      <Route path="edit/:id" element={<EditCommercePage />} />
      
    </Routes>
  );
}


