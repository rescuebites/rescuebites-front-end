import { Routes, Route } from "react-router-dom";
import TestNavbar from "@/shared/pages/testNavbar";

export function CustomerRoutes(){
    return(
        <Routes>
      <Route path="/test-navbar" element={<TestNavbar />} />
    </Routes>
    )
}