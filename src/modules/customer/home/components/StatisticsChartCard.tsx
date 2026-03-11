import { Paper, Typography, Box } from "@mui/material";

export default function StatisticsChartCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        bgcolor: "#F3F3F3"
      }}
    >
      <Typography
        sx={{
          fontSize: 15,
          color: "#666"
        }}
      >
        Total Sales
      </Typography>

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 28,
          mb: 2
        }}
      >
        $1500
      </Typography>

      {/* Simulación de gráfico */}
      <Box
        component="img"
        src="/chart-placeholder.png"
        sx={{
          width: "100%",
          opacity: 0.7
        }}
      />
    </Paper>
  );
}