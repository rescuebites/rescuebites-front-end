import { Paper, Typography } from "@mui/material";
import StatisticsChart from "./StatisticsChart";

export default function StatisticsCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        bgcolor: "#F6F6F6",
      }}
    >
      <Typography fontSize={14} color="text.secondary">
        Total Sales
      </Typography>

      <Typography fontWeight={800} fontSize={28}>
        $1500
      </Typography>

      <StatisticsChart />
    </Paper>
  );
}
