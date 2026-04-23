import { Stack } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import QuickActionCard from "./QuickActionCard";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={1} mt={4}>
      <QuickActionCard
        title="Registrar Producto"
        icon={<RestaurantIcon sx={{ fontSize: 45 }} />}
        color="#A8D5B8"
        onClick={() => navigate("/commerce/create-product")}
      />

      <QuickActionCard
        title="Reporte"
        icon={<BarChartIcon sx={{ fontSize: 45 }} />}
        color="#5EA574"
        onClick={() => navigate("/commerce/sales")}
      />

      <QuickActionCard
        title="Productos por vencer"
        icon={<WarningAmberIcon sx={{ fontSize: 50 }} />}
        color="#B6E1C3"
        onClick={() => navigate("/commerce/products/expiring")}
      />
    </Stack>
  );
}
