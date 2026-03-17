import { Box, Typography } from "@mui/material";
import SearchBar from "@/shared/components/layout/SearchBar";
import QuickActions from "./QuickActions";
import OrdersSection from "./OrdersSection";
import StatisticsCard from "./StatisticsCard";

export default function HomeCustomerPage() {
  return (
    <Box
      sx={{
        px: 2.5,
        pt: 1,
        pb: 10,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      {/* Search */}
      <SearchBar onSearchChange={() => {}} />

      {/* Quick actions */}
      <Box mt={3}>
        <Typography fontWeight={700} fontSize={20} mb={2}>
          Quick Actions
        </Typography>

        <QuickActions />
      </Box>

      {/* Orders */}
      <OrdersSection />

      {/* Statistics */}
      <Box mt={3}>
        <Typography fontWeight={700} fontSize={20} mb={2}>
          Statistics
        </Typography>
        <StatisticsCard />
      </Box>
    </Box>
  );
}
