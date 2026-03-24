import { Stack } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {
  return (
    <Stack direction="row" spacing={1}>
      <QuickActionCard
        title="Register Product"
        icon={<RestaurantIcon />}
        color="#A8D5B8"
      />

      <QuickActionCard
        title="Edit Profile"
        icon={<PersonIcon />}
        color="#5EA574"
      />

      <QuickActionCard
        title="Productos por vencer"
        icon={<WarningAmberIcon />}
        color="#B6E1C3"
      />
    </Stack>
  );
}
