import { Stack } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
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
        title="Editar Perfil"
        icon={<PersonIcon sx={{ fontSize: 45 }} />}
        color="#5EA574"
        onClick={() => navigate("/commerce/edit-commerce-profile")}
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
